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
            <div class="esquerda-sessenta">
                <div class="corpo">
                    <div class="dashboard-container">
                        <div class="kpi-container">
                            <span class="kpi-title cinzel-decorative-bold modal-selection" id="kpi-title"></span>
                            <span class="kpi-subtitle cinzel-decorative-bold modal-selection hidden" id="kpi-subtitle-bloqueio"></span>
                        </div>
                        <div class="horizontal">
                            <div class="grafico-bloqueios-container">
                                <span class="grafico-title cinzel-decorative-regular modal-selection" id="grafico-title">Bloqueios da semana</span>
                                <div class="grafico-bloqueios-moldure">
                                    <canvas class="grafico-bloqueios-canvas" id="grafico-bloqueios-canvas"></canvas>
                                </div>
                            </div>
                            <div class="conclusion-container">
                                <span class="conclusion-message cinzel-decorative-bold modal-selection" id="conclusion-message">Bloqueios da semana</span>
                                <span class="conclusion-action cinzel-decorative-bold modal-selection" id="conclusion-action">Bloqueios da semana</span>
                            </div>
                        </div>
                    </div>
                    <div class="button-container">
                        <button class="chamar-modal-button cinzel-decorative-bold" id="chamar-modal-button">Como está sua mente hoje</button>
                    </div>
                </div>
            </div>
            <div class="direita-quarenta">
                <div class="corpo">
            
                </div>
            </div
        </div>
    `;

    mostrarResumoNaTela(main)

    const abrirModalBtn = main.querySelector('#chamar-modal-button');
    const modalBase = main.querySelector('#modal-base')

    abrirModalBtn.addEventListener('click', () => {
        mostrarModalEstado(modalBase, main);
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