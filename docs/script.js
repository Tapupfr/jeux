const players = JSON.parse(localStorage.getItem("players"));
const category = localStorage.getItem("category");

const Questions = {
  "Culture Générale": [
    "Quel est le plus long fleuve du monde ?",
    "En quelle année a eu lieu la Révolution française ?",
    "Quel pays a inventé les Jeux Olympiques ?",
    "Quelle est la capitale de l’Australie ?",
    "Combien y a-t-il de continents ?",
    "Qui a peint La Joconde ?",
    "Quel est l’élément chimique de symbole O ?",
    "Qui a écrit 'Les Misérables' ?",
    "Dans quel pays se trouve la ville de Marrakech ?",
    "Combien de planètes composent le système solaire ?"
  ],
  "Humour": [
    "Raconte ta meilleure blague !",
    "Fais une imitation drôle de ton voisin.",
    "Fais un rire démoniaque pendant 5 secondes.",
    "Invente un nouveau mot et donne sa définition.",
    "Fais une voix de bébé pendant une phrase.",
    "Fais une blague sur les légumes.",
    "Raconte une blague nulle mais drôle.",
    "Dis 3 jeux de mots pourris.",
    "Imite quelqu’un qui perd à Tap Up.",
    "Fais une pub bidon pour un produit imaginaire."
  ],
  // ... (renseigne les autres catégories ici)
};

const Gages = [
  "Fais 10 squats pendant qu’on te regarde.",
  "Chante une chanson au hasard devant tout le monde.",
  "Fais une déclaration d'amour à une chaise.",
  "Répète 'Tap Up est le meilleur' 5 fois avec passion.",
  "Fais une pose de mannequin pendant 15 secondes.",
  "Danse sans musique pendant 20 secondes.",
  "Imite une célébrité jusqu'à ce qu’on devine.",
  "Dis une phrase romantique en criant.",
  "Fais un animal en mime.",
  "Tourne sur toi-même et dis l’alphabet à l’envers."
];

let scores = {};
let turnCount = {};
let currentPlayerIndex = 0;
let questionsAsked = [];

players.forEach(p => {
  scores[p] = 0;
  turnCount[p] = 0;
});

function updateScores() {
  const scoreDiv = document.getElementById("scoresContainer");
  scoreDiv.innerHTML = `<h3>Scores actuels :</h3>`;
  players.forEach(p => {
    scoreDiv.innerHTML += `<p>${p} : ${scores[p]}</p>`;
  });
}

function nextQuestion() {
  if (players.every(p => turnCount[p] >= 3)) return endGame();

  let player = players[currentPlayerIndex];
  if (turnCount[player] >= 3) {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    return nextQuestion();
  }

  let possibleQuestions = Questions[category].filter(q => !questionsAsked.includes(q));
  if (possibleQuestions.length === 0) return endGame();

  let question = possibleQuestions[Math.floor(Math.random() * possibleQuestions.length)];
  questionsAsked.push(question);

  const qBox = document.getElementById("questionContainer");
  qBox.innerHTML = `
    <p>🔥 À toi de jouer, <strong>${player}</strong> !</p>
    <p class="question-text">${question}</p>
    <button class="success-btn" onclick="answer(true)">✅ Réussi</button>
    <button class="fail-btn" onclick="answer(false)">❌ Échoué</button>
  `;

  updateScores();
}

function answer(success) {
  let player = players[currentPlayerIndex];
  if (success) scores[player]++;
  turnCount[player]++;
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  nextQuestion();
}

function endGame() {
  let min = Math.min(...Object.values(scores));
  let losers = players.filter(p => scores[p] === min);
  let loser = losers[Math.floor(Math.random() * losers.length)];
  let gage = Gages[Math.floor(Math.random() * Gages.length)];

  const qBox = document.getElementById("questionContainer");
  qBox.innerHTML = `
    <p class="end-title">😅 Dommage <strong>${loser}</strong>, tu as perdu !</p>
    <p class="end-sub">🎭 Clique pour découvrir ton gage :</p>
    <button class="success-btn" onclick="revealGage('${gage}')">🎁 Découvrir le gage</button>
  `;

  updateScores();
}

function revealGage(gage) {
  const qBox = document.getElementById("questionContainer");
  qBox.innerHTML = `
    <p class="gage-text">🎭 Ton gage :</p>
    <p class="gage-text"><strong>${gage}</strong></p>
    <button class="fail-btn" onclick="location.href='index.html'">🔁 Rejouer</button>
  `;
}

window.onload = nextQuestion;
