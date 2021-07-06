datas = open('./paperFiles/predictResult.txt', 'r', encoding='utf-8')

datas = datas.read()
datas = datas.split('\n')

password = []
result = []
predict = []
leak = []

f = open('./paperFiles/predictResult.csv', 'w')
f.write('password,result,predict,leak\n')

for data in datas:
    password.append(data.split(',')[0])
    result.append(data.split(',')[1])
    predict.append(data.split(',')[2])
    leak.append(data.split(',')[3])

    f.write(password[-1] + ',')
    f.write(result[-1] + ',')
    f.write(predict[-1] + ',')
    f.write(leak[-1] + '\n')

f.close()