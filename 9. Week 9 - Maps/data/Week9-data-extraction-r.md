# Week 9 - Data Extraction (R)

## Goal

Decode encoded GPS polyline strings into a GeoJSON file format.

## Instructions

### 1. Setup

We need `googlePolylines` to decode the strings and `sf` to create the spatial file.

```r
install.packages(c("googlePolylines", "sf", "tidyverse"))
library(tidyverse)
library(googlePolylines)
library(sf)
```

### 2. Loading and Extracting Polylines

The raw CSV might store polylines in a formatted string column.

```r
df <- read_csv("../../data/runs_only_redacted.csv")

# Ensure we have the polyline string. 
# Depending on your CSV structure, you might need to clean the column first.
# Assuming column 'polyline' exists or is extracted.
polylines <- df$map # or df$summary_polyline
```

### 3. Decoding

`googlePolylines::decode` returns a list of coordinates (lat/lon).

```r
coords_list <- decode(polylines)
```

### 4. Creating Spatial Objects (sf)

We convert the list of coordinates into `LineString` geometries.

```r
# Convert to sf Linestrings
lines_list <- lapply(coords_list, function(df) {
  # Ensure columns are lon, lat order for GeoJSON
  st_linestring(as.matrix(df[, c("lon", "lat")]))
})

# Create Simple Feature Column (CRS 4326 = GPS WGS84)
geometry <- st_sfc(lines_list, crs = 4326)

# Create sf Data Frame
runs_sf <- st_sf(geometry = geometry)
```

### 5. Saving

```r
st_write(runs_sf, "runs.geojson", delete_dsn = TRUE)
```
