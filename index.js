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
            allRecords = data.results;  // Opslaan van alle records voor later zoeken
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

    // Leeg de tabel voordat je nieuwe rijen toevoegt
    tableBody.innerHTML = '';

    records.forEach(item => {
        const row = document.createElement("tr");

        // Vul de tabel met de juiste gegevens uit de API response
        row.innerHTML = `
            <td>${item.adres_nl || "Onbekend"}</td>
            <td>Drinkfontein</td>
            <td>${item.adres_nl || "Geen adres"}</td>
            <td>${item.code_postal || "Geen postcode"}</td>
            <td>${item.gemeente || "Geen gemeente"}</td>
            <td>
                <button class="fav-btn" data-id="${item.adres_nl}">⭐</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Voeg event listener toe voor het zoeken
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    filterData(searchTerm);
});

// Filter de data op basis van zoekterm
function filterData(searchTerm) {
    const filteredRecords = allRecords.filter(item => {
        const matchesSearch = item.gemeente?.toLowerCase().includes(searchTerm) || false;
        return matchesSearch;
    });

    // Gegevens opnieuw weergeven in de tabel
    displayData(filteredRecords);
}

// Voeg event listener toe voor het wisselen van thema
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});
