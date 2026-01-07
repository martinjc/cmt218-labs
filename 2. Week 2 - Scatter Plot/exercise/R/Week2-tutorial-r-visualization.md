# Week 2 - Visualization (R)

## Goal

Create a Scatter Plot to analyze the relationship between Distance and Pace.

## Instructions

### 1. Setup

```r
library(ggplot2)
library(readr)
```

### 2. Basic Scatter Plot

Mapping X and Y.
```r
df <- read_csv("../../data/distance_vs_pace.csv")

ggplot(df, aes(x = Distance_km, y = AveragePace_min_km)) +
  geom_point()
```

### 3. Adding Dimensions (Color)

We map the `color` aesthetic to `AveragePace_min_km` to create a gradient.

```r
ggplot(df, aes(x = Distance_km, y = AveragePace_min_km, color = AveragePace_min_km)) +
  geom_point(alpha = 0.7) + # alpha for transparency
  scale_color_viridis_c(option = "magma") # Beautiful color scale
```

### 4. Details

```r
labs(
  title = "Distance vs. Pace",
  x = "Distance (km)",
  y = "Pace (min/km)"
) +
theme_light()
```

### 5. Saving

```r
ggsave("distance_vs_pace_chart.png", width = 10, height = 6)
```
