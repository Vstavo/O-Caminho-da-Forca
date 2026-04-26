export async function buscarNomeUsuario(email) {
    try {
        const response = await fetch(`http://localhost:8080/usuarios/email?email=${encodeURIComponent(email)}`);

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

export async function buscarNivelUsuario() {
    const email = localStorage.getItem('emailUsuario') || '0';

    try {
        const response = await fetch(`http://localhost:8080/graphics/nivel?email=${encodeURIComponent(email)}`)

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