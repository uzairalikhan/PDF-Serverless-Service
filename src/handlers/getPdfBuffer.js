const Pdfmake = require('pdfmake');
const fonts = require('../constants/fonts');
const pdfFunctionMap = require('../constants/pdfFunctionsMap');

const pdfmake = new Pdfmake(fonts);

exports.handler = async (event) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        let chunks = [];
        let pdfBuffer;

        if (!event.payload) {
            return reject('Please provide payload');
        }

        if (!event.payload.template || !pdfFunctionMap[event.payload.template]) {
            return reject('Template does not exist');
        }

        try {
            const pdfDoc = await pdfFunctionMap[event.payload.template](pdfmake, event.payload);
            pdfDoc.on('data', (chunk) => {
                chunks.push(chunk);
            });
            pdfDoc.on('end', async () => {
                // eslint-disable-next-line no-undef
                pdfBuffer = Buffer.concat(chunks);
                return resolve({
                    status: 200,
                    body: JSON.stringify(pdfBuffer.toString('base64'))
                });
            });
            pdfDoc.end();
        } catch (error) {
            return reject(error);
        }
    }).catch((error) => {
        throw new Error(error);
    });
};
