//Sound effects
const keysound = new Audio("resources/KeyR.wav");
const alertsound = new Audio("resources/Alertsound.wav");
const allButtons = document.querySelectorAll("button");

function sound() {
    keysound.currentTime = 0.0;
    keysound.play();
}

function tapOrClick(event) {
    event.preventDefault();
    return false;
}

allButtons.forEach(allButtons => allButtons.addEventListener("touchstart", sound));
allButtons.forEach(allButtons => allButtons.addEventListener("touchend", tapOrClick, false));
allButtons.forEach(allButtons => allButtons.addEventListener("mousedown", sound));

//The actual calculator begins here
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const display = document.querySelector("h1");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");

number.forEach(number => number.addEventListener("mousedown", userNumberInput));
number.forEach(number => number.addEventListener("mousedown", dotManager));
operator.forEach(operator => operator.addEventListener("mousedown", userOperatorInput));
equals.addEventListener("mousedown", calculate);
clear.addEventListener("click", clearMemory);
del.addEventListener("click", erase);


//calculator memory
const calc = {
    x: "",
    y: "",
    op: "",
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
}

//starting with a dot adds a decimal point
//only one dot is allowed
function dotManager() {
    const regexDotStart = /^\./g;
    let dotStart = regexDotStart.test(calc.x);
    if (dotStart === true) {
        erase();
        display.textContent = "0."
        calc.x = calc.x + "0."
    }
    const regexMultiDot = /(\..*){2,}/;
    let multiDot = regexMultiDot.test(calc.x);
    if (multiDot === true) {
        erase();
    }
}

//operator buttons
function userOperatorInput() {
    if (calc.x ===""){
        return
    }
    calc.y = calc.x;
    calc.x = "";
    calc.op = this.getAttribute("name");
    console.log(calc.op)
    }

//math operations
function calculate() {
    if (calc.op ==="" ||calc.x ===""){
        return
    }
    if (calc.op == "+") {
        calc.x = parseFloat(calc.y) + parseFloat(calc.x);
    }
    else if (calc.op == "-") {
        calc.x = parseFloat(calc.y) - parseFloat(calc.x);
    }
    else if (calc.op == "*") {
        calc.x = parseFloat(calc.y) * parseFloat(calc.x);
    }
    else if (calc.op == "/") {
        calc.x = parseFloat(calc.y) / parseFloat(calc.x);
    }
    calc.op = "";
    calc.y = "";
    let result = parseFloat(calc.x.toFixed(2));
    display.textContent = result;
    console.log(result);
    console.log("op is: " + calc.op +" x is: " + calc.x + " y is: " +calc.y)
}

//Memory clear and erase functions
let zeroDisplay = display.textContent;

function clearMemory() {
    calc.x = "";
    calc.y = "";
    calc.op = "";
    display.textContent = zeroDisplay;
}

function erase() {
    calc.x = calc.x.slice(0, -1);
    display.textContent = calc.x;
    if (calc.x === "") {
        display.textContent = zeroDisplay;
    }
}


//2.accept floats and restrict output to x.xx

//3.turn off certain buttons while operating

//4.allow operations on one input number



// // JS keycodes
// // 0	48
// // 1	49
// // 2	50
// // 3	51
// // 4	52
// // 5	53
// // 6	54
// // 7	55
// // 8	56
// // 9	57