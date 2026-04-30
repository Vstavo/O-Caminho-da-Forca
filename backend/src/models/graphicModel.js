const database = require('../database/config')

function buscarNivelUsuario (userId) {
    const instrucaoSql = `
        SELECT SUM(amount) AS xp_total FROM xp_logs WHERE user_id = ${userId}
    `;

    return database.executar(instrucaoSql)
}

module.exports = {
    buscarNivelUsuario
}