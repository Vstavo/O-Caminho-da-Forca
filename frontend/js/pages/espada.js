import { verificarCheckinHoje } from "../services/buscarDadosService.js";

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
        <div class="conteudo-horizontal">
            <div class="esquerda-setenta">
                <div class="corpo">
                    <div class="dashboard-container">
                        <div class="kpi-container">
                            <span class="kpi-title cinzel-decorative-bold modal-selection">Você esteve majoritariamente <span class="cinzel-decorative-black corpo-mensagem-destaque-blue modal-selection" id="estado-majoritario">focado</span> esta semana</span>
                            <span class="kpi-subtitle cinzel-decorative-bold modal-selection">Você ficou <span class="cinzel-decorative-black corpo-mensagem-destaque-blue modal-selection" id="estado-consecutivo">focado</span> por <span class="cinzel-decorative-black corpo-mensagem-destaque-blue modal-selection" id="dias-conseutivos">5</span> dias consecutivos</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="direita-trinta">
                <div class="corpo">
            
                </div>
            </div
        </div>
    `
}