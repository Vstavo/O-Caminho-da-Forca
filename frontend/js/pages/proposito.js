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
    main.className = ''
    main.classList.add('proposito')
    main.innerHTML = '';
}