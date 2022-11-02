const keysound = new Audio("resources/key.mp3");
const button = document.querySelectorAll("button");

function sound(){
    keysound.currentTime = 0.0;
    keysound.play();
}

button.forEach(button => button.addEventListener("touchstart", sound));
button.forEach(button => button.addEventListener("touchend", tapOrClick, false));
button.forEach(button => button.addEventListener("mousedown", sound));


function tapOrClick(event) {
    event.preventDefault();
    return false;
}