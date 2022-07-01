module.exports = function generatePO(pdfmakeInstance, payload) {
    return new Promise((resolve, reject) => {
        if (!payload.items) {
            return reject('Table items not provided');
        }

        const tableHeadings = ['Product ID', 'Barcode #', 'Sub-Category ID', 'Product Name', 'Qty', 'Bulk Qty', 'Cost Price inc. Tax', 'Bulk Price inc. Tax'];

        const pdfHeadings = tableHeadings.map((data) => {
            return { text: data, bold: true, fontSize: 9, color: '#FFFFFF' };
        });
        const tableBody = [
            pdfHeadings
        ];

        payload.items.forEach((item) => {
            const bulkItems = item.bulkPackageSize ? `${item.bulkPackageSize}x${item.bulkUnits}` : item.bulkUnits;
            const units = item.bulkRemainder ? `and ${item.bulkRemainder} units` : '';
            tableBody.push(Object.values({
                sNo: item.productId,
                barcode: item.barcode,
                subCategoryId: ' - ',
                name: item.name,
                units: item.units,
                bulkQuantity: `${bulkItems} bulks ${units}`,
                unitPrice: item.unitPrice.toFixed(2),
                totalPrice: { text: `${item.totalPrice.toFixed(2)}`, fillColor: '#F2F2F2' }
            }));
        });
        const layout = {
            hLineWidth: function () {
                return 0.5;
            },
            vLineWidth: function () {
                return 0.5;
            },
            hLineColor: function () {
                return '#999999';
            },
            vLineColor: function () {
                return '#999999';
            }
        };
        const content = [
            {
                columns: [
                    {
                        image: 'src/assets/images/airlift-new-logo.png',
                        width: 120,
                        height: 60,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    [
                        { text: 'PURCHASE ORDER\n', style: { color: '#FF2840', bold: true, fontSize: 25, alignment: 'right', }, margin: [0, 15, 0, 0] },
                        { text: `${payload.supplierName}`, fontSize: 14, alignment: 'right', margin: [0, 0, 0, 0] },
                    ],
                ],
            },
            {
                layout: { ...layout, fillColor: '#F2F2F2' },
                margin: [0, 20, 0, 0],
                table: {
                    widths: ['50%', '50%'],
                    body: [
                        [
                            { text: 'SUPPLIER DETAILS', bold: true, fontSize: 10, alignment: 'center', border: [true, true, true, false] },
                            { text: 'ORDER DETAILS', bold: true, fontSize: 10, alignment: 'center', border: [true, true, true, false], },
                        ]
                    ]
                }
            },
            {
                columns: [
                    {
                        layout,
                        table: {
                            widths: ['30%', '70%'],
                            heights: [24],
                            body: [
                                [{ text: 'Address:' }, { text: `${payload.distributorAddress}` },],
                                [{ text: 'Supplier NTN:' }, { text: `${payload.ntn || '-'}` }],
                                [{ text: 'Supplier STRN:' }, { text: `${payload.strn || '-'}` }],
                                [{ text: 'Contact Name:' }, { text: `${payload.supplierName}` }],
                                [{ text: 'Contact Number:' }, { text: `${payload.phone}` }],
                                [{ text: 'Email ID:' }, { text: `${payload.email}` }],
                                [{ text: 'Credit Terms:' }, { text: `${payload.creditDays} Days` }],
                                [{ text: 'Credit Method:' }, { text: `${payload.paymentMethod || '-'}` }],
                            ]
                        }
                    },
                    {

                        layout,
                        table: {
                            widths: ['30%', '70%'],
                            heights: ['', '', '', '', 24, 36],
                            body: [
                                [{ text: 'PO Number:', border: [false, true, true, true] }, { text: `${payload.id}` }],
                                [{ text: 'Date Issued:', border: [false, true, true, true] }, { text: `${payload.date}` }],
                                [{ text: 'Deadline To Deliver:', border: [false, true, true, true] }, { text: ' - ' }],
                                [{ text: 'Deliver To:', border: [false, true, true, true] }, { text: `${payload.warehouse}` }],
                                [{ text: 'Delivery Address:', border: [false, true, true, true] }, { text: `${payload.warehouseAddress}` }],
                                [{ text: 'Special Conditions/Notes:', border: [false, true, true, true] }, { text: `${payload.comment}` }],
                            ]
                        }
                    }
                ]
            },
            {
                layout: {
                    ...layout,
                    fillColor: function (rowIndex) {
                        return (rowIndex === 0) ? '#333333' : null;
                    }
                },
                margin: [0, 20, 0, 0],
                table: {
                    body: tableBody,
                    widths: ['6%', '8%', '10%', '35%', '6%', '13%', '11%', '11%']
                }
            },
            {
                layout: {
                    ...layout
                },
                margin: [0, 0, 0, 20],
                table: {
                    body: [
                        [
                            { text: 'Total', bold: true, fontSize: 14, alignment: 'left', border: [true, false, true, true], margin: [0, 5] },
                            { text: `${payload.totalPrice.toFixed(2)} Rs.`, bold: true, fillColor: '#F2F2F2', fontSize: 14, alignment: 'left', border: [true, false, true, true], margin: [0, 5] },
                        ]
                    ],
                    widths: ['89%', '11%']
                }
            },
            {
                layout: { ...layout, fillColor: '#F2F2F2' },
                table: {
                    widths: ['100%'],
                    heights: [2, 2, 2, 2],
                    body: [
                        [
                            { text: 'Terms and Conditions:', bold: true, fontSize: 8, alignment: 'left', border: [false, false, false, false] },
                        ],
                        [{ text: '1. Purchase Order number must appear on Invoice/Delivery Challan.', fontSize: 7, alignment: 'left', border: [false, false, false, false] }],
                        [{ text: '2- Only one Invoice:Delivery Challan is accepted per purchase order.', fontSize: 7, alignment: 'left', border: [false, false, false, false] }],
                        [{ text: '3- This order is placed subject to the goods being supplied in accordance with the laws of Pakistan and that all local permits have been obtained by the supplier.', fontSize: 7, alignment: 'left', border: [false, false, false, false] }],
                        [{ text: '4- This computer generated purchase order does not require any signature.', fontSize: 7, alignment: 'left', border: [false, false, false, false] }],
                        [{ text: '5- The rights granted to the supplier of Airlift hereunder are personal to the supplier who shall not without the prior written consent of Airlift Pakistan assign, in whole or in part, to a third party any right or obligation, 6- including but not limited to through factoring, arising out or in connection with its contractual relationship with Airlift Pakistan. Any assignment made contrary to the terms hereof shall be null and void of no force and  effect.', fontSize: 7, alignment: 'left', border: [false, false, false, false] }],
                    ]
                }
            }
        ];
        const docDefinition = {
            pageOrientation: 'landscape',
            pageMargins: [10, 10, 10, 25],
            content,
            defaultStyle: {
                fontSize: 8
            }
        };
        resolve(pdfmakeInstance.createPdfKitDocument(docDefinition));
    });
};
