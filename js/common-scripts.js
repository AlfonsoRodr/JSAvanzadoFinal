/**
 * Adds the class "current-page" to the html in which the user is currently in. 
 * This way, the user will know in which page he is.
 * 
 * @returns {void}
 */
function changePage() {
    const currentPath = window.location.pathname;;
    const navLinks = document.getElementsByClassName("option");

    for (let link of navLinks) {
        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath) {
            link.classList.add("current-page");
        }
        else {
            link.classList.remove("current-page");
        }
    }
}
window.addEventListener("DOMContentLoaded", changePage);