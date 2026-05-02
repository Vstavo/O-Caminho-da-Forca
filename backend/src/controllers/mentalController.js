const mentalModels = require('../models/mentalModels')
const sistemModel = require('../models/sistemaModels')

async function marcarEstado(req, res) {
    const userId = req.usuario.userId;
    const { state, blocker} = req.body;

    const hoje = new Date().toISOString().slice(0, 10);

    try{

        const estadoSemBloqueio = ['focused', 'relaxed'];

        if(!estadoSemBloqueio.includes(state) && !blocker) {
            return res.status(400).json({ erro: "Bloqueio obrigatório para este estado"});
        }

        const resultadoData = await mentalModels.buscarEstadoMentalHoje(userId, hoje)

        let atualizar = false;

        let xp = 10;

        if (resultadoData.length > 0) {
            xp = 0;
            atualizar = true;
        }

        await mentalModels.marcarEstadoMental(userId, hoje, state, blocker)

        if (!atualizar) {
            await sistemModel.adicionarXp(userId, xp, 'mental', hoje)
        }

        res.status(200).json({ state, blocker, xp })

    } catch(erro) {
        console.log(erro)
        res.status(500).json({ erro: erro.sqlMessage})
    }
}

module.exports = {
    marcarEstado
}