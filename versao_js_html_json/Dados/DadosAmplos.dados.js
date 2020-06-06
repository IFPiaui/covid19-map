import { URLS } from './Utils/Urls.js';
import { makeRequestPromise } from './Utils/makeRequest.js'
import { getCepHashMap } from './Utils/cepHashMap.js'

const initDadosAmplos = new Promise(async(resolve, reject) => {
    let dados = await makeRequestPromise(URLS.dadosAmplos);

    let hashMap = getCepHashMap();
    let dadosObtidos = [];
    dados = dados.replace(/(\"[0-9]{1,3}),([0-9]{2}\")/g, '$1.$2');
    dados = dados.split('\r\n');
    dados = dados.map((el) => el.split(','));
    dados = dados.map((el) => {
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

    resolve(dadosObtidos);
});

export { initDadosAmplos };