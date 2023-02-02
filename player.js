/**@type{HTMLCanvasElement} */

class Component {
  constructor(x, y, w, h, ctx, color) {
    this.x = x;
    this.y = y;

    this.w = w;
    this.h = h;

    this.color = color;
    this.ctx = ctx;

    this.speedX = 0;
    this.speedY = 0;
    this.img = new Image();
    this.img5 = new Image();
    

    this.img.src = "docs/assets/player_position1.png";
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, 90, 50);
    this.ctx.drawImage(this.img5, this.x, this.y, 100, 400);
  }

  newPos() {
    if (this.x + 90 > canvas.width) {
      this.x = canvas.width - 90;
      this.speedX = 0;
    } else if (this.x < 0) {
      this.x = 0;
      this.speedX = 0;
    } else {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    if (this.y + 50 > canvas.height) {
      this.y = canvas.height - 50;
      this.speedY = 0;
    } else if (this.y < 0) {
      this.y = 0;
      this.speedY = 0;
    } else {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.h - 60;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.w;
  }

  crashWith(float) {
    return !(
      this.bottom() < float.top() ||
      this.top() > float.bottom() ||
      this.right() < float.left() ||
      this.left() > float.right()
    );
  }
}
