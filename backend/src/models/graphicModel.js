const database = require('../database/config')

function buscarNivelUsuario (email) {
    const instrucaoSql = `
        SELECT SUM(amount) FROM xp_logs WHERE email = '${email}'
    `;

    return database.executar(instrucaoSql)
}

module.exports = {
    buscarNivelUsuario
}