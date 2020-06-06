import { initDadosAmplos } from './DadosAmplos.dados.js';
import { altasMedicas } from './AltasMedicas.dados.js';
import { confirmados } from './Confirmados.dados.js';
import { obitos } from './Obitos.dados.js';
import { letalidade } from './Letalidade.dados.js';

let Dados;

async function resolveDados() {

    Dados = {
        dadosAmplos: '',
        obitos: '',
        confirmados: '',
        letalidade: '',
        altasMedicas: ''
    }

    Dados.dadosAmplos = await initDadosAmplos;
    Dados.altasMedicas = await altasMedicas;
    Dados.confirmados = await confirmados;
    Dados.obitos = await obitos;
    Dados.letalidade = await letalidade;

    return new Promise((resolve) => {

        window.Dados = Dados;
        console.log(window.Dados);
        if (window.Dados) {
            resolve(Dados);
        } else {
            reject(null);
        }
    })
};


export { Dados, resolveDados };