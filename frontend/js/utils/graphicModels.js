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

    const data = {
        labels: labels,
        labels: labels,
        datasets: [{
            label: 'Nível de Bloqueio',
            data: valores,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
        }]
    };

    const config = {
        type: 'radar',
        data,
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: { display: true },
                    
                    ticks: {
                    stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    }


    const ctx = main.querySelector('#grafico-bloqueios-canvas').getContext('2d');
    const myChart = new Chart(ctx, config)

}