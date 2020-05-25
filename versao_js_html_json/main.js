import { mergeData } from './dataCollector.js'
import { cepHashMap } from './cepHashMap.js'

var covid19Map = L.map('map', {
    renderer: L.canvas()
}).setView([-6.871802271319628, -42.86865854857276], 6);

var osmTiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(covid19Map);

const MAP_BASE_COLOR = "transparent";

const URLS = {
    brasilIO: 'https://brasil.io/api/dataset/covid19/caso/data/?state=PI&place_type=city&is_last=true',
    ibge: 'http://servicodados.ibge.gov.br/api/v2/malhas/22?formato=application/vnd.geo+json&resolucao=5',
    localBackupOfCases: './casos.json',
    Sesapi: {
        altasMedicasSESAPI: 'https://docs.google.com/spreadsheets/d/1b-GkDhhxJIwWcA6tk3z4eX58f-f1w2TA2f2XrI4XB1w/export?format=csv&gid=921393660',
        confirmadosObitos: 'https://docs.google.com/spreadsheets/d/1b-GkDhhxJIwWcA6tk3z4eX58f-f1w2TA2f2XrI4XB1w/export?format=csv&gid=532454257'
    }
};
/////////////////
/////////////////

var myHeaders = new Headers();

var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

var myRequest = new Request(URLS.Sesapi.altasMedicasSESAPI, myInit);

function calcTotalDeaths(dados) {
    let lastDeathRecords = dados.results.filter((el) => {
        return el.deaths > 0 && el.is_last
    });
    let totalDeaths = lastDeathRecords.reduce((deaths, el) => parseInt(deaths) + parseInt(el.deaths), 0);
    return totalDeaths;
}

function calcTotalConfirmed(dados) {
    let totalConfirmed = dados.results.reduce((confirmed, el) => parseInt(confirmed) + parseInt(el.confirmed), 0);
    return totalConfirmed;
}

function getCentroid(feature) {
    let [lng, lat] = feature.properties.centroide;
    return [lng, lat];
}

////////////// DISPLAY ////////////////
class Display {
    constructor(id) {
        this.id = id;
    }

    init(value) {
        document.getElementById(this.id).innerText = value;
    }
}

const displayCasosConfirmados = new Display('casos_confirmados');
const displayMortes = new Display('mortes');
const displayAltasMedicas = new Display('altas_medicas');
const displayMortalidade = new Display('mortalidade');

fetch(myRequest)
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        displayAltasMedicas.init(text.replace('ID,Casos,Altas Médicas\r\n1,Altas Médicas,', ''));
    });

///////////// DADOS ///////////

function setDadosObj(response) {
    window.dados = response;
    generateMalha();
    displayCasosConfirmados.init(calcTotalConfirmed(window.dados));
    displayMortes.init(calcTotalDeaths(window.dados));
    let mortalidade = (calcTotalDeaths(dados) / calcTotalConfirmed(dados)) * 100;
    displayMortalidade.init(mortalidade.toFixed(2) + '%');
}

let xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function() {
    if (xhr2.readyState === 4) {
        if (xhr2.status === 200) {
            setDadosObj(xhr2.response);
        }
    }
}

xhr2.open('GET', URLS.brasilIO, true);
xhr2.responseType = 'json';
xhr2.send();

const readNovosDados = function(response) {
    let cep = cepHashMap();
    return mergeData(response, cep);
}

let xhr4 = new XMLHttpRequest();
xhr4.onreadystatechange = function() {
    if (xhr4.readyState === 4) {
        if (xhr4.status == 200) {
            readNovosDados(xhr4.response);
        }
    }
}

xhr4.open('GET', URLS.Sesapi.confirmadosObitos, true);
xhr4.responseType = 'text';
xhr4.send();


const readDados = function(text) {
    window.dados_sesapi = text;
}

let xhr3 = new XMLHttpRequest();
xhr3.onreadystatechange = function() {
    if (xhr3.readyState === 4) {
        if (xhr3.status == 200) {
            readDados(xhr3.response);
        }
    }
}

xhr3.open('GET', URLS.Sesapi.confirmadosObitos, true);
xhr3.responseType = 'text';
xhr3.send();

function renderMap() {
    if (window.dados) {
        window.geojson = L.geoJSON(window.malha, {
            onEachFeature: onEachFeature,
            style: style
        }).addTo(covid19Map);
    } else {
        setTimeout(renderMap, 5);
    }
}

function createMap(response) {
    window.malha = JSON.parse(response);
    renderMap();
}

///////////// MALHA ///////////////
function generateMalha() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                createMap(xhr.responseText);
            }
        }
    }
    xhr.open('GET', './malha.geojson', true);
    xhr.responseType = 'text';
    xhr.send();
}

function createHeatmapDataset() {

    let heatmapDataset = [];

    if (window.malha) {
        malha.features.forEach((el, i) => {
            let confirmed = getNumberOfCases(el);
            let centroid = getCentroid(el);
            heatmapDataset.push([centroid[1], centroid[0], confirmed]);
        });
    } else {
        console.warn('Heatmap Dataset creation deferred.')
        setTimeout(createHeatmapDataset, 5);
    }

    return heatmapDataset;
}


function createTooltipText(layer) {
    let tooltipText = findMunicipalityInfo(layer.feature.properties.codarea);
    let formattedText =
        "<strong>" + layer.feature.properties.name + "</strong><br>" +
        "Confirmados: " + tooltipText.confirmed + "<br>" +
        "Mortes: " + tooltipText.deaths;

    return formattedText;
}

function highlightFeature(e) {
    var layer = e.target;

    let formattedText = createTooltipText(layer);

    layer.bindTooltip(formattedText, {
        sticky: true
    }).openTooltip();

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function highlightFeatureMobile(e) {
    if (window.innerWidth <= 800)
        highlightFeature(e);
}

function resetHighlight(e) {
    window.geojson.resetStyle(e.target);
}

// Looks for the number of confirmed cases and of deaths in the 'dados' object
// based on the codearea
//
// The result of this function is an object called 'text' which will be used
// as the source of the text of the tooltip of each feature in the map
function findMunicipalityInfo(codarea) {
    let text = {};
    if (dados) { // if 'dados' was received from Brasil.io
        dados.results.find(function(el, i) {
            if (el.city_ibge_code === codarea) {
                text = {
                    confirmed: el.confirmed,
                    deaths: el.deaths
                };
            }
        });
    }
    if (!text.confirmed && !text.deaths) {
        text = {
            confirmed: 0,
            deaths: 0
        }
    }
    return text;
}

// This functions returns the number of confirmed cases based of the 
// feature passed to it
//
// Input: Map feature
// Output: (number) number of confirmed cases
function getNumberOfCases(e) {
    let codarea = e.properties.codarea;
    let numberOfCases = 0;
    if (dados) {
        dados.results.find(function(el, i) {
            if (el.city_ibge_code === codarea) {
                numberOfCases = el.confirmed;
            }
        });
    } else {
        console.error('Falha na obtenção dos dados de Brasil.io');
    }

    return numberOfCases;
}

function getColor(d) {
    return d > 100 ? '#800026' :
        d > 50 ? '#BD0026' :
        d > 20 ? '#E31A1C' :
        d > 10 ? '#FC4E2A' :
        d > 5 ? '#FD8D3C' :
        d > 1 ? '#FEB24C' :
        d > 0 ? '#FED976' :
        MAP_BASE_COLOR;
}

function style(feature) {
    let fillColor;
    dados ? fillColor = getColor(getNumberOfCases(feature)) : fillColor = MAP_BASE_COLOR;
    return {
        fillColor: fillColor,
        weight: 0.5,
        opacity: 1,
        color: 'black',
        dashArray: '',
        fillOpacity: 0.7
    };
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: highlightFeatureMobile
    });
    layer.setStyle({
        fillColor: getColor(getNumberOfCases(feature))
    });
}

function renderHeatMap() {
    window.heat = L.heatLayer(createHeatmapDataset(), {
        maxZoom: 8,
        radius: 12,
        blur: 10
    }).addTo(covid19Map);
}

let btnHeatMapToggler = document.getElementById('btn-mapa-de-calor');
btnHeatMapToggler.addEventListener("click", () => {
    if (btnHeatMapToggler.classList.contains('isClicked')) {
        covid19Map.removeLayer(heat);
        btnHeatMapToggler.classList.remove('isClicked');
        btnHeatMapToggler.innerText = 'Mostrar Mapa de Calor';
    } else {
        btnHeatMapToggler.classList.add("isClicked");
        renderHeatMap()
        btnHeatMapToggler.innerText = 'Esconder Mapa de Calor';
    }
});