// Set dimensions
const width = 500;
const height = 500;
const margin = 40;
const radius = Math.min(width, height) / 2 - margin;

// Append SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

const tooltip = d3.select("#tooltip");

// Load Data
d3.csv("../../data/time_of_day_counts.csv").then(data => {

    data.forEach(d => {
        d.Count = +d.Count;
    });

    // Color scale
    const color = d3.scaleOrdinal()
        .domain(["AM", "PM", "Both"])
        .range(["#f1c40f", "#2c3e50", "#e67e22"]); // Yellow for AM, Dark for PM, Orange for Both

    // Compute position of each group on the pie
    const pie = d3.pie()
        .value(d => d.Count);

    const data_ready = pie(data);

    // Shape generator
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Build the pie chart
    svg.selectAll('slices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.Category))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)

        // Interactivity
        .on("mousemove", function (event, d) {
            tooltip.style("opacity", 1);
            tooltip.html(`
                 <strong>${d.data.Category}</strong><br>
                 Count: ${d.data.Count}
             `)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseleave", function () {
            tooltip.style("opacity", 0);
        });

    // Labels
    const labelArc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.5);

    svg.selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => `${d.data.Category} (${d.data.Count})`)
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 14)
        .style("fill", "white")
        .style("pointer-events", "none"); // Let clicks pass through to slices

}).catch(error => {
    console.error(error);
});
