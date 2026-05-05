import { criarGoal, buscarGoalsAtivos, checkinGoal } from "../services/goalService.js";
import { gerarToast } from "./toasts.js";

export async function semGoalsModal(main) {

    main.innerHTML = `
        <div class="conteudo">
            <div class="vertical-cem">
                <div class="container-mensagem-goal">
                    <div class="container-mensagem-goal-content">
                        <div class="titulo-mensagem-goal-placeholder">
                            <h1 class="titulo-mensagem-goal cinzel-decorative-bold modal-selection">Propósito: a chama da força</h1>
                        </div>
                        <div class="mensagem-goal-placeholder">
                            <span class="mensagem-goal medievalsharp-light modal-selection">Na jornada de 
                            <span class="medievalsharp-regular corpo-mensagem-destaque-red">Thorfinn</span>, a força não veio da espada, mas da mudança. 
                            <span class="medievalsharp-bold">Quando ele perdeu o ódio que o movia, ficou vazio — até encontrar algo maior: um </span>
                            <span class="medievalsharp-regular corpo-mensagem-destaque-red">propósito</span>. 
                            Foi isso que o manteve de pé, mesmo sem ter mais contra quem lutar.
                            A força verdadeira não nasce do corpo.
                            Ela nasce daquilo que te faz continuar.
                            Agora, a pergunta não é se você é forte…
                            <span class="medievalsharp-regular corpo-mensagem-destaque-red">É por que você continua</span>.</span>
                        </div>
                        <div class="first-time-button-div">
                            <button class="first-time-button" id="first-time-button">
                                <span class="cinzel-decorative-bold">criar meu propósito</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const btn = main.querySelector('#first-time-button');

    btn.addEventListener('click', () => {
        criarGoalModal(main)
    })

    // btn.click()

}

export async function criarGoalModal(main) {

    main.innerHTML = `
        <div class="conteudo">
            <div class="vertical-cem">
                <div class="container-mensagem-goal">
                    <div class="container-mensagem-goal-content">
                        <div class="titulo-mensagem-goal-placeholder titulo_ipt_placeholder">
                            <input type="text" class="titulo-mensagem-goal cinzel-decorative-bold modal-selection" id="titulo_ipt" placeholder="Qual o seu objetivo?">
                        </div>
                        <div class="mensagem-goal-placeholder descricao_ipt_placeholder">
                            <input type="text" class="mensagem-goal cinzel-decorative-bold" id="descricao_ipt" placeholder="O quê você deve fazer para alcançar?">
                            </div>
                            <div class="dias_ipt_placeholder">
                                <input type="number" class="mensagem-goa cinzel-decorative-bold" id="dias_ipt" placeholder="Por quantos dias?">
                            </div>
                        <div class="first-time-button-div">
                            <button class="first-time-button" id="create-goal-button">
                                <span class="cinzel-decorative-bold">criar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const btn = main.querySelector('#create-goal-button');
    const tituloInput = main.querySelector('#titulo_ipt');
    const descricaoInput = main.querySelector('#descricao_ipt');
    const diasInput = main.querySelector('#dias_ipt');

    btn.addEventListener('click', async () => {
        const titulo = tituloInput.value;
        const descricao = descricaoInput.value;
        const dias = Number(diasInput.value);

        if (!titulo || !descricao || !dias) {
            setTimeout(() => {
                gerarToast("advise", "Preencha todos os campos");
            }, 500);
            return;
        };

        const criar = await criarGoal(titulo, descricao, dias);

        if (criar !== false) {
            setTimeout(() => {
                gerarToast("good", `Objetivo criado +${criar} XP`);
                carregarPagina(main);
            }, 500);
        };
    });



};

export async function carregarPagina(main) {

    const goalAtivo = await buscarGoalsAtivos();
    // const goalAtivo = null;

    if (!goalAtivo) {
        semGoalsModal(main)
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
                                    <span class="medievalsharp-light modal-description">- ${goalAtivo.descricao}</span>
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
    const porcentagemProgresso = parseInt(goalAtivo.progresso / goalAtivo.necessario * 100);

    function atualizarProgressBar() {
        progressBar.style.width = `${porcentagemProgresso}%`;
    };


    if (goalAtivo.progresso === 100) {
        progressBar.style.borderRadius = '5px';
    };

    marcarBtn.addEventListener('click', async () => {
        const checkin = await checkinGoal();

        if(checkin === false) {
            gerarToast("advise", `O dia já foi concluido`);
            return
        };

        if (checkin !== false && checkin !== null) {

            setTimeout(() => {
                if (checkin.completo === true) {
                    gerarToast("good", `Objetivo concluido +${checkin} XP`);
                } else {
                    gerarToast("good", `Dia concluido +${checkin} XP`);
                };
                carregarPagina(main)
            }, 500);

        };

    });

    atualizarProgressBar();

};