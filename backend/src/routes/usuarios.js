const express = require('express')
const router = express.Router()

const controlesUsuario = require('../controllers/usuarioController')

router.post('/autenticar', function (req, res) {
    controlesUsuario.autenticarUsuario(req, res)
});

router.post('/cadastrar', function (req, res) {
    controlesUsuario.cadastrarUsuario(req, res)
});

router.get('/email', function (req, res) {
    controlesUsuario.buscarNomeUsuario(req, res)
});

module.exports = router;