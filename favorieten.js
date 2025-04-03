document.addEventListener("DOMContentLoaded", () => {
    displayFavorites(); // Weergave van favorieten bij het laden van de pagina
});

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Haal de favorieten op uit localStorage
    const tableBody = document.getElementById("favoritesTable");

    if (!tableBody) {
        console.error("Tabel-body voor favorieten niet gevonden!"); // Foutmelding als de tabel-body niet gevonden wordt
        return;
    }

    tableBody.innerHTML = ''; // Reset de tabel

    // Als er geen favorieten zijn
    if (favorites.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6">Geen favorieten gevonden!</td></tr>`; // Toon melding als er geen favorieten zijn
        return;
    }

    // Voeg alle favorieten toe aan de tabel
    favorites.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.adres_nl || "Onbekend"}</td>
            <td>Drinkfontein</td>
            <td>${item.adres_nl || "Geen adres"}</td>
            <td>${item.code_postal || "Geen postcode"}</td>
            <td>${item.gemeente || "Geen gemeente"}</td>
            <td><button class="remove-btn" data-id="${item.adres_nl}">❌ Verwijderen</button></td>
        `;

        tableBody.appendChild(row);
    });

    // Voeg event listener toe aan de verwijderknoppen
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const locatie = event.target.dataset.id; // Verkrijg het id van de verwijderde locatie

            // Verkrijg de huidige lijst van favorieten
            let favorieten = JSON.parse(localStorage.getItem("favorites")) || [];

            // Verwijder het item uit de favorietenlijst
            const nieuweFavorieten = favorieten.filter(item => item.adres_nl !== locatie);

            // Werk de localStorage bij met de nieuwe lijst
            localStorage.setItem("favorites", JSON.stringify(nieuweFavorieten));

            // Roep displayFavorites opnieuw aan om de tabel bij te werken
            displayFavorites();
        });
    });
}

// ** Bij het laden van de pagina, check of donker thema is opgeslagen **
document.addEventListener("DOMContentLoaded", () => {
    const darkMode = localStorage.getItem('darkMode') === 'true'; // Haal de waarde op uit localStorage
    if (darkMode) {
        document.body.classList.add('dark-theme'); // Pas het donkere thema toe
    }
});
