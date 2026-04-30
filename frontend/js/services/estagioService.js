import { nivelUsuario } from "./graphicService.js";

export async function getTitulo() {
    const estagio = await nivelUsuario();

    if (estagio < 5) return (`Iniciante`)
    if (estagio < 10) return (`Discípulo`)
    if (estagio < 20) return (`Guerreiro`)
    if (estagio < 40) return (`Forjado`)
    return (`Inabalável`)
}

export async function getForca() {
    const estagio = await nivelUsuario();

    return estagio;
}