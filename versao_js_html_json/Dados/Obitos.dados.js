import { Dados } from './Dados.js';

const initObitos = () => {
    set();
}

const setDados = () => {
    if (typeof(Dados.dadosAmplos) === 'object') {
        let obitos = 0;
        let dados = Dados.dadosAmplos;
        dados.map((el) => {
            obitos = obitos + Number(el.obitos);
        })
        Dados.obitos = obitos;
    } else {
        setTimeout(setDados, 5);
    }
}

const set = () => {
    setDados();
}

export { initObitos };