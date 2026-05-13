import { paginaForca } from "./pages/forca.js";
import { paginaJornada } from "./pages/jornada.js";
import { paginaEclipse } from "./pages/eclipse.js";
import { paginaEspada } from "./pages/espada.js";
import { paginaProposito } from "./pages/proposito.js";
import { buscarDadosUsuario } from "./services/buscarDadosService.js";
import { gerarToast } from "./utils/toasts.js";
import { paginaPerfil } from "./pages/perfil.js";

async function iniciar() {
    const usuario = await buscarDadosUsuario() || false;
    console.log(usuario)

    const main = document.getElementById('content');
    if(usuario === null || usuario === false) {
        main.style.display = 'none'
        window.location = 'login.html'
        return
    }

    const data = {
        nome: usuario[0].name,
        foto: usuario[0].perfil_photo
    }
    
    
    if (!data.nome) {
        main.style.display = 'none'
        window.location = 'login.html'
        return
    }

    const userFoto = document.getElementById('foto-frame');    
    const userName = document.getElementById('user-name');
    const forcaBtn = document.getElementById('forca-button');
    const jornadaBtn = document.getElementById('jornada-button');
    const eclipseBtn = document.getElementById('eclipse-button');
    const espadaBtn = document.getElementById('espada-button');
    const propositoBtn = document.getElementById('proposito-button');
    const sairBtn = document.getElementById('logout-button');

    userName.textContent = data.nome;
    
    const imagemPerfil = `<img class="foto-perfil" src="./assets/perfis/${data.foto}.png" alt="Foto de perfil">`;

    userFoto.innerHTML = imagemPerfil;

    userFoto.addEventListener('click', () => {
        paginaPerfil(main);
        deixarAtivoBtn('perfil')
    });
    
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

    // function desativarBtn() {
    //     for(let i = 0; 1< buttons.length; i++) {
    //         buttons[i].classList.toggle('active', false)
    //     }
    // }
    
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
        setTimeout(() => {
            gerarToast("good", "Até mais");
            window.location = 'login.html';
        }, 500);
    });
    
    function carregarInicio() {
        forcaBtn.click()

        // eclipseBtn.click()
        // espadaBtn.click()
        // propositoBtn.click()
    };
    
    carregarInicio()
};

iniciar();
