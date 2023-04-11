const checkLength = (string, maxLength) => string.length <= maxLength;
const ALERT_SHOW_TIME = 7000;


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

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'darkred';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
