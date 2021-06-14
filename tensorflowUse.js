var tf = require('@tensorflow/tfjs');
require("tfjs-node-save");

var 온도 = [15,16,17,18];
var 원인 = tf.tensor(온도);

const test = async function() {
    const loadedModel = await tf.loadLayersModel('file://./myModel/model.json');
    loadedModel.predict(원인).print();
}

test();