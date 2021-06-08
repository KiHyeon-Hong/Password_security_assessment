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

// characterClass is Class(0: smallLetter, 1: capitalLEtter, 2: number, 3: specialChar)
// characterNumber is length
function randomString(characterClass, characterNumber, characterGroups) {
    /*
    var smallLetter = "abcdefghijklmnopqrstuvwxyz";
    var capitalLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var number = "0123456789";
    var specialChar = "!@#$%^&*()";
    */

    var chars = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "!@#$%^&*()"];
   
	var randomstring = '';

    for(let i = 0; i < characterGroups; i++) {
        if(characterClass[i] == 4 || characterClass[i] == 5) {

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

/*
var start = Math.floor(Math.random() * originalPassword.length);
var passwordLength = Math.floor(Math.random() * chars[characterClass[i]].length);;
var password = originalPassword.substring(start, start + passwordLength);
*/

var passwordLength = Math.floor(Math.random() * originalPassword.length) + 1;
var password = originalPassword.substring(0, passwordLength);

console.log(originalPassword);
console.log(password);