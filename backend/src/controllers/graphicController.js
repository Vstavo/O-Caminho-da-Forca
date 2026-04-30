const graphicModel = require('../models/graphicModel')

function buscarNivel(req, res){
    const userId = req.usuario.userId

    graphicModel.buscarNivelUsuario(userId)
    .then(
        function(resultadoNivel) {
            if(resultadoNivel.length > 0) {
                console.log('Nível do usuário encontrado');
                res.status(200).json(resultadoNivel)
            } else {
                res.status(400).json({ mensagem: 'Erro ao buscar nível' })
            }
        }
    ).catch(
        function(erro) {
            console.error(erro)
            res.status(500).json({ erro: erro.sqlMessage })
        }
    )
}

module.exports = {
    buscarNivel
}