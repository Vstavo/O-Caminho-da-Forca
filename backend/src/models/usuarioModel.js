const database = require('../database/config');

async function autenticarUsuario(email, senha) {
    const instrucaoSql = `
        SELECT id, name, email, password FROM users where email = '${email}' AND password = '${senha}'
    `;

    return await database.executar(instrucaoSql)
};

async function cadastrarUsuario(email, senha, nome) {
    const instrucaoSql = `
        INSERT INTO users(name, email, password) VALUES ('${nome}', '${email}', '${senha}')
    `;

    return await database.executar(instrucaoSql)
}

async function buscarNomeUsuario (userId) {
    const instrucaoSql = `
        SELECT name FROM users WHERE id = '${userId}'
    `;

    return await database.executar(instrucaoSql)
}

async function alterarFotoPerfil(userId, foto) {
    const conexao = await database.pool.getConnection();

    try {
        const [alterarResult] = await conexao.query(
            `UPDATE users SET photo_perfil = ? where id = ?`,
            [foto, userId]
        )

        return alterarResult;
    } catch (error) {
        throw error;
    } finally {
        await conexao.release();
    };
};

async function bucarDadosUsuario(userId) {
    const conexao = await database.pool.getConnection();

    try {
        const [buscaResult] = await conexao.query(
            `SELECT name, perfil_photo FROM users WHERE id = ?`,
            [userId]
        );

        return buscaResult
    } catch (error) {
        throw error
    } finally {
        await conexao.release();
    }
}

module.exports = {
    autenticarUsuario,
    cadastrarUsuario,
    buscarNomeUsuario,
    alterarFotoPerfil,
    bucarDadosUsuario
}