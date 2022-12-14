const fs = require('fs');
const jsZip = require('jszip');
/* eslint-disable no-undef */
const lambda = require('../src/handlers/getBulkPdfZipBuffer');
jest.mock('../src/utils/s3');
const s3 = require('../src/utils/s3');
s3.mockImplementation(() => { return { Body: '<Buffer ff d8 ff e0 00 10 4a 46>' }; });
const successPayload = {
    payload: {
        template: 'purchaseOrder',
        pdfInputArray: [
            {
                pdfFileName: 'one.pdf',
                totalPrice: 100,
                items: [
                    {
                        productId: 1,
                        name: 'test product',
                        barcode: 123123,
                        supplierSku: 'test',
                        quantity: 1,
                        units: 1,
                        subCategoryId: ' - ',
                        bulkQuantity: 1,
                        unitPrice: 10,
                        totalPrice: 100
                    }
                ]
            },
            {
                pdfFileName: 'two.pdf',
                totalPrice: 100,
                items: [
                    {
                        productId: 1,
                        name: 'test product',
                        barcode: 123123,
                        supplierSku: 'test',
                        quantity: 1,
                        units: 1,
                        subCategoryId: ' - ',
                        bulkQuantity: 1,
                        unitPrice: 10,
                        totalPrice: 100
                    }
                ]
            }
        ]
    }
};

describe('Test getBulkPdfZipBuffer lambda', () => {
    test('check if lambda exists', () => {
        expect(lambda.handler).toBeTruthy();
    });

    test('should throw error if payload is not provided', async () => {
        const input = {};
        try {
            await lambda.handler(input);
        } catch (e) {
            expect(e.message).toBe('Please provide payload');
        }
    });

    test('should throw error if pdf type is not provided', async () => {
        const input = {
            payload: {}
        };
        try {
            await lambda.handler(input);
        } catch (e) {
            expect(e.message).toBe('Template does not exist');
        }
    });

    test('should throw error if pdf input array not provided', async () => {
        const input = {
            payload: {
                template: 'purchaseOrder'
            }
        };
        try {
            await lambda.handler(input);
        } catch (e) {
            expect(e.message).toBe('PDF input array not provided');
        }
    });

    test('should return 200 if complete input is provided', async () => {
        const resp = await lambda.handler(successPayload);
        expect(resp.status).toBe(200);
    });

    test('should create zip file using returned buffer', async () => {
        const resp = await lambda.handler(successPayload);
        expect(resp.status).toBe(200);
        try {
            const fileName = 'test.zip';
            const expectedZipFileNames = ['one.pdf', 'two.pdf'];
            const receivedZipFileNames = [];
            const buffer = Buffer.from(resp.body, 'base64');
            fs.writeFileSync(fileName, buffer);
            const stats = fs.statSync(fileName);
            expect(stats.size > 10000);
            jsZip.loadAsync(buffer).then(zip => {
                for (let [filename] of Object.entries(zip.files)) {
                    receivedZipFileNames.push(filename);
                }
                expect(receivedZipFileNames).toStrictEqual(expectedZipFileNames);
                fs.unlinkSync(fileName);
            });
        } catch (err) {
            expect(err).toBe(null);
        }
    });
});
