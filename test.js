const zxcvbn = require('zxcvbn');
const levenshteinDistance = require('./modules/levenshteinDistance.js');
const inko = require('./modules/inko.js');


var orig = 'Th1$1$$tupld';
var comp = 'chaetopod';


console.log(levenshteinDistance.levenshteinDistance(orig, comp));
console.log(inko.toEnglish('소ㅑㄴ ㅑㄴ ㅅㄷㄴㅅ ㅡㄷㄴㄴㅁㅎㄷ!'));
console.log(inko.toKorean('dlrjtdms xptmxm aptlwl dlqslek!'));