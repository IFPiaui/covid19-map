import { Display } from './Display.js';
import { Dados } from '../Dados/Dados.js';

const setDisplayObitos = () => {
    window.displayObitos = new Display('obitos');
    if (Dados.obitos) {
        window.displayObitos.init(Dados.obitos);
    } else {
        setTimeout(setDisplayObitos, 5);
    }
}

export { setDisplayObitos };