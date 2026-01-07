# Week 8 - Colouring (Python & Matplotlib)

## Goal

Create a Bar Chart where the color of each bar represents its value (Sequential Color Scale).

## Instructions

### 1. Setup

We need `matplotlib.cm` (colormaps) and `matplotlib.colors`.

```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.cm as cm
import matplotlib.colors as mcolors

df = pd.read_csv('../../data/distance_per_month.csv')
```

### 2. Creating the Color Map

To map values to colors, we need to:
1.  **Normalize**: Scale the data values to a 0-1 range.
2.  **Map**: Pass normalized values to a Colormap.

```python
# 1. Normalize
data_values = df['TotalDistance']
norm = mcolors.Normalize(vmin=data_values.min(), vmax=data_values.max())

# 2. Select Colormap (e.g., 'plasma', 'viridis', 'Blues')
cmap = cm.get_cmap('plasma')

# 3. Generate Colors
colors = [cmap(norm(val)) for val in data_values]
```

### 3. Plotting

Pass the `colors` list to the `color` argument of `plt.bar`.

```python
plt.figure(figsize=(12, 6))

plt.bar(df['Month'], df['TotalDistance'], color=colors)
```

### 4. Adding a Legend (Colorbar)

A colorbar is essential when using color to encode data.

```python
# Create a ScalarMappable
sm = cm.ScalarMappable(cmap=cmap, norm=norm)
sm.set_array([]) # Required for matplotlib < 3.1

plt.colorbar(sm, label='Distance Intensity')

plt.title('Monthly Distance (Colored by Value)')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```
