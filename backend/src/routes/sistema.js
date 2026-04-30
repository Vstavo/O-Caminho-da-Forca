const express = require('express')
const router = express.Router()

const controllerStreaks = require('../controllers/streaksController')
const controlesUsuario = require('../controllers/usuarioController')

router.post('/dia', controlesUsuario.autenticarSessao, function(req, res) {
    controllerStreaks.atualizarStreaks(req, res)
})

module.exports = router