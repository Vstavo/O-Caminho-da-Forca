const database = require('../database/config');

function autenticarUsuario(email, senha) {
    const instrucaoSql = `
        SELECT email, senha FROM usuarios where email = '${email}' AND senha = '${senha}'
    `;

    return database.executar(instrucaoSql)
};

function cadastrarUsuario(email, senha, nome) {
    const instrucaoSql = `
        INSERT INTO usuarios(email, senha, nome) VALUES ('${email}', '${senha}', '${nome}')
    `;

    return database.executar(instrucaoSql)
}

function buscarNomeUsuario (email) {
    const instrucaoSql = `
        SELECT nome FROM usuarios WHERE email = '${email}'
    `;

    return database.executar(instrucaoSql)
}

module.exports = {
    autenticarUsuario,
    cadastrarUsuario,
    buscarNomeUsuario
}