// assets/script.js

const categories = {
  "Culture Générale": [
    "Quelle est la capitale du Canada ?",
    "Combien de continents existe-t-il ?",
    "Quel est le plus long fleuve du monde ?",
    "Qui a peint la Joconde ?",
    "En quelle année a eu lieu la révolution française ?"
  ],
  "Humour": [
    "Raconte une blague sur les animaux.",
    "Fais une grimace jusqu'à ce que tout le monde rigole.",
    "Imite un personnage de dessin animé.",
    "Dis une phrase en inventant un mot.",
    "Parle comme un robot pendant 1 minute."
  ],
  "Blagues": [
    "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau !",
    "C'est l'histoire d'un poisson. Il n'a pas de blague. Poisson suivant !",
    "Quel est le comble pour un électricien ? De ne pas être au courant !",
    "Pourquoi les canards sont toujours à l'heure ? Parce qu'ils sont dans l'étang !",
    "Que dit une imprimante à une autre ? T'as de beaux yeux, tu sais."
  ],
  "Défis": [
    "Fais 10 pompes maintenant !",
    "Parle sans utiliser la lettre "e" pendant 1 minute.",
    "Danse sans musique pendant 20 secondes.",
    "Appelle quelqu'un et chante-lui Joyeux Anniversaire !",
    "Récite l'alphabet à l'envers."
  ],
  "Mystère": [
    "Quel est ton plus grand secret inavoué ?",
    "Quel est le dernier message que tu as envoyé ?",
    "Avoue quelque chose que tu n'as jamais dit à personne.",
    "Quelle est la plus grosse bêtiserie que tu aies faite enfant ?",
    "Qui est ton crush secret ?"
  ],
  "Dating": [
    "Qu'est-ce que tu recherches chez une personne ?",
    "Ta meilleure qualité en amour ?",
    "Ton péché mignon romantique ?",
    "Quelle est ta date idéale ?",
    "Quelle est la chose la plus folle que tu ferais par amour ?"
  ],
  "Se connaître": [
    "Quelle est ta plus grande fierté ?",
    "Quelle chanson te représente le mieux ?",
    "Si tu étais un animal, lequel serais-tu ?",
    "Ta plus grande peur ?",
    "Un rêve que tu veux réaliser ?"
  ],
  "Célibataires": [
    "Pourquoi es-tu encore célibataire ?",
    "Quel est ton pire rencard ?",
    "Tu es plutôt dating apps ou réel ?",
    "Ton dernier crush c'était qui ?",
    "Tu préfères flirter ou t'engager ?"
  ]
};

const gages = [
  "Fais 20 squats maintenant !",
  "Chante une chanson choisie par les autres.",
  "Fais le tour de la pièce en rampant.",
  "Change ton accent pour le reste de la partie.",
  "Publie une story avec une grimace."
];

const categoryButtons = document.querySelectorAll('#categories button');
const playerContainer = document.getElementById('players');
const addPlayerBtn = document.getElementById('add-player');
const startBtn = document.getElementById('start');
const questionContainer = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const nextBtn = document.getElementById('next');
const loserGage = document.getElementById('loser-gage');
const loserMessage = document.getElementById('loser-message');
const gageBtn = document.getElementById('show-gage');
const gageText = document.getElementById('gage-text');

let currentCategory = null;
let questions = [];
let players = [];
let currentIndex = 0;

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.category;
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

addPlayerBtn.addEventListener('click', () => {
  if (playerContainer.children.length >= 15) return;
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = `Joueur ${playerContainer.children.length + 1}`;
  playerContainer.appendChild(input);
});

startBtn.addEventListener('click', () => {
  if (!currentCategory) return alert("Choisis une catégorie");

  players = [...playerContainer.querySelectorAll('input')]
    .map(input => input.value.trim())
    .filter(Boolean);

  if (players.length < 2) return alert("Ajoute au moins 2 joueurs");

  questions = [...categories[currentCategory]];
  shuffle(questions);
  currentIndex = 0;
  questionEl.textContent = questions[currentIndex];
  questionContainer.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= questions.length) {
    const loser = players[Math.floor(Math.random() * players.length)];
    loserMessage.textContent = `😅 Dommage ${loser}, tu es notre grand perdant !`;
    loserGage.classList.remove('hidden');
  } else {
    questionEl.textContent = questions[currentIndex];
  }
});

gageBtn.addEventListener('click', () => {
  const gage = gages[Math.floor(Math.random() * gages.length)];
  gageText.textContent = gage;
  gageText.classList.remove('hidden');
});

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
