import { Display } from './Display.js';
import { letalidade } from '../Dados/Letalidade.dados.js'

const setDisplayLetalidade = async() => {
    window.displayLetalidade = new Display('letalidade');
    let info = await letalidade;
    window.displayLetalidade.init(info + '%');
}

export { setDisplayLetalidade };