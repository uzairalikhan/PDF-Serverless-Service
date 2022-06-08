module.exports = function generatePdf(pdfmakeInstance, payload) {
    return new Promise((resolve, reject) => {
        if (!payload.items) {
            return reject('Table items not provided');
        }
        const headings = ['S.No', 'Item Name', 'Barcode', 'Distributor SKU', 'Item Status', 'PO Quantity',
            'Delivered Quantity', 'Remaining Quantity'];
        const tableHeadings = headings.map((data) => {
            return { text: data, bold: true, fontSize: 8 };
        });
        const tableBody = [
            tableHeadings
        ];
        payload.items.forEach((item, i) => {
            tableBody.push(Object.values({
                sNo: i + 1,
                name: item.name,
                barcode: item.barcode,
                distributor: item.supplierSku,
                status: item.status,
                units: item.units,
                checkedInUnits: item.checkedInUnits,
                remainingQuantity: item.remainingQuantity
            }));
        });

        const content = [
            {
                image: 'src/assets/images/logo.png',
                width: 230,
                height: 60,
                margin: [0, 0]
            },
            { text: 'Purchase Order', style: 'heading' },
            { text: `PO Number: ${payload.id}`, style: 'subHeading' },
            { text: `PO Date: ${payload.date}`, style: 'subHeading' },
            { text: `Distributor Name: ${payload.supplierName}`, style: 'subHeading' },
            { text: `Warehouse: ${payload.warehouse}`, style: 'subHeading' },
            {
                table: {
                    heights: 20,
                    headerRows: 1,
                    body: tableBody
                },
            },
            { text: 'Regards,', margin: [0, 15], fontSize: 18 },
            { text: 'Airlift Grocer', fontSize: 18 }
        ];

        const docDefinition = {
            pageMargins: [10, 10, 10, 10],
            content: [
                ...content
            ],
            styles: {
                heading: {
                    fontSize: 25,
                    bold: true,
                    margin: [0, 10]
                },
                subHeading: {
                    fontSize: 15,
                    bold: true,
                    margin: [0, 10]
                }
            },
            defaultStyle: {
                fontSize: 8
            }
        };
        resolve(pdfmakeInstance.createPdfKitDocument(docDefinition));
    });
};
