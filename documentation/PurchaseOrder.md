 # Purchase Order PDF
 Example JSON input for generating Purchase Order PDFs
```
{
    "payload": {
      "type": "PurchaseOrder",
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