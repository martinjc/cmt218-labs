# Week 7 - Visualization (Python KPI Info)

## Goal

Create a text-based graphic (Infographic) to display Key Performance Indicators.

## Instructions

### 1. Loading Data

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('../../data/kpi_stats.csv')
kpis = df.iloc[0] # Take first row
```

### 2. Creating the "Plot"

We use an empty plot and add text elements.

```python
fig, ax = plt.subplots(figsize=(12, 4))
ax.axis('off') # Hide axes
```

### 3. Adding Text

```python
metrics = [
    ('Total Runs', kpis['TotalRuns']),
    ('Total Distance', f"{kpis['TotalDistance']} km"),
    ('Longest Run', f"{kpis['LongestRun']} km"),
    ('Avg Pace', f"{kpis['AveragePace']} min/km")
]

for i, (label, value) in enumerate(metrics):
    x_pos = (i + 0.5) / len(metrics) # Evenly space 0 to 1
    
    # Value
    ax.text(x_pos, 0.6, str(value), ha='center', fontsize=24, fontweight='bold')
    
    # Label
    ax.text(x_pos, 0.4, label, ha='center', fontsize=14, color='grey')
```

### 4. Displaying

```python
plt.title('Quick Global Stats')
plt.tight_layout()
plt.savefig('kpi_dashboard.png')
plt.show()
```
