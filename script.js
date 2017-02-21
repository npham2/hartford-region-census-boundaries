// Template by http://github.com/jackdougherty/leaflet-map/
// See Leaflet tutorial links in README.md

// set up the map center and zoom level
var map = L.map('map', {
  center: [41.76, -72.67],
  zoom: 12,
  zoomControl: false, // add later to reposition
  scrollWheelZoom: false
});

// optional : customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix('View <a href="https://github.com/jackdougherty/hartford-region-census-boundaries">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

// Get your own free Mapzen search API key and see geocoder options at https://github.com/mapzen/leaflet-geocoder
L.control.geocoder('search-jBPBt5y').addTo(map);

L.control.scale().addTo(map);

// Reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map);

// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);

/* BASELAYERS */
var lightAll = new L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map); // suffix displays baselayer by default
controlLayers.addBaseLayer(lightAll, 'CartoDB LightAll');

var lightNoLabels = new L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
controlLayers.addBaseLayer(lightNoLabels, 'CartoDB Light no labels');


/* POLYGON OVERLAYS */

$.getJSON("src/CT-tracts-2010-MAGIC.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'green',
        'weight': 2,
        'fillColor': 'green',
        'fillOpacity': 0.2
      }
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.name) // change 'name' to match your geojson property labels
    }
  }).addTo(map);  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, 'Tracts 2010 (green)');  // insert your 'Title' to add to legend
});

$.getJSON("src/Hartford-neighborhoods-2015-HartData.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'orange',
        'weight': 2,
        'fillColor': 'orange',
        'fillOpacity': 0.2
      }
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.name) // change 'name' to match your geojson property labels
    }
  }).addTo(map);  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, 'Hartford neighborhoods (not census) (orange)');  // insert your 'Title' to add to legend
});

$.getJSON("src/CT-towns-2010-MAGIC.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'red',
        'weight': 2,
        'fillColor': 'red',
        'fillOpacity': 0.2
      }
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.name) // change 'name' to match your geojson property labels
    }
  }).addTo(map);  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, 'Towns 2010 (red)');  // insert your 'Title' to add to legend
});

// load polygon data with clickable features from local directory
$.getJSON("src/CT-counties-2010-MAGIC.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'blue',
        'weight': 2,
        'fillColor': 'blue',
        'fillOpacity': 0.2
      }
    },
    onEachFeature: function( feature, layer) {
      layer.bindPopup(feature.properties.name) // change 'name' to match your geojson property labels
    }
  }).addTo(map);  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, 'Counties 2010 (blue)');  // insert your 'Title' to add to legend
});
