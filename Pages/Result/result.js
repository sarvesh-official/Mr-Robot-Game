// Appending the values to particular div
var accuracyText = document.getElementById("accuracytext");
var wpmText = document.getElementById("wpmtext");
var mistaketext = document.getElementById("mistaketext");

accuracyText.innerHTML = Math.round(localStorage.getItem("accuracy")) + "%";
wpmText.innerHTML = Math.ceil(localStorage.getItem("wpm")) + " WPM";
mistaketext.innerHTML = Math.round(localStorage.getItem("mistakes"));
