const Categories = {
  "Culture Générale": Array.from({ length: 100 }, (_, i) => `Question Culture Générale #${i + 1}`),
  "Humour": Array.from({ length: 100 }, (_, i) => `Question Humour #${i + 1}`),
  "Blagues": Array.from({ length: 100 }, (_, i) => `Question Blague #${i + 1}`),
  "Défis": Array.from({ length: 100 }, (_, i) => `Défi #${i + 1}`),
  "Mystère": Array.from({ length: 100 }, (_, i) => `Question Mystère #${i + 1}`),
  "Dating": Array.from({ length: 100 }, (_, i) => `Question Dating #${i + 1}`),
  "Se connaître": Array.from({ length: 100 }, (_, i) => `Question Se connaître #${i + 1}`),
  "Célibataires": Array.from({ length: 100 }, (_, i) => `Question Célibataire #${i + 1}`),
  "Famille": Array.from({ length: 100 }, (_, i) => `Question Famille #${i + 1}`)
};

const Gages = Array.from({ length: 100 }, (_, i) => `Gage #${i + 1}`);

let currentCategory = null;
let players = [];
let scores = {};
let questionsAsked = [];
let currentPlayerIndex = 0;
let turnCount = {};

const questionBox = document.getElementById("questionContainer");
const startButton = document.getElementById("startGame");
const inputs = document.querySelectorAll(".player-inputs input");
const categoryButtons = document.querySelectorAll("#categories button");

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentCategory = button.dataset.category;
    categoryButtons.forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
  });
});

startButton.addEventListener("click", () => {
  players = Array.from(inputs)
    .map(input => input.value.trim())
    .filter(name => name !== "");

  if (!currentCategory || players.length === 0) {
    alert("Choisissez une catégorie et entrez au moins un joueur.");
    return;
  }

  players.forEach(player => {
    scores[player] = 0;
    turnCount[player] = 0;
  });

  questionsAsked = [];
  currentPlayerIndex = 0;
  questionBox.style.display = "block";
  showNextQuestion();
});

function pickRandomQuestion() {
  const availableQuestions = Categories[currentCategory].filter(q => !questionsAsked.includes(q));
  if (availableQuestions.length === 0) return null;
  const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  questionsAsked.push(question);
  return question;
}

function showNextQuestion() {
  if (players.every(player => turnCount[player] >= 3)) {
    endGame();
    return;
  }

  const player = players[currentPlayerIndex];
  if (turnCount[player] >= 3) {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    showNextQuestion();
    return;
  }

  const question = pickRandomQuestion();
  if (!question) {
    questionBox.innerHTML = "Plus de questions disponibles dans cette catégorie !";
    return;
  }

  questionBox.innerHTML = `
    <div class="player-highlight">🔥 À toi de jouer, ${player} !</div>
    <div class="question-text">${question}</div>
    <button id="success">✅ Réussi</button>
    <button id="fail">❌ Échoué</button>
  `;

  document.getElementById("success").onclick = () => answerQuestion(player, true);
  document.getElementById("fail").onclick = () => answerQuestion(player, false);
}

function answerQuestion(player, succeeded) {
  if (succeeded) scores[player] += 1;
  turnCount[player] += 1;

  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  showNextQuestion();
}

function endGame() {
  const minScore = Math.min(...Object.values(scores));
  const losers = players.filter(player => scores[player] === minScore);
  const loser = losers[Math.floor(Math.random() * losers.length)];

  questionBox.innerHTML = `
    <div class="loser-announcement">😅 Dommage ${loser}, tu es notre grand perdant !</div>
    <button id="showGage">🎭 Découvrir mon gage</button>
  `;

  document.getElementById("showGage").onclick = showGage;
}

function showGage() {
  const randomGage = Gages[Math.floor(Math.random() * Gages.length)];

  questionBox.innerHTML = `
    <div class="gage">${randomGage}</div>
    <button id="replay">🔄 Rejouer</button>
  `;

  document.getElementById("replay").onclick = () => location.reload();
}
