var tf = require('@tensorflow/tfjs');
require("tfjs-node-save");

var 온도 = [20,21,22,23,24,25,26,27,28,29,30];
var 판매량 = [40,42,44,46,48,50,52,54,56,58,60];

var 원인 = tf.tensor(온도);
var 결과 = tf.tensor(판매량);

console.log(원인.print());

var X = tf.input({shape: [1]});
var h1 = tf.layers.dense({units: 1, activation:'relu'}).apply(X);
var Y = tf.layers.dense({units: 1}).apply(h1);

var model = tf.model({ inputs: X, outputs: Y });

var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError }
model.compile(compileParam);

var history = [];

var fitParam = { epochs: 10000, callbacks:{
    onEpochEnd: function(epoch, logs) {
        history.push(logs);
    }
}};

model.fit(원인, 결과, fitParam).then(async function(result) {

    var 예측한결과 = model.predict(원인);
    예측한결과.print();

    model.save("file://./myModel").then(async function() {
        console.log("Successfully saved the artifacts.");

    });
});