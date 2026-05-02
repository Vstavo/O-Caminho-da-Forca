import { verificarCheckinHoje } from "../services/buscarDadosService.js";

export async function paginaEspada(main) {
    const statusCheckinHoje = await verificarCheckinHoje()
    
    if (statusCheckinHoje === false) {
        const btn = document.getElementById('jornada-button');

        console.error(statusCheckinHoje)
        btn.click()
        return
    }

    console.log('Página carregada');
    const app = document.getElementById('app');
    app.className = '';
    app.classList.add('app-espada');
    main.className = ''
    main.classList.add('dash-espada')
    main.innerHTML = ''

    main.innerHTML = `
        <div class="conteudo-horizontal">
            <div class="esquerda">
            
            </div>
            <div class="direita">
            
            </div
        </div>
    `
}