// Tooltip
const tooltip = d3.select("#tooltip");

// Common Margins
const margin = { top: 20, right: 20, bottom: 40, left: 50 };

// Load All Data
Promise.all([
    d3.csv("../../data/distance_per_month.csv"),
    d3.csv("../../data/trailing_365_distance.csv"),
    d3.csv("../../data/time_of_day_counts.csv"),
    d3.csv("../../data/distance_vs_pace.csv"),
    d3.csv("../../data/weekly_distance_heatmap.csv")
]).then(([barData, lineData, pieData, scatterData, heatmapData]) => {

    drawBarChart(barData, "#bar-chart");
    drawLineChart(lineData, "#line-chart");
    drawPieChart(pieData, "#pie-chart");
    drawScatterPlot(scatterData, "#scatter-chart");
    drawHeatmap(heatmapData, "#heatmap-chart");

}).catch(err => console.error("Error loading data", err));


// --- Chart Functions ---

function drawBarChart(data, selector) {
    data.forEach(d => {
        d.TotalDistance = +d.TotalDistance;
        d.RunCount = +d.RunCount;
    });

    const container = d3.select(selector);
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.Month))
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.TotalDistance)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickValues(x.domain().filter((d, i) => !(i % 6)))) // Reduce ticks
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y).ticks(5));

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.Month))
        .attr("y", d => y(d.TotalDistance))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.TotalDistance))
        .attr("fill", "#3498db")
        .on("mouseover", (event, d) => showTooltip(event, `Distance: ${d.TotalDistance} km`))
        .on("mouseout", hideTooltip);
}

function drawLineChart(data, selector) {
    const parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach(d => {
        d.Date = parseDate(d.Date);
        d.TotalDistance = +d.TotalDistance;
    });

    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime().domain(d3.extent(data, d => d.Date)).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.TotalDistance)]).range([height, 0]);

    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).ticks(5));
    svg.append("g").call(d3.axisLeft(y).ticks(5));

    const line = d3.line().x(d => x(d.Date)).y(d => y(d.TotalDistance));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#8e44ad")
        .attr("stroke-width", 2)
        .attr("d", line);
}

function drawPieChart(data, selector) {
    data.forEach(d => d.Count = +d.Count);

    const width = 300, height = 300, radius = 130;
    const svg = d3.select(selector).append("svg")
        .attr("width", width).attr("height", height)
        .append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal().domain(["AM", "PM", "Both"]).range(["#f1c40f", "#2c3e50", "#e67e22"]);
    const pie = d3.pie().value(d => d.Count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll("path")
        .data(pie(data))
        .enter().append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.Category))
        .attr("stroke", "white")
        .on("mouseover", (event, d) => showTooltip(event, `${d.data.Category}: ${d.data.Count}`))
        .on("mouseout", hideTooltip);
}

function drawScatterPlot(data, selector) {
    data.forEach(d => { d.Distance = +d.Distance; d.AveragePace = +d.AveragePace; });

    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, d3.max(data, d => d.Distance)]).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.AveragePace)]).range([height, 0]);

    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).ticks(5));
    svg.append("g").call(d3.axisLeft(y).ticks(5));

    svg.selectAll("circle")
        .data(data).enter().append("circle")
        .attr("cx", d => x(d.Distance))
        .attr("cy", d => y(d.AveragePace))
        .attr("r", 3)
        .attr("fill", "#e74c3c")
        .attr("opacity", 0.6)
        .on("mouseover", (event, d) => showTooltip(event, `Dist: ${d.Distance}, Pace: ${d.AveragePace}`))
        .on("mouseout", hideTooltip);
}

function drawHeatmap(data, selector) {
    data.forEach(d => { d.Year = +d.Year; d.Week = +d.Week; d.TotalDistance = +d.TotalDistance; });

    const width = 800 - margin.left - margin.right; // Wider
    const height = 200 - margin.top - margin.bottom; // Shorter

    const svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).domain(d3.range(1, 54)).padding(0.05);
    const years = Array.from(new Set(data.map(d => d.Year))).sort();
    const y = d3.scaleBand().range([height, 0]).domain(years).padding(0.05);
    const color = d3.scaleSequential(d3.interpolateYlGnBu).domain([0, d3.max(data, d => d.TotalDistance)]);

    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).tickValues([1, 10, 20, 30, 40, 50]));
    svg.append("g").call(d3.axisLeft(y));

    svg.selectAll("rect")
        .data(data).enter().append("rect")
        .attr("x", d => x(d.Week))
        .attr("y", d => y(d.Year))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("fill", d => color(d.TotalDistance))
        .on("mouseover", (event, d) => showTooltip(event, `W${d.Week} ${d.Year}: ${d.TotalDistance}km`))
        .on("mouseout", hideTooltip);
}

// Helpers
function showTooltip(event, html) {
    tooltip.style("opacity", 1)
        .html(html)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
}
function hideTooltip() {
    tooltip.style("opacity", 0);
}
