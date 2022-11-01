const keysound = new Audio("resources/key.mp3");
const button = document.querySelectorAll("button");

function sound(){
    keysound.currentTime = 0.04;
    keysound.play();
}

button.forEach(button => button.addEventListener("click", sound))
