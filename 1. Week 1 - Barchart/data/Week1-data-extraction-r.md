# Week 1 - Data Extraction (R)

## Goal

Process raw running data to calculate the **Total Distance per Month**.

## Instructions

### 1. Prerequisites

We will use the generic `tidyverse` package which includes `dplyr` (manipulation), `readr` (I/O), and `lubridate` (dates).

```r
install.packages("tidyverse")
library(tidyverse)
```

### 2. Loading Data

```r
df <- read_csv("../../data/runs_only_redacted.csv")
```

### 3. Date Parsing & Grouping

We need to convert the `Date` column to a Month format (YYYY-MM) to group our runs.

```r
monthly_stats <- df %>%
  # 1. Convert string to Date
  mutate(Date = as.Date(Date)) %>%
  
  # 2. Create 'Month' column
  mutate(Month = format(Date, "%Y-%m")) %>%
  
  # 3. Group by Month
  group_by(Month) %>%
  
  # 4. Sum Distance
  summarise(TotalDistance = sum(Distance, na.rm = TRUE))
```

### 4. Saving the Result

```r
write_csv(monthly_stats, "distance_per_month.csv")
```

### Verification
Check the first few rows:
```r
head(monthly_stats)
```
