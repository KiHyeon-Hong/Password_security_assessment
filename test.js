const zxcvbn = require('zxcvbn');
const levenshteinDistance = require('./modules/levenshteinDistance.js');

var orig = 'Th1$1$$tupld';
var comp = 'chaetopod';

console.log(levenshteinDistance.levenshteinDistance(orig, comp));

