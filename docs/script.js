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
    "C’est l’histoire d’un pingouin…",
    "Quelle est la blague la plus nulle que tu connais ?",
    "Raconte une blague de Toto !",
    "Fais une devinette nulle.",
    "Dis une blague en chantant.",
    "Blague sur un animal.",
    "Blague en rimes."
  ],
  "Défis": [
    "Bois une gorgée sans les mains !",
    "Fais une grimace pendant 10 secondes !",
    "Fais 5 pompes maintenant !",
    "Crie 'J’adore Tap Up' !",
    "Répète 'supercalifragilistic...' 3 fois.",
    "Tiens-toi en équilibre sur un pied 15 sec.",
    "Fais le cri du coq.",
    "Fais semblant d’être un robot 10 sec.",
    "Danse une choré mini 5 sec.",
    "Dis l’alphabet à l’envers (ou essaye)."
  ],
  "Mystère": [
    "Si tu pouvais connaître une seule chose du futur, ce serait quoi ?",
    "Si tu pouvais être un personnage de film, qui serais-tu ?",
    "Quel super-pouvoir aimerais-tu avoir ?",
    "Si tu gagnes 1M€, que fais-tu ?",
    "Quel est ton rêve secret ?",
    "Dis un truc que personne ne sait sur toi.",
    "Tu reviens dans le passé : où et quand ?",
    "Question piège ! Réponds sans réfléchir.",
    "Devine le mot auquel je pense !",
    "Quelle est ta peur la plus bizarre ?"
  ],
  "Dating": [
    "Ton 1er crush ?",
    "Un rencard gênant ?",
    "Ton type idéal ?",
    "Ton date parfait ?",
    "Ton pire message reçu ?",
    "Es-tu romantique ?",
    "As-tu déjà ghosté ?",
    "Ton secret de drague ?",
    "Amour ou amitié ?",
    "Tu tombes amoureux vite ?"
  ],
  "Se connaître": [
    "Ton talent caché ?",
    "Plutôt nuit ou jour ?",
    "Ce que tu détestes le plus ?",
    "Ta plus grande qualité ?",
    "Un truc que tu veux apprendre ?",
    "Tu préfères voyager ou rester chez toi ?",
    "Ton plat préféré ?",
    "Introverti ou extraverti ?",
    "Tu dors tôt ou tard ?",
    "Tu crois au destin ?"
  ],
  "Célibataires": [
    "Pourquoi es-tu encore célib ? 😅",
    "Ton appli de rencontre préférée ?",
    "Ton dernier crush ?",
    "Es-tu difficile en amour ?",
    "1er message idéal ?",
    "Tu crois au coup de foudre ?",
    "Une anecdote gênante en love ?",
    "Tu veux te poser ou pas ?",
    "Tu dragues ou tu fuis ?",
    "Tu te vois en couple bientôt ?"
  ],
  "Famille": [
    "Es-tu proche de ta famille ?",
    "Ton parent préféré ?",
    "Une bêtise d’enfance ?",
    "Qui crie le plus à la maison ?",
    "Tu ressembles à qui ?",
    "Ton plat familial préféré ?",
    "Une tradition chelou chez vous ?",
    "Une anecdote marrante en famille ?",
    "Qui est le plus drôle dans ta famille ?",
    "Tu leur dis tout ou pas ?"
  ]
};

const gages = [
  "Fais 10 squats pendant qu’on te regarde.",
  "Chante une chanson avec un accent bizarre.",
  "Raconte ta pire honte.",
  "Parle comme un robot pendant 1 min.",
  "Danse sur place 15 secondes.",
  "Fais une déclaration d’amour à ton verre.",
  "Fais un compliment exagéré à chaque joueur.",
  "Fais semblant d’avoir gagné à la loterie.",
  "Révèle un de tes secrets.",
  "Appelle un joueur 'chef' pendant 3 tours."
];

let players = JSON.parse(localStorage.getItem('players')) || [];
let category = localStorage.getItem('category');
let scores = {}, turnCount = {}, questionsAsked = [], currentPlayerIndex = 0;
players.forEach(p => { scores[p] = 0; turnCount[p] = 0; });

function updateScores() {
  document.getElementById('scoresContainer').innerHTML =
    `<h3>Scores actuels :</h3>` +
    players.map(p => `<p>${p} : ${scores[p]}</p>`).join('');
}

function nextQuestion() {
  if (players.every(p => turnCount[p] >= 3)) return endGame();

  do {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  } while (turnCount[players[currentPlayerIndex]] >= 3);

  let player = players[currentPlayerIndex];
  let available = categories[category].filter(q => !questionsAsked.includes(q));
  if (!available.length) available = categories[category];
  let question = available[Math.floor(Math.random() * available.length)];
  questionsAsked.push(question);

  document.getElementById('questionContainer').innerHTML = `
    <div class="box-white"><p>🔥 À toi de jouer, <strong>${player}</strong> !</p></div>
    <div class="box-white"><p>${question}</p></div>
    <div class="answer-buttons">
      <button class="btn-success" onclick="answer(true)">✅ Réussi</button>
      <button class="btn-fail" onclick="answer(false)">❌ Échoué</button>
    </div>
  `;
  updateScores();
}

function answer(success) {
  const player = players[currentPlayerIndex];
  if (success) scores[player]++;
  turnCount[player]++;
  nextQuestion();
}

function endGame() {
  const min = Math.min(...Object.values(scores));
  const losers = players.filter(p => scores[p] === min);
  const loser = losers[Math.floor(Math.random() * losers.length)];

  document.getElementById('questionContainer').innerHTML = `
    <div class="box-white"><p>😅 Dommage <strong>${loser}</strong>, tu as perdu !</p></div>
    <div class="box-white"><p>🎭 Clique pour découvrir ton gage :</p></div>
    <div class="answer-buttons">
      <button class="btn-success" onclick="showGage()">🎁 Découvrir le gage</button>
    </div>
    <div style="margin-top:20px;">
      <button class="btn-replay" onclick="window.location.href='game.html'">🔁 Rejouer avec les mêmes joueurs</button>
    </div>
  `;
  updateScores();
}

function showGage() {
  const gage = gages[Math.floor(Math.random() * gages.length)];
  document.getElementById('questionContainer').innerHTML = `
    <div class="box-white"><p>🎁 Ton gage :</p><h2>${gage}</h2></div>
    <div style="margin-top:20px;">
      <button class="btn-replay" onclick="window.location.href='index.html'">🏠 Retour à l’accueil</button>
    </div>
  `;
}

if (window.location.pathname.includes("game.html")) window.onload = nextQuestion;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addPlayer");
  const startBtn = document.getElementById("startGame");

  if (addBtn) {
    addBtn.onclick = () => {
      const container = document.getElementById("playerInputs");
      const input = document.createElement("input");
      input.placeholder = `Joueur ${container.children.length + 1}`;
      container.appendChild(input);
    };
  }

  if (startBtn) {
    startBtn.onclick = () => {
      const players = Array.from(document.querySelectorAll("#playerInputs input"))
        .map(input => input.value.trim()).filter(Boolean);
      const selected = document.querySelector("button.selected");
      const category = selected?.dataset.category;

      if (!category || players.length < 2) {
        alert("Choisis une catégorie et au moins 2 joueurs !");
        return;
      }

      localStorage.setItem("players", JSON.stringify(players));
      localStorage.setItem("category", category);
      window.location.href = "game.html";
    };
  }

  document.querySelectorAll("#categories button")?.forEach(button => {
    button.onclick = () => {
      document.querySelectorAll("#categories button").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
    };
  });
});
