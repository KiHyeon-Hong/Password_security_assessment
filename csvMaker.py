datas = open('./paperFiles/LeakPasswordFeatures.txt', 'r', encoding='utf-8')

datas = datas.read()
datas = datas.split('\n')

password = []
zxcvbn = []
luds = []
levenshtein = []
leak = []

f = open('./paperFiles/LeakPasswordFeatures.csv', 'w')
f.write('password,zxcvbn,luds,levenshtein,leak\n')

for data in datas:
    password.append(data.split(',')[0])
    zxcvbn.append(data.split(',')[1])
    luds.append(data.split(',')[2])
    levenshtein.append(data.split(',')[3])
    leak.append(data.split(',')[4])

    f.write(password[-1] + ',')
    f.write(zxcvbn[-1] + ',')
    f.write(luds[-1] + ',')
    f.write(levenshtein[-1] + ',')
    f.write(leak[-1] + '\n')

f.close()



datas = open('./paperFiles/notLeakPasswordFeatures.txt', 'r', encoding='utf-8')

datas = datas.read()
datas = datas.split('\n')

password = []
zxcvbn = []
luds = []
levenshtein = []
leak = []

f = open('./paperFiles/notLeakPasswordFeatures.csv', 'w')
f.write('password,zxcvbn,luds,levenshtein,leak\n')

for data in datas:
    password.append(data.split(',')[0])
    zxcvbn.append(data.split(',')[1])
    luds.append(data.split(',')[2])
    levenshtein.append(data.split(',')[3])
    leak.append(data.split(',')[4])

    f.write(password[-1] + ',')
    f.write(zxcvbn[-1] + ',')
    f.write(luds[-1] + ',')
    f.write(levenshtein[-1] + ',')
    f.write(leak[-1] + '\n')

f.close()