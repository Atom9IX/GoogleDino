// * Node Elements
const scene = document.querySelector(".scene");
const dino = document.querySelector(".dino");
const obstance = document.querySelector(".obstance");

let cactusAnimationSpeed = 4;

// * Functions
function dinoJump() {
  if (!dino.classList.contains("dino-jump")) {
    dino.classList.add("dino-jump");
  }
  setTimeout(function () {
    dino.classList.remove("dino-jump");
  }, 500);
}

window.addEventListener("keydown", (event) => {
  dinoJump();
});

// * Collide
let isCollide = setInterval(function () {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cactusLeft = parseInt(
    window.getComputedStyle(obstance).getPropertyValue("left")
  );

// * End game
  if (cactusLeft < 140 && cactusLeft > 100 && dinoTop >= 110) {
    alert("GAME OVER");
  }
}, 1);
