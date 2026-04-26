import { paginaForca } from "./pages/forca.js";
import { paginaJornada } from "./pages/jornada.js";
import { paginaMao } from "./pages/mao.js";
import { paginaEspada } from "./pages/espada.js";
import { paginaProposito } from "./pages/proposito.js";

function iniciar() {
    const nome = localStorage.getItem('nomeUsuario') || 'Usuário';

    const main = document.getElementById('content');
    const logged = localStorage.getItem('logged');
    if (!logged) {
        main.style.display = 'none';
        window.location = 'login.html';
        return;
    };

    const userName = document.getElementById('user-name');
    const forcaBtn = document.getElementById('forca-button');
    const jornadaBtn = document.getElementById('jornada-button');
    const maoBtn = document.getElementById('mao-de-deus-button');
    const espadaBtn = document.getElementById('caminho-da-espada-button');
    const propositoBtn = document.getElementById('proposito-button');
    const sairBtn = document.getElementById('logout-button');

    userName.textContent = nome;
    
    
    const buttons = [
        forcaBtn,
        jornadaBtn,
        maoBtn,
        espadaBtn,
        propositoBtn
    ];
    
    function deixarAtivoBtn(botaoAtivo) {
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle('active', buttons[i] === botaoAtivo)
        }
    };
    
    forcaBtn.addEventListener('click', () => {
        deixarAtivoBtn(forcaBtn);
        paginaForca(main);
    });
    
    jornadaBtn.addEventListener('click', () => {
        deixarAtivoBtn(jornadaBtn);
        paginaJornada(main);
    });
    
    maoBtn.addEventListener('click', () => {
        deixarAtivoBtn(maoBtn);
        paginaMao(main);
    });
    
    espadaBtn.addEventListener('click', () => {
        deixarAtivoBtn(espadaBtn);
        paginaEspada(main);
    });
    
    propositoBtn.addEventListener('click', () => {
        deixarAtivoBtn(propositoBtn);
        paginaProposito(main);
    });

    sairBtn.addEventListener('click', () => {
        localStorage.removeItem('logged')
        localStorage.removeItem('nomeUsuario')
        localStorage.removeItem('emailUsuario');
        iniciar()
    });
    
    function carregarInicio() {
        forcaBtn.click()
    };
    
    carregarInicio()
};

iniciar();
