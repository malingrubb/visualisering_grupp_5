const dataDiesel = [
    { category: "Nuvarande förbrukning", value: 117 * 900 },
    { category: "Förbrukning med Ikorni", value: 117 * 900 - 22860 }
];

function createHorizontalBarChart() {
    // Dimensioner och marginaler
    const margin = { top: 50, right: 70, bottom: 30, left: 130 };
    const width = 800 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Skapa SVG-element
    const svg = d3.select("div.visual_9").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Skapa skalor
    const y = d3.scaleBand()
        .domain(dataDiesel.map(d => d.category))
        .range([0, height])
        .padding(0.1);

    const x = d3.scaleLinear()
        .domain([0, d3.max(dataDiesel, d => d.value)])
        .nice()
        .range([0, width]);

    // Skapa staplar
    svg.selectAll(".bar")
        .data(dataDiesel)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", d => y(d.category))
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", d => x(d.value));

    // Lägg till y-axel (kategorier)
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .attr("class", "axis-label");

    // Lägg till x-axel (värden)
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Lägg till värden i slutet av staplarna
    svg.selectAll(".value-label")
        .data(dataDiesel)
        .enter().append("text")
        .attr("class", "visual_label--2")
        .attr("x", d => x(d.value) + 5)
        .attr("y", d => y(d.category) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => d.value.toFixed(0) + " liter");

        // Lägg till rubrik
svg.append("text")
.attr("x", width / 2)
.attr("y", -20)
.attr("text-anchor", "middle")
.attr("class", "visual_label")
.text("Dieselförbrukning per år och timmerbil");
}

// Anropa funktionen för att skapa det liggande stapeldiagrammet
createHorizontalBarChart();
