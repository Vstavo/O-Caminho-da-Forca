const sistemModel = require('../models/sistemaModels')

async function atualizarStreaks(req, res) {
    console.log("Streak iniciado")
    const userId = req.usuario.userId

    try {
        const resultado = await sistemModel.buscarStreak(userId)
        
        let streakAtual = 0;
        let melhorStreak = 0;
        let ultimoCheckin = null

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
            return res.status(200).json({ mensagem: "Já fez checkin hoje" })
        }
    
        if (diffDias === 1) {
            streakAtual += 1
        } else {
            streakAtual = 1
        }
    
        if ( streakAtual > melhorStreak ) {
            melhorStreak = streakAtual
        }

        const dataSQL = hoje.toISOString().slice(0, 10);
    
        await sistemModel.marcarDiaConcluido(userId, streakAtual, melhorStreak, `'${dataSQL}'`);
        res.status(200).json({ streakAtual, melhorStreak })
        
    }catch (erro) {
        console.error(erro)
        res.status(500).json({ erro: erro.sqlMessage })
    }


}

module.exports = {
    atualizarStreaks
}