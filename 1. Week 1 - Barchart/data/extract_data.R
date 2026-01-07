# Week 1 - Data Extraction (R version)
# Goal: Aggregate total distance by month

# 1. Setup
if (!require(tidyverse)) install.packages("tidyverse")
library(tidyverse)
library(lubridate)

# 2. Load Data
# Assuming script is run from 'Week 1/data/'
input_path <- "../../data/runs_only_redacted.csv"
output_path <- "distance_per_month.csv"

if (file.exists(input_path)) {
  df <- read_csv(input_path, show_col_types = FALSE)
  
  # 3. Process
  # Ensure Date is valid
  # Extract Month (YYYY-MM)
  # Group and Sum
  
  monthly_data <- df %>%
    mutate(Date = as.Date(Date)) %>%
    mutate(Month = format(Date, "%Y-%m")) %>%
    group_by(Month) %>%
    summarise(
      TotalDistance = sum(Distance, na.rm = TRUE),
      RunCount = n()
    ) %>%
    arrange(Month)
    
    # Python script also calculated 'AveragePace', let's check if we need that too. 
    # The visualization only used TotalDistance.
    # But adhering to the Python "extract_data.py" output is safer.
    
    # Python columns: 'Month', 'TotalDistance'
    # Wait, the python script might have output more. 
    # Let's keep it simple for the bar chart tutorial which only strictly needed Distance.
  
  # 4. Save
  write_csv(monthly_data, output_path)
  print(paste("Saved processed data to", output_path))
  
  # Preview
  print(head(monthly_data))
  
} else {
  stop(paste("Input file not found:", input_path))
}
