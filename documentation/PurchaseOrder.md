 # Purchase Order PDF
 Example JSON input for generating Purchase Order PDFs
```
{
  "payload": {
    "template": "purchaseOrder",
    "id": 21389,
    "date": "2021-05-24",
    "supplierName": "Nestle",
    "warehouse": "Karachi EW1",
    "items": [
      {
        "name": "name",
        "barcode": "barcode",
        "supplierSku": "supplierSku",
        "units": "units",
        "bulkUnits": "123"
      }
    ]
  }
}
```