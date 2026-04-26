const usuarioModel = require('../models/usuarioModel')

function autenticarUsuario(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    usuarioModel.autenticarUsuario(email, senha)
    .then(
        function (resultadoAutenticar){
            if (resultadoAutenticar.length === 1){
                console.log('Usuário encontrado')
                res.status(200).json(resultadoAutenticar)
            } else {
                console.log('Email e/ou senha inválidos!')
                res.status(401).json(resultadoAutenticar)
            }
        }
    ).catch(
        function (erro) {
            console.log(erro)
            res.status(500, erro.sqlMessage)
        }
    )
};

function cadastrarUsuario(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;
    const nome = req.body.nomeServer;

    usuarioModel.cadastrarUsuario(email, senha, nome)
    .then(
        function (resultadoAutenticar){
            if (resultadoAutenticar) {
                console.log('Usuário cadastrado');
                res.status(201).json(resultadoAutenticar)
            } else {
                console.log('Erro ao cadastrar usuário')
            }
        }
    ).catch (
        function(erro) {
            console.error(erro)
            res.status(400, erro.sqlMessage)
        }
    )
}

function buscarNomeUsuario(req, res) {
    const email = req.query.email;

    usuarioModel.buscarNomeUsuario(email)
    .then(
        function (resultadoBuscar){
            if (resultadoBuscar.length > 0) {
                console.log('Nome de usuário encontrado')
                res.status(200).json(resultadoBuscar)
            } else {
                res.status(400).json({ mensagem: 'Não encontrado' })
            }
        }
    ).catch(
        function (erro) {
            console.error(erro)
            res.status(500).json({ erro: erro.sqlMessage })
        }
    )
}

module.exports = {
    autenticarUsuario,
    cadastrarUsuario,
    buscarNomeUsuario
}