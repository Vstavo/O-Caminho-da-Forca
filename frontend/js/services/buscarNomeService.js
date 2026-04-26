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