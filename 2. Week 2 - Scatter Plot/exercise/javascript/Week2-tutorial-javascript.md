# Week 2 - Visualisation (JavaScript & D3)

## Goal

Create a scatter plot of Distance (x-axis) vs. Average Pace (y-axis). Implement interactivity to highlight potential "better" runs (longer and faster).

## Prerequisites

*   `distance_vs_pace.csv` in `../../data/`.

## Instructions

### 1. Structure

Set up `index.html` and `style.css` similar to Week 1.
*   **CSS**: Add a class `.dot` for your circles. Add a class `.highlighted` for the hover effect (e.g., change color/opacity).

### 2. D3 Scatter Plot (`script.js`)

**Step 2.1: Setup and Scales**
Define scales for both Distance and Pace.

```javascript
// ... standard boilerplate setup for margins and svg ...

// X Axis: Linear for Distance
const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Distance) * 1.1]) 
    .range([0, width]);

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

// Y Axis: Linear for Pace
const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.AveragePace) * 1.1])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(y));
```

**Step 2.2: Circles**
Append `circle` elements for each data point.

```javascript
const dots = svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", d => x(d.Distance))
        .attr("cy", d => y(d.AveragePace))
        .attr("r", 4)
        .attr("class", "dot");
```

**Step 2.3: Interactivity (Advanced)**
This part is trickier. We need to handle mouseover to highlight specific other runs.

```javascript
dots.on("mouseover", function(event, d) {
    const currentDistance = d.Distance;
    const currentPace = d.AveragePace;

    // Find runs that are both longer AND faster
    // Longer: run.Distance > d.Distance
    // Faster: run.AveragePace < d.AveragePace (lower pace is faster)
    dots.classed("highlighted", run => {
         // Highlight self or if better
         if (run === d) return true; 
         return run.Distance > currentDistance && run.AveragePace < currentPace;
    });

    // Add guidelines (optional but helpful)
    // Draw lines from x(d.Distance),y(d.AveragePace) to [0,y] and [x,height]
    
    // Show Tooltip
    // ... tooltip logic ...
})
.on("mouseout", function() {
    dots.classed("highlighted", false);
    // Hide tooltip
});
```

## Challenges

*   How do you handle runs with the exact same distance and pace? (They overlap).
*   Can you calculate the percentage of runs that are "better" and show it in the tooltip?
