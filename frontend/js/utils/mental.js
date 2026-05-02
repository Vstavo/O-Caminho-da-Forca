import { buscarResumoSemanal } from "../services/buscarDadosService.js";

export async function mostrarResumoNaTela(main) {
    const estadoPlaceholder = main.querySelector('#kpi-title')
    const bloqueioPlaceholder = main.querySelector('#kpi-subtitle-bloqueio')
    const diasPlaceholder = main.querySelector('#kpi-subtitle-consistencia')
    const estadoData = main.querySelector('#ultimo-estado')
    const bloqueioData = main.querySelector('#ultimo-bloqueio')
    const diasData = main.querySelector('#dias-consecutivos')

    const resumo = await buscarResumoSemanal();

    const estado = resumo.estadoMaisfrequente;
    const bloqueio = resumo.piorBloqueio;
    const consistencia = resumo.consistencia;

    if (estado === null) {
        estadoPlaceholder.innerHTML = 'Você ainda não resgistrou seu estado mental esta semana';
        return
    }

    if (bloqueio !== null) {
        bloqueioPlaceholder.classList.remove('hidden');
    }

    diasPlaceholder.classList.remove('hidden');

    const mensagemEstado = `Você esteve majoritariamente <span class="cinzel-decorative-black corpo-mensagem-destaque-blue modal-selection" id="ultimo-estado">${estado}</span>`;
    const mensagemBloqueio = `Seu pior bloqueio é a <span class="cinzel-decorative-black corpo-mensagem-destaque-blue modal-selection" id="ultimo-bloqueio">${bloqueio}</span>`;
    const mensagemConsistencia = `Consistência: <span class="cinzel-decorative-black corpo-mensagem-destaque-blue modal-selection" id="dias-conseutivos">${consistencia}</span> dias consecutivos`;

    estadoPlaceholder.innerHTML = mensagemEstado;
    bloqueioPlaceholder.innerHTML = mensagemBloqueio;
    diasPlaceholder.innerHTML = mensagemConsistencia;
}