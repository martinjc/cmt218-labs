# Week 6 - Dashboard (JavaScript & D3)

## Goal

Combine visualizations from previous weeks into a single, responsive dashboard.

## Instructions

### 1. Structure (`index.html`)

Create a grid layout using `div` containers for each chart.

```html
<div class="dashboard">
    <div class="card" id="bar-chart"></div>
    <div class="card" id="line-chart"></div>
    <!-- ... -->
</div>
```

### 2. Layout (`style.css`)

Use CSS Grid for responsiveness.

```css
.dashboard {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
}
```

### 3. Logic (`script.js`)

**Step 3.1: Load Multiple Files**
Use `Promise.all` to wait for multiple CSVs.

```javascript
Promise.all([
    d3.csv("../../data/distance_per_month.csv"),
    d3.csv("../../data/distance_vs_pace.csv"),
    // ...
]).then(([barData, scatterData]) => {
    drawBarChart(barData, "#bar-chart");
    drawScatterPlot(scatterData, "#scatter-chart");
});
```

**Step 3.2: Modular Functions**
Wrap specific chart logic in functions.

```javascript
function drawBarChart(data, containerId) {
    // Select container
    const width = 400; // or dynamic
    const height = 300;
    
    const svg = d3.select(containerId).append("svg")...
    
    // ... Copy logic from Week 1 ...
}
```

## Data Preparation

You will need to ensure all required CSV files are available to your dashboard. You can copy them from previous weeks' `data` folders to `Week 6/data`.
