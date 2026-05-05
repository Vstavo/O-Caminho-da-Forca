import { buscarNomeUsuario } from "./buscarDadosService.js";

export async function autenticarUsuario(email, senha) {
    if (email === "" || senha === "") return;

    try {
        const response = await fetch('http://localhost:8080/usuarios/autenticar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        });

        if (response.ok) {
            const json = await response.json()
            
            localStorage.setItem('token', json.token)
            return true
        } else {
            console.error("Falha na autenticação")
            return 0
        }
    } catch (error) {
        console.log("Erro na conexão com o servidor" ,error)
        return false
    }

};