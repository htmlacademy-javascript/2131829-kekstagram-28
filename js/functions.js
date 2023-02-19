const checkLength = (string, maxLength) => string.length <= maxLength;

function isPalindrome (string) {
  string = string.replaceAll(' ','').toLowerCase();
  for (let i = 0; i <= Math.ceil(string.length / 2); i++) {
    if (string.at(i) !== string.at(-i - 1)) {
      return false;
    }
  }
  return true;
}

function getInteger(string) {
  string = string.toString().replaceAll(' ', '');
  let number = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(Number(string[i]))) {
      number = number + string[i];
    }
  }
  return parseInt(number, 10);
}

function fillString (string, minLength, additionalSymbols) {
  while (string.length < minLength) {
    string = additionalSymbols.slice(0, minLength - string.length) + string;
  }
  return string;
}
