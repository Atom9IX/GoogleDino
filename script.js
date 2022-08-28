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

// * Key codes
const space = 32;
const keyUp = 38;
const keyDown = 40;

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
    this.isDown = options.isDown;
  }

  jump() {
    if (running) {
      if (!dinoNode.classList.contains("dino-jump")) {
        dinoNode.classList.add("dino-jump");
        dinoNode.classList.remove("kill");
        dinoNode.classList.remove("down");
      }
      setTimeout(function () {
        dinoNode.classList.remove("dino-jump");
      }, 600);
      dinoNode.classList.add("run");
    }
  }

  down() {
    if (running) {
      if (this.isDown) {
        dinoNode.classList.remove("run");
        dinoNode.classList.add("down");
        dinoNode.classList.remove("dino-jump");
        dinoNode.classList.remove("kill");
      } else {
        dinoNode.classList.remove("down");
        dinoNode.classList.add("run");
      }
    }
  }

  kill() {
    dinoNode.classList.remove("down");
    dinoNode.classList.remove("dino-jump");
    dinoNode.classList.remove("run");
    dinoNode.classList.add("kill");
  }

  run() {
    if (this.isDown) {
      return;
    }
    dinoNode.classList.remove("kill");
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
  isDown: false,
});

let smallCactus = new Obstance({
  img: "small cactus img...",
  position: 700,
});

let bigCactus = new Obstance({
  img: "big cactus img...",
  position: -1000,
});

// * Functions
function endGame() {
  setTimeout(restart, 2500);
  dino.kill();
  running = false;
}

function restart() {
  running = true;
  dino.isDown = false;
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
    if (bigCactus.position < 0 && Score.userScore > 400) {
      randomBigCactusSpawn = getRandomArbitrary(0, 50);
      if (randomBigCactusSpawn === 1) {
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

// * Key events
window.addEventListener("keydown", (event) => {
  if (event.keyCode === space || event.keyCode === keyUp) {
    dino.jump();
  } else if (event.keyCode === keyDown) {
    dino.isDown = true;
    dino.down();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode === keyDown) {
    dino.isDown = false;
    dino.down();
  }
});

//document.addEventListener(e =>)

// * Collide
let isCollide = setInterval(function () {
  let dinoHeight = parseInt(
    window.getComputedStyle(dinoNode).getPropertyValue("height")
  );
  let dinoTop = parseInt(
    window.getComputedStyle(dinoNode).getPropertyValue("top")
  );
  let obstanceLeft = parseInt(
    window.getComputedStyle(obstanceNode1).getPropertyValue("left")
  );
  let obstance2Left = parseInt(
    window.getComputedStyle(obstanceNode2).getPropertyValue("left")
  );
  if (obstanceLeft < 140 && obstanceLeft > 85 && dinoTop >= 190 && dinoHeight === 50) {
    endGame();
  }
  if (obstance2Left < 150 && obstance2Left > 85 && dinoTop >= 175 && dinoHeight === 50) {
    endGame();
  }
  // * down anim
  if (obstanceLeft < 170 && obstanceLeft > 85 && dinoTop >= 190 && dinoHeight === 30) {
    endGame();
  }
  if (obstance2Left < 170 && obstance2Left > 85 && dinoTop >= 175 && dinoHeight === 30) {
    endGame();
  }
}, 10);

let obstanceMove = setInterval(updateCactuses, 1);

let ostanceSpeedIncrement = setInterval(incrementSpeed, 500);

let scoreStart = setInterval(Score.updateScore, 100);

restart();
