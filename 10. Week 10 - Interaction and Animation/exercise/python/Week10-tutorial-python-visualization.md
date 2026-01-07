# Week 10 - Interaction (Python & Plotly)

## Goal

Create an interactive dashboard with linked charts using `plotly`.

## Instructions

### 1. Setup

Install `plotly` and `pandas`.

```bash
pip install pandas plotly
```

### 2. Implementation

We use `plotly` graph objects for flexibility and `make_subplots` for layout.

```python
import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots

df = pd.read_csv('../../data/linked_data.csv')

# Create a subplot figure with 2 columns
fig = make_subplots(
    rows=1, cols=2, 
    subplot_titles=("Distance vs Pace", "Monthly Distance")
)
```

### 3. Adding Traces

**Scatter Plot (Interactive)**
Plotly scatter plots support zooming, panning, and hovering by default.

```python
scatter = go.Scatter(
    x=df['Distance_km'],
    y=df['Pace_min_km'],
    mode='markers',
    name='Runs',
    marker=dict(color='#2c3e50', opacity=0.6)
)
fig.add_trace(scatter, row=1, col=1)
```

**Bar Chart**
aggregate data first for the bar chart.

```python
monthly = df.groupby('Month')['Distance_km'].sum().reset_index()

bar = go.Bar(
    x=monthly['Month'],
    y=monthly['Distance_km'],
    name='Distance',
    marker_color='#e74c3c'
)
fig.add_trace(bar, row=1, col=2)
```

### 4. Layout & Save

Interaction tools like "Box Select" needs to be enabled in `dragmode`.

```python
fig.update_layout(
    title_text="Run Analysis Dashboard",
    height=500,
    dragmode='select' # Enable selection tool
)

fig.write_html("interactive_dashboard.html")
# Open this HTML file in your browser!
```
