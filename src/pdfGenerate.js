import jsPDF from 'jspdf';
import 'jspdf-autotable';

const pdfGenerate = (data, dailySum, title, date) => {
    const doc = new jsPDF();
    doc.text(`${title} | ${date}`, 15, 10);
    doc.autoTable({
        body: [...data],
        columns: [
            { header: 'Name', dataKey: 'name' },
            { header: 'Note', dataKey: 'note' },
            { header: 'Total with shipping', dataKey: 'total' },
            { header: 'Shipping', dataKey: 'delivery' },
            { header: 'Before VAT', dataKey: 'beforeVat' },
            { header: 'VAT', dataKey: 'vatValue' },
        ],
    });

    doc.autoTable({
        tableWidth: 120,
        body: dailySum,
        columns: [
            { header: 'Date', dataKey: 0 },
            { header: 'Total', dataKey: 1 },
            { header: 'Total without VAT', dataKey: 2 },
            { header: 'VAT', dataKey: 3 },
        ],
    });

    doc.save(`${date.replace(/\s/g, '')}.pdf`);
};

export default pdfGenerate;
