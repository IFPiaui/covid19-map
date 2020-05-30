const mergeData = function(novos_dados, cepHashMap) {

    let novos_dados_com_ponto = '';
    // Substitui as vírgulas nos valores de incidência por pontos.
    novos_dados_com_ponto = novos_dados.replace(/\"([0-9]{1,2}),([0-9]{2})\"/g, '$1.$2');

    // Gera array contendo os valores de cada linha em cada posição
    let novos_dados_split = novos_dados_com_ponto.split('\n');

    // Cria uma array de array com os dados separados por vírgula
    let novos_dados_array = novos_dados_split.map((el) => el.split(','));

    // Une os dados obtidos com os dados de cepHashMap.
    let todasAsCidades = [];
    novos_dados_array.forEach((el, i) => {
        if (!i || el[6] === "") return;
        let cidade = {
            'cep': el[6],
            'codigo_ibge': cepHashMap[el[6]].codigo_ibge,
            'nome': cepHashMap[el[6]].nome,
            'confirmed': el[2],
            'deaths': el[3],
            'incidence': el[4]
        }

        todasAsCidades.push(cidade);
    });

    return todasAsCidades;
}

export { mergeData }