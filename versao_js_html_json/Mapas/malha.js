import { makeRequest } from "../Dados/Utils/makeRequest.js";
import { Dados } from '../Dados/Dados.js'
import { MAP_BASE_COLOR } from './mapaBase.js'

function calcMortalidade(obitos, confirmados) {
    if (!obitos) return 0.00;
    let porcentual = (obitos / confirmados) * 100;
    let mortalidade = porcentual.toFixed(2);
    return mortalidade;
}

function createTooltipText(layer) {
    let properties = layer.feature.properties;
    let formattedText =
        "<strong>" + properties.nome + "</strong><br>" +
        "Mortalidade: " + calcMortalidade(properties.obitos, properties.confirmados) + "% <br>" +
        "Confirmados: " + properties.confirmados + "<br>" +
        "Mortes: " + properties.obitos;

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
    // window.geojson.resetStyle(e.target);
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
    let confirmados = feature.properties;
    let fillColor;
    window.malha ? fillColor = getColor(confirmados) : fillColor = MAP_BASE_COLOR;
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
        fillColor: getColor(feature.properties.confirmados)
    });
}

function getMergedData() {
    if (typeof(Dados.dadosAmplos) === 'object') {
        let dadosAmplos = window.Dados.dadosAmplos;
        if (window.malha) {
            let malha = window.malha;
            malha.features.forEach((feature) => {
                let properties = feature.properties;
                let centroide = properties.centroide;
                feature.properties = dadosAmplos.find(city => city.codarea === feature.properties.codarea);
                feature.properties.centroide = centroide;
            })
        }
    } else {
        setTimeout(getMergedData, 5);
    }
}

function renderMap() {
    if (window.Dados) {
        window.geojson = L.geoJSON(window.malha, {
            onEachFeature: onEachFeature,
            style: style
        }).addTo(covid19Map);
    } else {
        setTimeout(renderMap, 5);
    }
}

function initRenderMap() {
    if (window.malha.features[5].properties.confirmados) {
        renderMap();
    } else {
        setTimeout(initRenderMap, 5);
    }
}

function createMap(response) {
    window.malha = JSON.parse(response);
    getMergedData();
    initRenderMap();
}

function initMalhaPrincipal() {
    makeRequest('malha.geojson', 'text', createMap);
}

export { initMalhaPrincipal };