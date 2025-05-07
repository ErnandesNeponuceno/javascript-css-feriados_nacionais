const inputCep = document.getElementById('result');
const cepInput = document.getElementById('cep');
const resultDiv = document.querySelector('.main__result');

function consultaCep() {
    const cep = cepInput.value.replace(/\D/g, '');
    const url = 'https://viacep.com.br/ws/' + cep + '/json/';
    const request = new XMLHttpRequest();

    if (!validateCep(cep)) {
        Toastify({
            text: "Por favor, insira um CEP válido.",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true, 
            style: {
              background: "#ef4444",
            },
        }).showToast();
        return;
    }

    request.open('GET', url);
    request.onerror = function (e) {
        inputCep.innerHTML = 'API OFFLINE OU CEP INVALIDO';
        resultDiv.style.display = 'flex';
    };
    
    request.onload = () => {
        try {
            const response = JSON.parse(request.responseText);
            if (response.erro === 'true') {
                inputCep.innerHTML = 'CEP NAO ENCONTRADO ou INVALIDO';
            } else {
                inputCep.innerHTML = 
                    'CEP: ' + response.cep + '<br>' +
                    'Logradouro: ' + response.logradouro + '<br>' +
                    'Bairro: ' + response.bairro + '<br>' +
                    'Cidade/UF: ' + response.localidade + ' / ' + response.uf;
            }
        } catch (e) {
            inputCep.innerHTML = 'API OFFLINE OU CEP INVALIDO';
        }
        resultDiv.style.display = 'flex';
    };
    request.send();
}

function validateCep(cep) {
    const re = /^[0-9]{8}$/;
    return re.test(cep);
}

function limparCep() {
    inputCep.innerHTML = '';
    cepInput.value = '';
    resultDiv.style.display = 'none';  
}
