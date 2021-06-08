const koreanZxcvbn = require('../lib/koreanBasedPassword/koreanZxcvbn');
const zxcvbn = require('zxcvbn');
const koreanZxcvbnString = require('../lib/koreanBasedPassword/koreanZxcvbnString');
const levenshteinDistance = require('../lib/levenshteinDistance.js');
const ludsPoint = require('../lib/ludsPoint.js');

const fs = require('fs');

const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

let femaleData = fs.readFileSync('./files/femaleListToEngCount.txt', 'utf8');
let frequencyData = fs.readFileSync('./files/frequencyListCount.txt', 'utf8');
let maleData = fs.readFileSync('./files/maleListToEngCount.txt', 'utf8');
let randomData = fs.readFileSync('./files/randomToEngCount.txt', 'utf8');
let wordData = fs.readFileSync('./files/wordDataToEngCount.txt', 'utf8');

femaleData = femaleData.split('\n');
frequencyData = frequencyData.split('\n');
maleData = maleData.split('\n');
randomData = randomData.split('\n');
wordData = wordData.split('\n');

var femaleKey = [];
var femaleValue = [];
var frequencyKey = [];
var frequencyValue = [];
var maleKey = [];
var maleValue = [];
var randomKey = [];
var randomValue = [];
var wordKey = [];
var wordValue = [];


for(let i = 0; i < femaleData.length; i++) {
    femaleKey[i] = femaleData[i].split(":")[0];
    femaleValue[i] = femaleData[i].split(":")[1];
}

for(let i = 0; i < frequencyData.length; i++) {
    frequencyKey[i] = frequencyData[i].split(":")[0];
    frequencyValue[i] = frequencyData[i].split(":")[1];
}

for(let i = 0; i < maleData.length; i++) {
    maleKey[i] = maleData[i].split(":")[0];
    maleValue[i] = maleData[i].split(":")[1];
}

for(let i = 0; i < randomData.length; i++) {
    randomKey[i] = randomData[i].split(":")[0];
    randomValue[i] = randomData[i].split(":")[1];
}

for(let i = 0; i < wordData.length; i++) {
    wordKey[i] = wordData[i].split(":")[0];
    wordValue[i] = wordData[i].split(":")[1];
}

let count = femaleData.length + frequencyData.length + maleData.length + randomData.length + wordData.length;
console.log(count);

var featureKey = [];
featureKey = featureKey.concat(femaleKey, frequencyKey, maleKey, randomKey, wordKey);
var featureValue = [];
featureValue = featureValue.concat(femaleValue, frequencyValue, maleValue, randomValue, wordValue);

var featureZxcvbn = [];
var featureLUDS = [];
var featureLevenshtein = [];

for(let i = 0; i < 10; i++) {
    featureZxcvbn[i] = (koreanZxcvbn(featureKey[i]).score * 2) + comparePoint.comparePoint(featureKey[i]);
    featureLUDS[i] = ludsPoint.ludsPoint(featureKey[i]).nScore;
    featureLevenshtein[i] = levenshteinDistance.totalLVDistance(featureKey[i]);
}

fs.writeFileSync('./files/features.txt', "", 'utf8');

for(let i = 0; i < 10; i++) {
    fs.appendFileSync("./files/features.txt", `${featureKey[i]},${featureZxcvbn[i]},${featureLUDS[i]},${featureLevenshtein[i]},${featureValue[i]}\n`, 'utf8');
}