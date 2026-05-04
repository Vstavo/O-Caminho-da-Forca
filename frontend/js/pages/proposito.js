import { verificarCheckinHoje } from "../services/buscarDadosService.js";
import { buscarGoalsAtivos, checkinGoal } from "../services/goalService.js";
import { mensagemPrimeiraVez } from "../utils/firstTimeMessage.js";

export async function paginaProposito(main) {
    const statusCheckinHoje = await verificarCheckinHoje()
    
    if (statusCheckinHoje === false) {
        const btn = document.getElementById('jornada-button');

        console.error(statusCheckinHoje)
        btn.click()
        return
    }

    const app = document.getElementById('app');
    app.className = '';
    app.classList.add('app-proposito');
    main.className = ''
    main.classList.add('dash-proposito')
    main.innerHTML = '';

    const goalAtivo = await buscarGoalsAtivos();
    // const goalAtivo = null;

    if (!goalAtivo) {
        main.innerHTML = mensagemPrimeiraVez()
        return;
    }

    main.innerHTML = `
        <div class="conteudo">
                <div class="centralizar">
                    <div class="modal-goal-proposito">
                        <div class="modal-content">
                            <div class="modal-cima">
                                <div class="modal-title-placeholder">
                                    <h1 class="medievalsharp-bold modal-title">${goalAtivo.titulo}</h1>
                                </div>
                                <div class="modal-description-placeholder">
                                    <span class="medievalsharp-light modal-description">${goalAtivo.descricao}</span>
                                </div>
                            </div>
                            <div class="modal-baixo">
                                <div class="goal-progress-container">
                                    <div class="goal-progress-bar-moldure">
                                        <div class="goal-progress-bar" id="goal-progress-bar" style="color: black;"></div>
                                    </div>
                                </div>
                                <div class="container-check-button">
                                    <button class="medievalsharp-bold check-button" id="check-button">Concluir dia</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    `;

    const progressBar = main.querySelector('#goal-progress-bar');
    const marcarBtn = main.querySelector('#check-button');

    function atualizarProgressBar() {
        progressBar.style.width = `${goalAtivo.progresso}%`;
    };


    if (goalAtivo.progresso === 100) {
        progressBar.style.borderRadius = '5px';
    };

    marcarBtn.addEventListener('click', () => {
        checkinGoal();

        setTimeout(() => {
            atualizarProgressBar()
        }, 500)
    })

    atualizarProgressBar()

}