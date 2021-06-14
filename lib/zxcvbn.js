const zxcvbn = require('zxcvbn');

const zxcvbnPoint = (text) => {
    return zxcvbn(text);
}

const zxcvbnGusses = (text) => {
    return zxcvbn(text).guesses;
}

const zxcvbnGusses_log10 = (text) => {
    return zxcvbn(text).guesses_log10;
}

const zxcvbnCrackTimesSeconds = (text) => {
    return zxcvbn(text).crack_times_seconds;
}

const zxcvbnCrackTimesDisplay = (text) => {
    return zxcvbn(text).crack_times_display;
}

const zxcvbnScore = (text) => {
    return zxcvbn(text).score;
}

const zxcvbnSequence = (text) => {
    return zxcvbn(text).sequence;
}

const zxcvbnCalcTime = (text) => {
    return zxcvbn(text).calc_time;
}

exports.zxcvbnPoint = zxcvbnPoint;
exports.zxcvbnGusses = zxcvbnGusses;
exports.zxcvbnGusses_log10 = zxcvbnGusses_log10;
exports.zxcvbnCrackTimesSeconds = zxcvbnCrackTimesSeconds;
exports.zxcvbnCrackTimesDisplay = zxcvbnCrackTimesDisplay;
exports.zxcvbnScore = zxcvbnScore;
exports.zxcvbnSequence = zxcvbnSequence;
exports.zxcvbnCalcTime = zxcvbnCalcTime;

//https://github.com/dropbox/zxcvbn

//console.log(result.score);
// console.log(result.guesses);
// console.log('========================================');
// console.log(result.guesses_log10);
// console.log('========================================');
// console.log(result.crack_times_seconds);
// console.log('========================================');
// console.log(result.crack_times_display);
// console.log('========================================');
// console.log(result.score);
// console.log('========================================');
// console.log(result.sequence);
// console.log('========================================');
// console.log(result.calc_time);
// console.log('========================================');