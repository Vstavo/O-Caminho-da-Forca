const goalModels = require('../models/goalModels')
const sistemaModels = require('../models/sistemaModels')

async function criarGoal(req, res) {
    const userId = req.usuario.userId;
    const {titulo, descricao, totalProgresso} = req.body;

    try {
        const verificarGoalExistente = await goalModels.buscarGoalAtivo(userId);

        if (verificarGoalExistente.length > 0 && verificarGoalExistente[0].status === 'ativo') {
            return res.status(400).json({ erro: `Não foi possível criar o objetivo pois o usuario tem um objetivo não concluído`})
        };

        const dia = new Date();
        dia.setHours(0, 0, 0, 0);

        const hoje = dia.toISOString().slice(0, 10)

        await goalModels.criarGoal(userId, titulo, descricao, totalProgresso);
        await sistemaModels.adicionarXp(userId, 30, 'goal_criado', hoje)

        return res.status(201).json({ mensagem: "Objetivo criado com sucesso", xp: 30});

    } catch (error) {
        console.log("Erro: ", error)
        res.status(500).json({ erro: error.sqlMessage})
    };
};

async function checkinGoal(req, res) {
    const userId = req.usuario.userId;

    try {
        const verificarGoalExistente = await goalModels.buscarGoalAtivo(userId);

        if(verificarGoalExistente.length <= 0) {
            return res.status(400).json({ erro: "Nenhum objetivo ativo"})
        }

        const dia = new Date();
        dia.setHours(0, 0, 0, 0);

        const ultimoCheckin = verificarGoalExistente[0].last_update;

        if (ultimoCheckin) {

            const ultimo = new Date(ultimoCheckin);
            ultimo.setHours(0, 0, 0, 0);

            const diffTempo = dia - ultimo;
            const diffDias = diffTempo / (1000 * 60 * 60 * 24);
            
            if (diffDias === 0) {
                return res.status(400).json("Checkin já feito hoje");
            }
        }

        const hoje = dia.toISOString().slice(0, 10)

        const goalId = verificarGoalExistente[0].id;


        await goalModels.checkinGoal(goalId)
        
        const goalNovo = await goalModels.buscarGoalAtivo(userId);
        
        if (goalNovo[0].progress >= goalNovo[0].total_progress) {
            await goalModels.completarGoal(goalId)
            await sistemaModels.adicionarXp(userId, 50, 'goal_completo', hoje)
            return res.status(200).json({ mensagem: "Objetivo completo", xp: 50})
        }
        
        await sistemaModels.adicionarXp(userId, 15, 'goal_checkin', hoje)
        return res.status(200).json({ mensagem: "Objetivo atualizado com sucesso", xp: 15})
    } catch (error) {
        console.log("Erro: ", error)
        res.status(500).json({ erro: error.sqlMessage})
    };
};

async function buscarGoals(req, res) {
    const userId = req.usuario.userId;

    try {
        const goalsAtivos = await goalModels.buscarGoalAtivo(userId);

        if (goalsAtivos.length <= 0) {
            return res.status(200).json({ mensagem: "Nenhum objetivo ativo", temAtivo: false})
        }

        const goalAtivo = goalsAtivos[0]

        res.status(200).json({ mensagem: "Há um objetivo ativo", temAtivo: true, goalAtivo })
    } catch (error) {
        console.log("Erro: ", error)
        res.status(500).json({ erro: error.sqlMessage })
    }
};

module.exports = {
    criarGoal,
    checkinGoal,
    buscarGoals
}