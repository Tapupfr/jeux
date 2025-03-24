// script.js (accueil)
document.querySelectorAll("#categories button").forEach(button => {
  button.onclick = () => {
    document.querySelectorAll("#categories button").forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
    localStorage.setItem('category', button.dataset.category);
  };
});

document.getElementById("addPlayer").onclick = () => {
  const inputs = document.querySelectorAll("#playerInputs input");
  if (inputs.length < 15) {
    const input = document.createElement("input");
    input.placeholder = `Joueur ${inputs.length + 1}`;
    document.getElementById("playerInputs").appendChild(input);
  } else {
    alert("Maximum 15 joueurs !");
  }
};

document.getElementById("startGame").onclick = () => {
  const inputs = document.querySelectorAll("#playerInputs input");
  const players = Array.from(inputs).map(input => input.value.trim()).filter(Boolean);
  const category = localStorage.getItem('category');

  if (!category || players.length < 2) {
    alert("Choisis une catégorie et ajoute au moins 2 joueurs !");
    return;
  }

  localStorage.setItem('players', JSON.stringify(players));
  location.href = "game.html";
};
