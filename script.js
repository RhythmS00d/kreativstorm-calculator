// Math operator functions
const operations = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => {
    if (num2 !== 0) {
      return num1 / num2;
    } else {
      throw new Error('Cannot divide by zero!');
    }
  },
};

const operators = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
};

let VALUES = {
  firstVal: null,
  secondVal: null,
  operator: null,
  operatorSelected: false,
  solution: null,
};
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.calculator__display');

function operate(num1, num2, operator) {
  try {
    const decimals = Math.max(num1.toString().length, num2.toString().length);
    VALUES.solution = +operations[operator](num1, num2).toFixed(decimals);
    display.value = VALUES.solution;
  } catch (error) {
    setTimeout(() => {
      display.value = error.message;
      return;
    }, 0);
  }
}

// Calculation logic

buttons.forEach((button) =>
  button.addEventListener('click', (e) => handleClick(e.target.innerText))
);

function handleClick(value) {
  logicHandler(value);
}

function updateDisplay() {
  display.value = !VALUES.operatorSelected
    ? VALUES.firstVal
    : VALUES.secondVal || VALUES.firstVal;
}

function logicHandler(value) {
  if (/[0-9+]/.test(+value)) {
    if (!VALUES.operatorSelected) {
      VALUES.firstVal =
        VALUES.solution !== null
          ? +value
          : +((VALUES.firstVal === null ? '' : VALUES.firstVal) + value);
      VALUES.solution = null;
    }
    // VALUES.firstVal = +(
    //   (VALUES.firstVal === null ? "" : VALUES.firstVal) + value
    // );
    else if (VALUES.operatorSelected)
      VALUES.secondVal = +(
        (VALUES.secondVal === null ? '' : VALUES.secondVal) + value
      );
  } else if (value === '.') {
    if (
      VALUES.firstVal !== null &&
      !VALUES.operatorSelected &&
      VALUES.firstVal.toString().indexOf('.') === -1
    ) {
      VALUES.firstVal += '.';
    } else if (
      VALUES.firstVal !== null &&
      VALUES.operatorSelected &&
      VALUES.secondVal.toString().indexOf('.') === -1
    )
      VALUES.secondVal += '.';
  } else if (/[+-/*]/.test(value)) {
    VALUES.operatorSelected = true;
    VALUES.operator = operators[value];
  } else if (value === '=') {
    if (!VALUES.operatorSelected || VALUES.firstVal === null) return;

    if (
      // VALUES.firstVal !== null &&
      // VALUES.operatorSelected &&
      VALUES.secondVal === null
    ) {
      operate(VALUES.firstVal, VALUES.firstVal, VALUES.operator);
    } else operate(VALUES.firstVal, VALUES.secondVal, VALUES.operator);

    VALUES = {
      firstVal: VALUES.solution,
      secondVal: null,
      operator: null,
      operatorSelected: false,
      solution: VALUES.solution,
    };
  } else if (value === 'C') {
    //
    VALUES = {
      firstVal: null,
      secondVal: null,
      operator: null,
      operatorSelected: false,
      solution: null,
    };
  } else if (value === 'DE') {
    if (!VALUES.operatorSelected && VALUES.firstVal !== null)
      VALUES.firstVal =
        VALUES.firstVal.toString().indexOf('.') === -1
          ? Math.floor(VALUES.firstVal / 10)
          : parseFloat(VALUES.firstVal.toString().slice(0, -1));
    else if (VALUES.operatorSelected && VALUES.secondVal !== null)
      VALUES.secondVal =
        VALUES.secondVal.toString().indexOf('.') === -1
          ? Math.floor(VALUES.secondVal / 10)
          : parseFloat(VALUES.secondVal.toString().slice(0, -1));
  }

  console.log(VALUES);
  updateDisplay();
}

// Keyboard support initial code
document.addEventListener('DOMContentLoaded', function () {
  const display = document.getElementById('display');

  document.addEventListener('keydown', handleKeyPress);

  function addToDisplay(value) {
    display.value += value;
  }

  function handleKeyPress(event) {
    const key = event.key;

    if (/[0-9+\-*/=]/.test(key)) {
      addToDisplay(key);
    } else if (key === 'Enter') {
      evaluateExpression();
    } else if (key === 'Escape') {
      clearDisplay();
    } else if (key == 'Backspace') {
      removeLastCharacter();
    }

    function removeLastCharacter() {
      const display = document.getElementById('display');
      display.value = display.value.slice(0, -1);
    }

    function evaluateExpression() {
      try {
        display.value = eval(display.value);
      } catch (error) {
        display.value = 'Error';
      }
    }
    function clearDisplay() {
      display.value = '';
    }
  }
});
