const checkLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  string = string.replaceAll(' ','').toLowerCase();

  for (let i = 0; i <= Math.ceil(string.length / 2); i++) {
    if (string.at(i) !== string.at(-i - 1)) {
      return false;
    }
  }

  return true;
};

const getInteger = (string) => {
  string = string.toString().replaceAll(' ', '');
  let number = '';

  for (const symbol of string) {
    if (Number.isInteger(Number(symbol))) {
      number = number + symbol;
    }
  }

  return parseInt(number, 10);
};

const fillString = (string, minLength, additionalSymbols) => {
  while (string.length < minLength) {
    string = additionalSymbols.slice(0, minLength - string.length) + string;
  }

  return string;
};

checkLength('test', 1);
isPalindrome('test');
getInteger('test');
fillString('test', 1, 'test');
