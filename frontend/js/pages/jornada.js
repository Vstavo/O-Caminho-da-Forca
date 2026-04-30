import { marcarDia } from "../services/sequenciaService.js";

export function paginaJornada(main) {
    console.log('Página carregada');
    main.className = '';
    main.classList.add('dash-jornada');

    main.innerHTML = `
        <div class="conteudo" >
            <div class="cabecalhos">
            <h1></h1>
            </div>
            <div class="corpo" >
                <button class="medievalsharp-regular metal-button" id="sequencia-button">Não vou Desistir</button>
            </div>
        </div>
    `

    const sequenciaBtn = main.querySelector('#sequencia-button');

    sequenciaBtn.addEventListener('click', () => {
        marcarDia()
    })
}