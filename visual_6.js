d3.csv("/csv/fiktiv-utsläpp.csv").then(function(data) {
  // Kontrollera att filen laddas korrekt
  console.log("Visual 6:Rådata från CSV:", data);

  // Konvertera strängvärden till nummer
  data.forEach(function(d) {
    d.Vikt_ton = +d.Vikt_ton;
    d.Utsläpp_gCO2_per_km = +d.Utsläpp_gCO2_per_km / 1000; 
  });

  const margin = {top: 80, right: 30, bottom: 50, left: 60}; // Increase top margin
  const width = 700 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select("div.visual_6").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Vikt_ton)])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0.5, d3.max(data, d => d.Utsläpp_gCO2_per_km)])
    .range([height, 0]);

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y)
    .ticks(5)
    .tickFormat(d3.format(".1f")) 
  );

  // Markeringen mellan 64-74 ton
  svg.append("rect")
    .attr("x", x(64))
    .attr("y", 0)
    .attr("width", x(74) - x(64))
    .attr("height", height)
    .attr("fill", "#003300")
    .attr("opacity", 0.3);

  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.Vikt_ton))
    .attr("cy", d => y(d.Utsläpp_gCO2_per_km))
    .attr("r", 2)
    .style("fill", "#003300");

  // Lägg till X-axel etikett
  svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .text("Vikt (ton)");

  // Lägg till Y-axel etikett
  svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2)
    .text("Utsläpp (kg CO2/km)");

  // Lägg till titel
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "regular")
    .text("Tunga lastbilars vikt vs utsläpp");

  // Filtrera data för att få de datapunkter som ligger inom intervallet 64-74 ton
  const filteredData = data.filter(d => d.Vikt_ton >= 64 && d.Vikt_ton <= 74);
  console.log("Visual 6:Filtrerad data för intervallet 64-74 ton:", filteredData);

  // Beräkna medelvärdet för de filtrerade datapunkterna
  const meanValue = d3.mean(filteredData, d => d.Utsläpp_gCO2_per_km);
  console.log("Visual 6:Medelvärde för intervallet 64-74 ton:", meanValue);

  // Lägg till en linje för medelvärdet
  svg.append("line")
    .attr("x1", x(0))
    .attr("y1", y(meanValue))
    .attr("x2", x(74))
    .attr("y2", y(meanValue))
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "4 4");

  // Lägg till en etikett för medelvärdet
  svg.append("text")
    .attr("x", x(50))
    .attr("y", y(meanValue) - 5)
    .attr("text-anchor", "end")
    .style("font-size", "12px")
    .style("fill", "red")
    .text(`Medelvärde för timmerbilar: ${meanValue.toFixed(2)} kg CO2/km`);

  // Lägg till en legend för den ljusgula markeringen
  svg.append("rect")
    .attr("x", 10)
    .attr("y", -margin.top + 50) // Adjust y position
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "#003300")
    .attr("opacity", 0.3)
    .attr("rx", 9) // Set the x-axis radius
      .attr("ry", 9); // Set the y-axis radius

  svg.append("text")
    .attr("x", 40)
    .attr("y", -margin.top + 65) // Adjust y position
    .attr("text-anchor", "start")
    .style("font-size", "12px")
    .text("Viktklassen för timmerbilar");

      // Add the figure text under the graph
  d3.select("div.visual_6").append("div")
  .attr("class", "figure-text")
  .style("text-align", "left")
  .style("margin-top", "10px")
  .text("Figur 6: Utsläpp från kategorin tunga lastbilar. Datan är fiktiv och är skapad av ChatGPT.");

}).catch(function(error) {
  console.log("Ett fel uppstod vid inläsning av CSV-filen:", error);
});