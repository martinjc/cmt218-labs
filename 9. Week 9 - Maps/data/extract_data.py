import pandas as pd
import json
import ast
import os

def extract_data():
    try:
        import polyline
        HAS_POLYLINE = True
    except ImportError:
        HAS_POLYLINE = False
        print("Warning: 'polyline' library not found. Installing via pip recommended for full paths.")
        print("Falling back to straight lines between start/end points.")

    input_path = '../../data/runs_only_redacted.csv'
    output_path = 'runs.geojson'
    
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found")
        return

    df = pd.read_csv(input_path)
    
    features = []
    
    for i, row in df.iterrows():
        try:
            # Parse Map column
            map_data = row['map']
            if isinstance(map_data, str):
                # It's a string representation of a dict
                map_dict = ast.literal_eval(map_data)
                encoded_polyline = map_dict.get('summary_polyline')
                
                coordinates = []
                
                if HAS_POLYLINE and encoded_polyline:
                    # decode returns [(lat, lon), ...]
                    # GeoJSON expects [lon, lat]
                    decoded = polyline.decode(encoded_polyline)
                    coordinates = [[lon, lat] for lat, lon in decoded]
                else:
                    # Fallback: Start/End
                    start = ast.literal_eval(row['start_latlng'])
                    end = ast.literal_eval(row['end_latlng'])
                    coordinates = [
                        [start[1], start[0]], # lon, lat
                        [end[1], end[0]]
                    ]
                
                if coordinates:
                    feature = {
                        "type": "Feature",
                        "properties": {
                            "id": i,
                            "distance": row['distance'],
                            "date": row['start_date']
                        },
                        "geometry": {
                            "type": "LineString",
                            "coordinates": coordinates
                        }
                    }
                    features.append(feature)
                    
        except Exception as e:
            # Skip invalid rows
            continue
            
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }
    
    with open(output_path, 'w') as f:
        json.dump(geojson, f)
        print(f"Created {output_path} with {len(features)} features")

if __name__ == "__main__":
    extract_data()
