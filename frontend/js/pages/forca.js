import { getTitulo, getForca } from "../services/estagioService.js";
import { criarBarraProgesso } from "../utils/graphicModels.js";

export async function paginaForca(main) {
    console.log('Página carregada');
    main.innerHTML = '';
    main.className = '';
    main.classList.add('dash-geral');

    main.innerHTML = `
        <div class="conteudo">
            <div class="cabecalhos">
            <h1 class="cinzel-decorative-black">Estágio: <span class="medievalsharp-regular" id="estagio">1</span></h1>
            <h2 class="cinzel-decorative-black">Sequência: <span class="medievalsharp-regular" id="sequencia">0</span><span class="medievalsharp-regular"> dias</span></h2>
            </div>
            <div class="corpo">
            <div class="cima">
            <h1 class="cinzel-decorative-black">Nível de força: <span class="medievalsharp-regular" id="nivel-de-forca">0</span></h1>
                    <div class="progress-bar">
                        <canvas id="progress-bar-canvas" class="progress-bar-canvas"></canvas>
                    </div>
                    <div class="xp-total cinzel-decorative-bold hidden" id="xp-total">0/100</div>
                </div>
                <div class="baixo">

                </div>
            </div>
        </div>
    `;

    const progessBar = main.querySelector('.progress-bar');
    const xpModal = main.querySelector('#xp-total');

    progessBar.addEventListener('mouseenter', () => {
        xpModal.classList.toggle('hidden', false)
    });

    progessBar.addEventListener('mouseleave', () => {
        xpModal.classList.toggle('hidden', true)
    })

    main.querySelector('#estagio').textContent = await getTitulo();
    main.querySelector('#nivel-de-forca').textContent = await getForca();
    criarBarraProgesso(main)
}