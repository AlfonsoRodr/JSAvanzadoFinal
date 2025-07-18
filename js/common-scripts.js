/**
 * Highlights the current navigation link by adding the "current-page" class.
 * Treats both "/index.html" and "/" as equivalent paths.
 *
 * @returns {void}
 */
function changePage() {
  const currentPath = normalizePath(window.location.pathname);

  const navLinks = document.getElementsByClassName("option");

  for (let link of navLinks) {
    const linkPath = normalizePath(new URL(link.href).pathname);

    if (currentPath === linkPath) {
      link.classList.add("current-page");
    } else {
      link.classList.remove("current-page");
    }
  }
}

/**
 * Normalizes paths:
 * - Removes trailing slashes
 * - Converts "/index.html" to "/"
 * - Makes lowercase for consistency
 *
 * @param {string} path
 * @returns {string}
 */
function normalizePath(path) {
  path = path.toLowerCase().replace(/\/+$/, "");

  if (path.endsWith("/index.html")) {
    path = path.replace(/\/index\.html$/, "");
  }
  return path;
}

window.addEventListener("DOMContentLoaded", changePage);