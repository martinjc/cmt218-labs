# Visualize GeoJSON Maps using ggplot2 and sf

if (!require(ggplot2)) install.packages("ggplot2")
if (!require(sf)) install.packages("sf") # For GeoJSON handling
library(ggplot2)
library(sf)

data_path <- "../../data/runs.geojson"

if (file.exists(data_path)) {
  # Load GeoJSON
  runs_sf <- st_read(data_path, quiet = TRUE)
  
  # Plot
  # geom_sf handles projection and coordinate plotting automatically
  p <- ggplot(runs_sf) +
    geom_sf(color = "#e74c3c", linewidth = 0.5, alpha = 0.6) +
    
    # Theme
    theme_void() + # Maps look best clean
    labs(title = "Run Routes Map") +
    theme(plot.title = element_text(hjust = 0.5, size = 16))
  
  ggsave("map.png", plot = p, width = 10, height = 10)
  print("Map saved to map.png")

} else {
  print(paste("Error: File not found at", data_path))
}
