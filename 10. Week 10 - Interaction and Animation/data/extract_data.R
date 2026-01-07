# Week 10 - Data Extraction (R version)
# Goal: Prepare data for Interactive Dashboard (Date, Distance, Pace)

library(tidyverse)

input_path <- "../../data/runs_only_redacted.csv"
output_path <- "linked_data.csv"

if (file.exists(input_path)) {
  df <- read_csv(input_path, show_col_types = FALSE)
  
  # Select and Transform
  processed <- df %>%
    mutate(
      Date = as.Date(Date),
      Month = format(Date, "%Y-%m"), # For aggregation
      Distance_km = round(Distance, 2),
      
      # Pace Calculation
      # Check if Time/Moving_Time exists or infer
      # Using standard logic: Pace = Time(min) / Dist(km)
      time_min = Time / 60,
      Pace_min_km = round(time_min / Distance_km, 2)
    ) %>%
    
    # Filter valid
    filter(Distance_km > 0, Pace_min_km > 0, is.finite(Pace_min_km)) %>%
    
    # Select cols needed for linked views
    select(Date, Month, Distance_km, Pace_min_km)
    
  write_csv(processed, output_path)
  print(paste("Saved linked data to", output_path))
  print(head(processed))

} else {
  stop("Input file not found")
}
