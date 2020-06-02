import { Display } from './Display.js';
import { Dados } from '../Dados/Dados.js';

const setDisplayMortalidade = () => {
    window.displayMortalidade = new Display('mortalidade');
    if (Dados.mortalidade) {
        window.displayMortalidade.init(Dados.mortalidade + '%');
    } else {
        setTimeout(setDisplayMortalidade, 5);
    }
}

export { setDisplayMortalidade };