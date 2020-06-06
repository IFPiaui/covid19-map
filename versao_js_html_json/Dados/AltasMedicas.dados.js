import { URLS } from './Utils/Urls.js';
import { makeRequestPromise } from './Utils/makeRequest.js'

const altasMedicas = new Promise((resolve, reject) => {
    makeRequestPromise(URLS.altasMedicas)
        .then((response) => {
            let value = response.replace('ID,Casos,Altas Médicas\r\n1,Altas Médicas,', '');
            resolve(value);
        });
});

export { altasMedicas };