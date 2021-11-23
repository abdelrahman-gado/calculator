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

function calculate() {
    const secondOperand = parseFloat(currentDisplay.textContent);
    const operator = sequence.pop();
    const firstOperand = parseFloat(sequence.pop());
    const result = (Math.round(operate(firstOperand, operator, secondOperand) * 100) / 100).toString();
    return result;
}

function reomve() {
    if (sequence.length === 0 && currentDisplay.textContent !== "") {
        // delete first operand digits in currentDisplay
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    } else if (sequence.length === 1) {
        // delete first operand digits in sequence array
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
        if (sequence.at(-1).length === 1) {
            // if user delete all digits of the first operand, clear sequence array.
            sequence = [];
        } else {
            // change the first operand to be like text in currentDisplay (changed)
            sequence[0] = currentDisplay.textContent;
        }
    } else if (sequence.length === 2 && currentDisplay.textContent === "") {
        // if sequence array has the first operand and an operator and the user
        // didn't type second operand and user click delete, we delete operand 
        // and put the text in currentDisplay and clear previousDisplay
        sequence.pop();
        previousDisplay.textContent = "";
        currentDisplay.textContent = sequence.at(-1);

        // delete first operand also, becuase the user my change it (delete digits or add digits)
        // we will put the first operand in sequence array when user click operation (+ - x /) buttons
        sequence.pop();
    } else if (sequence.length === 2 && currentDisplay.textContent !== "") {
        // if sequence array has first operand and operator and the currentDisplay has 
        // the second operand, delete digits from the second operand in the currentDisplay.
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    }
}

function typeNumbers(e) {
    // if there floatingPoint in operand don't add another one when click flaotingPoint button
    if (e.target.classList.contains("dot-btn") && floatingPoint) {
        return;
    }

    // if there is not a floating and click it, add one and change state of floatingPoint
    if (e.target.classList.contains("dot-btn") && !floatingPoint) {
        floatingPoint = true;
    }

    currentDisplay.textContent += e.target.textContent;
}

function makeOperation(e) {
    // allow user type floatingPoint after clicking operator (int the second operand)
    floatingPoint = false;
    if (sequence.length < 2) {
        // if sequence array have one operand or empty and user write first operand and click one of the operator,
        // we push the first operand and operator to the sequence
        // the first operand and operator will show in previousDisplay
        if (sequence.length === 1) {
            // if sequence array conatain previous operand resulted from previous
            // opreation and user delete digit or add digits,
            // delete that old opreand from sequence to take the new changed operand.
            sequence.pop();
        }
        sequence.push(currentDisplay.textContent);
        sequence.push(e.target.textContent);
        previousDisplay.textContent = currentDisplay.textContent + " " + e.target.textContent;
        currentDisplay.textContent = "";
    }
    else {
        // if sequence array have one operand and operator and user type the second operand
        // if user click any + - / * operator button the result will be calculated and the
        // result will show in currentDisplay
        if (currentDisplay.textContent !== "") {
            // the currentDisplay must have the second operand
            // (the user must type second operator to calculate result)
            const result = calculate();
            previousDisplay.textContent = "";
            currentDisplay.textContent = result;
            sequence.push(result);
        }
    }
}

function equal() {
    if (currentDisplay.textContent !== "" && sequence.length === 2) {
        // calculate result when sequence array has the first operand and operator
        // and the user type second operand in the currentDisplay
        const result = calculate();
        previousDisplay.textContent = "";
        currentDisplay.textContent = result;
        sequence.push(result);
    }
}

function clear() {
    currentDisplay.textContent = "";
    previousDisplay.textContent = "";
    sequence = [];
}

//  tracking user input in sequence array
let sequence = [];


const currentDisplay = document.querySelector("#current-calc");
const previousDisplay = document.querySelector("#previous-calc");

const numberButtons = document.querySelectorAll(".num-btn");
const operationButtons = document.querySelectorAll(".op-btn"); // + - * / buttons

const equalButton = document.querySelector(".equal-btn");
const deleteButton = document.querySelector("#delete-btn");
const clearButton = document.querySelector("#clear-btn");


let floatingPoint = false;


numberButtons.forEach((button) => {
    button.addEventListener("click", typeNumbers);
});

operationButtons.forEach((button) => {
    button.addEventListener("click", makeOperation);
});

equalButton.addEventListener("click", equal);

// clearButton clears the sequence array and displays
clearButton.addEventListener("click", clear);

// deleteButton deletes one digit only
deleteButton.addEventListener("click", reomve);