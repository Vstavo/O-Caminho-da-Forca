const express = require('express');
const router = express.Router();

const controleGrafico = require('../controllers/graphicController');

router.get('/nivel', function(req, res) {
    controleGrafico.buscarNivel(req, res)
})

module.exports = router