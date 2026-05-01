export async function marcarDemonio(demon, status) {
    const token = localStorage.getItem('token');

    try {
        const resposta = await fetch('http://localhost:8080/marcar/demon', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                demon: demon,
                status: status
            })
        })

        if(!resposta.ok) {
            throw new Error("Falha ao marcar demonio")
        }

        const data = await resposta.json()

        return data
    } catch (erro) {
        console.error("Erro ao marcar demonio", erro)
    }
}