const fs = require('fs');
/* eslint-disable no-undef */
const lambda = require('../src/handlers/getPdfBuffer');

const successPayload = {
    payload: {
        template: 'purchaseOrder',
        items: [
            {
                sNo: 1,
                name: 'test product',
                barcode: 123123,
                supplierSku: 'test',
                quantity: 1,
                units: 1
            }
        ]
    }
};

describe('Test getPdfBuffer lambda', () => {
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

    test('should throw error if table items are not provided', async () => {
        const input = {
            payload: {
                template: 'purchaseOrder'
            }
        };
        try {
            await lambda.handler(input);
        } catch (e) {
            expect(e.message).toBe('Table items not provided');
        }
    });

    test('should return 200 if complete input is provided', async () => {
        try {
            const resp = await lambda.handler(successPayload);
            expect(resp.status).toBe(200);
        } catch (e) {
            expect(e).toBe(null);
        }
    });

    test('should create pdf file using returned buffer', async () => {
        const resp = await lambda.handler(successPayload);
        expect(resp.status).toBe(200);
        try {
            const fileName = 'test.pdf';
            const buffer = Buffer.from(resp.body, 'base64');
            fs.writeFileSync(fileName, buffer);
            const stats = fs.statSync(fileName);
            expect(stats.size > 10000);
            fs.unlinkSync(fileName);
        } catch (err) {
            expect(err).toBe(null);
        }
    });
});
