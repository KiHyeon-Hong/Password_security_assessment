const koreanZxcvbn = require('../lib/koreanBasedPassword/koreanZxcvbn');
const zxcvbn = require('zxcvbn');
const koreanZxcvbnString = require('../lib/koreanBasedPassword/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

const levenshteinDistance = require('../lib/levenshteinDistance.js');
const ludsPoint = require('../lib/ludsPoint.js');

// Security Assessment Score
console.log("Security Assessment Score(2p+t) : ", ((koreanZxcvbn("ghltnrnjs654321").score * 2) + comparePoint.comparePoint("ghltnrnjs654321")));
console.log("LUDS requirement Score : ", ludsPoint.ludsPoint("ghltrnjs654321").nScore);
console.log("LevenshteinDistence Score : ", levenshteinDistance.levenshteinDistance("ghltnrnjs", "ghltnrnjs654321"));

