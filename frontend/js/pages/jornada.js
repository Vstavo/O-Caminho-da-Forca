import { marcarDia } from "../services/sequenciaService.js";

export function paginaJornada(main) {
    const app = document.getElementById('app');
    app.className = '';
    app.classList.add('app-jornada');
    main.className = '';
    main.classList.add('dash-jornada');

    main.innerHTML = `
        <div class="conteudo">
            <div class="cima">
                <div class="cabecalhos">
                    <h1 class="cinzel-decorative-black">Em busca do One Piece</h1>
                </div>
                <div class="corpo" >
                </div>
            </div>
            <div class="baixo-content-jornada">
                <div class="container-mensagem">
                    <h2 class="titulo-mensagem cinzel-decorative-black modal-selection">Siga o SEU One Piece</h2>
                    <p class="corpo-mensagem medievalsharp-regular modal-selection">O <span class="medievalsharp-regular corpo-mensagem-destaque modal-selection">One Piece</span> é a maior motivação para piratas arriscarem suas vidas no mar em busca de aventuras, toda mudança começa com um <span class="medievalsharp-regular corpo-mensagem-destaque modal-selection">motivo para agir</span>, daí vem o nome motivação!</p>
                    <p class="corpo-mensagem medievalsharp-regular modal-selection">Se você tem um <span class="medievalsharp-regular corpo-mensagem-destaque modal-selection">motivo para seguir em frente</span>, então vá agora e <span class="medievalsharp-regular corpo-mensagem-destaque-red modal-selection">seus demônios</span></p>
                </div>

                <div class="vertical">
                    <label for="comecar-button" id="comecar-label" class="comecar-label"><span class="cinzel-decorative-bold">Tenho um motivo para seguir</span></label>
                    <button id="comecar-button" class="berserk-button"></button>
                </div>
            </div>
        </div>
    `

    const sequenciaBtn = main.querySelector('#comecar-button');

    sequenciaBtn.addEventListener('click', () => {
        marcarDia();
        const btn = document.getElementById('eclipse-button')
        setTimeout(() => {
            btn.click()
        }, 1000)
    })
}