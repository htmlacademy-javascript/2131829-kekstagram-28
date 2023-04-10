const checkLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const checkString = string.replaceAll(' ','').toLowerCase();

  for (let i = 0; i <= Math.ceil(checkString.length / 2); i++) {
    if (checkString.at(i) !== checkString.at(-i - 1)) {
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

export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

checkLength('test', 1);
isPalindrome('test');
getInteger('test');
fillString('test', 1, 'test');
