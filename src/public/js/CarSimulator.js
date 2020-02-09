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
// Create an array to hold all the icon and color information
var icons = [
    {
      color: 'red',
      standard: L.divIcon({ id: 'redIcon', className: 'red-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'redIconConnecting', className: 'red-icon-connecting', iconSize: null }),
    },
    {
      color: 'blue',
      standard: L.divIcon({ id: 'blueIcon', className: 'blue-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'blueIconConnecting', className: 'blue-icon-connecting',iconSize: null }),
    },
    {
      color: 'lightsalmon',
      standard: L.divIcon({ id: 'lightsalmonIcon', className: 'lightsalmon-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'lightsalmonIconConnecting', className: 'lightsalmon-icon-connecting',iconSize: null }),
    },
    {
      color: 'firebrick',
      standard: L.divIcon({ id: 'firebrickIcon', className: 'firebrick-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'firebrickIconConnecting', className: 'firebrick-icon-connecting',iconSize: null }),
    },
    {
      color: 'tomato',
      standard: L.divIcon({ id: 'tomatoIcon', className: 'tomato-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'tomatoIconConnecting', className: 'tomato-icon-connecting',iconSize: null }),
    },
    {
      color: 'lawngreen',
      standard: L.divIcon({ id: 'lawngreenIcon', className: 'lawngreen-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'lawngreenIconConnecting', className: 'lawngreen-icon-connecting',iconSize: null }),
    },
    {
      color: 'lime',
      standard: L.divIcon({ id: 'limeIcon', className: 'lime-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'limeIconConnecting', className: 'lime-icon-connecting',iconSize: null }),
    },
    {
      color: 'darkcyan',
      standard: L.divIcon({ id: 'darkcyanIcon', className: 'darkcyan-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'darkcyanIconConnecting', className: 'darkcyan-icon-connecting',iconSize: null }),
    },
    {
      color: 'midnightblue',
      standard: L.divIcon({ id: 'midnightblueIcon', className: 'midnightblue-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'midnightblueIconConnecting', className: 'midnightblue-icon-connecting',iconSize: null }),
    },
    {
      color: 'deeppink',
      standard: L.divIcon({ id: 'deeppinkIcon', className: 'deeppink-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'deeppinkIconConnecting', className: 'deeppink-icon-connecting',iconSize: null }),
    },
    {
      color: 'maroon',
      standard: L.divIcon({ id: 'maroonIcon', className: 'maroon-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'maroonIconConnecting', className: 'maroon-icon-connecting',iconSize: null }),
    },
    {
      color: 'saddlebrown',
      standard: L.divIcon({ id: 'saddlebrownIcon', className: 'saddlebrown-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'saddlebrownIconConnecting', className: 'saddlebrown-icon-connecting',iconSize: null }),
    },
    {
      color: 'gray',
      standard: L.divIcon({ id: 'grayIcon', className: 'gray-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'grayIconConnecting', className: 'gray-icon-connecting',iconSize: null }),
    },
    {
      color: 'darkslategray',
      standard: L.divIcon({ id: 'darkslategrayIcon', className: 'darkslategray-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'darkslategrayIconConnecting', className: 'darkslategray-icon-connecting',iconSize: null }),
    },
    {
      color: 'indigo',
      standard: L.divIcon({ id: 'indigoIcon', className: 'indigo-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'indigoIconConnecting', className: 'indigo-icon-connecting',iconSize: null }),
    },
    {
      color: 'magenta',
      standard: L.divIcon({ id: 'magentaIcon', className: 'magenta-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'magentaIconConnecting', className: 'magenta-icon-connecting',iconSize: null }),
    },
    {
      color: 'mediumslateblue',
      standard: L.divIcon({ id: 'mediumslateblueIcon', className: 'mediumslateblue-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'mediumslateblueIconConnecting', className: 'mediumslateblue-icon-connecting',iconSize: null }),
    },
    {
      color: 'cyan',
      standard: L.divIcon({ id: 'cyanIcon', className: 'cyan-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'cyanIconConnecting', className: 'cyan-icon-connecting',iconSize: null }),
    },
    {
      color: 'olive',
      standard: L.divIcon({ id: 'oliveIcon', className: 'olive-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'oliveIconConnecting', className: 'olive-icon-connecting',iconSize: null }),
    },
    {
      color: 'mediumseagreen',
      standard: L.divIcon({ id: 'mediumseagreenIcon', className: 'mediumseagreen-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'mediumseagreenIconConnecting', className: 'mediumseagreen-icon-connecting',iconSize: null }),
    },
    {
      color: 'green',
      standard: L.divIcon({ id: 'greenIcon', className: 'green-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'greenIconConnecting', className: 'green-icon-connecting',iconSize: null }),
    },
    {
      color: 'yellow',
      standard: L.divIcon({ id: 'yellowIcon', className: 'yellow-icon', iconSize: null }),
      communicating: L.divIcon({ id: 'yellowIconConnecting', className: 'yellow-icon-connecting', iconSize: null }),
    }
    
];

// Create global markers map. This will be populated by info in the trajectory file
// The map is keyed by "Vehicle ID"
// The markers array will be used to draw lines between markers
var markers = {};
var done_creating_markers = false;

// Process CSV text into a javascript object
function processData(allText) {
  console.log('processData');
  //console.log(allText);

  var data = $.csv.toObjects(allText);

  return data;
}

// Load in Trajectory CSV document and create animated markers
$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'public/testb.csv',
    dataType: 'text',
    success: function(data) {
      markers = createMarkers(processData(data));
      done_creating_markers = true;
    },
  });
});

getConnectionsFile();

function getConnectionsFile() {
    if (done_creating_markers) {
        // Load in Connections CSV document and create connection information between markers
        $(document).ready(function() {
          $.ajax({
            type: 'GET',
            url: 'public/testb_conn.csv',
            dataType: 'text',
            success: function(data) {
              createConnections(processData(data));
            },
          });
        });
    } else {
        setTimeout(getConnectionsFile, 1000);
    }
}

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
  //console.log(data);

  var markers = {};
  var positions = new Array();
  var times = new Array();
  var last_timestamp = 0;
  var first_timestamp = 0;
  var j = 0;
  var all_positions = new Array();

  var last_vid = 'Na';
  data.forEach((row, i, array) => {
    var vid = row['Trajectory ID'];
    var time = parseFloat(row['Time Stamp']*100); /////////////////////////////////// temp added some time

    // Expand the map border region if needed
    create_map_border(parseFloat(row.Latitude), parseFloat(row.Longitude));

    // If were are at the end of the file we must process the final vehicle
    if (i == data.length - 1) {
      vid = last_vid;
      positions.push([
        parseFloat(data[i].Latitude),
        parseFloat(data[i].Longitude),
      ]);
      times.push(time - last_timestamp); 
      last_timestamp = time;
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
        });
        markers[last_vid].icon = icons[icon_i];
        markers[last_vid].vid = last_vid;
        markers[last_vid].currentConnections = [];
        markers[last_vid].polylines = {};
        markers[last_vid].communicatingTime = [];
        markers[last_vid].connections = [];
        markers[last_vid].startTime = first_timestamp;
        markers[last_vid].endTime = last_timestamp;

        // Pause the marker until its start time
        //markers[last_vid].pause();
        // Set the marker to appear after a duration
        setTimeout((vid) => {
            //console.log("Starting vehicle: ");
            //console.log(vid);
            //console.log(markers[vid]);
            if(vid == 326)
                console.log(markers[vid]);
            markers[vid].addTo(map);
            //markers[vid].resume();
        }, markers[last_vid].startTime, last_vid);
        //console.log(markers[last_vid].startTime*100);
        
        // Set the marker to disapear after a duration
        setTimeout((vid)=> {
            map.removeLayer(markers[vid]);
        }, markers[last_vid].endTime, last_vid);
        //console.log(markers[last_vid].endTime*100)
        
        
        //console.log(markers[last_vid]);
      }

      // Cleanup for new vehicle
      last_timestamp = 0;
      last_vid = vid;
      positions = new Array();
      times = new Array();
      
      // Start next vehicle with 0 time at their first location
      first_timestamp = time;
    } else {
      times.push(time - last_timestamp);
    }

    // Keep track of positions and times for this car
    positions.push([
      parseFloat(data[i].Latitude),
      parseFloat(data[i].Longitude),
    ]);    
    last_timestamp = time;
  });

  map.fitBounds(Object.values(map_border));

  return markers;
}


/**
    When creating connections it must be noted that our java simulator is sending printable formatted CSVs
    Therefore we must add a leading space for each header
**/
function createConnections(data) {
  console.log('createConnections');
  //console.log(markers);

  var time = 0,
    vid = 'Na';
  // Parse through the data using the vid to update marker attributes
  data.forEach((row, i, array) => {
    var time_stamp = (parseFloat(row[' Time Stamp'])*100); /////////////////////////////////// temp added some time &&&&&& some rando flat addition
    
    if (row[' Vehicle ID'] != '') {
      vid = row[' Vehicle ID'];
      time = 0;
      
    } else {
      //console.log(row);
      //console.log(time_stamp);
      //console.log(markers[vid].startTime);
      //console.log(markers[vid]);
      time = time_stamp - markers[vid].startTime; 
      //console.log(time);
    }

    //console.log("calculating time");
    //console.log(row["Time Stamp"]);
    //console.log(last_timestamp);
    console.log(vid);
    console.log(row);
    console.log(markers);
    markers[vid].connections.push({
      time: time,
      markers: parseConnections(row[' Current Open Connections']),
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
  var vids = stringConnections.split('\'');
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
