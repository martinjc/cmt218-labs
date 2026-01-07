# Week 7 - Data Extraction (R version)
# Goal: Calculate Global KPIs for Infographic

library(tidyverse)

input_path <- "../../data/runs_only_redacted.csv"
output_path <- "kpi_stats.csv"

if (file.exists(input_path)) {
  df <- read_csv(input_path, show_col_types = FALSE)
  
  # Calculate Stats
  # 1. Total Runs
  # 2. Total Distance (km)
  # 3. Longest Run (km)
  # 4. Average Pace/Distance ? Python script output "AvgDistance" but value was ~6.29.
  # Let's check python script output again.
  # Python checks:
  # TotalRuns = count()
  # TotalDistance = sum() / 1000
  # LongestRun = max() / 1000
  # AvgDistance = mean() / 1000
  
  stats <- df %>%
    summarise(
      TotalRuns = n(),
      TotalDistance = sum(Distance, na.rm = TRUE) / 1000,
      LongestRun = max(Distance, na.rm = TRUE) / 1000,
      AvgDistance = mean(Distance, na.rm = TRUE) / 1000
    ) %>%
    mutate(across(everything(), \(x) round(x, 2)))
  
  write_csv(stats, output_path)
  print(paste("Saved KPI stats to", output_path))
  print(stats)

} else {
  stop("Input file not found")
}
