import { buscarResumoSemanal } from "../services/buscarDadosService.js";
import { barraProgresso, nivelUsuario } from "../services/graphicService.js";

export async function criarBarraProgesso(main) {
    const progresso = await barraProgresso();

    const data = {
        labels: ['Força'],
        datasets: [{
            data: [progresso],
            backgroundColor: '#B8860B',
            barThickness: 150
        }]
    };

    const config = {
        type: 'bar',
        data,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    display: false,
                    beginAtZero: true,
                    max: 100
                },
                y: {
                    display: false
                }
            }
        }
    };

    const ctx = main.querySelector('#progress-bar-canvas').getContext('2d');
    new Chart(ctx, config)
    main.querySelector('#xp-total').textContent = `${progresso} / 100`;
}

let myChart = null

export async function criarGraficoBloqueios(main) {
    
    const apiData = await buscarResumoSemanal();

    const bloqueios = apiData.bloqueios;
    
    const labels = ["Medo", "Insegurança", "Preguiça", "Distração", "Luxúria"];
    const valores = [
        bloqueios.medo, 
        bloqueios.inseguranca, 
        bloqueios.preguica, 
        bloqueios.distracao, 
        bloqueios.luxuria
    ];
    
    const ctx = main.querySelector('#grafico-bloqueios-canvas').getContext('2d');

    const data = {
        labels: labels,
        datasets: [{
            label: 'Apareceu',
            data: valores,
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
        }]
    };

    const config = {
        type: 'radar',
        data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            resizeDelay: 200,           // Evita glitches durante o redimensionamento
            layout: {
                padding: 10             // Margem interna para o radar não encostar na borda da div
            },
            scales: {
                r: {
                    angleLines: { display: true },
                    
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#daedff',
                        stepSize: 1
                    },

                    grid: {
                        color: '#daedff',
                        lineWidth: 1,
                        circular: true
                    },

                    pointLabels: {
                        color: '#daedff',
                        font: {size: 12}
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    }


    myChart = new Chart(ctx, config)
}

export async function atualizarGraficoBloqueios(main) {
    if (!myChart) return;

    const apiData = await buscarResumoSemanal();
    const bloqueios = apiData.bloqueios;
    
    const valores = [
        bloqueios.medo, 
        bloqueios.inseguranca, 
        bloqueios.preguica, 
        bloqueios.distracao, 
        bloqueios.luxuria
    ];

    myChart.data.datasets[0].data = valores;
    myChart.update();
}