# GRN PO BULK PDF download 
Example JSON input for generating GRN PO Bulk PDF as zip
```
{
   "payload":{
      "template":"purchaseOrder",
      "pdfInputArray":[
         {
            "pdfFileName":"Lahore EW2-2021-03-03-Bread & Beyond-PO No 18534.pdf",
            "id":18534,
            "date":"2021-03-03",
            "supplierName":"Bread & Beyond",
            "warehouse":"Lahore EW2",
            "creditDays":1,
            "warehouseAddress":"Defence Road Lahore",
            "items":[
               {
                  "name":"Bread & Beyond Classic Rusk 190gm\\t",
                  "barcode":"8961101815974",
                  "totalPrice":68,
                  "unitPrice":68,
                  "units":1,
                  "bulkUnits":1,
                  "bulkRemainder":0,
                  "supplierSku":"-"
               },
               {
                  "name":"Bread & Beyond Country White Bread Large",
                  "barcode":"8964000178836",
                  "totalPrice":324,
                  "unitPrice":108,
                  "units":3,
                  "bulkUnits":3,
                  "bulkRemainder":0,
                  "supplierSku":"-"
               },
               {
                  "name":"Bread & Beyond Country Bran Bread 480gm",
                  "barcode":"8964000178119",
                  "totalPrice":1170,
                  "unitPrice":90,
                  "units":13,
                  "bulkUnits":13,
                  "bulkRemainder":0,
                  "supplierSku":"-"
               },
               {
                  "name":"Bread & Beyond Bran Cake Rusk 270gm",
                  "barcode":"8964000178577",
                  "totalPrice":621,
                  "unitPrice":207,
                  "units":3,
                  "bulkUnits":3,
                  "bulkRemainder":0,
                  "supplierSku":"-"
               },
               {
                  "name":"Bread & Beyond Pita Bread 4pcs",
                  "barcode":"8964000178133",
                  "totalPrice":100,
                  "unitPrice":50,
                  "units":2,
                  "bulkUnits":2,
                  "bulkRemainder":0,
                  "supplierSku":"-"
               },
               {
                  "name":"Bread & Beyond Superior Bun 4pcs",
                  "barcode":"8961101815660",
                  "totalPrice":126,
                  "unitPrice":63,
                  "units":2,
                  "bulkUnits":2,
                  "bulkRemainder":0,
                  "supplierSku":"-"
               },
               {
                  "name":"Bread & Beyond Mighty Buns Seeded 180gm",
                  "barcode":"8964001123729",
                  "totalPrice":126,
                  "unitPrice":63,
                  "units":2,
                  "bulkUnits":2,
                  "bulkRemainder":0,
                  "supplierSku":"-"
               }
            ]
         }
      ]
   }
}
```