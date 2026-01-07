# Week 1 - Visualization (R & ggplot2)

## Goal

Create a Bar Chart of monthly distances using R's `ggplot2` library.

## Instructions

### 1. Setup

Ensure you have the `tidyverse` or `ggplot2` installed.

```r
install.packages("ggplot2")
install.packages("readr")
library(ggplot2)
library(readr)
```

### 2. Loading Data

```r
df <- read_csv("../../data/distance_per_month.csv")
```

### 3. Creating the Chart

We use `geom_col()` for bar charts where heights are pre-calculated.

```r
ggplot(df, aes(x = Month, y = TotalDistance)) +
  geom_col(fill = "rebeccapurple")
```

### 4. Refining

Adding titles, themes, and rotating labels.

```r
ggplot(df, aes(x = Month, y = TotalDistance)) +
  geom_col(fill = "rebeccapurple") +
  
  # Labels
  labs(title = "Total Distance per Month", x = "Month", y = "Distance (km)") +
  
  # Theme
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
```

### 5. Saving

```r
ggsave("monthly_distance_chart.png", width = 10, height = 6)
```
