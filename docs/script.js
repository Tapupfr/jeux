const Categories = {
  "Culture Générale": [
    "Quel est le plus grand océan du monde ?",
    "Combien de pays y a-t-il dans l'Union européenne ?",
    "Quel pays a pour capitale Canberra ?",
    "Quelle planète est surnommée la planète rouge ?"
  ],
  "Humour": [
    "Imite un animal jusqu'à ce qu'on devine lequel.",
    "Fais semblant de rire comme un super-vilain.",
    "Imite ton voisin pendant 10 secondes."
  ],
  "Blagues": [
    "Pourquoi les plongeurs plongent-ils en arrière ?",
    "Quel est le comble pour un jardinier ?"
  ],
  "Défis": [
    "Danse sans musique pendant 20 secondes.",
    "Chante l'alphabet à l'envers."
  ],
  "Mystère": [
    "Quel est ton rêve le plus secret ?",
    "Quel est ton secret en cuisine ?"
  ],
  "Dating": [
    "Quelle est ta date idéale ?",
    "As-tu déjà eu un coup de foudre ?"
  ],
  "Se connaître": [
    "Quelle est ta passion cachée ?",
    "Quel est ton talent secret ?"
  ],
  "Célibataires": [
    "Es-tu prêt à te marier ?",
    "Quelle est ta pire expérience de date ?"
  ],
  "Famille": [
    "Qui est le plus drôle dans la famille ?",
    "Quelle est ta tradition familiale préférée ?"
  ]
};

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

// Sélection interactive des catégories
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentCategory = button.dataset.category;
    categoryButtons.forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
  });
});

// Démarrage du jeu
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

// Sélection d'une question aléatoire sans répétition
function pickRandomQuestion() {
  const availableQuestions = Categories[currentCategory].filter(q => !questionsAsked.includes(q));
  if (availableQuestions.length === 0) {
    return null;
  }
  const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  questionsAsked.push(question);
  return question;
}

// Affichage de la question suivante
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

  gsap.from("#questionContainer", { opacity: 0, scale: 0.7, duration: 0.5, ease: "back.out(1.7)" });

  document.getElementById("success").onclick = () => answerQuestion(player, true);
  document.getElementById("fail").onclick = () => answerQuestion(player, false);
}

// Gestion de la réponse
function answerQuestion(player, succeeded) {
  if (succeeded) scores[player] += 1;
  turnCount[player] += 1;

  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  showNextQuestion();
}

// Fin du jeu
function endGame() {
  const minScore = Math.min(...Object.values(scores));
  const losers = players.filter(player => scores[player] === minScore);
  const loser = losers[Math.floor(Math.random() * losers.length)];

  questionBox.innerHTML = `
    <div class="loser-announcement">😅 Dommage ${loser}, tu es notre grand perdant !</div>
    <button id="showGage">🎭 Découvrir mon gage</button>
  `;

  gsap.from(".loser-announcement", { scale: 0, opacity: 0, duration: 1, ease: "elastic.out(1, 0.3)" });

  document.getElementById("showGage").onclick = showGage;
}

// Affichage du gage
function showGage() {
  const gages = [
    "Fais 10 pompes ! 💪",
    "Imite une célébrité pendant 30 secondes. 🎤",
    "Chante un refrain de ton choix. 🎶",
    "Danse comme un robot pendant 20 secondes. 🤖"
  ];
  const randomGage = gages[Math.floor(Math.random() * gages.length)];
  
  questionBox.innerHTML = `
    <div class="gage">${randomGage}</div>
    <button id="replay">🔄 Rejouer</button>
  `;

  gsap.from(".gage", { rotationX: -90, duration: 1, ease: "bounce.out" });

  document.getElementById("replay").onclick = () => location.reload();
}

// Permet d'utiliser la touche Entrée pour passer à la question suivante
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && questionBox.style.display === "block") {
    showNextQuestion();
  }
});
