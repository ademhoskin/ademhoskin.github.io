class Character {
  // DEFAULT VALUES
  constructor(name) {
    this.name = name;
    this.exp = 0;
    this.level = 1;
    this.title = "Beginner";
    this.prestige = 0;
  }

  // update the title based on the level
  titleUpdate() {
    switch (true) {
      case this.level < 5:
        this.title = "Beginner";
        break;
      case this.level >= 5 && this.level < 10:
        this.title = "Novice";
        break;
      case this.level >= 10 && this.level < 20:
        this.title = "Intermediate";
        break;
      case this.level >= 20 && this.level < 35:
        this.title = "Advanced";
        break;
      case this.level >= 35 && this.level < 50:
        this.title = "Expert";
        break;
      case this.level >= 50 && this.level < 100:
        this.title = "Elite";
        break;
      case this.level == 100:
        this.title = "Master";
        break;
      case this.level > 100:
        this.prestige++;
        this.level = 1;
        break;
    }
  }

  // print the character information to the console
  printInformation() {
    console.log(`Name: ${this.name}, Level: ${this.level}, Exp: ${this.exp}`);
  }

  // level up and down functions
  levelUp() {
    this.level++;
    this.exp -= 100;
    this.titleUpdate();
  }
  levelDown() {
    this.level--;
    this.exp += 100;
    this.titleUpdate();
  }

  // gain and lose exp functions
  gainExp(amount) {
    this.exp += amount;
    while (this.exp >= 100) {
      this.levelUp();
    }
  }
  loseExp(amount) {
    this.exp -= amount;
    while (this.exp < 0) {
      this.levelDown();
    }
  }
}

// create a new character or load an existing one from local storage
let character = null;
const input = "Adem";
const savedCharacters = JSON.parse(localStorage.getItem("characters")) || [];
const savedCharacter = savedCharacters.find((char) => char.name === input);
if (savedCharacter) {
  character = new Character(savedCharacter.name);
  character.exp = savedCharacter.exp;
  character.level = savedCharacter.level;
  character.title = savedCharacter.title;
  character.prestige = savedCharacter.prestige;
} else {
  character = new Character(input);
}

// update the character information in local storage whenever it changes
function updateLocalStorage() {
  const index = savedCharacters.findIndex(
    (char) => char.name === character.name
  );
  if (index !== -1) {
    savedCharacters[index] = character;
  } else {
    savedCharacters.push(character);
  }
  localStorage.setItem("characters", JSON.stringify(savedCharacters));
}

// attributes: name, exp, level, title, prestige
const playerNameElement = document.querySelector(".heading");
const playerLevelElement = document.getElementById("level");
const playerExpElement = document.getElementById("exp");
const playerTitleElement = document.getElementById("title");
const playerPrestigeElement = document.getElementById("prestige");

// buttons
const gainExp5 = document.getElementById("btnGainExp5");
const loseExp5 = document.getElementById("btnLoseExp5");
const gainExp15 = document.getElementById("btnGainExp15");

// update stats
function updatePlayer() {
  playerLevelElement.textContent = `Level: ${character.level}`;
  playerExpElement.textContent = `Exp: ${character.exp}`;
  playerTitleElement.textContent = `Title: ${character.title}`;
  playerPrestigeElement.textContent = `Prestige: ${character.prestige}`;
  updateLocalStorage();
}

playerNameElement.textContent = `Welcome ${character.name}.`;
updatePlayer();
gainExp5.addEventListener("click", function () {
  character.gainExp(5);
  updatePlayer();
});

loseExp5.addEventListener("click", function () {
  character.loseExp(5);
  updatePlayer();
});

gainExp15.addEventListener("click", function () {
  character.gainExp(15);
  updatePlayer();
});
