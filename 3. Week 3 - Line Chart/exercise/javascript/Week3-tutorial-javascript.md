# Week 3 - Visualisation (JavaScript & D3)

## Goal

Create a line chart showing the total distance run in the trailing 365 days.

## Prerequisites

*   `trailing_365_distance.csv` in `../../data/`.

## Instructions

### 1. Structure

Standard `index.html` and `style.css`.
*   **CSS**: Style the line with `fill: none` and a `stroke` color.

### 2. D3 Line Chart (`script.js`)

**Step 2.1: Time Scale**
*   Use `d3.scaleTime()` for the X axis.
*   You must parse the Date string (e.g., "2023-01-01") into a Date object.

```javascript
const parseDate = d3.timeParse("%Y-%m-%d");

d3.csv("../../data/trailing_365_distance.csv").then(data => {
    data.forEach(d => {
        d.Date = parseDate(d.Date);
        d.TotalDistance = +d.TotalDistance;
    });

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Date))
        .range([0, width]);
    
    // ... Y scale (Linear) ...
});
```

**Step 2.2: Line Generator**
*   Define a line generator function.

```javascript
const line = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d.TotalDistance));

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
```

**Step 2.3: Interactivity (Bisector)**
*   To show a tooltip on a line chart, we need to find the data point closest to the mouse's X position.
*   Use `d3.bisector` to find the index.

```javascript
const bisectDate = d3.bisector(d => d.Date).left;

svg.append("rect") // Overlay to catch events
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .style("opacity", 0)
    .on("mousemove", function(event) {
        const x0 = x.invert(d3.pointer(event)[0]);
        const i = bisectDate(data, x0, 1);
        const d = data[i];
        // Update tooltip position and text
    });
```
