import { makeRequestPromise } from "../../Dados/Utils/makeRequest.js";
import { initDadosAmplos } from '../../Dados/DadosAmplos.dados.js';

async function getMalhaMelhorada() {
    var dadosAmplos = await initDadosAmplos;
    var malha = await initMalhaBasica();
    return new Promise((resolve, reject) => {
        malha.features.map((feature) => {
            let centroide = feature.properties.centroide;
            feature.properties = dadosAmplos.find(city => city.codarea === feature.properties.codarea);
            feature.properties.centroide = centroide;
        });
        window.malha = malha;
        resolve(malha);
    });
};

async function initMalhaBasica() {
    const response = await makeRequestPromise('./Mapas/mapa-utils/malha.geojson');
    return JSON.parse(response);
}

export { getMalhaMelhorada };