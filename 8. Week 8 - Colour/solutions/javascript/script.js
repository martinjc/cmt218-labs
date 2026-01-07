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

d3.csv("../../data/distance_per_month.csv").then(data => {

    data.forEach(d => {
        d.TotalDistance = +d.TotalDistance;
    });

    // X Axis
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.Month))
        .padding(0.2);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y Axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.TotalDistance)])
        .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Color Scale
    // Sequential Blue (low distance) to Dark Blue (high distance)
    const color = d3.scaleSequential()
        .interpolator(d3.interpolateBlues)
        .domain([0, d3.max(data, d => d.TotalDistance)]);

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.Month))
        .attr("y", d => y(d.TotalDistance))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.TotalDistance))
        .attr("fill", d => color(d.TotalDistance)) // Use color scale
        .on("mouseover", function (event, d) {
            d3.select(this).style("opacity", 0.7);
            tooltip.style("opacity", 1)
                .html(`Distance: ${d.TotalDistance} km`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            d3.select(this).style("opacity", 1);
            tooltip.style("opacity", 0);
        });

}).catch(error => console.error(error));
