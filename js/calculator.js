const answer = document.querySelector('.calculator__answer');
const workspace = document.querySelector('.calculator__workspace');
const clear = document.getElementById('clear');
const equally = document.getElementById('equally');

let firstNumber = '';
let operator = '';
let secondNumber = '';
let answerLength = '';

workspace.addEventListener('click', function (event) {
  const clickBtn = isContainsClass(event.target.className, 'calculator__workspace-button');
  const clickDelete = isContainsClass(event.target.className, 'calculator__workspace-button--cancel');
  const clickOperator = isContainsClass(event.target.className, 'operator');
  const clickInnerOperators = isContainsClass(event.target.className, 'calculator__operators');

  if (clickBtn && !clickDelete && operator == '') {
    firstNumber += event.target.outerText;
    answer.textContent = firstNumber;
    console.log(firstNumber);
  };

  if (clickOperator && !clickInnerOperators) {
    operator = event.target.outerText;
    answer.textContent = operator;
    console.log(operator);
  };

  if (clickBtn && !clickDelete && operator != '') {
    secondNumber += event.target.outerText;
    answer.textContent = secondNumber;
    console.log(secondNumber);
  };

  if (clickDelete) {
    answerLength = answer.textContent.length;
    answerLength -= 1;
    answer.textContent = answer.textContent.slice(0, answerLength);
  }
});

equally.addEventListener('click', function() {
  answer.textContent = calc(operator, +firstNumber, +secondNumber)
});

clear.addEventListener('click', function () {
  answer.textContent = '';
  firstNumber = '';
  operator = '';
  secondNumber = '';
});

function isContainsClass(classes, desiredClass) {
  return classes.includes(desiredClass);
};

function calc(operator, firstNumber, secondNumber) {
  let result = '';
  const incorrectInput = typeof(firstNumber) !== 'number' || typeof(secondNumber) !== 'number';
  if (incorrectInput) {
    result = 'Некорректный ввод';
  };

  switch (operator) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case '*':
      result = firstNumber * secondNumber;
      break;
    case '/':
      result = firstNumber / secondNumber;
      break;
    default:
      result = 'Некорректный оператор';
      break;
  };
  return result;
};