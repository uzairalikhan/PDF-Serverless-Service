const pagingFooter = require('./common/pagingFooter');
module.exports = function generateTransactionHistoryPDF(pdfmakeInstance, payload) {
    return new Promise((resolve, reject) => {
        if (!payload.items) {
            return reject('Table items not provided');
        }
        const tableHeadings = ['S.No', 'Date', 'Type', 'Description', 'Proof Of Payment', 'Initial Balance', 'Debit', 'Credit', 'Closing Balance'];

        const pdfHeadings = tableHeadings.map((data) => {
            return { text: data, bold: true, fontSize: 9, alignment: 'center' };
        });
        const tableBody = [
            pdfHeadings
        ];
        payload.items.forEach((item, i) => {
            tableBody.push(Object.values({
                sNo: i + 1,
                date: item.date,
                type: item.type,
                description: item.description,
                proofOfPayment: item.proofOfPayment,
                initialBalance: item.initialBalance,
                debit: item.debit,
                credit: item.credit,
                closingBalance: item.closingBalance,
            }));
        });
        const content = [
            {
                image: 'src/assets/images/logo.png',
                width: 180,
                height: 50,
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },
            { text: 'Airlift Grocer', style: { color: '#db2032', alignment: 'center', margin: [0, 50, 0, 50], fontSize: 12 } },
            { text: `Distributor: ${payload.supplierName || ''}`, style: { color: '#db2032', alignment: 'center', fontSize: 12 } },
            {
                layout: {
                    hLineWidth: function () {
                        return 2;
                    },
                    vLineWidth: function () {
                        return 1;
                    },
                    hLineColor: function () {
                        return '#aaa';
                    },
                    vLineColor: function () {
                        return '#aaa';
                    }
                },
                table: {
                    headerRows: 1,
                    heights: 20,
                    body: tableBody,
                    widths: ['5%', '20%', '8%', '22%', '9%', '9%', '9%', '9%', '9%']
                },
                margin: [0, 15, 0, 15]
            }
        ];
        const docDefinition = {
            footer: pagingFooter,
            pageMargins: [10, 10, 10, 25],
            content,
            defaultStyle: {
                fontSize: 8
            }
        };

        resolve(pdfmakeInstance.createPdfKitDocument(docDefinition));
    });
};
