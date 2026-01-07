# Week 1 - Visualisation (JavaScript & D3)

This week structure will guide you through creating a simple bar chart using D3.js.

## Goal

Create a bar chart showing the total distance run per month.

## Prerequisites

*   You should have completed the Data Extraction step and have `distance_per_month.csv` in your `data` folder (or one level up relative to your script).
*   For this tutorial, we assume the data is at `../../data/distance_per_month.csv` relative to your HTML file if you are working in `solutions/javascript` or `exercise/javascript`.

## Instructions

### 1. HTML Setup (`index.html`)

Create an `index.html` file. This setup will include D3.js from a CDN and provide a container for our chart.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Week 1 - Bar Chart</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Monthly Distance Run</h1>
        <div id="chart"></div>
        <div id="tooltip" class="tooltip" style="opacity:0;"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### 2. CSS Styling (`style.css`)

Create a `style.css` file. We need to style the bars and especially the tooltip, which is initially hidden.

```css
.bar {
    fill: rebeccapurple;
    transition: fill 0.2s;
}

.bar:hover {
    fill: #663399;
}

.tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px;
    border-radius: 4px;
    pointer-events: none; /* Important to let mouse events pass through */
}
```

### 3. JavaScript Implementation (`script.js`)

Create a `script.js` file.

**Step 3.1: Setup**
Define the dimensions and margins for the chart. This usage of a margin convention is standard in D3 to ensure there is space for axes.

```javascript
const margin = {top: 20, right: 30, bottom: 60, left: 60};
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
```

**Step 3.2: Load Data**
We use `d3.csv` to load the csv file. Note that we parse the numerical values because CSV data is always loaded as strings initially.

```javascript
d3.csv("../../data/distance_per_month.csv").then(data => {
    // Parse data
    data.forEach(d => {
        d.TotalDistance = +d.TotalDistance;
        d.RunCount = +d.RunCount;
    });
    
    // ... Continue with scales and axes inside this block
});
```

**Step 3.3: Scales and Axes**
Define scales that map our data values to pixel positions.

```javascript
// X Axis (Band scale for months)
const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.Month))
    .padding(0.2);

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

// Y Axis (Linear scale for distance)
const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.TotalDistance)])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(y));
```

**Step 3.4: Bars**
Draw the rectangles for the bar chart. We also add the mouseover/mouseout event listeners here for the interactivity.

```javascript
const tooltip = d3.select("#tooltip");

svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.Month))
        .attr("y", d => y(d.TotalDistance))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.TotalDistance))
        .on("mouseover", function(event, d) {
             d3.select(this).style("opacity", 0.7);
             tooltip.transition().duration(200).style("opacity", .9);
             tooltip.html(`
                 Distance: ${d.TotalDistance} km<br>
                 Runs: ${d.RunCount}
             `)
             .style("left", (event.pageX + 10) + "px")
             .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
             d3.select(this).style("opacity", 1);
             tooltip.transition().duration(500).style("opacity", 0);
        });
```

## Running the Code

You must run a local web server to load external data files (like CSVs) due to browser security restrictions.
*   Python: `python3 -m http.server 8000`
*   Node: `npx http-server`
*   Open `http://localhost:8000` in your browser.
