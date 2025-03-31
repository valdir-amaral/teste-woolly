let preloader = document.querySelector("#preload");
window.onload = loadPage();

function loadPage() {
    window.scroll({top: 0})
    document.body.classList.add("loading");
    setTimeout(()=> {
        
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

let formButtonClicked = false;
function validateForm(ev) {
    ev.preventDefault()
    let element = ev.target;
    let inputValue = element.value;
    if (element.classList.contains('submit-btn')) {
        formButtonClicked = true;
        if (isFormValid()) {
            alert("Foi!")
        }
    }
    
    // O formulário só valida os que estão faltando caso o botão já tenha sido clicado. É chato o input ficar vermelho antes de você preencher o formulário, dá gatilhos.
    if (formButtonClicked) {
        requiredInputs.forEach(i => {
            if (i.value == "") {
                i.classList.add("error-field")
            } else {
                i.classList.remove('error-field');
            }
        })
    }
    
    if (element.name == "cnpj") {
        element.value = formatCnpj(inputValue);
        
    }

    if (element.name == "phone") {
        element.value = formatPhone(inputValue);
        
    }

    if (formButtonClicked && contactForm.querySelector('input[name="cnpj"]').value.length < 18) {
        contactForm.querySelector('input[name="cnpj"]').classList.add('error-field');
    }

    if (formButtonClicked && contactForm.querySelector('input[name="phone"]').value.length < 15) {
        contactForm.querySelector('input[name="phone"]').classList.add('error-field');
    }

   if (isFormValid()) {
    alert("Foi!")
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
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/,"$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/,".$1/$2");
    value = value.replace(/(\d{4})(\d)/,"$1-$2"); 
    value = value.substring(0, 18);

    return value;
}

function formatPhone(value) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    value = value.substring(0, 15);

    return value;
}


function openVideoModal() {
    let iframe = document.querySelector('iframe');
    iframe.src = "https://www.youtube.com/embed/QIPdMmgCWi0?si=olLwRfKwzR0aatAJ&enablejsapi=1&autoplay=1"
    
    // Quando o modal fechar, destruir o vídeo para que não toque no background.
    document.querySelector('.modal').addEventListener('hidden.bs.modal', () => {
        iframe.src = "";
    })
}
