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
from geopy import distance
from math import floor
import matplotlib.pyplot as plt
import numpy as np

# import geopy.distance

# @Params: min_coord - tuple of minimum Lat, Long
# @Params: max_coord - tuple of maximum Lat, Long
# Description: Will query the Overpy API for all traffic_signals tags
# Notes: Currently not returning expected output


def get_intersection_coords(BL_coord, TR_coord):

    # create new instance of Overpass API
    api = overpy.Overpass()

    # 44.220767,-76.575052,44.289264,-76.462507
    result = api.query(
        f"""[out:json];(node["highway"="traffic_signals"]({BL_coord[0]}, {BL_coord[1]}, {TR_coord[0]}, {TR_coord[1]}););out;>;out skel;""")

    intersection_coords = []

    for node in result.nodes:
        intersection_coords.append({'lat': node.lat, 'long': node.lon})

    # print list for debugging
    # for x in range(len(intersection_coords)):
    #    print(f"\n {intersection_coords[x]}")
    return intersection_coords

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
    result = api.query(
        f"[out:json];way[highway=motorway junction];node({min_lat},{min_long},{max_lat},{max_long});out;")

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

    x, y = center

    # Check out of bound error
    if (layer > x or layer > y):
        return -1

    for i in range(layer*2):
        for j in range(layer*2):
            if ((i, j) == (center)):
                continue
            sum += heatmap[i][j]

    return sum

# @Params: heatmap - 2D list
# @Params: center - tuple index (X,Y)
# @Params: layer - denoting the number of layers around center
# Description: Speads a weight surrounding the center


def spread_weight(heatmap, center, layer):

    x, y = center

    # Check out of bound error
    if (layer > x or layer > y):
        return -1

    for i in range(layer*2):
        for j in range(layer*2):
            if ((i, j) == (center)):
                continue
            heatmap[i][j] = 1.0

    return heatmap

# @Params: None
# Description: Creates a 2D list containing


def create_heatmap(BL_coord, TR_coord):

    # Small test coords
    # (44.237489, -76.503345) BL
    # (44.237673, -76.502978) TR

    # find horizontal distance (in meters) for geographical area
    x_length = distance.distance(
        BL_coord, (BL_coord[0], TR_coord[1])).km * 1000

    y_length = distance.distance(
        BL_coord, (TR_coord[0], BL_coord[1])).km * 1000

    print(f"The calculated distances are ({x_length} m, {y_length} m)")

    # Calculate bin size
    default_bin_size = 30  # default heatmap bin side length (in meters)

    bin_length = default_bin_size + \
        (x_length % default_bin_size)/floor(x_length/default_bin_size)

    heatmap_side_length = int(x_length/bin_length)

    print(
        f"The new bin length is {bin_length}, Total bins = {heatmap_side_length}")

    # Create 2D list, initialized with 0.4
    heatmap = [[0.4 for i in range(heatmap_side_length)]
               for j in range(heatmap_side_length)]

    # fill in intersection weights
    intersection_list = get_intersection_coords(BL_coord, TR_coord)

    # intersections = [{'lat': 44.220767, 'long': -76.575052}]

    for coord in intersection_list:
        # convert Lat, Long coord to heatmap coord

        x = distance.distance(
            (coord['lat'], coord['long']), (coord['lat'], BL_coord[1])).km * 1000

        y = distance.distance(
            (coord['lat'], coord['long']), (TR_coord[0], coord['long'])).km * 1000

        # print(f"Distance in meters from origin is x = {x}, y = {y}")
        print(
            f"Bin calculation is x = {floor(x/bin_length)} y = {floor(y/bin_length)}")

        heatmap[floor(x/bin_length)][floor(y/bin_length)] = 5

    a = np.array(heatmap)
    plt.imshow(a)
    plt.show()

    '''
    for i in intersection_array:

        # Convert Long, Lat to index
        x_meter = distance.distance(
            (i[0], min_coord[1]), (i[0], i[1])).km * 1000
        y_meter = distance.distance(
            (max_coord[0], i[1]), (i[0], i[1])).km * 1000

        x_index = math.ceil(x_meter/scale)
        y_index = math.ceil(y_meter/scale)

        print(f"Index X = {x_index}, index Y = {y_index}")
        heatmap[x_index][y_index] = i[2]
        heatmap = spread_weight(heatmap, (x_index, y_index), 1)

    return heatmap
    '''

# @Params: beta_details - list of dictionaries that contains beta details
# Description: Will apply the heatmap to the sight area of each vehicle
# calculating their individual SI score.


def sight_interest_score(beta_details):

    # Define bounding coords for Kingston Area
    min_coord = (44.220767, -76.575052)  # Bottom Left Corner
    max_coord = (44.289264, -76.462507)  # Top Right Corner

    # size (in meters) of each bin in heatmap
    scale = 10
    heatmap = create_heatmap()

    # loop through beta vehicles, calculate weight and add
    for i in beta_details:
        beta_coord = (i.PositionX, i.PositionY)

        # Convert from Long/Lat to meters
        x_meters = geopy.distance.distance(
            beta_coord, (beta_coord[0], min_coord[1])).km * 1000
        y_meters = geopy.distance.distance(
            beta_coord, (max_coord[0], beta_coord[1])).km * 1000

        x_index = math.floor(x_meters/scale)
        y_index = math.floor(y_meters/scale)

        print(f"Position of Vehicle is (X,Y) = ({x_index},{y_index})")

        # create new member denoting SIS
        i['SIS'] = calculate_weight(heatmap, (x_index, y_index), 3)

    return beta_details

# Commented out code for testing functions


def main():

    # Define bounding coords for Kingston Area
    BL_coord = (44.220767, -76.575052)  # Bottom Left
    TR_coord = (44.289264, -76.462507)  # Top Right

    create_heatmap(BL_coord, TR_coord)  # tested and working

    # get_intersection_coords(BL_coord, TR_coord)

    '''testing calculate weight
    heatmap = [[0 for i in range(5)] for j in range(5)] 
    
    heatmap[0][0] = 6
    center = (2, 2)

    print(f"Size of heatmap is {len(heatmap)}")
    
    total = calculate_weight(heatmap, center, 2)
    print(f"The total sum for heatmap = {total}")'''


main()
