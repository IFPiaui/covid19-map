import { Display } from './Display.js';
import { Dados } from '../Dados/Dados.js';

const setDisplayConfirmados = () => {
    window.displayConfirmados = new Display('casos_confirmados');
    if (Dados.confirmados) {
        window.displayConfirmados.init(Dados.confirmados);
    } else {
        setTimeout(setDisplayConfirmados, 5);
    }
}

export { setDisplayConfirmados };