/**@type{HTMLCanvasElement} */

class Game {
  constructor(ctx, width, heigth, player) {
    this.ctx = ctx;
    this.width = width;
    this.heigth = heigth;
    this.player = player;
    this.intervalId = null;
    this.frames = 0;
    this.cssFloat = [];
    this.jsFloat = [];
    this.htmlFloat = [];
    this.wrongFloat = [];
    this.plane = plane;
    this.plane2 = plane2;
    this.score = 0;
    this.lifes = 5;
    this.audio2 = new Audio("docs/assets/musicafundo.mp3");
    this.audio = new Audio("docs/assets/helicopter-flyby-68121.mp3");
    this.audio2.loop = true;
    this.audio3 = new Audio("docs/assets/Game over music.wav");
  }

  start() {
    this.intervalId = setInterval(this.update, 1000 / 120);
    this.audio2.play();
    this.audio2.volume = 0.1;
  }

  update = () => {
    this.frames++;
    this.clear();
    this.player.newPos();
    this.player.draw();
    this.updateCssFloat();
    this.updateHtmlFloat();
    this.updateJsFloat();
    this.updateWrongFloat();
    this.updatePlane();
    this.checkGameOver();
    this.showScore();
    this.checkScoreCSS();
    this.checkScoreHTML();
    this.checkScoreJS();
    this.showLifes();

   
  };

  stop() {
    clearInterval(this.intervalId);
  }

  clear() {
    this.ctx.clearRect(0, 0, 1000, 950);
  }

  showLifes() {
    this.ctx.font = "30px Jazz LET, fantasy";
    this.ctx.fillStyle = "red";
    //  this.ctx.fillText(`❤️ ${this.lifes} `, 40, 42);
    this.ctx.fillText(`❤️ ${this.lifes} `, 920, 42);
  }

  showScore() {
    this.ctx.font = "30px Jazz LET, fantasy";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(`🛟 ${this.score} `, 840, 42);
  }

  updateCssFloat() {
    for (let i = 0; i < this.cssFloat.length; i++) {
      this.cssFloat[i].y += 2.5;
      this.cssFloat[i].draw();
    }

    if (this.frames % 650 === 0) {
      this.cssFloat.push(new CssFloat(this.ctx));
    }
  }

  updateHtmlFloat() {
    for (let i = 0; i < this.htmlFloat.length; i++) {
      this.htmlFloat[i].y += 1.7;
      this.htmlFloat[i].draw();
    }

    if (this.frames % 700 === 0) {
      this.htmlFloat.push(new HtmlFloat(this.ctx));
    }
  }

  updateJsFloat() {
    for (let i = 0; i < this.jsFloat.length; i++) {
      this.jsFloat[i].y += 2.8;
      this.jsFloat[i].draw();
    }

    if (this.frames % 300 === 0) {
      this.jsFloat.push(new JsFloat(this.ctx));
    }
  }

  updateWrongFloat() {
    for (let i = 0; i < this.wrongFloat.length; i++) {
      this.wrongFloat[i].y += 3.2;
      this.wrongFloat[i].draw();
    }

    if (this.frames % 50 === 0) {
      this.wrongFloat.push(new WrongFloat(this.ctx));
    }
  }

  updatePlane() {
    if (this.frames > 100) {
      this.plane.x -= 2;
      this.plane.draw();
    }
  }

  checkGameOver = () => {
    for (let i = 0; i < this.wrongFloat.length; i++) {
      if (this.player.crashWith(this.wrongFloat[i])) {
        this.wrongFloat.splice(i, 1);
        this.lifes -= 1;
        console.log("-1 life");
      }
    }
    if (this.lifes === 0) {
      setTimeout(() => {
        this.stop();
        this.audio2.pause();
        this.audio.pause();
      }, 3000);
      this.cssFloat = [];
      this.jsFloat = [];
      this.htmlFloat = [];
      this.wrongFloat = [];
      this.plane2.draw();
      this.audio.play();
      this.plane2.x -= 2.3;
      this.audio3.play();
    }
  };
  checkScoreCSS = () => {
    for (let i = 0; i < this.cssFloat.length; i++) {
      if (this.player.crashWith(this.cssFloat[i])) {
        this.cssFloat.splice(i, 1);
        this.score += 2;
        console.log("+2 life");
      }
    }
  };
  checkScoreHTML = () => {
    for (let i = 0; i < this.htmlFloat.length; i++) {
      if (this.player.crashWith(this.htmlFloat[i])) {
        this.htmlFloat.splice(i, 1);
        this.score += 1;
        console.log("+3 life");
      }
    }
  };

  checkScoreJS = () => {
    for (let i = 0; i < this.jsFloat.length; i++) {
      if (this.player.crashWith(this.jsFloat[i])) {
        this.jsFloat.splice(i, 1);
        this.score += 3;
        console.log("+3 life");
      }
    }
  };
}

class Plane {
  constructor() {
    this.x = 800;
    this.y = 100;
    this.w = 450;
    this.h = 100;
    this.ctx = ctx;
    this.img5 = new Image();
  }
  draw() {
    this.img5.src = "docs/assets/Avião_go.png";
    this.ctx.drawImage(this.img5, this.x, this.y, this.w, this.h);
  }
}

class Plane2 {
  constructor() {
    this.x = 800;
    this.y = 100;
    this.w = 450;
    this.h = 100;
    this.ctx = ctx;
    this.img6 = new Image();
  }
  draw() {
    this.img6.src = "docs/assets/sorry_catarina.png";
    this.ctx.drawImage(this.img6, this.x, this.y, this.w, this.h);
  }
}

class CssFloat {
  constructor(ctx) {
    this.x = Math.floor(Math.random() * 1200);
    this.y = 0;
    this.w = 70;
    this.h = 100;

    this.ctx = ctx;

    this.img1 = new Image();
  }

  draw() {
    this.img1.src = "docs/assets/float_css.png";
    this.ctx.drawImage(this.img1, this.x, this.y, this.w, this.h);
  }

  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.h;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
}

class HtmlFloat {
  constructor(ctx) {
    this.x = Math.floor(Math.random() * 1000);
    this.y = 0;
    this.w = 70;
    this.h = 100;

    this.ctx = ctx;

    this.img2 = new Image();
  }

  draw() {
    this.img2.src = "docs/assets/float_html.png";
    this.ctx.drawImage(this.img2, this.x, this.y, this.w, this.h);
  }

  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.h;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
}

class JsFloat {
  constructor(ctx) {
    this.x = Math.floor(Math.random() * 1000);
    this.y = 0;
    this.w = 70;
    this.h = 100;

    this.ctx = ctx;

    this.img3 = new Image();
  }

  draw() {
    this.img3.src = "docs/assets/float_javascript.png";
    this.ctx.drawImage(this.img3, this.x, this.y, this.w, this.h);
  }

  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.h;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
}

class WrongFloat {
  constructor(ctx) {
    this.x = Math.floor(Math.random() * 1000);
    this.y = 0;
    this.w = 70;
    this.h = 100;

    this.ctx = ctx;

    this.img4 = new Image();
  }

  draw() {
    this.img4.src = "docs/assets/float.png";
    this.ctx.drawImage(this.img4, this.x, this.y, this.w, this.h);
  }

  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.h;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
}
