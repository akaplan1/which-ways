// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L, Mustache */

var map = L.map('map').setView([40.683685,-73.965282], 12);
var dataLayer;

var boroNumberMap = {
  1: 'Manhattan',
  2: 'The Bronx',
  3: 'Brooklyn',
  4: 'Queens',
  5: 'Staten Island'
};

// We can do this here because the template will never change.
var popupTemplate = document.querySelector('.popup-template').innerHTML;

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
     style:{
      color: '#F79D65', 
      weight: 1.5,
      stroke: true,
      fill: true
     },
      onEachFeature: function (feature, layer) {
        layer.on('click', function () {
          // This function is called whenever a feature on the layer is clicked
          // This new key 'boroname' is equal to this existing key 'borocode' passed through this map 'boroNumberMap'
          layer.feature.properties.boroname = boroNumberMap[layer.feature.properties.borocode];
          console.log(layer.feature.properties);

          // Render the template with all of the properties. Mustache ignores properties
          // that aren't used in the template, so this is fine.
          var sidebarContentArea = document.querySelector('.sidebar-content');
          console.log(sidebarContentArea);
          sidebarContentArea.innerHTML = Mustache.render(popupTemplate, layer.feature.properties);
        });
      }
   }).addTo(map);
    
// Move the map view so that the layer is visible
      map.setView([40.683685,-73.965282], 12);
    });
  };
// Declare dropdown variable, select class  
var typePicker = document.querySelector('.type-picker');
// DROPDOWN LISTENER
typePicker.addEventListener('change', function () {
  loadData(typePicker.value);
})
