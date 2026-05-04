const database = require('../database/config')

async function buscarDemonioHoje(userId, demon, data) {
    const instrucaoSQL = `
        SELECT xp FROM demon_logs WHERE user_id = ${userId} AND demon = '${demon}' AND log_date = '${data}'
    `;

    return await database.executar(instrucaoSQL)
}

async function marcarDemonio(userId, demon, status, xp, data) {
    const instrucaoSQL = `
        INSERT INTO demon_logs (user_id, demon, status, xp, log_date) VALUES (${userId}, '${demon}', '${status}', ${xp}, '${data}')
        ON DUPLICATE KEY UPDATE status = VALUES(status), xp = VALUES(xp)
    `;

    return await database.executar(instrucaoSQL)
}

module.exports = {
    buscarDemonioHoje,
    marcarDemonio
}