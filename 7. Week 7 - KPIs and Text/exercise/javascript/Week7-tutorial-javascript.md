# Week 7 - Visualisation (JavaScript & D3)

## Goal

Display KPI cards with values loaded from a CSV.

## Instructions

### 1. HTML Structure

Create a container for your cards.

```html
<div class="kpi-container">
    <div class="kpi-card">
        <h3>Total Runs</h3>
        <div id="total-runs">--</div>
    </div>
    <!-- ... other cards ... -->
</div>
```

### 2. Styling (CSS)

Style the cards to look like dashboard widgets.
*   Use Flexbox (`display: flex`) for layout.
*   Add padding, border-radius, and box-shadow for the "card" look.

### 3. JavaScript (`script.js`)

**Step 3.1: Load Data**

```javascript
d3.csv("../../data/kpi_stats.csv").then(data => {
    // data is an array. We only have 1 row.
    const stats = data[0];
    
    // ... update DOM ...
});
```

**Step 3.2: Update DOM**
Use D3 to select elements by ID and set their text content.

```javascript
d3.select("#total-runs").text(stats.TotalRuns);
d3.select("#total-distance").text(stats.TotalDistance);
// ...
```
