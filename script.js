//Sound effects

const keysound = new Audio("resources/key.mp3");
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
const comma = document.querySelectorAll(".comma");


clear.addEventListener("click", clearDisplay);
del.addEventListener("click", remove);

numbers.forEach(numbers => numbers.addEventListener("click",userInput));
operate.forEach(operate => operate.addEventListener("click",operator));
comma.forEach(comma => comma.addEventListener("click",dot));



const calculator = {
    displayValue: "0",
    firstOperand: "",
    waitingForSecondOperand: false,
    operator: "",
  };

display.innerHTML = calculator.displayValue;
  

function userInput(){
    calculator.firstOperand = calculator.firstOperand.concat(`${this.getAttribute("number")}`);
    calculator.displayValue = calculator.firstOperand;
    updateDisplay();
}

function dot(){
    calculator.firstOperand = calculator.firstOperand.concat(`${this.getAttribute("number")}`);
    calculator.displayValue = calculator.firstOperand;
    updateDisplay();
}


function operator(){
    calculator.operator = this.getAttribute("name");
    console.log(calculator.operator);
}

function clearDisplay(){
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
    console.log(calculator.firstOperand);
}





// function updateDisplay() {
//     arr.push(userNum);
//     for (var i = 0; i < arr.length; i++) {
//     }
//     display.innerHTML = (arr.join(''));
    
//     userNum = arr;
// }



// function userInput() {
//     userNum = this.getAttribute("name");
//     updateDisplay();
//     if (arr.length >= 14) {
//         numberButtons.forEach(numberButtons => numberButtons.removeEventListener("mousedown", userInput));
//         numberButtons.forEach(numberButtons => numberButtons.removeEventListener("touchstart", userInput));
//     }










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