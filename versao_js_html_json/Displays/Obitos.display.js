import { Display } from './Display.js';
import { obitos } from '../Dados/Obitos.dados.js';

const setDisplayObitos = async() => {
    window.displayObitos = new Display('obitos');
    let info = await obitos;
    window.displayObitos.init(info);
}

export { setDisplayObitos };