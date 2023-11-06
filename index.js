const playerNameInput = document.getElementById("nameInputField");

playerNameInput.addEventListener("input", function () {
  localStorage.setItem("playerName", playerNameInput.value);
});
