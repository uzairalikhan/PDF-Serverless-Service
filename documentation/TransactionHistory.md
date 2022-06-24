 # Transaction History PDF
 Example JSON input for generating transaction history PDF
```
{
   "payload":{
      "template":"supplierLedger",
      "supplierName":"MSWDistributor_1652882816614",
      "items":[
         {
            "type":"DEBIT",
            "date":"2022-06-22T11:04:21.796Z",
            "description":"Bank Transfer for GRN#28496 - A (Created against Invoice#123 and PO#28496) - Payment Due Date is 2022-Jun-07",
            "proofOfPayment":"-",
            "initialBalance":"-574475.621",
            "closingBalance":"-574463.621",
            "debit":12,
            "credit":"-"
         },
         {
            "type":"CREDIT",
            "date":"2022-05-23T06:57:19.841Z",
            "description":"GRN# 28496 - A (Created against Invoice# 123 and PO# 28496) - Invoice amount selected as it was lower - Payment Due Date is 2022-Jun-07",
            "proofOfPayment":"-",
            "initialBalance":"-377288.464",
            "closingBalance":"-377300.464",
            "debit":"-",
            "credit":-12
         }
      ]
   }
}
```