# Week 2 - Visualization (Python & Matplotlib)

## Goal

Create a Scatter Plot to analyze the relationship between Distance and Pace.

## Instructions

### 1. Loading Data

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('../../data/distance_vs_pace.csv')
```

### 2. Creating the Scatter Plot

We use `plt.scatter()`.

```python
plt.figure(figsize=(10, 6))

# Basic Scatter
# x = Distance, y = Pace
plt.scatter(df['Distance_km'], df['AveragePace_min_km'])
```

### 3. Adding Dimensions

We can use color (`c`) to add another dimension or emphasize a variable (e.g., Pace).

```python
# Scatter with Colormap
sc = plt.scatter(
    df['Distance_km'], 
    df['AveragePace_min_km'], 
    c=df['AveragePace_min_km'], # Color by Pace
    cmap='Purples',             # Color scheme
    alpha=0.7                   # Transparency
)

# Add Legend
plt.colorbar(sc, label='Pace (min/km)')
```

### 4. Refining

```python
plt.title('Distance vs. Pace')
plt.xlabel('Distance (km)')
plt.ylabel('Pace (min/km)')
plt.grid(True, linestyle='--', alpha=0.5) # Add grid lines

plt.tight_layout()
plt.savefig('distance_vs_pace_chart.png')
plt.show()
```
