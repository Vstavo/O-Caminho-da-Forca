import { verificarCheckinHoje } from "../services/buscarDadosService.js";
import { buscarGoalsAtivos } from "../services/goalService.js";
import { mensagemPrimeiraVez } from "../utils/firstTimeMessage.js";

export async function paginaProposito(main) {
    const statusCheckinHoje = await verificarCheckinHoje()
    
    if (statusCheckinHoje === false) {
        const btn = document.getElementById('jornada-button');

        console.error(statusCheckinHoje)
        btn.click()
        return
    }

    const app = document.getElementById('app');
    app.className = '';
    app.classList.add('app-proposito');
    main.className = ''
    main.classList.add('dash-proposito')
    main.innerHTML = '';

    const goalAtivo = await buscarGoalsAtivos();

    if (!goalAtivo) {
        main.innerHTML = mensagemPrimeiraVez()
        return;
    }

    main.innerHTML = `
        ${goalAtivo.titulo}
    `;

}