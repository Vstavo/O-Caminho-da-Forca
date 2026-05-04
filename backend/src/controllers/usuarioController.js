const usuarioModel = require('../models/usuarioModel')

const sessoes = {}

function random() {
    const numeroAleatorio = Math.random() * 10;

    return numeroAleatorio;
}

function gerarToken() {

    const caracteresEspeciais = ['!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', '/', '?', '>', '<', ',', '.', '~', '^', '`', ':', ';', '§', '°', 'ª', 'º', '£', '¢', '¬', '¤', '±', '©', '®', '÷', '«', '»', '¿', '¡', 'ç', 'Ç', 'ã', 'Ã', 'õ', 'Õ', 'á', 'Á', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú', 'â', 'Â', 'ê', 'Ê', 'î', 'Î', 'ô', 'Ô', 'û', 'Û', 'à', 'À', 'ü', 'Ü'];

    const caracteres = {
        0: "a",
        1: "B",
        2: "x",
        3: "K",
        4: "Z",
        5: "c",
        6: "u",
        7: "p",
        8: "q",
        9: "Q"
    }

    const num1 = ((random() + 1) * 20.05 / 2)
    const num2 = ((random() + 1) * 10.05 / 2)
    const num3 = ((random() + 1) * 1.05 / 2)
    const char0 = caracteresEspeciais[parseInt(random())];
    const char1 = caracteresEspeciais[parseInt(random() + 10)];
    const char2 = caracteresEspeciais[parseInt(random() + 20)];
    const char3 = caracteresEspeciais[parseInt(random() + 30)];
    const char4 = caracteresEspeciais[parseInt(random() + 40)];
    const char5 = caracteresEspeciais[parseInt(random() + 50)];

    const tokenMontado = `bctmlhd${parseInt(num1)}${caracteres[parseInt(random())]}${caracteres[parseInt(random())]}${char0}${parseInt(num2)}${caracteres[parseInt(random())]}${char1}${caracteres[parseInt(random())]}${char2}${caracteres[parseInt(random())]}${parseInt(num3)}${caracteres[parseInt(random())]}${caracteres[parseInt(random())]}${char3}${char4}${char5}${parseInt(num1)}${parseInt(num3)}${parseInt(num2)}${caracteres[parseInt(random())]}${char0}${caracteres[parseInt(random())]}${char5}${caracteres[parseInt(random())]}${char2}${char1}${caracteres[parseInt(random())]}${caracteres[parseInt(random())]}${char0}${char1}${char2}${char3}${char4}${char5}${char5}${char4}${char3}${char2}${char1}${char0}`;

    return tokenMontado
}

function autenticarUsuario(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    usuarioModel.autenticarUsuario(email, senha)
    .then(
        function (resultadoAutenticar){
            if (resultadoAutenticar.length === 1){
                console.log('Usuário encontrado')
                
                const usuario = resultadoAutenticar[0];
                
                const token = gerarToken()
                
                sessoes[token] = {
                    userId: usuario.id,
                    nome: usuario.name,
                    email: usuario.email,
                    criadoEm: new Date()
                }
                res.status(200).json({ token })
            } else {
                console.log('Email e/ou senha inválidos!')
                res.status(401).json(resultadoAutenticar)
            }
        }
    ).catch(
        function (erro) {
            console.log(erro)
            res.status(500, erro.sqlMessage)
        }
    )
};

function autenticarSessao(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ erro: 'Sem token' });
    };

    const token = authHeader.split(' ')[1];

    const sessao = sessoes[token]

    if (!sessao) {
        return res.status(403).json({ erro: 'Sessão inválida' })
    }

    req.usuario = sessao;

    next()
}

function cadastrarUsuario(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;
    const nome = req.body.nomeServer;

    usuarioModel.cadastrarUsuario(email, senha, nome)
    .then(
        function (resultadoAutenticar){
            if (resultadoAutenticar) {
                console.log('Usuário cadastrado');
                res.status(201).json(resultadoAutenticar)
            } else {
                console.log('Erro ao cadastrar usuário')
            }
        }
    ).catch (
        function(erro) {
            console.error(erro)
            res.status(400, erro.sqlMessage)
        }
    )
}

function buscarNomeUsuario(req, res) {
    const userId = req.usuario.userId;

    usuarioModel.buscarNomeUsuario(userId)
    .then(
        function (resultadoBuscar){
            if (resultadoBuscar.length > 0) {
                console.log('Nome de usuário encontrado')
                res.status(200).json(resultadoBuscar)
            } else {
                res.status(400).json({ mensagem: 'Não encontrado' })
            }
        }
    ).catch(
        function (erro) {
            console.error(erro)
            res.status(500).json({ erro: erro.sqlMessage })
        }
    )
}

module.exports = {
    autenticarUsuario,
    autenticarSessao,
    cadastrarUsuario,
    buscarNomeUsuario
}