const zxcvbn = require('zxcvbn');

const zxcvbnPoint = (text) => {
    return zxcvbn(text);
}

exports.zxcvbnPoint = zxcvbnPoint;

//https://github.com/dropbox/zxcvbn