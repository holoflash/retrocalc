const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const display = document.querySelector("h1");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");

number.forEach(number => number.addEventListener("click", userNumberInput));
number.forEach(number => number.addEventListener("click", dotManager));
operator.forEach(operator => operator.addEventListener("click", userOperatorInput));
clear.addEventListener("click", clearMemory);
del.addEventListener("click", erase);


//calculator memory
const calc = {
    x: "",
    y: "",
    op: "",
    sum: "",
}

//number buttons
function userNumberInput() {
    calc.x = calc.x.concat(`${this.getAttribute("number")}`);
    if (calc.x.length > 15) {
        //shake
        erase();
        return
    }
    display.textContent = calc.x;
    // debug
    // console.log("op number section: " + calc.op)
    // console.log("x: " + calc.x)
    // console.log("y: " + calc.y)
    // console.log("sum: " + calc.sum)
}

//starting with a dot adds a decimal point
//only one dot is allowed
function dotManager() {
    const regexDotStart = /^\./g;
    let dotStart = regexDotStart.test(calc.x);
    if (dotStart === true) {
        display.innerText = "0."
        calc.x = "0."
        return
    }
    const regexMultiDot = /(\..*){2,}/;
    let multiDot = regexMultiDot.test(calc.x);
    if (multiDot === true) {
        erase();
    }
}

//operator buttons
function userOperatorInput() {
    if (calc.op === "=") {
        calc.x = calc.sum;
    }
    if (calc.x === "" && calc.op !== "=") {
        return
    }
    if (calc.op !== "") {
        calculate();
    }
    calc.y = calc.x;
    calc.x = "";
    calc.op = this.getAttribute("name");
    if (calc.y !== "" || calc.x !== "") {
        calculate();
    }
}


//math operations
function calculate() {
    if (calc.op === "" || calc.x === "") {
        return
    }
    if (calc.op === "+") {
        calc.sum = parseFloat(calc.y) + parseFloat(calc.x);
    }
    else if (calc.op === "-") {
        calc.sum = parseFloat(calc.y) - parseFloat(calc.x);
    }
    else if (calc.op === "*") {
        calc.sum = parseFloat(calc.y) * parseFloat(calc.x);
    }
    else if (calc.op === "/") {
        calc.sum = parseFloat(calc.y) / parseFloat(calc.x);
        if (calc.x === "0" || calc.y === "0") {
            display.textContent = "can't do that"
            return
        }
    }
    calc.sum = parseFloat(calc.sum.toFixed(12));
    calc.y = "";
    calc.x = calc.sum;
    calc.op = calc.op;
    display.textContent = calc.sum;
}

//Memory clear and erase functions
function clearMemory() {
    calc.x = "";
    calc.y = "";
    calc.op = "";
    calc.sum = "";
    display.textContent = "0";
}

function erase() {
    calc.x = calc.x.slice(0, -1);
    display.textContent = calc.x;
    if (calc.x === "") {
        display.textContent = "0";
    }
    if (calc.x === "") {
        calc.y = calc.y.slice(0, -1);
    }
}

//Keyboard input
window.addEventListener("keydown", keyboardInput);
window.addEventListener("keydown", dotManager);
number.forEach(number => number.addEventListener("click", keyboardInput));

function keyboardInput(e) {
    switch (e.key){
        case "c":
            clearMemory();
            break;
        case "Backspace":
            erase();
            break;
        case "Enter": case " ":
            document.getElementById("Enter").click();
            break;
        case "+": case "-": case "*": case "/":
            document.getElementById(`${e.key}`).click();
            break;
        case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0": case ".":
           document.getElementById(`${e.key}`).click();
            break;
        case "Shift":
            break;
            }
    }



//Fix bug where "num, =, +, num, =" results in "NaN"

//allow incremental op by pressing =

//Squash any bugs