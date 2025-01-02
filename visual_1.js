// url SCB amount of forest in sweden
const urlForestSweden = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvJbSkN";

const queryForestSweden = {
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
            "213",
            "911"
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
  };

  const request_visual_1 = new Request(urlForestSweden, {
    method: 'POST',
    body: JSON.stringify(queryForestSweden),
  });
  
  fetch(request_visual_1)
    .then(response => response.json())
    .then(data => {
      // Extract the year value for the title
       // Extract the year value for the title
    let year = queryForestSweden.query.find(q => q.code === "Tid").selection.values[0];
    
    // Change the title of the year variable
    if (year === "2020") {
      year = "Year 2020";
    }
      const keyTitleMapping = {
        "213": "Total skogsmark",
        "911": "Total landareal" 
      };

      console.log("Visual 1: Forest Sweden",data);
  
      // Process the data to fit the pie chart format
      const processedData = data.data
        .filter(item => item.key[1] === "213" || item.key[1] === "911")
        .map(item => ({
            label: keyTitleMapping[item.key[1]], 
          value: item.values[0] 
        }));
  
      // Set the dimensions and margins of the graph
      const width = 450;
      const height = 450;
      const margin = 40;
  
      // The radius of the pie chart is half the smallest side
      const radius = Math.min(width, height) / 2 - margin;
  
      // Append the svg object to the body of the page
      const svg = d3.select(".visual_1")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
      // Add the title
      svg.append("text")
        .attr("x", 0)
        .attr("y", -height / 2 + margin)
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .text(`Forest Data for Year ${year}`);
  
      // Create the pie chart
      const pie = d3.pie()
        .value(d => d.value);
  
      const data_ready = pie(processedData);
  
      // Shape helper to build arcs
      const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
  
      // Build the pie chart
      svg
        .selectAll('slices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', (d, i) => d3.schemeCategory10[i])
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);
  
      // Add labels
      svg
        .selectAll('slices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => d.data.label)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 15);
    })
    .catch(error => console.error('Error fetching data:', error));
  