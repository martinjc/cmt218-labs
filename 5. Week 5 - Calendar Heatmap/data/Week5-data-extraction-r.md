# Week 5 - Data Extraction (R)

## Goal

Prepare data for a Calendar Heatmap by aggregating distance by **Year** and **Week**.

## Instructions

### 1. Setup

```r
library(tidyverse)
library(lubridate)
```

### 2. Extracting Week Numbers

We use `isoyear` and `isoweek` to ensure standard week numbering (Monday start).

```r
df <- read_csv("../../data/runs_only_redacted.csv")

weekly_stats <- df %>%
  mutate(Date = as.Date(Date)) %>%
  mutate(
    Year = isoyear(Date),
    Week = isoweek(Date)
  )
```

### 3. Aggregating

```r
output <- weekly_stats %>%
  group_by(Year, Week) %>%
  summarise(
    TotalDistance = sum(Distance, na.rm = TRUE) / 1000, # Convert to km
    RunCount = n()
  ) %>%
  mutate(TotalDistance = round(TotalDistance, 2))
```

### 4. Saving

```r
write_csv(output, "weekly_distance_heatmap.csv")
```
