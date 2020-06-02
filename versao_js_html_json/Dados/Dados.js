import { initDadosAmplos } from './DadosAmplos.dados.js';
import { initAltasMedicas } from './AltasMedicas.dados.js';
import { initConfirmados } from './Confirmados.dados.js';
import { initObitos } from './Obitos.dados.js';
import { initMortalidade } from './Mortalidade.dados.js';

const Dados = {
    dadosAmplos: '',
    obitos: '',
    confirmados: '',
    mortalidade: '',
    altasMedicas: ''
}

initDadosAmplos();
initAltasMedicas();
initConfirmados();
initObitos();
initMortalidade();

window.Dados = Dados;

export { Dados };