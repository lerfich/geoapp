from flask import Flask, request, jsonify
from flask_cors import cross_origin
import pandas as pd
from math import pi, cos, sin, atan2, sqrt
import json
import pandas as pd
# target_point = {'latitude':59.2778,'longitude':30.6692312}

app = Flask(__name__)
app.config["SERVER_NAME"] = "localhost:5001"

@app.route('/handling', methods=['GET','POST','OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type', 'Access-Control-Allow-Origin'])
def add_some_points():
    initial_point = json.loads(request.data)
    # print(initial_point, 'init point', initial_point['isLocalSearch'])
    print('request started')
    #если ломается мб ошибка в пути, у меня такой подходит только
    points_data = pd.read_csv('geodata_202312161354.csv')
    
    #if points_data['isLocalSearch'] == 1:
    #local_points = points_data[points_data['geolocation_state']==initial_point['state']]
    #if len(local_points)==0:
    #print('No data in this country, only global search avaliable')
    #else:
    #points_data = local_points
    
    print('request ok')
    points_data = points_data[['geolocation_lat',	'geolocation_lng',	'geolocation_city']]
    points_data['dist'] = points_data.apply(lambda x: getDistanceFromLatLonInKm(lat1=x['geolocation_lat'], lon1=x['geolocation_lng'], lat2=initial_point['latitude'], lon2=initial_point['longitude']), axis=1)

    points_data = points_data.sort_values(['dist'])
    final_point_coords = []
    for elem in points_data[:5].itertuples():
        final_point_coords.append({'latitude': elem.geolocation_lat, 'longitude': elem.geolocation_lng, 'entityName': elem.geolocation_city, 'distance': round(elem.dist, 3)})
    return {'title': 'hospitals','entities': json.dumps(final_point_coords)}

def getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2):
    eR = 6371; #Radius of the earth in km
    dLat = deg2rad(lat2-lat1); 
    dLon = deg2rad(lon2-lon1); 
    a = sin(dLat/2) ** 2 + cos(deg2rad(lat1)) * cos(deg2rad(lat2)) * sin(dLon/2) ** 2
    
    c = 2 * atan2(sqrt(a), sqrt(1-a)); 
    return eR * c # Distance in km

def deg2rad(deg):
  return deg * (pi/180)


if __name__ == '__main__':
    app.run(debug=True)