# Visualize Trailing 365-day Distance using ggplot2

if (!require(ggplot2)) install.packages("ggplot2")
if (!require(readr)) install.packages("readr")
library(ggplot2)
library(readr)

data_path <- "../../data/trailing_365_distance.csv"

if (file.exists(data_path)) {
  df <- read_csv(data_path, show_col_types = FALSE)
  
  # Ensure Date parsing (readr usually handles YYYY-MM-DD well)
  # But good to be explicit if needed: df$Date <- as.Date(df$Date)
  
  # Plot
  p <- ggplot(df, aes(x = Date, y = TotalDistance)) +
    geom_line(color = "rebeccapurple", linewidth = 1) +
    
    # Scale x axis
    scale_x_date(date_labels = "%Y-%m", date_breaks = "1 year") +
    
    # Labels
    labs(
      title = "Trailing 365-Day Total Distance",
      x = "Date",
      y = "Distance (km)"
    ) +
    
    # Theme
    theme_minimal() +
    theme(
      axis.text.x = element_text(angle = 45, hjust = 1),
      panel.grid.major = element_line(linetype = "dashed"),
      panel.grid.minor = element_blank()
    )
  
  ggsave("trailing_distance_chart.png", plot = p, width = 12, height = 6)
  print("Chart saved to trailing_distance_chart.png")

} else {
  print(paste("Error: File not found at", data_path))
}
