import { criarBarraProgesso } from "../utils/graphicModels.js";

export function paginaForca(main) {
    console.log('Página carregada');
    main.innerHTML = '';
    main.className = '';
    main.classList.add('dash-geral');

    main.innerHTML = `
        <div class="conteudo">
            <div class="cabecalhos">
                <h1>Nível de força: <span id="nivel-de-forca">0</span></h1>
                <h2>Sequência: <span id="sequencia">0</span><span> dias</span></h2>
            </div>
            <div class="corpo">
                <div class="progress-bar">
                    <canvas id="progress-bar-canvas" class="progress-bar-canvas"></canvas>
                </div>
            </div>
        </div>
    `;

    criarBarraProgesso(50, main)
}