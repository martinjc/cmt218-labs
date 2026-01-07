# Week 3 - Visualization (Python & Matplotlib)

## Goal

Create a Line Chart to visualize the trend of Trailing 365-Day Distance over time.

## Instructions

### 1. Loading Data

```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates # Import for date formatting

df = pd.read_csv('../../data/trailing_365_distance.csv')
df['Date'] = pd.to_datetime(df['Date']) # Ensure Date is datetime object
```

### 2. Basic Line Chart

```python
plt.figure(figsize=(12, 6))

# Plot
plt.plot(df['Date'], df['TotalDistance'], color='red')
```

### 3. Date Formatting

Handling dates on the x-axis often requires specific formatters to avoid clutter.

```python
# Get current axis
ax = plt.gca()

# Format x-axis labels as Year-Month
ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))

# Show a tick every year
ax.xaxis.set_major_locator(mdates.YearLocator())

# Rotate labels
plt.xticks(rotation=45)
```

### 4. Final Polish

```python
plt.title('Trailing 365-Day Total Distance')
plt.xlabel('Date')
plt.ylabel('Distance (km)')
plt.grid(True, alpha=0.5)

plt.tight_layout()
plt.savefig('trailing_distance_chart.png')
plt.show()
```
