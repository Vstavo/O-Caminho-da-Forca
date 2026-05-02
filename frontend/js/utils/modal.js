import { marcarDemonio } from "../services/enviarDadosService.js";

export function mostrarModalDemon(container, demon) {
    container.innerHTML = '';
    container.classList.remove('hidden')
    container.innerHTML = `
        <div class="modal-container">
            <div class="modal-block">
                <div class="modal-close-button-container">
                    <button id="modal-close-button" class="modal-close-button"><img src="./assets/buttons/close-red.png" alt="Fechar"></button>
                </div>
                <div class="modal-title-container">
                    <h1 class="modal-title cinzel-decorative-black modal-selection">${demon.titulo}</h1>
                </div>
                <div class="modal-descricao-container">
                    <h2 class="modal-descricao-title cinzel-decorative-bold modal-selection">Descrição:</h2>
                    <p class="modal-descricao-paragrafo medievalsharp-regular modal-selection">${demon.descricao}</p>
                </div>
                <div class="modal-exemplo-container">
                    <h2 class="modal-exemplo-title cinzel-decorative-bold modal-selection">Exemplo:</h2>
                    <p class="modal-exemplo-paragrafo medievalsharp-regular corpo-mensagem-destaque-red modal-selection">${demon.exemplo}</p>
                </div>
                <div class="modal-buttons-container">
                    <button class="modal-button resisti medievalsharp-regular" id="resisti_btn">Resisti</button>
                    <button class="modal-button nao-enfrentei medievalsharp-regular" id="nao_enfrentei_btn">Não Enfrentei</button>
                    <button class="modal-button cedi medievalsharp-regular" id="cedi_btn">Cedi</button>
                </div>
            </div>
        </div>
    `;

    const fecharBtn = container.querySelector('#modal-close-button');
    const resistiBtn = container.querySelector('#resisti_btn');
    const naoEnfrenteiBtn = container.querySelector('#nao_enfrentei_btn');
    const cediBtn = container.querySelector('#cedi_btn');

    container.addEventListener('click', (e) => {
        if (e.target === container) { fecharBtn.click()}
    })

    resistiBtn.addEventListener('click', () => {
        marcarDemonio(demon.name, "resisted")
        fecharBtn.click()
    })

    naoEnfrenteiBtn.addEventListener('click', () => {
        marcarDemonio(demon.name, "skipped")
        fecharBtn.click()
    })

    cediBtn.addEventListener('click', () => {
        marcarDemonio(demon.name, "failed")
        fecharBtn.click()
    })

    fecharBtn.addEventListener('click', () => {
        container.innerHTML = '';
        container.classList.add('hidden')
    })
}

export function mostrarModal() {}