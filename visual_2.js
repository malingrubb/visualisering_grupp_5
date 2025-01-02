const urlVisual2 = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvN"

const queryVisual2 = {
    "query": [
      {
        "code": "Region",
        "selection": {
          "filter": "vs:RegionRiket99",
          "values": [
            "00"
          ]
        }
      },
      {
        "code": "Markanvandningsklass",
        "selection": {
          "filter": "item",
          "values": [
            "11",
            "14",
            "16",
            "211",
            "212",
            "213",
            "3",
            "421",
            "811",
            "911",
            "85"
          ]
        }
      },
      {
        "code": "Tid",
        "selection": {
          "filter": "item",
          "values": [
            "2020"
          ]
        }
      }
    ],
    "response": {
      "format": "json"
    }
  }

  const requestVisaul2 = new Request(urlVisual2, {
    method: 'POST',
    body: JSON.stringify(queryVisual2)
  });


  fetch(requestVisaul2)
  .then(response => response.json())
  .then(data => createPieChart(data))
  .catch(error => console.error('Error:', error));

//bearbetar den råa datan från APIET

  function processData(rawData) {
    const forestLand = Number(rawData.data[5].values);
    const totalLand = Number(rawData.data[9].values);
  
    console.log("rawData", rawData)
    console.log("forestland:", forestLand);
    console.log("total land", totalLand)


    return [
        { name: "Skogsmark", value: (forestLand / totalLand) * 100 },
        { name: "Övrig mark", value: 100 - (forestLand / totalLand) * 100 },
      
    ];
  }

  // Skapa pie-charten
  function createPieChart(rawData) {
    const data = processData(rawData);

    
    const width = 600; 
    const height = 400;
    const radius = Math.min(width, height) / 2;
  
    const svg = d3.select("div.visual_2")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 3},${height / 2})`); // Justerat position för att ge plats åt legenden
  
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(["#4CAF50", "#FFA000"]);
  
    const pie = d3.pie()
      .value(d => d.value);
  
    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(0);
  
    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");
  
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.name));
  
    // Lägg till legend
    const legend = svg.selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${radius + 20},${i * 30 - radius + 20})`);
  
    legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", d => color(d.name));
  
    legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(d => `${d.name}: ${d.value.toFixed(1)}%`);
  }
  
  