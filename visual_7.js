// // Data
// const data = [
//     { person: "Intervju 1", fråga1: true, fråga2: true, fråga3: true, fråga4: true },
//     { person: "Intervju 2", fråga1: false, fråga2: false, fråga3: true, fråga4: true },
//     { person: "Intervju 3", fråga1: false, fråga2: true, fråga3: true, fråga4: true },
//     { person: "Intervju 4", fråga1: true, fråga2: true, fråga3: true, fråga4: true },
//     { person: "Intervju 5", fråga1: false, fråga2: true, fråga3: true, fråga4: true },
//     { person: "Intervju 6", fråga1: true, fråga2: true, fråga3: true, fråga4: true },
//     { person: "Intervju 7", fråga1: false, fråga2: true, fråga3: true, fråga4: true },
//     { person: "Intervju 8", fråga1: false, fråga2: false, fråga3: true, fråga4: true },
//     { person: "Intervju 9", fråga1: false, fråga2: true, fråga3: true, fråga4: true },
//     { person: "Intervju 10", fråga1: true, fråga2: true, fråga3: true, fråga4: true }
// ];

// // Funktion för att skapa tabellen
// function createTable(data) {
//     // Välj div med class visual_7
//     const container = d3.select(".visual_7");

//     // Skapa en tabell i div:en
//     const table = container.append("table").style("border-collapse", "collapse").style("margin", "20px auto");
//     const header = table.append("thead").append("tr");

//     // Kolumnnamn
//     const columns = ["Intervju", "Fråga 1", "Fråga 2", "Fråga 3", "Fråga 4"];
//     header.selectAll("th")
//         .data(columns)
//         .enter()
//         .append("th")
//         .text(d => d)
//         .style("padding", "8px")
//         .style("border", "1px solid #ddd")
//         .style("background-color", "#f4f4f4")
//         .style("text-align", "center");

//     // Data-rader
//     const tbody = table.append("tbody");
//     const rows = tbody.selectAll("tr")
//         .data(data)
//         .enter()
//         .append("tr");

//     // Skapa celler
//     rows.selectAll("td")
//         .data(row => [row.person, row.fråga1, row.fråga2, row.fråga3, row.fråga4])
//         .enter()
//         .append("td")
//         .text((d, i) => i === 0 ? d : "")
//         .attr("class", d => typeof d === "boolean" ? (d ? "true" : "false") : null)
//         .style("padding", "8px")
//         .style("border", "1px solid #ddd")
//         .style("text-align", "center")
//         .style("background-color", d => d === true ? "green" : d === false ? "white" : null)
//         .style("color", d => d === true ? "white" : "black");
// }

// // Kör funktionen
// createTable(data);

  // Define the data
  const data = [
    { category: 'Bränsleförbrukning', interview: 'Person 1', value: 2 },
    { category: 'Bränsleförbrukning', interview: 'Person 2', value:4 },
    { category: 'Bränsleförbrukning', interview: 'Person 3', value: 3 },
    { category: 'Bränsleförbrukning', interview: 'Person 4', value: 4},
    { category: 'Bränsleförbrukning', interview: 'Person 5', value: 4 },
    { category: 'Bränsleförbrukning', interview: 'Person 6', value: 4 },
    { category: 'Effektivitet', interview: 'Person 1', value: 1 },
    { category: 'Effektivitet', interview: 'Person 2', value: 2 },
    { category: 'Effektivitet', interview: 'Person 3', value: 3 },
    { category: 'Effektivitet', interview: 'Person 4', value: 2 },
    { category: 'Effektivitet', interview: 'Person 5', value: 1 },
    { category: 'Effektivitet', interview: 'Person 6', value: 1 },
    { category: 'Hållbart/miljö', interview: 'Person 1', value: 1 },
    { category: 'Hållbart/miljö', interview: 'Person 2', value: 4 },
    { category: 'Hållbart/miljö', interview: 'Person 3', value: 2 },
    { category: 'Hållbart/miljö', interview: 'Person 4', value: 3 },
    { category: 'Hållbart/miljö', interview: 'Person 5', value: 1 },
    { category: 'Hållbart/miljö', interview: 'Person 6', value: 2 },
    // { category: 'Förändring', interview: 'Person 1', value: 2 },
    // { category: 'Förändring', interview: 'Person 2', value: 2 },
    // { category: 'Förändring', interview: 'Person 3', value: 2 },
    // { category: 'Förändring', interview: 'Person 4', value: 2 },
    // { category: 'Förändring', interview: 'Person 5', value: 2 },
    // { category: 'Förändring', interview: 'Person 6', value: 2 },
    { category: 'Kostnad', interview: 'Person 1', value: 3 },
    { category: 'Kostnad', interview: 'Person 2', value: 3 },
    { category: 'Kostnad', interview: 'Person 3', value: 2 },
    { category: 'Kostnad', interview: 'Person 4', value: 3 },
    { category: 'Kostnad', interview: 'Person 5', value: 1 },
    { category: 'Kostnad', interview: 'Person 6', value: 4 },
    // { category: 'Innovation', interview: 'Person 1', value: 2 },
    // { category: 'Innovation', interview: 'Person 2', value: 2 },
    // { category: 'Innovation', interview: 'Person 3', value: 2 },
    // { category: 'Innovation', interview: 'Person 4', value: 2 },
    // { category: 'Innovation', interview: 'Person 5', value: 2 },
    // { category: 'Innovation', interview: 'Person 6', value: 2 },
    { category: 'Dagens metod', interview: 'Person 1', value: 3 },
    { category: 'Dagens metod', interview: 'Person 2', value: 2 },
    { category: 'Dagens metod', interview: 'Person 3', value: 2 },
    { category: 'Dagens metod', interview: 'Person 4', value: 1 },
    { category: 'Dagens metod', interview: 'Person 5', value: 1 },
    { category: 'Dagens metod', interview: 'Person 6', value: 2.5 },
   
    // Add more data for other categories and interviews
];

// Define margins and dimensions
const margin = { top: 50, right: 150, bottom: 50, left: 100 }; // Increased right margin for better legend spacing
const width = 700 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Create the SVG container
const svg = d3.select(".visual_7").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Add a title to the heatmap
svg.append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .attr("class", "visual_label")
    .text("Resultat från kvalitativa intervjuer om dagens mätning av timmer");

// Define scales
const xScale = d3.scaleBand()
    .domain(['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5', 'Person 6'])
    .range([0, width])
    .padding(0.05);

const yScale = d3.scaleBand()
    .domain(['Bränsleförbrukning', 'Effektivitet', 'Hållbart/miljö', 'Kostnad', 'Dagens metod',])
    .range([height, 0])
    .padding(0.05);

const colorScale = d3.scaleLinear()
    .domain([1, 5])
    .range(["#99cfab", "#003300"]);

// Create heatmap rectangles
svg.selectAll()
    .data(data, d => d.category + ':' + d.interview)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.interview))
    .attr("y", d => yScale(d.category))
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", d => colorScale(d.value));

     // Add figuretext 
     d3.select("div.visual_7").append("div")
     .attr("class", "figure-text")
     .style("text-align", "left")
     .style("margin-top", "20px")
     .text("Figur 7: Datan är fiktiv men är baserad på hur vi anser att målgruppen resonerar kring dessa frågor. Skalan visar graden av nöjdhet med dagens mätning av timmer. Mycket missnöjd till mycket nöjd.");

// Add axes
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale));

    const labels = ["Mycket missnöjd", "Missnöjd", "Neutral", "Nöjd", "Mycket nöjd"];

    const legendWidth = 20;
    const legendHeight = 200;
    
    // Create the legend group
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width + 20}, ${(height - legendHeight) / 2})`);
    
    // Add legend rectangles
    legend.selectAll("rect")
        .data(labels)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * (legendHeight / 5) + 1) // Adjust vertical position to make rectangles closer
        .attr("width", legendWidth)
        .attr("height", (legendHeight / 5) - 2) // Adjust height to make rectangles closer
        .attr("rx", 5)
        .attr("ry", 5)
        .style("fill", (d, i) => colorScale(i + 1)); // Use index to get the correct color
    
    // Add text labels for each legend scale
    legend.selectAll("text")
        .data(labels)
        .enter()
        .append("text")
        .attr("x", legendWidth + 5) // Position text to the right of the rectangles
        .attr("y", (d, i) => i * (legendHeight / 5) + (legendHeight / 10)) // Adjust vertical alignment
        .attr("dy", "0.35em") // Adjust vertical alignment
        .style("font-size", "12px")
        .style("text-anchor", "start")
        .text(d => d); // Only display the descriptive text
    
    // Add legend axis
    legend.append("g")
        .attr("transform", `translate(${legendWidth}, 0)`)
        .call(legendAxis)
        .selectAll("path, line")
        .style("display", "none"); // Hide axis lines

               