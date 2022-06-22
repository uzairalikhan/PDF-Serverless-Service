const templates = require('../templates');

module.exports = {
    ['purchaseOrder']: templates.purchaseOrder,
    ['remainingPurchaseOrder']: templates.remainingPos,
    ['purchaseOrderGRN']: templates.purchaseOrderGRN,
    ['supplierLedger']: templates.generateTransactionHistoryPDF,
    ['purchaseOrderGRNInvoices']: templates.generateGRNInvoices
};
