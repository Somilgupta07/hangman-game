const words = [
  "python",
  "zephyr",
  "jigsaw",
  "laptop",
  "voyage",
  "wizard",
  "oxygen",
  "galaxy",
  "breeze",
  "knight",
  "cipher",
  "quartz",
  "unicorn",
  "mystic",
  "nebula",
  "glitch",
  "rhythm",
  "whisky",
  "eclipse",
  "banter",
  "cactus",
  "falcon",
  "hazard",
  "jumble",
  "luxury",
  "marvel",
  "plasma",
  "rocket",
  "tundra",
  "vertex",
  "wander",
  "yellow",
  "zenith",
];
let selectedWord = "";
let correctGuesses = [];
let wrongGuesses = 0;
let wins = 0;
let losses = 0;

const wordDisplay = document.getElementById("word");
const letterButtons = document.getElementById("letters");
const wrongCount = document.getElementById("wrong-count");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");
const hangmanImg = document.getElementById("hangman-img");
const winCount = document.getElementById("win-count");
const lossCount = document.getElementById("loss-count");

const soundCorrect = new Audio("sounds/correct.wav");
const soundWin = new Audio("sounds/win.wav");
const soundLose = new Audio("sounds/lose.wav");

function createLetterButtons() {
  letterButtons.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    btn.addEventListener("click", () =>
      guessLetter(btn.textContent.toLowerCase())
    );
    letterButtons.appendChild(btn);
  }
}

function chooseWord() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctGuesses = [];
  wrongGuesses = 0;
  wrongCount.textContent = wrongGuesses;
  message.textContent = "";
  hangmanImg.src = `images/hangman0.png`;
  updateWordDisplay();
}

function updateWordDisplay() {
  wordDisplay.textContent = selectedWord
    .split("")
    .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
    .join(" ");
}

function guessLetter(letter) {
  document.querySelectorAll("#letters button").forEach((btn) => {
    if (btn.textContent.toLowerCase() === letter) btn.disabled = true;
  });

  if (selectedWord.includes(letter)) {
    if (!correctGuesses.includes(letter)) {
      correctGuesses.push(letter);
      updateWordDisplay();
      soundCorrect.play();
    }

    if (!selectedWord.split("").some((l) => !correctGuesses.includes(l))) {
      message.textContent = "🎉 You Win!";
      soundWin.play();
      wins++;
      winCount.textContent = wins;
      disableAllButtons();
    }
  } else {
    wrongGuesses++;
    wrongCount.textContent = wrongGuesses;
    hangmanImg.src = `images/hangman${wrongGuesses}.png`;

    if (wrongGuesses >= 6) {
      message.textContent = `💀 You Lost! Word was "${selectedWord}"`;
      soundLose.play();
      losses++;
      lossCount.textContent = losses;
      disableAllButtons();
    }
  }
}

function disableAllButtons() {
  document
    .querySelectorAll("#letters button")
    .forEach((btn) => (btn.disabled = true));
}

restartBtn.addEventListener("click", () => {
  createLetterButtons();
  chooseWord();
});

// Start game
createLetterButtons();
chooseWord();
