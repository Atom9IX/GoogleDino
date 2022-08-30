/**
 * todo: add 3 images big cactuses, 3 images small cactuses, day/night, cloud, sun/moon, road animation, addEventListener in the end "spacerestart"
 * ! in the end replace repited elements on functions
 */

// * Node Elements
const sceneNode = document.querySelector(".scene");
const dinoNode = document.querySelector(".dino");
const obstanceNode1 = document.querySelector(".obstance1");
const obstanceNode2 = document.querySelector(".obstance2");
const userScoreNode = document.querySelector(".user-score");
const totalScoreNode = document.querySelector(".total-score");
const pteroNode = document.querySelector(".ptero");

let running = true;

// * keybord
const keys = {
  space: 32,
  keyUp: 38,
  keyDown: 40,
};

// * classes
class Obstance {
  static speed = 1;
  static maxspeed = 3.5;
  static randomSpawnNumber = 0;

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
        updateNodeClass(dinoNode, "add", "dino-jump");
        updateNodeClass(dinoNode, "remove", "kill");
        updateNodeClass(dinoNode, "remove", "down");
      }
      setTimeout(function () {
        updateNodeClass(dinoNode, "remove", "dino-jump");
      }, 600);
      updateNodeClass(dinoNode, "add", "run");
    }
  }

  down() {
    if (running) {
      if (this.isDown) {
        updateNodeClass(dinoNode, "remove", "run");
        updateNodeClass(dinoNode, "add", "down");
        updateNodeClass(dinoNode, "remove", "dino-jump");
        updateNodeClass(dinoNode, "remove", "kill");
      } else {
        updateNodeClass(dinoNode, "remove", "down");
        updateNodeClass(dinoNode, "add", "run");
      }
    }
  }

  kill() {
    updateNodeClass(dinoNode, "remove", "down");
    updateNodeClass(dinoNode, "remove", "dino-jump");
    updateNodeClass(dinoNode, "remove", "run");
    updateNodeClass(dinoNode, "add", "kill");
  }

  run() {
    if (this.isDown) {
      return;
    }
    updateNodeClass(dinoNode, "remove", "kill");
    updateNodeClass(dinoNode, "add", "run");
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

let obstance1 = new Obstance({
  img: "small cactus img...",
  position: 700,
});

let obstance2 = new Obstance({
  img: "big cactus img...",
  position: -1000,
});

// * Functions
function endGame() {
  obstanceNode2.style.animation = "none";
  setTimeout(restart, 2500);
  dino.kill();
  obstanceNode2.set;
  running = false;
}

function restart() {
  running = true;
  dino.isDown = false;
  Obstance.setObstanceSpeed(1);
  obstance1.setPosition(700);
  obstance2.setPosition(-1000);
  Score.setUserScore(0);
  dino.run();
}

function getRandomArbitrary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function moveObstances() {
  obstanceNode1.setAttribute("style", `left: ${obstance1.position}px`);
  obstanceNode2.setAttribute("style", `left: ${obstance2.position}px`);
  if (Obstance.speed < Obstance.maxspeed) {
    obstance1.position -= Obstance.speed;
    obstance2.position -= Obstance.speed;
  } else {
    obstance1.position -= Obstance.maxspeed;
    obstance2.position -= Obstance.maxspeed;
  }
}

function updateCactuses() {
  if (running) {
    // * obstance 1
    if (obstance1.position < -20) {
      obstance1.setPosition(
        getRandomArbitrary(700, 1500 + Obstance.speed * 100)
      );
    }
    // * movement
    moveObstances();
    // * obstance 2
    if (obstance2.position < 0) {
      Obstance.randomSpawnNumber = getRandomArbitrary(0, 50);
      if (Obstance.randomSpawnNumber === 1 /*&& Score.userScore > 200*/) {
        updateNodeClass(obstanceNode2, "add", "obstance2");
        updateNodeClass(obstanceNode2, "remove", "ptero");
        obstance2.setPosition(
          getRandomArbitrary(700, 1500 + Obstance.speed * 100)
        );
      } else if (Obstance.randomSpawnNumber === 2 /*&& Score.userScore > 400*/) {
        updateNodeClass(obstanceNode2, "add", "ptero");
        updateNodeClass(obstanceNode2, "remove", "obstance2");
        obstance2.setPosition(
          getRandomArbitrary(700, 1500 + Obstance.speed * 100)
        );
      }
    }
    if (
      obstance1.position - obstance2.position < 350 &&
      obstance1.position - obstance2.position > -350
    ) {
      if (getRandomArbitrary(0, 2) === 1) {
        obstance2.position = obstance1.position + 350;
      } else {
        obstance1.position = obstance2.position + 350;
      }
    }
  }
}

function incrementSpeed() {
  Obstance.speed += 0.01;
}

function updateNodeClass(node, updateType, name) {
  if (updateType === "add") {
    node.classList.add(name);
  } else if (updateType === "remove") {
    node.classList.remove(name);
  }
}

// * Key events
window.addEventListener("keydown", (event) => {
  if (event.keyCode === keys.space || event.keyCode === keys.keyUp) {
    dino.jump();
  } else if (event.keyCode === keys.keyDown) {
    dino.isDown = true;
    dino.down();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode === keys.keyDown) {
    dino.isDown = false;
    dino.down();
  }
});

// * Collide
let isCollide = setInterval(function () {
  let dinoHeight = parseInt(
    window.getComputedStyle(dinoNode).getPropertyValue("height")
  );
  let obstance2Height = parseInt(
    window.getComputedStyle(obstanceNode2).getPropertyValue("height")
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
  if (
    obstanceLeft < 140 &&
    obstanceLeft > 85 &&
    dinoTop >= 190 &&
    dinoHeight === 50 &&
    obstance2Height !== 35
  ) {
    endGame();
  }
  if (
    obstance2Left < 150 &&
    obstance2Left > 85 &&
    dinoTop >= 175 &&
    dinoHeight === 50 &&
    obstance2Height !== 35
  ) {
    endGame();
  }
  // * down anim
  if (
    obstanceLeft < 170 &&
    obstanceLeft > 85 &&
    dinoTop >= 190 &&
    dinoHeight === 30 &&
    obstance2Height !== 35
  ) {
    endGame();
  }
  if (
    obstance2Left < 170 &&
    obstance2Left > 85 &&
    dinoTop >= 175 &&
    dinoHeight === 30 &&
    obstance2Height !== 35
  ) {
    endGame();
  }
  // * ptero collide
  if (
    obstance2Left < 170 &&
    obstance2Left > 85 &&
    dinoTop <= 175 &&
    dinoHeight === 30 &&
    obstance2Height === 35
  ) {
    endGame();
  }
  if (
    obstance2Left < 170 &&
    obstance2Left > 55 &&
    dinoTop <= 175 &&
    dinoHeight === 50 &&
    obstance2Height === 35
  ) {
    endGame();
  }
}, 10);

let obstanceMove = setInterval(updateCactuses, 1);

let ostanceSpeedIncrement = setInterval(incrementSpeed, 500);

let scoreStart = setInterval(Score.updateScore, 100);

restart();
