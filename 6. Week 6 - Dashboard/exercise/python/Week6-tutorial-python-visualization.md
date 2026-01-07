# Week 6 - Visualization (Python Dashboard)

## Goal

Combine multiple charts into a single dashboard view using `matplotlib` subplots.

## Instructions

### 1. Structure

We use `plt.figure` and specific subplots to arrange charts.

```python
import matplotlib.pyplot as plt

fig = plt.figure(figsize=(20, 12))
# 2 rows, 2 columns
gs = fig.add_gridspec(2, 2)
```

### 2. Adding Charts

You can add charts to specific grid cells `gs[row, col]`.

```python
# Top Left
ax1 = fig.add_subplot(gs[0, 0])
ax1.bar(x, y)
ax1.set_title("Chart 1")

# Top Right
ax2 = fig.add_subplot(gs[0, 1])
ax2.scatter(x, y)
```

### 3. Layout

Use `tight_layout` to prevent overlap.

```python
plt.tight_layout()
plt.suptitle('My Dashboard')
plt.show()
```
