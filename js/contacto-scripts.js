/**
 * Initialize the interactive map on the page using Leaflet.js.
 * Its centers the map on a predefined company location, displays a marker, and if the user allow it, 
 * it uses the user´s current location to calculate the routes.
 * 
 * Notes:
 *  - L is the main object of Leaflet.js. It contains all the functions, classes, etc of Leaflet
 *  - I use Leaflet to do it because I was not able to obtain the API KEY from google, so I find this alternative.
 * 
 * @return {void}
 */
function initMap() {
  const empresaLatLng = [40.7608, -73.9832]; // Coordinates of the company.
  const map = L.map("map").setView(empresaLatLng, 13); // Creation of the map based on its coordinates (zoom level 13).

  // OpenStreetMap Tiles added as background of the map.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  // Add a Marker in the company location.
  L.marker(empresaLatLng)
  .addTo(map) // Add the marker.
  .bindPopup("Nuestra Empresa") // Show a message by clicking.
  .openPopup(); // Open the pop-up automatically once loaded.

  if (navigator.geolocation) { // Verify if the browser allow to access the user´s location.
    navigator.geolocation.getCurrentPosition( // Get the user´s location.
      function (position) {
        const userLatLng = [ // Store the coordinates of the user.
          position.coords.latitude,
          position.coords.longitude,
        ];

        L.Routing.control({ // Stablish the route with a start and end point.
          waypoints: [
            L.latLng(userLatLng), // Start Point.
            L.latLng(empresaLatLng) // End Point.
          ],
          routeWhileDragging: false, // Do not recalculate path while dragging.
          showAlternatives: false, // Do not show alternative routes.

          createMarker: function (i, waypoint, n) { // Personalized the start and end markers.
            return L.marker(waypoint.latLng, {
              draggable: false, // Do not allow dragging the markers.
            });
          },
        }).addTo(map); // Add route control to the map.
      },

      function (error) {
        console.error("No se pudo obtener la ubicación del usuario.", error);
      }
    );
  }
  else {
    alert("Geolocalización no soportada por este navegador.");
  }
}

window.addEventListener("DOMContentLoaded", initMap);