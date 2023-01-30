/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

/* images of the player
const playerImage1 = new Image();
playerImage1.src = "/docs/assets/player_position1.png"*/


/*const playerImage2 = new Image();
playerImage2.src = "/docs/assets/player_position2.png"*/

const startButton = document.getElementById("start-button");

const player = new Component(20, 500, 50, 120, ctx);
const plane = new Plane(800, 15, 450, 350, ctx);


startButton.onclick = function () {
  const game = new Game(ctx, 500, 700, player);
  game.start();

};

/*const game = new Game(ctx, 500, 700, player);

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    game.start();
  };
};*/

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowRight":
    player.speedX += 1
    break;

    case "ArrowLeft":
      player.speedX -= 1
      break;
  }

});

document.addEventListener("keyup", () => {
  player.speedX = 0;
  player.speedY = 0;
});