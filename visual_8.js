// Data
const chartData = [
    { method: "Dagens mätning", vändor: 900, color: "#99cfab" },
    { method: "Ikorni", vändor: 720, color: "#003300" }
];

// Funktion för att skapa diagrammet
function createChart() {
    // Funktion för att hämta dimensioner och marginaler
    function getDimensions() {
        const margin = { top: 50, right: 20, bottom: 30, left: 60 };
        const width = 450 - margin.left - margin.right;
        const height = 550 - margin.top - margin.bottom;
        return { margin, width, height };
    }

    const { margin, width, height } = getDimensions();

    // Skapa SVG-element
    const svg = d3.select("div.visual_8").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Skapa skalor
    const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .range([height, 0]);

// Sätt domäner
x.domain(chartData.map(d => d.method));
y.domain([0, d3.max(chartData, d => d.vändor)]);

// Skapa staplar
svg.selectAll(".bar")
    .data(chartData)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.method))
    .attr("width", x.bandwidth())
    .attr("y", d => y(d.vändor))
    .attr("height", d => height - y(d.vändor))
    .attr("fill", d => d.color); // Use the color property

// Lägg till x-axel
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

// Lägg till y-axel
svg.append("g")
    .call(d3.axisLeft(y));

    // Lägg till y-axel titel
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("class", "visual_label--2")
        .text("Antal vändor (st)");


svg.append("text")
.attr("x", (width / 2))
.attr("y", 0 - (margin.top / 2))
.attr("text-anchor", "middle")
.attr("class", "visual_label")
.text("Antal timmervändor per år och timmerbil");

   // Add figuretext 
   d3.select("div.visual_8").append("div")
   .attr("class", "figure-text")
   .style("text-align", "left")
   .style("margin-top", "20px")
   .text("Figur 4: Antalet timmervändor per år i genomsnitt per timmerbil i Sverige. En jämförelse mellan dagens mätningsmetod och den nya mätmetoden Ikorni. Datan är baserad på statistik från Svepreg AB." );

}

// Anropa funktionen för att skapa diagrammet
createChart();