const express = require('express')
const router = express.Router()

const controllerStreaks = require('../controllers/streaksController')
const controlesUsuario = require('../controllers/usuarioController')
const controllerDemon = require('../controllers/demonController')

router.post('/dia', controlesUsuario.autenticarSessao, function(req, res) {
    controllerStreaks.atualizarStreaks(req, res)
})

router.get('/streak', controlesUsuario.autenticarSessao, function(req, res) {
    controllerStreaks.buscarStreaks(req, res)
})

router.post('/demon', controlesUsuario.autenticarSessao, function(req, res) {
    controllerDemon.marcarDemonio(req, res)
})

module.exports = router