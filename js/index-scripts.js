/**
 * Obtains the list of news.
 * @returns {HTMLElement|null} the list of news.
 */
function getNewsList() {
    return document.getElementById("news-list");
}

/**
 * Reads from the .json document, and load this data into the html.
 * @returns {void}
 */
function loadNews() {
    fetch("../news.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("There is an error trying to load de json file");
        }
        return response.json();
    })
    .then(jsonContent => {
        const newsList = getNewsList();
        newsList.innerHTML = '';
        for (let news of jsonContent) {
            const newElement = document.createElement("div");
            newElement.setAttribute("data-id", news.id);
            newElement.setAttribute("onclick", "storeNewsID(this)");
            newElement.innerHTML = `<h3>${news.title}</h3><p>${news.preview}</p>`;
            newsList.appendChild(newElement);
        }
    })
    .catch(error => {
        console.error("Error loading the news: ", error);
        const newsList = getNewsList();
        newsList.innerHTML = "<p> Error al cargar las noticias </p>";
    });
}

/**
 * Stores in localStorage the id of the news that have been clicked.
 * @param {HTMLElement} element - The HTML element that was clicked.
 * 
 * @returns {void}
 */
function storeNewsID(element) {
    const selectedId = element.getAttribute("data-id");
    localStorage.setItem("selectedNewsId", selectedId);
    window.open("../views/noticia.html", "_blank");
}

window.addEventListener("DOMContentLoaded", loadNews);