// Set dimensions
const margin = { top: 20, right: 30, bottom: 60, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const tooltip = d3.select("#tooltip");

d3.csv("../../data/weekly_distance_heatmap.csv").then(data => {

    data.forEach(d => {
        d.Year = +d.Year;
        d.Week = +d.Week;
        d.TotalDistance = +d.TotalDistance;
        d.RunCount = +d.RunCount;
        d.AveragePace = +d.AveragePace;
    });

    // X Axis: Weeks (1-53)
    const x = d3.scaleBand()
        .range([0, width])
        .domain(Array.from({ length: 53 }, (_, i) => i + 1))
        .padding(0.05);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Y Axis: Years
    const years = Array.from(new Set(data.map(d => d.Year))).sort();
    const y = d3.scaleBand()
        .range([height, 0])
        .domain(years)
        .padding(0.05);

    svg.append("g")
        .call(d3.axisLeft(y));

    // Color Scale
    const myColor = d3.scaleSequential()
        .interpolator(d3.interpolateYlGnBu)
        .domain([0, d3.max(data, d => d.TotalDistance)]);

    // Cells
    svg.selectAll()
        .data(data, d => d.Year + ':' + d.Week)
        .enter()
        .append("rect")
        .attr("x", d => x(d.Week))
        .attr("y", d => y(d.Year))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("class", "cell")
        .style("fill", d => myColor(d.TotalDistance))
        .on("mouseover", function (event, d) {
            tooltip.style("opacity", 1);
            tooltip.html(`
                    Week ${d.Week}, ${d.Year}<br>
                    Distance: ${d.TotalDistance} km<br>
                    Runs: ${d.RunCount}<br>
                    Pace: ${d.AveragePace} min/km
                `)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseleave", function () {
            tooltip.style("opacity", 0);
        });

}).catch(error => console.error(error));
