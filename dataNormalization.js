const fs = require('fs');
const tf = require('@tensorflow/tfjs');

const levenshteinDistance = require('./modules/levenshteinDistance.js');
const inko = require('./modules/inko.js');
const zxcvbn = require('./modules/zxcvbn.js');
const ludsPoint = require('./modules/ludsPoint.js');

var temp = fs.readFileSync('./files/10k_most_passwords.txt', 'utf-8');
temp = temp.split('\n');

var data = [];
var label = [];

for(let i = 0; i < temp.length; i++) {
    let tmp = [];

    tmp[0] = zxcvbn.zxcvbnPoint(temp[i]).score;
    tmp[1] = levenshteinDistance.totalLevenshteinDistance(temp[i]);
    
    let json = ludsPoint.ludsPoint(temp[i]);
    
    if(json.nLength != null) tmp[2] = json.nLength;
    else tmp[2] = 0;

    if(json.nAlphaUC != null) tmp[3] = json.nAlphaUC;
    else tmp[3] = 0;

    if(json.nAlphaLC != null) tmp[4] = json.nAlphaLC;
    else tmp[4] = 0;

    if(json.nNumber != null) tmp[5] = json.nNumber;
    else tmp[5] = 0;

    if(json.nSymbol != null) tmp[6] = json.nSymbol;
    else tmp[6] = 0;

    if(json.nMidChar != null) tmp[7] = json.nMidChar;
    else tmp[7] = 0;

    if(json.nRequirements != null) tmp[8] = json.nRequirements;
    else tmp[8] = 0;

    if(json.nAlphasOnly != null) tmp[9] = json.nAlphasOnly;
    else tmp[9] = 0;

    if(json.nNumbersOnly != null) tmp[10] = json.nNumbersOnly;
    else tmp[10] = 0;

    if(json.nRepChar != null) tmp[11] = json.nRepChar;
    else tmp[11] = 0;

    if(json.nConsecAlphaUC != null) tmp[12] = json.nConsecAlphaUC;
    else tmp[12] = 0;

    if(json.nConsecAlphaLC != null) tmp[13] = json.nConsecAlphaLC;
    else tmp[13] = 0;

    if(json.nConsecNumber != null) tmp[14] = json.nConsecNumber;
    else tmp[14] = 0;

    if(json.nSeqAlpha != null) tmp[15] = json.nSeqAlpha;
    else tmp[15] = 0;

    if(json.nSeqNumber != null) tmp[16] = json.nSeqNumber;
    else tmp[16] = 0;

    if(json.nSeqSymbol != null) tmp[17] = json.nSeqSymbol;
    else tmp[17] = 0;

    data[i] = tmp;

    if(json.sComplexity = 'Very Weak') label[i] = [1, 0];
    else label[i] = [0, 1];
}

// fs.writeFileSync('./files/dataNormalization.txt', data.toString(), 'utf-8');



data = tf.tensor(data);
label = tf.tensor(label);

var X = tf.input({ shape: [18]});

var H = tf.layers.dense({ units: 16, activation:'relu'}).apply(X);

var Y = tf.layers.dense({ units: 2, activation:'sigmoid'}).apply(H);

var model = tf.model({ inputs: X, outputs: Y });

var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError, metrics:['accuracy'] }
var compileParam = { optimizer: tf.train.adam(), loss: 'categoricalCrossentropy'}

model.compile(compileParam);

_history = [];

var fitParam = {
    epochs: 100, 
    callbacks:{
    onEpochEnd:
        function(epoch, logs){
            console.log('epoch', epoch, logs, 'RMSE=>', Math.sqrt(logs.loss));
            _history.push(logs);
        }
    }
}

try {
    model.fit(data, label, fitParam).then(function (result) {
        // 예측한결과 = new dfd.DataFrame(model.predict(data.tensor));
        // 예측한결과.print();
        // label.print();
        var results = model.predict(data);
        
        for(let i = 0; i < results.length; i++){
            console.log(results.greater(i));
        }
    }); 
}
catch(e) {

}

