const mentalModels = require('../models/mentalModels')
const sistemModel = require('../models/sistemaModels')

async function marcarEstado(req, res) {
    const userId = req.usuario.userId;
    const { state, blocker} = req.body;

    const hoje = new Date().toISOString().slice(0, 10);

    try{

        const estadoSemBloqueio = ['focado', 'relaxado'];

        if (state !== "focado" && state !== "distraido" && state !== "ansioso" && state !== "relaxado" ) {
            return res.status(400).json({ erro: "Estado inválido" })
        }

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

async function buscarResumoSemanal(req, res) {
    const userId = req.usuario.userId
    
    try {

        const respostaBloqueio = await mentalModels.quantidadeCadaBloqueio(userId)
        const respostaEstado = await mentalModels.estadoMaisFrequente(userId)

        if (respostaEstado.length === 0) {
            return res.status(404).json('Nenhum registro encontrado')
        }

        const estadoMaisFrequente = respostaEstado[0].state;

        const bloqueios = {
            medo: 0,
            inseguranca: 0,
            preguica: 0,
            distracao: 0,
            luxuria: 0
        };

        let piorBloqueio = null;

        if (respostaBloqueio.length > 0) {
            piorBloqueio = respostaBloqueio[0].blocker;
        }

        if (respostaBloqueio.length > 0) {
            for(let i = 0; i < respostaBloqueio.length; i++) {
                const bloqueioMudado = respostaBloqueio[i]

                bloqueios[bloqueioMudado.blocker] = bloqueioMudado.quantidade_blocker;
            };
        };


        res.status(200).json({ state: estadoMaisFrequente, piorBloqueio: piorBloqueio, bloqueios })

    } catch(erro) {
        res.status(500).json({ erro: erro.sqlMessage })
    }
}

module.exports = {
    marcarEstado,
    buscarResumoSemanal
}