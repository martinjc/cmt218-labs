# Week 10 - Data Extraction (R)

## Goal

Create a clean dataset for our Linked View dashboard.

## Instructions

### 1. Setup

```r
library(tidyverse)
```

### 2. Processing

We need `Date`, `Month` (for grouping), `Distance` (for X axis), and `Pace` (for Y axis/Color).

```r
df <- read_csv("../../data/runs_only_redacted.csv")

clean_df <- df %>%
  mutate(
    Date = as.Date(Date),
    Month = format(Date, "%Y-%m"),
    Distance_km = round(Distance, 2),
    Pace_min_km = round((Time / 60) / Distance_km, 2)
  ) %>%
  filter(Distance_km > 0 & Pace_min_km > 0) %>%
  select(Date, Month, Distance_km, Pace_min_km)
```

### 3. Saving

```r
write_csv(clean_df, "linked_data.csv")
```
