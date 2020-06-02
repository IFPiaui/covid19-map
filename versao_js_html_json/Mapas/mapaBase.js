const COORDENADAS_INICIAIS = {
    LAT_INICIAL: -6.839169626342808,
    LNG_INICIAL: -43.011519853043694
}
const ZOOM_INICIAL = 6;
const MAP_BASE_COLOR = "transparent";

const initBaseMap = () => {
    window.covid19Map = L.map('map', {
        renderer: L.canvas()
    }).setView([COORDENADAS_INICIAIS.LAT_INICIAL, COORDENADAS_INICIAIS.LNG_INICIAL], ZOOM_INICIAL);

    var osmTiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(covid19Map);
}

// function renderMap() {
//     if (window.dados) {
//         window.geojson = L.geoJSON(window.malha, {
//             onEachFeature: onEachFeature,
//             style: style
//         }).addTo(covid19Map);
//     } else {
//         setTimeout(renderMap, 5);
//     }
// }

// function createHeatmapDataset() {

//     let heatmapDataset = [];

//     if (window.malha) {
//         malha.features.forEach((el, i) => {
//             let confirmed = getNumberOfCases(el);
//             let centroid = getCentroid(el);
//             heatmapDataset.push([centroid[1], centroid[0], confirmed]);
//         });
//     } else {
//         console.warn('Heatmap Dataset creation deferred.')
//         setTimeout(createHeatmapDataset, 5);
//     }

//     return heatmapDataset;
// }



// function highlightFeature(e) {
//     var layer = e.target;

//     let formattedText = createTooltipText(layer);

//     layer.bindTooltip(formattedText, {
//         sticky: true
//     }).openTooltip();

//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
// }

// function highlightFeatureMobile(e) {
//     if (window.innerWidth <= 800)
//         highlightFeature(e);
// }

// function resetHighlight(e) {
//     window.geojson.resetStyle(e.target);
// }

// // Looks for the number of confirmed cases and of deaths in the 'dados' object
// // based on the codearea
// //
// // The result of this function is an object called 'text' which will be used
// // as the source of the text of the tooltip of each feature in the map
// function findMunicipalityInfo(codarea) {
//     let text = {};
//     if (dados) { // if 'dados' was received from Brasil.io
//         dados.results.find(function(el, i) {
//             if (el.city_ibge_code === codarea) {
//                 text = {
//                     confirmed: el.confirmed,
//                     deaths: el.deaths
//                 };
//             }
//         });
//     }
//     if (!text.confirmed && !text.deaths) {
//         text = {
//             confirmed: 0,
//             deaths: 0
//         }
//     }
//     return text;
// }

// // This functions returns the number of confirmed cases based of the 
// // feature passed to it
// //
// // Input: Map feature
// // Output: (number) number of confirmed cases
// function getNumberOfCases(e) {
//     let codarea = e.properties.codarea;
//     let numberOfCases = 0;
//     if (dados) {
//         dados.results.find(function(el, i) {
//             if (el.city_ibge_code === codarea) {
//                 numberOfCases = el.confirmed;
//             }
//         });
//     } else {
//         console.error('Falha na obtenção dos dados de Brasil.io');
//     }

//     return numberOfCases;
// }

// function getColor(d) {
//     return d > 100 ? '#800026' :
//         d > 50 ? '#BD0026' :
//         d > 20 ? '#E31A1C' :
//         d > 10 ? '#FC4E2A' :
//         d > 5 ? '#FD8D3C' :
//         d > 1 ? '#FEB24C' :
//         d > 0 ? '#FED976' :
//         MAP_BASE_COLOR;
// }

// function style(feature) {
//     let fillColor;
//     dados ? fillColor = getColor(getNumberOfCases(feature)) : fillColor = MAP_BASE_COLOR;
//     return {
//         fillColor: fillColor,
//         weight: 0.5,
//         opacity: 1,
//         color: 'black',
//         dashArray: '',
//         fillOpacity: 0.7
//     };
// }

// function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: highlightFeatureMobile
//     });
//     layer.setStyle({
//         fillColor: getColor(getNumberOfCases(feature))
//     });
// }

// function renderHeatMap() {
//     window.heat = L.heatLayer(createHeatmapDataset(), {
//         maxZoom: 8,
//         radius: 12,
//         blur: 10
//     }).addTo(covid19Map);
// }

export { initBaseMap, MAP_BASE_COLOR };