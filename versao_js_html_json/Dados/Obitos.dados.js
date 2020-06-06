import { initDadosAmplos } from './DadosAmplos.dados.js';

const obitos = new Promise(async(resolve, reject) => {
    const dadosAmplos = await initDadosAmplos;
    let obitos = 0;
    dadosAmplos.map((el) => {
        obitos = obitos + Number(el.obitos);
    });
    resolve(obitos);
});

export { obitos };