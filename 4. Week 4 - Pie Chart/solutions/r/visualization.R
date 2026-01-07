# Visualize Time of Day Runs using ggplot2 (Pie Chart)

if (!require(ggplot2)) install.packages("ggplot2")
if (!require(readr)) install.packages("readr")
library(ggplot2)
library(readr)

data_path <- "../../data/time_of_day_counts.csv"

if (file.exists(data_path)) {
  df <- read_csv(data_path, show_col_types = FALSE)
  
  # Calculate percentages for labels
  df$percent <- df$Count / sum(df$Count) * 100
  df$label <- paste0(df$Category, "\n", round(df$percent, 1), "%")
  
  # Plot
  # Pie charts in ggplot2 are Bar Charts + Polar Coordinates
  p <- ggplot(df, aes(x = "", y = Count, fill = Category)) +
    geom_bar(stat = "identity", width = 1) +
    
    # Convert to Pie
    coord_polar("y", start = 0) +
    
    # Custom Labels
    geom_text(aes(label = label), position = position_stack(vjust = 0.5)) +
    
    # Colors
    scale_fill_manual(values = c("AM" = "#9575CD", "PM" = "#673AB7", "Both" = "#D1C4E9")) +
    
    # Theme (Void removes axes/grid)
    theme_void() +
    labs(title = "Runs by Time of Day")
  
  ggsave("time_of_day_pie.png", plot = p, width = 8, height = 8)
  print("Chart saved to time_of_day_pie.png")

} else {
  print(paste("Error: File not found at", data_path))
}
