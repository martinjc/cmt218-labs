# Week 4 - Data Extraction (R version)
# Goal: Categorize runs by Time of Day (AM/PM)

library(tidyverse)
library(lubridate)

input_path <- "../../data/runs_only_redacted.csv"
output_path <- "time_of_day_counts.csv"

if (file.exists(input_path)) {
  df <- read_csv(input_path, show_col_types = FALSE)
  
  # 1. Parse Date/Time
  # If 'Date' includes time, extract Hour.
  # If not, use 'start_date_local' or similar if available.
  # Python script inferred hour from 'Date' datetime object.
  # Let's check if 'Date' string has time.
  # If 'Date' is "YYYY-MM-DD HH:MM:SS", we are good.
  
  counts <- df %>%
    mutate(Datetime = as.POSIXct(Date, format="%Y-%m-%d %H:%M:%S")) %>%
    mutate(Hour = hour(Datetime)) %>%
    
    # 2. Categorize
    mutate(Category = case_when(
      Hour < 12 ~ "AM",
      Hour >= 12 ~ "PM",
      TRUE ~ "Unknown"
    )) %>%
    
    # 3. Aggregation
    group_by(Category) %>%
    summarise(Count = n())
    
  write_csv(counts, output_path)
  print(paste("Saved data to", output_path))
  print(counts)

} else {
  stop("Input file not found")
}
