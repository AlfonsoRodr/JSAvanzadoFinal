/**
 * Obtain the id of the new previously stored, and show its respective data in the html.
 */
function showNews() {
    const storedId = localStorage.getItem("selectedNewsId");

    if (!storedId) {
        document.body.innerHTML = "<h2>No se encontró la noticia </h2>";
    }
    else {
        fetch("news.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("");
            }
            return response.json();
        })
        .then(jsonContent => {
            const selectedNew = jsonContent.find(newsItem => newsItem.id == storedId);
            if (!selectedNew) {
                document.body.innerHTML = "<h2>No se encontró la noticia </h2>";   
            }
            else {
                document.getElementById("news-title").innerText = selectedNew.title;
                document.getElementById("news-content").innerText = selectedNew.content;
                if (selectedNew.image) {
                    document.getElementById("news-image").src = selectedNew.image;
                }
            }
        });
    }
}

window.addEventListener("DOMContentLoaded", showNews);