const fs = require('fs');

const levenshteinDistance = (orig, comp) => {
    /*
    if (!orig.length) return comp.length;
    if (!comp.length) return orig.length;

    return Math.min(
        levenshteinDistance(orig.substr(1), comp) + 1,
        levenshteinDistance(comp.substr(1), orig) + 1,
        levenshteinDistance(orig.substr(1), comp.substr(1)) + (orig[0] !== comp[0] ? 1 : 0)
    ) + 1;
    */

   if(orig.length == 0) return comp.length; 
   if(comp.length == 0) return orig.length; 
 
   var matrix = [];
 
   var i;
   for(i = 0; i <= comp.length; i++){
       matrix[i] = [i];
   }
 
   var j;
   for(j = 0; j <= orig.length; j++){
       matrix[0][j] = j;
   }
 
   // Fill in the rest of the matrix
   for(i = 1; i <= comp.length; i++){
       for(j = 1; j <= orig.length; j++){
           if(comp.charAt(i-1) == orig.charAt(j-1)){
               matrix[i][j] = matrix[i-1][j-1];
           } else {
               matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
               Math.min(matrix[i][j-1] + 1, // insertion
               matrix[i-1][j] + 1)); // deletion
           }
       }
   }

   return matrix[comp.length][orig.length];
}

const totalLevenshteinDistance = (text) => {
    var dict = fs.readFileSync(__dirname + '/../files/koreanWordEn.txt', 'utf-8');
    dict = dict.split('\n');

    var min = text.length;
    var temp = 0;

    for(let i = 0; i < dict.length; i++) {
       temp = levenshteinDistance(text, dict[i]);
       if(min > temp) {
           min = temp;
       }
    }

    return min;
}

const totalLVDistance = (text) => {
    let femaleData = fs.readFileSync(__dirname + '/./files/femaleListToEngCount.txt', 'utf8');
    let frequencyData = fs.readFileSync(__dirname + '/./files/frequencyListCount.txt', 'utf8');
    let maleData = fs.readFileSync(__dirname + '/./files/maleListToEngCount.txt', 'utf8');
    let randomData = fs.readFileSync(__dirname + '/./files/randomToEngCount.txt', 'utf8');
    let wordData = fs.readFileSync(__dirname + '/./files/wordDataToEngCount.txt', 'utf8');
    
    femaleData = femaleData.split('\n');
    frequencyData = frequencyData.split('\n');
    maleData = maleData.split('\n');
    randomData = randomData.split('\n');
    wordData = wordData.split('\n');

    var femaleKey = [];
    var frequencyKey = [];
    var maleKey = [];
    var randomKey = [];
    var wordKey = [];

    for(let i = 0; i < femaleData.length; i++) {
        femaleKey[i] = femaleData[i].split(":")[0];
    }

    for(let i = 0; i < frequencyData.length; i++) {
        frequencyKey[i] = frequencyData[i].split(":")[0];
    }

    for(let i = 0; i < maleData.length; i++) {
        maleKey[i] = maleData[i].split(":")[0];
    }

    for(let i = 0; i < randomData.length; i++) {
        randomKey[i] = randomData[i].split(":")[0];
    }

    for(let i = 0; i < wordData.length; i++) {
        wordKey[i] = wordData[i].split(":")[0];
    }

    let count = femaleData.length + frequencyData.length + maleData.length + randomData.length + wordData.length;

    var featureKey = [];
    featureKey = featureKey.concat(femaleKey, frequencyKey, maleKey, randomKey, wordKey);

    var min = text.length;
    var temp = 0;

    for(let i = 0; i < featureKey.length; i++) {
       temp = levenshteinDistance(text, featureKey[i]);
       if(min > temp) {
           min = temp;
       }
    }

    return min;
}

const totalLVD = (text) => {
    let data = fs.readFileSync(__dirname + '/./files/frequencyList.txt', 'utf8');
    data = data.split(',');

    var min = text.length;
    var temp = 0;

    for(let i = 0; i < data.length; i++) {
       temp = levenshteinDistance(text, data[i]);
       if(min > temp) {
           min = temp;
       }
    }

    return min;
}

/*

https://github.com/dumb-password-rules/dumb-password-rules

exports.getEditDistance = function(a, b){
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                Math.min(matrix[i][j-1] + 1, // insertion
                matrix[i-1][j] + 1)); // deletion
            }
        }
    }
  
    return matrix[b.length][a.length];
};
*/

exports.levenshteinDistance = levenshteinDistance;
exports.totalLevenshteinDistance = totalLevenshteinDistance;
exports.totalLVDistance = totalLVDistance;
exports.totalLVD = totalLVD;