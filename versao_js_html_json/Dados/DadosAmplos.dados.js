import { URLS } from './Utils/Urls.js';
import { makeRequest } from './Utils/makeRequest.js'
import { Dados } from './Dados.js'
import { getCepHashMap } from './Utils/cepHashMap.js'

const initDadosAmplos = () => {
    makeRequest(URLS.dadosAmplos, 'text', set);
}


const set = (response) => {
    let hashMap = getCepHashMap();
    let dadosObtidos = [];
    response = response.replace(/(\"[0-9]{1,3}),([0-9]{2}\")/g, '$1.$2');
    response = response.split('\r\n');
    response = response.map((el) => el.split(','));
    response = response.map((el) => {
        if (el[1] == "PIAUÍ" || el[1] == "Município") return;
        let cep = `64${el[6].slice(2, 5)}000`;
        dadosObtidos.push({
            "cep": cep,
            "nome": hashMap[cep].nome,
            "confirmados": el[2],
            "obitos": el[3],
            "incidencia": el[4],
            "populacao": el[5],
            "codarea": hashMap[cep].codigo_ibge
        });
    });

    Dados.dadosAmplos = dadosObtidos;

    for (let cep in hashMap) {
        if (!dadosObtidos.find(x => x.codarea === hashMap[cep].codigo_ibge)) {
            dadosObtidos.push({
                "cep": cep,
                "nome": hashMap[cep].nome,
                "confirmados": 0,
                "obitos": 0,
                "incidencia": 0,
                "populacao": null,
                "codarea": hashMap[cep].codigo_ibge
            })
        }
    };

    Dados.dadosAmplos = dadosObtidos;

};

export { initDadosAmplos };