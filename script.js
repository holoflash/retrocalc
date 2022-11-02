const keysound = new Audio("resources/key.mp3");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const allButtons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const clear = document.querySelector(".clear");

//sound fx
// function sound() {
//     keysound.currentTime = 0.0;
//     keysound.play();
// }

// function tapOrClick(event) {
//     event.preventDefault();
//     return false;
// }

// allButtons.forEach(allButtons => allButtons.addEventListener("click", sound));

numberButtons.forEach(numberButtons => numberButtons.addEventListener("click", userInput));
clear.addEventListener("click", userInput);

let userNum = "";
let arr = Array.from(userNum);
let userOperator = "";
let result = 0;


//math functions
// function add(){
//    result = parseInt(userNum) + parseInt(userNum);
// }
// function subtract(){
//     result = parseInt(userNum) - parseInt(userNum);
// }
// function multiply(){
//     result = parseInt(userNum) * parseInt(userNum);
// }
// function divide(){
//     result = parseInt(userNum) / parseInt(userNum);
// }

function userInput() {
    userNum = this.getAttribute("name");
    updateDisplay();
    if (arr.length > 12) {
        numberButtons.forEach(numberButtons=>numberButtons.removeEventListener("click", userInput));
      }
    if(this.getAttribute("name")===null){
        display.innerHTML = 0;
        arr = [];
        numberButtons.forEach(numberButtons => numberButtons.addEventListener("click", userInput));
    }
}

function updateDisplay(){
    arr.push(userNum);
for (var i = 0; i < arr.length; i++) {
}
    display.innerHTML = (arr.join(''));
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