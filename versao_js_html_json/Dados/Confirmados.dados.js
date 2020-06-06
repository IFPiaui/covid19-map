import { initDadosAmplos } from './DadosAmplos.dados.js';

const confirmados = new Promise(async(resolve, reject) => {
    const dadosAmplos = await initDadosAmplos;
    let confirmados = 0;
    dadosAmplos.map((el) => {
        confirmados = confirmados + Number(el.confirmados);
    });
    resolve(confirmados);
});

export { confirmados };