# Week 10 - Interaction (JavaScript & D3)

## Goal

Link a Scatter Plot and a Bar Chart. Brushing the scatter plot filters the bar chart.

## Instructions

### 1. Implementation Strategy

1.  **Load Data**: Load all runs.
2.  **Draw Scatter**: X=Distance, Y=Pace.
3.  **Draw Bar**: X=Month, Y=Total Distance (derived from data).
4.  **Add Brush**: To Scatter Plot.
5.  **On Brush**: Filter data -> Re-aggregate -> Update Bar Chart.

### 2. Brushing

```javascript
/* Define Brush */
const brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("brush end", brushed);

/* Append Brush */
scatterSvg.append("g").call(brush);

/* Brush Handler */
function brushed(event) {
    const selection = event.selection;
    if (!selection) return;
    
    // Get bounds
    const [[x0, y0], [x1, y1]] = selection;
    
    // Filter data based on scales
    const filtered = allData.filter(d => {
        const x = xScale(d.Distance_km);
        const y = yScale(d.Pace_min_km);
        return x >= x0 && x <= x1 && y >= y0 && y <= y1;
    });
    
    // Update connected chart
    updateBarChart(filtered);
}
```

### 3. Updating

The `updateBarChart` function should use the standard D3 Data Join pattern (`.join()`) to smoothly transition bars.
