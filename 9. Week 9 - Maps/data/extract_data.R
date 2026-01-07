# Week 9 - Data Extraction (R version)
# Goal: Parse Polylines and Convert to GeoJSON

if (!require(tidyverse)) install.packages("tidyverse")
if (!require(sf)) install.packages("sf")
if (!require(googlePolylines)) install.packages("googlePolylines")
library(tidyverse)
library(sf)
library(googlePolylines)

input_path <- "../../data/runs_only_redacted.csv"
output_path <- "runs.geojson"

if (file.exists(input_path)) {
  df <- read_csv(input_path, show_col_types = FALSE)
  df.columns <- tolower(colnames(df))
  
  # Check for map column
  # Python script looked for 'map.summary_polyline' or 'map' which is a dict string.
  # R read_csv parses CSV, so if it's a nested JSON field it might be a string.
  # But typically 'summary_polyline' is the column name in flattened CSVs.
  # Let's assume there is a 'map' column that contains the polyline string or a 'summary_polyline' column.
  
  # If the column is named 'map' and contains JSON-like string "{'id': ..., 'summary_polyline': '...'}"
  # then we need to extract the polyline string regex or JSON parse.
  # But if it's already a polyline string column, easy.
  
  # Python script handled both dictionary string parsing and direct polyline.
  # Let's try to just find columns that look like polylines.
  
  # Assumption: df has a column with the polyline.
  # Let's look for 'map' or 'polyline'.
  
  # Helper to extract polyline from string representation of dictionary
  extract_polyline <- function(x) {
    # If x looks like dictionary
    if (str_detect(x, "\\{")) {
      # extract value of summary_polyline
      # pattern: 'summary_polyline': '([^']+)'
      found <- str_match(x, "'summary_polyline': '([^']+)'")[,2]
      return(found)
    }
    return(x)
  }
  
  if ("map" %in% names(df)) {
    df$polyline <- sapply(df$map, extract_polyline)
  } else if ("summary_polyline" %in% names(df)) {
    df$polyline <- df$summary_polyline
  } else {
    stop("Could not find polyline column")
  }
  
  # Filter valid
  df_geo <- df %>% filter(!is.na(polyline) & polyline != "")
  
  # Decode
  # googlePolylines::decode returns a list of dataframes (lat, lon)
  decoded <- googlePolylines::decode(df_geo$polyline)
  
  # Convert to sf (Simple Features)
  # Iterate and create Linestrings
  # list of matrices -> st_multilinestring/st_sfc
  
  # A faster way with sf and valid structure:
  # Create a function to make a Matrix of lon, lat
  make_matrix <- function(d) {
    as.matrix(d[, c("lon", "lat")])
  }
  
  coords_list <- lapply(decoded, make_matrix)
  
  # Create Lines
  # sf_lines <- st_sfc(lapply(coords_list, st_linestring), crs = 4326)
  # Handle failures?
  
  valid_lines <- lapply(coords_list, function(m) {
    if(nrow(m) > 1) st_linestring(m) else NULL
  })
  
  # Remove NULLs
  is_valid <- !sapply(valid_lines, is.null)
  sf_lines <- st_sfc(valid_lines[is_valid], crs = 4326)
  
  # Create SF Object
  runs_sf <- st_sf(geometry = sf_lines)
  
  # Save
  st_write(runs_sf, output_path, delete_dsn = TRUE, quiet = TRUE)
  print(paste("Saved GeoJSON to", output_path))

} else {
  stop("Input file not found")
}
