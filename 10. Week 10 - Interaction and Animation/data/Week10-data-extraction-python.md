# Week 10 - Data Extraction (Python)

## Goal

Prepare a dataset that contains multiple dimensions (Time, Distance, Pace) for every run, suitable for creating linked interactive views.

## Instructions

### 1. Process

We need row-level data, not pre-aggregated summaries.

```python
import pandas as pd

df = pd.read_csv('../../data/runs_only_redacted.csv')

# Calculate metrics
df['Distance_km'] = df['distance'] / 1000
df['Pace_min_km'] = (1000 / df['average_speed']) / 60 

# Extract Time dimension
df['Date'] = pd.to_datetime(df['start_date'])
df['Month'] = df['Date'].dt.strftime('%Y-%m')

# Filter columns
out = df[['Date', 'Month', 'Distance_km', 'Pace_min_km']].dropna()
```

### 2. Output

Save to `linked_data.csv`. This file will be ~1MB and easy to load in one go.
