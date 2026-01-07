# Week 10 - Interaction (R & Plotly)

## Goal

Create an interactive chart where users can zoom, pan, and hover for details.

## Instructions

### 1. Setup

We use `plotly` to supercharge our `ggplot2` charts.

```r
install.packages("plotly")
library(ggplot2)
library(plotly)
```

### 2. Create a Static Plot

Build a standard ggplot.

```r
p <- ggplot(df, aes(x = Distance_km, y = Pace_min_km)) +
  geom_point(aes(color = Pace_min_km), alpha = 0.7) +
  labs(title = "Interactive Distance vs Pace")
```

### 3. Make it Interactive

The `ggplotly()` function converts your static plot into an interactive specific web-based chart.

```r
interactive_plot <- ggplotly(p)

# Display in Viewer
interactive_plot
```

### 4. Custom Tooltips

You can define exactly what shows up on hover by adding a `text` aesthetic and telling ggplotly to use it.

```r
p <- ggplot(df, aes(x = ..., text = paste("Custom Info:", ...))) + ...

ggplotly(p, tooltip = "text")
```

### 5. Saving

Save as an HTML file to share on the web.

```r
library(htmlwidgets)
saveWidget(interactive_plot, "interactive_dashboard.html")
```
