const database = require('../database/config');

function marcarDiaConcluido(userId, streakAtual = 0, melhorStreak = 0, data = 'CURDATE()') {
    const instrucaoSQL = `
        INSERT INTO streaks (user_id, current_streak, best_streak, last_checkin_date)
        VALUES (${userId}, ${streakAtual}, ${melhorStreak}, ${data})
        ON DUPLICATE KEY UPDATE
            current_streak = VALUES(current_streak),
            best_streak = VALUES(best_streak),
            last_checkin_date = VALUES(last_checkin_date);
    `;

    return database.executar(instrucaoSQL);
};

function buscarStreak(userId) {
    const instrucaoSQL = `
        SELECT best_streak, current_streak, last_checkin_date FROM streaks where user_id = ${userId};
    `;

    return database.executar(instrucaoSQL);
};

function adicionarXp(userId, quantidade, fonte, data) {
    const instrucaoSQL = `
        INSERT INTO xp_logs (user_id, amount, source, created_at) VALUES (${userId}, ${quantidade}, '${fonte}', '${data}');
    `;

    return database.executar(instrucaoSQL)
};



module.exports = {
    marcarDiaConcluido,
    buscarStreak,
    adicionarXp
};