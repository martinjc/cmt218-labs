// Load Data
d3.csv("../../data/linked_data.csv").then(data => {

    // Parse
    data.forEach(d => {
        d.Distance_km = +d.Distance_km;
        d.Pace_min_km = +d.Pace_min_km;
    });

    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // --- Scatter Plot (Source) ---
    const svgScatter = d3.select("#scatter-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScatter = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Distance_km)])
        .range([0, width]);

    const yScatter = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Pace_min_km)])
        .range([height, 0]);

    // Draw Axes
    svgScatter.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScatter).ticks(5));
    svgScatter.append("g").call(d3.axisLeft(yScatter));

    // Labels
    svgScatter.append("text").attr("x", width / 2).attr("y", height + 30).text("Distance (km)").style("text-anchor", "middle");
    svgScatter.append("text").attr("transform", "rotate(-90)").attr("y", -30).attr("x", -height / 2).text("Pace (min/km)").style("text-anchor", "middle");

    // Dots
    const dots = svgScatter.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScatter(d.Distance_km))
        .attr("cy", d => yScatter(d.Pace_min_km))
        .attr("r", 3)
        .style("fill", "#2c3e50")
        .style("opacity", 0.5);

    // --- Bar Chart (Target) ---
    const svgBar = d3.select("#bar-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Init Bar Scales (X is Month, fixed domain)
    const allMonths = [...new Set(data.map(d => d.Month))].sort();
    const xBar = d3.scaleBand().domain(allMonths).range([0, width]).padding(0.2);
    const yBar = d3.scaleLinear().range([height, 0]); // Domain is dynamic

    // Draw X Axis (static)
    const xAxisGroup = svgBar.append("g").attr("transform", `translate(0,${height})`);
    xAxisGroup.call(d3.axisBottom(xBar)).selectAll("text").attr("transform", "rotate(-45)").style("text-anchor", "end");

    const yAxisGroup = svgBar.append("g");

    // Function to update Bar Chart
    function updateBarChart(selectedData) {
        // Aggregate
        const rollup = d3.rollups(selectedData, v => d3.sum(v, d => d.Distance_km), d => d.Month);
        // Map back to all months (fill 0)
        const aggregated = allMonths.map(m => {
            const found = rollup.find(r => r[0] === m);
            return { Month: m, TotalDistance: found ? found[1] : 0 };
        });

        // Update Y Domain
        yBar.domain([0, d3.max(aggregated, d => d.TotalDistance) || 10]); // Default slightly >0
        yAxisGroup.transition().duration(500).call(d3.axisLeft(yBar));

        // Join
        svgBar.selectAll("rect")
            .data(aggregated)
            .join(
                enter => enter.append("rect")
                    .attr("x", d => xBar(d.Month))
                    .attr("y", height) // Animate from bottom
                    .attr("height", 0)
                    .attr("width", xBar.bandwidth())
                    .attr("fill", "#e74c3c")
                    .call(enter => enter.transition().duration(500)
                        .attr("y", d => yBar(d.TotalDistance))
                        .attr("height", d => height - yBar(d.TotalDistance))),
                update => update.call(update => update.transition().duration(500)
                    .attr("y", d => yBar(d.TotalDistance))
                    .attr("height", d => height - yBar(d.TotalDistance))),
                exit => exit.remove()
            );
    }

    // Initial Render
    updateBarChart(data);

    // --- Brushing ---
    const brush = d3.brush()
        .extent([[0, 0], [width, height]])
        .on("start brush end", brushed);

    svgScatter.append("g")
        .attr("class", "brush")
        .call(brush);

    function brushed({ selection }) {
        if (selection) {
            const [[x0, y0], [x1, y1]] = selection;

            // Filter
            const filtered = data.filter(d => {
                const x = xScatter(d.Distance_km);
                const y = yScatter(d.Pace_min_km);
                return x >= x0 && x <= x1 && y >= y0 && y <= y1;
            });

            // visual feedback on dots
            dots.style("fill", d => {
                const x = xScatter(d.Distance_km);
                const y = yScatter(d.Pace_min_km);
                return x >= x0 && x <= x1 && y >= y0 && y <= y1 ? "#e74c3c" : "#2c3e50";
            });

            updateBarChart(filtered);
        } else {
            // Reset
            dots.style("fill", "#2c3e50");
            updateBarChart(data);
        }
    }

}).catch(err => console.error(err));
