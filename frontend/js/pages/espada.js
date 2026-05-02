import { buscarResumoSemanal, verificarCheckinHoje } from "../services/buscarDadosService.js";
import { criarGraficoBloqueios } from "../utils/graphicModels.js";
import { mostrarResumoNaTela } from "../utils/mental.js";
import { mostrarModalEstado } from "../utils/modal.js";

export async function paginaEspada(main) {
    const statusCheckinHoje = await verificarCheckinHoje()
    
    if (statusCheckinHoje === false) {
        const btn = document.getElementById('jornada-button');

        console.error(statusCheckinHoje)
        btn.click()
        return
    }

    console.log('Página carregada');
    const app = document.getElementById('app');
    app.className = '';
    app.classList.add('app-espada');
    main.className = ''
    main.classList.add('dash-espada')
    main.innerHTML = ''

    main.innerHTML = `
        <div class="modal-base hidden" id="modal-base"></div>
        <div class="conteudo-horizontal">
            <div class="esquerda-setenta">
                <div class="corpo">
                    <div class="dashboard-container">
                        <div class="kpi-container">
                            <span class="kpi-title cinzel-decorative-bold modal-selection" id="kpi-title"></span>
                            <span class="kpi-subtitle cinzel-decorative-bold modal-selection hidden" id="kpi-subtitle-bloqueio"></span>
                            <span class="kpi-subtitle cinzel-decorative-bold modal-selection hidden" id="kpi-subtitle-consistencia"></span>
                        </div>

                        <div class="grafico-bloqueios-container">
                            <canvas class="grafico-bloqueios-canvas" id="grafico-bloqueios-canvas"></canvas>
                        </div>
                    </div>
                    <div class="button-container">
                        <button class="chamar-modal-button cinzel-decorative-bold" id="chamar-modal-button">Como está sua mente hoje</button>
                    </div>
                </div>
            </div>
            <div class="direita-trinta">
                <div class="corpo">
            
                </div>
            </div
        </div>
    `;

    mostrarResumoNaTela(main)

    const abrirModalBtn = main.querySelector('#chamar-modal-button');
    const modalBase = main.querySelector('#modal-base')

    abrirModalBtn.addEventListener('click', () => {
        mostrarModalEstado(modalBase);
    })

    criarGraficoBloqueios(main)
}

        // let ultimoEstado = resposta[0].state;
        // let ultimoBloqueio = resposta[0].blocker;
        // const consistencia = resposta[0].consistencia;

        // if (ultimoEstado === "focado") {
        //     ultimoEstado = "Focado";
        // } else if (ultimoEstado === "relaxado") {
        //     ultimoEstado = "Relaxado";
        // } else if (ultimoEstado === "distraido") {
        //     ultimoEstado = "Distraído";
        // } else if (ultimoEstado === "ansioso") {
        //     ultimoEstado = "Ansioso";
        // }

        // if (ultimoBloqueio === "medo") {
        //     ultimoBloqueio = "Medo"
        // } else if (ultimoBloqueio === "inseguranca") {
        //     ultimoBloqueio = "Insegurança"
        // } else if (ultimoBloqueio === "preguica") {
        //     ultimoBloqueio = "Preguiça"
        // } else if (ultimoBloqueio === "distracao") {
        //     ultimoBloqueio = "Distração"
        // } else if (ultimoBloqueio === "luxuria") {
        //     ultimoBloqueio = "Luxúria"
        // }