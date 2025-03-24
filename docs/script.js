// script.js (COMPLET)

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

document.getElementById("startGame").addEventListener("click", () => {
  const players = Array.from(document.querySelectorAll(".player-inputs input"))
    .map(input => input.value.trim())
    .filter(name => name !== "");

  const selectedCategory = document.querySelector("#categories button.selected")?.dataset.category;

  if (!selectedCategory || players.length === 0) {
    alert("Choisissez une catégorie et entrez au moins un joueur.");
    return;
  }

  localStorage.setItem('players', JSON.stringify(players));
  localStorage.setItem('category', selectedCategory);

  window.open("game.html", "_blank");
});


 


