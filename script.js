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
    if (calc.x.length > 16 || calc.y.length > 16) {
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
    console.log("number " + calc.x + calc.op + calc.y + " = " + calc.sum)
}

function dotManager() {
    const regexDotStart = /^\./g;
    let dotStartX = regexDotStart.test(calc.x);
    let dotStartY = regexDotStart.test(calc.y);
    if (dotStartX === true) {
        display.innerText = "0."
        calc.x = "0."
        blink();
        setTimeout(blink, 10);
    }
    if (dotStartY === true) {
        display.innerText = "0."
        calc.y = "0."
        blink();
        setTimeout(blink, 10);
    }
    const regexMultiDot = /(\..*){2,}/;
    let multiDotX = regexMultiDot.test(calc.x);
    let multiDotY = regexMultiDot.test(calc.y);
    if (multiDotX === true) {
        erase();
        blink();
        setTimeout(blink, 10);
    }
    if (multiDotY === true) {
        erase();
        blink();
        setTimeout(blink, 10);
    }
}

function userOperatorInput() {
    blink();
    setTimeout(blink, 10);
    blink();
    setTimeout(blink, 10);
    if (calc.x === "") {
        return
    }
    if (calc.sum !== "") {
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
    console.log("operator " + calc.x + calc.op + calc.y + " = " + calc.sum)
}

function calculate(){
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
        if (calc.y === "0" || calc.x === "0") {
            clearMemory();
            display.textContent = "can't do that";
            blink();
            setTimeout(blink, 100);
            return
        }
    }
    calc.sum = parseFloat(calc.sum.toFixed(10));
    if(calc.sum <= "0.0000001"){
        clearMemory();
        return
    }
    calc.x = calc.sum;
    calc.sum = "0";
    display.textContent = calc.x;
    console.log("result " + calc.x + calc.op + calc.y + " = " + calc.sum)
}

function clearMemory() {
    blink();
    setTimeout(blink, 10);
    if (calc.x === "") {
        return
    }
    calc.x = "";
    calc.y = "";
    calc.op = "";
    calc.sum = "";
    display.textContent = "0";
}

function erase() {
    blink();
    setTimeout(blink, 10);
    if (calc.x === "") {
        return
    }
    if (display.textContent === calc.x) {
        calc.x = calc.x.slice(0, -1);
        display.textContent = calc.x;
        if (calc.x === "") {
            display.textContent = "0";
            return;
        }
    }
    if (display.textContent === calc.y) {
        calc.y = calc.y.slice(0, -1);
        display.textContent = calc.y;
        if (calc.y === "") {
            display.textContent = "0";
            return;
        }
    }
    // if ((calc.y === ""|| calc.y !=="0") && calc.op ==="" && calc.sum ==="") {
    //     calc.x = calc.x.slice(0, -1);
    //     display.textContent = calc.x;
    //     if (calc.x === "") {
    //         display.textContent = "0";
    //         blink();
    //         setTimeout(blink, 10);
    //     }
    // }

    // if (calc.y !=="" && calc.op !=="" && calc.sum ==="") {
    //     calc.y = calc.y.slice(0, -1);
    //     display.textContent = calc.y;
    //     if (calc.y === "") {
    //         calc.y ="0";
    //         display.textContent = "0";
    //         blink();
    //         setTimeout(blink, 10);
    //     }
    // }

    // else if (calc.x !=="" && calc.x !=="" && calc.op !=="" && calc.sum ==="") {
    //     calc.x = calc.x.slice(0, -1);
    //     display.textContent = calc.x;
    //     if (calc.sum ==="") {
    //         display.textContent = "0";
    //         blink();
    //         setTimeout(blink, 10);
    //     }
    // }
    console.log("erase " + calc.x + calc.op + calc.y + " = " + calc.sum)
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