import { MAP_BASE_COLOR } from './Base.mapa.js'
import { calcLetalidade, calcMortalidade } from '../Dados/Utils/Utils.js'
import { getMalhaMelhorada } from './mapa-utils/malhaMelhorada.js'

function createTooltipText(layer) {
    let properties = layer.feature.properties;
    let formattedText =
        "<strong>" + properties.nome + "</strong><br>" +
        "Letalidade: " + calcLetalidade(properties.obitos, properties.confirmados) + "% <br>" +
        "Confirmados: " + properties.confirmados + "<br>" +
        "Óbitos: " + properties.obitos;

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
    return d > 200 ? '#800026' :
        d > 100 ? '#BD0026' :
        d > 50 ? '#E31A1C' :
        d > 20 ? '#FC4E2A' :
        d > 10 ? '#FD8D3C' :
        d > 4 ? '#FEB24C' :
        d > 0 ? '#FED976' :
        MAP_BASE_COLOR;
}

const style = (feature) => {
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

function initMalhaPrincipalPromise() {

    getMalhaMelhorada()
        .then((malhaMelhorada) => {
            window.geojson = L.geoJSON(malhaMelhorada, {
                onEachFeature: onEachFeature,
                style: style
            }).addTo(covid19Map);
        });
}

export { initMalhaPrincipalPromise };