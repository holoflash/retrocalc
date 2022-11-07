//Sound effects
const keysound = new Audio("resources/KeyR.wav");
const alertsound = new Audio("resources/Alertsound.wav");
const allButtons = document.querySelectorAll("button");
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const display = document.querySelector("h1");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");


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

number.forEach(number => number.addEventListener("mousedown", userNumberInput));
operator.forEach(operator => operator.addEventListener("mousedown", userOperatorInput));
equals.addEventListener("mousedown", calculate);
clear.addEventListener("click", clearMemory);
del.addEventListener("click", erase);



const calc = {
    x: "",
    y: "",
    op:"",
}

function userNumberInput(){
   calc.x = calc.x.concat(`${this.getAttribute("number")}`);
   display.textContent = calc.x;
}

function userOperatorInput(){
    calc.y = calc.x;
    calc.x = "";
    calc.op = this.getAttribute("name");
    if (calc.op =="="){
        calculate()
    }
}

function calculate(){
    if(calc.op =="+"){
        calc.x = parseInt(calc.y) + parseInt(calc.x);
    }
    else if(calc.op =="-"){
        calc.x = parseInt(calc.y) - parseInt(calc.x);
    }
    else if(calc.op =="*"){
        calc.x = parseInt(calc.y) * parseInt(calc.x);
    }
    else if(calc.op =="/"){
        calc.x = parseInt(calc.y) / parseInt(calc.x);
    }
    calc.op = "";
        calc.y = "";
        display.textContent = calc.x;
}

let zeroDisplay = display.textContent;

function clearMemory(){
    calc.x = "";
    calc.y = "";
    calc.op = "";
    display.textContent = zeroDisplay; 
}

function erase(){
    calc.x = calc.x.slice(0, -1);
     display.textContent = calc.x;
     if (calc.x===""){
        display.textContent = zeroDisplay;
     }

}

// function noDotStart(){
//     const regex = /^\./g;
//     let dotStart = regex.test(calculator.firstOperand)
//     if (dotStart === true){
//         remove();
//         alertsound.currentTime = 0.0;
//         alertsound.play();
//         alertsound.volume  = 0.5;
//     }
// }

// function onlyOneDot(){
//     const regex = /(\..*){2,}/;
//     let dotStart = regex.test(calculator.firstOperand);
//     if (dotStart === true){
//         alertsound.currentTime = 0.0;
//         alertsound.play();
//         alertsound.volume  = 0.5;
//         remove();
//     }
// }



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