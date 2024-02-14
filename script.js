// Math operator functions
const operations = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) =>
    num2 !== 0 ? num1 / num2 : 'Error: Cannot divide by zero!',
};

function operate(num1, num2, operator) {
    const decimals = Math.max(num1.length, num2.length);
    return +operations['add'](+num1, +num2).toFixed(decimals)
}

const operators = ["+", "-", "*", "/"]
const userInputStore = {
    number: "",
    operator: ""
}
let userInput = "";

function displayUpdate(value){
    document.querySelector(".calculator__display").value = value
}

document.body.addEventListener("click", event => {
    if (event.target.nodeName == "BUTTON") {
        let value = event.target.textContent
        if (!isNaN(+value)) {
            if(userInput === "0"){
                userInput = value
            } else {
                userInput += value
            }
        }
        if (value === ".") {
            if (userInput.indexOf(".") > -1) return
            if (!userInput) userInput = "0"
            userInput += value
        }
        if (operators.includes(value)) {
            if (userInputStore.operator) {
                let preResult = operate(userInputStore.number, userInput, userInputStore.operator)
                displayUpdate(preResult)
                userInputStore.number = preResult
                userInputStore.operator = event.target.id
            } else {
                userInputStore.number = userInput
                userInputStore.operator = event.target.id
                displayUpdate("")
            }
            userInput = ""
        }
        if (value === "=") {
            let result = operate(userInputStore.number, userInput, userInputStore.operator)
            displayUpdate(result)
            return
        }
        if (event.target.id === "clear") {
            userInput = ""
            userInputStore.number = ""
            userInputStore.operator = ""
            displayUpdate("0")
            return
        }
        if (event.target.id === "delete") {
            if (userInput.length > 1) {
                userInput = userInput.slice(0, -1);
            } else {
                userInput = "0"
            }
        }
        displayUpdate(userInput)
    }
});