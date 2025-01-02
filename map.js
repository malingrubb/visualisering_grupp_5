
// // URL SCB Skogsmark
// const urlSkogsSverige = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvJbSkN"

// const querySkogsSverige = {
//     "query": [
//       {
//         "code": "Region",
//         "selection": {
//           "filter": "vs:RegionRiket99",
//           "values": [
//             "00"
//           ]
//         }
//       },
//       {
//         "code": "Tid",
//         "selection": {
//           "filter": "item",
//           "values": [
//             "2000",
//             "2005",
//             "2010",
//             "2015",
//             "2020"
//           ]
//         }
//       }
//     ],
//     "response": {
//       "format": "json"
//     }
// }

// const request = new Request(urlSkogsSverige, {
//     method: 'POST',
//     body: JSON.stringify(querySkogsSverige)
// });

// // Sätt upp dimensioner och marginaler
// const margin = {top: 40, right: 20, bottom: 30, left: 120};
// const width = 600 - margin.left - margin.right;
// const height = 400 - margin.top - margin.bottom;

// // Skapa SVG-element
// const svg = d3.select(".bar-chart").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

// // Skapa skalor
// const x = d3.scaleBand()
//     .range([0, width])
//     .padding(0.1);

// const y = d3.scaleLinear()
//     .range([height, 0]);

// // Lägg till x-axel
// svg.append("g")
//     .attr("class", "x-axis")
//     .attr("transform", `translate(0,${height})`);

// // Lägg till y-axel
// svg.append("g")
//     .attr("class", "y-axis");

//     fetch(request)
//   .then(response => response.json())
//   .then((dataSkogsSverige) => {
//     console.log(dataSkogsSverige);

//     // Filter data for specific 'Markanvandningsklass' (e.g., productive forest land "211")
//     const filteredClass = "211"; // Change this to the desired class
//     const data = dataSkogsSverige.data
//       .filter(item => item.key[1] === filteredClass) // Filter by class
//       .map(item => ({
//         year: item.key[2], 
//         value: parseFloat(item.values[0]) 
//       }));

//     // Update scales with filtered data
//     x.domain(data.map(d => d.year));
//     y.domain([20000000, d3.max(data, d => d.value)]); // Adjust to start at 20 million hectares

//    // Add images instead of bars
//    svg.selectAll(".tree-image")
//    .data(data)
//    .enter()
//    .append("image")
//    .attr("class", "tree-image")
//    .attr("x", d => x(d.year) + x.bandwidth() / 4) // Center image within the bar space
//    .attr("y", d => y(d.value)) // Top position of the tree image
//    .attr("width", x.bandwidth() / 2) // Width of the image matches the bar width
//    .attr("height", d => height - margin.bottom - y(d.value)) // Height matches the bar height
//    .attr("xlink:href", "/svg/tree_bar.svg"); // Path to the SVG file
 


//     // Update x-axis
//     svg.select(".x-axis")
//       .call(d3.axisBottom(x));
      
//     // Update y-axis with formatted scale
//     svg.select(".y-axis")
//       .call(
//         d3.axisLeft(y)
//           .tickFormat(d => `${(d / 1_000_000).toLocaleString()} miljoner`) // Format ticks as millions of hectares
//       ) 

//     // Add title
//     svg.append("text")
//       .attr("x", width / 2)
//       .attr("y", 0 - (margin.top / 2))
//       .attr("text-anchor", "middle")
//       .style("font-size", "16px")
//       .text(`Produktiv skogsmark i Sverige över tid`);

//     // Add y-axis label
//     svg.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .style("text-anchor", "middle")
//       .text("Antal hektar (y)");

//   })
//   .catch(error => console.error('Error:', error));





// Pie charts exemples:
// Fetch data and create three pie charts
// fetch(requestVisual1)
//   .then(response => response.json())
//   .then(data => {
//     createPieChart(data, 0, ["211", "213"]);  // First pie chart
//     createPieChart(data, 1, ["212", "213"]); // Second pie chart with 212 + 213
//     createPieChart(data, 2, ["211", "212"]); // Third pie chart
//   });

// //bearbetar den råa datan från APIET

//   function processData(rawData, filterValues) {
//     const filteredData = rawData.filter(d => filterValues.includes(d.code));
//     const totalLand = filteredData.reduce((sum, d) => sum + d.value, 0);
//     const forestLand = filteredData.find(d => d.code === "211").value + filteredData.find(d => d.code === "213").value;
  
//     console.log("rawData", rawData)
//     console.log("forestland:", forestLand);
//     console.log("total land", totalLand)


//     return [
//         { name: "Skogsmark", value: (forestLand / totalLand) * 100 },
//         { name: "Övrig mark", value: 100 - (forestLand / totalLand) * 100 },
      
//     ];
//   }

//   // Skapa pie-charten
//   function createPieChart(rawData, chartIndex, filterValues) {
//     const data = processData(rawData, filterValues);

    
//     const width = 600; 
//     const height = 400;
//     const radius = Math.min(width, height) / 2;
  
//     const svg = d3.select("div.visual_1")
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .append("g")
//       .attr("transform", `translate(${(width / 3) + (chartIndex * width)},${height / 2})`);
  
//     const color = d3.scaleOrdinal()
//       .domain(data.map(d => d.name))
//       .range(["#003300", "#99cfab"]);
  
//     const pie = d3.pie()
//       .value(d => d.value);
  
//     const arc = d3.arc()
//       .outerRadius(radius * 0.8)
//       .innerRadius(0);
  
//     const arcs = svg.selectAll("arc")
//       .data(pie(data))
//       .enter()
//       .append("g");
  
//     arcs.append("path")
//       .attr("d", arc)
//       .attr("fill", d => color(d.data.name));
  
//     // Lägg till legend
//     const legend = svg.selectAll(".legend")
//       .data(data)
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr("transform", (d, i) => `translate(${radius + 20},${i * 30 - radius + 20})`);
  
//     legend.append("rect")
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", d => color(d.name));
  
//     legend.append("text")
//       .attr("x", 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .text(d => `${d.name}: ${d.value.toFixed(1)}%`);
//   }