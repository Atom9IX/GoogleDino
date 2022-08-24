// * Node Elements
const sceneNode = document.querySelector(".scene");
const dinoNode = document.querySelector(".dino");
const obstanceNode = document.querySelector(".obstance");
const userScoreNode = document.querySelector(".user-score");
const totalScoreNode = document.querySelector(".total-score");

let running = true;

// * classes
class Obstance {
  static speed = 1;

  constructor(options) {
    this.img = options.img;
    this.position = options.position;
  }

  static setObstanceSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  setPosition(newPosition) {
    this.position = newPosition;
  }
}

class Dino {
  constructor(options) {
    this.img = options.img;
  }

  jump() {
    if (running) {
      if (!dinoNode.classList.contains("dino-jump")) {
        dinoNode.classList.add("dino-jump");
      }
      setTimeout(function () {
        dinoNode.classList.remove("dino-jump");
      }, 500);
    }
  }

  kill() {}
}

class Score {
  static userScore = 0;
  static totalScore = 0;

  static updateScore() {
    if (running) {
      userScoreNode.textContent = Score.userScore;
      totalScoreNode.textContent = Score.totalScore;
      Score.userScore++;
      if (Score.userScore > Score.totalScore) {
        Score.totalScore = Score.userScore;
      }
    }
  }

  static setUserScore(newScore) {
    this.userScore = newScore;
  }
}

let dino = new Dino({
  img: "dino day/night img",
});

let smallCactus = new Obstance({
  img: "small cactus img...",
  position: 700,
});

let bigCactus = new Obstance({
  img: "big cactus img...",
  position: 700,
});

// * Functions
function restart() {
  Obstance.setObstanceSpeed(1);
  smallCactus.setPosition(700);
  bigCactus.setPosition(700);
  Score.setUserScore(0);
  running = true;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function updateCactuses() {
  if (running) {
    if (smallCactus.position < -20) {
      smallCactus.setPosition(
        getRandomArbitrary(700, 1500 + Score.userScore / 2)
      );
    }
    obstanceNode.setAttribute("style", `left: ${smallCactus.position}px`);
    smallCactus.position -= Obstance.speed;
  }
}

function incrementSpeed(acc) {
  Obstance.speed += acc;
}

window.addEventListener("keydown", (event) => {
  dino.jump();
});

// * Collide
let isCollide = setInterval(function () {
  let dinoTop = parseInt(
    window.getComputedStyle(dinoNode).getPropertyValue("top")
  );
  let obstanceLeft = parseInt(
    window.getComputedStyle(obstanceNode).getPropertyValue("left")
  );

  // * End game
  if (obstanceLeft < 140 && obstanceLeft > 85 && dinoTop >= 110) {
    setTimeout(restart, 2500);
    running = false;
  }
}, 10);

let obstanceMove = setInterval(updateCactuses, 1);

let ostancePositionIncrement = setInterval(incrementSpeed(0.01), 500);

let scoreStart = setInterval(Score.updateScore, 100);
