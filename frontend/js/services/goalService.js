export async function buscarGoalsAtivos() {
    const token = localStorage.getItem('token');

    try {
        const resposta = await fetch('http://localhost:8080/goal/buscar', {
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
        })

        const data = await resposta.json()

        const goalsAtivos = data.temAtivo;

        const goal = data.goalAtivo;

        const dadosGoal = {
            titulo: goal.title,
            descricao: goal.description,
            progresso: goal.progress,
            necessario: goal.total_progress,
            status: goal.state
        }

        if (!resposta.ok) {
            console.log("Nenhum objetivo Ativo")
            return { temAtivo: false }
        }

        return dadosGoal
    } catch (error) {
        console.error("Erro ao buscar goals: ", error)
    }
}

export async function checkinGoal() {
    const token = localStorage.getItem('token');

    try {
        const resposta = await fetch('http://localhost:8080/goal/marcar', {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        });

        if(!resposta.ok) {
            console.error("Falha ao marcar goal como conluido", resposta.text())
        };

        const data = await resposta.json()

        console.log(data.xp)

        return data.xp

    } catch (error) {
        console.error("Erro ao marcar goal como concluido: ", error)
    };

};

export async function criarGoal(titulo, descricao, totalProgresso) {
    const token = localStorage.getItem('token');

    try {
        const resposta = await fetch('http://localhost:8080/goal/criar', {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo,
                descricao: descricao,
                totalProgresso: totalProgresso
            })
        });

        if(!resposta.ok) {
            console.error("Falha ao criar goal: ", resposta.text())
            return false
        }

        const data = await resposta.json()

        console.log(data.xp)

        return data.xp;
    } catch (error) {
        console.error("Erro ao criar goal: ", error)
        return false
    }
}