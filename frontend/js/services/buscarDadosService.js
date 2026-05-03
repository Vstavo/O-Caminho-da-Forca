export async function buscarNomeUsuario() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:8080/usuarios/nome`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar nome')
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erro ao buscar nome', error)
        return null;
    }
}

export async function buscarXpUsuario() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:8080/graphics/nivel`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Falha ao buscar nível')
        }

        const data = await response.json()
        return data;
    } catch (error) {
        console.error('Erro ao buscar nível', error)
        return null
    }
}

export async function verificarCheckinHoje() {
    const token = localStorage.getItem('token')

    try {
        const response = await fetch(`http://localhost:8080/streak/buscar`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Falha ao buscar ultimo checkin')
        }

        const data = await response.json()
        return await data.fezCheckin;
    } catch (error) {
        console.error('Erro ao buscar ultimo checkin', error)
        return null
    }
}

export async function buscarResumoSemanal() {
    const token = localStorage.getItem('token')

    try {

        const resposta = await fetch('http://localhost:8080/mental/resumo', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        const data = await resposta.json();

        const resumoSemanal = {
            estadoMaisfrequente : data.state ? data.state : null,
            piorBloqueio : data.piorBloqueio ? data.piorBloqueio : null,
            bloqueios : data.bloqueios,
            conclusao: data.conclusao,
            acao: data.acao
        }

        return resumoSemanal

    } catch(error) {
        console.error('Erro ao buscar resumo semanal', error)
        return null
    }
}