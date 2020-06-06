const calcLetalidade = (obitos, confirmados) => {
    if (!obitos) return 0.00;
    let porcentual = (obitos / confirmados) * 100;
    let letalidade = porcentual.toFixed(2);
    return letalidade;
}

const calcMortalidade = (obitos, populacao) => {
    if (!obitos) return 0;
    let mortalidade = (obitos * 1000) / populacao;
    return mortalidade.toFixed(1);
}

export { calcLetalidade, calcMortalidade };