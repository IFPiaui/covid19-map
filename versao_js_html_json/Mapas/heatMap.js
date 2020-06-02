function getCentroid(feature) {
    let [lng, lat] = feature.properties.centroide;
    return [lng, lat];
}

function createHeatmapDataset() {

    let heatmapDataset = [];

    if (window.malha) {
        malha.features.forEach((el, i) => {
            let confirmados = el.properties.confirmados;
            let centroid = getCentroid(el);
            heatmapDataset.push([centroid[1], centroid[0], confirmados]);
        });
    } else {
        console.warn('Heatmap Dataset creation deferred.')
        setTimeout(createHeatmapDataset, 5);
    }

    return heatmapDataset;
}

function renderHeatMap() {
    window.heat = L.heatLayer(createHeatmapDataset(), {
        maxZoom: 8,
        radius: 12,
        blur: 10
    }).addTo(covid19Map);
}

export { renderHeatMap };