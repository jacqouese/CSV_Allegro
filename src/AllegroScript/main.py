import csv
import json


def convertCSV():
    arr = []

    with open('or.csv', 'r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter=',', quotechar='|')

        for row in reader:
            # Make sure there was no invoice and the order wasnt cancelled
            if row['InvoiceName'] == '' and row['InvoiceCompanyName'] == '' and row['SellerStatus'] != 'CANCELLED':
                # Break out of the loop when next section begins
                if row['BuyerName'] == '':
                    break

                # Make sure the row is not None
                if row['BuyerName'] is not None:
                    arr.append(
                        {
                            'name': row['BuyerName'].strip('"'), 
                            'note': row['SellerNotes'].strip('"'),
                            'total': row['TotalToPayAmount'].strip('"'),
                            'delivery': row['DeliveryAmount'].strip('"')
                        }
                    )

    return arr


def echo():
    elem = json.dumps(convertCSV())
    return elem


print(echo())
