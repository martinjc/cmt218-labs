# Visualize Weekly Distance Heatmap using ggplot2

if (!require(ggplot2)) install.packages("ggplot2")
if (!require(readr)) install.packages("readr")
library(ggplot2)
library(readr)

data_path <- "../../data/weekly_distance_heatmap.csv"

if (file.exists(data_path)) {
  df <- read_csv(data_path, show_col_types = FALSE)
  
  # Plot
  p <- ggplot(df, aes(x = Week, y = Year, fill = TotalDistance)) +
    geom_tile(color = "white") +
    
    # Color Scale
    scale_fill_gradient(low = "#EDE7F6", high = "#311B92", name = "Distance (km)") +
    
    # Scale Y axis to show integer years
    scale_y_continuous(breaks = unique(df$Year)) +
    
    # Labels
    labs(
      title = "Weekly Distance Heatmap",
      x = "Week Number",
      y = "Year"
    ) +
    
    # Theme
    theme_minimal() +
    theme(
      panel.grid = element_blank()
    )
  
  ggsave("heatmap.png", plot = p, width = 12, height = 8)
  print("Chart saved to heatmap.png")

} else {
  print(paste("Error: File not found at", data_path))
}
