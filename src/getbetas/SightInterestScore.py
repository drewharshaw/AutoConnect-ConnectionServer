####################################
# File: SightInterestScore.py
# Author: AutoConnect Team
# Format Guid: This file follows PEP-8 style guid https://www.python.org/dev/peps/pep-0008/
# ----- BACKGROUND -----
# Sight Interest score is a metric for measuring how relevent a vehicles sight is. 
# It's important for vehicles to have connections with vehicles that are viewing
# relevent, high likelihood areas for potential hazardous objects. This is done by 
# computing a geographical predictive heatmap which contains a weighting for each bin. 
# This file uses the overpass api http://overpass-api.de/ to find intersections
####################################

import overpy
import json
import geojson
import math
import geopy.distance

# @Params: min_coord - tuple of minimum Lat, Long
# @Params: max_coord - tuple of maximum Lat, Long
# Description: Will query the Overpy API for all traffic_signals tags
# Notes: Currently not returning expected output

def get_intersection_coords(min_coord, max_coord):

    min_lat, min_long = min_coord
    max_lat, max_long = max_coord

    # create new instance of Overpass API
    api = overpy.Overpass()

    # node(S = [min Lat], W = [min Long], N = [max Lat], E = [max Long])
    # No timeout has been specified [timeout:3600];
    result = api.query(f"[out:json];way[highway=traffic_signals];node({min_lat},{min_long},{max_lat},{max_long});out;")

    # Save to file code
    with open('intersections.json', 'w') as outfile:
        json.dump(result, outfile) 


# @Params: min_coord - tuple of minimum Lat, Long
# @Params: max_coord - tuple of maximum Lat, Long
# Description: Will query the Overpy API for all motorway junction tags
# Notes: Currently not returning expected output

def get_on_ramp(min_coord, max_coord):

    min_lat, min_long = min_coord
    max_lat, max_long = max_coord

    # create new instance of Overpass API
    api = overpy.Overpass()

    # node(S = [min Lat], W = [min Long], N = [max Lat], E = [max Long])
    # No timeout has been specified [timeout:3600];
    result = api.query(f"[out:json];way[highway=motorway junction];node({min_lat},{min_long},{max_lat},{max_long});out;")

    # Save to file code
    with open('onRamps.json', 'w') as outfile:
        json.dump(result, outfile)  


# @Params: file_path - path of JSON containing intersection coords
# Description: Used to parse through the intersection coords
# Notes: used wget to get intersection coords see command below
# wget query.txt http://overpass-api.de/api/interpreter --output-document=Kingston.json
# query = [out:json];way[highway=traffic_signals];node(44.227916,-76.500606,44.244892,-76.481119);out;

def parse_intersection_coords(file_path):

    intersectionPoints = []

    with open(file_path) as f:
        data = json.load(f)
        # loop through array of objects
        for node in data['elements']:
            if ('tags' in node):
                if ('highway' in node['tags']):
                        if node['tags']['highway'] == "traffic_signals":
                            coords = [node['lat'], node['lon'], 3.0]
                            intersectionPoints.append(coords.copy())

    return intersectionPoints


# @Params: heatmap - 2D list, 
# @Params: center - tuple index (X,Y)
# @Params: layer - denoting the number of layers around center
# Description: Calculates the surrounding weight, given heatmap

def calculate_weight(heatmap, center, layer):

    x,y = center

    # Check out of bound error
    if (layer > x or layer > y):
        return -1

    for i in range(layer*2):
        for j in range(layer*2):
            if ((i,j) == (center)):
                continue
            sum += heatmap[i][j]

    return sum

# @Params: heatmap - 2D list
# @Params: center - tuple index (X,Y)
# @Params: layer - denoting the number of layers around center
# Description: Speads a weight surrounding the center

def spread_weight(heatmap, center, layer):

    x,y = center

    # Check out of bound error
    if (layer > x or layer > y):
        return -1

    for i in range(layer*2):
        for j in range(layer*2):
            if ((i,j) == (center)):
                continue
            heatmap[i][j] = 1.0

    return heatmap

# @Params: None 
# Description: Creates a 2D list containing  

def create_heatmap():

    # Define bounding coords for Kingston Area
    min_coord = (44.220767, -76.575052) # Bottom Left Corner
    max_coord = (44.289264, -76.462507) # Top Right Corner

    # size (in meters) of each bin in heatmap
    scale = 10

    # find distance (in meters) for geographical area
    x_meter = geopy.distance.distance(( max_coord[0], min_coord[1]), min_coord).km * 1000
    y_meter = geopy.distance.distance(( min_coord[0], max_coord[1]), min_coord).km * 1000

    heatmap_x_length = math.ceil(x_meter/scale) # number of columns in heatmap
    heatmap_y_length = math.ceil(y_meter/scale) # number of rows in heatmap

    heatmap = [[0 for i in range(heatmap_x_length)] for j in range(heatmap_y_length)]

    # fill in intersection weights
    intersection_array = parse_intersection_coords('Kingston.json')

    for i in intersection_array:

        # Convert Long, Lat to index
        x_meter = geopy.distance.distance((i[0], min_coord[1]), (i[0], i[1])).km * 1000
        y_meter = geopy.distance.distance(( max_coord[0], i[1]), (i[0], i[1])).km * 1000

        x_index = math.ceil(x_meter/scale)
        y_index = math.ceil(y_meter/scale)

        print(f"Index X = {x_index}, index Y = {y_index}")
        heatmap[x_index][y_index] = i[2]
        heatmap = spread_weight(heatmap, (x_index, y_index), 1)

    return heatmap
        


# @Params: beta_details - array of dictionaries that contains beta details
# Description: Will apply the heatmap to the sight area of each vehicle
# calculating their individual SI score.

def sight_interest_score(beta_details):

    ##### Lat (Y) #### Long (X) ###
    # -TL 44.289264, -76.575052

    # -BL 44.220767, -76.575052

    # -TR 44.289264, -76.462507

    # -BR 44.220767, -76.462507


    # Define bounding coords for Kingston Area
    min_coord = (44.220767, -76.575052) # Bottom Left Corner
    max_coord = (44.289264, -76.462507) # Top Right Corner

    # size (in meters) of each bin in heatmap
    scale = 10
    heatmap = create_heatmap()

    # loop through beta vehicles, calculate weight and add
    for i in beta_details:
        beta_coord = (i.PositionX, i.PositionY)
        
        # Convert from Long/Lat to meters
        x_meters = geopy.distance.distance(beta_coord, (beta_coord[0], min_coord[1])).km * 1000
        y_meters = geopy.distance.distance(beta_coord, (max_coord[0], beta_coord[1])).km * 1000

        x_index = math.floor(x_meters/scale)
        y_index = math.floor(y_meters/scale)

        print(f"Position of Vehicle is (X,Y) = ({x_index},{y_index})")

        # create new member denoting SIS
        i['SIS'] = calculate_weight(heatmap, (x_index, y_index), 3)


    return beta_details

# Commented out code for testing functions
#if __name__ == "__main__":

    '''testing calculate weight
    heatmap = [[0 for i in range(5)] for j in range(5)] 
    
    heatmap[0][0] = 6
    center = (2, 2)

    print(f"Size of heatmap is {len(heatmap)}")
    
    total = calculate_weight(heatmap, center, 2)
    print(f"The total sum for heatmap = {total}")'''