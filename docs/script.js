const categories = {
  "Culture Générale": [
    "Quel est le plus long fleuve du monde ?",
    "En quelle année a eu lieu la Révolution française ?",
    "Qui a peint La Joconde ?",
    "Quelle est la capitale de l’Australie ?",
    "Combien de continents sur Terre ?",
    "Quel pays a inventé les JO ?",
    "Qui a écrit 'Le Petit Prince' ?",
    "Quelle planète est la plus proche du soleil ?",
    "Combien de zéros dans un milliard ?",
    "Quelle est la langue la plus parlée au monde ?"
  ],
  "Humour": [
    "Fais une imitation drôle !",
    "Raconte une blague nulle.",
    "Fais rire ton voisin.",
    "Invente une blague absurde.",
    "Fais une pub bidon pour un objet.",
    "Répète une phrase avec l’accent.",
    "Fais le bruit d’un animal.",
    "Fais une grimace 5 sec.",
    "Imite un prof en colère.",
    "Fais le rire le plus bizarre possible."
  ],
  "Blagues": [
    "Pourquoi les plongeurs plongent-ils toujours en arrière ?",
    "Quelle est la différence entre un pigeon ?",
    "Pourquoi le poulet a traversé la route ?",
    "Que dit une tomate à une autre ?",
    "Blague Carambar !",
    "Quelle est la blague la plus courte ?",
    "Blague sur les blondes (gentille) !",
    "Blague absurde en 1 ligne ?",
    "Blague de Toto !",
    "Fais deviner une devinette."
  ],
  "Défis": [
    "Fais 10 squats maintenant !",
    "Danse sans musique 10 sec.",
    "Répète l’alphabet à l’envers.",
    "Fais un selfie ridicule.",
    "Fais 5 pompes !",
    "Répète une phrase avec la bouche pleine (imaginaire).",
    "Touche ton nez avec ta langue.",
    "Mets-toi debout et tourne 3 fois.",
    "Fais une chanson avec 1 mot.",
    "Reste sérieux pendant 20 secondes malgré les rires."
  ],
  "Mystère": [
    "Si tu avais un super pouvoir ?",
    "Quelle est ta plus grande peur ?",
    "Que ferais-tu si tu gagnais 1 million ?",
    "Si tu pouvais changer de prénom ?",
    "Si tu étais un animal ?",
    "Invente un nouveau mot.",
    "Si tu étais célèbre, pour quoi ?",
    "Ta pire honte ?",
    "Si tu devais vivre ailleurs ?",
    "Quel secret peux-tu révéler ?"
  ]
};

const gages = [
  "Fais une déclaration d’amour à une chaise.",
  "Répète 'Tap Up forever' en chantant.",
  "Tourne sur toi-même en criant ton prénom.",
  "Mange un aliment imaginaire en mimant.",
  "Fais 15 squats en silence.",
  "Fais le cri d’un animal pendant 10 sec.",
  "Fais semblant d’être une star devant les autres.",
  "Fais des pompes ou mime-les.",
  "Répète tout ce qu’on dit pendant 1 min.",
  "Montre une danse chelou."
];

let selectedCategory = "";
let usedQuestions = [];
let players = [];
let scores = {};
let turnCount = {};
let currentPlayerIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const catButtons = document.querySelectorAll("#categories button");
  catButtons.forEach(btn => {
    btn.onclick = () => {
      selectedCategory = btn.dataset.category;
      catButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
  });

  const addBtn = document.getElementById("addPlayer");
  if (addBtn) {
    addBtn.onclick = () => {
      const container = document.getElementById("playerInputs");
      const input = document.createElement("input");
      input.placeholder = `Joueur ${container.children.length + 1}`;
      container.appendChild(input);
    };
  }

  const startBtn = document.getElementById("startGame");
  if (startBtn) {
    startBtn.onclick = () => {
      const inputs = document.querySelectorAll("#playerInputs input");
      players = Array.from(inputs).map(i => i.value.trim()).filter(Boolean);
      if (!selectedCategory || players.length < 2) {
        alert("Choisis une catégorie et au moins 2 joueurs !");
        return;
      }
      localStorage.setItem("players", JSON.stringify(players));
      localStorage.setItem("category", selectedCategory);
      window.location.href = "game.html";
    };
  }

  if (window.location.pathname.includes("game.html")) {
    players = JSON.parse(localStorage.getItem("players"));
    selectedCategory = localStorage.getItem("category");
    players.forEach(p => {
      scores[p] = 0;
      turnCount[p] = 0;
    });
    nextTurn();
  }
});

function updateScores() {
  const div = document.getElementById("scoresContainer");
  div.innerHTML = "<h3>Scores actuels :</h3>" + players.map(p => `<p>${p} : ${scores[p]}</p>`).join("");
}

function nextTurn() {
  if (players.every(p => turnCount[p] >= 3)) return endGame();
  let player = players[currentPlayerIndex];
  if (turnCount[player] >= 3) {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    return nextTurn();
  }

  let list = categories[selectedCategory].filter(q => !usedQuestions.includes(q));
  let question = list[Math.floor(Math.random() * list.length)];
  usedQuestions.push(question);

  const box = document.getElementById("questionContainer");
  box.innerHTML = `
    <p>🔥 À toi de jouer, <strong>${player}</strong> !</p>
    <p><strong>${question}</strong></p>
    <button class="success-btn" onclick="validate(true)">✅ Réussi</button>
    <button class="fail-btn" onclick="validate(false)">❌ Échoué</button>
  `;
  updateScores();
}

function validate(success) {
  let player = players[currentPlayerIndex];
  if (success) scores[player]++;
  turnCount[player]++;
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  nextTurn();
}

function endGame() {
  let min = Math.min(...Object.values(scores));
  let losers = players.filter(p => scores[p] === min);
  let loser = losers[Math.floor(Math.random() * losers.length)];
  const box = document.getElementById("questionContainer");
  box.innerHTML = `
    <p>😅 <strong>Dommage ${loser}</strong>, tu as perdu !</p>
    <p>🎭 Clique pour découvrir ton gage :</p>
    <button onclick="showGage()" class="success-btn">🎁 Découvrir le gage</button>
  `;
}

function showGage() {
  const gage = gages[Math.floor(Math.random() * gages.length)];
  document.getElementById("questionContainer").innerHTML = `
    <p class="gage-text">🎁 Ton gage :</p>
    <p class="gage-text"><strong>${gage}</strong></p>
    <button onclick="window.location.href='index.html'" class="fail-btn">🔁 Rejouer</button>
  `;
}
