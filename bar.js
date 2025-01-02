
// URL SCB Skogsmark produktiv 211
// URL SCB Skogsmark produktiv 211
const urlSkogsSverige2 = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvJbSkN"

const querySkogsSverige2 = {
    "query": [
      {
        "code": "Region",
        "selection": {
          "filter": "vs:RegionLän07",
          "values": [
            "01", "03", "04", "05", "06", "07", "08", "09", "10", "12", 
            "13", "14", "17", "18", "19", "20", "21", "22", "23", "24", "25"
          ]
        }
      },
      {
        "code": "Markanvandningsklass",
        "selection": {
          "filter": "item",
          "values": [
            "211"
          ]
        }
      }
    ],
    "response": {
      "format": "json"
    }
}

const request2 = new Request(urlSkogsSverige2, {
    method: 'POST',
    body: JSON.stringify(querySkogsSverige2)
});

const customLabelsMap = {
    "01": "Stockholms län",
    "03": "Uppsala län",
    "04": "Södermanlands län",
    "05": "Östergötlands län",
    "06": "Jönköpings län",
    "07": "Kronobergs län",
    "08": "Kalmar län",
    "09": "Gotlands län",
    "10": "Blekinge län",
    "12": "Skåne län",
    "13": "Hallands län",
    "14": "Västra Götalands län",
    "17": "Värmlands län",
    "18": "Örebro län",
    "19": "Västmanlands län",
    "20": "Dalarnas län",
    "21": "Gävleborgs län",
    "22": "Västernorrlands län",
    "23": "Jämtlands län",
    "24": "Västerbottens län",
    "25": "Norrbottens län"
};

// Förbered data och dimensioner
const margin2 = {top: 20, right: 20, bottom: 30, left: 80};
const width2 = 960 - margin2.left - margin2.right;
const height2 = 500 - margin2.top - margin2.bottom;

// Skapa SVG
const svg2 = d3.select(".bar-chart-2").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform", `translate(${margin2.left},${margin2.top})`);

// Skapa skalor
const x2 = d3.scaleBand().range([0, width2]).padding(0.1);
const y2 = d3.scaleLinear().range([height2, 0]);


// Hämta data från API
fetch(request2)
  .then(response => response.json())
  .then(dataSkogsSverige2 => {
    // Gruppera data efter år
    const groupedData = d3.group(dataSkogsSverige2.data, d => d.key[2]);
    
    const data = Array.from(groupedData, ([year, values]) => ({
      year: year,
      totalValue: d3.sum(values, v => parseFloat(v.values[0])),
      regions: values.map(v => ({
        region: customLabelsMap[v.key[0]] || v.key[0],
        value: parseFloat(v.values[0])
      }))
    }));

    // Sortera data efter år
    data.sort((a, b) => d3.ascending(a.year, b.year));

    // Sätt domäner för skalorna
    x2.domain(data.map(d => d.year));
    y2.domain([20000000, d3.max(data, d => d.totalValue)]);

    // Skapa staplar
    svg2.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x2(d.year))
      .attr("width", x2.bandwidth())
      .attr("y", d => y2(d.totalValue))
      .attr("height", d => height2 - y2(d.totalValue))
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip.style("display", "block")
               .style("left", (event.pageX + 10) + "px")
               .style("top", (event.pageY - 28) + "px");
        
               let tooltipContent = `<strong>${d.year}</strong><br>Total: ${formatMillions(d.totalValue)} hektar<br><br>`;
               d.regions.sort((a, b) => b.value - a.value);
               d.regions.forEach(region => {
                 const percentage = (region.value / d.totalValue * 100).toFixed(2);
                 tooltipContent += `${region.region}: ${formatMillions(region.value)} hektar (${percentage}%)<br>`;
               });
               
        
        tooltip.html(tooltipContent);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("display", "none");
      });

    // Lägg till x-axel
    svg2.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height2})`)
      .call(d3.axisBottom(x2))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Lägg till y-axel
    svg2.append("g")
  .attr("class", "y-axis")
  .call(d3.axisLeft(y2).tickFormat(formatMillions));


    // Lägg till zoom-funktionalitet
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

    svg2.call(zoom);

    function zoomed(event) {
      const newX = event.transform.rescaleX(x2);
      const newY = event.transform.rescaleY(y2);

      svg2.selectAll(".bar")
        .attr("x", d => newX(d.year))
        .attr("width", newX.bandwidth())
        .attr("y", d => newY(d.totalValue))
        .attr("height", d => height2 - newY(d.totalValue));

      svg2.select(".x-axis").call(d3.axisBottom(newX));
      svg2.select(".y-axis").call(d3.axisLeft(newY)
    
    );
    }
  });

  function formatMillions(value) {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + " miljoner";
    } else {
      return d3.format(",")(value);
    }
  }
  


// Uppdatera tooltip-stilen för bättre läsbarhet
d3.select(".bar-chart-2").append("div")
  .attr("id", "tooltip")
  .style("position", "absolute")
  .style("display", "none")
  .style("background-color", "white")
  .style("border", "1px solid #ddd")
  .style("padding", "10px")
  .style("max-height", "300px")
  .style("overflow-y", "auto");

