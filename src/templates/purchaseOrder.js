module.exports = function generatePO(pdfmakeInstance, payload) {
    return new Promise((resolve, reject) => {
        if (!payload.items) {
            return reject('Table items not provided');
        }
        const headings = ['S.No', 'Item Name', 'Barode', 'Distributor Name', 'Quantity', 'Bulk Units'];
        const tableHeadings = headings.map((data) => {
            return { text: data, bold: true };
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
                quantity: item.units,
                units: `${item.bulkUnits} bulks and ${item.bulkRemainder} units`
            }));
        });
        const content = [
            {
                image: 'src/assets/images/logo.png',
                width: 250,
                height: 60,
                margin: [0, 15]
            },
            { text: 'Purchase Order', style: 'heading' },
            { text: `PO Number: ${payload.id}`, style: 'subHeading' },
            { text: `PO Date: ${payload.date}`, style: 'subHeading' },
            { text: `Distributor Name: ${payload.supplierName}`, style: 'subHeading' },
            { text: `Warehouse: ${payload.warehouse}`, style: 'subHeading' },
            { text: `Address: ${payload.warehouseAddress}`, style: 'subHeading' },
            {
                table: {
                    headerRows: 1,
                    heights: 30,
                    body: tableBody
                },
            },
            { text: `Payment in ${payload.creditDays} Days`, style: 'subHeading' },
            { text: 'Regards,', style: { margin: [0, 25], fontSize: 20 } },
            { text: 'Airlift Grocer', style: { margin: [0, 25], fontSize: 20 } },
            {
                canvas:
                    [
                        {
                            type: 'line',
                            x1: 0, y1: 10,
                            x2: 520, y2: 10,
                            lineWidth: 1
                        }
                    ]
            },
            { text: 'For any queries please reach out to us at:', style: 'subHeading' },
            { text: 'supplier-support@airlifttech.com Distributor Helpline(9am till 6pm):', style: { margin: [0, 25], fontSize: 18 } },
            { text: '04234511803', style: 'subHeading' }
        ];

        const docDefinition = {
            content: [
                ...content
            ],
            styles: {
                heading: {
                    fontSize: 25,
                    bold: true,
                    margin: [0, 15]
                },
                subHeading: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 10]
                }
            }
        };
        resolve(pdfmakeInstance.createPdfKitDocument(docDefinition));
    });
};
