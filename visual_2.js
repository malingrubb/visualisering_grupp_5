// Visual 2: Stacked bar chart
 const urlSkogsSverige2 = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvJbSkN";

 const querySkogsSverige2 = {
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
            "211",
            "212"
          ]
        }
      },
      {
        "code": "Tid",
        "selection": {
          "filter": "item",
          "values": [
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
  }
 
 const requestSkogsSverige2 = new Request(urlSkogsSverige2, {
     method: 'POST',
     body: JSON.stringify(querySkogsSverige2)
 });
 
 fetch(requestSkogsSverige2)
   .then(response => response.json())
   .then((dataSkogsSverige2) => {
     const data = processData(dataSkogsSverige2.data);
     const comments = dataSkogsSverige2.comments; 
     createStackedBarChart(data, comments);
   });
 
   function processData(rawData) {
    const years = [...new Set(rawData.map(d => d.key[2]))];
    const classes = ["211", "212"];
    const data = years.map(year => {
      const yearData = { year };
      classes.forEach(cls => {
        const entry = rawData.find(d => d.key[2] === year && d.key[1] === cls);
        yearData[cls] = entry ? parseFloat(entry.values[0]) : 0;
      });
      return yearData;
    });
    return data;
  }
 
  function createStackedBarChart(data, comments) {
    const margin = { top: 80, right: 210, bottom: 120, left: 80 }; 
    const width = 900 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;

    const svg = d3.select(".visual_2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Skogsmark i Sverige");

    const x = d3.scaleBand()
        .domain(data.map(d => d.year))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, 41000000])
        .nice()
        .range([height, 0]);

    const color = d3.scaleOrdinal()
        .domain(["211", "212"])
        .range(["#003300", "#99cfab"]);

    const stack = d3.stack()
        .keys(["211", "212"]);

    const series = stack(data);

    // Draw bars
    svg.append("g")
        .selectAll("g")
        .data(series)
        .enter().append("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d)
        .enter().append("rect")
        .attr("x", d => x(d.data.year))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth());

    // Add x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y).tickFormat(d => `${(d / 1000000).toFixed(0)} milj`));

    // Add y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Hektar");
        

    // Add text labels next to the bars instead of a separate legend
    const legendNames2 = {
      "211": "Skogsmark produktiv",
      "212": "Skogsmark ej produktiv"
  };

    const lastBarX = x("2020") + x.bandwidth();

    svg.append("g")
        .selectAll("text")
        .data(series)
        .enter().append("text")
        .attr("x", lastBarX + 10) // Adding an additional 10 pixels to the right
        .attr("y", d => (y(d[1][0]) + y(d[0][1])) / 2) 
        .style("font-size", "14px")
        .style("fill", d => color(d.key)) 
        .text(d => legendNames2[d.key]); 

    // Add comments to the HTML document
    const commentsContainer = d3.select(".comments-container");
    comments.forEach(comment => {
        commentsContainer.append("p")
            .style("margin-bottom", "10px")
            .text(`${legendNames2[comment.value]}: ${comment.comment}`);
        commentsContainer.append("p")
            .attr("class", "body-text")
            .style("margin-bottom", "20px") // Adding more margin between different comments
    });
}