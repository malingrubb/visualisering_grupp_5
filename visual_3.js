d3.dsv(";", "/csv/bankebilar2010-2023.csv").then(function(data) {
    // Konvertera strängvärden till nummer och rensa bort eventuella mellanslag
    data.forEach(function(d) {
      d.År = +d.År;
      d["Antal timmerbilar"] = +d["Antal timmerbilar"].replace(/\s/g, '');
    });
    
    console.log(data);
    skapaStapeldiagram(data);
  }).catch(function(error) {
    console.log("Ett fel uppstod vid inläsning av CSV-filen:", error);
  });
  
  function skapaStapeldiagram(data) {
    const bredd = 600;
    const höjd = 400;
    const marginal = {top: 50, höger: 20, botten: 70, vänster: 40};
  
    const svg = d3.select("div.visual_3").append("svg")
      .attr("width", bredd + marginal.vänster + marginal.höger)
      .attr("height", höjd + marginal.top + marginal.botten)
      .append("g")
      .attr("transform", `translate(${marginal.vänster},${marginal.top})`);
  
    const x = d3.scaleBand()
      .range([0, bredd])
      .padding(0.1);
  
    const y = d3.scaleLinear()
      .range([höjd, 0]);
  
    x.domain(data.map(d => d.År));
    y.domain([0, d3.max(data, d => d["Antal timmerbilar"])]);
  
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.År))
      .attr("width", x.bandwidth())
      .attr("y", d => y(d["Antal timmerbilar"]))
      .attr("height", d => höjd - y(d["Antal timmerbilar"]))
      .attr("fill", "#003300")
      // .attr("rx", 9) // Set the x-axis radius
    .attr("ry", 9); // Set the y-axis radius;
  
    svg.append("g")
      .attr("transform", `translate(0,${höjd})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
  
    svg.append("g")
      .call(d3.axisLeft(y));
  
    // Lägg till titel
    svg.append("text")
      .attr("x", (bredd / 2))
      .attr("y", 0 - (marginal.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Antal timmerbilar i trafik per år");

//   // Beräkna medelvärdet
//   const totalLastbilar = d3.sum(data, d => d["Antal timmerbilar"]);
//   const antalÅr = data.length;
//   const medelvärde = totalLastbilar / antalÅr;

//   // Lägg till en linje för medelvärdet
//   svg.append("line")
//     .attr("x1", 0)
//     .attr("y1", y(medelvärde))
//     .attr("x2", bredd)
//     .attr("y2", y(medelvärde))
//     .attr("stroke", "red")
//     .attr("stroke-width", 2)
//     .attr("stroke-dasharray", "4 4");

//   // Lägg till en etikett för medelvärdet
//   svg.append("text")
//     .attr("x", bredd - 10)
//     .attr("y", y(medelvärde) - 10)
//     .attr("text-anchor", "end")
//     .style("font-size", "12px")
//     .style("fill", "red")
//     .text(`Medelvärde: ${medelvärde.toFixed(2)}`);
//   }
}