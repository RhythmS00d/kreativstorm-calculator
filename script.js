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
  currentInput: null,
  operator: null,
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

  if (value === '=') updateDisplay(VALUES.solution);
  else if (VALUES.solution !== null && VALUES.currentInput === null)
    updateDisplay(VALUES.solution);
  else updateDisplay(VALUES.currentInput);
}

function updateDisplay(value) {
  display.value = value;
}

function operatorHandler(value) {
  if (
    VALUES.currentInput !== null &&
    VALUES.solution !== null &&
    VALUES.operator !== null
  ) {
    operate(VALUES.solution, VALUES.currentInput, VALUES.operator);
  }

  VALUES.operator = operators[value];

  if (VALUES.solution !== null && VALUES.currentInput === null) return;

  if (VALUES.solution === null) {
    [VALUES.solution, VALUES.currentInput] = [VALUES.currentInput, null];
    return;
  }

  // operate(VALUES.solution, VALUES.currentInput, VALUES.operator);
  [VALUES.solution, VALUES.currentInput] = [VALUES.solution, null];
}

function logicHandler(value) {
  if (/[0-9+]/.test(+value)) {
    VALUES.currentInput = +(
      (VALUES.currentInput === null ? '' : VALUES.currentInput) + value
    );
  } else if (value === '.') {
    if (
      VALUES.currentInput !== null &&
      VALUES.currentInput.toString().indexOf('.') === -1
    ) {
      VALUES.currentInput += '.';
    }
  } else if (/[+-/*]/.test(value)) {
    operatorHandler(value);
  } else if (value === '=') {
    if (VALUES.operator === null) return;
    if (VALUES.currentInput === null && VALUES.solution === null) return;

    if (
      VALUES.currentInput === null &&
      VALUES.operator !== null &&
      VALUES.solution !== null
    ) {
      VALUES.currentInput = VALUES.solution;
      operate(VALUES.solution, VALUES.currentInput, VALUES.operator);
      VALUES = {
        currentInput: VALUES.currentInput,
        operator: VALUES.operator,
        solution: VALUES.solution,
      };
    } else {
      operate(VALUES.solution, VALUES.currentInput, VALUES.operator);

      VALUES = {
        currentInput: null,
        operator: VALUES.operator,
        solution: VALUES.solution,
      };
    }
  } else if (value === 'C') {
    VALUES = {
      currentInput: null,
      operator: null,
      solution: null,
    };
  } else if (value === 'DE') {
    if (VALUES.currentInput === null) return;

    VALUES.currentInput =
      VALUES.currentInput.toString().indexOf('.') === -1
        ? Math.floor(VALUES.currentInput / 10)
        : parseFloat(VALUES.currentInput.toString().slice(0, -1));
  }

  console.log(VALUES);
}

// Keyboard support
document.addEventListener('DOMContentLoaded', function () {
  const display = document.getElementById('display');

  document.addEventListener('keydown', handleKeyPress);

  function addToDisplay(value) {
    display.value += value;
  }

  function handleKeyPress(event) {
    const key = event.key;
    if (/[0-9+\-*/=.]/.test(key)) {
      addToDisplay(key);
    } else if (key === 'Enter') {
      evaluateExpression();
    } else if (key === 'Escape') {
      clearDisplay();
    } else if (key == 'Backspace') {
      removeLastCharacter();
    }
    
    function removeLastCharacter() {
      display.value = display.value.slice(0, -1);
    }

    function evaluateExpression() {
      const expression = display.value;
      const regex = /(\d+\.?\d*)? *([+\-*/]) *(\d+\.?\d*)/;
      const match = expression.match(regex);
    
      if (match) {
        const num1 = match[1] ? parseFloat(match[1]) : 0;
        const operator = match[2];
        const num2 = match[3] ? parseFloat(match[3]) : 0;
    
        try {
          operate(num1, num2, operators[operator]);
        } catch (error) {
          display.value = 'Error';
        }
      } else {
        display.value = 'Error';
      }
    }
    
    function clearDisplay() {
      display.value = '';
    }
  }
});
