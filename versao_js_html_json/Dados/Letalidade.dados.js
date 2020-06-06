import { obitos } from './Obitos.dados.js';
import { confirmados } from './Confirmados.dados.js';

const letalidade = new Promise(async(resolve, reject) => {
    const NrObitos = await obitos;
    const NrConfirmados = await confirmados;
    let porcentual = (NrObitos / NrConfirmados) * 100;
    let letalidade = porcentual.toFixed(2);
    resolve(letalidade);
});

export { letalidade };