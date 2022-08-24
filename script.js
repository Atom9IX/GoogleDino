// * Node Elements
const sceneNode = document.querySelector(".scene");
const dinoNode = document.querySelector(".dino");
const obstanceNode = document.querySelector(".obstance");
const userScoreNode = document.querySelector(".user-score");
const totalScoreNode = document.querySelector(".total-score");

let running = true;

// * images
const deth = "images/death.png";

// * classes
class Obstance {
  static speed = 1;
  static maxspeed = 3.5;

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
    this.bgimg = options.bgimg;
  }

  jump() {
    if (running) {
      if (!dinoNode.classList.contains("dino-jump")) {
        dinoNode.classList.add("dino-jump");
        dinoNode.classList.remove("kill");
      }
      setTimeout(function () {
        dinoNode.classList.remove("dino-jump");
      }, 500);
    }
  }

  end() {
    dinoNode.classList.remove("dino-jump");
    dinoNode.classList.remove("run");
    dinoNode.classList.add("kill");
  }

  run() {
    dinoNode.classList.remove("death");
    dinoNode.classList.add("run");
  }
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
  bgimg: "dino day/night/death img",
});

let smallCactus = new Obstance({
  img: "small cactus img...",
  position: -100,
});

let bigCactus = new Obstance({
  img: "big cactus img...",
  position: -100,
});

// * Functions
function restart() {
  Obstance.setObstanceSpeed(1);
  smallCactus.setPosition(-100);
  bigCactus.setPosition(-100);
  Score.setUserScore(0);
  dino.run();
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
    if (Obstance.speed < Obstance.maxspeed) {
      smallCactus.position -= Obstance.speed;
    } else {
      smallCactus.position -= Obstance.maxspeed;
    }
  }
}

function incrementSpeed() {
  Obstance.speed += 0.01;
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
    dino.end();
    running = false;
  }
}, 10);

let obstanceMove = setInterval(updateCactuses, 1);

let ostancePositionIncrement = setInterval(incrementSpeed, 500);

let scoreStart = setInterval(Score.updateScore, 100);

restart();
