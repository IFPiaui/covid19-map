var graficoObitosNormal;
var graficoObitosLog;

const create = (id) => {
    let context = document.getElementById(id);
    graficoObitosNormal = new Chart(context, {
        type: 'line',
        data: {
            labels: window.serieTemporal.semanas,
            datasets: [{
                data: window.serieTemporal.obitos,
                fill: false,
                borderColor: 'rgba(22, 123, 255, 0.85)'
            }]
        },
        options: {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 40,
                    bottom: 20
                }
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Semana epidemiológica'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: '# de óbitos'
                    },
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 6
                    }
                }]
            }
        }
    });
}


const createLogarithmic = (id) => {
    let context = document.getElementById(id);
    let numObitosArray = window.serieTemporal.obitos;
    let numObitosArrayLog = numObitosArray.map((item) => {
        return Math.log10(item);
    });
    graficoObitosLog = new Chart(context, {
        type: 'line',
        data: {
            labels: window.serieTemporal.semanas,
            datasets: [{
                data: numObitosArrayLog,
                fill: false,
                borderColor: 'rgba(22, 123, 255, 0.85)'
            }]
        },
        options: {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 40,
                    bottom: 20
                }
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Semana epidemiológica'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: '# de óbitos'
                    },
                    ticks: {
                        min: 0,
                        max: 2.5,
                        beginAtZero: true,
                        stepSize: .5
                    }
                }]
            }
        }
    });
}

const initGraficoObitos = (id) => {
    if (window.serieTemporal) {
        graficoObitosLog = null;
        create('grafico_obitos');
    } else {
        setTimeout(initGraficoObitos, 5);
    }
}

const initGraficoObitosLog = (id) => {
    if (window.serieTemporal) {
        graficoObitosNormal = null;
        createLogarithmic('grafico_obitos');
    } else {
        setTimeout(initGraficoObitosLog, 5);
    }
}

export { initGraficoObitos, initGraficoObitosLog, graficoObitosNormal };