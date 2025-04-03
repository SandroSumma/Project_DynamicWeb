document.addEventListener("DOMContentLoaded", () => {
    displayFavorites();
});

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const tableBody = document.getElementById("favoritesTable");

    if (!tableBody) {
        console.error("Tabel-body voor favorieten niet gevonden!");
        return;
    }

    tableBody.innerHTML = ''; // Tabel resetten

    // Als er geen favorieten zijn
    if (favorites.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6">Geen favorieten gevonden!</td></tr>`;
        return;
    }

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

    // Verwijderknop activeren
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const locatie = event.target.dataset.id;

            // Verkrijg de huidige lijst van favorieten
            let favorieten = JSON.parse(localStorage.getItem("favorites")) || [];

            // Verwijder het item uit de favorietenlijst
            const nieuweFavorieten = favorieten.filter(item => item.adres_nl !== locatie);

            // Werk de localStorage bij met de nieuwe lijst
            localStorage.setItem("favorites", JSON.stringify(nieuweFavorieten));

            // Werk de weergave bij
            displayFavorites();  // Roep displayFavorites opnieuw aan om de tabel bij te werken
        });
    });
}
