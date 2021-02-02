const ludsPoint = (text) => {
    // node 정규화 공부 필수
}

//http://www.passwordmeter.com/

/*
    Number of Characters : 문자 수, +(n*4)
    Uppercase Letters : 대문자 수, +((len-n)*2)
    Lowercase Letters : 소문자 수, +((len-n)*2)	
    Numbers : 숫자 수(숫자만 있을 때는 0점 뭔가 들어가면 제대로 올라감), +(n*4)
    Symbols : 문자 수(문자만 있어도 올라감), +(n*6)
    Middle Numbers or Symbols : 가운데에 숫자나 문자 들어감(앞뒤 제외), +(n*2)
    Requirements : ???
    
    Letters Only : 대소문자만 있음(숫자, 문자 들어가면 0), -n
    Numbers Only : 숫자만 있음(대소문자, 문자 들어가면 0), -n
    Repeat Characters (Case Insensitive) : 같은 대소문자나 숫자나 문자가 포함(2개 이상, 대소문자 구분안함), 식 매우 어렵
    Consecutive Uppercase Letters : 대문자가 연속해서 이어짐, -(n*2)
    Consecutive Lowercase Letters : 소문자가 연속해서 이어짐, -(n*2)
    Consecutive Numbers : 숫자가 연속해서 이어짐, -(n*2)
    Sequential Letters (3+) : 연속된 패턴이 3개이상 지속됨(3개부터 1개 늘어날 때마다 -3씩 추가됨), -(n*3)
    Sequential Numbers (3+) : 연속된 패턴이 3개이상 지속됨, -(n*3)
    Sequential Symbols (3+) : 연속된 패턴이 3개이상 지속됨(키보드상에서 연속), -(n*3)
*/