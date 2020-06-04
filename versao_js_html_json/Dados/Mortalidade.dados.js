import { Dados } from './Dados.js';

const initMortalidade = () => {
    set();
}

const setDados = () => {
    if (Dados.confirmados && Dados.obitos) {
        let mortalidade = 0;
        let porcentual = (Dados.obitos / Dados.confirmados) * 100;
        mortalidade = porcentual.toFixed(2);
        Dados.mortalidade = '' + mortalidade;
    } else {
        setTimeout(setDados, 5);
    }
}

const set = () => {
    setDados();
}

export { initMortalidade };