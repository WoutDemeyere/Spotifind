const lanIP = `${window.location.hostname}:5000`;

var mymap = 0;
var artist_data;
var cities_container = 0;

var highest, lowest = 0;
var search, results, search_main, app, icon, i, icon_enter, ring, errors, city_layer;


function mapp(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const getData = async function (spot_id) {
  ring.classList.add('c-loading-ring');

  artist_data = null;
  artist_data = await fetch(
      `https://spotifind-woutdem.azurewebsites.net/api/detail?id=${spot_id}`
      // `http://127.0.0.1:5000/api/v1/detail/${spot_id}`
    )
    .then(function (r) {
      if (r.status == 404) showErrorCitiesNotFound();
      else return r.json();
    })
    .catch((err) => console.error("An error occurd", err));

  
  if (artist_data != undefined) {
    if (!artist_data['origin-found']) showErrorNoOriginFound();
    if (city_layer) city_layer.clearLayers();

    ring.classList.remove('c-loading-ring');
    toggleSearch()
    search.value = '';
    drawCities();
  }
}

function toggleSearch() {
  i++;
  search_main.addEventListener('click', toggleSearch);
  document.querySelector('.js-main').classList.toggle('c-search__collapse');
  if (i == 2) {
      i = 0;
      search_main.removeEventListener('click', toggleSearch);
  }
}

const drawCities = function () {
  highest = artist_data.cities[0].listeners;
  lowest = artist_data.cities[49].listeners;
  city_layer = L.layerGroup()
  city_layer.remove()


  for (let data of artist_data.cities) {
    size = mapp(data.listeners, lowest, highest, 1, 20);
    if (data.geo.lon) {
      var city = L.circleMarker([data.geo.lat, data.geo.lon], {
        color: '#1DB954',
        fillColor: '#1DB954',
        fillOpacity: 1,
        radius: size
      }).addTo(city_layer)

      city.bindPopup(`<b>${data.city}</b><br>Listeners: ${data.listeners}.`)

    }
  }

  origin = artist_data.begin_area;
  or_size = 10;

  if (origin.geo.lat) {
    var circle = L.circleMarker([origin.geo.lat, origin.geo.lon], {
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.5,
      radius: or_size
    }).addTo(city_layer);

    circle.bindPopup(`<b>Origin: ${origin.name}</b>`)
  }

  city_layer.addTo(mymap)
}

const getDomElements = function () {
  cities_container = document.querySelector('.js-city-container');
  search = document.querySelector('.js-search');
  results = document.querySelector('.js-filter-container');
  search_main = document.querySelector('.js-main');
  app = document.querySelector('.js-app');
  icon = document.querySelector('.js-icon');
  // icon_enter = document.querySelector('.js-icon-enter');
  ring = document.querySelector('.js-loading-ring');
  errors = document.querySelector('.js-errors')
}

const setupMap = function () {
  mymap = L.map('map', {
    renderer: L.canvas(),
    preferCanvas: true,
    'maxBounds': [
      [-90, -Infinity],
      [90, Infinity]
    ],
    maxBoundsViscosity: 1.0,
    zoomControl: false
  }).setView([51.505, -0.09], 2);;


  L.tileLayer('https://api.mapbox.com/styles/v1/wod01/ckgl18cn8297p19o8qb2db4wv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid29kMDEiLCJhIjoiY2o1dmloY2lvMDI4MTMycGh2d3lsZG4xMSJ9.Z0afj3yoC2i_KDtfDFNZqQ', {
    maxZoom: 12,
    minZoom: 2,
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(mymap);
}

const init = function () {
  console.log("Script loaded!")

  getDomElements();
  setupMap();
  listenToSearch();

}

document.addEventListener("DOMContentLoaded", init());