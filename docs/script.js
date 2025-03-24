// script.js complet pour la première page (index.html)

const Categories = {
  "Culture Générale": Array.from({ length: 10 }, (_, i) => `Question Culture Générale #${i + 1}`),
  "Humour": Array.from({ length: 10 }, (_, i) => `Question Humour #${i + 1}`),
  "Blagues": Array.from({ length: 10 }, (_, i) => `Question Blague #${i + 1}`),
  "Défis": Array.from({ length: 10 }, (_, i) => `Défi #${i + 1}`),
  "Mystère": Array.from({ length: 10 }, (_, i) => `Question Mystère #${i + 1}`),
  "Dating": Array.from({ length: 10 }, (_, i) => `Question Dating #${i + 1}`),
  "Se connaître": Array.from({ length: 10 }, (_, i) => `Question Se connaître #${i + 1}`),
  "Célibataires": Array.from({ length: 10 }, (_, i) => `Question Célibataire #${i + 1}`),
  "Famille": Array.from({ length: 10 }, (_, i) => `Question Famille #${i + 1}`)
};

// Gestion des boutons de catégories
const categoryButtons = document.querySelectorAll("#categories button");
let currentCategory = null;

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentCategory = button.dataset.category;
    categoryButtons.forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
  });
});

// Démarrage du jeu
document.getElementById("startGame").addEventListener("click", () => {
  const players = Array.from(document.querySelectorAll(".player-inputs input"))
    .map(input => input.value.trim())
    .filter(name => name !== "");

  if (!currentCategory || players.length === 0) {
    alert("Choisissez une catégorie et entrez au moins un joueur.");
    return;
  }

  localStorage.setItem('players', JSON.stringify(players));
  localStorage.setItem('category', currentCategory);

  window.open("game.html", "_blank");
});
