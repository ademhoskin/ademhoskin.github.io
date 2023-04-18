class Character {
  constructor(name) {
    this.name = name;
    this.exp = 0;
    this.level = 1;
    this.title = "Scrub";
    this.prestige = 0;
  }

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

  printInformation() {
    console.log(`Name: ${this.name}, Level: ${this.level}, Exp: ${this.exp}`);
  }

  levelUp() {
    this.level += 1;
    this.exp -= 100;
  }

  levelDown() {
    this.level -= 1;
    this.exp += 100;
  }

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

// Path: script.js
// attributes: name, exp, level, title, prestige
const playerNombre = document.querySelector(".heading");
const playerLevel = document.getElementById("level");
const playerExp = document.getElementById("exp");
const playerTitle = document.getElementById("title");
const playerPrestige = document.getElementById("prestige");

// buttons
const btnGainExp5 = document.getElementById("btnGainExp5");
const btnLoseExp5 = document.getElementById("btnLoseExp5");
const btnGainExp15 = document.getElementById("btnGainExp15");

function updatePlayer() {
  playerLevel.textContent = `Level: ${character.level}`;
  playerExp.textContent = `Exp: ${character.exp}`;
  playerTitle.textContent = `Title: ${character.title}`;
  playerPrestige.textContent = `Prestige: ${character.prestige}`;
}

let namePlayer = "Adem";
let character = new Character(namePlayer);

playerNombre.textContent = `Welcome ${character.name}.`;

btnGainExp5.addEventListener("click", function () {
  character.gainExp(5);
  updatePlayer();
});

btnLoseExp5.addEventListener("click", function () {
  character.loseExp(5);
  updatePlayer();
});

btnGainExp15.addEventListener("click", function () {
  character.gainExp(15);
  updatePlayer();
});
