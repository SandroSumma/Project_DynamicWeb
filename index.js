document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

// Haal data op van de API
async function fetchData() {
    try {
        const response = await fetch(
            "https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/fontaines-d-eau-potable-gerees-par-la-ville-de-bruxelles/records?limit=20"
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Opgehaalde data:", data); // Debugging: check de data in console

        if (data.results && data.results.length > 0) {
            displayData(data.results);
        } else {
            console.warn("Geen records gevonden in de API-response!");
        }
    } catch (error) {
        console.error("Fout bij ophalen van data:", error);
    }
}

// Toon data in de tabel
function displayData(records) {
    const tableBody = document.getElementById("locationsTable");

    if (!tableBody) {
        console.error("Tabel-body niet gevonden! Controleer of de ID correct is.");
        return;
    }


    records.forEach(item => {
        const row = document.createElement("tr");

        // Vul de tabel met de juiste gegevens uit de API response
        row.innerHTML = `
            <td>${item.adres_nl || "Onbekend"}</td>
            <td>Drinkfontein</td>
            <td>${item.adres_nl || "Geen adres"}</td>
            <td>-</td>
            <td>${item.coordonnees_geographiques ? `Lat: ${item.coordonnees_geographiques.lat}, Lon: ${item.coordonnees_geographiques.lon}` : "Geen coördinaten"}</td>
            <td>
                <button class="fav-btn" data-id="${item.adres_nl}">⭐</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

}

// Voeg event listener toe voor het wisselen van thema
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});
