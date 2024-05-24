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
