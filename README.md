Brussels Explorer

Projectbeschrijving en Functionaliteiten

Brussels Explorer is een interactieve webapplicatie waarmee gebruikers drinkfonteinen in Brussel kunnen ontdekken. De applicatie biedt de mogelijkheid om drinkfonteinen te zoeken, hun locatie te bekijken op een interactieve kaart, en de locaties als favorieten op te slaan voor later gebruik. Gebruikers kunnen ook hun favorieten beheren door items toe te voegen of te verwijderen.
 
Hoofdfuncties:
Zoekfunctie: Gebruikers kunnen zoeken op locatie, postcode of gemeente om specifieke drinkfonteinen te vinden.
Interactieve Kaart: Een kaart wordt weergegeven met de locaties van de drinkfonteinen.
Favorieten: Gebruikers kunnen locaties toevoegen aan hun favorietenlijst en deze beheren (verwijderen) via de "Favorieten"-pagina.
Donker Thema: Gebruikers kunnen schakelen tussen een licht en donker thema voor een betere gebruikerservaring.
Sorteren: Gebruikers kunnen de lijst van drinkfonteinen sorteren op naam, postcode, en gemeente.
 
Gebruikte API's
De gegevens over drinkfonteinen worden opgehaald uit de open API van de stad Brussel via OpenDataSoft:
API URL: https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/fontaines-d-eau-potable-gerees-par-la-ville-de-bruxelles/records?limit=20
Deze API levert gegevens over de verschillende drinkfonteinen in Brussel, zoals hun adres, postcode en gemeente.
 
 
 
Technische Vereisten
1. DOM Manipulatie
Elementen selecteren: In index.js wordt de document.querySelector() methode gebruikt om de benodigde elementen te selecteren, zoals knoppen en invoervelden.

Elementen manipuleren: In index.js worden geselecteerde elementen aangepast, zoals het wijzigen van de tekst op knoppen en het toevoegen van of verwijderen van klassen (bijv. voor themewisseling).

Events aan elementen koppelen: Er wordt gebruik gemaakt van de addEventListener() methode om gebruikersinteracties te verwerken, bijvoorbeeld voor de zoekfunctionaliteit en de themewisseling.

2. Modern JavaScript
Gebruik van constanten: In index.js worden constanten zoals API_URL gebruikt voor API-eindpunten.

Template literals: Er wordt gebruik gemaakt van template literals in index.js om dynamische URL’s samen te stellen voor het ophalen van gegevens.

Iteratie over arrays: In index.js wordt de .forEach() methode gebruikt om over de data van de API te itereren en elke drinkfontein weer te geven in de lijst.

Array methodes: De .filter() en .map() methoden worden gebruikt voor het filteren en aanpassen van de gegevens voordat ze op de pagina worden weergegeven.

Arrow functions: Arrow functions worden gebruikt om functies beknopt te definiëren, bijvoorbeeld in de event handlers.

Conditional (ternary) operator: In index.js wordt de ternary operator gebruikt om de themewisseling dynamisch in te stellen.

Callback functions: Callback functies worden gebruikt om de asynchrone fetch-aanroepen te verwerken, zoals het tonen van de data nadat deze is opgehaald.

Promises: De fetch-aanroep maakt gebruik van promises om de gegevens op te halen van de API.

Async & Await: In index.js wordt async/await gebruikt om de fetch-aanroep te verwerken, waardoor de code overzichtelijker wordt en gemakkelijker te debuggen is.

Observer API: De Observer API wordt geïmplementeerd om gebruikersvoorkeuren zoals het thematype (licht of donker) te volgen en automatisch toe te passen.

3. Data & API
Fetch om data op te halen: De gegevens worden opgehaald via de fetch-methode in index.js naar de OpenDataSoft API.

JSON manipuleren en weergeven: De opgehaalde gegevens worden omgezet in JSON-formaat en weergegeven in de webapplicatie, zoals de lijst van drinkfonteinen.

4. Opslag & Validatie
Formulier validatie: Er wordt basisformuliervalidatie toegepast om ervoor te zorgen dat zoekvelden correct worden ingevuld.

Gebruik van LocalStorage: De favorieten van de gebruiker worden opgeslagen in de localStorage van de browser, zodat ze ook na het herladen van de pagina beschikbaar blijven.

5. Styling & Layout
Basis HTML layout: De pagina gebruikt een flexbox-layout voor de weergave van de tabel en de kaart.

Basis CSS: De styling wordt verzorgd met basis CSS, waarbij kleuren, marges, padding en lettertypes worden aangepast om de pagina visueel aantrekkelijk te maken.

Gebruiksvriendelijke elementen: De interface bevat gebruiksvriendelijke elementen zoals de zoekbalk, buttons voor het toevoegen/verwijderen van favorieten, en interactieve icoontjes voor de themewisseling.
 
 
 
Screenshots van de Applicatie
Startpagina:
Favorietenpagina:
Gebruikte Bronnen
API: Fontaines d'eau potable - OpenDataSoft
AI Assistent: ChatGPT.
 
Taakverdeling binnen het Team
Sandro: Verantwoordelijk voor het ophalen van gegevens uit de API, implementatie van de zoekfunctie, en het toevoegen van de functionaliteit voor favorieten (index.js en favorieten.js).
Gillian: Verantwoordelijk voor de styling van de webpagina’s, inclusief het implementeren van een responsief ontwerp (index.css) en
voor de integratie van de interactieve kaart, en het ontwikkelen van de themewisselfunctie (index.js).
