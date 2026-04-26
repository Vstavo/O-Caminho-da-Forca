import { buscarNivelUsuario } from "./buscarDadosService.js";

export async function nivelUsuario() {
    const valorNivel = await buscarNivelUsuario();
    const nivel = valorNivel[0].nivel;

    return nivel
}