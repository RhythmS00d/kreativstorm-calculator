// Math operator functions
const operations = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => {
    if (num2 !== 0) {
      return num1 / num2;
    } else {
      throw new Error("Cannot divide by zero!");
    }
  },
};

const operators = {
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
};

let VALUES = {
  currentInput: null,
  operator: null,
  solution: null,
};
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".calculator__display");

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
  button.addEventListener("click", (e) => handleClick(e.target.innerText))
);

function handleClick(value) {
  logicHandler(value);

  if (value === "=") updateDisplay(VALUES.solution);
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
      (VALUES.currentInput === null ? "" : VALUES.currentInput) + value
    );
  } else if (value === ".") {
    if (
      VALUES.currentInput !== null &&
      VALUES.currentInput.toString().indexOf(".") === -1
    ) {
      VALUES.currentInput += ".";
    }
  } else if (/[+-/*]/.test(value)) {
    operatorHandler(value);
  } else if (value === "=" || value === "Enter") {
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
  } else if (value === "C" || value === "Escape") {
    VALUES = {
      currentInput: null,
      operator: null,
      solution: null,
    };
  } else if (value === "DE" || value === "Backspace") {
    if (VALUES.currentInput === null) return;

    VALUES.currentInput =
      VALUES.currentInput.toString().indexOf(".") === -1
        ? Math.floor(VALUES.currentInput / 10)
        : parseFloat(VALUES.currentInput.toString().slice(0, -1));
  }

  console.log(VALUES);
}

// Keyboard support
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", handleKeyPress);

  function handleKeyPress(event) {
    const key = event.key;
    if (
      /[0-9+\-*/=.]/.test(key) ||
      key === "Enter" ||
      key === "Escape" ||
      key == "Backspace"
    ) {
      logicHandler(key);

      if (key === "Enter") updateDisplay(VALUES.solution);
      else if (VALUES.solution !== null && VALUES.currentInput === null)
        updateDisplay(VALUES.solution);
      else updateDisplay(VALUES.currentInput);
    }
  }
});
