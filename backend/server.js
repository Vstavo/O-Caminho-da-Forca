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
const rotasStreak = require('./src/routes/streak');
const rotasDemon = require('./src/routes/demon');
const rotasMental = require('./src/routes/mental');
const rotasGoal = require('./src/routes/goals');

app.use('/usuarios', rotasUsuario);
app.use('/graphics', rotasGrafico);
app.use('/streak', rotasStreak);
app.use('/demon', rotasDemon);
app.use('/mental', rotasMental);
app.use('/goal', rotasGoal);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}! \nPara acessar entre em: http://${host}:${port}`)
});
