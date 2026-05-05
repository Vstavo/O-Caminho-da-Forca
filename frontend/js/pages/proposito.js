import { verificarCheckinHoje } from "../services/buscarDadosService.js";
import { buscarGoalsAtivos, checkinGoal } from "../services/goalService.js";
import { semGoalsModal, criarGoalModal, carregarPagina } from "../utils/goalFunctions.js";

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

    carregarPagina(main)
}