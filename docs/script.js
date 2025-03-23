// script.js

const Categories = {
  "Culture Générale": [
    "Quel est le plus grand océan du monde ?",
    "Combien de pays y a-t-il dans l'Union européenne ?",
    "Quel pays a pour capitale Canberra ?",
    ...Array.from({ length: 97 }, (_, i) => `Question Culture Générale #${i + 4}`)
  ],
  "Humour": [
    "Imite un animal jusqu'à ce qu'on devine lequel.",
    "Fais semblant de rire comme un super-vilain.",
    ...Array.from({ length: 98 }, (_, i) => `Question Humour #${i + 3}`)
  ],
  "Blagues": [
    "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?",
    "Quel est le comble pour un jardinier ?",
    ...Array.from({ length: 98 }, (_, i) => `Question Blague #${i + 3}`)
  ],
  "Défis": [
    "Danse sans musique pendant 20 secondes.",
    "Chante l'alphabet à l'envers.",
    ...Array.from({ length: 98 }, (_, i) => `Défi #${i + 3}`)
  ],
  "Mystère": [
    "Quel est ton rêve le plus secret ?",
    "Quel est ton secret de cuisine ?",
    ...Array.from({ length: 98 }, (_, i) => `Question Mystère #${i + 3}`)
  ],
  "Dating": [
    "Quelle est ta date idéale ?",
    "As-tu déjà eu un coup de foudre ?",
    ...Array.from({ length: 98 }, (_, i) => `Question Dating #${i + 3}`)
  ],
  "Se connaître": [
    "Quelle est ta passion cachée ?",
    "Quel est ton talent secret ?",
    ...Array.from({ length: 98 }, (_, i) => `Question Se connaître #${i + 3}`)
  ],
  "Célibataires": [
    "Es-tu prêt à te marier ?",
    "Quelle est ta pire expérience de date ?",
    ...Array.from({ length: 98 }, (_, i) => `Question Célibataire #${i + 3}`)
  ],
  "Famille": [
    "Qui est le plus drôle dans la famille ?",
    "Quelle est ta tradition familiale préférée ?",
    ...Array.from({ length: 98 }, (_, i) => `Question Famille #${i + 3}`)
  ]
};

let currentCategory = null;
let players = [];
let currentPlayerIndex = 0;
let questionsAsked = 0;

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
  players = Array.from(inputs).map(input => input.value).filter(name => name.trim() !== "");
  if (!currentCategory || players.length === 0) {
    alert("Choisissez une catégorie et entrez au moins un joueur.");
    return;
  }
  questionsAsked = 0;
  currentPlayerIndex = 0;
  questionBox.style.display = "block";
  showNextQuestion();
});

function showNextQuestion() {
  if (questionsAsked >= players.length * 3) {
    questionBox.innerHTML = `Fin de partie 🎉<br>Merci d'avoir joué !`;
    return;
  }
  const player = players[currentPlayerIndex];
  const questions = Categories[currentCategory];
  const question = questions[Math.floor(Math.random() * questions.length)];
  questionBox.innerHTML = `<strong>${player} :</strong> ${question}`;
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  questionsAsked++;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && questionBox.style.display === "block") {
    showNextQuestion();
  }
});
