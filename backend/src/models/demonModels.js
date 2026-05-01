const database = require('../database/config')

function buscarDemonioHoje(userId, demon, data) {
    const instrucaoSQL = `
        SELECT xp FROM demon_logs WHERE user_id = ${userId} AND demon = '${demon}' AND log_date = '${data}'
    `;

    return database.executar(instrucaoSQL)
}

function marcarDemonio(userId, demon, status, xp, data) {
    const instrucaoSQL = `
        INSERT INTO demon_logs (user_id, demon, status, xp, log_date) VALUES (${userId}, '${demon}', '${status}', ${xp}, '${data}')
        ON DUPLICATE KEY UPDATE status = VALUES(status), xp = VALUES(xp)
    `;

    database.executar(instrucaoSQL)
}

module.exports = {
    buscarDemonioHoje,
    marcarDemonio
}