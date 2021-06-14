const fs = require('fs');
const koreanZxcvbn = require('./lib/koreanBasedPassword/koreanZxcvbn');
const zxcvbn = require('zxcvbn');
const koreanZxcvbnString = require('./lib/koreanBasedPassword/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

const levenshteinDistance = require('./lib/levenshteinDistance.js');
const ludsPoint = require('./lib/ludsPoint.js');

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

for(let i = 0; i < leakDatas.length; i++) {
    // console.log("Security Assessment Score(2p+t) : ", ((koreanZxcvbn("ghltnrnjs654321").score * 2) + comparePoint.comparePoint("ghltnrnjs654321")));
    // console.log("LUDS requirement Score : ", ludsPoint.ludsPoint("ghltrnjs654321").nScore);
    // console.log("LevenshteinDistence Score : ", levenshteinDistance.levenshteinDistance("ghltnrnjs", "ghltnrnjs654321"));
}

console.log("Security Assessment Score(2p+t) : ", ((koreanZxcvbn("ghltnrnjs654321").score * 2) + comparePoint.comparePoint("ghltnrnjs654321")));
console.log("LUDS requirement Score : ", ludsPoint.ludsPoint("ghltrnjs654321").nScore);
console.log("LevenshteinDistence Score : ", levenshteinDistance.totalLVD("password123456"));