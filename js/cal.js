const answer = document.querySelector('.calculator__answer');
const workspace = document.querySelector('.calculator__workspace');
const clear = document.getElementById('clear');
const equally = document.getElementById('equally');

const OPERATORS = {
  ADD: '+',
  SUBTRACT: '−',
  MULTIPLICATION: '×',
  DEGREE: '÷',
}

let firstNumber = '';
let operator = '';
let secondNumber = '';
let answerLength = '';

workspace.addEventListener('click', function (event) {
  const isAnswerErrors = answer.textContent == 'Некорректный оператор' || answer.textContent == 'Infinity' || answer.textContent == 'NaN'
  const clickBtn = isContainsClass(event.target.className, 'calculator__workspace-button');
  const clickDelete = isContainsClass(event.target.className, 'calculator__workspace-button--cancel');
  const clickOperator = isContainsClass(event.target.className, 'operator');
  const clickInnerOperators = isContainsClass(event.target.className, 'calculator__operators');

  if (clickBtn && !clickDelete && operator == '') {
    firstNumber += event.target.outerText;
    answer.textContent = firstNumber;
  };

  if (clickOperator && !clickInnerOperators) {
    operator = event.target.outerText;
    answer.textContent = operator;
    secondNumber = '';
  };

  if (clickBtn && !clickDelete && operator != '') {
    secondNumber += event.target.outerText;
    answer.textContent = secondNumber;
  };

  if (clickDelete && firstNumber != '' && secondNumber == '' && operator == '' && answer.textContent != 'Некорректный оператор') {
    answerLength = answer.textContent.length;
    answer.textContent = answer.textContent.slice(0, (answerLength - 1 ));
    firstNumber = answer.textContent;
  }else if(clickDelete && operator != '' && secondNumber == '' && answer.textContent != '' && answer.textContent != 'Infinity' ) {
    answerLength = answer.textContent.length;
    answer.textContent = answer.textContent.slice(0, (answerLength - 1 ));
    operator = answer.textContent;
    if (clickDelete && operator == '' && answer.textContent == '') {
      answer.textContent = firstNumber
    };
  }else if (clickDelete && secondNumber != '' && answer.textContent != 'NaN') {
    answerLength = answer.textContent.length;
    answer.textContent = answer.textContent.slice(0, (answerLength - 1 ));
    secondNumber = answer.textContent;
    if (clickDelete && secondNumber == '' && answer.textContent == '') {
    answer.textContent = operator;
    };
  }else if (clickDelete && (isAnswerErrors)) {
    answer.textContent = '';
    firstNumber = '';
    operator = '';
    secondNumber = '';
  }
});

equally.addEventListener('click', function() {
  calc(operator, +firstNumber, +secondNumber)

  if (!Number.isFinite(calc(operator, +firstNumber, +secondNumber))) {
    answer.textContent = 'Делить на 0 нельзя'
  }else if (Number.isNaN(calc(operator, +firstNumber, +secondNumber))) {
    answer.textContent = 'Результат неопределён'
  }else {
  answer.textContent = calc(operator, +firstNumber, +secondNumber)
  }
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
    case OPERATORS.ADD:
      result = firstNumber + secondNumber;
      break;
    case OPERATORS.SUBTRACT:
      result = firstNumber - secondNumber;
      break;
    case OPERATORS.MULTIPLICATION:
      result = firstNumber * secondNumber;
      break;
    case OPERATORS.DEGREE:
      result = firstNumber / secondNumber;
      break;
    default:
      result = 'Оператор отсуствует';
      break;
  };
  return result;
};