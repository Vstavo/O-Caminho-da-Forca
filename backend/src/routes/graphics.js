const express = require('express');
const router = express.Router();

const controleGrafico = require('../controllers/graphicController');
const {autenticarSessao}  = require('../controllers/usuarioController');

router.get('/nivel', autenticarSessao, function(req, res) {
    controleGrafico.buscarNivel(req, res)
})

module.exports = router