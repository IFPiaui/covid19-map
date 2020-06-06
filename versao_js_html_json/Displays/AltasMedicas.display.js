import { Display } from './Display.js'
import { altasMedicas } from '../Dados/AltasMedicas.dados.js';

const setDisplayAltasMedicas = async() => {
    window.displayAltasMedicas = new Display('altas_medicas');
    let info = await altasMedicas;
    window.displayAltasMedicas.init(info);
}

export { setDisplayAltasMedicas };