dataMapPiauiConfimados = []
dataMapPiauiMortes = []
dados_sesapi.forEach(element => {
    if (element.city != 'PIAUÍ'){
        dataMapPiauiConfimados.push([element.codigo_ibge, parseInt(element.confirmed)])
        dataMapPiauiMortes.push([element.codigo_ibge, parseInt(element.deaths)])
    }
});


Highcharts.getJSON('https://raw.githubusercontent.com/IFPiaui/covid19-map/master/static_jsons/malha.geojson', function (geojson) {
    Highcharts.mapChart('mapaPiauiConfirmados', {
        chart: {
            map: geojson
        },

        title: {
            text: 'Casos COVID-19 no Piauí'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0,
            stops: [[0, '#e0f2f1'], [0.001, '#b2dfdb'],[0.018, '#80cbc4'], [0.1, '#4db6ac'],
            [0.15, '#26a69a'], [0.2, '#009688'], [0.4, '#00897b'], [0.6, '#00897b'], [0.8, '#00897b'],
            [1, '#00897b']],
        },

        series: [{
            data: dataMapPiauiConfimados,
            keys: ['codarea', 'value'],
            joinBy: 'codarea',
            name: 'Confirmados',
            states: {
                hover: {
                    color: '#a4edba'
                }
            },
            dataLabels: {
                format: '{point.name}',
            }
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    }
                }
            }]
        }

    });
});


Highcharts.getJSON('https://raw.githubusercontent.com/IFPiaui/covid19-map/master/static_jsons/malha.geojson', function (geojson) {
    Highcharts.mapChart('mapaPiauiMortes', {
        chart: {
            map: geojson
        },

        title: {
            text: 'Mortes por COVID-19 no Piauí'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0,
            stops: [[0, '#ffebee'], [0.001, '#ffcdd2'],[0.018, '#ef9a9a'], [0.1, '#e57373'],
            [0.15, '#ef5350'], [0.2, '#f44336'], [0.4, '#e53935'], [0.6, '#d32f2f'], [0.8, '#c62828'],
            [1, '#b71c1c']],
        },

        series: [{
            data: dataMapPiauiMortes,
            keys: ['codarea', 'value'],
            joinBy: 'codarea',
            name: 'Mortes',
            states: {
                hover: {
                    color: '#a4edba'
                }
            },
            dataLabels: {
                format: '{point.name}',
            }
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    }
                }
            }]
        }

    });
});



Highcharts.mapChart('mapaBrasil', {
    chart: {
      map: 'countries/br/br-all'
    },
  
    title: {
      text: 'Casos por estado'
    },
  
    subtitle: {
      text: 'Casos com base na última atualização dos estados'
    },
  
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
  
    colorAxis: {
        min: 0,
        stops: [[0, '#e0f2f1'], [0.001, '#b2dfdb'],[0.018, '#80cbc4'], [0.1, '#4db6ac'],
            [0.15, '#26a69a'], [0.2, '#009688'], [0.4, '#00897b'], [0.6, '#00897b'], [0.8, '#00897b'],
            [1, '#00897b']],
    },
  
    series: [{
      data: dataMapBrasil,
      name: 'Confirmados',
      states: {
        hover: {
          color: '#b2dfdb'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                }
            }
        }]
    }

  });