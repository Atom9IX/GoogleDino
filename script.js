// * Node Elements
const scene = document.querySelector(".scene");
const dino = document.querySelector(".dino");
const obstance = document.querySelector(".obstance");
const userScoreNode = document.querySelector(".user-score");
const totalScoreNode = document.querySelector(".total-score")

// * Game values
let obstancePosition = 700;
let obstanceSpeed = 1;
let userScore = 0;
let totalScore = 0;

// * Functions
function dinoJump() {
  if (!dino.classList.contains("dino-jump")) {
    dino.classList.add("dino-jump");
  }
  setTimeout(function () {
    dino.classList.remove("dino-jump");
  }, 500);
}

function setObstanceSpeed(speed) {
  obstanceSpeed = speed;
}

function setObstancePosition(centerx) {
  obstancePosition = centerx;
}

function setUserScore(score) {
  userScore = score;
}

function restart() {
  setObstanceSpeed(1);
  setObstancePosition(700);
  setUserScore(0);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function render() {
  if (obstancePosition < -20) {
    setObstancePosition(getRandomArbitrary(700, 1500))
  }
  obstance.setAttribute("style", `left: ${obstancePosition}px`);
  obstancePosition -= obstanceSpeed;
}

function incrementSpeed() {
  obstanceSpeed += 0.015;
}

function renderUserScore() {
  userScoreNode.textContent = userScore;
  totalScoreNode.textContent = totalScore;
  userScore++;
  if (userScore > totalScore) {
    totalScore = userScore;
  }
}

window.addEventListener("keydown", (event) => {
  dinoJump();
});

// * Collide
let isCollide = setInterval(function () {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let obstanceLeft = parseInt(
    window.getComputedStyle(obstance).getPropertyValue("left")
  );

  // * End game
  if (obstanceLeft < 140 && obstanceLeft > 90 && dinoTop >= 110) {
    alert("GAME OVER");
    restart();
  }
}, 10);

let obstanceMove = setInterval(render, 1);

let ostancePositionIncrement = setInterval(incrementSpeed, 500);

let scoreStart = setInterval(renderUserScore, 100);
