import csv
import json
import sys


def convertCSV():
    fileFromJS = sys.argv[1]

    withoutComment = []
    withComment = []

    with open(fileFromJS, 'r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter=',', quotechar='|')

        for i, row in enumerate(reader):
            # Make sure there was no invoice and the order wasnt cancelled
            if row['InvoiceName'] == '' and row['InvoiceCompanyName'] == '' and row['SellerStatus'] != 'CANCELLED':
                # Break out of the loop when next section begins
                if row['BuyerName'] == '':
                    break

                # Make sure the row is not None
                if row['BuyerName'] is not None and row['TotalToPayAmount'] is not '':
                    if row['SellerNotes'] == '':
                        withoutComment.append(
                            {
                                'id': i,
                                'name': stripPolishLetters(row['BuyerName'].strip('"')), 
                                'note': row['SellerNotes'].strip('"'),
                                'total': row['TotalToPayAmount'].strip('"'),
                                'delivery': row['DeliveryAmount'].strip('"'),
                                'date': row['OrderDate'].strip('"')
                            }
                        )
                    else:
                        withComment.append(
                            {
                                'id': i,
                                'name': stripPolishLetters(row['BuyerName'].strip('"')), 
                                'note': row['SellerNotes'].strip('"'),
                                'total': row['TotalToPayAmount'].strip('"'),
                                'delivery': row['DeliveryAmount'].strip('"'),
                                'date': row['OrderDate'].strip('"')
                            }
                        )

    return [withoutComment, withComment]


def stripPolishLetters(string):
    nonEnglishLetters = '????????????????????????????????????'
    swapFor='AaCcEeLlNnOoSsZzZz'


    translator=str.maketrans(nonEnglishLetters, swapFor)
    
    
    return string.translate(translator)


def echo():
    result = convertCSV()
    elem = json.dumps(result)
    return elem


print(echo())
