// * Node Elements
const scene = document.querySelector(".scene");
const dino = document.querySelector(".dino");
const obstance = document.querySelector(".obstance");

// * Game values
let obstancePosition = 700;
let obstanceSpeed = 1;

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

function restart() {
  setObstanceSpeed(1);
  setObstancePosition(700);
}

function render() {
  if (obstancePosition < -20) {
    setObstancePosition(700);
  }
  obstance.setAttribute("style", `left: ${obstancePosition}px`);
  obstancePosition -= obstanceSpeed;
}

function incrementSpeed() {
  obstanceSpeed += 0.015;
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
}, 1);

let obstanceMove = setInterval(render, 0.5);

let ostancePositionIncrement = setInterval(incrementSpeed, 500);
