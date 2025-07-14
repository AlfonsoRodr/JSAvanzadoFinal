/**
 * Displays a message in the html informing of the ocurred error.
 * @returns {VoidFunction}
 */
function displayErrorMessage() {
    document.body.innerHTML = "<h2>No se encontró la noticia </h2>";
}

/**
 * Retrieves the selected news ID from local storage.
 *
 * @returns {string|null} The ID of the selected news item, or null if not set.
 */
function getStoredId() {
    return localStorage.getItem("selectedNewsId");
}

/**
 * Obtain the id of the new previously stored, and show its respective data in the html.
 * @returns {VoidFunction}
 */
function showNews() {
    const storedId = getStoredId();

    if (!storedId) {
        displayErrorMessage();
    }
    else {
        fetch("../news.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("There is an error trying to load de json file");
            }
            return response.json();
        })
        .then(jsonContent => {
            const selectedNew = jsonContent.find(newsItem => newsItem.id == storedId);
            if (!selectedNew) {
                displayErrorMessage();
            }
            else {
                document.getElementById("news-title").innerText = selectedNew.title;
                document.getElementById("news-content").innerText = selectedNew.content;
                document.getElementById("news-content").innerHTML = selectedNew.content.replace(/\n/g, "<br><br>"); 
                if (selectedNew.image) {
                    document.getElementById("news-image").src = selectedNew.image;
                }
                const currentIndex = jsonContent.findIndex(news => news.id == storedId);
                verifyPreviousButtonAction(jsonContent, currentIndex);
                verifyNextButtonVisibility(jsonContent, currentIndex);
            }
        });
    }
}

/**
 * Loads the previous news item based on the selected news ID stored in localStorage.
 * @returns {VoidFunction}
 */
function previousNew() {
    const storedId = getStoredId();
    if (!storedId) {
        displayErrorMessage();
    }
    else {
        fetch("../news.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("There is an error trying to load de json file");
            }
            return response.json();
        })
        .then(jsonContent => {
            const currentIndex = jsonContent.findIndex(news => news.id == storedId);
            const previousNew = jsonContent[currentIndex - 1];
            localStorage.setItem("selectedNewsId", previousNew.id);
            location.reload();
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    }
}

/**
 * Loads the next news item based on the selected news ID stored in localStorage.
 * @returns {VoidFunction}
 */
function nextNews() {
    const storedId = getStoredId();
    if (!storedId) {
        displayErrorMessage();
    }
    else {
        fetch("../news.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("There is an error trying to load de json file");
            }
            return response.json();
        })
        .then(jsonContent => {
            const currentIndex = jsonContent.findIndex(news => news.id == storedId);
            if ((currentIndex === -1) || (currentIndex + 1 >= jsonContent.length)) {
                displayErrorMessage();
            }
            else {
                const followingNew = jsonContent[currentIndex + 1];
                localStorage.setItem("selectedNewsId", followingNew.id);
                location.reload();
            }
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    }
}

/**
 * Updates the behavior and appearance of the "back" button based on the current news index.
 * If a previous news item exists, sets the button to navigate to it and reloads the page.
 * Otherwise, changes the button to return to the main menu.
 *
 * @param {Array<Object>} jsonContent - Array of news objects.
 * @param {number} currentIndex - The index of the currently selected news item.
 * 
 * @returns {VoidFunction}
 */
function verifyPreviousButtonAction(jsonContent, currentIndex) {
    const previuosNew = jsonContent[currentIndex - 1];
    const previousButton = document.getElementById("back-button");
    if (previuosNew) {
        previousButton.style.display = "inline-block";
        previousButton.href = "#";
        previousButton.onclick = function (e) {
            e.preventDefault();
            localStorage.setItem("selectedNewsId", previuosNew.id);
            location.reload();
            window.scrollTo(0,0);
        };
    }
    else {
        previousButton.innerText = "Volver al Menú";
        previousButton.href = "../index.html";
    }
}

/**
 * Updates the visibility and behavior of the "next" button based on the current news index.
 *
 * If there is a next news item in the provided JSON content, the button is displayed.
 * Otherwise, the button is hidden.
 *
 * @param {Array<Object>} jsonContent - Array of news items.
 * @param {number} currentIndex - The index of the currently selected news item.
 */
function verifyNextButtonVisibility(jsonContent, currentIndex) {
    const followingNew = jsonContent[currentIndex + 1];
    const nextButton = document.getElementById("next-button");
    if (followingNew) {
        nextButton.style.display = "inline-block";
        nextButton.href = "#";
        nextButton.onclick = function (e) {
            e.preventDefault();
            localStorage.setItem("selectedNewsId", followingNew.id);
            location.reload();
            window.scrollTo(0,0);
        };
    }
    else {
        nextButton.style.display = "none";
        nextButton.onclick = null;
    }
}

window.addEventListener("DOMContentLoaded", showNews);