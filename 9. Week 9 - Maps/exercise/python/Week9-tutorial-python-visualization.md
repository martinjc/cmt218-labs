# Week 9 - Maps (Python & Matplotlib)

## Goal

Visualize GPS tracks from a GeoJSON file.

## Instructions

### 1. Loading GeoJSON

We use Python's built-in `json` library.

```python
import json
import matplotlib.pyplot as plt

with open('../../data/runs.geojson', 'r') as f:
    geojson = json.load(f)
```

### 2. Parsing Geometry

Extract coordinates from each Feature. GeoJSON stores coordinates as `[longitude, latitude]`.

```python
plt.figure(figsize=(10, 10))

for feature in geojson['features']:
    geometry = feature['geometry']
    
    if geometry['type'] == 'LineString':
        coords = geometry['coordinates']
        
        # Split into separate lists for X and Y
        lons = [p[0] for p in coords]
        lats = [p[1] for p in coords]
        
        # Plot
        plt.plot(lons, lats, color='red', alpha=0.5, linewidth=1)
```

### 3. Formatting

```python
# Keep Refect Aspect Ratio (Crucial for Maps)
plt.axis('equal')

# Hide Axes for a cleaner look
plt.axis('off')

plt.title('All Run Routes')
plt.show()
```
