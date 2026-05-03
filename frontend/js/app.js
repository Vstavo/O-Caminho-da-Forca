import { paginaForca } from "./pages/forca.js";
import { paginaJornada } from "./pages/jornada.js";
import { paginaEclipse } from "./pages/eclipse.js";
import { paginaEspada } from "./pages/espada.js";
import { paginaProposito } from "./pages/proposito.js";
import { buscarNomeUsuario } from "./services/buscarDadosService.js";

async function iniciar() {
    const nome = await buscarNomeUsuario();

    
    
    const main = document.getElementById('content');
    
    if (!nome) {
        main.style.display = 'none'
        window.location = 'login.html'
    }
        
    const userName = document.getElementById('user-name');
    const forcaBtn = document.getElementById('forca-button');
    const jornadaBtn = document.getElementById('jornada-button');
    const eclipseBtn = document.getElementById('eclipse-button');
    const espadaBtn = document.getElementById('espada-button');
    const propositoBtn = document.getElementById('proposito-button');
    const sairBtn = document.getElementById('logout-button');

    userName.textContent = nome[0].name;
    
    
    const buttons = [
        forcaBtn,
        jornadaBtn,
        eclipseBtn,
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
    
    eclipseBtn.addEventListener('click', () => {
        deixarAtivoBtn(eclipseBtn);
        paginaEclipse(main);
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
        localStorage.removeItem('token');
        iniciar()
    });
    
    function carregarInicio() {
        forcaBtn.click()

        // eclipseBtn.click()
        // espadaBtn.click()
    };
    
    carregarInicio()
};

iniciar();
