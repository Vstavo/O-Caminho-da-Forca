const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function executar(instrucao, params = []) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nAMBIENTE NÃO CONFIGURADO\n");
        throw new Error("AMBIENTE NÃO CONFIGURADO");
    }

    try {
        const [resultados] = await pool.query(instrucao, params);
        return resultados;
    } catch (erro) {
        console.error("Erro no banco:", erro);
        throw erro;
    }
}

module.exports = {
    executar,
    pool
};