// Data
const data = [
    { person: "Intervju 1", fråga1: true, fråga2: true, fråga3: true, fråga4: true },
    { person: "Intervju 2", fråga1: false, fråga2: false, fråga3: true, fråga4: true },
    { person: "Intervju 3", fråga1: false, fråga2: true, fråga3: true, fråga4: true },
    { person: "Intervju 4", fråga1: true, fråga2: true, fråga3: true, fråga4: true },
    { person: "Intervju 5", fråga1: false, fråga2: true, fråga3: true, fråga4: true },
    { person: "Intervju 6", fråga1: true, fråga2: true, fråga3: true, fråga4: true },
    { person: "Intervju 7", fråga1: false, fråga2: true, fråga3: true, fråga4: true },
    { person: "Intervju 8", fråga1: false, fråga2: false, fråga3: true, fråga4: true },
    { person: "Intervju 9", fråga1: false, fråga2: true, fråga3: true, fråga4: true },
    { person: "Intervju 10", fråga1: true, fråga2: true, fråga3: true, fråga4: true }
];

// Funktion för att skapa tabellen
function createTable(data) {
    // Välj div med class visual_7
    const container = d3.select(".visual_7");

    // Skapa en tabell i div:en
    const table = container.append("table").style("border-collapse", "collapse").style("margin", "20px auto");
    const header = table.append("thead").append("tr");

    // Kolumnnamn
    const columns = ["Intervju", "Fråga 1", "Fråga 2", "Fråga 3", "Fråga 4"];
    header.selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(d => d)
        .style("padding", "8px")
        .style("border", "1px solid #ddd")
        .style("background-color", "#f4f4f4")
        .style("text-align", "center");

    // Data-rader
    const tbody = table.append("tbody");
    const rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // Skapa celler
    rows.selectAll("td")
        .data(row => [row.person, row.fråga1, row.fråga2, row.fråga3, row.fråga4])
        .enter()
        .append("td")
        .text((d, i) => i === 0 ? d : "")
        .attr("class", d => typeof d === "boolean" ? (d ? "true" : "false") : null)
        .style("padding", "8px")
        .style("border", "1px solid #ddd")
        .style("text-align", "center")
        .style("background-color", d => d === true ? "green" : d === false ? "white" : null)
        .style("color", d => d === true ? "white" : "black");
}

// Kör funktionen
createTable(data);

