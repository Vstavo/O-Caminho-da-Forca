const express = require('express')
const router = express.Router()

const controlesUsuario = require('../controllers/usuarioController')

router.post('/autenticar', function (req, res) {
    controlesUsuario.autenticarUsuario(req, res)
});

router.post('/cadastrar', function (req, res) {
    controlesUsuario.cadastrarUsuario(req, res)
});

router.get('/user', controlesUsuario.autenticarSessao, function (req, res) {
    controlesUsuario.buscarDadosUsuario(req, res)
});

router.get('/verificar/sessao', controlesUsuario.autenticarSessao)

module.exports = router;