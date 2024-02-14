// Math operator functions
const operations = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) =>
    num2 !== 0 ? num1 / num2 : "Error: Cannot divide by zero!",
};

const operators = {
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
};

let VALUES = {
  firstVal: null,
  secondVal: null,
  operator: null,
  operatorSelected: false,
  solution: null,
};
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".calculator__display");

function operate(num1, num2, operator) {
  const decimals = Math.max(num1.length, num2.length);
  VALUES.solution = +operations[operator](+num1, +num2).toFixed(decimals);
  display.value = VALUES.solution;
}

// Calculation logic

buttons.forEach((button) =>
  button.addEventListener("click", (e) => handleClick(e.target.innerText))
);

function handleClick(value) {
  logicHandler(value);
}

function updateDisplay() {
  display.value = !VALUES.operatorSelected ? VALUES.firstVal : VALUES.secondVal;
}

function logicHandler(value) {
  if (/[0-9+]/.test(+value)) {
    if (!VALUES.operatorSelected)
      VALUES.firstVal = +(
        (VALUES.firstVal === null ? "" : VALUES.firstVal) + value
      );
    else if (VALUES.operatorSelected)
      VALUES.secondVal = +(
        (VALUES.secondVal === null ? "" : VALUES.secondVal) + value
      );
  } else if (/[+-/*]/.test(value)) {
    //
    VALUES.operatorSelected = true;
    VALUES.operator = operators[value];
  } else if (value === "=") {
    if (!VALUES.operatorSelected || VALUES.firstVal === null) return;

    if (
      VALUES.firstVal !== null &&
      VALUES.operatorSelected &&
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
  } else if (value === "C") {
    //
    VALUES = {
      firstVal: null,
      secondVal: null,
      operator: null,
      operatorSelected: false,
      solution: null,
    };
  } else if (value === "DE") {
    //
    if (!VALUES.operatorSelected && VALUES.firstVal !== null)
      VALUES.firstVal = Math.floor(VALUES.firstVal / 10);
    else if (VALUES.operatorSelected && VALUES.secondVal !== null)
      VALUES.secondVal = Math.floor(VALUES.secondVal / 10);
  }

  console.log(VALUES);
  updateDisplay();
}

// Keyboard support innitial code
document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  // const buttons = document.querySelectorAll(".calculator__button-box button");

  // buttons.forEach((button) => {
  //     button.addEventListener("click", () => addToDisplay(button.innerText));
  // });

  document.addEventListener("keydown", handleKeyPress);

  function addToDisplay(value) {
    display.value += value;
  }

  function handleKeyPress(event) {
    const key = event.key;

    if (/[0-9+\-*/=]/.test(key)) {
      addToDisplay(key);
    } else if (key === "Enter") {
      evaluateExpression();
    } else if (key === "Escape") {
      clearDisplay();
    }
  }

  function evaluateExpression() {
    try {
      display.value = eval(display.value);
    } catch (error) {
      display.value = "Error";
    }
  }

  function clearDisplay() {
    display.value = "0";
  }
});
