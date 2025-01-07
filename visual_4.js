d3.dsv(";", "/csv/bankebilar2010-2023.csv").then(function(data) {
    // Convert strings to numbers and clean spaces
    data.forEach(function(d) {
        d.År = +d.År; // Convert year to a number
        d["Antal körda mil"] = +d["Antal körda mil"].replace(/\s/g, ''); // Remove spaces and convert to number
        d["Medelkörsträcka"] = +d["Medelkörsträcka"].replace(/\s/g, ''); // Parse Medelkörsträcka
    });

    skapaLinjediagram(data);
}).catch(function(error) {
    console.log("Ett fel uppstod vid inläsning av CSV-filen:", error);
});

function skapaLinjediagram(data) {
    const margin = { top: 50, right: 100, bottom: 50, left: 90 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create first SVG for "Antal körda mil"
    const svg1 = d3.select(".visual_4").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create second SVG for "Medelkörsträcka"
    const svg2 = d3.select(".visual_4").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define x scale (År) - same for both graphs
    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.År)) // Use extent for numeric years
        .range([0, width]);

    // Define y scales
    const y1 = d3.scaleLinear()
        .domain([d3.min(data, d => d["Antal körda mil"]) * 0.9, d3.max(data, d => d["Antal körda mil"])])
        .nice()
        .range([height, 0]);

    const y2 = d3.scaleLinear()
        .domain([d3.min(data, d => d["Medelkörsträcka"]) * 0.9, d3.max(data, d => d["Medelkörsträcka"])])
        .nice()
        .range([height, 0]);

    // Define the line generators
    const line1 = d3.line()
        .x(d => x(d.År))
        .y(d => y1(d["Antal körda mil"]));

    const line2 = d3.line()
        .x(d => x(d.År))
        .y(d => y2(d["Medelkörsträcka"]));

    // Add x-axis to both graphs
    svg1.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg2.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add y-axes
    svg1.append("g")
        .call(d3.axisLeft(y1).tickFormat(d => `${(d / 1e6).toFixed(2)} milj`)); // Format as millions

        svg2.append("g")
        .call(d3.axisLeft(y2).tickFormat(d => `${d} mil`)); // Format tick labels

    // Add the first line (Antal körda mil)
    svg1.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#003300")
        .attr("stroke-width", 1.5)
        .attr("d", line1);

    // Add the second line (Medelkörsträcka)
    svg2.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#99cfab")
        .attr("stroke-width", 1.5)
        .attr("d", line2);

    // Add dots for the first line
    svg1.selectAll(".dot1")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot1")
        .attr("cx", d => x(d.År))
        .attr("cy", d => y1(d["Antal körda mil"]))
        .attr("r", 5)
        .attr("fill", "#003300");

    // Add dots for the second line
    svg2.selectAll(".dot2")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot2")
        .attr("cx", d => x(d.År))
        .attr("cy", d => y2(d["Medelkörsträcka"]))
        .attr("r", 5)
        .attr("fill", "#99cfab");

    // Add labels for x and y axes in both graphs
    svg1.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("År");

    svg1.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .attr("text-anchor", "middle")
        .text("Antal körda mil");

    svg2.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("År");

    svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .attr("text-anchor", "middle")
        .text("Medelkörsträcka");
}
