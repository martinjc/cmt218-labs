# Week 3 - Visualization (R)

## Goal

Create a Line Chart to visualize the trend of Trailing 365-Day Distance over time.

## Instructions

### 1. Setup

```r
library(ggplot2)
library(readr)
```

### 2. Loading Data

`readr` automatically parses `YYYY-MM-DD` strings into Date objects.

```r
df <- read_csv("../../data/trailing_365_distance.csv")
```

### 3. Basic Line Chart

```r
ggplot(df, aes(x = Date, y = TotalDistance)) +
  geom_line(color = "#e74c3c")
```

### 4. Date Axis Formatting

Use `scale_x_date` to control labels and breaks.

```r
ggplot(df, aes(x = Date, y = TotalDistance)) +
  geom_line(color = "#e74c3c") +
  
  # Custom Axis
  scale_x_date(
    date_labels = "%Y-%m",    # Format: Year-Month
    date_breaks = "1 year"    # Step: 1 year
  ) + 
  
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
```

### 5. Saving

```r
ggsave("trailing_distance_chart.png", width = 12, height = 6)
```
