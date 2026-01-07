d3.csv("../../data/kpi_stats.csv").then(data => {
    // data is an array of objects. Since we have 1 row:
    const stats = data[0];

    d3.select("#total-runs").text(stats.TotalRuns);
    d3.select("#total-distance").text(stats.TotalDistance);
    d3.select("#longest-run").text(stats.LongestRun);
    d3.select("#avg-distance").text(stats.AvgDistance);

}).catch(error => {
    console.error("Error loading KPI data:", error);
});
