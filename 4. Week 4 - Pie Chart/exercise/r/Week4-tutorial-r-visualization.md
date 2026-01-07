# Week 4 - Visualization (R)

## Goal

Create a Pie Chart to show the distribution of runs by Time of Day.

## Instructions

### 1. Setup

```r
library(ggplot2)
library(readr)
```

### 2. Loading Data

```r
df <- read_csv("../../data/time_of_day_counts.csv")
```

### 3. Creating the Pie Chart

In `ggplot2`, a pie chart is a stacked bar chart transformed into polar coordinates.

**Step 3.1: Create a Stacked Bar**
We dummy map x to `""` (empty string) to stack everything in one single bar.

```r
p <- ggplot(df, aes(x = "", y = Count, fill = Category)) +
  geom_bar(stat = "identity", width = 1)
```

**Step 3.2: Convert to Polar**

```r
p + coord_polar("y", start = 0)
```

### 4. Refining

Adding labels and removing axes.

```r
# Calculate Labels
df$label <- paste0(df$Category, "\n", round(df$Count / sum(df$Count) * 100, 1), "%")

ggplot(df, aes(x = "", y = Count, fill = Category)) +
  geom_bar(stat = "identity", width = 1) +
  coord_polar("y", start = 0) +
  
  # Add Text Labels
  geom_text(aes(label = label), position = position_stack(vjust = 0.5)) +
  
  # Remove axes lines
  theme_void() +
  labs(title = "Runs by Time of Day")
```

### 5. Saving

```r
ggsave("time_of_day_pie.png", width = 8, height = 8)
```
