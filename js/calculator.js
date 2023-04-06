const workspace = document.querySelector('.calculator__workspace');
const answer = document.querySelector('.calculator__answer');
const clear = document.querySelector('.calculator__clear')

const OPERATORS = {
  ADD: '+',
  SUBTRACT: '−',
  MULTIPLICATION: '×',
  DIVISION: '÷',
};

let firstNumber = '';
let operator = '';
let secondNumber = '';

function isContainsClass(classes, desiredClass) {
  return classes.includes(desiredClass);
};

function isContainsPoint(point, desiredPoint) {
  return point.includes(desiredPoint);
};

workspace.addEventListener('click', function(event) {
  const targetText = event.target.outerText;
  const clickBtn = isContainsClass(event.target.className, 'calculator__workspace-button');
  const clickOperator = isContainsClass(event.target.className, 'operator');
  const clickEqually = isContainsClass(event.target.className, 'calculator__equals')
  const clickDot = isContainsClass(event.target.className, 'dot')
  const ifPoint = isContainsPoint(answer.textContent, '.')

  if (!ifPoint && clickDot && (!operator || secondNumber)) {
    answer.textContent += targetText;
  }else if (clickBtn && !operator && !clickDot) {
    answer.textContent += targetText;
    firstNumber = answer.textContent;
  }else if (clickOperator && !clickDot) {
    operator = targetText;
    answer.textContent = operator;
  }else if (clickBtn && operator && !clickDot) {
    if (answer.textContent === operator) {
      answer.textContent = '';
    }
    answer.textContent += targetText;
    secondNumber = answer.textContent;
  }else if(clickEqually) {
    answer.textContent = Math.round(calc(operator, +firstNumber, +secondNumber));
  };
});

clear.addEventListener('click', function() {
  operator = '';
  firstNumber = '';
  secondNumber = '';
  answer.textContent = '';
});

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
    case OPERATORS.DIVISION:
      result = firstNumber / secondNumber;
      break;
    default:
      result = 'Оператор отсуствует';
      break;
  };
  return result;
};