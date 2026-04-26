import { autenticarUsuario} from "../services/authService.js";
import { cadastrarUsuario } from "../services/cadService.js";

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


    btn.addEventListener('click', () => {
        localStorage.removeItem('nomeUsuario');
        const email = main.querySelector('#email').value;
        const senha = main.querySelector('#password').value;
        autenticarUsuario(email, senha);
    });

    cad.addEventListener('click', () => {
        cadScreen()
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

    btn.addEventListener('click', () => {
        const nome = main.querySelector('#nome').value;
        const email = main.querySelector('#email').value;
        const senha = main.querySelector('#password').value;
        const confirmSenha = main.querySelector('#confirmPassword').value;

        if (senha !== confirmSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        cadastrarUsuario(email, senha, nome);
        loginScreen();
    });
};