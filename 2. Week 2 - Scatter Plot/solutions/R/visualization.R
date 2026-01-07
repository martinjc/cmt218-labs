# Visualize Distance vs Pace using ggplot2

if (!require(ggplot2)) install.packages("ggplot2")
if (!require(readr)) install.packages("readr")
library(ggplot2)
library(readr)

data_path <- "../../data/distance_vs_pace.csv"

if (file.exists(data_path)) {
  df <- read_csv(data_path, show_col_types = FALSE)
  
  # Plot
  p <- ggplot(df, aes(x = Distance_km, y = AveragePace_min_km, color = AveragePace_min_km)) +
    geom_point(alpha = 0.7) +
    
    # Scale colors (Purple gradient)
    scale_color_gradient(low = "plum", high = "rebeccapurple") +
    
    # Labels
    labs(
      title = "Distance vs. Pace",
      x = "Distance (km)",
      y = "Pace (min/km)",
      color = "Pace"
    ) +
    
    # Theme
    theme_light() +
    theme(legend.position = "right")
  
  ggsave("distance_vs_pace_chart.png", plot = p, width = 10, height = 6)
  print("Chart saved to distance_vs_pace_chart.png")

} else {
  print(paste("Error: File not found at", data_path))
}
