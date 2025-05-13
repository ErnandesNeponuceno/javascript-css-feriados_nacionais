// PDF
export function gerarPDF(feriadosData, ano) {
    const { jsPDF } = window.jspdf;

    if (!feriadosData || feriadosData.length === 0) {
        throw new Error("Nenhum dado para exportar");
    }

    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text(`Feriados Nacionais - ${ano}`, 105, 15, { align: "center" });

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

    doc.save(`feriados_${ano}.pdf`);
}

// CSV
export function gerarCSV(feriadosData, ano) {
    if (!feriadosData || feriadosData.length === 0) {
        throw new Error("Nenhum dado para exportar");
    }

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
    a.download = `feriados_${ano}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
