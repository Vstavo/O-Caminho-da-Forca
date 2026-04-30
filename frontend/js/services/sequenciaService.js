export async function marcarDia() {
    console.log("clicou no botão");
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:8080/marcar/dia', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok){
            throw new Error('Falha ao marcar dia')
        }

        return await response.json()

    }catch(error){
        console.error("Erro ao marcar dia", error)
        return null
    }
}