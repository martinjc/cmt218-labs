# Week 3 - Data Extraction (R version)
# Goal: Calculate Trailing 365-Day Total Distance

if (!require(tidyverse)) install.packages("tidyverse")
if (!require(slider)) install.packages("slider") # Modern rolling window package
library(tidyverse)
library(slider)

input_path <- "../../data/runs_only_redacted.csv"
output_path <- "trailing_365_distance.csv"

if (file.exists(input_path)) {
  df <- read_csv(input_path, show_col_types = FALSE)
  
  # 1. Process Date
  # 2. Aggregate by Day (to handle multiple runs per day)
  # 3. Fill missing days? 
  # Python's 'rolling(window="365D")' handles gaps correctly if using a DatetimeIndex.
  # 'slider::slide_index_sum' also handles date gaps correctly without needing explicit 0-filling. (It looks back 365 days from the current index).
  
  daily_df <- df %>%
    mutate(Date = as.Date(Date)) %>%
    group_by(Date) %>%
    summarise(DailyDist = sum(Distance, na.rm = TRUE)) %>%
    arrange(Date)
  
  # 4. Calculate Rolling Sum
  # looking back 365 days (including today)
  
  result_df <- daily_df %>%
    mutate(
      TotalDistance = slide_index_sum(
        x = DailyDist,
        i = Date,
        before = 365,
        after = 0
      )
    ) %>%
    # Convert meters to km
    mutate(TotalDistance = round(TotalDistance / 1000, 2)) %>%
    select(Date, TotalDistance)
  
  write_csv(result_df, output_path)
  print(paste("Saved data to", output_path))
  print(head(result_df))

} else {
  stop("Input file not found")
}
