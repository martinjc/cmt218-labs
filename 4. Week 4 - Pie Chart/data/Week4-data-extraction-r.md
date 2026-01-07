# Week 4 - Data Extraction (R)

## Goal

Classify runs into **AM** (Morning) and **PM** (Afternoon/Evening) categories.

## Instructions

### 1. Setup

`lubridate` helps extracting hours from dates.

```r
library(tidyverse)
library(lubridate)
```

### 2. Loading and Processing

```r
df <- read_csv("../../data/runs_only_redacted.csv")

processed <- df %>%
  # Parse DateTime
  mutate(Datetime = as.POSIXct(Date, format="%Y-%m-%d %H:%M:%S")) %>%
  
  # Extract Hour (0-23)
  mutate(Hour = hour(Datetime)) %>%
  
  # Classify using case_when
  mutate(Category = case_when(
    Hour < 12 ~ "AM",
    TRUE      ~ "PM"
  ))
```

### 3. Aggregating

Count runs per category.

```r
counts <- processed %>%
  count(Category, name = "Count")
```

### 4. Saving

```r
write_csv(counts, "time_of_day_counts.csv")
```
