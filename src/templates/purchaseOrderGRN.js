const pagingFooter = require('./common/pagingFooter');
module.exports = function generatePOGRN(pdfmakeInstance, payload) {
    return new Promise((resolve, reject) => {
        if (!payload.items) {
            return reject('Table items not provided');
        }
        const tableHeadings = ['S.No', 'Name', 'PO Quantity', 'Checked-in Quantity'];
        if (payload.isQualityChecked) {
            tableHeadings.push('QC Pass', 'Disposed', 'Returned');
        }
        tableHeadings.push('Unit Price', 'Total Price', 'Status');

        const pdfHeadings = tableHeadings.map((data) => {
            return { text: data, bold: true, fontSize: 9, alignment: 'center' };
        });
        const tableBody = [
            pdfHeadings
        ];

        payload.items.forEach((item, i) => {
            const updatedObject = {
                sNo: i + 1,
                name: item.name,
                poQuantity: Number(item.poQuantity).toFixed(2),
                checkedInQuantity: Number(item.checkedInQuantity).toFixed(2),
            };
            if (payload.isQualityChecked) {
                updatedObject['qcAcceptedQuantity'] = item.qcAcceptedQuantity;
                updatedObject['qcDisposedQuantity'] = item.qcDisposedQuantity;
                updatedObject['qcReturnedQuantity'] = item.qcReturnedQuantity;
            }
            updatedObject['unitPrice'] = Number(item.unitPrice).toFixed(2);
            updatedObject['totalPrice'] = Number(item.totalPrice).toFixed(2);
            updatedObject['status'] = item.status;
            tableBody.push(Object.values(updatedObject));
        });
        const content = [
            {
                image: 'src/assets/images/logo.png',
                width: 130,
                height: 35,
                alignment: 'center',
                margin: [0, 0, 0, 18]
            },
            {
                text: 'Airlift Grocer',
                style: {
                    color: '#db2032', alignment: 'center', margin: [0, 50, 0, 50], fontSize: 12
                }
            },
            { text: `${payload.grnName}`, style: { color: '#db2032', alignment: 'center', fontSize: 12 } },
            { text: `${payload.warehouse}`, style: { alignment: 'center', fontSize: 12 }, margin: [0, 0, 0, 10] },
            {
                columns: [
                    { text: `Distributor: ${payload.supplierName} `, fontSize: 10 },
                    {
                        text: `Received for Airlift by: ${payload.checkInUserName} ${payload.checkInUserContact} at ${payload.checkInTime}`,
                        style: { alignment: 'right', fontSize: 10 }
                    },
                ]
            },
            { text: `Sales Tax: ${payload.salesTaxStatus}`, fontSize: 10 },
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
                    widths: payload.isQualityChecked ?
                        ['5%', '14%', '10%', '10%', '10%', '10%', '10%', '8%', '8%', '15%'] :
                        ['5%', '25%', '13%', '13%', '13%', '13%', '18%']
                },
                margin: [0, 15, 0, 15]
            },
            { text: `Total Price: ${Number(payload.amount).toFixed(2)}`, margin: [0, 10], style: 'additionalDetails' },
            { text: `Delivery Charges: ${payload.deliveryCharges}`, margin: [0, 5], style: 'additionalDetails' },
            { text: `Sales Tax: ${payload.salesTax} ${payload.currencyCode}`, margin: [0, 5], style: 'additionalDetails' },
            { text: `Advance Income Tax: ${payload.advanceIncomeTax || ''}`, margin: [0, 5], style: 'additionalDetails' },
            { text: `Discount: ${payload.discount || ''}`, margin: [0, 5], style: 'additionalDetails' },
            { text: `Promotion: ${payload.promotion || ''}`, margin: [0, 5], style: 'additionalDetails' },
            { text: `Total: ${Number(payload.total).toFixed(2)}`, margin: [0, 5], style: 'additionalDetails' },
        ];
        if (payload.deliveryChargesComments && payload.deliveryChargesComments.length > 0) {
            content.push({ text: `Delivery Note: ${payload.deliveryChargesComments}`, style: 'additionalDetails' });
        }
        const docDefinition = {
            footer: pagingFooter,
            pageMargins: [10, 10, 10, 25],
            content,
            styles: {
                additionalDetails: {
                    alignment: 'right',
                    fontSize: 9
                }
            },
            defaultStyle: {
                fontSize: 8
            }
        };
        resolve(pdfmakeInstance.createPdfKitDocument(docDefinition));
    });
};
