const database = require('../database/config')

async function marcarEstadoMental(userId, data, estado, bloqueio) {
    const instrucaoSQL = `
        INSERT INTO mental_logs (user_id, log_date, state, blocker) VALUES (${userId}, '${data}', '${estado}', ${bloqueio ? `'${bloqueio}'` : 'NULL'})
        ON DUPLICATE KEY UPDATE state = VALUES(state), blocker = VALUES(blocker)
    `;

    return await database.executar(instrucaoSQL);
};

async function buscarEstadoMentalHoje(userId, data) {
    const instrucaoSQL = `
        SELECT * FROM mental_logs WHERE user_id = ${userId} AND log_date = '${data}'
    `;

    return await database.executar(instrucaoSQL)
}

async function estadoResumoSemanal(userId) {
    const instrucaoSQL = `
        SELECT (SELECT state FROM mental_logs WHERE user_id = ${userId} ORDER BY log_date DESC LIMIT 1) as state, (SELECT blocker FROM mental_logs WHERE user_id = ${userId} ORDER BY log_date DESC LIMIT 1) as blocker, (SELECT COUNT(*) FROM mental_logs WHERE user_id = ${userId} AND log_date >= CURDATE() - INTERVAL 7 DAY) as consistencia;
    `;
    return await database.executar(instrucaoSQL)
}

async function quantidadeCadaBloqueio(userId) {
    const instrucaoSQL = `
        SELECT blocker, COUNT(blocker) as quantidade_blocker FROM mental_logs WHERE user_id = '${userId}' AND blocker IS NOT NULL AND log_date >= CURDATE() - INTERVAL 7 DAY GROUP BY blocker ORDER BY quantidade_blocker DESC;
    `;

    return await database.executar(instrucaoSQL)
}

async function estadoMaisFrequente(userId) {
    const instrucaoSQL = `
        SELECT state, COUNT(state) as quantidade_state FROM mental_logs WHERE user_id = '${userId}' AND log_date >= CURDATE() - INTERVAL 7 DAY GROUP BY state ORDER BY quantidade_state DESC, MAX(log_date) DESC;
    `;

    return await database.executar(instrucaoSQL)
}

module.exports = {
    marcarEstadoMental,
    buscarEstadoMentalHoje,
    estadoResumoSemanal,
    quantidadeCadaBloqueio,
    estadoMaisFrequente
};