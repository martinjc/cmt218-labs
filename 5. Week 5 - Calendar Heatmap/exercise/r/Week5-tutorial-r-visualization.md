# Week 5 - Visualization (R)

## Goal

Create a Calendar Heatmap to visualize distance intensity over weeks and years.

## Instructions

### 1. Setup

```r
library(ggplot2)
library(readr)
```

### 2. Loading Data

```r
df <- read_csv("../../data/weekly_distance_heatmap.csv")
```

### 3. Creating the Heatmap

We use `geom_tile()` to create a grid. Requires x (Week), y (Year), and fill (Distance).

```r
ggplot(df, aes(x = Week, y = Year, fill = TotalDistance)) +
  geom_tile(color = "white") # White border makes grid visible
```

### 4. Refining

```r
ggplot(df, aes(x = Week, y = Year, fill = TotalDistance)) +
  geom_tile(color = "white") +
  
  # Custom Gradient
  scale_fill_gradient(low = "lightgreen", high = "darkgreen") +
  
  # Ensure Y axis shows years as integers, not decimals
  scale_y_continuous(breaks = unique(df$Year)) +
  
  theme_minimal() +
  labs(title = "Weekly Distance Heatmap")
```

### 5. Saving

```r
ggsave("heatmap.png", width = 12, height = 8)
```
