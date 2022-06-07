 # Remaining Purchase Order PDF 
 Example JSON input for generating Remaining Purchase Order PDF
```
{
  "payload": {
    "template": "remainingPurchaseOrder",
    "id": 21389,
    "date": "2021-05-24",
    "supplierName": "Nestle",
    "warehouse": "Karachi EW1",
    "items": [
      {
        "name": "Nestle Nan Lactose Free 400gm",
        "barcode": "7613035598126",
        "supplierSku": "-",
        "units": 100,
        "status": "requested",
        "checkedInUnits": 0,
        "remainingQuantity": 100
      }
    ]
  }
}
```