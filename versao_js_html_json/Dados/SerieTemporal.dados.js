import { makeRequest } from './Utils/makeRequest.js';
import { URLS } from './Utils/Urls.js';

const start = () => {
    makeRequest(URLS.serieTemporal, 'text', trataDados);
}

const trataDados = (dados) => {
    window.serieTemporal = dados;
    let dadosSerieTemporal = { semanas: [], confirmados: [], obitos: [], novos_casos: [] };
    let s1 = window.serieTemporal.split('\r\n');
    let s2 = s1.map((it) => it.split(','));
    let s3 = s2.map((it, index) => {
        if (index === 0) return;
        dadosSerieTemporal.semanas.push(it[0]);
        dadosSerieTemporal.confirmados.push(it[1]);
        dadosSerieTemporal.obitos.push(it[2]);
        dadosSerieTemporal.novos_casos.push(it[3]);
    })
    window.serieTemporal = dadosSerieTemporal;
}

export { start };