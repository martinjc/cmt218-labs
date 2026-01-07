# Week 2 - Data Extraction (R version)
# Goal: Calculate Distance and Pace for Scatter Plot

library(tidyverse)

input_path <- "../../data/runs_only_redacted.csv"
output_path <- "distance_vs_pace.csv"

if (file.exists(input_path)) {
  df <- read_csv(input_path, show_col_types = FALSE)
  
  # Python script logic:
  # Distance_km = Distance
  # AveragePace_min_km = Time (min) / Distance (km)
  # But we need time in minutes. 
  # If 'Time' is in seconds (common in GPS watches), divide by 60.
  # Let's check headers. Usually 'Time' or 'Duration'. 
  # Assuming 'Time' exists and is in minutes based on Python script viewing.
  # "df['Time'] / 60" in python implies 'Time' column was seconds? 
  # Wait, let's verify column names from previous Context or assume standard:
  # "Time" (seconds) -> / 60 -> minutes.
  
  processed_df <- df %>%
    mutate(
      Distance_km = round(Distance, 2),
      
      # Python script: (df['Time'] / 60) / df['Distance']
      # So 'Time' is in seconds.
      AveragePace_min_km = round((Time / 60) / Distance, 2)
    ) %>%
    select(Distance_km, AveragePace_min_km) %>%
    filter(!is.na(Distance_km) & !is.na(AveragePace_min_km)) %>%
    filter(is.finite(AveragePace_min_km)) # Clean infinite pace (div by zero)
  
  write_csv(processed_df, output_path)
  print(paste("Saved data to", output_path))
  
} else {
  stop("Input file not found")
}
