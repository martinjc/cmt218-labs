# Week 1 - Visualization (Python & Matplotlib)

## Goal

Create a Bar Chart of monthly distances using Python's `matplotlib` library.

## Instructions

### 1. Setup

Ensure you have `pandas` and `matplotlib` installed.

```bash
pip install pandas matplotlib
```

### 2. Loading Data

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('../../data/distance_per_month.csv')
```

### 3. Creating the Chart

We use `plt.bar()` for bar charts.

```python
# Create figure size
plt.figure(figsize=(10, 6))

# Plot bar chart
plt.bar(df['Month'], df['TotalDistance'], color='rebeccapurple')

# Add labels
plt.title('Total Distance per Month')
plt.xlabel('Month')
plt.ylabel('Distance (km)')

# Rotate x-axis labels for readability
plt.xticks(rotation=45)

# Adjust layout to prevent clipping
plt.tight_layout()

# Display
plt.show()
```

### 4. Saving

```python
plt.savefig('monthly_distance_chart.png')
```
