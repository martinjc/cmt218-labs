# Week 8 - Colouring (R)

## Goal

Create a Bar Chart where the color of each bar represents its value.

## Instructions

### 1. Setup

```r
library(ggplot2)
library(readr)
```

### 2. Basic Bar Chart with Fill

Map `fill` to a continuous variable (`TotalDistance`).

```r
df <- read_csv("../../data/distance_per_month.csv")

ggplot(df, aes(x = Month, y = TotalDistance, fill = TotalDistance)) +
  geom_col()
```

### 3. Customizing Colors

Use `scale_fill_viridis_c` or `scale_fill_gradient` to change colors.

```r
ggplot(df, aes(x = Month, y = TotalDistance, fill = TotalDistance)) +
  geom_col() +
  scale_fill_viridis_c(option = "plasma")
```

### 4. Refining

```r
  theme_minimal() +
  labs(title = "Monthly Distance by Intensity", fill = "km") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
```

### 5. Saving

```r
ggsave("colored_bar_chart.png", width = 12, height = 6)
```
