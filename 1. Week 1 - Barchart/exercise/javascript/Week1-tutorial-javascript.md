# Week 1 - Visualisation (JavaScript & D3)

## Introduction

This week we will create a simple bar chart using **D3.js** (Data-Driven Documents).
**Why D3?** Unlike high-level libraries (like Plotly or Chart.js) that give you a pre-baked chart, D3 gives you drawing primitives (rectangles, lines, circles) and tools to bind (attach) them to data. It is harder to learn but offers infinite flexibility.

## Goal

Create a bar chart showing the total distance run per month.

## Prerequisites

*   You should have completed the Data Extraction step and have `distance_per_month.csv`.
*   You need a local web server (Instructions at the end).

## Instructions

### 1. HTML Setup (`index.html`)

We start by defining the structure. We include the D3 library from a CDN (Content Delivery Network).

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Week 1 - Bar Chart</title>
    <link rel="stylesheet" href="style.css">
    <!-- Load D3.js -->
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Monthly Distance Run</h1>
        <!-- This div is where D3 will inject the SVG -->
        <div id="chart"></div>
        <!-- This div will be our floating tooltip -->
        <div id="tooltip" class="tooltip" style="opacity:0;"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### 2. CSS Styling (`style.css`)

We separate styles to keep our code clean.

```css
/* Basic bar styling */
.bar {
    fill: rebeccapurple;
    transition: fill 0.2s; /* Smooth color change on hover */
}

.bar:hover {
    fill: #663399; /* Darker purple on hover */
}

/* Tooltip styling - critical for UX */
.tooltip {
    position: absolute; /* Allows us to move it with JS */
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none; /* Critical: lets mouse events pass through to the bar below */
}
```

### 3. JavaScript Implementation (`script.js`)

This is where the magic happens.

#### Step 3.1: Setup and Margins

**The Margin Convention**: In D3, it is standard practice to define an inner drawing area and margins for axes/labels. This avoids "magic numbers" later in the code. We also tend to create an additional 'group' (`g`) element to hold all the parts of the visualisation inside the `svg` element.

```javascript
// 1. Dimensions
const margin = {top: 20, right: 30, bottom: 60, left: 60};
// Calculate inner width/height (the actual plotting area)
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// 2. Append SVG to the page
const svg = d3.select("#chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g") // Group element to hold everything
        .attr("transform", `translate(${margin.left},${margin.top})`);
```

This demonstrates how a typical D3 code style employs ‘method chaining’. We call a number of methods sequentially, calling each one on the value or variable returned from the previous method.

We could also write this as:

```javascript
const vis = d3.select("#chart");
let svg = vis.append("svg");
svg.attr("width", width + margin.left + margin.right);
svg.attr("height", height + margin.top + margin.bottom);

let g = svg.append("g");
g.attr("transform", `translate(${margin.left},${margin.top})`);
```

but this doesn't look as clean as using method chaining.

#### Step 3.2: Load Data

D3 loads data asynchronously (it doesn't happen instantly). We use `.then()` to run code *after* the file is loaded.

```javascript
d3.csv("../../data/distance_per_month.csv").then(data => {
    
    // Data Parsing: CSV values are always strings. We must convert them to numbers.
    data.forEach(d => {
        d.TotalDistance = +d.TotalDistance; // The '+' is a shortcut for parseFloat()
        d.RunCount = +d.RunCount;
    });

    // --- All chart logic happens INSIDE this block ---
    
    // Call our drawing function (organizing code helps readability)
    drawChart(data);
});
```

#### Step 3.3: Scales and Axes

**Scales** translate data values (e.g., 0 to 500km) to pixel values (e.g., height 500px to 0px).
*   **Domain**: Input (Data world)
*   **Range**: Output (Screen world)

For a barchart we typically use a **band scale** for the x-axis and a **linear scale** for the y-axis. The band scale converts a fixed number of categories in our categorical data (in this example our range of all the months for which we have data) to a set of bars of equal width, each with a different starting position. The linear scale converts a range of values (in this example the total distance run per month) to a range of pixel values (in this example the height of the bar).

```javascript
function drawChart(data) {
    
    // X Axis: Band Scale (for discrete categories like Months)
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.Month)) // Map creates an array of just the month names
        .padding(0.2); // Space between bars


    // Y Axis: Linear Scale (for continuous numbers)
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.TotalDistance)]) // 0 to Max Distance
        .range([height, 0]); // SVG Y=0 is the TOP, so we go Height -> 0

```

D3 includes helper functions for making axes. We use `d3.axisBottom(x)` to create a bottom axis for the x scale and `d3.axisLeft(y)` to create a left axis for the y scale. The `call` function is used to apply the axis to the SVG element. We also rotate the labels to make them more readable, and a transform to position the x axis at the bottom of the chart. Note that we still need to move the x axis to the bottom of the chart, even though we used `d3.axisBottom(x)` - the function doesn't move the axis, it just creates it with the correct layout for being placed at the bottom


```javascript

    // Add X Axis to SVG
    svg.append("g")
        .attr("transform", `translate(0,${height})`) // Move to bottom
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)") // Rotate labels
            .style("text-anchor", "end");

    // Add Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

```

#### Step 3.4: Data Binding

We now have scales to convert data values into pixel values, and axes so that our audience can interpret the chart. The next step is to attach our data to some elements and then draw the bars with those elements.

```javascript
svg.selectAll("mybar")
    .data(data)
```

Here we use the `selectAll` function to select all elements with the class `mybar`. This is a common pattern in D3, where we use `selectAll` to select all elements that we want to update, and then use `data` to bind our data to those elements. Of course, to start with there are no elements with the class `mybar`, so `selectAll` will return an empty selection.

*** Hang on a second! If the selection is empty, what do we attach data to? ***

Really, we’re not attaching the data to anything. Instead, we’re telling D3 that we want to attach data items to elements with a class of `mybar`. D3 examines the selection we’ve chosen, and it counts the number of elements in the selection. If there aren’t enough elements, it works out how many we’d need to create, and returns that to us in the `enter` selection as 'null' elements that we can then create and style as we need. If there are already existing elements, it returns those to us in the `update` selection. If there are more elements than data items, it returns the extra elements to us in the `exit` selection. We can then use these selections to create, update, and remove elements as needed.

```javascript
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
```

In this example, `svg.selectAll("mybar")` selects all elements with the class `mybar`, `data(data)` binds the data to the selection, `enter()` returns the enter selection, and `append("rect")` creates a new rectangle for each data item. The `enter()` function is used to create new elements for each data item that doesn't already have an existing corresponding element in the selection.

#### `enter`, `update`, and `exit`

Whenever we use `.data()` in combination with a selection, we end up with three things:

1. update - a reference to all the existing elements in the selection, with their new data items attached. This is the `update` selection (the elements that already existed in the page, but that will need updating as their data has changed).
2. enter - a reference to all the elements that need to be created in order to make sure there are enough elements for our data items
3. exit – a reference to all the elements that exist in our selection but which have no longer have a data item bound to them

In combination, these three methods allow us to select elements in our page, add new data to them, and either create new elements (if there aren’t enough in our selection), or remove surplus elements (if we have fewer data items than elements). We can then update the properties of all our elements that need updating. 

Today, as we’re not looking at dynamic data we’ll only need the enter selection. We’ll look at using all three in a later tutorial.

#### `function(d, i) { ... }`

The last bit of `d3` functionality we need to cover is the `function(d, i) { ... }` syntax. This is a common pattern in D3. It is a callback function that is called for each element in the selection. The `d` parameter is the data item bound to the element, and the `i` parameter is the index of the element in the selection. This allows us to access the data attached to each element so that we can style it appropriately based on the data item it is supposed to represent. 

For example, we can use this to set the width of each bar according to the width of each bar according to our bandscale:

```javascript
    .attr("width", d => x.bandwidth())
```

Note: here we're using the simpler `=>` arrow function syntax instead of the more verbose `function(d, i) { ... }` syntax. This is a common pattern to keep things tidier in our code. The above is functionally equivalent to:

```javascript
    .attr("width", function(d, i) { return x.bandwidth(); })
```

So, we can use the `enter` selection to create new elements for each data item that doesn't already have an existing corresponding element in the selection, then use inner functions to access the `d` and `i` parameters to style each element appropriately based on the data item it is supposed to represent:

```javascript
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.Month))
            .attr("y", d => y(d.TotalDistance))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.TotalDistance))
```

#### Step 3.5: Interactivity

We can use the `on` function to add interactivity to our visualization. For example, we can add a tooltip, change the opacity of the bar when we hover over it, and remove the tooltip when we move the mouse away.

```javascript

    // --- Step 3.4: Bars ---
    
    // Select the Tooltip div
    const tooltip = d3.select("#tooltip");

    // The Data Join (Enter Selection)
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("class", "bar")
            // Calculation of position and size
            .attr("x", d => x(d.Month))
            .attr("y", d => y(d.TotalDistance))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.TotalDistance))
            
            // Interaction
            .on("mouseover", function(event, d) {
                 d3.select(this).style("opacity", 0.7);
                 
                 // Show tooltip
                 tooltip.transition().duration(200).style("opacity", .9);
                 tooltip.html(`
                     <strong>${d.Month}</strong><br>
                     Distance: ${d.TotalDistance} km
                 `)
                 .style("left", (event.pageX + 10) + "px")
                 .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                 d3.select(this).style("opacity", 1);
                 // Hide tooltip
                 tooltip.transition().duration(500).style("opacity", 0);
            });
}
```

#### Step 3.6: Add Y-axis Label

Finally, we can add a y-axis label to our visualization.

```javascript
    // Add Y-axis Label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 15)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Distance (km)");
```

## Running the Code

Browsers block local file access for security (CORS). You must use a local server.

1.  Open your terminal in this folder.
2.  Run:
    *   **Python**: `python3 -m http.server 8000`
    *   **Node**: `npx http-server`
3.  Go to `http://localhost:8000` in your browser.
