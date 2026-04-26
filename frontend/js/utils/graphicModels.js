import { nivelUsuario } from "../services/graphicService.js";


export async function criarBarraProgesso(main) {
    const nivel = await nivelUsuario();

    const data = {
        labels: ['Força'],
        datasets: [{
            data: [nivel],
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
    main.querySelector('#nivel-de-forca').textContent = nivel;
}