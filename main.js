
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
//   }

//   const request = new Request(urlSkogsSverige, {
//     method: 'POST',
//     body: JSON.stringify(querySkogsSverige)
//   });

//   fetch(request)
//   .then(response => response.json())
//   .then((dataSkogsSverige) => {
//     console.log(dataSkogsSverige)
//   })
  
  

 
//   TESTI TESTII
// const width = 800;
// const height = 600;

// const colorScale = d3.scaleOrdinal()
//   .domain(["skog", "åkermark", "bebyggelse", "vatten"])
//   .range(["#2ca25f", "#e34a33", "#8856a7", "#2b8cbe"]);

//   svg.selectAll("path")
//   .data(swedenGeoData.features)
//   .enter().append("path")
//   .attr("d", path)
//   .attr("fill", d => {
//     const region = d.properties.name;
//     const landCoverType = getLandCoverType(region, apiData);
//     return colorScale(landCoverType);
//   })
//   .append("title")
//   .text(d => `${d.properties.name}: ${getLandCoverPercentage(d.properties.name, apiData)}% ${getLandCoverType(d.properties.name, apiData)}`);


// //

//   // skapa en grundkarta med d3
//   const svg = d3.select("body").append("svg")
//   .attr("width", width)
//   .attr("height", height);

// const projection = d3.geoMercator().center([16, 62]).scale(1000).translate([width / 2, height / 2]);
// const path = d3.geoPath().projection(projection);

// d3.json("path/to/sweden-topojson.json").then(function(topology) {
//   svg.append("g")
//     .selectAll("path")
//     .data(topojson.feature(topology, topology.objects.counties).features)
//     .enter().append("path")
//     .attr("d", path)
//     .attr("class", "county");
// });

// // visualiserna

// function visualizeForestData(data) {
//   const colorScale = d3.scaleSequential(d3.interpolateGreens)
//     .domain([0, 100]); // Anta att data är i procent

//   svg.selectAll(".county")
//     .attr("fill", d => {
//       const forestPercentage = getForestPercentage(d.properties.name, data);
//       return colorScale(forestPercentage);
//     })
//     .append("title")
//     .text(d => `${d.properties.name}: ${getForestPercentage(d.properties.name, data)}% skog`);
// }

// function getLandCoverType(region, data) {
//   // Implementera logik för att hämta dominerande marktäckningstyp
// }

// function getLandCoverPercentage(region, data) {
//   // Implementera logik för att beräkna procentandel av marktäckning
// }

