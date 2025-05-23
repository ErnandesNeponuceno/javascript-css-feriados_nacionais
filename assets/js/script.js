import { gerarPDF, gerarCSV } from './exportUtils.js';
const ano = document.getElementById('ano');
const inputAno = document.getElementById('result');
const resultDiv = document.querySelector('.main__result');
document.getElementById('buscarBtn').addEventListener('click', consultaFeriado);
document.getElementById('limparBtn').addEventListener('click', limparResultado);
let feriadosData = [];

function consultaFeriado() {
    const year = ano.value.trim();
    feriadosData = [];
    
    if (year.length !== 4 || isNaN(year)) {
        openAlert();  
        return;  
    }

    inputAno.innerHTML = '';
    const url = 'https://brasilapi.com.br/api/feriados/v1/' + year;
    const request = new XMLHttpRequest();

    request.open('GET', url);
    request.onerror = function(e) {
        inputAno.innerHTML = 'API OFFLINE';
        resultDiv.style.display = 'flex';
    };

    request.onload = () => {
        try {
            const response = JSON.parse(request.responseText);
            const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
            
            if (Array.isArray(response) && response.length > 0) {
                feriadosData = response;
                
                response.forEach(feriado => {
                    const [ano, mes, dia] = feriado.date.split('-');
                    const data = new Date(`${feriado.date}T00:00:00`);
                    const diaSemana = diasSemana[data.getDay()];
                    const dataFormatada = `${dia}/${mes}/${ano}`;

                    inputAno.innerHTML += `Data: ${dataFormatada} (${diaSemana})<br>Feriado: ${feriado.name}<br><br>`;
                });
                
                document.querySelector('.botoes_exportacao').style.display = 'flex';
            } else {
                inputAno.innerHTML = 'NENHUM FERIADO ENCONTRADO PARA ESTE ANO';
            }
        } catch (e) {
            inputAno.innerHTML = 'API OFFLINE OU ANO INVÁLIDO';
        }
        resultDiv.style.display = 'flex';
    };
    request.send();
}

// Exportar PDF 
document.getElementById('pdf').addEventListener('click', function () {
    try {
        gerarPDF(feriadosData, ano.value);
        console.log('Aqui o valor do ano: ', ano.value)
    } catch (error) {
        console.error(error.message);
        Toastify({
            text: error.message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
    }
});

// Exportar CSV 
document.getElementById('csv').addEventListener('click', function() {
    try {
        gerarCSV(feriadosData, ano.value);
    } catch (error) {
        console.error(error.message);
        Toastify({
            text: error.message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
    }
});


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
    document.querySelector('.botoes_exportacao').style.display = 'none';
}


