const Inko = require('inko');

var inko = new Inko();

const toKorean = (text) => {
    return inko.en2ko(text)
}

const toEnglish = (text) => {
    return inko.ko2en(text)
}

exports.toKorean = toKorean;
exports.toEnglish = toEnglish;