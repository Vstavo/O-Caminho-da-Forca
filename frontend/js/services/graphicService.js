import { buscarXpUsuario } from "./buscarDadosService.js";

export async function nivelUsuario() {
    const valorNivel = await buscarXpUsuario();
    const nivel = (valorNivel[0].nivel) / 100;

    return parseInt(nivel)
}