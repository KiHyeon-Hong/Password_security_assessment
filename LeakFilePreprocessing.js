const fs = require('fs');
const koreanZxcvbn = require('./lib/koreanBasedPassword/koreanZxcvbn');
const zxcvbn = require('zxcvbn');
const koreanZxcvbnString = require('./lib/koreanBasedPassword/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

const levenshteinDistance = require('./lib/levenshteinDistance.js');
const ludsPoint = require('./lib/ludsPoint.js');

var datas = fs.readFileSync(__dirname + '/./files/LeakData.txt', 'utf8');
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

fs.writeFileSync(__dirname + '/./files/LeakPasswordFeatures2.txt', '', 'utf8');

for(let i = 0; i < leakDatas.length; i++) {
    // console.log(leakDatas[i], ":", ((koreanZxcvbn(leakDatas[i]).score * 2) + comparePoint.frequencyComparePoint(leakDatas[i])), ludsPoint.ludsPoint(leakDatas[i]).nScore, levenshteinDistance.totalLVD(leakDatas[i]));
    fs.appendFileSync(__dirname + '/./files/LeakPasswordFeatures2.txt', leakDatas[i] + ',' + ((koreanZxcvbn(leakDatas[i]).score * 2) + comparePoint.frequencyComparePoint(leakDatas[i])) + ',' + ludsPoint.ludsPoint(leakDatas[i]).nScore + ',' + levenshteinDistance.totalLVD(leakDatas[i]) + ',' + leakValues[i], 'utf8');
}

fs.writeFileSync(__dirname + '/./files/NotLeakPasswordFeatures2.txt', '', 'utf8');

for(let i = 0; i < notLeakDatas.length; i++) {
    // console.log(leakDatas[i], ":", ((koreanZxcvbn(leakDatas[i]).score * 2) + comparePoint.frequencyComparePoint(leakDatas[i])), ludsPoint.ludsPoint(leakDatas[i]).nScore, levenshteinDistance.totalLVD(leakDatas[i]));
    fs.appendFileSync(__dirname + '/./files/NotLeakPasswordFeatures2.txt', notLeakDatas[i] + ',' + ((koreanZxcvbn(notLeakDatas[i]).score * 2) + comparePoint.frequencyComparePoint(notLeakDatas[i])) + ',' + ludsPoint.ludsPoint(notLeakDatas[i]).nScore + ',' + levenshteinDistance.totalLVD(notLeakDatas[i]) + ',' + notLeakValues[i], 'utf8');
}