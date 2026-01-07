import json
import matplotlib.pyplot as plt
import os

def visualize():
    data_path = '../../data/runs.geojson'
    
    if not os.path.exists(data_path):
        print(f"Data not found at {data_path}")
        return

    with open(data_path, 'r') as f:
        data = json.load(f)
    
    plt.figure(figsize=(10, 10))
    
    # Iterate through features and plot LineStrings
    for feature in data['features']:
        geom = feature['geometry']
        if geom['type'] == 'LineString':
            coords = geom['coordinates']
            # GeoJSON is [lon, lat], matplotlib needs x (lon), y (lat) lists
            lons = [c[0] for c in coords]
            lats = [c[1] for c in coords]
            
            plt.plot(lons, lats, color='#e74c3c', alpha=0.5, linewidth=1)
            
    plt.title('Run Routes Map', fontsize=16)
    plt.axis('equal') # Standard for maps
    plt.axis('off')   # Clean look
    
    plt.tight_layout()
    plt.savefig('map.png')
    print("Map saved to map.png")
    plt.show()

if __name__ == "__main__":
    visualize()
