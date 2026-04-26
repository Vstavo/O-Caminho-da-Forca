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
            const nomeData = await buscarNomeUsuario(email);
            if (nomeData && nomeData.length > 0) {
                localStorage.setItem('nomeUsuario', nomeData[0].nome);
                localStorage.setItem('emailUsuario', email);
            }
            console.log("Sucesso", json)
            localStorage.setItem('logged', email)
            window.location = 'app.html';
        } else {
            console.error("Falha na autenticação")
        }
    } catch (error) {
        console.log("Erro na conexão com o servidor" ,error)
    }

};