function operate(firstOperand, operator, secondOperand) {
    switch (operator) {
        case "+":
            return firstOperand + secondOperand;
        case "-":
            return firstOperand - secondOperand;
        case "x":
            return firstOperand * secondOperand;
        case "/":
            return firstOperand / secondOperand;
        default:
            return "no operation";
    }
}


let sequence = [];


const currentText = document.querySelector("#current-calc");
const previousText = document.querySelector("#previous-calc");

const numberButtons = document.querySelectorAll(".num-btn");
const operationButtons = document.querySelectorAll(".op-btn");
const equalButton = document.querySelector(".equal-btn");
const deleteButton = document.querySelector("#delete-btn");
const clearButton = document.querySelector("#clear-btn");


let floatingPoint = false;  

numberButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // if there floatingPoint in operand don't add another one when click flaotingPoint button
        if (e.target.classList.contains("dot-btn") && floatingPoint) {
            return;
        }

        // if there is not a floating and click it, add one and change state of floatingPoint
        if (e.target.classList.contains("dot-btn") && !floatingPoint) {
            floatingPoint = true;
        }

        currentText.textContent += e.target.textContent;
    });
});


operationButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        floatingPoint = false;
        if (sequence.length < 2) {
            if (sequence.length === 1) {
                sequence.pop();
            }
            sequence.push(currentText.textContent);
            sequence.push(e.target.textContent);
            previousText.textContent = currentText.textContent + " " + e.target.textContent;
            currentText.textContent = "";
        }
        else {
            if (currentText.textContent !== "") {
                const secondOperand = parseFloat(currentText.textContent);
                const operator = sequence.pop();
                const firstOperand = parseFloat(sequence.pop());
                const result = (Math.round(operate(firstOperand, operator, secondOperand) * 100) / 100).toString();
                previousText.textContent = "";
                currentText.textContent = result;
                sequence.push(result);
            }
        }
    });
});

equalButton.addEventListener("click", () => {
    if (currentText.textContent !== "" && sequence.length === 2) {
        const secondOperand = parseFloat(currentText.textContent);
        const operator = sequence.pop();
        const firstOperand = parseFloat(sequence.pop());
        const result = (Math.round(operate(firstOperand, operator, secondOperand) * 100) / 100).toString();
        previousText.textContent = "";
        currentText.textContent = result;
        sequence.push(result);
    }
});

clearButton.addEventListener("click", () => {
    currentText.textContent = "";
    previousText.textContent = "";
    sequence = [];
});

deleteButton.addEventListener("click", () => {
    if (sequence.length === 0 && currentText.textContent != "") {
        currentText.textContent = currentText.textContent.slice(0, -1);
    } else if (sequence.length === 1) {
        currentText.textContent = currentText.textContent.slice(0, -1);
        if (sequence.at(-1).length === 1) {
            sequence = [];
        } else {
            sequence[0] = currentText.textContent;
        }
    } else if (sequence.length === 2) {
        sequence.pop();
        previousText.textContent = "";
        currentText.textContent = sequence.at(-1);
    }
})