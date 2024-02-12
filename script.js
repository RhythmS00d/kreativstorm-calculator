const operators = ["+", "-", "*", "/"]
const userInputStore = {
    number: "",
    operator: ""
}
let userInput = "";
document.body.addEventListener("click", event => {
    if (event.target.nodeName == "BUTTON") {
        let value = event.target.textContent
        if (!isNaN(+value)) {
            userInput += value
        }
        if (value === ".") {
            if (userInput.indexOf(".") > -1) return
            if (!userInput) userInput = "0"
            userInput += value
            // return
        }
        if (operators.includes(value)) {
            if (userInputStore.operator) {
                let preResult = operate(userInputStore.operator, userInputStore.number, userInput)
                // document.querySelector(".display").textContent = preResult
                userInputStore.number = preResult
                userInputStore.operator = value
            } else {
                userInputStore.number = userInput
                userInputStore.operator = value
                // document.querySelector(".display").textContent = ""
            }
            userInput = ""
            // return
        }
        if (value === "=") {
            let result = operate(userInputStore.operator, userInputStore.number, userInput)
            // document.querySelector(".display").textContent = result
            // return
        }
        if (event.target.id === "clear") {
            userInput = ""
            userInputStore.number = ""
            userInputStore.operator = ""
            // document.querySelector(".display").textContent = ""
            // return
        }
        if (event.target.id === "backspace") {
            if (userInput.length > 0) {
                userInput.slice(0, -1);
            }
        }
        console.log(userInput)
    }
});