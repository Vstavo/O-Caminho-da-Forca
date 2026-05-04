const database = require('../database/config')

async function buscarNivelUsuario (userId) {
    const instrucaoSql = `
        SELECT SUM(amount) AS xp_total FROM xp_logs WHERE user_id = ${userId}
    `;

    return await database.executar(instrucaoSql)
}

module.exports = {
    buscarNivelUsuario
}