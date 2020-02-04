// initialize the map on the "map" div with a given center and zoom
var map = new L.Map('map', {
  zoom: 6,
  minZoom: 3,
});

// create a new tile layer
var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  layer = new L.TileLayer(tileUrl, {
    attribution:
      'Maps © <a href="www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  });

// add the layer to the map
map.addLayer(layer);

// Load in all custom icons with color information
var redIcons = {
  color: 'red',
  standard: L.divIcon({ id: 'redIcon', className: 'red-icon', iconSize: null }),
  communicating: L.divIcon({
    id: 'redIconConnecting',
    className: 'red-icon-connecting',
    iconSize: null,
  }),
};

var blueIcons = {
  color: 'blue',
  standard: L.divIcon({
    id: 'blueIcon',
    className: 'blue-icon',
    iconSize: null,
  }),
  communicating: L.divIcon({
    id: 'blueIconConnecting',
    className: 'blue-icon-connecting',
    iconSize: null,
  }),
};
// Create an array to hold all the icon and color information
var icons = [redIcons, blueIcons];

// Create global markers map. This will be populated by info in the trajectory file
// The map is keyed by "Vehicle ID"
// The markers array will be used to draw lines between markers
var markers = {};

// Process CSV text into a javascript object
function processData(allText) {
  console.log('processData');
  console.log(allText);

  var data = $.csv.toObjects(allText);

  return data;
}

// Load in Trajectory CSV document and create animated markers
$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'public/trajectory_file_example.csv',
    dataType: 'text',
    success: function(data) {
      markers = createMarkers(processData(data));
    },
  });
});

// Load in Connections CSV document and create connection information between markers
$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'public/connections_file_example.csv',
    dataType: 'text',
    success: function(data) {
      createConnections(processData(data));
    },
  });
});

// Define the default map borders such that they must be set
var map_border = { max: { lat: -91, lon: -181 }, min: { lat: 91, lon: 181 } };
function create_map_border(lat, lon) {
  //console.log("Current border and then new pos");
  //console.log(map_border);
  //console.log([lat,lon]);
  if (lat > map_border.max.lat) map_border.max.lat = lat + 0.001;
  // Some padding is added to make the map look more centered
  else if (lat < map_border.min.lat) map_border.min.lat = lat - 0.001;
  else if (lon > map_border.max.lon) map_border.max.lon = lon + 0.001;
  else if (lon < map_border.min.lon) map_border.min.lon = lon - 0.001;
}

// Create the animated markers from an object created by CSV
function createMarkers(data) {
  console.log('createMarkers');
  console.log(data);

  var markers = {};
  var positions = new Array();
  var times = new Array();
  var last_timestamp = 0;
  var j = 0;
  var all_positions = new Array();

  var last_vid = 'Na';
  data.forEach((row, i, array) => {
    var vid = row['Vehicle ID'];

    // Expand the map border region if needed
    create_map_border(parseFloat(row.Latitude), parseFloat(row.Longitude));

    // If were are at the end of the file we must process the final vehicle
    if (i == data.length - 1) {
      vid = last_vid;
      positions.push([
        parseFloat(data[i].Latitude),
        parseFloat(data[i].Longitude),
      ]);
      times.push((row['Time Stamp'] - last_timestamp) * 100); /////////////////////////////////// temp added some time
      last_timestamp = row['Time Stamp'];
    }

    // If we should now parse a car because an old one was seen
    if (vid != '') {
      // We shouldn't parse a car until we have all its information
      if (i != 0) {
        // Pick a random color to use for each car
        var icon_i = Math.floor(Math.random() * 10000) % icons.length;

        // Create a marker
        markers[last_vid] = L.Marker.movingMarker(positions, times, {
          autostart: true,
          loop: false,
          icon: icons[icon_i].standard,
        }).addTo(map);
        markers[last_vid].icon = icons[icon_i];
        markers[last_vid].vid = last_vid;
        markers[last_vid].currentConnections = [];
        markers[last_vid].polylines = {};
        markers[last_vid].communicatingTime = [];
        markers[last_vid].connections = [];

        console.log(markers[last_vid]);
      }

      // Cleanup for new vehicle
      last_timestamp = 0;
      last_vid = vid;
      positions = new Array();
      times = new Array();
    }

    // Keep track of positions and times for this car
    positions.push([
      parseFloat(data[i].Latitude),
      parseFloat(data[i].Longitude),
    ]);
    times.push((row['Time Stamp'] - last_timestamp) * 100); /////////////////////////////////// temp added some time
    last_timestamp = row['Time Stamp'];
  });

  map.fitBounds(Object.values(map_border));

  return markers;
}

function createConnections(data) {
  console.log('createConnections');
  console.log(markers);

  var time = 0,
    vid = 'Na';
  // Parse through the data using the vid to update marker attributes
  data.forEach((row, i, array) => {
    if (row['Vehicle ID'] != '') {
      vid = row['Vehicle ID'];
    }

    //console.log("calculating time");
    //console.log(row["Time Stamp"]);
    //console.log(last_timestamp);
    time = row['Time Stamp'] * 100; /////////////////////////////////// temp added some time
    //console.log(row);
    markers[vid].connections.push({
      time: time,
      markers: parseConnections(row['Current Open Connections']),
    });

    /// Somehow figure out what time durations this vehicle is communicating with the server
    // For now I will test with a 50% probability
    var temp = Math.floor(Math.random() * 10) % 2;
    if (temp == 1) markers[vid].communicatingTime.push(time);
  });
}

function parseConnections(stringConnections) {
  //console.log("parseConnections");
  //console.log(stringConnections);
  //console.log(stringConnections.split("’"));
  var vids = stringConnections.split('’');
  if (vids[0] == '') vids.length = 0;
  temp_markers = [];

  //console.log(vids);
  vids.forEach((vid, i, array) => {
    //console.log(markers);
    //console.log(vid);
    temp_markers.push(markers[vid]);
  });
  return temp_markers;
}
