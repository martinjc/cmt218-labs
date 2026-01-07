# Visualize Interactive Dashboard using ggplot2 and plotly

if (!require(ggplot2)) install.packages("ggplot2")
if (!require(readr)) install.packages("readr")
if (!require(plotly)) install.packages("plotly")
library(ggplot2)
library(readr)
library(plotly)

data_path <- "../../data/linked_data.csv"

if (file.exists(data_path)) {
  df <- read_csv(data_path, show_col_types = FALSE)
  
  # 1. Create Base ggplot
  # Scatter Plot of Distance vs Pace
  p <- ggplot(df, aes(x = Distance_km, y = Pace_min_km, 
                      text = paste("Date:", Date, "<br>Dist:", Distance_km, "km<br>Pace:", Pace_min_km))) +
    geom_point(aes(color = Pace_min_km), alpha = 0.7) +
    scale_color_gradient(low = "plum", high = "rebeccapurple") +
    labs(
      title = "Interactive Analysis: Distance vs Pace",
      x = "Distance (km)",
      y = "Pace (min/km)"
    ) +
    theme_light()
  
  # 2. Convert to Plotly for Interaction
  interactive_plot <- ggplotly(p, tooltip = "text")
  
  # 3. Save as HTML
  # htmlwidgets::saveWidget requires pandoc, which might not be in path. 
  # We'll use plotly's export if available or just print info.
  # For this exercise, we generate the object.
  # To save: htmlwidgets::saveWidget(interactive_plot, "interactive_dashboard.html")
  
  # We will try to save it if htmlwidgets is available
  if (!require(htmlwidgets)) install.packages("htmlwidgets")
  library(htmlwidgets)
  
  saveWidget(interactive_plot, "interactive_dashboard.html", selfcontained = TRUE)
  print("Interactive Dashboard saved to interactive_dashboard.html")

} else {
  print(paste("Error: File not found at", data_path))
}
