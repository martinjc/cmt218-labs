const width = 800;
const height = 600;

const svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load GeoJSON
d3.json("../../data/runs.geojson").then(geojson => {

    // Projection
    // Helper to fit geometry to canvas
    const projection = d3.geoMercator()
        .fitSize([width, height], geojson);

    // Path Generator
    const pathGenerator = d3.geoPath()
        .projection(projection);

    // Render features
    svg.selectAll("path")
        .data(geojson.features)
        .join("path")
        .attr("d", pathGenerator)
        .append("title") // Simple tooltip
        .text(d => `Distance: ${(d.properties.distance / 1000).toFixed(2)} km\nDate: ${d.properties.date}`);

}).catch(err => console.error("Error loading GeoJSON:", err));
