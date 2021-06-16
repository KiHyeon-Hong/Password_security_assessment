const fs = require('fs');

var tf = require('@tensorflow/tfjs');
require("tfjs-node-save");

var oriDatas = fs.readFileSync('./files/LeakPasswordFeatures.txt', 'utf8');
oriDatas = oriDatas.split('\n');

var datas = [];
for(let i = 0; i < oriDatas.length; i++) {
    datas[i] = oriDatas[i].split('\r')[0];
}

var leakString = []
var leakDataFeature1 = [];
var leakDataFeature2 = [];
var leakDataFeature3 = [];
var leakDataValue = [];

for(let i = 0; i < datas.length; i++) {
    leakString[i] = datas[i].split(',')[0];
    leakDataFeature1[i] = datas[i].split(',')[1];
    leakDataFeature2[i] = datas[i].split(',')[2];
    leakDataFeature3[i] = datas[i].split(',')[3];
    leakDataValue[i] = 0;
}

oriDatas = fs.readFileSync('./files/LeakPasswordFeatures1.txt', 'utf8');
oriDatas = oriDatas.split('\n');

datas = [];
for(let i = 0; i < oriDatas.length; i++) {
    datas[i] = oriDatas[i].split('\r')[0];
}

var notLeakString = []
var notLeakDataFeature1 = [];
var notLeakDataFeature2 = [];
var notLeakDataFeature3 = [];
var notLeakDataValue = [];

for(let i = 0; i < datas.length; i++) {
    notLeakString[i] = datas[i].split(',')[0];
    notLeakDataFeature1[i] = datas[i].split(',')[1];
    notLeakDataFeature2[i] = datas[i].split(',')[2];
    notLeakDataFeature3[i] = datas[i].split(',')[3];
    notLeakDataValue[i] = 1;
}

var string = [];
var feature1 = [];
var feature2 = [];
var feature3 = [];
var value = []

for(let i = 0; i < 70000; i++) {
    string[2 * i] = leakString[i];
    feature1[2 * i] = leakDataFeature1[i];
    feature2[2 * i] = leakDataFeature2[i];
    feature3[2 * i] = leakDataFeature3[i];
    value[2 * i] = leakDataValue[i];

    string[2 * i + 1] = notLeakString[i];
    feature1[2 * i + 1] = notLeakDataFeature1[i];
    feature2[2 * i + 1] = notLeakDataFeature2[i];
    feature3[2 * i + 1] = notLeakDataFeature3[i];
    value[2 * i + 1] = notLeakDataValue[i];
}

var trainData = [];
var trainLabel = [];

var validationData = [];
var validationLabel = [];

for(let i = 0; i < 50000; i++) {
    trainData[i] = [parseInt(feature1[i]), parseInt(feature2[i]), parseInt(feature3[i])];
    trainLabel[i] = parseInt(value[i]);
}

for(let i = 50000; i < 70000; i++) {
    validationData[i - 50000] = [parseInt(feature1[i]), parseInt(feature2[i]), parseInt(feature3[i])];
    validationLabel[i - 50000] = parseInt(value[i]);
}

var trainDataTensor = tf.tensor(trainData);
var trainLabelTensor = tf.tensor(trainLabel);
var validationDataTensor = tf.tensor(validationData);
var validationLabelTensor = tf.tensor(validationLabel);

function modelCreateDepth1(unit1, activation) {
    var X = tf.input({shape: [3]});
    var h1 = tf.layers.dense({units: unit1, activation:activation}).apply(X);
    var Y = tf.layers.dense({units: 1, activation: 'sigmoid'}).apply(h1);

    var model = tf.model({ inputs: X, outputs: Y });

    var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError}
    model.compile(compileParam);
    
    return model;
}

function modelCreateDepth2(unit1, unit2, activation) {
    var X = tf.input({shape: [3]});
    var h1 = tf.layers.dense({units: unit1, activation:activation}).apply(X);
    var h2 = tf.layers.dense({units: unit2, activation:activation}).apply(h1);
    var Y = tf.layers.dense({units: 1, activation: 'sigmoid'}).apply(h2);

    var model = tf.model({ inputs: X, outputs: Y });

    var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError}
    model.compile(compileParam);
    
    return model;
}

function modelCreateDepth3(unit1, unit2, unit3, activation) {
    var X = tf.input({shape: [3]});
    var h1 = tf.layers.dense({units: unit1, activation:activation}).apply(X);
    var h2 = tf.layers.dense({units: unit2, activation:activation}).apply(h1);
    var h3 = tf.layers.dense({units: unit3, activation:activation}).apply(h2);
    var Y = tf.layers.dense({units: 1, activation: 'sigmoid'}).apply(h3);

    var model = tf.model({ inputs: X, outputs: Y });

    var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError}
    model.compile(compileParam);
    
    return model;
}

function modelCreateDepth4(unit1, unit2, unit3, unit4, activation) {
    var X = tf.input({shape: [3]});
    var h1 = tf.layers.dense({units: unit1, activation:activation}).apply(X);
    var h2 = tf.layers.dense({units: unit2, activation:activation}).apply(h1);
    var h3 = tf.layers.dense({units: unit3, activation:activation}).apply(h2);
    var h4 = tf.layers.dense({units: unit4, activation:activation}).apply(h3);
    var Y = tf.layers.dense({units: 1, activation: 'sigmoid'}).apply(h4);

    var model = tf.model({ inputs: X, outputs: Y });

    var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError}
    model.compile(compileParam);
    
    return model;
}

var nodes = [4, 3, 2, 1];
var units = [
    [1, 1, 1, 1], [1, 1, 1, 3], [1, 1, 1, 5], [1, 1, 3, 1], [1, 1, 3, 3], [1, 1, 3, 5], [1, 1, 5, 1], [1, 1, 5, 3], [1, 1, 5, 5],
    [1, 3, 1, 1], [1, 3, 1, 3], [1, 3, 1, 5], [1, 3, 3, 1], [1, 3, 3, 3], [1, 3, 3, 5], [1, 3, 5, 1], [1, 3, 5, 3], [1, 3, 5, 5],
    [1, 5, 1, 1], [1, 5, 1, 3], [1, 5, 1, 5], [1, 5, 3, 1], [1, 5, 3, 3], [1, 5, 3, 5], [1, 5, 5, 1], [1, 5, 5, 3], [1, 5, 5, 5], 
    [3, 1, 1, 1], [3, 1, 1, 3], [3, 1, 1, 5], [3, 1, 3, 1], [3, 1, 3, 3], [3, 1, 3, 5], [3, 1, 5, 1], [3, 1, 5, 3], [3, 1, 5, 5],
    [3, 3, 1, 1], [3, 3, 1, 3], [3, 3, 1, 5], [3, 3, 3, 1], [3, 3, 3, 3], [3, 3, 3, 5], [3, 3, 5, 1], [3, 3, 5, 3], [3, 3, 5, 5],
    [3, 5, 1, 1], [3, 5, 1, 3], [3, 5, 1, 5], [3, 5, 3, 1], [3, 5, 3, 3], [3, 5, 3, 5], [3, 5, 5, 1], [3, 5, 5, 3], [3, 5, 5, 5],
    [5, 1, 1, 1], [5, 1, 1, 3], [5, 1, 1, 5], [5, 1, 3, 1], [5, 1, 3, 3], [5, 1, 3, 5], [5, 1, 5, 1], [5, 1, 5, 3], [5, 1, 5, 5],
    [5, 3, 1, 1], [5, 3, 1, 3], [5, 3, 1, 5], [5, 3, 3, 1], [5, 3, 3, 3], [5, 3, 3, 5], [5, 3, 5, 1], [5, 3, 5, 3], [5, 3, 5, 5],
    [5, 5, 1, 1], [5, 5, 1, 3], [5, 5, 1, 5], [5, 5, 3, 1], [5, 5, 3, 3], [5, 5, 3, 5], [5, 5, 5, 1], [5, 5, 5, 3], [5, 5, 5, 5]  
];
var activationFuncs = ["relu"];

for(let node = 0; node < nodes.length; node++) {
    for(let unit = 0; unit < units.length; unit++) {
        for(let activationFunc = 0; activationFunc < activationFuncs.length; activationFunc++) {

            var history = [];

            var fitParam = { epochs: 2, callbacks:{
                onEpochEnd: function(epoch, logs) {
                    console.log('epoch', epoch, logs, "RMSE -> ", Math.sqrt(logs.loss));
                    history.push(logs);
                }
            }};

            console.log(nodes[node], units[unit], activationFuncs[activationFunc]);

            var model = null;
            if(nodes[node] == 1) {
                model = modelCreateDepth1(units[unit][0], activationFuncs[activationFunc]);
                unit += 26;
            }
            else if(nodes[node] == 2) {
                model = modelCreateDepth2(units[unit][0], units[unit][1], activationFuncs[activationFunc]);
                unit += 8;
            }
            if(nodes[node] == 3) {
                model = modelCreateDepth3(units[unit][0], units[unit][1], units[unit][2], activationFuncs[activationFunc]);
                unit += 2;
            }
            else {
                model = modelCreateDepth4(units[unit][0], units[unit][1], units[unit][2], units[unit][3], activationFuncs[activationFunc]);
            }

            
            model.fit(trainDataTensor, trainLabelTensor, fitParam).then(async function(result) {
            
                var validationResult = model.predict(validationDataTensor);
                validationResult = Array.from(validationResult.dataSync())
            
                var validationAnswer = Array.from(validationLabelTensor.dataSync())
            
                var good = 0;
                var noGood = 0;
            
                var checkPoint = 0.5;
                
                for(let i = 0; i < validationResult.length; i++) {
                    if((validationResult[i] > checkPoint && validationAnswer[i] > checkPoint) || (validationResult[i] <= checkPoint && validationAnswer[i] <= checkPoint)) {
                        good++;
                    }
                    else {
                        noGood++;
                    }
                }
            
                console.log(good);
                console.log(noGood);
            
                model.save("file://./myModelTest").then(async function() {
                    console.log("Successfully saved the artifacts.");
            
                });
            });
            

        }
    }
}