import { verificarCheckinHoje } from "../services/buscarDadosService.js";
import { mostrarModal } from "../utils/modal.js";

const demonios = {
    distracao: {
        name: "distracao",
        titulo: "O Senhor da Distração Infinita",
        descricao: "Ele se alimenta de atenção fragmentada. Vive nos intervalos, nos segundos “rápidos”, nos toques automáticos. Seu poder não está na força, mas na repetição. Cada vez que você cede, ele se fortalece… silenciosamente.",
        exemplo: "scroll infinito, vídeos curtos, abrir app sem motivo"
    },
    procrastinacao: {
        name: "procrastinacao",
        titulo: "O Devorador de Tempo",
        descricao: "Ele não destrói seu dia de uma vez — ele o dissolve. Transforma tarefas simples em montanhas e minutos em horas perdidas. Quando você percebe, já é tarde… e ele já se alimentou.",
        exemplo: "evitar tarefas importantes, “depois eu faço”"
    },
    prazerVazio: {
        name: "prazerVazio",
        titulo: "A Sombra do Prazer Vazio",
        descricao: "Ela não grita, ela convida. Oferece recompensa sem esforço, prazer sem conquista. Mas toda vez que você aceita, algo em você é drenado — foco, energia, vontade.",
        exemplo: "pornografia, estímulos fáceis em excesso"
    },
    conforto: {
        name: "conforto",
        titulo: "O Tirano do Conforto",
        descricao: "Ele te convence de que ficar onde está é suficiente. Que não vale a pena tentar. Que o esforço é desnecessário. Sob seu domínio, você não falha… mas também nunca evolui.",
        exemplo: "evitar treinar, estudar, sair da rotina confortável"
    },
    dispersao: {
        name: "dispersao",
        titulo: "O Fragmentador da Mente",
        descricao: "Ele não rouba seu tempo — ele o quebra em pedaços. Você começa tudo e termina nada. Pensamentos se sobrepõem, decisões se perdem. No fim, sobra apenas cansaço sem progresso.",
        exemplo: "abrir várias coisas ao mesmo tempo, não concluir tarefas"
    }
}

export async function paginaEclipse(main) {
    const statusCheckinHoje = await verificarCheckinHoje()

    if (statusCheckinHoje === false) {
        const btn = document.getElementById('jornada-button');

        console.error(statusCheckinHoje)
        btn.click()
        return
    }

    const app = document.getElementById('app');
    app.className = '';
    app.classList.add('app-eclipse');
    main.className = ''
    main.classList.add('dash-eclipse')
    main.innerHTML = '';

    main.innerHTML = `
        <div class="conteudo">
            <div class="modal-base hidden" id="modal_base"></div>
            <div class="app-corpo">
                <div class="cards-container">
                    <div class="card-demon distracao" id="distracao-div">
                        <span class="demon-title cinzel-decorative-black">Distração</span>
                        <div class="card-demon-image"><img src="./assets/pages/eclipse/demons/Distracao-demon.png" alt=""></div>
                    </div>
                    <div class="card-demon procrastinacao" id="procrastinacao-div">
                        <span class="demon-title cinzel-decorative-black">Procrastinação</span>
                        <div class="card-demon-image"><img src="./assets/pages/eclipse/demons/Procrastinacao-demon.png" alt=""></div>
                    </div>
                    <div class="card-demon prazerVazio" id="prazerVazio-div">
                        <span class="demon-title cinzel-decorative-black">Prazer Vazio</span>
                        <div class="card-demon-image"><img src="./assets/pages/eclipse/demons/PrazerVazio-demon.png" alt=""></div>
                    </div>
                    <div class="card-demon conforto" id="conforto-div">
                        <span class="demon-title cinzel-decorative-black">Conforto</span>
                        <div class="card-demon-image"><img src="./assets/pages/eclipse/demons/Conforto-demon.png" alt=""></div>
                    </div>
                    <div class="card-demon dispersao" id="dispersao-div">
                        <span class="demon-title cinzel-decorative-black">Dispersão</span>
                        <div class="card-demon-image"><img src="./assets/pages/eclipse/demons/Dispersao-demon.png" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="rodape">
                <div class="vertical">
                        <label for="proximo-button" id="proximo-label" class="proximo-label"><span class="cinzel-decorative-bold">O próximo pilar é a mente</span></label>
                        <button id="proximo-button" class="berserk-button"></button>
                </div>
            </div>
        </div>

    `

    const distracaoDiv = main.querySelector('#distracao-div')
    const procrastinacaoDiv = main.querySelector('#procrastinacao-div')
    const prazerVazioDiv = main.querySelector('#prazerVazio-div')
    const confortoDiv = main.querySelector('#conforto-div')
    const dispersaoDiv = main.querySelector('#dispersao-div')
    const modalBase = main.querySelector('#modal_base')
    const proximoBtn = main.querySelector('#proximo-button')


    proximoBtn.addEventListener('click', () => {
        const btn = document.getElementById('espada-button');

        btn.click()
    })
  
    distracaoDiv.addEventListener('click', () => {
        mostrarModal(modalBase, demonios.distracao)
    })
    
    
    procrastinacaoDiv.addEventListener('click', () => {
        mostrarModal(modalBase, demonios.procrastinacao)
    })
    
    
    prazerVazioDiv.addEventListener('click', () => {
        mostrarModal(modalBase, demonios.prazerVazio)
    })
    
    
    confortoDiv.addEventListener('click', () => {
        mostrarModal(modalBase, demonios.conforto)
    })
    
    
    dispersaoDiv.addEventListener('click', () => {
        mostrarModal(modalBase, demonios.dispersao)
    })

    
}