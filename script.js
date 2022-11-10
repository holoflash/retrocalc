const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const display = document.querySelector("h1");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const equal = document.getElementById("Enter");

const calc = {
    x: "",
    y: "",
    op: "",
    sum: "",
}

number.forEach(number => number.addEventListener("click", userNumberInput));
number.forEach(number => number.addEventListener("click", dotManager));
operator.forEach(operator => operator.addEventListener("click", userOperatorInput));
clear.addEventListener("click", clearMemory);
del.addEventListener("click", erase);
equal.addEventListener("click", calculate);
window.addEventListener("keydown", keyboardInput);
window.addEventListener("keydown", dotManager);

function userNumberInput() {
    if (calc.x.length >= 16 || calc.y.length >= 16) {
        blink();
        setTimeout(blink, 10);
        return;
    }
    if (calc.x !== "" && calc.op !== "") {
        calc.y = calc.y.concat(`${this.getAttribute("number")}`);
        display.textContent = calc.y;
    }
    if (calc.y === "" && calc.op === "") {
        calc.x = calc.x.concat(`${this.getAttribute("number")}`);
        display.textContent = calc.x;
    }
    console.log("number " + calc.x + calc.op +  calc.y + " = "+ calc.sum)
}

function dotManager() {
    const regexDotStart = /^\./g;
    let dotStartx = regexDotStart.test(calc.x);
    let dotStarty = regexDotStart.test(calc.y);
    if (dotStartx === true) {
        display.innerText = "0."
        calc.x = "0."
        blink();
        setTimeout(blink, 10);
    }
    if (dotStarty === true) {
        display.innerText = "0."
        calc.y = "0."
        blink();
        setTimeout(blink, 10);
    }
    const regexMultiDot = /(\..*){2,}/;
    let multiDotx = regexMultiDot.test(calc.x);
    let multiDoty = regexMultiDot.test(calc.y);
    if (multiDotx === true) {
        erase();
        blink();
        setTimeout(blink, 10);
    }
    if (multiDoty === true) {
        erase();
        blink();
        setTimeout(blink, 10);
    }
}

function userOperatorInput() {
    blink();
    setTimeout(blink, 10);
    if (calc.sum !==""){
        calc.y = "";
        calc.op = this.getAttribute("name");
    }
    if (calc.x !== "" && calc.op === "") {
        calc.op = this.getAttribute("name");
    }
    if (calc.x !== "" && calc.y !== "" && calc.op !== "") {
        calculate();
        calc.op = this.getAttribute("name");
        calc.y = "";
    }
    if (calc.x === "") {
        blink();
        setTimeout(blink, 10);
        return
    }
    console.log("operator " + calc.x + calc.op +  calc.y + " = "+ calc.sum)
}

function calculate() {
   
    if (calc.op === "" || calc.y === "") {
        blink();
        setTimeout(blink, 10);
        return
    }
    if (calc.op === "+") {
        calc.sum = parseFloat(calc.x) + parseFloat(calc.y);
    }
    else if (calc.op === "-") {
        calc.sum = parseFloat(calc.x) - parseFloat(calc.y);
    }
    else if (calc.op === "*") {
        calc.sum = parseFloat(calc.x) * parseFloat(calc.y);
    }
    else if (calc.op === "/") {
        calc.sum = parseFloat(calc.x) / parseFloat(calc.y);
        if (calc.x === "0") {
            display.textContent = "can't do that"
            blink();
            setTimeout(blink, 10);
            return
        }
    }
    calc.sum = parseFloat(calc.sum.toFixed(10));
    calc.x = calc.sum;
    display.textContent = calc.x;
    console.log("result " + calc.x + calc.op +  calc.y + " = "+ calc.sum)
}

function clearMemory() {
    calc.x = "";
    calc.y = "";
    calc.op = "";
    calc.sum = "";
    display.textContent = "0";
    blink();
    setTimeout(blink, 10);
}

function erase() {
    blink();
    setTimeout(blink, 10);
    if (calc.y === "" && calc.op ==="" && calc.sum ==="") {
        calc.x = calc.x.slice(0, -1);
        display.textContent = calc.x;
        if (calc.x === "") {
            display.textContent = "0";
            blink();
            setTimeout(blink, 10);
        }
    }

    if (calc.y !=="" && calc.op !=="" && calc.sum ==="") {
        calc.y = calc.y.slice(0, -1);
        display.textContent = calc.y;
        if (calc.y === "") {
            display.textContent = "0";
            blink();
            setTimeout(blink, 10);
        }
    }
}

function keyboardInput(e) {
    switch (e.key) {
        case "c":
            clearMemory();
            break;
        case "Backspace":
            erase();
            e.preventDefault();
            e.stopPropagation();
            break;
        case "Enter": case " ": case "=":
            document.getElementById("Enter").click();
            e.preventDefault();
            e.stopPropagation();
            break;
        case "+": case "-": case "*": case "/":
            document.getElementById(`${e.key}`).click();
            break;
        case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0": case ".":
            document.getElementById(`${e.key}`).click();
            break;
        case "Shift":
            break;
        default:
            blink();
            setTimeout(blink, 10);
            return
    }
}

function blink() {
    display.classList.toggle("blinking");
}