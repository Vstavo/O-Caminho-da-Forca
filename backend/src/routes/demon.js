const express = require('express')
const router = express.Router()

const controlesUsuario = require('../controllers/usuarioController')
const controllerDemon = require('../controllers/demonController')

router.post('/marcar', controlesUsuario.autenticarSessao, function(req, res) {
    controllerDemon.marcarDemonio(req, res)
})

module.exports = router