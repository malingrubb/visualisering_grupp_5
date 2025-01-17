// Line chart som vi inte vill ha med 


// const urlSkogsSverige = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvJbSkN";

// const querySkogsSverige = {
//   "query": [
//     {
//       "code": "Region",
//       "selection": {
//         "filter": "vs:RegionRiket99",
//         "values": ["00"]
//       }
//     },
//     {
//       "code": "Tid",
//       "selection": {
//         "filter": "item",
//         "values": [
//           "1990",
//           "1995",
//           "2000",
//           "2005",
//           "2010",
//           "2015",
//           "2020"
//         ]
//       }
//     }
//   ],
//   "response": {
//     "format": "json"
//   }
// };

// const requestSkogsSverige = new Request(urlSkogsSverige, {
//   method: 'POST',
//   body: JSON.stringify(querySkogsSverige)
// });

// fetch(requestSkogsSverige)
//   .then(response => response.json())
//   .then((dataSkogsSverige) => {
//     console.log("Skogsdata", dataSkogsSverige);
//     const processedData = processData1(dataSkogsSverige);
//     console.log("Processed Data", processedData);
//     createLineChart(processedData);
//   })
//   .catch(error => console.error('Error fetching data:', error));

// // Line chart
// function processData1(data) {
//   const filteredData = [];
//   const seenYears = new Set();

//   data.data.forEach(d => {
//     if (d.key[1] === "213") {
//       const year = +d.key[2];
//       const value = +d.values[0];
//       if (!seenYears.has(year) && value !== 0) {
//         filteredData.push({
//           year: year,
//           value: value
//         });
//         seenYears.add(year);
//       }
//     }
//   });

//   return filteredData;
// }

// function createLineChart(data) {
//   const margin = { top: 20, right: 30, bottom: 30, left: 60 };
//   const width = 800 - margin.left - margin.right;
//   const height = 400 - margin.top - margin.bottom;

//   const svg = d3.select("div.visual_1").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

//   console.log("Data for line chart:", data);

//   const x = d3.scalePoint()
//     .domain(data.map(d => d.year))
//     .range([0, width]);

//   const y = d3.scaleLinear()
//     .domain([20000000, d3.max(data, d => d.value) * 1.2]) // Ändra vart y-axeln börjar
//     .range([height, 0]);

//   const line = d3.line()
//     .x(d => x(d.year))
//     .y(d => y(d.value));

//   svg.append("g")
//     .attr("transform", `translate(0,${height})`)
//     .call(d3.axisBottom(x).tickFormat(d3.format("d")));

//   svg.append("g")
//     .call(d3.axisLeft(y)
//     .ticks(5)
//     .tickFormat(d => `${(d / 1000000).toFixed(1)}`)); // Anpassad formattering för y-axeln

//   // Lägg till etikett för y-axeln
//   svg.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .style("text-anchor", "middle")
//     .text("Miljoner hektar");

//   svg.append("path")
//     .datum(data)
//     .attr("fill", "none")
//     .attr("stroke", "#003300")
//     .attr("stroke-width", 4)
//     .attr("stroke-linecap", "round")
//     .attr("d", line);
// }


// const width = 500;
// const height = 500;
// const margin = 40;

// const radius = Math.min(width, height) / 2 - margin;

// const svg = d3.select("div.visual_1").append("svg")
//   .attr("width", width)
//   .attr("height", height)
//   .append("g")
//   .attr("transform", `translate(${width / 2},${height / 2})`);

// const data = { filled: 68, empty: 32 };

// const color = d3.scaleOrdinal()
//   .domain(Object.keys(data)) // Använd Object.keys för att få en array av nycklarna
//   .range(["#003300", "#eafffe"]);

// const pie = d3.pie()
//   .value(d => d[1]); // Använd värdet från nyckel-värde-paret

// const data_ready = pie(Object.entries(data)); // Använd Object.entries istället för d3.entries

// const arc = d3.arc()
//   .innerRadius(radius * 0.5)
//   .outerRadius(radius);

// svg.selectAll('slices')
//   .data(data_ready)
//   .enter()
//   .append('path')
//   .attr('d', arc)
//   .attr('fill', d => color(d.data[0])) // Använd nyckeln från nyckel-värde-paret
//   .attr("stroke", "#003300")
//   .style("stroke-width", "1px")

// // Lägg till text i mitten av cirkeldiagrammet
// svg.append("text")
//   .attr("text-anchor", "middle")
//   .attr("dy", ".35em")
//   .style("font-size", "24px")
//   // .style("font-weight", "bold")
//   .text("68%");

//   // Add the figure text under the graph
//   d3.select("div.visual_1").append("div")
//   .attr("class", "figure-text")
//   .style("text-align", "left")
//   .style("margin-top", "10px")
//   .text("Figur 1. Data hämtad från .....");

// d3.xml("svg/forest_graph.svg").then(function (xml) {
//   // Append the loaded SVG to the container
//   const importedNode = document.importNode(xml.documentElement, true);
//   d3.select("div.visual_1").node().appendChild(importedNode);

//   // Select the SVG container
//   const forestSvg = d3.select("div.visual_1 svg");

//   // Set the width and height of the SVG
//   const width = 900;  // Set the desired width
//   const height = 500; // Set the desired height
//   forestSvg
//     .attr("width", width)
//     .attr("height", height);

//   // Ensure the SVG has loaded and has the expected paths
//   const totalArc = forestSvg.selectAll("path");

//   console.log("Paths found:", totalArc.nodes().length); // Log number of paths found

//   // Remove all colors from the paths
//   // totalArc
//   //   .attr("fill", "none")
//   //   .attr("stroke", "none");

// }).catch(function (error) {
//   console.error("Error loading the SVG:", error);
//   // Optional: Add a fallback message
//   d3.select("div.visual_1").append("p").text("Failed to load the SVG.");
// });

// Visual_1

// function colorSwedenMap(containerId, forestHeightRatio, legendData, title) {
//   d3.xml("./svg/tree_frame_coloured.svg").then(svg => {
//     const svgNode = svg.documentElement;
//     const container = d3.select(containerId);

//     if (container.empty()) {
//       console.error(`Container ${containerId} not found`);
//       return;
//     }

//     // Create the title container and append it to the main container
//     container.append("div")
//       .attr("class", "title")
//       .style("text-align", "left")
//       .attr("class", "visual_label")
//       .style("margin-left", "1rem")
//       .style("margin-bottom", "1rem")
//       .text(title);

//     // Create the legend before appending the SVG
//     createLegend(containerId, legendData);

//     // Append the SVG node after the legend
//     container.node().append(svgNode);

//     const svgHeight = 1052.3622; // Höjden på SVG:n
//     const svgWidth = 744.0945; // Bredden på SVG:n (you can adjust this value as needed)
//     const forestHeight = svgHeight * forestHeightRatio;
//     const otherHeight = svgHeight - forestHeight;

//     // Skapa en gradient
//     const defs = d3.select(svgNode).append("defs");

//     const gradient = defs.append("linearGradient")
//       .attr("id", `gradient-${containerId}`)
//       .attr("x1", "0%")
//       .attr("y1", "0%")
//       .attr("x2", "0%")
//       .attr("y2", "100%");

//     gradient.append("stop")
//       .attr("offset", `${forestHeight / svgHeight * 100}%`)
//       .attr("stop-color", "#99cfab"); // Färg för 32% av höjden

//     gradient.append("stop")
//       .attr("offset", `${forestHeight / svgHeight * 100}%`)
//       .attr("stop-color", "#003300"); // Färg för 68% av höjden

//     d3.select(svgNode).selectAll("path")
//       .attr("fill", `url(#gradient-${containerId})`);


//       // Add figuretext 
//   d3.select("div.visual_1").append("div")
//   .attr("class", "figure-text")
//   .style("text-align", "left")
//   .style("margin-top", "20px")
//   .text("Figur 1: En visualisering av andelen skogsmark i Sverige 2023 baserad på data från SCB. Detta visar på den procentuella fördelningen på 68% skogsmark.");
//   });
// }

// function createLegend(containerId, legendData) {
//   const container = d3.select(containerId);
//   const legendContainer = container.append("div").attr("class", "legend");

//   legendData.forEach(d => {
//     const legendItem = legendContainer.append("div").attr("class", "legend-item");
//     legendItem.append("span")
//       .attr("class", "legend-color")
//       .style("background-color", d.color);
//     legendItem.append("span")
//       .attr("class", "legend-text")
//       .text(d.name);

      
//   });
// }

// // Define legend data for each map
// const legendData1 = [
//   { name: "% Skogsmark", color: "#003300" },
//   { name: "% Övrig mark", color: "#99cfab" }
// ];

// // Create three maps with different forest height ratios
// colorSwedenMap(".map1", 0.32, legendData1, "Andelen skogsmark i Sverige 2023"); // Original ratio