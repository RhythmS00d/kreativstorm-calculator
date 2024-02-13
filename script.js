// Math operator functions
const operations = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) =>
    num2 !== 0 ? num1 / num2 : 'Error: Cannot divide by zero!',
};

function operate(num1, num2, operator) {
    const decimals = Math.max(num1.toString().length, num2.toString().length);
    return +operations[operator](num1, num2).toFixed(decimals)
}