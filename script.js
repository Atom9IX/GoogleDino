/**
 * todo: add 3 images big cactuses, 3 images small cactuses, pterodactel, day/night, cloud, sun/moon, road animation, addEventListener in the end "spacerestart"
 * ! in the end replace repited elements on functions
 */



// * Node Elements
const sceneNode = document.querySelector(".scene");
const dinoNode = document.querySelector(".dino");
const obstanceNode1 = document.querySelector(".obstance1");
const obstanceNode2 = document.querySelector(".obstance2");
const userScoreNode = document.querySelector(".user-score");
const totalScoreNode = document.querySelector(".total-score");

let running = true;
let randomBigCactusSpawn = 0;

// * images

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
  jump() {
    if (running) {
      if (!dinoNode.classList.contains("dino-jump")) {
        dinoNode.classList.add("dino-jump");
        dinoNode.classList.remove("kill");
      }
      setTimeout(function () {
        dinoNode.classList.remove("dino-jump");
      }, 600);
    }
  }

  kill() {
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

let dino = new Dino();

let smallCactus = new Obstance({
  img: "small cactus img...",
  position: 700,
});

let bigCactus = new Obstance({
  img: "big cactus img...",
  position: -1000,
});

// * Functions
function restart() {
  running = true;
  Obstance.setObstanceSpeed(1);
  smallCactus.setPosition(700);
  bigCactus.setPosition(-1000);
  Score.setUserScore(0);
  dino.run();
}

function getRandomArbitrary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function updateCactuses() {
  console.log(bigCactus.position);
  if (running) {
    // * small cactus
    if (smallCactus.position < -20) {
      smallCactus.setPosition(
        getRandomArbitrary(700, 1500 + Obstance.speed * 100)
      );
    }
    // * cactus movement
    obstanceNode1.setAttribute("style", `left: ${smallCactus.position}px`);
    obstanceNode2.setAttribute("style", `left: ${bigCactus.position}px`);
    if (Obstance.speed < Obstance.maxspeed) {
      smallCactus.position -= Obstance.speed;
      bigCactus.position -= Obstance.speed;
    } else {
      smallCactus.position -= Obstance.maxspeed;
      bigCactus.position -= Obstance.maxspeed;
    }
    // * big cactus
    if (bigCactus.position < -30 && Score.userScore > 400) {
      randomBigCactusSpawn = getRandomArbitrary(1, 5);
      if (randomBigCactusSpawn === 2) {
        bigCactus.setPosition(
          getRandomArbitrary(700, 1500 + Obstance.speed * 100)
        );
      } else {
        return;
      }
      
    }
    if (
      smallCactus.position - bigCactus.position < 300 &&
      smallCactus.position - bigCactus.position > -300
    ) {
      bigCactus.position = smallCactus.position + 350;
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
    window.getComputedStyle(obstanceNode1).getPropertyValue("left")
  );
  let obstance2Left = parseInt(
    window.getComputedStyle(obstanceNode2).getPropertyValue("left")
  );

  // * End game
  if (obstanceLeft < 140 && obstanceLeft > 85 && dinoTop >= 190) {
    setTimeout(restart, 2500);
    dino.kill();
    running = false;
  }
  if (obstance2Left < 150 && obstance2Left > 85 && dinoTop >= 175) {
    setTimeout(restart, 2500);
    dino.kill();
    running = false;
  }
}, 10);

let obstanceMove = setInterval(updateCactuses, 1);

let ostancePositionIncrement = setInterval(incrementSpeed, 500);

let scoreStart = setInterval(Score.updateScore, 100);

restart();
