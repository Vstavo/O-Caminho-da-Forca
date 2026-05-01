import { verificarCheckinHoje } from "../services/buscarDadosService.js";

export async function paginaEclipse(main) {
    const statusCheckinHoje = await verificarCheckinHoje()

    if (statusCheckinHoje === "Não fez checkin hoje") {
        const btn = document.getElementById('jornada-button');

        console.error(statusCheckinHoje)
        btn.click()
        return
    }

    const app = document.getElementById('app');
    app.className = '';
    app.classList.add('app-eclipse');
    main.className = ''
    main.classList.add('dash-eclipse')
    main.innerHTML = '';
}