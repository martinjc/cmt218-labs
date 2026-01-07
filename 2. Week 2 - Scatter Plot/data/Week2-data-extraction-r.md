# Week 2 - Data Extraction (R)

## Goal

Calculate **Average Pace** (min/km) from raw Time and Distance data.

## Instructions

### 1. Setup

```r
library(tidyverse)
```

### 2. Loading Data

```r
df <- read_csv("../../data/runs_only_redacted.csv")
```

### 3. Calculating Columns

We use `mutate` to create new columns.

*   `Distance` is already in km.
*   `Time` is in seconds. Convert to minutes: `Time / 60`.
*   `Pace` = Time (min) / Distance (km).

```r
df_processed <- df %>%
  mutate(
    # Create clear column names
    Distance_km = Distance,
    
    # Calculate Pace
    time_min = Time / 60,
    AveragePace_min_km = time_min / Distance_km
  ) %>%
  
  # Keep only relevant columns
  select(Distance_km, AveragePace_min_km)
```

### 4. Cleaning

Remove any invalid rows (e.g., distance = 0).

```r
df_clean <- df_processed %>%
  filter(is.finite(AveragePace_min_km)) %>% 
  mutate(across(where(is.numeric), \(x) round(x, 2))) # Round to 2 decimals
```

### 5. Saving

```r
write_csv(df_clean, "distance_vs_pace.csv")
```
