const ano = document.getElementById('ano');
const inputAno = document.getElementById('result');
const resultDiv = document.querySelector('.main__result');

function consultaFeriado() {
    const year = ano.value.trim();

    if (year.length !== 4 || isNaN(year)) {
        openAlert();  
        return;  
    }

    const url = 'https://brasilapi.com.br/api/feriados/v1/' + year;
    const request = new XMLHttpRequest();

    request.open('GET', url);
    request.onerror = function (e) {
        inputAno.innerHTML = 'API OFFLINE';
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

                    inputAno.innerHTML += `Data: ${dataFormatada} (${diaSemana})<br>Feriado: ${feriado.name}<br><br>`;
                });
            } else {
                inputAno.innerHTML = 'RESULTADO NÃO ENCONTRADO ou INVÁLIDO';
            }
        } catch (e) {
            inputAno.innerHTML = 'API OFFLINE OU ANO INVÁLIDO';
        }
        resultDiv.style.display = 'flex';
    };
    request.send();
}

function openAlert() {
    document.getElementById('alert').style.display = 'block';
}

function closeAlert() {
    document.getElementById('alert').style.display = 'none';
}

document.getElementById('closeAlert').addEventListener('click', closeAlert);
document.getElementById('closeBtn').addEventListener('click', closeAlert);

window.onclick = function(event) {
    const modal = document.getElementById('alert');
    if (event.target === modal) {
        closeAlert();
    }
};

function limparResultado() {
    inputAno.innerHTML = '';
    ano.value = '';
    resultDiv.style.display = 'none';
}
