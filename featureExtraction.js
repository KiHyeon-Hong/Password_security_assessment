const levenshteinDistance = require('./modules/levenshteinDistance.js');
const inko = require('./modules/inko.js');
const zxcvbn = require('./modules/zxcvbn.js');
const ludsPoint = require('./modules/ludsPoint.js');

datas = ["password", "password654321@", "wodmfuao654321@", "zxcvbn", "q1w2e3r4"];

for(let i = 0; i < datas.length; i++) {
    // console.log(levenshteinDistance.levenshteinDistance("password", datas[i]));
    // console.log(zxcvbn.zxcvbnPoint(datas[i]).score);
    // console.log(ludsPoint.ludsPoint(datas[i]).nScore);

    
}
