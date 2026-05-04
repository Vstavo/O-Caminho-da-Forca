const express = require('express');
const router = express.Router();

const controlesUsuario = require('../controllers/usuarioController');
const controllerGoal = require('../controllers/goalController')

router.get('/buscar', controlesUsuario.autenticarSessao, function(req, res) {
    controllerGoal.buscarGoals(req, res);
});

router.post('/marcar', controlesUsuario.autenticarSessao, function(req, res) {
    controllerGoal.checkinGoal(req, res);
});

router.post('/criar', controlesUsuario.autenticarSessao, function(req, res) {
    controllerGoal.criarGoal(req, res);
});

module.exports = router;