// Set dimensions and margins
const margin = { top: 20, right: 30, bottom: 60, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Append SVG object
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Tooltip reference
const tooltip = d3.select("#tooltip");

// Load data
d3.csv("../../data/distance_per_month.csv").then(data => {

    // Parse data if needed (csv returns strings)
    data.forEach(d => {
        d.TotalDistance = +d.TotalDistance;
        d.AveragePace = +d.AveragePace;
        d.RunCount = +d.RunCount;
        // Parse date for scale? Or keep as ordinal string?
        // Since we have YYYY-MM, we can use a BandScale for months.
    });

    // X axis - Band Scale
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.Month))
        .padding(0.2);

    // Add X axis
    // If too many months, we might need to filter ticks or rotate labels
    const xAxis = svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Rotate X labels if there are many data points
    xAxis.selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis - Linear Scale
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.TotalDistance)])
        .range([height, 0]);

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Y axis Label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Total Distance (km)");

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.Month))
        .attr("y", d => y(d.TotalDistance))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.TotalDistance))
        // Interactivity
        .on("mouseover", function (event, d) {
            d3.select(this).style("opacity", 0.7).style("fill", "#e74c3c");

            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(
                `<strong>${d.Month}</strong><br>` +
                `Distance: ${d.TotalDistance} km<br>` +
                `Runs: ${d.RunCount}<br>` +
                `Avg Pace: ${d.AveragePace} min/km`
            )
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).style("opacity", 1).style("fill", "#3498db"); // Return to original color
            tooltip.transition().duration(500).style("opacity", 0);
        });

}).catch(error => {
    console.error("Error loading data:", error);
});
