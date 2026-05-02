const express = require('express')
const router = express.Router()

const controllerStreaks = require('../controllers/streaksController')
const controlesUsuario = require('../controllers/usuarioController')

router.post('/dia', controlesUsuario.autenticarSessao, function(req, res) {
    controllerStreaks.atualizarStreaks(req, res)
})

router.get('/buscar', controlesUsuario.autenticarSessao, function(req, res) {
    controllerStreaks.buscarStreaks(req, res)
})

module.exports = router