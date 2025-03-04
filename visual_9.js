const dataDiesel = [
    { category: "Nuvarande förbrukning", value: 117 * 900, color: "#99cfab" },
    { category: "Förbrukning med Ikorni", value: 117 * 900 - 22860, color: "#003300" }
];

function createHorizontalBarChart() {
    // Dimensioner och marginaler
    const margin = { top: 40, right: 70, bottom: 30, left: 130 };
    const width = 800 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

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
        .attr("width", d => x(d.value))
        .attr("fill", d => d.color); // Use the color property

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

           // Add figuretext 
     d3.select("div.visual_9").append("div")
     .attr("class", "figure-text")
     .style("text-align", "left")
     .style("margin-top", "20px")
     .text("Figur 5: Medelvärde på dieselförbrukning per år och timmerbil. Detta är baserat på data från Svepreg AB och är en ungefärlig uppskattning av genomsnittet.");

}

// Anropa funktionen för att skapa det liggande stapeldiagrammet
createHorizontalBarChart();
