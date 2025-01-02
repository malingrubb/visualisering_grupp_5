// Visual_1

function colorSwedenMap(containerId, forestHeightRatio, legendData) {
  d3.xml("./svg/sweden.svg").then(svg => {
    const svgNode = svg.documentElement;
    const container = d3.select(containerId);

    if (container.empty()) {
      console.error(`Container ${containerId} not found`);
      return;
    }

    container.node().append(svgNode);

    const svgHeight = 1052.3622; // Höjden på SVG:n
    const forestHeight = svgHeight * forestHeightRatio;
    const otherHeight = svgHeight - forestHeight;

    // Skapa en gradient
    const defs = d3.select(svgNode).append("defs");

    const gradient = defs.append("linearGradient")
      .attr("id", `gradient-${containerId}`)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", `${forestHeight / svgHeight * 100}%`)
      .attr("stop-color", "#99cfab"); // Färg för 32% av höjden

    gradient.append("stop")
      .attr("offset", `${forestHeight / svgHeight * 100}%`)
      .attr("stop-color", "#003300"); // Färg för 68% av höjden

    d3.select(svgNode).selectAll("path")
      .attr("fill", `url(#gradient-${containerId})`);

    createLegend(containerId, legendData);
  });
}

function createLegend(containerId, legendData) {
  const container = d3.select(containerId).append("div").attr("class", "legend");

  legendData.forEach(d => {
    const legendItem = container.append("div").attr("class", "legend-item");
    legendItem.append("span")
      .attr("class", "legend-color")
      .style("background-color", d.color);
    legendItem.append("span")
      .attr("class", "legend-text")
      .text(d.name);
  });
}

// Define legend data for each map
const legendData1 = [
  { name: "Skogsmark", color: "#003300" },
  { name: "Övrig mark", color: "#99cfab" }
];

const legendData2 = [
  { name: "Produktiv skog", color: "#003300" },
  { name: "Övrig mark", color: "#99cfab" }
];

const legendData3 = [
  { name: "Oproduktiv skog", color: "#003300" },
  { name: "Övrig mark", color: "#99cfab" }
];


// Create three maps with different forest height ratios
colorSwedenMap(".map1", 0.32, legendData1); // Original ratio
colorSwedenMap(".map2", 0.42, legendData2); // 50% forest height
colorSwedenMap(".map3", 0.89, legendData3); // 70% forest height