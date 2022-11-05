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



const operate = document.querySelectorAll(".operator");
const display = document.querySelector("h1");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const numbers = document.querySelectorAll(".number");


clear.addEventListener("click", clearDisplay);
del.addEventListener("click", remove);

numbers.forEach(numbers => numbers.addEventListener("click",userInput));
numbers.forEach(numbers => numbers.addEventListener("touchstart",userInput));
numbers.forEach(numbers => numbers.addEventListener("click",noDotStart));
numbers.forEach(numbers => numbers.addEventListener("touchstart",noDotStart));
numbers.forEach(numbers => numbers.addEventListener("click",onlyOneDot));
numbers.forEach(numbers => numbers.addEventListener("touchstart",onlyOneDot));
operate.forEach(operate => operate.addEventListener("click",operator));
operate.forEach(operate => operate.addEventListener("touchstart",operator));



const calculator = {
    displayValue: "0",
    firstOperand: "",
    waitingForSecondOperand: false,
    operator: "",
    secondOperand: "",
  };

display.innerHTML = calculator.displayValue;
  

function userInput(){
    calculator.firstOperand = calculator.firstOperand.concat(`${this.getAttribute("number")}`);
    calculator.displayValue = calculator.firstOperand;
    updateDisplay();
    if(calculator.waitingForSecondOperand==true){
        calculator.displayValue ="0"
        calculator.secondOperand = calculator.secondOperand.concat(`${this.getAttribute("number")}`);
        calculator.displayValue = calculator.secondOperand;
        updateDisplay();
        return
    }
}


function noDotStart(){
    const regex = /^\./g;
    let dotStart = regex.test(calculator.firstOperand)
    if (dotStart === true){
        remove();
        alertsound.currentTime = 0.0;
        alertsound.play();
        alertsound.volume  = 0.5;
    }
}

function onlyOneDot(){
    const regex = /(\..*){2,}/;
    let dotStart = regex.test(calculator.firstOperand);
    if (dotStart === true){
        alertsound.currentTime = 0.0;
        alertsound.play();
        alertsound.volume  = 0.5;
        remove();
    }
}

function operator(){
    calculator.waitingForSecondOperand = true;
    calculator.operator = this.getAttribute("name");
    if(this.getAttribute("name")==="="){
        decision();
    }
}

function clearDisplay(){
    if (calculator.displayValue ==="0")
    return
    calculator.firstOperand = "";
    calculator.displayValue = "0"
    updateDisplay();
}

function remove(){
    if (calculator.displayValue ==="0")
     return
    calculator.firstOperand = calculator.firstOperand.slice(0, -1);
    calculator.displayValue = calculator.firstOperand;
    updateDisplay();
     if(calculator.firstOperand.length === 0){
        clearDisplay();
     }
}

function updateDisplay(){
    display.innerHTML = calculator.displayValue;    
}


function decision(a,b){
    a = calculator.firstOperand;
    b = calculator.secondOperand;
    alert(parseInt(a) + parseInt(b));
}




// JS keycodes
// 0	48
// 1	49
// 2	50
// 3	51
// 4	52
// 5	53
// 6	54
// 7	55
// 8	56
// 9	57