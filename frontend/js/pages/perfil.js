import { buscarDadosUsuario } from "../services/buscarDadosService.js";
import { alterarFotoPerfil } from "../services/enviarDadosService.js";
import { gerarToast } from "../utils/toasts.js";


export async function paginaPerfil(main) {
    const app = document.getElementById('app');
    app.className = '';
    app.classList.add('app-geral');
    main.innerHTML = '';
    main.className = '';
    main.classList.add('dash-geral');

    const user = await buscarDadosUsuario()

    main.innerHTML = `
        <div class="conteudo">
            <div class="cabecalhos">
                <div class="images-carrousel" id="images-carrousel">
                    <div class="slides" id="slides">
                        <img id="generic" class="slide-img" src="../assets/perfis/generic.png" alt="generic" />
                        <img id="berserk" class="slide-img" src="../assets/perfis/berserk.png" alt="berserk" />
                        <img id="thors" class="slide-img" src="../assets/perfis/thors.png" alt="thors" />
                        <img id="usopp" class="slide-img" src="../assets/perfis/usopp.png" alt="usopp" />
                        <img id="thorfinn" class="slide-img" src="../assets/perfis/thorfinn.png" alt="thorfinn" />
                        <img id="guts" class="slide-img" src="../assets/perfis/guts.png" alt="guts" />
                        <img id="zoro" class="slide-img" src="../assets/perfis/zoro.png" alt="zoro" />
                        <img id="luffy" class="slide-img" src="../assets/perfis/luffy.png" alt="luffy" />
                        </div>
                </div>
            </div>
            <div class="corpo">
            </div>
        </div>
    `;

    const slide = main.querySelector('#slides');
    const generic = main.querySelector('#generic');
    const berserk = main.querySelector('#berserk');
    const thors = main.querySelector('#thors');
    const usopp = main.querySelector('#usopp');
    const thorfinn = main.querySelector('#thorfinn');
    const guts = main.querySelector('#guts');
    const zoro = main.querySelector('#zoro');
    const luffy = main.querySelector('#luffy');

    const imagens = [
        generic,
        berserk,
        thors,
        usopp,
        thorfinn,
        guts,
        zoro,
        luffy
    ];

    function imagemSelecionada(imagem) {
        for(let i = 0; i < imagens.length; i++) {
            imagens[i].classList.toggle('selected', imagens[i] === imagem)
        };
    };

    const imagensPerfil = {
        "generic" : generic,
        "berserk" : berserk,
        "thors" : thors,
        "usopp" : usopp,
        "thorfinn" : thorfinn,
        "guts" : guts
    };

    const foto = user[0].perfil_photo;
    console.log(foto)

    imagemSelecionada(imagensPerfil[foto])
    
    generic.addEventListener('click', () => {
        
        async function mudarFoto() {
            const retorno = await alterarFotoPerfil("generic")
            if (retorno !== false && retorno !== null) {
                gerarToast("good", retorno.mensagem)
            }
        }
        mudarFoto()
        imagemSelecionada(generic);
    });


    berserk.addEventListener('click', () => {
        
        async function mudarFoto() {
            const retorno = await alterarFotoPerfil("berserk")
            if (retorno !== false && retorno !== null) {
                gerarToast("good", retorno.mensagem)
            }
        }
        mudarFoto()
        imagemSelecionada(berserk);
    });


    thors.addEventListener('click', () => {
        
        async function mudarFoto() {
            const retorno = await alterarFotoPerfil("thors")
            if (retorno !== false && retorno !== null) {
                gerarToast("good", retorno.mensagem)
            }
        }
        mudarFoto()
        imagemSelecionada(thors);
    });

    usopp.addEventListener('click', () => {
        
        async function mudarFoto() {
            const retorno = await alterarFotoPerfil("usopp")
            if (retorno !== false && retorno !== null) {
                gerarToast("good", retorno.mensagem)
            }
        }
        mudarFoto()
        imagemSelecionada(usopp);
    });

    thorfinn.addEventListener('click', () => {
        
        async function mudarFoto() {
            const retorno = await alterarFotoPerfil("thorfinn")
            if (retorno !== false && retorno !== null) {
                gerarToast("good", retorno.mensagem)
            }
        }
        mudarFoto()
        imagemSelecionada(thorfinn);
    });

    guts.addEventListener('click', () => {
        
        async function mudarFoto() {
            const retorno = await alterarFotoPerfil("guts")
            if (retorno !== false && retorno !== null) {
                gerarToast("good", retorno.mensagem)
            }
        }
        mudarFoto()
        imagemSelecionada(guts);
    });

    zoro.addEventListener('click', () => {
        
        async function mudarFoto() {
            const retorno = await alterarFotoPerfil("zoro")
            if (retorno !== false && retorno !== null) {
                gerarToast("good", retorno.mensagem)
            }
        }
        mudarFoto()
        imagemSelecionada(zoro);
    });

    luffy.addEventListener('click', () => {
        
        async function mudarFoto() {
            const retorno = await alterarFotoPerfil("luffy")
            if (retorno !== false && retorno !== null) {
                gerarToast("good", retorno.mensagem)
            }
        }
        mudarFoto()
        imagemSelecionada(luffy);
    });
};