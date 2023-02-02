/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const player = new Component(20, 550, 50, 120, ctx);
const plane = new Plane(800, 15, 400, 350, ctx);
const plane2 = new Plane2(800, 15, 400, 350, ctx);

startButton.onclick = function () {
  const game = new Game(ctx, 500, 700, player);
  const audio = new Audio("docs/assets/helicopter-flyby-68121.mp3");
  const audio3 = new Audio("docs/assets/Game over music.wav");
  setTimeout(() => {
    audio.pause();
  }, 6000);
  audio.play();
  game.start();
};

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowRight":
      player.speedX = 2;
      break;

    case "ArrowLeft":
      player.speedX = -2;
      break;
  }
});

document.addEventListener("keyup", () => {
  player.speedX = 0;
  player.speedY = 0;
});
