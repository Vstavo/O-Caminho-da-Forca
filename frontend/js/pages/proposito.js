import { verificarCheckinHoje } from "../services/buscarDadosService.js";

export async function paginaProposito(main) {
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
    app.classList.add('app-proposito');
    main.className = ''
    main.classList.add('dash-proposito')
    main.innerHTML = '';
}