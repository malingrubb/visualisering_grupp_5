d3.dsv(";", "/csv/bankebilar2010-2023.csv").then(function(data) {
    // Convert strings to numbers and clean spaces
    data.forEach(function(d) {
        d.År = +d.År; // Convert year to a number
        d["Antal körda mil"] = +d["Antal körda mil"].replace(/\s/g, ''); // Remove spaces and convert to number
        d["Medelkörsträcka"] = +d["Medelkörsträcka"].replace(/\s/g, ''); // Parse Medelkörsträcka
    });

    // Filter data to include only years from 2013 onwards
    const filteredData = data.filter(d => d.År >= 2013);

    skapaLinjediagram(filteredData);
}).catch(function(error) {
    console.log("Ett fel uppstod vid inläsning av CSV-filen:", error);
});

function skapaLinjediagram(data) {
    const margin = { top: 50, right: 50, bottom: 80, left: 90 };
    const width = 700 - margin.left - margin.right;
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
        .domain([d3.min(data, d => d["Medelkörsträcka"]) * 0.95, d3.max(data, d => d["Medelkörsträcka"])])
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
    .call(d3.axisLeft(y1).ticks(5).tickFormat(d => `${(d / 1e6).toFixed(0)} milj`)) // Format as millions
    .style("font-size", "12px"); // Ändra storleken efter behov


svg2.append("g")
    .call(d3.axisLeft(y2).tickFormat(d => `${d} mil`)) // Format tick labels
    .style("font-size", "12px"); // Ändra storleken efter behov


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

    // Highlight the year 2023 with a dot for the first line
svg1.selectAll(".dot1")
.data(data.filter(d => d.År === 2023))
.enter().append("circle")
.attr("class", "dot1")
.attr("cx", d => x(d.År))
.attr("cy", d => y1(d["Antal körda mil"]))
.attr("r", 5)
.attr("fill", "#003300");

svg1.selectAll(".text1")
.data(data.filter(d => d.År === 2021 || d.År === 2023))
  .enter().append("text")
  .attr("class", "text1")
  .attr("x", d => x(d.År) + - 30) // Adjust position as needed
  .attr("y", d => y1(d["Antal körda mil"]) - 15 ) // Adjust position as needed
  .text(d => d["Antal körda mil"] + " mil")
  .style("font-size", "12px")
  .attr("fill", "#003300");

    // Highlight the year 2023 with a dot for the second line
svg2.selectAll(".dot2")
.data(data.filter(d => d.År === 2023))
.enter().append("circle")
.attr("class", "dot2")
.attr("cx", d => x(d.År))
.attr("cy", d => y2(d["Medelkörsträcka"]))
.attr("r", 5)
.attr("fill", "#99cfab");

svg2.selectAll(".text2")
  .data(data.filter(d => d.År === 2023))
  .enter().append("text")
  .attr("class", "text2")
  .attr("x", d => x(d.År) + - 20) // Adjust position as needed
  .attr("y", d => y2(d["Medelkörsträcka"]) - -20) // Adjust position as needed
  .text(d => d["Medelkörsträcka"] + " mil")
  .style("font-size", "12px")
  .attr("fill", "#99cfab");
 

    svg1.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 30)
        .attr("text-anchor", "middle")
        .text("Antal körda mil");


    svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .attr("text-anchor", "middle")
        .text("Medelkörsträcka");

    // Add titles to the graphs
    svg1.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "regular")
        .text("Antal körda mil för timmerbilar över tid");

    svg2.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "regular")
        .text("Medelkörsträcka per timmerbil över tid");

     // Add figure text under each graph
d3.select("div.visual_4").select("svg:nth-of-type(1)").append("text")
.attr("class", "figure-text")
.attr("x", 10)
.attr("y", height + margin.bottom + 40)
.style("text-anchor", "left")
.text("Figur 4.1: Totalt antal körda mil för timmerbilar per år från 2013 till 2023, data hämtat från Trafikanalys.");

d3.select("div.visual_4").select("svg:nth-of-type(2)").append("text")
.attr("class", "figure-text")
.attr("x", 10)
.attr("y", height + margin.bottom + 40)
.style("text-anchor", "left")
.text("Figur 4.2: Medelkörsträcka för timmerbilar från 2013 till 2023, data hämtat från Trafikanalys.");
}
