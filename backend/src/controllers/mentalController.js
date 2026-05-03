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

        const conclusao = {
            focado: "Você está no controle.",
            relaxado: "Relaxar não significa se conformar, continue em frente!",
            ansioso: {
                medo: "Você está antecipando riscos e evitando agir. Sua mente está tentando te proteger, mas está te paralisando.",
                
                inseguranca: "Você está duvidando de si antes mesmo de tentar. A batalha está sendo perdida na sua própria cabeça.",
                
                preguica: "Sua ansiedade está drenando sua energia, e o conforto virou uma fuga silenciosa.",
                
                distracao: "Você está sobrecarregado e fugindo do foco. Sua mente prefere escapar do que enfrentar.",
                
                luxuria: "Você está usando prazer imediato como anestesia para o desconforto interno."
            },
            distraido: {
                medo: "Você evita focar porque sabe o que precisa ser feito. A distração virou um escudo contra o desconforto.",
                
                inseguranca: "Você se dispersa porque não confia na própria capacidade de executar. Isso fragmenta sua ação.",
                
                preguica: "Você está escolhendo o caminho fácil repetidamente, e isso está diluindo seu progresso.",
                
                distracao: "Sua atenção está completamente fragmentada. Você está sendo controlado pelo ambiente, não por intenção.",
                
                luxuria: "Você está trocando construção por estímulo rápido. Cada distração está roubando sua consistência."
            }
        }

        const acoes = {
            medo: "Aja mesmo com medo.",
            inseguranca: "Confie mais na execução do que no pensamento.",
            preguica: "Comece pequeno, mas comece.",
            distracao: "Escolha uma única tarefa agora.",
            luxuria: "Troque prazer imediato por progresso."
        };

        const acao = piorBloqueio ? acoes[piorBloqueio] : null;
        const estado = conclusao[estadoMaisFrequente];
        let mensagemEstado;

        if (typeof estado === 'string') {
            mensagemEstado = estado;
        } else if (piorBloqueio && estado[piorBloqueio]) {
            mensagemEstado = estado[piorBloqueio];
        } else {
            mensagemEstado = "Observe seus padrões e retome o controle.";
        };

        res.status(200).json({ state: estadoMaisFrequente, conclusao: mensagemEstado, acao: acao, piorBloqueio: piorBloqueio, bloqueios })

    } catch(erro) {
        res.status(500).json({ erro: erro.sqlMessage })
    }
}

module.exports = {
    marcarEstado,
    buscarResumoSemanal
}