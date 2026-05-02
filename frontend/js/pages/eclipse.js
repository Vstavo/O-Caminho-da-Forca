import { verificarCheckinHoje } from "../services/buscarDadosService.js";
import { mostrarModalDemon } from "../utils/modal.js";
import { demonios } from "../utils/demons.js";


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
        mostrarModalDemon(modalBase, demonios.distracao)
    })
    
    
    procrastinacaoDiv.addEventListener('click', () => {
        mostrarModalDemon(modalBase, demonios.procrastinacao)
    })
    
    
    prazerVazioDiv.addEventListener('click', () => {
        mostrarModalDemon(modalBase, demonios.prazerVazio)
    })
    
    
    confortoDiv.addEventListener('click', () => {
        mostrarModalDemon(modalBase, demonios.conforto)
    })
    
    
    dispersaoDiv.addEventListener('click', () => {
        mostrarModalDemon(modalBase, demonios.dispersao)
    })

    
}