d3.csv("/csv/data-och-statistik-klimat-vaxthusgaser-utslapp-fran-inrikes-transporter.csv")
  .then(function(data) {
    // Parse the data
    data.forEach(function(d) {
      d.År = +d.År || 0; // Convert År to a number
      d["Tunga lastbilar"] = +d["Tunga lastbilar"].replace(/\s/g, '') || 0; // Clean and convert emissions
    });

    // Filter data to only include years between 2013 and 2023
    data = data.filter(d => d.År >= 2013 && d.År <= 2023);

    console.log(data); 

    // createBarPlot(data);
    createEnhancedStackedAreaPlot(data);
    // createStackedAreaPlot(data);
  })
  .catch(function(error) {
    console.log("Ett fel uppstod vid inläsning av CSV-filen:", error);
  });

  function createEnhancedStackedAreaPlot(data) {
    const bredd = 700;
    const höjd = 400;
    const marginal = {top: 100, höger: 30, botten: 30, vänster: 100};
  
    const svg = d3.select(".visual_5").append("svg")
      .attr("width", bredd + marginal.vänster + marginal.höger)
      .attr("height", höjd + marginal.top + marginal.botten)
      .append("g")
      .attr("transform", `translate(${marginal.vänster},${marginal.top})`);
  
    // X-axis: År
    const x = d3.scaleLinear()
      .range([0, bredd])
      .domain([d3.min(data, d => d.År), d3.max(data, d => d.År)]);
  
    // Y-axis: Emissions from "Tunga lastbilar" and "Totalt"
    const y = d3.scaleLinear()
      .range([höjd, 0])
      .domain([0, d3.max(data, d => d3.max([d["Tunga lastbilar"], d["Totalt"]]))]); // Max of both series
  
    // Stack the data: Create a stack for "Tunga lastbilar" and "Totalt"
    const stack = d3.stack()
      .keys(["Tunga lastbilar", "Totalt"]); 
    // Prepare the data for the stack
    // Ensure that "Totalt" is calculated based on the sum of "Tunga lastbilar" and other emissions
    const modifiedData = data.map(d => ({
      År: d.År,
      "Tunga lastbilar": d["Tunga lastbilar"],
      "Totalt": d["Totalt"] - d["Tunga lastbilar"] 
    }));
  
    // Add the X-axis to the SVG
    const xAxis = d3.axisBottom(x)
    .tickFormat(d3.format("d")) // Format ticks as integers
    .tickValues(d3.range(d3.min(data, d => d.År), d3.max(data, d => d.År) + 1, 2)); // Varannat år 
  
  svg.append("g")
    .attr("transform", `translate(0,${höjd})`)
    .call(xAxis);
  
    const maxTungaLastbilar = (d3.max(data, d => d["Tunga lastbilar"]));
    const maxTotalt = (d3.max(data, d => d["Totalt"]));
    
    // Add the Y-axis to the SVG
    svg.append("g")
      .call(d3.axisLeft(y)
        .tickValues([maxTungaLastbilar, maxTotalt]) // Define custom tick values including the max values
        .tickFormat(d => `${d} milj`)); // Format ticks with "milj"
    

    

// Add Y-axis label
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - marginal.vänster)
  .attr("x", 0 - (höjd / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .attr("class", "visual_label--2")
  .text("Utsläpp, miljoner ton");
  
    // Define your own color scale
const color = d3.scaleOrdinal()
.domain(["Tunga lastbilar", "Totalt"])
.range(["#003300", "#99cfab"]); // Your custom colors

// Add the stacked area chart
const area = d3.area()
.x(d => x(d.data.År))
.y0(d => y(d[0]))
.y1(d => y(d[1]));

svg.selectAll(".layer")
      .data(stack(modifiedData))
      .enter().append("path")
      .attr("class", "layer")
      .attr("d", area)
      .style("fill", d => color(d.key)) // Use custom color scale
      .style("fill-opacity", 0.3); // Add opacity to the fill color
  
      // Add lines on top of the areas without opacity
const line = d3.line()
.x(d => x(d.data.År))
.y(d => y(d[1]));

svg.selectAll(".line")
.data(stack(modifiedData))
.enter().append("path")
.attr("class", "line")
.attr("d", line)
.style("fill", "none")
.style("stroke", d => color(d.key))
.style("stroke-width", 2);

    // Add Legend
    const legendData = [
      { color: "#003300", label: "Tunga lastbilar över 3.5 ton" },
      { color: " #99cfab", label: "Totalt utsläpp från alla vägtransporter" }
    ];
  
    const legend = svg.append("g")
      .attr("transform", `translate(0, -${marginal.top / 2 - 20})`); // Position it under the title
  
    legendData.forEach((item, index) => {
      const legendItem = legend.append("g")
        .attr("transform", `translate(${index * 200}, 0)`); // Stack legend items horizontally
  
      legendItem.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", item.color)
        .attr("rx", 9) // Set the x-axis radius
        .attr("ry", 9); // Set the y-axis radius
  
      legendItem.append("text")
        .attr("x", 25)
        .attr("y", 15)
        .text(item.label)
        .attr("class", "legend_label");

    });

    // Add figuretext 
  d3.select("div.visual_5").append("div")
  .attr("class", "figure-text")
  .style("text-align", "left")
  .style("margin-top", "20px")
  .text("Figur 4: Utsläpp från olika inrikes transporter i Sverige. Data hämtat från Naturvårdsverket.");

  //title
  svg.append("text")
  .attr("x", (bredd / 2))
  .attr("y", 0 - (marginal.top / 2))
  .attr("text-anchor", "middle")
  .attr("class", "visual_label")
  .text("Utsläpp av växthusgaser från vägtransporter i Sverige");


  }

    




