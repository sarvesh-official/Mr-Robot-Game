// Generating Random // Generating an array of words from a given text Words
const words =
  "in a world where shadows and screens intertwine a digital vigilante emerges they go by many names but are best known as mr robot the digital realm is their playground and they play the game by their own rules but this world is not a simple dichotomy of good and evil mr robot with their enigmatic intentions challenges our perception of justice".split(
    " "
  );

const wordsCount = words.length;
let wordIndex = 0;

// timer values
const gameTime = 30000;
window.timer = null;
window.gameStart = null;

// Generating words to append
function generateWords() {
  if (wordIndex < wordsCount) {
    const currentWord = words[wordIndex];
    wordIndex++;
    return currentWord;
  }
  return "";
}

// Adding className to current elements
function addClass(el, name) {
  el.className += " " + name;
}

// Removing className to current elements
function removeClass(el, name) {
  el.className = el.className.replace(name, "");
}

// Function to format a word for display

function formatWord(word) {
  let formattedWord = "<div class='word'>";

  word.split("").forEach((letter) => {
    formattedWord += `<span class="letter">${letter}</span>`;
  });

  formattedWord += "</div>";
  return formattedWord;
}

// Function to calculate and store WPM, mistakes, and accuracy
function getResults() {
  const words = [...document.querySelectorAll(".word")];
  const lastTypedWord = document.querySelector(".word.current");
  const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
  const typedWords = words.slice(0, lastTypedWordIndex);

  let mistakes = 0;

  const correctWords = typedWords.filter((word) => {
    const letters = [...word.children];
    const incorrectLetters = letters.filter((letter) =>
      letter.className.includes("incorrect")
    );
    mistakes += incorrectLetters.length;
    localStorage.setItem("mistakes", mistakes);
    const correctLetters = letters.filter((letter) =>
      letter.className.includes("correct")
    );

    return (
      incorrectLetters.length === 0 && correctLetters.length === letters.length
    );
  });
  const accuracy = (correctWords.length / typedWords.length) * 100;
  localStorage.setItem("accuracy", accuracy);

  const wpm = (correctWords.length / gameTime) * 60000;
  localStorage.setItem("wpm", wpm);
}

// Game over
function gameOver() {
  clearInterval(window.timer);
  addClass(document.getElementById("game"), "over");
  getResults();
  window.location.href = "../Result/PracticeResult.html";
}

// New Game
function newGame() {
  document.getElementById("words").innerHTML = "";
  for (let i = 0; i < 200; i++) {
    document.getElementById("words").innerHTML += formatWord(generateWords());
  }
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
  document.getElementById("timertext").innerHTML = gameTime / 1000;
  window.timer = null;
}

// Listening to Keys

document.getElementById("game").addEventListener("keyup", (ev) => {
  let gameAudio = new Audio("../../Assets/keyboard.mp3");
  gameAudio.play();
  const key = ev.key;
  const currentLetter = document.querySelector(".letter.current");
  // Optional Changing Operator ?
  const expected = currentLetter?.innerHTML || " ";
  const currentWord = document.querySelector(".word.current");
  const isLetter = key.length === 1 && key != " ";
  const isSpace = key === " ";
  const isBackspace = key === "Backspace";
  const isFirstLetter = currentLetter === currentWord.firstChild;

  if (document.querySelector("#game.over")) {
    return;
  }
  console.log({ key, expected });
  // Setting timer for the game
  if (!window.timer) {
    window.timer = setInterval(() => {
      if (!window.gameStart) {
        window.gameStart = new Date().getTime();
      }
      const currentTime = new Date().getTime();
      const msPassed = currentTime - window.gameStart;
      const sPassed = Math.round(msPassed / 1000);
      const sLeft = Math.round(gameTime / 1000 - sPassed);
      if (sLeft <= 0) {
        gameOver();
        return;
      }
      document.getElementById("timertext").innerHTML = sLeft + "";
    }, 1000);
  }

  // Accessing the inputs
  if (isLetter) {
    if (currentLetter) {
      addClass(currentLetter, key == expected ? "correct" : "incorrect");
      removeClass(currentLetter, "current");
      if ((currentLetter.nextSibling, "current")) {
        addClass(currentLetter.nextSibling, "current");
      }
    }
  }

  if (isSpace) {
    if (expected !== " ") {
      // Selecting the whole word and making the letters red
      const lettersToInvalidate = [
        ...document.querySelectorAll(".word.current .letter:not(.correct)"),
      ];
      lettersToInvalidate.forEach((letter) => {
        addClass(letter, "incorrect");
      });
    }
    removeClass(currentWord, "current");
    addClass(currentWord.nextSibling, "current");
    if (currentLetter) {
      removeClass(currentLetter, "current");
    }
    addClass(currentWord.nextSibling.firstChild, "current");
  }

  if (isBackspace) {
    if (currentLetter && isFirstLetter) {
      removeClass(currentWord, "current");
      addClass(currentWord.previousSibling, "current");
      removeClass(currentLetter, "current");
      addClass(currentWord.previousSibling.lastChild, "current");
      removeClass(currentWord.previousSibling.lastChild, "incorrect");
      removeClass(currentWord.previousSibling.lastChild, "correct");
    }
    if (currentLetter && !isFirstLetter) {
      removeClass(currentLetter, "current");
      addClass(currentLetter.previousSibling, "current");
      removeClass(currentLetter.previousSibling, "incorrect");
      removeClass(currentLetter.previousSibling, "correct");
    }
    if (!currentLetter) {
      addClass(currentWord.lastChild, "current");
    }
  }

  // move lines / words
  if (currentWord.getBoundingClientRect().top > 400) {
    const words = document.getElementById("words");
    const margin = parseInt(words.style.marginTop || "0px");
    words.style.marginTop = margin - 30 + "px";
  }

  // move the cursor
  const nextLetter = document.querySelector(".letter.current");
  const nextWord = document.querySelector(".word.current");
  const cursor = document.getElementById("cursor");
  cursor.style.top =
    (nextLetter || nextWord).getBoundingClientRect().top + -78 + "px";
  console.log((nextLetter || nextWord).getBoundingClientRect().top);
  cursor.style.left =
    (nextLetter || nextWord).getBoundingClientRect()[
      nextLetter ? "left" : "right"
    ] +
    -275 +
    "px";
});

newGame();
