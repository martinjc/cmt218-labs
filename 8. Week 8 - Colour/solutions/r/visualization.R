# Visualize Monthly Distance with Color Scale using ggplot2

if (!require(ggplot2)) install.packages("ggplot2")
if (!require(readr)) install.packages("readr")
library(ggplot2)
library(readr)

data_path <- "../../data/distance_per_month.csv"

if (file.exists(data_path)) {
  df <- read_csv(data_path, show_col_types = FALSE)
  
  # Plot
  p <- ggplot(df, aes(x = Month, y = TotalDistance, fill = TotalDistance)) +
    geom_col() +
    
    # Sequential Color Scale
    scale_fill_gradient(low = "plum", high = "rebeccapurple", name = "Distance") +
    
    # Labels
    labs(
      title = "Monthly Distance (Colored by Intensity)",
      x = "Month",
      y = "Distance (km)"
    ) +
    
    # Theme
    theme_minimal() +
    theme(
      axis.text.x = element_text(angle = 45, hjust = 1)
    )
  
  ggsave("colored_bar_chart.png", plot = p, width = 12, height = 6)
  print("Chart saved to colored_bar_chart.png")

} else {
  print(paste("Error: File not found at", data_path))
}
