# Week 6 - Visualization (R Dashboard)

## Goal

Combine multiple charts into a single dashboard view using the `patchwork` library.

## Instructions

### 1. Setup

Install `patchwork`.

```r
install.packages("patchwork")
library(ggplot2)
library(patchwork)
```

### 2. Create Plots

Create your individual plots and assign them to variables (p1, p2, etc.).

```r
p1 <- ggplot(...) + geom_col() ...
p2 <- ggplot(...) + geom_point() ...
p3 <- ggplot(...) + geom_line() ...
p4 <- ggplot(...) + coord_polar() ...
```

### 3. Layout

`patchwork` uses arithmetic operators to define layout.
- `+` or `|`: Place side-by-side.
- `/`: Place underneath.

```r
# 2x2 Layout
layout <- (p1 + p2) / (p3 + p4)
```

### 4. Annotation

Add a global title.

```r
dashboard <- layout + 
  plot_annotation(
    title = "Running Dashboard", 
    theme = theme(plot.title = element_text(size = 20))
  )

ggsave("dashboard.png", width = 12, height = 10)
```
