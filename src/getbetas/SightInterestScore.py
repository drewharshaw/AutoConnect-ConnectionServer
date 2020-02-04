import overpy
import json
import geojson

# Helpfull debug tool for formulating Query http://overpass-api.de/

if __name__ == "__main__":

    # create new instance of Overpass API
    api = overpy.Overpass()


    # node(S = [min Lat], W = [min Long], N = [max Lat], E = [max Long]) not wot[timeout:3600];
    result = api.query("[out:json];way[highway=traffic_signals];node(43.1205,-79.2856,43.1654,-79.1934);out;")
    
    print(hasattr(result,'elements'))
    
    intersectionPoints = []


    with open('stCats.json') as f:
        data = json.load(f)


        # loop through array of objects
        for node in data['elements']:
            if ('tags' in node):
                if ('highway' in node['tags']):
                        if node['tags']['highway'] == "traffic_signals":
                            coords = [node['lat'], node['lon'], 0.4]
                            intersectionPoints.append(coords.copy())



    with open('intersections.json', 'w') as outfile:
        json.dump(intersectionPoints,outfile)  
                


    #with open('intersections.json', 'w') as outfile:
        #outfile.write(str(result))
        #json.dump(result, outfile)

    #print(result.elements)
    #result = result.elements
    
    #result = json.loads(result)

 
'''
    # search through nodes
    for i in result.ways:
        print(i)
        if hasattr(i, 'tags'):
            if hasattr(i.tags, 'highway'):
                print('HIGHWAY')
                if i.tags.highway == "traffic_signals":
                    print('Intersection Found')
                    node = [i.lat, i.long, 0.4]
                    intersectionPoints.append(node.copy())
 
'''




#point LEFT TOP 43.1654, -79.2856

#point BOTTOM RIGHT 43.1205, -79.1934

# highway = "motorway junction"