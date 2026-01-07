# Visualize Distance per Month using ggplot2

# Load Libraries
if (!require(ggplot2)) install.packages("ggplot2")
if (!require(readr)) install.packages("readr")
library(ggplot2)
library(readr)

# 1. Load Data
# Using relative path assuming script is run from the solutions/r directory
data_path <- "../../data/distance_per_month.csv"

if (file.exists(data_path)) {
  df <- read_csv(data_path, show_col_types = FALSE)
  
  # 2. Plot
  # Using geom_col for bar chart (identity)
  p <- ggplot(df, aes(x = Month, y = TotalDistance)) +
    geom_col(fill = "rebeccapurple", width = 0.7) +
    
    # Labels
    labs(
      title = "Total Distance per Month",
      x = "Month",
      y = "Distance (km)"
    ) +
    
    # Theme
    theme_minimal() +
    theme(
      axis.text.x = element_text(angle = 45, hjust = 1)
    )
  
  # 3. Save
  ggsave("monthly_distance_chart.png", plot = p, width = 10, height = 6)
  print("Chart saved to monthly_distance_chart.png")
  
} else {
  print(paste("Error: File not found at", data_path))
}
