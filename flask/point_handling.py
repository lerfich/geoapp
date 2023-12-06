from flask import Flask, request, jsonify
import json
target_point = {'latitude':59.2778,'longitude':30.6692312}
app = Flask(__name__)

app.config["SERVER_NAME"] = "localhost:5000"

@app.route('/handling', methods=['GET','POST'])
def add_some_points(target_point=target_point):
    
    #data = request.json
    #data = json.loads(data)

    # points - все точки из бд, предполагаемо json
    points = {
        'points':
        [
            {'latitude':59.27774123094036,'longitude':30.668361267997472},
            {'latitude':59.21231231,'longitude':30.66232},
            {'latitude':59.2123123,'longitude':30.6231},
            {'latitude':59.27123123,'longitude':30.6123},
            {'latitude':59.21287123,'longitude':31.6123},
            {'latitude':60.21287123,'longitude':29.6123}
        ]
    }
    results = []
    for point in points['points']:
        dist = ((point['latitude']-target_point['latitude'])**2 + (point['longitude']-target_point['longitude'])**2)**0.5
        results.append((point['latitude'], point['longitude'], dist))
    results = sorted(results, key=lambda x: x[-1])[:5]
    final_point_coords = []
    for elem in results:
        final_point_coords.append([elem[0], elem[1]])
    return {'title':'hospitals','coordinates':json.dumps(final_point_coords)}

if __name__ == '__main__':
    app.run(debug=True)