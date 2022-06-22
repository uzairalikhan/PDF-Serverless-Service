const Pdfmake = require('pdfmake');
const jsZip = require('jszip');
const fonts = require('../constants/fonts');
const pdfFunctionMap = require('../constants/pdfFunctionsMap');

const pdfmake = new Pdfmake(fonts);

const processPDF = async (template, data) => {
    try {
        const pdfDoc = await pdfFunctionMap[template](pdfmake, data);
        return new Promise((resolve) => {
            let chunks = [];
            let pdfBuffer;
            pdfDoc.on('data', (chunk) => {
                chunks.push(chunk);
            });
            pdfDoc.on('end', async () => {
                // eslint-disable-next-line no-undef
                pdfBuffer = Buffer.concat(chunks);
                return resolve(pdfBuffer);
            });
            pdfDoc.end();
        });
    } catch (error) {
        throw new Error(error);
    }
};

exports.handler = async (event) => {
    const zip = new jsZip();
    if (!event.payload) {
        throw new Error('Please provide payload');
    }
    if (!event.payload.template || !pdfFunctionMap[event.payload.template]) {
        throw new Error('Template does not exist');
    }
    if (!event.payload.pdfInputArray) {
        throw new Error('PDF input array not provided');
    }
    for (const data of event.payload.pdfInputArray) {
        const pdfBuffer = await processPDF(event.payload.template, data);
        zip.file(data.pdfFileName, pdfBuffer);
    }
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    return {
        status: 200,
        body: JSON.stringify(zipBuffer.toString('base64'))
    };
};
