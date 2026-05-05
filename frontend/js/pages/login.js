import { autenticarUsuario} from "../services/authService.js";
import { cadastrarUsuario } from "../services/cadService.js";
import { gerarToast } from "../utils/toasts.js"

const main = document.getElementById('authApp');

function loginScreen() {
    main.innerHTML = '';

    main.innerHTML = `
    <section id="login">
        <div class="hero__bg" style="background-image: url('./assets/O_caminho_da_forca-BG.png')">
            <div class="hero__bg-overlay"></div>
        </div>
        <div class="hero__gradient"></div>

        <div class="left" id="left">
            <div id="login-container" class="login-container">
                <div class="login-title">
                    <h1>Login</h1>
                </div>
                <div class="form" id="form">
                    <label for="email">email:</label>
                    <input type="email" id="email" name="email" required>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                    <div class="utilBtns">
                        <button id="esqSenha">Esqueceu a senha?</button>
                        <button id="cadastro">Criar conta</button>
                    </div>
                    <button id="loginBtn">Login</button>
                </div>
            </div>
        </div>
        <div class="right" id="right">
            <div class="container-modal">
                <div class="container-hero">
                    <h1>OS 4 PILARES</h1>
                    <p>Você está a um clique de começar a trilhar o caminho para sua verdadeira força!</p>
                    <p>Agora queimem os barcos! Pois este é um caminho sem volta!</p>
                </div>
                <div class="container-itens">
                    <div class="item">
                        <h2>1. MOTIVAÇÃO</h2>
                        <p>A motivação é o motor da ação. Encontre o motivo de sua batalha.</p>
                    </div>
                    <div class="item">
                        <h2>2. CORPO</h2>
                        <p>O corpo é o templo do espírito. Defenda-o de seus demônios. Cuide dele com exercícios físicos, alimentação saudável e descanso adequado para fortalecer sua resistência e vitalidade.</p>
                    </div>
                    <div class="item">
                        <h2>3. CONTROLE</h2>
                        <p>O poder da mente é a base de tudo. Aprenda a controlar seus pensamentos e direcionar emoções para alcançar a verdadeira força interior.</p>
                    </div>
                    <div class="item">
                        <h2>4. PROPÓSITO</h2>
                        <p>O espírito é a conexão com algo maior. Cultive sua espiritualidade através de práticas como meditação, oração ou qualquer atividade que te conecte com o divino.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;

    const btn = main.querySelector('#loginBtn');
    const cad = main.querySelector('#cadastro');
    const email = main.querySelector('#email');
    const senha = main.querySelector('#password');

    email.addEventListener('keyup', (e) => {
        if (e.key !== 'Enter') return;
        senha.focus();
    });

    senha.addEventListener('keyup', (e) => {
        if (e.key !== 'Enter') return;
        btn.click();
    });

    btn.addEventListener('click', async () => {
        const valorEmail = main.querySelector('#email').value;
        const valorSenha = main.querySelector('#password').value;
        const usuario = await autenticarUsuario(valorEmail, valorSenha);

        if(usuario !== false) {
            if (usuario === 0) {
                gerarToast("advise", "email e/ou senha incorretos");
            } else {
                gerarToast("good", "Login efetuado");
                setTimeout(() => {
                    window.location = 'app.html'
                }, 500);
            };
        } else {
            gerarToast("error", "Erro ao fazer login")
        };
    });

    cad.addEventListener('click', () => {
        cadScreen();
    });
};

loginScreen();

function cadScreen() {
    main.innerHTML = '';

    main.innerHTML = `
    <section id="login">
        <div class="hero__bg" style="background-image: url('./assets/O_caminho_da_forca-BG.png')">
            <div class="hero__bg-overlay"></div>
        </div>
        <div class="hero__gradient"></div>

        <div class="center" id="center">
            <div id="cad-container" class="cad-container">
                <div class="cad-title">
                    <h1>Cadastro</h1>
                </div>
                <div class="form" id="form">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" placeholder="Seu nome" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="email@example.com" required>
                    <label for="password">Senha:</label>
                    <input type="password" id="password" name="password" placeholder="Abc@1234" required>
                    <label for="confirmPassword">Confirme a senha:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Abc@1234" required>
                    <div class="utilBtns">
                    </div>
                    <button id="cadBtn">Cadastrar</button>
                </div>
            </div>
        </div>
    </section>
    `;

    const btn = main.querySelector('#cadBtn');
    const nome = main.querySelector('$nome');
    const email = main.querySelector('#email');
    const senha = main.querySelector("#password");
    const senhaConfirm = main.querySelector("#confirmPassword");

    nome.addEventListener('keyup', (e) => {
        if (e.key !== 'Enter') return;
        email.focus();
    });

    email.addEventListener('keyup', (e) => {
        if (e.key !== 'Enter') return;
        senha.focus();
    });

    senha.addEventListener('keyup', (e) => {
        if (e.key !== 'Enter') return;
        senhaConfirm.focus();
    });

    senhaConfirm.addEventListener('keyup', (e) => {
        if (e.key !== 'Enter') return;
        btn.click();
    });

    function validarEmail(email) {
    if (!email) return false;

    const partes = email.split('@');
    if (partes.length !== 2) return false;

    const usuario = partes[0];
    const dominio = partes[1];

    if (dominio[0].includes('.')) return false;

    if (usuario.length === 0) return false;

    if (!dominio.includes('.')) return false;

    const partesDominio = dominio.split('.');

    const extensao = partesDominio[partesDominio.length - 1];
    
    if (extensao.length < 2) return false;

    return true;
}

    
    function verificacao() {
        const caracteresNecessarios = ['!', '@', '#', '$', '%', '&', '*', '.', '-', '_'];
        const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        
        const senha = main.querySelector("#password").value;
        const email = main.querySelector('#email').value;

        let temCaracter = false;
        let temTamanho = false;
        let temMaicuscula = false;
        let temMinuscula = false;
        let temNumero = false;
        const temEmail = validarEmail(email);

        if (senha.length > 7) temTamanho = true;
        if (senha.toLowerCase() !== senha) temMaicuscula = true;       
        if (senha.toUpperCase() !== senha) temMinuscula = true;    

        for (let i = 0; i < senha.length; i++) {
            if (temCaracter === true) break;
            for (let j = 0; j < caracteresNecessarios.length; j++) {
                if (senha[i].includes(caracteresNecessarios[j])){
                    temCaracter = true
                    break;
                };
            };
        };

        for (let i = 0; i < senha.length; i++) {
            if (temNumero === true) break;
            for (let j = 0; j < numeros.length; j++) {
                if(senha[i].includes(numeros[j])) {
                    temNumero = true;
                    break;
                };
            };
        };

        return { temCaracter, temTamanho, temMaicuscula, temMinuscula, temNumero, temEmail };
    }

    btn.addEventListener('click', async () => {
        const nome = main.querySelector('#nome').value;
        const email = main.querySelector('#email').value;
        const senha = main.querySelector('#password').value;
        const confirmSenha = main.querySelector('#confirmPassword').value;

        if (!nome || !email || !senha) {
            gerarToast("advise", "Preencha todos os campos");
            return;
        };
        
        const resultadoVerificacao = verificacao()

        if (!resultadoVerificacao.temEmail) {
            gerarToast("advise", "Insira um email válido");
            return;
        }

        if (!resultadoVerificacao.temMaicuscula && !resultadoVerificacao.temMinuscula) {
            gerarToast("advise", "A senha deve conter uma letra");
            return;
        };
        
        if (!resultadoVerificacao.temMaicuscula) {
            gerarToast("advise", "A senha deve conter uma letra maiúscula");
            return;
        };
        
        if (!resultadoVerificacao.temMinuscula) {
            gerarToast("advise", "A senha deve conter uma letras minúscula");
            return;
        };
        
        if (!resultadoVerificacao.temNumero) {
            gerarToast("advise", "A senha deve conter um numero")
        }
        
        if (!resultadoVerificacao.temCaracter) {
            gerarToast("advise", "A senha deve ter no mínimo um caracter especial");
            return;
        };
        
        if (!resultadoVerificacao.temTamanho) {
            gerarToast("advise", "A senha deve ter pelo menos 8 caracteres");
            return;
        };

        if (senha !== confirmSenha) {
            gerarToast("advise", "As senhas não coincidem");
            return;
        }

        const cadastro = await cadastrarUsuario(email, senha, nome);

        if (cadastro !== false) {
            gerarToast("good", "Usuário cadastrado");
            setTimeout(() => {
                loginScreen()
            }, 500);
        } else {
            gerarToast("error", "Erro ao cadastrar usuário")
        }

    });
};