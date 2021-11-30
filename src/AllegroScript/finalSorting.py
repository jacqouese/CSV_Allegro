import json
import sys

from calendar import monthrange



def finalSorting():
    dataFromJS = sys.argv[1]
    
    parsedData = json.loads(dataFromJS)

    totalSum = 0
    dailySum = []

    # num of days to iterate over
    days = daysInMonth(2021, 10)

    # prepare dict with all days of a month as keys
    for day in range(days+1):
        dailySum.append({
            0: f'2021-10-{"{:02d}".format(day)}', 
            1: 0, 
            2: 0, 
            3: 0
        })
            
    
    sortedData = sorted(parsedData, key=lambda d: d['id'])

    for elem in sortedData:
        total = float(elem['total'])
        beforeVat = total/1.23
        vatValue = total-beforeVat

        elem['beforeVat'] = "%.2f" % round(beforeVat, 2)
        elem['vatValue'] = "%.2f" % round(vatValue, 2)

        date = elem['date'].split('T')[0]

        day = date.split('-')[2]
        day = int(day)

        totalSum += total


        dailySum[day][1] += total
        dailySum[day][2] += beforeVat
        dailySum[day][3] += vatValue

    dailySum[0][1] = totalSum
    dailySum[0][2] = totalSum/1.23
    dailySum[0][3] = totalSum-(totalSum/1.23)


    # convert to 2 decimal places
    for elem in dailySum:
        elem[1] = "%.2f" % round(elem[1], 2)
        elem[2] = "%.2f" % round(elem[2], 2)
        elem[3] = "%.2f" % round(elem[3], 2)


    return [sortedData, totalSum, dailySum]
        

# return how many days in a current month
def daysInMonth(year, month):
    return monthrange(year, month)[1]


def echo():
    result = finalSorting()
    elem = json.dumps(result)
    return elem


print(echo())
