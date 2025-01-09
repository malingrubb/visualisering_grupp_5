    d3.dsv(";", "/csv/bankebilar2010-2023.csv").then(function(data) {
      // Konvertera strängvärden till nummer och rensa bort eventuella mellanslag
      data.forEach(function(d) {
        d.År = +d.År;
        d["Antal timmerbilar"] = +d["Antal timmerbilar"].replace(/\s/g, '');
      });
      
      console.log(data);
      skapaLinjediagram2(data);
    }).catch(function(error) {
      console.log("Ett fel uppstod vid inläsning av CSV-filen:", error);
    });
    
    function skapaLinjediagram2(data) {
      const bredd = 700;
      const höjd = 500;
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
      y.domain([1400, d3.max(data, d => d["Antal timmerbilar"]) * 1.1]);
    
      // Skapa linje-generator
      const line = d3.line()
        .x(d => x(d.År) + x.bandwidth() / 2) // Beräkna x-koordinater för linjen
        .y(d => y(d["Antal timmerbilar"])); // y-koordinater för linjen
    
      // Lägg till linjen
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "#003300")
        .attr("stroke-width", 2);
    
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

              // Lägg till en punkt på sista värdet (år 2023)
      const lastDataPoint = data[data.length - 1];
      svg.append("circle")
        .attr("cx", x(lastDataPoint.År) + x.bandwidth() / 2)
        .attr("cy", y(lastDataPoint["Antal timmerbilar"]))
        .attr("r", 5)
        .attr("fill", "green");

      // Lägg till text som visar värdet för sista året
      svg.append("text")
        .attr("x", x(lastDataPoint.År) + x.bandwidth() / 2)
        .attr("y", y(lastDataPoint["Antal timmerbilar"]) - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "green")
        .text(`${lastDataPoint["Antal timmerbilar"]} st`);
    }
  