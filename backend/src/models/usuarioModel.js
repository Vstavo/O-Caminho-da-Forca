const database = require('../database/config');

function autenticarUsuario(email, senha) {
    const instrucaoSql = `
        SELECT id, name, email, password FROM users where email = '${email}' AND password = '${senha}'
    `;

    return database.executar(instrucaoSql)
};

function cadastrarUsuario(email, senha, nome) {
    const instrucaoSql = `
        INSERT INTO users(name, email, password) VALUES ('${nome}', '${email}', '${senha}')
    `;

    return database.executar(instrucaoSql)
}

function buscarDadosUsuario (userId) {
    const instrucaoSql = `
        SELECT name FROM users WHERE id = '${userId}'
    `;

    return database.executar(instrucaoSql)
}

module.exports = {
    autenticarUsuario,
    cadastrarUsuario,
    buscarDadosUsuario
}