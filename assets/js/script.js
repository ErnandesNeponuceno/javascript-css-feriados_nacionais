const { jsPDF } = window.jspdf; 
const ano = document.getElementById('ano');
const inputAno = document.getElementById('result');
const resultDiv = document.querySelector('.main__result');
let feriadosData = [];

function consultaFeriado() {
    const year = ano.value.trim();
    feriadosData = [];
    
    if (year.length !== 4 || isNaN(year)) {
        openAlert();  
        return;  
    }

    limparResultado();
    document.querySelector('.botoes_exportacao').style.display = 'none';

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
document.getElementById('pdf').addEventListener('click', function() {
    if (feriadosData.length === 0) {
        Toastify({
            text: "Nenhum dado para exportar",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
        return;
    }

    try {
        const doc = new jsPDF();
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.text(`Feriados Nacionais`, 105, 15, {align: "center"});
        doc.setFontSize(12);
        let y = 25;
        
        feriadosData.forEach((feriado, index) => {
            const [ano, mes, dia] = feriado.date.split('-');
            const data = new Date(`${feriado.date}T00:00:00`);
            const diaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][data.getDay()];
            const dataFormatada = `${dia}/${mes}/${ano}`;
            
            doc.text(`${dataFormatada} (${diaSemana}) - ${feriado.name}`, 14, y);
            y += 10;
            
            if (index < feriadosData.length - 1) {
                doc.setDrawColor(200);
                doc.line(10, y, 200, y);
                y += 5;
            }
            
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
        });
        
        doc.save(`feriados_${ano.value}.pdf`);
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        Toastify({
            text: "Erro ao gerar PDF",
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
    if (feriadosData.length === 0) {
        Toastify({
            text: "Nenhum dado para exportar",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
        return;
    }

    try {
        const csvData = feriadosData.map(feriado => {
            const [ano, mes, dia] = feriado.date.split('-');
            const data = new Date(`${feriado.date}T00:00:00`);
            const diaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][data.getDay()];
            return {
                Data: `${dia}/${mes}/${ano}`,
                'Dia da Semana': diaSemana,
                Feriado: feriado.name
            };
        });

        const csv = Papa.unparse(csvData, {
            quotes: true, 
            delimiter: ";",
            header: true
        });

        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `feriados_${ano.value}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Erro ao gerar CSV:", error);
        Toastify({
            text: "Erro ao gerar CSV",
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
}


