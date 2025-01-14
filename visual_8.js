// Data
const chartData = [
    { method: "Dagens mätning", vändor: 900 },
    { method: "Ikorni", vändor: 720 }
];

// Funktion för att skapa diagrammet
function createChart() {
    // Funktion för att hämta dimensioner och marginaler
    function getDimensions() {
        const margin = { top: 50, right: 20, bottom: 30, left: 40 };
        const width = 400 - margin.left - margin.right;
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
        .attr("height", d => height - y(d.vändor));

    // Lägg till x-axel
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Lägg till y-axel
    svg.append("g")
        .call(d3.axisLeft(y));

        svg.append("text")
.attr("x", width / 2)
.attr("y", -20)
.attr("text-anchor", "middle")
.attr("class", "chart-title")
.text("Antal timmervändor per år och timmerbil");

}

// Anropa funktionen för att skapa diagrammet
createChart();