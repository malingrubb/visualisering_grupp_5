const urlSkogsSverige = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvJbSkN";

const querySkogsSverige = {
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "vs:RegionRiket99",
        "values": ["00"]
      }
    },
    {
      "code": "Tid",
      "selection": {
        "filter": "item",
        "values": [
          "1990",
          "1995",
          "2000",
          "2005",
          "2010",
          "2015",
          "2020"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
};

const requestSkogsSverige = new Request(urlSkogsSverige, {
  method: 'POST',
  body: JSON.stringify(querySkogsSverige)
});

fetch(requestSkogsSverige)
  .then(response => response.json())
  .then((dataSkogsSverige) => {
    console.log("Skogsdata", dataSkogsSverige);
    const processedData = processData1(dataSkogsSverige);
    console.log("Processed Data", processedData);
    createLineChart(processedData);
  })
  .catch(error => console.error('Error fetching data:', error));

// Line chart
function processData1(data) {
  const filteredData = [];
  const seenYears = new Set();

  data.data.forEach(d => {
    if (d.key[1] === "213") {
      const year = +d.key[2];
      const value = +d.values[0];
      if (!seenYears.has(year) && value !== 0) {
        filteredData.push({
          year: year,
          value: value
        });
        seenYears.add(year);
      }
    }
  });

  return filteredData;
}

function createLineChart(data) {
  const margin = { top: 20, right: 30, bottom: 30, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3.select("div.visual_1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  console.log("Data for line chart:", data);

  const x = d3.scalePoint()
    .domain(data.map(d => d.year))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([20000000, d3.max(data, d => d.value)]) // Ändra vart y-axeln börjar
    .range([height, 0]);

  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.value));

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  svg.append("g")
    .call(d3.axisLeft(y).tickFormat(d => `${(d / 1000000).toFixed(1)}`)); // Anpassad formattering för y-axeln

  // Lägg till etikett för y-axeln
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Hektar, miljoner");

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#003300")
    .attr("stroke-width", 4)
    .attr("stroke-linecap", "round")
    .attr("d", line);
}