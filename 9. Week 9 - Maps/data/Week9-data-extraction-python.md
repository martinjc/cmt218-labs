# Week 9 - Data Extraction (Python for GeoJSON)

## Goal

Convert raw GPS trajectory data (encoded polylines) into GeoJSON format for web mapping.

## Prerequisites

You may need the `polyline` library:
```bash
pip install polyline
```

## Instructions

### 1. Setup

Import libraries.

```python
import pandas as pd
import json
import polyline # for decoding Google Polyline format
import ast # for parsing stringified dicts
```

### 2. Processing

Iterate through the CSV rows.

```python
features = []

for i, row in df.iterrows():
    # Parse the 'map' column string to a dictionary
    map_dict = ast.literal_eval(row['map'])
    encoded = map_dict.get('summary_polyline')
    
    if encoded:
        # Decode: returns [(lat, lon), ...]
        points = polyline.decode(encoded)
        
        # GeoJSON requires [lon, lat]
        coordinates = [[lon, lat] for lat, lon in points]
        
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": coordinates
            },
            "properties": {
                "id": row['id'],
                "distance": row['distance']
            }
        }
        features.append(feature)
```

### 3. Output

Save as a FeatureCollection.

```python
geojson = {
    "type": "FeatureCollection",
    "features": features
}

with open('runs.geojson', 'w') as f:
    json.dump(geojson, f)
```
