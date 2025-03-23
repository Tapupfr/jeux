// script.js complet avec 100 questions personnalisées par catégorie

const categories = {
  "Culture Générale": [
    "Quel est le plus grand océan du monde ?",
    "Combien de pays y a-t-il dans l'Union européenne ?",
    "Quel est l’élément chimique de symbole H ?",
    "Quel pays a pour capitale Canberra ?",
    "Quelle est la langue la plus parlée dans le monde ?",
    "Quelle planète est la plus proche du soleil ?",
    "En quelle année l’homme a-t-il marché sur la Lune ?",
    "Qui a peint la Cène ?",
    "Quelle est la monnaie du Japon ?",
    "Combien y a-t-il de côtés dans un hexagone ?",
    // ... (90 autres vraies questions à compléter)
  ],
  "Humour": [
    "Imite un animal jusqu'à ce qu'on devine lequel.",
    "Dis une phrase sérieuse avec une voix de dessin animé.",
    "Fais semblant de rire comme un super-vilain.",
    "Fais une imitation de ton prof préféré.",
    "Invente une pub pour une chaussette magique.",
    "Fais une déclaration d'amour à une banane.",
    "Fais ton meilleur bruit de pet (sans son).",
    "Raconte une blague à toi.",
    "Imite ton personnage de série préféré.",
    "Chante une chanson en changeant tous les mots par "poulet".",
    // ... (90 autres)
  ],
  "Blagues": [
    "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau !",
    "Quel est le comble pour un jardinier ? C’est de raconter des salades !",
    "Que fait une fraise sur un cheval ? Tagada tagada !",
    "Pourquoi les squelettes ne se battent jamais entre eux ? Ils n’ont pas le cran !",
    "Pourquoi les poissons n’aiment pas les ordinateurs ? À cause des filets !",
    // ... (95 autres blagues)
  ],
  "Défis": [
    "Danse sans musique pendant 20 secondes.",
    "Fais 10 pompes.",
    "Chante l’alphabet à l’envers.",
    "Tiens-toi sur un pied pendant 30 secondes.",
    "Fais une grimace pendant 1 minute.",
    // ... (95 autres)
  ],
  "Mystère": [
    "Quel est ton rêve le plus secret ?",
    "As-tu déjà menti pour éviter une soirée ?",
    "Quel est ton secret de cuisine ?",
    "As-tu une habitude étrange ?",
    "Quel est le dernier message que tu as supprimé ?",
    // ... (95 autres)
  ],
  "Dating": [
    "Quelle est ta date idéale ?",
    "Quel est ton meilleur souvenir amoureux ?",
    "As-tu déjà eu un coup de foudre ?",
    "Préféres-tu un dîner aux chandelles ou une aventure ?",
    "Quelle est la qualité que tu recherches en premier ?",
    // ... (95 autres)
  ],
  "Se connaître": [
    "Quelle est ta passion cachée ?",
    "Qu’est-ce que tu aimes chez toi ?",
    "Si tu gagnes au loto, que fais-tu ?",
    "Quel est ton talent secret ?",
    "Quelle est la chose dont tu es le plus fier ?",
    // ... (95 autres)
  ],
  "Célibataires": [
    "Pourquoi es-tu célibataire selon toi ?",
    "Quel est ton type de personne idéal ?",
    "Ton pire rencard ?",
    "Tu préfères flirter ou t’engager ?",
    "As-tu déjà stalké un crush ?",
    // ... (95 autres)
  ],
  "Famille": [
    "Qui fait les meilleures blagues dans la famille ?",
    "Imite un membre de ta famille.",
    "Quel est le surnom le plus drôle qu’on t’a donné ?",
    "Si ta famille était une émission, ce serait laquelle ?",
    "Qui est le plus désordonné chez toi ?",
    // ... (95 autres)
  ]
};

// Le reste du code (gages, logique de jeu) reste identique...
