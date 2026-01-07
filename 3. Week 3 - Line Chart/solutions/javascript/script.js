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

// Parse Date
const parseDate = d3.timeParse("%Y-%m-%d");
const formatDate = d3.timeFormat("%b %d, %Y");

// Load data
d3.csv("../../data/trailing_365_distance.csv").then(data => {

    // Parse data
    data.forEach(d => {
        d.Date = parseDate(d.Date);
        d.TotalDistance = +d.TotalDistance;
        d.RunCount = +d.RunCount;
        d.AveragePace = +d.AveragePace;
    });

    // X axis - Time Scale
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Date))
        .range([0, width]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

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
        .text("Trailing 365 Days Distance (km)");

    // Line Generator
    const line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.TotalDistance));

    // Add Line
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    // Interactivity: Hover Line & Tooltip
    // We need a transparent rectangle on top to capture mouse events
    const bisectDate = d3.bisector(d => d.Date).left;

    const focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("circle")
        .attr("r", 5)
        .attr("fill", "#8e44ad"); // Match line color

    // Vertical line
    focus.append("line")
        .attr("class", "tooltip-line")
        .attr("y1", 0)
        .attr("y2", height);

    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", () => {
            focus.style("display", null);
            tooltip.style("opacity", 1);
        })
        .on("mouseout", () => {
            focus.style("display", "none");
            tooltip.style("opacity", 0);
        })
        .on("mousemove", mousemove);

    function mousemove(event) {
        const x0 = x.invert(d3.pointer(event)[0]);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];

        let d = d0;
        if (d1) {
            d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
        }

        focus.attr("transform", `translate(${x(d.Date)},${y(d.TotalDistance)})`);
        focus.select(".tooltip-line")
            .attr("y2", height - y(d.TotalDistance));

        tooltip.html(
            `<strong>${formatDate(d.Date)}</strong><br>` +
            `Trailing Distance: ${d.TotalDistance} km<br>` +
            `Avg Pace: ${d.AveragePace} min/km<br>` +
            `Runs in 365 days: ${d.RunCount}`
        )
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 28) + "px");
    }

}).catch(error => {
    console.error("Error loading data:", error);
});
