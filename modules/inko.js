const fs = require('fs');
const Inko = require('inko');


var inko = new Inko();

const toKorean = (text) => {
    return inko.en2ko(text)
}

const toEnglish = (text) => {
    return inko.ko2en(text)
}

const koToEn = () => {
    var data = fs.readFileSync(__dirname + '/../files/koreanWord.txt', 'utf-8');
    fs.writeFileSync(__dirname + '/../files/koreanWordEn.txt', '', 'utf-8');
    
    data = data.split('\n');

    for(let i = 0; i < data.length; i++) {
        fs.appendFileSync(__dirname + '/../files/koreanWordEn.txt', toEnglish(data[i]) + '\n', 'utf-8');
    }
}

exports.toKorean = toKorean;
exports.toEnglish = toEnglish;
exports.koToEn = koToEn;

//https://github.com/738/inko