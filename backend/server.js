const express = require('express');

const app = express();
const cors = require('cors')
require('dotenv').config('.env');
app.use(express.json())
app.use(cors())


const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

const rotasUsuario = require('./src/routes/usuarios');

app.use('/usuarios', rotasUsuario);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}! \nPara acessar entre em: http://${host}:${port}`)
});
