const demonModels = require('../models/demonModels')

async function marcarDemonio(req, res) {
    const userId = req.usuario.userId;
    const { demon, status } = req.body

    console.log(req.body)

    const hoje = new Date().toISOString().slice(0, 10);

    const tabelaXp = {
        resisted: 15,
        failed: -10,
        skipped: 0
    }

    const novoXp = tabelaXp[status]

    try {
        const registro = await demonModels.buscarDemonioHoje(userId, demon, hoje)

        let xpFinal = novoXp;

        if (registro.length > 0) {
            const xpAnterior = registro[0].xp

            xpFinal = novoXp - xpAnterior;
        }

        await demonModels.marcarDemonio(userId, demon, status, novoXp, hoje);

        if (xpFinal !== 0) {
            await demonModels.adicionarXp(userId, xpFinal, 'demon', hoje)
        }

        res.status(200).json({ demon, status, xp: novoXp })
    } catch (erro) {
        console.error(erro)
        res.status(500).json({ erro: erro.sqlMessage })
    }
}

module.exports = {
    marcarDemonio
}