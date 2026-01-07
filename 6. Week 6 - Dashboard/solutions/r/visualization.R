# Visualize Running Dashboard using ggplot2 and patchwork

if (!require(ggplot2)) install.packages("ggplot2")
if (!require(readr)) install.packages("readr")
if (!require(patchwork)) install.packages("patchwork") # For dashboard layout
library(ggplot2)
library(readr)
library(patchwork)

# --- 1. Load Data ---
df_bar <- read_csv("../../data/distance_per_month.csv", show_col_types = FALSE)
df_scatter <- read_csv("../../data/distance_vs_pace.csv", show_col_types = FALSE)
df_line <- read_csv("../../data/trailing_365_distance.csv", show_col_types = FALSE)
df_pie <- read_csv("../../data/time_of_day_counts.csv", show_col_types = FALSE)

# --- 2. Create Individual Plots ---

# Bar Chart
p1 <- ggplot(df_bar, aes(x = Month, y = TotalDistance)) +
  geom_col(fill = "rebeccapurple") +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
  labs(title = "Monthly Distance", x = NULL, y = "km")

# Scatter Plot
p2 <- ggplot(df_scatter, aes(x = Distance_km, y = AveragePace_min_km, color = AveragePace_min_km)) +
  geom_point(alpha = 0.6) +
  scale_color_gradient(low = "plum", high = "rebeccapurple") +
  theme_light() +
  theme(legend.position = "none") +
  labs(title = "Distance vs Pace", x = "km", y = "min/km")

# Line Chart
p3 <- ggplot(df_line, aes(x = Date, y = TotalDistance)) +
  geom_line(color = "rebeccapurple") +
  scale_x_date(date_labels = "%Y", date_breaks = "1 year") +
  theme_minimal() +
  labs(title = "Trailing 365d", x = NULL, y = "km")

# Pie Chart (Approximation via Bar for dashboard simplicity or Polar)
# Polar plots can be tricky in patchwork layout sizing, but let's try.
p4 <- ggplot(df_pie, aes(x = "", y = Count, fill = Category)) +
  geom_bar(stat = "identity", width = 1) +
  coord_polar("y", start = 0) +
  scale_fill_manual(values = c("AM" = "#9575CD", "PM" = "#673AB7", "Both" = "#D1C4E9")) +
  theme_void() +
  labs(title = "Time of Day")

# --- 3. Assemble Dashboard ---
# Using patchwork syntax: (p1 | p2) / (p3 | p4)
dashboard <- (p1 + p2) / (p3 + p4) +
  plot_annotation(title = "Running Analysis Dashboard",
                  theme = theme(plot.title = element_text(size = 20, hjust = 0.5)))

ggsave("dashboard.png", plot = dashboard, width = 12, height = 10)
print("Dashboard saved to dashboard.png")
