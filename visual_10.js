// // Funktion för att generera diagramdata och storlek
// function generateChartData() {
//     return {
//         percentage: 78.29,
//         width: 300,
//         height: 300,
//         radius: 150
//     };
// }

// // Skapa ett diagram med D3
// function createPieChart() {
//     const { percentage, width, height, radius } = generateChartData();

//     // Beräkna vinkel för procentandelen
//     const angle = (percentage / 100) * 2 * Math.PI;

//     // Data för diagrammet
//     const data = [
//         { value: percentage, color: "#003300" }, // Grön del
//         { value: 100 - percentage, color: "#eafffe" } // Grå del
//     ];

//     // Skapa SVG-elementet
//     const svg = d3.select("div.visual_10")
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height+ 60)
//         .append("g")
//         .attr("transform", `translate(${width / 2}, ${height / 2 + 55})`);

//     // Skapa en arc-generator
//     const arc = d3.arc()
//         .innerRadius(0) // Gör det till en donut
//         .outerRadius(radius);

//     // Skapa en pie-generator
//     const pie = d3.pie()
//         .value(d => d.value)
//         .sort(null);

//     // Lägg till arcs till SVG
//     svg.selectAll("path")
//         .data(pie(data))
//         .enter()
//         .append("path")
//         .attr("d", arc)
//         .attr("fill", d => d.data.color);

//     // Lägg till procenttext i mitten av procentandelen
//     svg.selectAll("text")
//         .data(pie(data))
//         .enter()
//         .append("text")
//         .attr("transform", d => `translate(${arc.centroid(d)})`)
//         .attr("text-anchor", "middle")
//         .attr("dy", ".35em")
//         .style("font-size", "20px")
//         .style("fill", "#eafffe")
//         .text(d => d.data.value === percentage ? `${percentage.toFixed(2)}%` : '');

//             // Lägg till en label för hela diagrammet
//     d3.select("div.visual_10 svg")
//     .append("text")
//     .attr("x", width / 2)
//     .attr("y", 30)
//     .attr("text-anchor", "middle")
//     .style("font-size", "16px")
//     .style("fill", "#333")
//     .text("Bränslekostnader");
// }

// // Anropa funktionen för att skapa diagrammet
// createPieChart();

const dataCo2 = [
    { category: "Nuvarande", value: 117 * 900 * 3 },
    { category: "Ikorni", value: (117 * 900 - 22860) * 3 }
];

function createVerticalBarChart() {
    // Dimensioner och marginaler
    const margin = { top: 50, right: 30, bottom: 70, left: 60 };
    const width = 450 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

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
        .attr("height", d => height - y(d.value));

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

    // Lägg till värden ovanför staplarna
    svg.selectAll(".value-label")
        .data(dataCo2)
        .enter().append("text")
        .attr("class", "value-label")
        .attr("x", d => x(d.category) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) - 5)
        .attr("text-anchor", "middle")
        .text(d => d.value.toFixed(0) + " kg CO2");

    // Lägg till rubrik
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .attr("class", "visual_label")
        .text("Utsläpp av Co2 per timmerbil");
}

// Anropa funktionen för att skapa det stående stapeldiagrammet
createVerticalBarChart();
