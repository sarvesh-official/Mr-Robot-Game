const startGameButton = document.querySelector(".startGamebutton");

// Assuming you have an audio element with the id "gameAudio"
const gameAudio = new Audio("../../Assets/story1h.mp3");

startGameButton.addEventListener("click", function () {
  gameAudio.play();
});
