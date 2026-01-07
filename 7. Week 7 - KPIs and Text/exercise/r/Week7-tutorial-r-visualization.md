# Week 7 - Visualization (R)

## Goal

Create a text-based graphic (Infographic) to display Key Performance Indicators.

## Instructions

### 1. Setup

```r
library(ggplot2)
library(readr)
```

### 2. Loading Data

```r
df <- read_csv("../../data/kpi_stats.csv")
```

### 3. Reshaping for Plotting

Since we want to plot multiple unrelated numbers side-by-side, we create a new temporary dataframe.

```r
plot_data <- data.frame(
  Label = c("Runs", "Distance"),
  Value = c(df$TotalRuns, paste(df$TotalDistance, "km")),
  x = c(1, 2), # Position on X axis
  y = c(1, 1)  # Fixed Y Position
)
```

### 4. Creating the Plot

We use `geom_text` twice: once for the big value, once for the small label.

```r
ggplot(plot_data, aes(x = x, y = y)) +
  # Big Value
  geom_text(aes(label = Value), size = 10, fontface = "bold", vjust = -0.5) +
  # Small Label
  geom_text(aes(label = Label), size = 5, vjust = 1.5, color = "grey") +
  
  theme_void() + # Remove all grid/axes
  scale_x_continuous(limits = c(0.5, 2.5))
```

### 5. Saving

```r
ggsave("kpi_dashboard.png", width = 10, height = 3)
```
