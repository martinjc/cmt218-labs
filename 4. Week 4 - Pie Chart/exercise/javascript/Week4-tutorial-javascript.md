# Week 4 - Visualisation (JavaScript & D3)

## Goal

Create a Pie Chart showing the proportion of runs in AM vs PM vs Both.

## Instructions

### 1. D3 Pie Chart (`script.js`)

**Step 1.1: Setup**
*   Define `width`, `height`, and `radius` (min(width, height) / 2).
*   Append SVG centered in the container.

```javascript
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width/2},${height/2})`);
```

**Step 1.2: Scales**
*   Use `d3.scaleOrdinal` for colors.

**Step 1.3: Pie & Arc Generators**
*   **d3.pie()**: Computes the angles for each slice based on the data values.
*   **d3.arc()**: Generates the path string for each slice based on angles.

```javascript
const pie = d3.pie().value(d => d.Count);
const arc = d3.arc().innerRadius(0).outerRadius(radius);
```

**Step 1.4: Draw Slices**

```javascript
svg.selectAll('slices')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.Category));
```

**Step 1.5: Labels**
*   Use another arc generator for labels to position them nicely.
*   `arc.centroid(d)` gives the [x, y] center of the slice.

```javascript
const labelArc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.5);

svg.selectAll('text')
    // ...
    .attr("transform", d => `translate(${labelArc.centroid(d)})`)
    .text(d => d.data.Category);
```
