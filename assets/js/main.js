let preloader = document.querySelector("#preload");
window.onload = loadPage();

function loadPage() {
    window.scroll({
        top: 0
    })
    document.body.classList.add("loading");
    setTimeout(() => {
        preloader.classList.add("preloader-invisible");
        setTimeout(() => {
            // Aqui, a tela de carregamento é retirada do DOM depois de 300ms (o tempo para dar a animação de opacity.)
            preloader.remove();
        }, 300);
        document.body.classList.remove("loading");

    }, 2000)
}

let contactForm = document.querySelector('#contato form');
let requiredInputs = contactForm.querySelectorAll("input[required]");

requiredInputs.forEach(i => {
    i.addEventListener('input', validateForm);
})

contactForm.addEventListener('submit', ev => {
    ev.preventDefault();
    formButtonClicked = true;
    validateForm();

    if (isFormValid()) {
        alert('Contato enviado com sucesso!');
    }
})

let formButtonClicked = false;

function validateForm(ev) {
    let contactFormButton = contactForm.querySelector('.submit-btn');

    // Aqui o botão desabilita se pelo menos um dos inputs estiver vazio.
    contactFormButton.disabled = Array.from(requiredInputs).some(i => i.value.trim() == "")
    requiredInputs.forEach(i => {
        // O formulário só valida os que estão faltando caso o botão já tenha sido clicado. É chato o input ficar vermelho antes de você preencher o formulário, dá gatilhos.
        if (formButtonClicked) {

            if (i.value.trim() === "") {
                i.classList.add("error-field");
            } else {
                i.classList.remove('error-field');
            }
        }
    });
    let cnpjInput = contactForm.querySelector('input[name="cnpj"]');
    let phoneInput = contactForm.querySelector('input[name="phone"]');

    cnpjInput.value = formatCnpj(cnpjInput.value);
    phoneInput.value = formatPhone(phoneInput.value);

    if (formButtonClicked) {
        contactFormButton.disabled = cnpjInput.value.length < 18 || phoneInput.value.length < 15
        if (cnpjInput.value.length < 18) {
            cnpjInput.classList.add('error-field');
        } else {
            cnpjInput.classList.remove('error-field');
        }

        if (phoneInput.value.length < 15) {
            phoneInput.classList.add('error-field');
        } else {
            phoneInput.classList.remove('error-field');
        }
    }
}

function isFormValid() {
    let isValid = true;
    requiredInputs.forEach((i) => {
        if (i.value.trim() == "" || i.classList.contains("error-field")) {
            isValid = false;
        }
    });

    return isValid;
}

// Máscaras de input (CNPJ e Telefone)
function formatCnpj(value) {
    return value.replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .substring(0, 18);
}

function formatPhone(value) {
    return value.replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 15);
}

// Quando o player de mídia é aberto
function openVideoModal() {
    let iframe = document.querySelector('iframe');
    iframe.src = "https://www.youtube.com/embed/QIPdMmgCWi0?si=olLwRfKwzR0aatAJ&autoplay=1";
    document.querySelector('.modal').addEventListener('hidden.bs.modal', () => {
        iframe.src = "";
    });
}