const express = require('express');
const router = express.Router()

const controllerMental = require('../controllers/mentalController');
const controlesUsuario = require('../controllers/usuarioController')

router.post('/marcar', controlesUsuario.autenticarSessao, function(req, res) {
    controllerMental.marcarEstado(req, res);
});

router.get('/resumo', controlesUsuario.autenticarSessao, function(req, res) {
    controllerMental.buscarResumoSemanal(req, res);
});

module.exports = router