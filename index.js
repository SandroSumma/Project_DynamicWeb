document.addEventListener("DOMContentLoaded", () => {
    fetchData(); // Haal de data op zodra de pagina geladen is
});

let allRecords = []; // Bewaar de originele records voor sorteren
let currentSort = { column: null, ascending: true }; // Houd de sorteervolgorde bij

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
        console.log("Opgehaalde data:", data); // Debugging

        if (data.results && data.results.length > 0) {
            allRecords = data.results;
            displayData(allRecords); // Toon de data in de tabel
        } else {
            console.warn("Geen records gevonden in de API-response!");
        }
    } catch (error) {
        console.error("Fout bij ophalen van data:", error); // Error handling
    }
}

// Toon data in de tabel
function displayData(records) {
    const tableBody = document.getElementById("locationsTable");

    if (!tableBody) {
        console.error("Tabel-body niet gevonden!");
        return;
    }

    tableBody.innerHTML = ''; // Reset de tabel

    records.forEach(item => {
        const row = document.createElement("tr");

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

        tableBody.appendChild(row); // Voeg de rij toe aan de tabel
    });

    // Voeg event listeners toe aan favorietenknoppen
    document.querySelectorAll(".fav-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const locatie = event.target.dataset.id;
            let favorieten = JSON.parse(localStorage.getItem("favorites")) || [];

            if (!favorieten.some(item => item.adres_nl === locatie)) {
                const locatieObject = records.find(item => item.adres_nl === locatie);
                if (locatieObject) {
                    favorieten.push(locatieObject); // Voeg object toe aan favorieten
                    localStorage.setItem("favorites", JSON.stringify(favorieten));
                    alert("Toegevoegd aan favorieten!");
                }
            } else {
                alert("Deze locatie staat al in je favorieten!"); // Indien al favoriet
            }
        });
    });
}

// Voeg event listeners toe aan zoekknop en inputveld
document.getElementById('searchBtn').addEventListener('click', () => {
    filterData(document.getElementById('search').value.toLowerCase());
});

document.getElementById('search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        filterData(event.target.value.toLowerCase());
    }
});

// Filter functie
function filterData(searchTerm) {
    const filteredRecords = allRecords.filter(item => 
        (item.adres_nl?.toLowerCase().includes(searchTerm) || false) ||
        (item.code_postal?.toLowerCase().includes(searchTerm) || false) ||
        (item.gemeente?.toLowerCase().includes(searchTerm) || false) ||
        (item.adresse_fr?.toLowerCase().includes(searchTerm) || false)
    );

    displayData(filteredRecords); // Toon gefilterde data
}

// ** Sorteerfunctie ** 
document.querySelectorAll("th").forEach((th, index) => {
    th.addEventListener("click", () => sortTable(index)); // Voeg sorteerfunctie toe aan headers
});

function sortTable(columnIndex) {
    const keyMap = ["adres_nl", null, "adres_nl", "code_postal", "gemeente", null]; // Kolommen voor sorteren
    const key = keyMap[columnIndex];

    if (!key) return; // Geen sortering als geen relevante key

    currentSort.ascending = currentSort.column === columnIndex ? !currentSort.ascending : true;
    currentSort.column = columnIndex;

    allRecords.sort((a, b) => {
        let valA = a[key] || "";
        let valB = b[key] || "";

        if (!isNaN(valA) && !isNaN(valB)) {
            valA = Number(valA);
            valB = Number(valB);
        }

        return currentSort.ascending ? valA > valB ? 1 : -1 : valA < valB ? 1 : -1;
    });

    updateTableHeaders(columnIndex); // Update de sorteerpijlen
    displayData(allRecords); // Toon gesorteerde data
}

// ** Update sorteerpijlen in de headers **
function updateTableHeaders(sortedIndex) {
    document.querySelectorAll("th").forEach((th, index) => {
        if (index === sortedIndex) {
            th.innerHTML = th.innerText.replace(/ ▲| ▼/g, '') + (currentSort.ascending ? " ▲" : " ▼");
        } else {
            th.innerHTML = th.innerText.replace(/ ▲| ▼/g, '');
        }
    });
}

// ** Thema wisselen met persistentie **
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme'); // Toggle de dark-theme class

    const isDarkMode = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkMode', isDarkMode); // Sla het thema op in localStorage
});

// ** Bij het laden van de pagina, check of donker thema is opgeslagen **
document.addEventListener("DOMContentLoaded", () => {
    const darkMode = localStorage.getItem('darkMode') === 'true'; // Haal waarde uit localStorage
    if (darkMode) {
        document.body.classList.add('dark-theme'); // Pas donker thema toe
    }
});

// ** Favorietenpagina openen **
document.getElementById("viewFavorites").addEventListener("click", () => {
    window.location.href = "favorieten.html"; // Navigeer naar favorieten pagina
});
