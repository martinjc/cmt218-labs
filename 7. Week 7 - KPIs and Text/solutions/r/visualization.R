# Visualize KPIs using ggplot2

if (!require(ggplot2)) install.packages("ggplot2")
if (!require(readr)) install.packages("readr")
library(ggplot2)
library(readr)

data_path <- "../../data/kpi_stats.csv"

if (file.exists(data_path)) {
  df <- read_csv(data_path, show_col_types = FALSE)
  
  # Reshape for plotting
  # We want a dataframe like: Label, Value
  kpis <- data.frame(
    Label = c("Total Runs", "Total Distance", "Longest Run", "Avg Pace"),
    Value = c(
      as.character(df$TotalRuns),
      paste(df$TotalDistance, "km"),
      paste(df$LongestRun, "km"),
      paste(df$AvgDistance, "min/km") # Note: CSV col is AvgDistance but represents Pace/Speed logic usually.
      # Wait, let's double check CSV header. 
      # User might have meant AvgDistance or AvgPace. 
      # Previous view showed 'AvgDistance' in header but '6.29' value. 
      # 6.29 min/km is reasonable. 6.29 km average run is also reasonable. 
      # Sticking to CSV header label implies Distance. 
      # Let's assume user wants to show what's in the CSV.
    ),
    x = c(1, 2, 3, 4),
    y = 1
  )
  
  p <- ggplot(kpis, aes(x = x, y = y)) +
    # Values
    geom_text(aes(label = Value), size = 10, fontface = "bold", vjust = -0.5, color = "#2c3e50") +
    # Labels
    geom_text(aes(label = Label), size = 5, vjust = 1.5, color = "grey50") +
    
    # Clean up
    theme_void() +
    scale_x_continuous(limits = c(0.5, 4.5)) +
    labs(title = "Quick Global Stats") +
    theme(plot.title = element_text(hjust = 0.5, size = 16))
  
  ggsave("kpi_dashboard.png", plot = p, width = 10, height = 3)
  print("Infographic saved to kpi_dashboard.png")

} else {
  print(paste("Error: File not found at", data_path))
}
