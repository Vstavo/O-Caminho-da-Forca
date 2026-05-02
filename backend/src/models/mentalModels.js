const database = require('../database/config')

function marcarEstadoMental(userId, data, estado, bloqueio) {
    const instrucaoSQL = `
        INSERT INTO mental_logs (user_id, log_date, state, blocker) VALUES (${userId}, '${data}', '${estado}', '${bloqueio}')
        ON DUPLICATE KEY UPDATE state = VALUES(state), blocker = VALUES(blocker)
    `;

    return database.executar(instrucaoSQL);
};

function buscarEstadoMentalHoje(userId, data) {
    const instrucaoSQL = `
        SELECT * FROM mental_logs WHERE user_id = ${userId} AND log_date = '${data}'
    `;

    return database.executar(instrucaoSQL)
}

function contarEstados(userId) {
    
}

module.exports = {
    marcarEstadoMental,
    buscarEstadoMentalHoje
};