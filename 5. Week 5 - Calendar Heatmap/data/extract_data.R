# Week 5 - Data Extraction (R version)
# Goal: Aggregate data by Year and Week Number for Heatmap

library(tidyverse)
library(lubridate)

input_path <- "../../data/runs_only_redacted.csv"
output_path <- "weekly_distance_heatmap.csv"

if (file.exists(input_path)) {
  df <- read_csv(input_path, show_col_types = FALSE)
  
  heatmap_data <- df %>%
    mutate(Date = as.Date(Date)) %>%
    # ISOWek is often better for standards, but 'week' is fine.
    # Python script used 'isocalendar'.
    mutate(
      Year = isoyear(Date),
      Week = isoweek(Date)
    ) %>%
    group_by(Year, Week) %>%
    summarise(
      TotalDistance = sum(Distance, na.rm = TRUE) / 1000, # Convert to km
      RunCount = n(),
      .groups = "drop"
    ) %>%
    mutate(TotalDistance = round(TotalDistance, 2)) %>%
    arrange(Year, Week)
    
  write_csv(heatmap_data, output_path)
  print(paste("Saved data to", output_path))
  print(head(heatmap_data))

} else {
  stop("Input file not found")
}
