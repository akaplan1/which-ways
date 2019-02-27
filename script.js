// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

var map = L.map('map').setView([40.683685,-73.965282], 11);
var dataLayer;

// Add base layer
  L.tileLayer('https://api.mapbox.com/styles/v1/akaplan93/cjsgbo72t2dfd1flez0lmzsst/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWthcGxhbjkzIiwiYSI6ImNqc2R1NmxnbTBiZWYzeW10bmgyOGMydXUifQ.dCwj6ffpSOYK51mQdPblZA', {
    maxZoom: 18
 }).addTo(map);

function loadData(value) {
  if (dataLayer) {
    dataLayer.clearLayers();
  }
  fetch('https://cdn.glitch.com/'+value)
    .then(function (response) {
// Read data as JSON
      return response.json();
    })
    .then(function (data) {
// Create the Leaflet layer for the data 
   dataLayer = L.geoJson(data, {
      color: '#F79D65', 
      weight: 1.5,
      stroke: true,
      fill: true,
   }).addTo(map);
// Move the map view so that the layer is visible
      map.setView([40.683685,-73.965282], 11);
    });
  };
// Declare dropdown variable, select class  
var typePicker = document.querySelector('.type-picker');
// DROPDOWN LISTENER
typePicker.addEventListener('change', function () {
  loadData(typePicker.value);
});
