import { Display } from './Display.js'
import { Dados } from '../Dados/Dados.js';

const setDisplayAltasMedicas = () => {
    window.displayAltasMedicas = new Display('altas_medicas');
    if (Dados.altasMedicas) {
        window.displayAltasMedicas.init(Dados.altasMedicas);
    } else {
        setTimeout(setDisplayAltasMedicas, 5);
    }
}

export { setDisplayAltasMedicas };