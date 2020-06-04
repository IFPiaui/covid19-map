import { Dados } from './Dados.js';

const initConfirmados = () => {
    set();
}

const setDados = () => {
    if (typeof(Dados.dadosAmplos) === 'object') {
        let confirmados = 0;
        let dados = Dados.dadosAmplos;
        dados.map((el) => {
            confirmados = confirmados + Number(el.confirmados);
        })
        Dados.confirmados = confirmados;
    } else {
        setTimeout(setDados, 5);
    }
}

const set = () => {
    setDados();
}

export { initConfirmados };