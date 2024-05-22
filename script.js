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



function pesquisaRua(uf, cidade, logradouro) {
    const requisicao2 = new Request(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json`, {
        // "method": "GET",
        // "headers": {
        // "Content-type": "application/json"
        // }
    }
    
);
console.log(requisicao2);
}





//     fetch(requisicao2).then(resposta => resposta.json()).then(resposta => {
//         document.querySelector('#logradouro').value = (resposta.logradouro);
//         document.querySelector('#cidade').value = (resposta.localidade);
//         document.querySelector('#uf').value = (resposta.uf);
//     })

//     console.log(requisicao2);
// }

document.getElementById('pesquisaRua').addEventListener('click', pesquisaRua());


