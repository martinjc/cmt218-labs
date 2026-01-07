# Week 8 - Colouring (JavaScript & D3)

## Goal

Apply colour scales to visualizations to represent data magnitude.

## Instructions

### 1. Scales

In D3, we can use `scaleSequential` to map continuous values to colors.

```javascript
// Define a color scale
const colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateBlues) // Or interpolateHsl, interpolateViridis
    .domain([0, d3.max(data, d => d.value)]);
```

### 2. Applying Color

When creating elements (like bars or dots), set the `fill` attribute using the scale.

```javascript
svg.selectAll("rect")
   .data(data)
   .join("rect")
   // ... other attributes ...
   .attr("fill", d => colorScale(d.value));
```

### 3. Legend (Optional)

A legend helps interpret the colors. You can create a simple gradient legend or discrete blocks.

```javascript
// Simple Vertical Legend logic would involve:
// 1. Defining a linear gradient in <defs>
// 2. Drawing a rectangle filled with that gradient
// 3. Adding an axis to show values corresponding to colors
```

## Challenge

Try changing `d3.interpolateBlues` to `d3.interpolateInferno` or other built-in schemes.
