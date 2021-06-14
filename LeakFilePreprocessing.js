const fs = require('fs');

var datas = fs.readFileSync('./files/LeakData.txt', 'utf8');
datas = datas.split('\n');

var data = [];
var value = [];

for(let i = 0; i < datas.length; i++) {
    data[i] = datas[i].split(':')[0];
    value[i] = datas[i].split(':')[1];
}

// console.log(data.length, data[data.length - 1]);
// console.log(value.length, value[value.length - 1]);

var leakDatas = [];
var leakValues = [];
var notLeakDatas = [];
var notLeakValues = [];

var leakCount = 0;
var notLeakCount = 0;

for(let i = 0; i < datas.length; i++) {
    if(value[i] == 0) {
        notLeakDatas[notLeakCount] = data[i];
        notLeakValues[notLeakCount] = value[i];
        notLeakCount += 1;

    }
    else {
        leakDatas[leakCount] = data[i];
        leakValues[leakCount] = value[i];
        leakCount += 1;  
        
    }
}

