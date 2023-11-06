// Playing Audio
// document.addEventListener("DOMContentLoaded", function () {
//   let bgAudio = new Audio("../../Assets/The Archive.mp3");
//   bgAudio.play();
//   bgAudio.loop = true;
//   bgAudio.volume = 1;
// });
// Generating Random Words
const words =
  "sometimes your reality is a reflection of what you believe If youre sure of something  it can become true by mr robot".split(
    " "
  );

const wordsCount = words.length;
const gameTime = 30 * 1000;
let wordIndex = 0;

window.timer = null;
window.gameStart = null;

function randomWord() {
  if (wordIndex < wordsCount) {
    const currentWord = words[wordIndex];
    wordIndex++;
    return currentWord;
  }
  return "";
}

// Adding classname to current elements
function addClass(el, name) {
  el.className += " " + name;
}
// Removing classname to current elements

function removeClass(el, name) {
  el.className = el.className.replace(name, "");
}

// Formatting the Words

function formatWord(word) {
  let formattedWord = "<div class='word'>";

  word.split("").forEach((letter) => {
    formattedWord += `<span class="letter">${letter}</span>`;
  });

  formattedWord += "</div>";
  return formattedWord;
}
// Testing
// function formatWord(word) {
//   let formattedWord = `<div class="word">`;
//   word.split("").forEach((letter) => {
//     formattedWord += `<span class="letter">${letter}</span>`;
//   });
//   formattedWord += `</div>`;
//   return formattedWord;
// }

// Getting Result
function displayResult() {
  const words = [...document.querySelectorAll(".word")];
  const lastTypedWord = document.querySelector(".word.current");
  const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
  const typedWords = words.slice(0, lastTypedWordIndex);

  const incorrectLetters = typedWords.flatMap((word) =>
    [...word.children].filter((letter) =>
      letter.className.includes("incorrect")
    )
  );

  if (incorrectLetters.length === 0) {
    // Redirect to the "won" page if there are no incorrect letters and all words are typed
    window.location.href = "../Result/StoryResult1.html";
  } else {
    // Redirect to the "lose" page
    window.location.href = "../Result/Loose.html    ";
  }
}

// Game over
function gameOver() {
  clearInterval(window.timer);
  addClass(document.getElementById("game"), "over");
  displayResult();
}

// New Game
function newGame() {
  document.getElementById("words").innerHTML = "";
  for (let i = 0; i < 200; i++) {
    document.getElementById("words").innerHTML += formatWord(randomWord());
  }
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
  document;
  getElementById("timertext").innerHTML = gameTime / 1000;
  window.timer = null;
}

// Listening to Keys

document.getElementById("game").addEventListener("keyup", (ev) => {
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
  if (!window.timer && isLetter) {
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
    // If extra letters are entered by the user it is counted as extra
    // else {
    //   const incorrectLetter = document.createElement("span");
    //   incorrectLetter.innerHTML = key;
    //   incorrectLetter.className = "letter incorrect extra";
    //   currentWord.append(incorrectLetter);
    // }
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
    // if (isExtra) {
    //   currentWord.removeChild(isExtra);
    // }
  }

  // move lines / words
  // if (currentWord.getBoundingClientRect().top > 400) {
  //   const words = document.getElementById("words");
  //   const margin = parseInt(words.style.marginTop || "0px");
  //   words.style.marginTop = margin - 30 + "px";
  // }

  // move the cursor
  const nextLetter = document.querySelector(".letter.current");
  const nextWord = document.querySelector(".word.current");
  const cursor = document.getElementById("cursor");
  cursor.style.top =
    (nextLetter || nextWord).getBoundingClientRect().top + -78 + "px";
  cursor.style.left =
    (nextLetter || nextWord).getBoundingClientRect()[
      nextLetter ? "left" : "right"
    ] +
    -275 +
    "px";
});

newGame();
