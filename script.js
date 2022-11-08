//Sound effects
const keysound = new Audio("resources/KeyR.wav");
const alertsound = new Audio("resources/Alertsound.wav");
const allButtons = document.querySelectorAll("button");

function sound() {
    keysound.currentTime = 0.0;
    keysound.play();
}

allButtons.forEach(allButtons => allButtons.addEventListener("click", sound));



//The actual calculator begins here
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const display = document.querySelector("h1");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");

window.addEventListener("keydown", pressedKey);

number.forEach(number => number.addEventListener("click", userNumberInput));
number.forEach(number => number.addEventListener("click", dotManager));
operator.forEach(operator => operator.addEventListener("click", userOperatorInput));
clear.addEventListener("click", clearMemory);
del.addEventListener("click", erase);

function pressedKey(e) {
    console.log(e.keyCode);
}

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
        clearMemory();
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
            display.textContent = "nice try"
            return
        }
    }
    calc.y = "";
    calc.x = calc.sum
    calc.op = calc.op;
    let niceNumber = parseFloat(calc.sum.toFixed(4));
    display.textContent = niceNumber;

}

//Memory clear and erase functions
let zeroDisplay = display.textContent;

function clearMemory() {
    calc.x = "";
    calc.y = "";
    calc.op = "";
    calc.sum = "";
    display.textContent = zeroDisplay;
}

function erase() {
    calc.x = calc.x.slice(0, -1);
    display.textContent = calc.x;
    if (calc.x === "") {
        display.textContent = zeroDisplay;
    }
}