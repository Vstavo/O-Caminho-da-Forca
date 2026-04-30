import { buscarXpUsuario } from "./buscarDadosService.js";

export async function nivelUsuario() {
    const valorNivel = await buscarXpUsuario();
    const nivel = (valorNivel[0].xp_total) / 100;

    return parseInt(nivel)
}

export async function barraProgresso() {
    const valorNivel = await buscarXpUsuario();
    const nivel = (valorNivel[0].xp_total) / 100;

    const progresso = valorNivel[0].xp_total - (parseInt(nivel) * 100)

    return progresso;
}