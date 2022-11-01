const bass = new Audio("resources/key.mp3");
const button = document.querySelectorAll("button");

function sound(){
    bass.currentTime = 0;
    bass.play();
}

button.forEach(button => button.addEventListener("click", sound))
