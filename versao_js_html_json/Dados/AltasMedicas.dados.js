import { URLS } from './Utils/Urls.js';
import { makeRequest } from './Utils/makeRequest.js'
import { Dados } from './Dados.js'

const initAltasMedicas = () => {
    makeRequest(URLS.altasMedicas, 'text', set);
}

const set = response => {
    let value = response.replace('ID,Casos,Altas Médicas\r\n1,Altas Médicas,', '');
    Dados.altasMedicas = value;
}

export { initAltasMedicas };