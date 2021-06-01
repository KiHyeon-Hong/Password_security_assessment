const fs = require('fs');

function randomString(num) {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz`~!@#$%^&*()-_/*+={}[]|\\;:'\",.?<>";
	var string_length = num;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

// console.log(randomString(Math.floor(Math.random() * 7) + 4));

for(let i = 0; i < 100000; i++) {
	fs.appendFileSync('./files/randomChar.txt', `${randomString(Math.floor(Math.random() * 7) + 4)}\n`, 'utf8');
}