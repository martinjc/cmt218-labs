# Week 7 - Data Extraction (R)

## Goal

Calculate a single row of Global Key Performance Indicators (KPIs).

## Instructions

### 1. Setup

```r
library(tidyverse)
```

### 2. Loading Data

```r
df <- read_csv("../../data/runs_only_redacted.csv")
```

### 3. Calculating KPIs

We use `summarise` to collapse the entire dataset into one row of stats.

```r
kpis <- df %>%
  summarise(
    TotalRuns = n(),
    TotalDistance = sum(Distance, na.rm = TRUE) / 1000, # km
    LongestRun = max(Distance, na.rm = TRUE) / 1000,    # km
    AvgDistance = mean(Distance, na.rm = TRUE) / 1000   # km
  ) %>%
  # Round everything to 2 decimal places
  mutate(across(everything(), \(x) round(x, 2)))
```

### 4. Saving

```r
write_csv(kpis, "kpi_stats.csv")
```
