const workspace = document.querySelector('.calculator__workspace');
const answer = document.querySelector('.calculator__answer');
const clear = document.querySelector('.calculator__clear')
const equals = document.querySelector('.calculator__equals')

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
  const clickInnerOperators = isContainsClass(event.target.className, 'calculator__operators');
  const clickCancel = isContainsClass(event.target.className, 'calculator__workspace-button--cancel');
  const clickDot = isContainsClass(event.target.className, 'dot');
  const isPoint = isContainsPoint(answer.textContent, '.');

  let characters = '';

  if (!isPoint && clickDot && (!operator || secondNumber)) {
    if (!firstNumber) {
      answer.textContent = 0;
    }
    answer.textContent += targetText;
  }else if (clickBtn && !operator && !clickDot && !clickCancel) {
    answer.textContent += targetText;
    firstNumber = answer.textContent;
    console.log(firstNumber);
  }else if (clickOperator && !clickDot && firstNumber && !clickInnerOperators) {
    operator = targetText;
    answer.textContent = operator;
  }else if (clickBtn && operator && !clickCancel && !clickDot) {
    if (answer.textContent === operator) {
      answer.textContent = '';
    }
    answer.textContent += targetText;
    secondNumber = answer.textContent;
  };

  if (clickCancel && firstNumber && !operator) {
    characters = answer.textContent.length - 1;
    answer.textContent = answer.textContent.slice(0, characters);
    firstNumber = answer.textContent;
  }else if (clickCancel && operator && !secondNumber) {
    characters = answer.textContent.length - 1;
    answer.textContent = answer.textContent.slice(0, characters);
    operator = answer.textContent;
    if (!operator) {
      answer.textContent = firstNumber;
    };
  }else if(clickCancel && secondNumber){
    characters = answer.textContent.length - 1;
    answer.textContent = answer.textContent.slice(0, characters);
    secondNumber = answer.textContent;
    if (!secondNumber) {
      answer.textContent = operator;
    };
  }
});

clear.addEventListener('click', function() {
  operator = '';
  firstNumber = '';
  secondNumber = '';
  answer.textContent = '';
});

equals.addEventListener('click', function() {
  if (!firstNumber || !operator || !secondNumber) {
    return;
  };

  answer.textContent = Math.round(calc(operator, +firstNumber, +secondNumber));
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

  if (Number.isNaN(result) || Number.isFinite(result)) {
    result = 'На 0 делить нельзя';
  };

  return result;
};