const sistemModel = require('../models/sistemaModels')

async function atualizarStreaks(req, res) {
    console.log("Streak iniciado")
    const userId = req.usuario.userId

    try {
        const resultado = await sistemModel.buscarStreak(userId)
        
        let streakAtual = 0;
        let melhorStreak = 0;
        let ultimoCheckin = null;
        let bonus = 0;
        let xp = 10;

        if (resultado.length > 0) {
            streakAtual = resultado[0].current_streak;
            melhorStreak = resultado[0].best_streak;
            ultimoCheckin = resultado[0].last_checkin_date;
        }
        
        
        const hoje = new Date();
        hoje.setHours(0,0,0,0);

        let diffDias = 999

        if (ultimoCheckin) {
            const ultimo = new Date(ultimoCheckin)
            ultimo.setHours(0,0,0,0)

            const diffTempo = hoje - ultimo

            diffDias = Math.floor(diffTempo / (1000 * 60 * 60 * 24))
            
        }
    
        if (diffDias === 0) {
            console.log(`O usuário de id = ${userId} já fez checkin hoje`)
            return res.status(200).json({ mensagem: "Já fez checkin hoje" })
        }
    
        if (diffDias === 1) {
            streakAtual += 1
            if (streakAtual % 3 === 0) {
                bonus = 15
            }
        } else {
            streakAtual = 1
        }
    
        if ( streakAtual > melhorStreak ) {
            melhorStreak = streakAtual
        }

        quantidadeXp = xp + bonus;

        const dataSQL = hoje.toISOString().slice(0, 10);
    
        await sistemModel.marcarDiaConcluido(userId, streakAtual, melhorStreak, `'${dataSQL}'`);
        res.status(200).json({ streakAtual, melhorStreak, dataSQL })

        await sistemModel.adicionarXp(userId, quantidadeXp, 'checkin', dataSQL)
        
    }catch (erro) {
        console.error(erro)
        res.status(500).json({ erro: erro.sqlMessage })
    }


}

async function buscarStreaks(req, res) {
    const userId = req.usuario.userId

    try {
        const resposta = await sistemModel.buscarStreak(userId)

        if (!resposta || resposta.length < 0) {
            console.error('Falha ao buscar streak')
            return res.status(401).json('Falha ao buscar streak')
        }

        let streakAtual = 0
        let melhorStreak = 0
        let ultimoCheckin = 0
        
        if (resposta.length > 0) {
            streakAtual = resposta[0].current_streak;
            melhorStreak = resposta[0].best_streak;
            ultimoCheckin = resposta[0].last_checkin_date;
        }

        const hoje = new Date();
        hoje.setHours(0,0,0,0);

        let diffDias = 999

        if (ultimoCheckin) {
            const ultimo = new Date(ultimoCheckin)
            ultimo.setHours(0,0,0,0)

            const diffTempo = hoje - ultimo

            diffDias = Math.floor(diffTempo / (1000 * 60 * 60 * 24))
            
        }
    
        if (diffDias === 0) {
            console.log(`O usuário de id = ${userId} fez checkin hoje`)
            return res.status(200).json({ status: "Fez checkin hoje", streakAtual, melhorStreak, ultimoCheckin })
        }

        return res.status(200).json({ status: "Não fez checkin", streakAtual, melhorStreak, ultimoCheckin})        
    } catch (erro) {
        console.error(erro)
        res.status(500).json({ erro: erro.sqlMessage })
    }
}

module.exports = {
    atualizarStreaks,
    buscarStreaks
}