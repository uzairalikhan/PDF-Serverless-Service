# GRN Bulk PDF Download 
Example JSON input for generating GRN bulk PDFs as zip
```
{
   "payload":{
      "template":"purchaseOrderGRN",
      "pdfInputArray":[
         {
            "pdfFileName":"Lahore EW2-GRN--18534 - A-Bread & Beyond-2021-03-03.pdf",
            "grnName":"18534 - A",
            "poId":18534,
            "isQualityChecked":false,
            "supplierName":"Bread & Beyond",
            "checkInUserName":"Muhammad Imran",
            "checkInUserContact":null,
            "checkInTime":"2021-03-04 16:04",
            "salesTaxStatus":"Inclusive",
            "amount":6048,
            "deliveryCharges":0,
            "deliveryChargesComments":null,
            "salesTax":0,
            "currencyCode":"PKR",
            "advanceIncomeTax":null,
            "promotion":null,
            "discount":null,
            "total":6048,
            "warehouse":"Lahore EW2",
            "date":"2021-03-03",
            "items":[
               {
                  "name":"Bread & Beyond Bakarkhani 2pcs",
                  "poQuantity":3,
                  "checkedInQuantity":3,
                  "qcAcceptedQuantity":"-",
                  "qcDisposedQuantity":"-",
                  "qcReturnedQuantity":"-",
                  "unitPrice":90,
                  "totalPrice":270,
                  "status":""
               },
               {
                  "name":"Bread & Beyond Country Bran Bread 480gm",
                  "poQuantity":13,
                  "checkedInQuantity":13,
                  "qcAcceptedQuantity":"-",
                  "qcDisposedQuantity":"-",
                  "qcReturnedQuantity":"-",
                  "unitPrice":90,
                  "totalPrice":1170,
                  "status":""
               },
            ],
            "isSupplierSKUAvailable":false
         }
      ]
   }
}
```