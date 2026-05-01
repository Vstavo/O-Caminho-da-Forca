export async function mostrarModal(container, demon) {
    container.innerHTML = '';
    container.classList.remove('hidden')
    container.innerHTML = `
        <div class="modal-container">
            <div class="modal-block">
                <div class="modal-close-button-container">
                    <button id="modal-close-button" class="modal-close-button"><img src="./assets/buttons/close-red.png" alt="Fechar"></button>
                </div>
                <div class="modal-title-container">
                    <h1 class="modal-title">${demon.titulo}</h1>
                </div>
                <div class="modal-descricao-container">
                    <h2 class="modal-descricao-title">Descrição:</h2>
                    <p class="modal-descricao-paragrafo">${demon.descricao}</p>
                </div>
                <div class="modal-exemplo-container">
                    <h2 class="modal-exemplo-title">Exemplo:</h2>
                    <p class="modal-exemplo-paragrafo">${demon.exemplo}</p>
                </div>
                <div class="modal-buttons-container">
                    <button class="modal-button resisti" id="resisti_btn">Resisti<button>
                    <button class="modal-button nao-enfrentei" id="nao_enfrentei_btn">Não Enfrentei<button>
                    <button class="modal-button cedi" id="cedi_btn">Cedi<button>
                </div>
            </div>
        </div>
    `;

    const fecharBtn = container.querySelector('#modal-close-button');

    fecharBtn.addEventListener('click', () => {
        container.innerHTML = '';
        container.classList.add('hidden')
    })
}