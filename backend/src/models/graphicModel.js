const database = require('../database/config')

function buscarNivelUsuario (email) {
    const instrucaoSql = `
        SELECT nivel FROM usuarios WHERE email = '${email}'
    `;

    return database.executar(instrucaoSql)
}

module.exports = {
    buscarNivelUsuario
}