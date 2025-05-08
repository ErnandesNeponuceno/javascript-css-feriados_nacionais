const inputCep = document.getElementById('result');
const yearInput = document.getElementById('ano');
const resultDiv = document.querySelector('.main__result');

function consultaFeriado() {
    const year = 2025;
    const url = 'https://brasilapi.com.br/api/feriados/v1/' + year;
    const request = new XMLHttpRequest();

    request.open('GET', url);
    request.onerror = function (e) {
        inputCep.innerHTML = 'API OFFLINE';
        resultDiv.style.display = 'flex';
    };
    
    request.onload = () => {
        try {
            const response = JSON.parse(request.responseText);
            const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
            if (Array.isArray(response)) {
                response.forEach(feriado => {
                    const [ano, mes, dia] = feriado.date.split('-');
                    const data = new Date(`${feriado.date}T00:00:00`);
                    const diaSemana = diasSemana[data.getDay()];
                    const dataFormatada = `${dia}/${mes}/${ano}`;

                    inputCep.innerHTML += `Data: ${dataFormatada} (${diaSemana})<br>Feriado: ${feriado.name}<br><br>`;
                });
            } else {
                inputCep.innerHTML = 'RESULTADO NÁO ENCONTRADO ou INVÁLIDO';
            }
        } catch (e) {
            inputCep.innerHTML = 'API OFFLINE OU ANO INVÁLIDO';
        }
        resultDiv.style.display = 'flex';
    };
    request.send();
}


function limparResultado() {
    inputCep.innerHTML = '';
    anoInput.value = '';
    resultDiv.style.display = 'none';  
}
