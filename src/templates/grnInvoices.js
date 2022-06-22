const getS3Object = require('../utils/s3');
const pagingFooter = require('./common/pagingFooter');
module.exports = function generateGRNInvoices(pdfmakeInstance, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        if (!payload.receipts) {
            return reject('Invoice receipts not provided');
        }
        const content = [
            {
                image: 'src/assets/images/logo.png',
                width: 150,
                height: 40,
                alignment: 'center',
                margin: [0, 0, 0, 10]
            },
            { text: 'Airlift Grocer', style: { color: '#db2032', alignment: 'center', margin: [0, 50, 0, 50], fontSize: 12 } },
            { text: `${payload.grnName}`, style: { color: '#db2032', alignment: 'center', fontSize: 12 }, margin: [0, 0, 0, 30] },
            {
                columns: [
                    { text: `Invoice Amount: ${payload.invoiceAmount} `, fontSize: 10 },
                    {
                        text: `PO#: ${payload.poId}`,
                        style: { alignment: 'right', fontSize: 10 },
                    },
                ],
                margin: [0, 0, 0, 10]
            }
        ];
        for (const receipt of payload.receipts) {
            const receiptPath = receipt.split('/');
            const s3Key = `${payload.s3Prefix}/${receiptPath[receiptPath.length - 1]}`;
            const s3Response = await getS3Object(payload.s3Bucket, s3Key);
            const image = s3Response.Body.toString('base64');
            content.push(
                {
                    image: `data:image/jpeg;base64,${image}`,
                    width: 500,
                    height: 500,
                    alignment: 'center'
                }
            );
        }
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
