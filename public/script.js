function consultaCEP(cep) {

    cep = cep.replace(/\D/g, '');

    if(cep != '') {

        const padraoCep = /^[0-9]{8}$/;

        if(padraoCep.test(cep)) {

            document.querySelector('#bairro').setAttribute('readonly', '');
            document.querySelector('#cidade').setAttribute('readonly', '');
            document.querySelector('#uf').setAttribute('readonly', '');

            const requisicao = new Request(`https://viacep.com.br/ws/${cep}/json`, {
            "method": "GET",
            "headers": {
            "Content-type": "application/json"
            }
        });
    
        fetch(requisicao)
            .then(resposta => resposta.json())
            .then(resposta => {

                if(!(resposta.erro)) {
                    document.querySelector('#logradouro').value = (resposta.logradouro);
                    document.querySelector('#bairro').value = (resposta.bairro);
                    document.querySelector('#cidade').value = (resposta.localidade);
                    document.querySelector('#uf').value = (resposta.uf);
                }
                else {
                    limpaForm();
                    alert('CEP não localizado.');

                    document.querySelector('#bairro').removeAttribute('readonly');
                    document.querySelector('#cidade').removeAttribute('readonly');
                    document.querySelector('#uf').removeAttribute('readonly');

                    document.querySelector('#logradouro').focus();
                }   
            });
        }
        else {
            limpaForm();
            window.alert('O formato do CEP não é válido.');
        }   
    }
    else {
        limpaForm();
        window.alert('Digite um CEP!');
    }
}

function limpaForm() {
    document.querySelectorAll('input:not(#cep)').forEach(input => {
        input.value = '';
    });
}

function pesquisarPorLogradouro() {

    const uf = document.querySelector('#uf').value;
    const cidade = document.querySelector('#cidade').value;
    const logradouro = document.querySelector('#logradouro').value;

    // console.log('UF:', uf);
    // console.log('Cidade:', cidade);
    // console.log('Logradouro:', logradouro);

    
    if(uf && cidade && logradouro){
        
        fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json`)
        .then(resposta => resposta.json())
        .then(data => {
            if(data.length > 0) {
                const primeiroCEP = data[0];
                preencherForm(primeiroCEP);
            }
            else {
                alert('CEP não encontrado com o logradouro digitado.');
            }
        }
    )};

}

function preencherForm(cepData) {

    document.querySelector('#cep').value = cepData.cep;
    document.querySelector('#logradouro').value = cepData.logradouro;
    document.querySelector('#bairro').value = cepData.bairro;
    document.querySelector('#cidade').value = cepData.localidade;
    document.querySelector('#uf').value = cepData.uf;

}

function cadastrarCep(enderecoCompleto) {

    fetch('http://localhost:3000/endereco', {
        "method": "POST",
        "headers":{
            "Content-Type": "aplication/json"
        },
        "body": JSON.stringify(enderecoCompleto)
    }).then(resposta => {
        resposta.ok ? alert('Endereço cadastrado!') : alert('Erro:' + resposta.status) 
    })

}

function atualizarCep(enderecoCompleto) {
    fetch('http://localhost:3000/endereco', {
        "method": "PUT",
        "headers":{
            "Content-Type": "aplication/json"
        },

    })
}


let btn = document.querySelector('.fa-eye');
let btnVerConfirme = document.querySelector('#verConfirmeSenha');

let nome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');
let validNome = false;

let email = document.querySelector('#email');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmeSenha = document.querySelector('#confirmeSenha');
let labelConfirmeSenha = document.querySelector('#labelConfirmeSenha');
let validConfirmeSenha = false;


nome.addEventListener('keyup', () => {
    if (nome.value.length <=  3) {
        labelNome.setAttribute('style', 'color: red');
        labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres*'
        nome.setAttribute('style', 'border-color: red');
        validNome = false;
    }
    else {
        labelNome.setAttribute('style', 'color: green');
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: green');
        validNome = true;
    }
});

email.addEventListener('keyup', () => {
    if (email.value.length <=  8) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = 'E-mail *Insira um e-mail válido*'
        email.setAttribute('style', 'border-color: red');
        validEmail = false;
    }
    else {
        labelEmail.setAttribute('style', 'color: green');
        labelEmail.innerHTML = 'E-mail'
        email.setAttribute('style', 'border-color: green');
        validEmail = true;
    }
});

senha.addEventListener('keyup', () => {
    if (senha.value.length <=  5) {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres*'
        senha.setAttribute('style', 'border-color: red');
        validSenha = false;
    }
    else {
        labelSenha.setAttribute('style', 'color: green');
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green');
        validSenha = true;
    }
});


confirmeSenha.addEventListener('keyup', () => {
    if (senha.value != confirmeSenha.value) {
        labelConfirmeSenha.setAttribute('style', 'color: red');
        labelConfirmeSenha.innerHTML = 'Confirmar senha *As senhas não são conferem*'
        confirmeSenha.setAttribute('style', 'border-color: red');
        validConfirmeSenha = false;
    }
    else {
        labelConfirmeSenha.setAttribute('style', 'color: green');
        labelConfirmeSenha.innerHTML = 'Confirmar senha'
        confirmeSenha.setAttribute('style', 'border-color: green');
        validConfirmeSenha = true;
    }
});

function cadastrar() {
    if(validNome && validEmail && validSenha && validConfirmeSenha){

    }
    else {
        alert("Preencha todos os campos corretamente");
    }
}

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('.senha');

    if(inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text');
    }
    else {
        inputSenha.setAttribute('type', 'password');
    }
});


btnVerConfirme.addEventListener('click', () => {
    let inputVerConfirmeSenha = document.querySelector('#confirmeSenha');

    if(inputVerConfirmeSenha.getAttribute('type') == 'password') {
        inputVerConfirmeSenha.setAttribute('type', 'text');
    }
    else {
        inputVerConfirmeSenha.setAttribute('type', 'password');
    }
});

