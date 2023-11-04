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

// Formatting the Words

function formatWord(word) {
  // span tag is opened twice because the first letter has only closing tag
  return `<div class="word">
            <span class="letter">${word
              .split("")
              .join('</span><span class="letter">')}
              </span>
              </div>`;
}
// New Game
function newGame() {
  document.getElementById("words").innerHTML = "";
  for (let i = 0; i < 200; i++) {
    document.getElementById("words").innerHTML += formatWord(randomWord());
  }
}
newGame();
