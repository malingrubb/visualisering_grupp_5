d3.csv("/csv/data-och-statistik-klimat-vaxthusgaser-utslapp-fran-inrikes-transporter.csv")
  .then(function(data) {
    // Parse the data
    data.forEach(function(d) {
      d.År = +d.År || 0; // Convert År to a number
      d["Tunga lastbilar"] = +d["Tunga lastbilar"].replace(/\s/g, '') || 0; // Clean and convert emissions
    });

    console.log(data); 

    // createBarPlot(data);
    createEnhancedStackedAreaPlot(data);
    // createStackedAreaPlot(data);
  })
  .catch(function(error) {
    console.log("Ett fel uppstod vid inläsning av CSV-filen:", error);
  });


// function createBarPlot(data) {
//   const bredd = 800;
//   const höjd = 400;
//   const marginal = {top: 100, höger: 20, botten: 70, vänster: 70};

//   const svg = d3.select(".visual_5").append("svg")
//     .attr("width", bredd + marginal.vänster + marginal.höger)
//     .attr("height", höjd + marginal.top + marginal.botten)
//     .append("g")
//     .attr("transform", `translate(${marginal.vänster},${marginal.top})`);

//   // X-axis: År
//   const x = d3.scaleBand()
//     .range([0, bredd])
//     .domain(data.map(d => d.År)) // Map years
//     .padding(0.1);

//     // Y-axis: Emissions from "Tunga lastbilar" and "Totalt"
//     const y = d3.scaleLinear()
//     .range([höjd, 0])
//     .domain([0, d3.max(data, d => Math.max(d["Tunga lastbilar"], d["Totalt"]))]); // Max of both series


//   // Create bars for "Tunga lastbilar"
//   svg.selectAll(".bar-heavy")
//     .data(data)
//     .enter().append("rect")
//     .attr("class", "bar-heavy")
//     .attr("x", d => x(d.År))
//     .attr("width", x.bandwidth() / 2)  // Make bars narrower to fit both
//     .attr("y", d => y(d["Tunga lastbilar"]))
//     .attr("height", d => höjd - y(d["Tunga lastbilar"]))
//     .attr("fill", "#003300");


//   // Create bars for "Totalt"
//   svg.selectAll(".bar-total")
//     .data(data)
//     .enter().append("rect")
//     .attr("class", "bar-total")
//     .attr("x", d => x(d.År) + x.bandwidth() / 2)  // Offset the second set of bars
//     .attr("width", x.bandwidth() / 2)  // Make bars narrower to fit both
//     .attr("y", d => y(d["Totalt"]))
//     .attr("height", d => höjd - y(d["Totalt"]))
//     .attr("fill", "#3366cc");

//   // Add X-axis
//   svg.append("g")
//     .attr("transform", `translate(0,${höjd})`)
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//     .style("text-anchor", "end")
//     .attr("dx", "-.8em")
//     .attr("dy", ".15em")
//     .attr("transform", "rotate(-65)")


//   // Add Y-axis
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Add title
//   svg.append("text")
//     .attr("x", (bredd / 2))
//     .attr("y", 0 - (marginal.top / 2))
//     .attr("text-anchor", "middle")
//     .style("font-size", "16px")
//     .text("Utsläpp av växthusgaser: Tunga lastbilar över 3,5 ton");

//     // Lägg till Y-axel etikett
//     svg.append("text")
//     .attr("class", "axis-label")
//     .attr("text-anchor", "middle")
//     .attr("transform", "rotate(-90)")
//     .attr("y", -marginal.vänster + 20)
//     .attr("x", -höjd / 2)
//     .text("Miljoner ton utsläpp");
// function createStackedAreaPlot(data) {
//   const bredd = 600;
//   const höjd = 400;
//   const marginal = {top: 100, höger: 20, botten: 70, vänster: 70};

//   const svg = d3.select(".visual_5").append("svg")
//     .attr("width", bredd + marginal.vänster + marginal.höger)
//     .attr("height", höjd + marginal.top + marginal.botten)
//     .append("g")
//     .attr("transform", `translate(${marginal.vänster},${marginal.top})`);

//   // X-axis: År
//   const x = d3.scaleBand()
//     .range([0, bredd])
//     .domain(data.map(d => d.År)) // Map years
//     .padding(0.1);

//   // Y-axis: Emissions from "Tunga lastbilar" and "Totalt"
//   const y = d3.scaleLinear()
//     .range([höjd, 0])
//     .domain([0, d3.max(data, d => d3.max([d["Tunga lastbilar"], d["Totalt"]]))]); // Max of both series

//   // Stack the data: Create a stack for "Tunga lastbilar" and "Totalt"
//   const stack = d3.stack()
//     .keys(["Tunga lastbilar", "Totalt"]); // Stack both "Tunga lastbilar" and "Totalt"

//   const stackedData = stack(data); // Apply the stack to the data

//   // Area generator function
//   const area = d3.area()
//     .x(d => x(d.data.År) + x.bandwidth() / 2)  // Use the center of each band
//     .y0(d => y(d[0]))  // Starting point (bottom of the area)
//     .y1(d => y(d[1]))  // Ending point (top of the area)

//   // Create the stacked areas for both "Tunga lastbilar" and "Totalt"
//   svg.selectAll(".area")
//     .data(stackedData)
//     .enter().append("path")
//     .attr("class", "area")
//     .attr("d", area)
//     .attr("fill", (d, i) => i === 0 ? "#003300" : "#3366cc") // Color the areas differently
//     .attr("stroke", "none");

//   // Add X-axis
//   svg.append("g")
//     .attr("transform", `translate(0,${höjd})`)
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//     .style("text-anchor", "end")
//     .attr("dx", "-.8em")
//     .attr("dy", ".15em")
//     .attr("transform", "rotate(-65)");

//   // Add Y-axis
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Add title
//   svg.append("text")
//     .attr("x", (bredd / 2))
//     .attr("y", 0 - (marginal.top / 2))
//     .attr("text-anchor", "middle")
//     .style("font-size", "16px")
//     .text("Utsläpp av växthusgaser: Tunga lastbilar och Totalt");

//   // Add Y-axis label
//   svg.append("text")
//     .attr("class", "axis-label")
//     .attr("text-anchor", "middle")
//     .attr("transform", "rotate(-90)")
//     .attr("y", -marginal.vänster + 20)
//     .attr("x", -höjd / 2)
//     .text("Växthusgaser utsläpp (tusen ton)");

function createEnhancedStackedAreaPlot(data) {
  const bredd = 700;
  const höjd = 400;
  const marginal = {top: 100, höger: 30, botten: 100, vänster: 100};

  const svg = d3.select(".visual_5").append("svg")
    .attr("width", bredd + marginal.vänster + marginal.höger)
    .attr("height", höjd + marginal.top + marginal.botten)
    .append("g")
    .attr("transform", `translate(${marginal.vänster},${marginal.top})`);

  // X-axis: År
  const x = d3.scaleBand()
    .range([0, bredd])
    .domain(data.map(d => d.År)) // Map years
    .padding(0.1);

  // Y-axis: Emissions from "Tunga lastbilar" and "Totalt"
  const y = d3.scaleLinear()
    .range([höjd, 0])
    .domain([0, d3.max(data, d => d3.max([d["Tunga lastbilar"], d["Totalt"]]))]); // Max of both series

  // Stack the data: Create a stack for "Tunga lastbilar" and "Totalt"
  const stack = d3.stack()
    .keys(["Tunga lastbilar", "Totalt"]); // Stack both "Tunga lastbilar" and "Totalt"

  // Prepare the data for the stack
  // Ensure that "Totalt" is calculated based on the sum of "Tunga lastbilar" and other emissions
  const modifiedData = data.map(d => ({
    År: d.År,
    "Tunga lastbilar": d["Tunga lastbilar"],
    "Totalt": d["Totalt"] - d["Tunga lastbilar"] // Ensure "Totalt" starts after "Tunga lastbilar"
  }));

  const stackedData = stack(modifiedData); // Apply the stack to the modified data

  // Area generator function
  const area = d3.area()
    .x(d => x(d.data.År) + x.bandwidth() / 2)  // Use the center of each band
    .y0(d => y(d[0]))  // Starting point (bottom of the area)
    .y1(d => y(d[1]));  // Ending point (top of the area)

  // Line generator function
  const line = d3.line()
    .x(d => x(d.data.År) + x.bandwidth() / 2)  // Use the center of each band
    .y(d => y(d[1]));  // Ending point (top of the area)

  // Create the stacked areas for both "Tunga lastbilar" and "Totalt"
  svg.selectAll(".area")
    .data(stackedData)
    .enter().append("path")
    .attr("class", "area")
    .attr("d", area)
    .attr("fill", (d, i) => i === 0 ? "#33ff99" : "#003300") // Colors with transparency
    .attr("stroke", "none");

  // Add lines on top of each area
  svg.selectAll(".line")
    .data(stackedData)
    .enter().append("path")
    .attr("class", "line")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", (d, i) => i === 0 ? "#33ff99" : "#003300")  // Line color matching area color
    .attr("stroke-width", 1.5);  // Line width

  // Add X-axis
  svg.append("g")
    .attr("transform", `translate(0,${höjd})`)
    .call(d3.axisBottom(x)
      .tickValues(x.domain().filter((d, i) => i % 3 === 0))) // Show every 5th year
    .selectAll("text")
    .style("text-anchor", "end");

  // Add Y-axis
  svg.append("g")
    .call(d3.axisLeft(y).tickFormat(d => `${d} milj`));

  // Add title
  svg.append("text")
    .attr("x", (bredd / 2))
    .attr("y", 0 - (marginal.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Utsläpp av växthusgaser från vägtransporter i Sverige");

  // Add Y-axis label
  svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -marginal.vänster + 20)
    .attr("x", -höjd / 2)
    .text("Växthusgaser utsläpp (ton)");

  // Add Legend
  const legendData = [
    { color: "#33ff99", label: "Tunga lastbilar över 3.5ton" },
    { color: "#003300", label: "Totalt utsläpp från alla vägtransporter" }
  ];

  const legend = svg.append("g")
    .attr("transform", `translate(0, -${marginal.top / 2 - 20})`); // Position it under the title

  legendData.forEach((item, index) => {
    const legendItem = legend.append("g")
      .attr("transform", `translate(${index * 200}, 0)`); // Stack legend items horizontally

    legendItem.append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", item.color)
      .attr("rx", 9) // Set the x-axis radius
      .attr("ry", 9); // Set the y-axis radius

    legendItem.append("text")
      .attr("x", 30)
      .attr("y", 15)
      .style("font-size", "12px")
      .text(item.label);
  });
}

    




