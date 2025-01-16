const dataCo2 = [
    { category: "Nuvarande", value: (117 * 900 * 3) / 1000 , color: "#99cfab" },
    { category: "Ikorni", value: ((117 * 900 - 22860) * 3) / 1000, color: "#003300" }
];

function createVerticalBarChart() {
    // Dimensioner och marginaler
    const margin = { top: 50, right: 30, bottom: 70, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Skapa SVG-element
    const svg = d3.select("div.visual_10").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Skapa skalor
    const x = d3.scaleBand()
        .domain(dataCo2.map(d => d.category))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(dataCo2, d => d.value)])
        .nice()
        .range([height, 0]);

    // Skapa staplar
    svg.selectAll(".bar")
        .data(dataCo2)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.category))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.value))
        .attr("height", d => height - y(d.value))
        .attr("fill", d => d.color); 

    // Lägg till x-axel (kategorier)
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        // .attr("transform", "rotate(-45)")
        .style("text-anchor", "middle");

    // Lägg till y-axel (värden)
    svg.append("g")
        .call(d3.axisLeft(y));

        // Lägg till y-axel titel
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .attr("class", "visual_label--2")
    .text("Utsläpp (ton)");

    // Lägg till värden ovanför staplarna
    svg.selectAll(".value-label")
        .data(dataCo2)
        .enter().append("text")
        .attr("class", "visual_label--2")
        .attr("x", d => x(d.category) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) - 5)
        .attr("text-anchor", "middle")
        .text(d => d.value.toFixed(2) + " ton Co2");

    // Lägg till rubrik
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .attr("class", "visual_label")
        .text("Utsläpp av Co2 per timmerbil/år");

    // Add figuretext 
    d3.select("div.visual_10").append("div")
        .attr("class", "figure-text")
        .style("text-align", "left")
        .style("margin-top", "20px")
        .text("Figur 6: Utsläpp av Co2 per timmerbil i genomsnitt per år. Nuvarande utsläpp jämfört med utsläpp vid användning av Ikorni. Källa: Uträknad med data från Svepreg AB");
}

// Anropa funktionen för att skapa det stående stapeldiagrammet
createVerticalBarChart();