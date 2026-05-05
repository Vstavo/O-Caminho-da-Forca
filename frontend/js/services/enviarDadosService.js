export async function marcarDemonio(demon, status) {
    const token = localStorage.getItem('token');

    try {
        const resposta = await fetch('http://localhost:8080/demon/marcar', {
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

export async function marcarEstado(estado, bloqueio) {
    const token = localStorage.getItem('token');

    let blockerNull = null

    if (bloqueio === "NULL") {bloqueio = blockerNull}
    if (estado !== "focado" && estado !== "distraido" && estado !== "ansioso" && estado !== "relaxado" ) {
        return null
    }

    try {
        const resposta = await fetch('http://localhost:8080/mental/marcar', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                state: estado,
                blocker: bloqueio
            })
        })

        const data = await resposta.json()

        return data.xp
    } catch(erro) {
        console.error("Erro ao marcar estado", erro)
    }
}