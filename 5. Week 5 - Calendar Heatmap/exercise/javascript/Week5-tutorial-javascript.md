# Week 5 - Visualisation (JavaScript & D3)

## Goal

Create a Calendar Heatmap where x-axis is Weeks (1-53) and y-axis is Years.

## Instructions

### 1. D3 Heatmap (`script.js`)

**Step 1.1: Scales**
*   **X Axis**: `d3.scaleBand` for weeks 1 to 53.
*   **Y Axis**: `d3.scaleBand` for the years present in your data.
*   **Color Scale**: `d3.scaleSequential` with an interpolator (e.g., `d3.interpolateYlGnBu`).

```javascript
// X Axis
const x = d3.scaleBand()
    .range([0, width])
    .domain(Array.from({length: 53}, (_, i) => i + 1))
    .padding(0.05);

// Y Axis
const years = Array.from(new Set(data.map(d => d.Year))).sort();
const y = d3.scaleBand()
    .range([height, 0])
    .domain(years)
    .padding(0.05);

// Color
const myColor = d3.scaleSequential()
    .interpolator(d3.interpolateYlGnBu)
    .domain([0, d3.max(data, d => d.TotalDistance)]);
```

**Step 1.2: Drawing Cells**
*   Bind data.
*   Append `rect`s.
*   Position using `x(d.Week)` and `y(d.Year)`.
*   Fill using `myColor(d.TotalDistance)`.

```javascript
svg.selectAll()
    .data(data, d => d.Year+':'+d.Week)
    .enter()
    .append("rect")
    .attr("x", d => x(d.Week))
    .attr("y", d => y(d.Year))
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", d => myColor(d.TotalDistance));
```

**Step 1.3: Tooltips**
*   Add mouseover/mouseleave handlers similar to previous weeks.
