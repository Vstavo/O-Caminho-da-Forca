export function gerarToast(tipo, mensagem) {
    const toastPlaceholder = document.querySelector('#toast');

    if (tipo !== "good" && tipo !== "advise" && tipo !== "error") {
        toastPlaceholder.innerHTML = "Erro na chamada do toast!";

        toastPlaceholder.classList.add('error');
        toastPlaceholder.classList.remove('hidden');

        setTimeout(() => {
            toastPlaceholder.classList.add('hidden');
            toastPlaceholder.classList.remove('error');
        }, 3000);

        return
    };

    toastPlaceholder.innerHTML = mensagem;

    toastPlaceholder.classList.add(tipo);
    toastPlaceholder.classList.remove('hidden');

    setTimeout(() => {
        toastPlaceholder.classList.add('hidden');
        toastPlaceholder.classList.remove(tipo);
    }, 3000);

};