const fs = require('fs');

var tf = require('@tensorflow/tfjs');
require("tfjs-node-save");

async function passwordValidation() {
    var oriDatas = fs.readFileSync(__dirname + '/paperFiles/LeakPasswordFeatures.txt', 'utf8');
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
    var leakValue = [];
        
    for(let i = 0; i < datas.length - 1; i++) {
        leakString[i] = datas[i].split(',')[0];
        leakDataFeature1[i] = datas[i].split(',')[1];
        leakDataFeature2[i] = datas[i].split(',')[2];
        leakDataFeature3[i] = datas[i].split(',')[3];
        leakDataValue[i] = 0;
        leakValue[i] = datas[i].split(',')[4];
    }
        
    oriDatas = fs.readFileSync(__dirname + '/paperFiles/notLeakPasswordFeatures.txt', 'utf8');
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
    var notLeakValue = [];
        
    for(let i = 0; i < datas.length - 1; i++) {
        notLeakString[i] = datas[i].split(',')[0];
        notLeakDataFeature1[i] = datas[i].split(',')[1];
        notLeakDataFeature2[i] = datas[i].split(',')[2];
        notLeakDataFeature3[i] = datas[i].split(',')[3];
        notLeakDataValue[i] = 1;
        notLeakValue[i] = datas[i].split(',')[4];
    }
        
    var string = [];
    var feature1 = [];
    var feature2 = [];
    var feature3 = [];
    var value = []
    var resultValue = [];
        
    for(let i = 0; i < 70000; i++) {
        string[2 * i] = leakString[i];
        feature1[2 * i] = leakDataFeature1[i];
        feature2[2 * i] = leakDataFeature2[i];
        feature3[2 * i] = leakDataFeature3[i];
        value[2 * i] = leakDataValue[i];
        resultValue[2 * i] = leakValue[i];
        
        string[2 * i + 1] = notLeakString[i];
        feature1[2 * i + 1] = notLeakDataFeature1[i];
        feature2[2 * i + 1] = notLeakDataFeature2[i];
        feature3[2 * i + 1] = notLeakDataFeature3[i];
        value[2 * i + 1] = notLeakDataValue[i];
        resultValue[2 * i + 1] = notLeakValue[i];
    }
        
    var validationString = [];
    var validationData = [];
    var validationLabel = [];
    var validationValue = [];

    for(let i = 50000; i < 70000; i++) {
        validationString[i - 50000] = string[i];
        validationData[i - 50000] = [parseInt(feature1[i]), parseInt(feature2[i]), parseInt(feature3[i])];
        validationLabel[i - 50000] = parseInt(value[i]);
        validationValue[i - 50000] = parseInt(resultValue[i]);
    }

    var validationDataTensor = tf.tensor(validationData);
    var validationLabelTensor = tf.tensor(validationLabel);
    var validationValueTensor = tf.tensor(validationValue);


    const loadedModel = await tf.loadLayersModel("file://" + __dirname + "/myModel/model.json");

    var validationResult = loadedModel.predict(validationDataTensor);
    validationResult = Array.from(validationResult.dataSync())
        
    var validationAnswer = Array.from(validationLabelTensor.dataSync());
    var validationLeak = Array.from(validationValueTensor.dataSync());

    fs.writeFileSync(__dirname + '/paperFiles/validationResult.txt', '', 'utf8');
    for(let i = 0; i < validationResult.length; i++) {
        fs.appendFileSync(__dirname + '/paperFiles/validationResult.txt', string[i] + ',' + parseInt(feature1[i]) + ',' + parseInt(feature2[i]) + ',' + parseInt(feature3[i]) + ',' + validationLeak[i] + '\n', 'utf8');
    }


    fs.writeFileSync(__dirname + '/paperFiles/predictResult.txt', '', 'utf8');
    for(let i = 0; i < validationResult.length; i++) {
        fs.appendFileSync(__dirname + '/paperFiles/predictResult.txt', string[i] + ',' + validationAnswer[i] + ',' + validationResult[i] + ',' + validationLeak[i] + '\n', 'utf8');
    }

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

    console.log(good / (good + noGood));
};

passwordValidation();