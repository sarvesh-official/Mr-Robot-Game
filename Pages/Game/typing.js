// Generating Random Words
const words =
  "In today's fast-paced digital world effective communication is key Whether you sending a quick message to a colleague or crafting a lengthy report the ability to express your thoughts clearly and concisely is a valuable skill With an average typing speed of 50 words per minute you can efficiently convey your ideas respond to emails and create content with ease Practice and improve your typing speed and you'll find yourself navigating the digital landscape with increased efficiency and confidence".split(
    " "
  );

const wordsCount = words.length;

function randomWord() {
  const randomIndex = Math.ceil(Math.random() * wordsCount);
  return words[randomIndex - 1];
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

// New Game
function newGame() {
  document.getElementById("words").innerHTML = "";
  for (let i = 0; i < 200; i++) {
    document.getElementById("words").innerHTML += formatWord(randomWord());
  }
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
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

  console.log({ key, expected });

  if (isLetter) {
    if (currentLetter) {
      addClass(currentLetter, key == expected ? "correct" : "incorrect");
      removeClass(currentLetter, "current");
      if ((currentLetter.nextSibling, "current")) {
        addClass(currentLetter.nextSibling, "current");
      }
    }
    // If extra letters are entered by the user it is counted as extra
    else {
      const incorrectLetter = document.createElement("span");
      incorrectLetter.innerHTML = key;
      incorrectLetter.className = "letter incorrect extra";
      currentWord.append(incorrectLetter);
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

  // move the cursor
  const nextLetter = document.querySelector(".letter.current");
  const cursor = document.getElementById("cursor");
  if (nextLetter) {
    cursor.style.top = nextLetter.getBoundingClientRect().top;
    cursor.style.left = nextLetter.getBoundingClientRect().left;
  }
});

newGame();
