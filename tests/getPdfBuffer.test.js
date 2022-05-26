/* eslint-disable no-undef */
const lambda = require('../src/handlers/getPdfBuffer');

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
                type: 'PurchaseOrder'
            }
        };
        try {
            await lambda.handler(input);
        } catch (e) {
            expect(e.message).toBe('Table items not provided');
        }
    });

    test('should return 200 if complete input is provided', async () => {
        const input = {
            payload: {
                type: 'PurchaseOrder',
                items: []
            }
        };
        const resp = await lambda.handler(input);
        expect(resp.status).toBe(200);
    });
});
