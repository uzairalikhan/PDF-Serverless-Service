# Single GRN PDF download 
Example JSON input for generating GRN PDF
```
{
   "payload":{
      "template":"purchaseOrderGRN",
      "grnName":"26212 - B",
      "poId":26212,
      "isQualityChecked":false,
      "supplierName":"Bisconni",
      "checkInUserName":"Checkin QA1",
      "checkInUserContact":"+923202451618",
      "checkInTime":"2022-02-03 18:47",
      "salesTaxStatus":"Inclusive",
      "amount":7276.5,
      "deliveryCharges":0,
      "deliveryChargesComments":null,
      "salesTax":0,
      "currencyCode":"PKR",
      "advanceIncomeTax":0,
      "promotion":0,
      "discount":0,
      "total":7276.5,
      "warehouse":"Karachi Mothership",
      "date":"2022-02-03",
      "items":[
         {
            "name":"Bisconni Chai Wala Biskut 12 Packs",
            "poQuantity":123,
            "checkedInQuantity":63,
            "qcAcceptedQuantity":"-",
            "qcDisposedQuantity":"-",
            "qcReturnedQuantity":"-",
            "unitPrice":115.5,
            "totalPrice":7276.5,
            "status":""
         }
      ],
      "isSupplierSKUAvailable":false
   }
}
```