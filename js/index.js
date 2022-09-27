// This code helps to initialize the maplayer
// setView allow you to set to the specific region on the map
var map = L.map("map").setView([8.852, -1.319], 7);

// Adding OSM tile to the map
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// Adding scale to map
L.control.scale().addTo(map);

// changing the default zoom position
map.zoomControl.setPosition("topright");

//  Adding coordinate to a map
map.on("mousemove", function (e) {
  $("#coordinate").html(
    `Lat:${e.latlng.lat.toFixed(3)}, Lng :${e.latlng.lng.toFixed(3)}`
  );
});

// Adding styles to an object
var regionStyle = {
  color: "black",
  fillColor: "white",
  opacity: 0.4,
};
// Styling Health Layer
var healthsiteStyle = {
  radius: 5,
  fillColor: "red",
  color: "bF9630C",
};

// Adding layers(data) to a webmap
var regionlayer = L.geoJson(region, {
  style: regionStyle,
  onEachFeature: function (feature, layer) {
    // adding a popup to all the regions
    layer.bindPopup(feature.properties.region);
  },
});
// .addTo(map)

var healthsitelayer = L.geoJson(healthfacilities, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, healthsiteStyle);
  },
  onEachFeature: function (feature, layer) {
    // adding a popup to all the regions
    layer.bindPopup(feature.properties.amenity);
  },
});
// .addTo(map)

// var placesLayer = L.geoJson(Places)
// .addTo(map)

// Adding styles to an object
var railwayStyle = {
  color: "brown",
  fillColor: "brown",
  opacity: 1.0,
  weight: 3,
};

// Adding Railway data
var railwayLayer = L.geoJson(Railway, {
  style: railwayStyle,
  onEachFeature: function (feature, layer) {
    // adding a popup to all the features
    layer.bindPopup(feature.properties.NAME);
  },
});
// .addTo(map)

// Adding WMS Layers
// WMS CODE FOR ADDING RIVERS
var riverWMS = L.tileLayer.wms(" http://localhost:8080/geoserver/Geospatial/wms", {
    layers: 'Geospatial:River',
    format: 'image/png',
    transparent: true,
    attribution: "JUWON ISHOLA"
}).addTo(map)


// WMS CODE FOR ADDING TREECOVERMAP
var treecoverWMS = L.tileLayer.wms(" http://localhost:8080/geoserver/Geospatial/wms", {
    layers: 'Geospatial:TreeCover',
    format: 'image/png',
    transparent: true,
    attribution: "JUWON ISHOLA"
}).addTo(map)

//WMS CODE FOR ADDING 
var treecoverWMS = L.tileLayer.wms(" http://localhost:8080/geoserver/Geospatial/wms", {
    layers: 'Geospatial:RailwayLine',
    format: 'image/png',
    transparent: true,
    attribution:"JUWON ISHOLA"
}).addTo(map)

//WMS CODE FOR ADDING Healthfacilities
var healthWMS = L.tileLayer.wms(" http://localhost:8080/geoserver/Geospatial/wms", {
    layers: 'Geospatial:Healthcenter',
    format: 'image/png',
    transparent: true,
    attribution:"JUWON ISHOLA"
}).addTo(map)




// BASEMAP CODE LAYOUT
// Adding other basemap layers
var googleStreets = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

var googleHybrid = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

var googleTerrain = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

var googleSat = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

// Makers
// var marker = L.marker([8.852, -1.319] ).addTo(map);

// To add basemaps
var baseLayers = {
  OpenstreetMap: osm,
  "Google Streets": googleStreets,
  "Google Hybrid": googleHybrid,
  "Google Terrain": googleTerrain,
  "Google Satellite": googleSat,
};

// // To add layers
var overlays = {
  "Railway": railwayLayer,
  "Health Facilities": healthsitelayer,
  "Region": regionlayer,
  "Tree Cover":treecoverWMS,
  "River":  riverWMS,
  "Health Centers":healthWMS
};

// add layer control to map
L.control.layers(baseLayers, overlays).addTo(map);

// Adding leaflet browser print control to map
L.control.browserPrint({ position: "topleft" }).addTo(map);
