from flask import Flask, request, jsonify
from flask_cors import cross_origin
from math import pi, cos, sin, atan2, sqrt
import json
# target_point = {'latitude':59.2778,'longitude':30.6692312}

app = Flask(__name__)
app.config["SERVER_NAME"] = "localhost:5001"

@app.route('/handling', methods=['GET','POST','OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type', 'Access-Control-Allow-Origin'])
def add_some_points():
    initial_point = json.loads(request.data)

    # points - все точки из бд, предполагаемо json
    points = {
        'points':
        [
            {'latitude':59.27774123094036,'longitude':30.668361267997472, 'entityName': 'Hopsital of St.Arman'}, 
            {'latitude':59.21231231,'longitude':30.66232, 'entityName': 'Hopsital of St.Belmenhao'},
            {'latitude':59.2123123,'longitude':30.6231, 'entityName': 'Hopsital of St.Joseph'},
            {'latitude':59.27123123,'longitude':30.6123, 'entityName': 'Hopsital of St.Luis'},
            {'latitude':59.21287123,'longitude':31.6123, 'entityName': 'Hopsital of St.Angeles'},
            {'latitude':60.21287123,'longitude':29.6123, 'entityName': 'Hopsital of St.Victor'}
        ]
    }
    results = []
    for point in points['points']:
        # dist = ((point['latitude']-initial_point['latitude'])**2 + (point['longitude']-initial_point['longitude'])**2)**0.5
        dist = getDistanceFromLatLonInKm(point['latitude'], point['longitude'], initial_point['latitude'], initial_point['longitude'])
        results.append((point['latitude'], point['longitude'], point['entityName'], dist))

    results = sorted(results, key=lambda x: x[-1])[:5]
    final_point_coords = []
    
    for elem in results:
        final_point_coords.append({'latitude': elem[0], 'longitude': elem[1], 'entityName': elem[2], 'distance': elem[3]})

    print(final_point_coords, 'sss')
    return {'title': 'hospitals','entities': json.dumps(final_point_coords)}

def getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2):
    eR = 6371; #Radius of the earth in km
    dLat = deg2rad(lat2-lat1); 
    dLon = deg2rad(lon2-lon1); 
    a = sin(dLat/2) * sin(dLat/2) + cos(deg2rad(lat1)) * cos(deg2rad(lat2)) * sin(dLon/2) * sin(dLon/2)
    
    c = 2 * atan2(sqrt(a), sqrt(1-a)); 
    d = eR * c; # Distance in km
    print(d, 'distance in km')
    return d


def deg2rad(deg):
  return deg * (pi/180)


if __name__ == '__main__':
    app.run(debug=True)