const wrongEl = document.getElementById("wrong");
const wordEl = document.getElementById("word");
const popup = document.getElementById("popup-container");
const final = document.getElementById("final");
const playBtn = document.getElementById("play");
const notification = document.getElementById("notification-container");
const figurePart = document.querySelectorAll(".figure-part");

// varibles
const words = ["application", "programming", "study", "book", "walk"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// Correct and wrong array
const correctLetter = [];
const wrongLetter = [];

// Functions
// Show Notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
// update wrong letter
function updateWrongLetters() {
  wrongEl.innerHTML = `
  ${wrongLetter.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetter.map((letter) => `<span>${letter}</span>`)}
  `;

  figurePart.forEach((part, index) => {
    if (index < wrongLetter.length) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  if (figurePart.length === wrongLetter.length) {
    final.innerText = "Unfortunately You lost";
    popup.style.display = "grid";
  }
}
// Click letters
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    let letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetter.includes(letter)) {
        if (figurePart.length === wrongLetter.length) {
          return false;
        } else {
          correctLetter.push(letter);
          displayWord();
        }
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetter.includes(letter)) {
        if (figurePart.length === wrongLetter.length) {
          return false;
        } else {
          wrongLetter.push(letter);
          updateWrongLetters();
        }
      } else {
        showNotification();
      }
    }
  }
});
// Display Word
function displayWord() {
  wordEl.innerHTML = `
${selectedWord
  .split("")
  .map(
    (letter) => `
    <span class="letter">
    ${correctLetter.includes(letter) ? letter : ""}
    </span>
    `
  )
  .join("")}
`;
  let innerWord = wordEl.innerText.replace(/\n/g, "");
  console.log(innerWord);

  if (selectedWord === innerWord) {
    final.innerText = "Congratulation You won";
    popup.style.display = "grid";
  }
}
// Play
playBtn.addEventListener("click", () => {
  correctLetter.length = 0;
  wrongLetter.length = 0;
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetters();
  popup.style.display = "none";
});
// Calls functions
displayWord();
