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
d3.csv("../../data/distance_vs_pace.csv").then(data => {

    // Parse data
    data.forEach(d => {
        d.Distance = +d.Distance;
        d.AveragePace = +d.AveragePace;
    });

    // X axis - Distance
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Distance) * 1.1]) // Add some padding
        .range([0, width]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // X axis Label
    svg.append("text")
        .attr("transform", `translate(${width / 2}, ${height + 40})`)
        .style("text-anchor", "middle")
        .text("Distance (km)");

    // Y axis - Pace
    // Note: Usually slower pace (higher min/km) is "worse", but we stick to linear scale.
    // If "faster" layout desires inverted Y, we could do .range([0, height]) but std is pace goes up.
    // Let's use standard linear: 0 at bottom.
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.AveragePace) * 1.1])
        .range([height, 0]);

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Y axis Label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 15)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Average Pace (min/km)");

    // Add dots
    const dots = svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.Distance))
        .attr("cy", d => y(d.AveragePace))
        .attr("r", 4)
        .attr("class", "dot");

    // Add Group for Guidelines (so they are behind or efficiently managed)
    const guidelinesGroup = svg.append("g").attr("class", "guidelines");
    // Add Group for Avg Dot
    const avgDotGroup = svg.append("g").attr("class", "avg-dots");

    // Interactivity
    dots.on("mouseover", function (event, d) {

        // 1. Highlight runs that are BOTH Longer AND Faster
        // "Faster" means LOWER Pace number. "Longer" means HIGHER Distance.
        // So: run.Distance > d.Distance AND run.AveragePace < d.AveragePace
        const currentDistance = d.Distance;
        const currentPace = d.AveragePace;

        const highlights = data.filter(run => run.Distance > currentDistance && run.AveragePace < currentPace);

        // Highlight logic
        dots.classed("highlighted", run => {
            // Highlight self too? Usually "other runs". Self is highlighted by hover state usually.
            // Requirement: "runs that are both longer in distance and faster in pace are highlighted"
            // Also "When each run is hovered over..."
            if (run === d) return true; // Highlight self
            return run.Distance > currentDistance && run.AveragePace < currentPace;
        });

        // 2. Guidelines linking THIS run back to axes
        guidelinesGroup.selectAll("*").remove(); // Clear old
        // Vertical line to X axis
        guidelinesGroup.append("line")
            .attr("class", "guideline")
            .attr("x1", x(d.Distance))
            .attr("y1", y(d.AveragePace))
            .attr("x2", x(d.Distance))
            .attr("y2", height);
        // Horizontal line to Y axis
        guidelinesGroup.append("line")
            .attr("class", "guideline")
            .attr("x1", x(d.Distance))
            .attr("y1", y(d.AveragePace))
            .attr("x2", 0)
            .attr("y2", y(d.AveragePace));

        // 3. Extra dot showing average pace and distance of highlighted runs
        avgDotGroup.selectAll("*").remove();
        if (highlights.length > 0) {
            const avgDist = d3.mean(highlights, h => h.Distance);
            const avgPace = d3.mean(highlights, h => h.AveragePace);

            avgDotGroup.append("circle")
                .attr("class", "avg-dot")
                .attr("cx", x(avgDist))
                .attr("cy", y(avgPace))
                .attr("r", 6);

            // Optional: Label for avg dot?
        }

        // Tooltip
        const percentBetter = ((highlights.length / data.length) * 100).toFixed(1);

        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(
            `<strong>Run</strong><br>` +
            `Dist: ${d.Distance} km<br>` +
            `Pace: ${d.AveragePace} min/km<br>` +
            `Faster & Longer runs: ${highlights.length} (${percentBetter}%)`
        )
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");

    })
        .on("mouseout", function () {
            // Reset styles using class removal
            dots.classed("highlighted", false);
            guidelinesGroup.selectAll("*").remove();
            avgDotGroup.selectAll("*").remove();
            tooltip.transition().duration(500).style("opacity", 0);
        });

}).catch(error => {
    console.error("Error loading data:", error);
});
