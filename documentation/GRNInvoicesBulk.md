# GRN Invoices BULK PDF download 
Example JSON input for generating GRN invoices Bulk PDF as zip
```
{
   "payload":{
      "template":"purchaseOrderGRNInvoices",
      "pdfInputArray":[
         {
            "pdfFileName":"invoice-1938-GRN--PO22823 - A.pdf",
            "receipts":[
               "https://airlift-grocer-staging-uploads.s3.ap-southeast-1.amazonaws.com/grocer/73b34695-1b3a-4dd8-bc03-113d40284a54_invoice.jpg"
            ],
            "invoiceAmount":4000,
            "grnName":"22823 - A",
            "poId":22823,
            "s3Bucket":"uzair-test-uploads",
            "s3Prefix":"grocer"
         },
         {
            "pdfFileName":"invoice-2924-GRN--PO24438 - A.pdf",
            "receipts":[
               "12a7c4e0-4d2b-461a-b24b-02a6e4d62ea5_5eba9bcffa349a272017e773_coke-cola-1l.png"
            ],
            "invoiceAmount":169931,
            "grnName":"24438 - A",
            "poId":24438,
            "s3Bucket":"uzair-test-uploads",
            "s3Prefix":"grocer"
         },
         {
            "pdfFileName":"invoice-2925-GRN--PO24438 - B.pdf",
            "receipts":[
               "d2752a03-004e-4b5e-9606-ea17a997370e_5eba9bcffa349a272017e773_coke-cola-1l.png"
            ],
            "invoiceAmount":632184,
            "grnName":"24438 - B",
            "poId":24438,
            "s3Bucket":"uzair-test-uploads",
            "s3Prefix":"grocer"
         }
      ]
   }
}
```