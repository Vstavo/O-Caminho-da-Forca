import { buscarResumoSemanal } from "../services/buscarDadosService.js";

export async function mostrarResumoNaTela(main) {
    const estadoPlaceholder = main.querySelector('#kpi-title')
    const bloqueioPlaceholder = main.querySelector('#kpi-subtitle-bloqueio')
    // const diasPlaceholder = main.querySelector('#kpi-subtitle-consistencia')
    const estadoData = main.querySelector('#ultimo-estado')
    const bloqueioData = main.querySelector('#ultimo-bloqueio')
    // const diasData = main.querySelector('#dias-consecutivos')
    const conclusaoPlaceholder = main.querySelector('#conclusion-message')
    const acaoPlaceholder = main.querySelector('#conclusion-action')

    const resumo = await buscarResumoSemanal();

    const estado = resumo.estadoMaisfrequente;
    const bloqueio = resumo.piorBloqueio;
    const conclusao = resumo.conclusao;
    const acao = resumo.acao;
    // const consistencia = resumo.consistencia;

    if (estado === null) {
        estadoPlaceholder.innerHTML = 'Você ainda não resgistrou seu estado mental esta semana';
        return
    }

    if (bloqueio !== null) {
        bloqueioPlaceholder.classList.remove('hidden');
    }

    // diasPlaceholder.classList.remove('hidden');

    let estadoFormatado = '';
    let bloqueioFormatado = '';

    if (estado === 'distraido') {
        estadoFormatado = 'distraído'
    } else {
        estadoFormatado = estado
    }

    if (bloqueio === 'distracao') {
        bloqueioFormatado = 'distração';
    } else if (bloqueio === 'luxuria') {
        bloqueioFormatado = 'luxúria';
    } else if (bloqueio === 'preguica') {
        bloqueioFormatado = 'preguiça';
    } else if (bloqueio === 'inseguranca') {
        bloqueioFormatado = 'insegurança';
    } else {
        bloqueioFormatado = bloqueio;
    }

    const mensagemEstado = `Você esteve majoritariamente <span class="cinzel-decorative-black corpo-mensagem-destaque-blue modal-selection" id="ultimo-estado">${estadoFormatado}</span>`;
    const mensagemBloqueio = `Seu maior bloqueio é a <span class="cinzel-decorative-black corpo-mensagem-destaque-blue modal-selection" id="ultimo-bloqueio">${bloqueioFormatado}</span>`;
    // const mensagemConsistencia = `Consistência: <span class="cinzel-decorative-black corpo-mensagem-destaque-blue modal-selection" id="dias-conseutivos">${consistencia}</span> dias consecutivos`;

    estadoPlaceholder.innerHTML = mensagemEstado;
    bloqueioPlaceholder.innerHTML = mensagemBloqueio;
    conclusaoPlaceholder.innerHTML = `"${conclusao}"`;
    acaoPlaceholder.innerHTML = acao;
    // diasPlaceholder.innerHTML = mensagemConsistencia;
}