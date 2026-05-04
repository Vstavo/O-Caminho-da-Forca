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

module.exports = {
    autenticarUsuario,
    cadastrarUsuario,
    buscarNomeUsuario
}