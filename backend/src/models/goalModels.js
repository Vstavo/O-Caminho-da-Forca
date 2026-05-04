const database = require('../database/config')

async function buscarGoalAtivo(userId) {
    const instrucaoSQL = `
        SELECT g.*, gm.total_progress, gm.progress, gm.status FROM goals g JOIN goals_metrics gm ON g.id = gm.goal_id WHERE g.user_id = ${userId} AND gm.status = 'ativo' LIMIT 1
    `;

    return await database.executar(instrucaoSQL)
};

async function buscarGoalsCompletos(userId) {
    const instrucaoSQL = `
        SELECT g.*, gm.total_progress, gm.progress, gm.status FROM goals g JOIN goals_metrics gm ON g.id = gm.goal_id WHERE g.user_id = ${userId} AND gm.status = 'completo'
    `;

    return await database.executar(instrucaoSQL)
};

async function buscarGoalsGeral(userId) {
    const instrucaoSQL = `
        SELECT g.*, gm.total_progress, gm.progress, gm.status FROM goals g JOIN goals_metrics gm ON g.id = gm.goal_id WHERE g.user_id = ${userId} LIMIT 1
    `;

    return await database.executar(instrucaoSQL)
};

async function criarGoal(userId, titulo, descricao, totalProgresso) {
    const conexao = await database.pool.getConnection();

    try {

        await conexao.beginTransaction();

        const [goalResult] = await conexao.query(
            `INSERT INTO goals (user_id, title, description) VALUES (?, ?, ?)`,
            
            [userId, titulo, descricao]
        );

        const goalId = goalResult.insertId;

        const [goalMetricsResult] = await conexao.query(
            `INSERT INTO goals_metrics (goal_id, total_progress) VALUES (?, ?)`,

            [goalId, totalProgresso || 30]
        );

        await conexao.commit();

        return { goalId };

    } catch (erro) {
        await conexao.rollback();
        throw erro;
    } finally {
        conexao.release();
    };
};

async function checkinGoal(goalId) {
    const conexao = await database.pool.getConnection();

    try {

        await conexao.beginTransaction()    

        const [checkinResult] = await conexao.query(
            `UPDATE goals_metrics SET progress = progress + progress_points WHERE goal_id = ?`,
            [goalId]
        );

        const [updateDateLog] = await conexao.query(
            `UPDATE goals SET last_update = CURDATE() WHERE id = ? AND last_update < CURDATE()`,
            [goalId]
        )

        await conexao.commit()

        return checkinResult;

    } catch (erro) {
        await conexao.rollback()
        throw erro
    } finally {
        conexao.release()
    };
};

async function completarGoal(goalId) {
    const conexao = await database.pool.getConnection()

    try {

        const [completeResult] = await conexao.query(
            `UPDATE goals_metrics SET status = 'completo' WHERE goal_id = ?`,
            [goalId]
        );

        return completeResult

    } catch (error) {
        throw error        
    } finally {
        await conexao.release()
    }
}

module.exports = {
    buscarGoalAtivo,
    buscarGoalsCompletos,
    buscarGoalsGeral,
    criarGoal,
    checkinGoal,
    completarGoal
};