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

export { initBaseMap, MAP_BASE_COLOR };