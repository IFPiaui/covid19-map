import { Display } from './Display.js';
import { confirmados } from '../Dados/Confirmados.dados.js';

const setDisplayConfirmados = async() => {
    window.displayConfirmados = new Display('casos_confirmados');
    let info = await confirmados;
    window.displayConfirmados.init(info);
}

export { setDisplayConfirmados };