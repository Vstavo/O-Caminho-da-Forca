export async function cadastrarUsuario(email, senha, nome) {
    try {
        const response = await fetch('http://localhost:8080/usuarios/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha,
                nomeServer: nome
            })
        })

        if(response.ok) {
            console.log("Usuário cadastrado");
            window.location = 'login.html'
        }
    } catch (error) {
        console.error("Erro no cadastro", error)
    }
}