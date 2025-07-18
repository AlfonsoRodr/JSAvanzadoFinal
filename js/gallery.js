/**
 * Dynamically loads a set of images into the gallery container when the page loads.
 * 
 * @return {void}
 */
function loadImages() {
    const gallery = document.getElementById("gallery");
    const images = [
    { src: "../images/Galeria/GuanteRawlings.png", alt: "Imagen 1" },
    { src: "../images/Galeria/BatesMarucci.png", alt: "Imagen 2" },
    { src: "../images/Galeria/GuanteMizuno.png", alt: "Imagen 3" },
    { src: "../images/Galeria/GuantinesMizuno.png", alt: "Imagen 4" },
    { src: "../images/Galeria/Catcher.png", alt: "Imagen 5" },
    { src: "../images/Galeria/Mascota.png", alt: "Imagen 6" },
  ];

  images.forEach(({ src, alt }) => {
    const div = document.createElement("div");
    div.classList.add("gallery-item");

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;

    div.appendChild(img);
    gallery.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", loadImages);