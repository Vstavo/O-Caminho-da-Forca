const express = require('express');

const app = express();
const cors = require('cors')
require('dotenv').config('.env');
app.use(express.json())
app.use(cors())


const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

const rotasUsuario = require('./src/routes/usuarios');
const rotasGrafico = require('./src/routes/graphics');
const rotasSistema = require('./src/routes/sistema')

app.use('/usuarios', rotasUsuario);
app.use('/graphics', rotasGrafico);
app.use('/marcar', rotasSistema)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}! \nPara acessar entre em: http://${host}:${port}`)
});
