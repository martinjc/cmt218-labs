# Week 9 - Maps (R)

## Goal

Visualize GPS tracks from a GeoJSON file using the `sf` (Simple Features) package.

## Instructions

### 1. Setup

Install `sf` for spatial data handling.

```r
install.packages("sf")
library(ggplot2)
library(sf)
```

### 2. Loading GeoJSON

`st_read` handles GeoJSON automatically.

```r
runs_sf <- st_read("../../data/runs.geojson")
```

### 3. Plotting with `geom_sf`

`ggplot2` has native support for `sf` objects. It handles coordinate systems and projections for you.

```r
ggplot(runs_sf) +
  geom_sf()
```

### 4. Refining

```r
ggplot(runs_sf) +
  geom_sf(color = "red", alpha = 0.5) +
  
  # Clean look
  theme_void() +
  labs(title = "All Run Routes")
```

### 5. Saving

```r
ggsave("map.png", width = 10, height = 10)
```
