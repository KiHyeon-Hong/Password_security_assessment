/*
1. 대,소문자, 숫자, 특수 기호 문자 그룹 정의
2. 문자 그룹 갯수 정하기
3. 각각의 문자그룹이 4개 중 어디에 속하는지 정하기
4. if 대,소문자 시 사전의 단어를 사용할지? 아니면 랜덤 문자열을 사용하지 정하기
4-1. 만약 사전의 단어라면 그대로 사용할 것인지? 아니면 몇글자를 바꿀 것인지?
5. 사전의 단어를 사용하지 않는 문자 그룹들은 몇 글자이며, 해당 문자열 결정
6. 비밀번호의 길이는 몇자로 결정할지?
7. 100,000개의 데이터 만들기
*/

const fs = require('fs');

function replaceIndex(data, index, character) {
    return data.substr(0, index) + character + data.substr(index + character.length);
}

function randomString(characterClass, characterNumber, characterGroups) {
    var wordDataFile = fs.readFileSync('./files/EngWord.txt', 'utf8');
    var wordData = wordDataFile.split(',');

    var chars = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "!@#$%^&*()"];
   
	var randomstring = '';

    for(let i = 0; i < characterGroups; i++) {
        if(characterClass[i] == 4) {
            var temp = wordData[Math.floor(Math.random() * wordData.length)];

            if(Math.floor(Math.random() > 0.5)) {
                var rnum = Math.floor(Math.random() * chars[0].length);
                temp = replaceIndex(temp, Math.floor(Math.random() * temp.length), chars[0].substring(rnum, rnum + 1));
            }

            randomstring += temp;
        }
        else if(characterClass[i] == 5) {
            var temp = wordData[Math.floor(Math.random() * wordData.length)];

            if(Math.floor(Math.random() > 0.5)) {
                var rnum = Math.floor(Math.random() * chars[1].length);
                temp = replaceIndex(temp, Math.floor(Math.random() * temp.length), chars[1].substring(rnum, rnum + 1));
            }

            randomstring += temp.toUpperCase();
        }
        else {
            for(let j = 0; j < characterNumber[i]; j++) {
                var rnum = Math.floor(Math.random() * chars[characterClass[i]].length);
                randomstring += chars[characterClass[i]].substring(rnum, rnum + 1);
            }
        }
    }

	return randomstring;
}

fs.writeFileSync('./files/createPassword1.txt', '', 'utf8');

for(let i = 0; i < 100000; i++) {
    var characterGroups = Math.floor(Math.random() * 10) + 1;

    var characterClass = [];
    var characterNumber = [];

    for(let count = 0; count < characterGroups; count++) {
        characterClass[count] = Math.floor(Math.random() * 4);
        characterNumber[count] = Math.floor(Math.random() * 10) + 1;

        if(characterClass[count] == 0) {
            characterClass[count] = (Math.floor(Math.random() > 0.5))? 0 : 4;
        }
        else if(characterClass[count] == 1) {
            characterClass[count] = (Math.floor(Math.random() > 0.5))? 1 : 5;
        }
    }

    var originalPassword = randomString(characterClass, characterNumber, characterGroups);

    var passwordLength = Math.floor(Math.random() * originalPassword.length) + 1;
    var password = originalPassword.substring(0, passwordLength);

    if(password.length >= 4 && password.length <= 21) {
        fs.appendFileSync('./files/createPassword1.txt', password + '\n', 'utf8');
    }
}

