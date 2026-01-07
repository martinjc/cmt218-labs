# Week 5 - Visualization (Python & Seaborn)

## Goal

Create a Calendar Heatmap to visualize distance intensity over weeks and years.

## Instructions

### 1. Setup

Install `seaborn` for easier heatmaps.

```bash
pip install seaborn
```

### 2. Loading and Pivoting

Heatmaps require a matrix format (rows, columns, values).

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv('../../data/weekly_distance_heatmap.csv')

# Pivot: Year (Rows) x Week (Columns) -> Distance (Values)
matrix = df.pivot(index='Year', columns='Week', values='TotalDistance')
# Note: The CSV column is 'TotalDistance' based on observation, 
# if your CSV has 'Distance', change accordingly.
```

### 3. Creating the Heatmap

```python
plt.figure(figsize=(15, 8))

sns.heatmap(
    matrix, 
    cmap='Greens',      # Color scheme
    linewidths=0.5,     # Space between cells
    linecolor='white'
)

plt.title('Weekly Distance Heatmap')
```

### 4. Refining

```python
plt.xlabel('Week Number')
plt.ylabel('Year')
plt.tight_layout()

plt.savefig('heatmap.png')
plt.show()
```
