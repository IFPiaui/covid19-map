var ctx = document.getElementById('casosConfirmados').getContext('2d');
var colorsPrimary1 = []
var colorsBorder1 = []
datasCasos.forEach(element => {
    colorsPrimary1.push('rgba(0, 150, 136, 0.5)')
    colorsBorder1.push('rgba(181, 14, 14, 1)')
});
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: datasCasos,
        datasets: [{
            label: 'Casos confirmados',
            data: valoresCasos,
            backgroundColor: colorsPrimary1,
            borderColor: colorsBorder1,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Data'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Casos'
                }
            }]
        }
    }
});


var ctx2 = document.getElementById('historicoMortes').getContext('2d');
var colorsPrimary2 = []
var colorsBorder2 = []
datasHistMortes.forEach(element => {
    colorsPrimary2.push('rgba(244, 67, 54, 0.5)')
    colorsBorder2.push('rgba(183, 28, 28, 1)')
});
var myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: datasHistMortes,
        datasets: [{
            label: 'Óbitos',
            data: valoresHistMortes,
            backgroundColor: colorsPrimary2,
            borderColor: colorsBorder2,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Data'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Mortes'
                }
            }]
        }
    }
});


var ctx3 = document.getElementById('novosCasos').getContext('2d');
var colorsPrimary3 = []
var colorsBorder3 = []
datasNovosCasos.forEach(element => {
    colorsPrimary3.push('rgba(0, 150, 136, 0.5)')
    colorsBorder3.push('rgba(181, 14, 14, 1)')
});
var myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: datasNovosCasos,
        datasets: [{
            label: 'Novos casos por dia',
            data: valoresNovosCasos,
            backgroundColor: colorsPrimary3,
            borderColor: colorsBorder3,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Data'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Casos'
                }
            }]
        }
    }
});


var ctx4 = document.getElementById('novosCasosPorEstado').getContext('2d');
var colorsPrimary4 = []
var colorsBorder4 = []
ufNovasCasos.forEach(element => {
    colorsPrimary4.push('rgba(0, 150, 136, 0.5)')
    colorsBorder4.push('rgba(181, 14, 14, 1)')
});
var myChart4 = new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: ufNovasCasos,
        datasets: [{
            label: 'Novos casos por estado',
            data: novosCasosUF,
            backgroundColor: colorsPrimary4,
            borderColor: colorsBorder4,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'UF'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Casos'
                }
            }]
        }
    }
});


var ctx5 = document.getElementById('novasMortesPorEstado').getContext('2d');
var colorsPrimary5 = []
var colorsBorder5 = []
ufNovasCasos.forEach(element => {
    colorsPrimary5.push('rgba(244, 67, 54, 0.5)')
    colorsBorder5.push('rgba(183, 28, 28, 1)')
});
var myChart5 = new Chart(ctx5, {
    type: 'bar',
    data: {
        labels: ufNovasMortes,
        datasets: [{
            label: 'Novas mortes por estado',
            data: novasMortesUF,
            backgroundColor: colorsPrimary5,
            borderColor: colorsBorder5,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'UF'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Casos'
                }
            }]
        }
    }
});


var ctx6 = document.getElementById('mortesPorEstado').getContext('2d');
var colorsPrimary6 = []
var colorsBorder6 = []
ufNovasCasos.forEach(element => {
    colorsPrimary6.push('rgba(244, 67, 54, 0.5)')
    colorsBorder6.push('rgba(183, 28, 28, 1)')
});
var myChart6 = new Chart(ctx6, {
    type: 'bar',
    data: {
        labels: ufMortes,
        datasets: [{
            label: 'Mortes por estado',
            data: mortesUF,
            backgroundColor: colorsPrimary6,
            borderColor: colorsBorder6,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'UF'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Casos'
                }
            }]
        }
    }
});
