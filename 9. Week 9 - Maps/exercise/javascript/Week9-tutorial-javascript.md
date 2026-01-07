# Week 9 - Maps (JavaScript & D3)

## Goal

Render GPS tracks using D3's geographic projections.

## Instructions

### 1. HTML Container

```html
<div id="map"></div>
```

### 2. Styling

Paths in D3 are SVG `path` elements.

```css
path {
    fill: none;
    stroke: steelblue;
    stroke-width: 2px;
}
```

### 3. JavaScript (`script.js`)

**Step 3.1: Load GeoJSON**

```javascript
d3.json("../../data/runs.geojson").then(geojson => {
    drawMap(geojson);
});
```

**Step 3.2: Projection**
We use `d3.geoMercator`. Crucially, we use `.fitSize()` to automatically center and zoom the map to our data.

```javascript
const projection = d3.geoMercator()
    .fitSize([width, height], geojson);
```

**Step 3.3: Path Generator**
Create a generator that converts GeoJSON geometry to SVG path strings using our projection.

```javascript
const pathGenerator = d3.geoPath().projection(projection);
```

**Step 3.4: Render**

```javascript
svg.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator);
```
