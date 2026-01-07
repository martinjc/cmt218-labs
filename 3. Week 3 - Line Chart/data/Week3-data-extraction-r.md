# Week 3 - Data Extraction (R)

## Goal

Calculate the **Trailing 365-Day Total Distance** for each day.

## Instructions

### 1. Setup

We use the `slider` package, which is excellent for window functions on dates.

```r
install.packages("slider")
library(tidyverse)
library(slider)
```

### 2. Loading and Aggregating

Aggegate runs by day first.

```r
df <- read_csv("../../data/runs_only_redacted.csv")

daily_df <- df %>%
  mutate(Date = as.Date(Date)) %>%
  group_by(Date) %>%
  summarise(DailyDist = sum(Distance, na.rm = TRUE)) %>%
  arrange(Date)
```

### 3. Rolling Window Calculation

We use `slide_index_sum` to look back 365 days from each row's `Date`.

```r
result_df <- daily_df %>%
  mutate(
    TotalDistanceMeters = slide_index_sum(
      x = DailyDist,
      i = Date,       # The index column
      before = 365    # Look back 365 days
    )
  ) %>%
  mutate(TotalDistance = round(TotalDistanceMeters / 1000, 2))
```

### 4. Saving

```r
write_csv(result_df %>% select(Date, TotalDistance), "trailing_365_distance.csv")
```
