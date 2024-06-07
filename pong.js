import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { Render } from "./render.js";

export class Pong {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.screenSize = this.canvas.getBoundingClientRect();
    this.canvas.width = this.screenSize.width * window.devicePixelRatio;
    this.canvas.height = this.screenSize.height * window.devicePixelRatio;

    this.dimension = this.canvas.getContext("2d");
    Render.setContext(this.dimension);

    this.score1 = 0;
    this.score2 = 0;
    this.paddleWidth = 10;
    this.paddleHeight = 100;
    this.radius = 8;
    this.velocity = 10;
    this.keys = {};

    this.chaosBalls = [];
    this.ballColor = "#f00";

    // Left paddle
    this.paddle1 = new Paddle(
      0,
      this.screenSize.height / 2 - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight,
      this.velocity
    );

    // Right paddle
    this.paddle2 = new Paddle(
      this.screenSize.width - this.paddleWidth,
      this.screenSize.height / 2 - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight,
      this.velocity
    );

    this.ball = new Ball(
      this.screenSize.width / 2,
      this.screenSize.height / 2,
      this.radius,
      this.velocity,
      this.ballColor
    );

    this.initGame();
  }

  /**
   * Score checks whether ball reached either end and adds to score accordingly. It also resets the ball after
   */
  score() {
    if (this.ball.x - this.ball.radius < -5) {
      this.score2++;
      for (let i = 0; i < 50; i++) {
        this.chaosBalls.push(
          new Ball(
            this.screenSize.width * Math.random(),
            this.screenSize.height * Math.random(),
            this.radius,
            this.velocity,
            this.ballColor
          )
        );
      }
      this.ball.reset(this.screenSize.width / 2, this.screenSize.height / 2);
    } else if (this.ball.x + this.ball.radius > this.screenSize.width + 5) {
      this.score1++;
      for (let i = 0; i < 50; i++) {
        this.chaosBalls.push(
          new Ball(
            this.screenSize.width * Math.random(),
            this.screenSize.height * Math.random(),
            this.radius,
            this.velocity,
            this.ballColor
          )
        );
      }
      this.ball.reset(this.screenSize.width / 2, this.screenSize.height / 2);
    }
  }

  /**
   * DisplayScore makes characters for score appear at top middle that change based on each current score
   *
   *
   */
  displayScore(dim, score) {
    // Center line
    Render.drawRectangle(
      "#fff",
      5,
      this.screenSize.height,
      this.screenSize.width / 2 + 11.5,
      0
    );
    Render.drawText("#fff", "INCREASE SPEED: [f]", 20, "Arial", 25, 25);
    Render.drawText("#fff", "CLEAR CHAOS BALLS: [c]", 20, "Arial", 25, 50);
    if (score === this.score1)
      if (score >= 10)
        Render.drawText(
          "#fff",
          9,
          50,
          "Arial",
          this.screenSize.width / 2 - 30,
          45
        );
      else
        Render.drawText(
          "#fff",
          score,
          50,
          "Arial",
          this.screenSize.width / 2 - 30,
          45
        );
    if (score === this.score2)
      if (score >= 10)
        Render.drawText(
          "#fff",
          9,
          50,
          "Arial",
          this.screenSize.width / 2 + 30,
          45
        );
      else
        Render.drawText(
          "#fff",
          score,
          50,
          "Arial",
          this.screenSize.width / 2 + 30,
          45
        );
    if (this.score1 >= 10 || this.score2 >= 10) {
      this.chaosBalls = [];
      this.velocity = 10;
      this.ball.velocity = 10;
      // Win feature -- add win string ("PLAYER _ WINS!") and delay restart
      let winX =
        this.score1 >= 10
          ? this.screenSize.width / 2 - 475
          : this.screenSize.width / 2 + 100;
      let player = this.score1 >= 10 ? "PLAYER 1" : "PLAYER 2";
      if (this.score1 >= 10) this.score2 = 0;
      else this.score1 = 0;
      Render.drawText(
        "#fff",
        player + " WINS!",
        50,
        "Arial",
        winX,
        this.screenSize.height - 100
      );
      setTimeout(() => {
        this.score1 = 0;
        this.score2 = 0;
      }, 2000);
    }
  }

  /**
   * Game loop that updates frames
   */
  loop = () => {
    requestAnimationFrame(this.loop);
    Render.clearRectangle(this.screenSize.width, this.screenSize.height);
    this.play();
    this.show();
  };

  initGame() {
    // Register input events
    window.addEventListener("keydown", (event) => {
      this.keys[event.key] = true;
    });
    window.addEventListener("keyup", (event) => {
      this.keys[event.key] = false;
    });
    // Start game loop
    this.loop();
  }

  play() {
    // Chaos feature
    if (this.keys["c"]) this.chaosBalls = [];
    for (let i = 0; i < this.chaosBalls.length; i++) {
      this.chaosBalls[i].theta = Math.random() * 2 * Math.PI;
    }
    // Speed feature
    if (this.keys["f"] && this.ball.velocity <= 20 && this.velocity <= 15) {
      this.ball.velocity += 1;
      this.velocity += 0.5;
    }
    // Move player 1
    if (this.paddle1.y > 0 && this.keys["w"])
      this.paddle1.yChange = -this.velocity;
    else if (
      this.paddle1.y + this.paddle1.height < this.screenSize.height &&
      this.keys["s"]
    )
      this.paddle1.yChange = this.velocity;
    else this.paddle1.yChange = 0;

    // Move player 2
    if (this.paddle2.y > 0 && this.keys["ArrowUp"])
      this.paddle2.yChange = -this.velocity;
    else if (
      this.paddle2.y + this.paddle2.height < this.screenSize.height &&
      this.keys["ArrowDown"]
    )
      this.paddle2.yChange = this.velocity;
    else this.paddle2.yChange = 0;

    // Position the player according to their newly set velocities

    this.paddle1.position();
    this.paddle2.position();

    if (
      // Ceiling bounce
      this.ball.y - this.ball.radius <= 0 ||
      this.ball.y + this.ball.radius >= this.screenSize.height
    ) {
      this.ball.theta = this.ball.theta * -1;
    }

    // Collision check with random bounce
    if (
      this.ball.x - this.ball.radius <= this.paddle1.x + this.paddle1.width &&
      this.ball.y >= this.paddle1.y &&
      this.ball.y <= this.paddle1.y + this.paddle1.height
    ) {
      this.ball.theta =
        (Math.random() * (2 * Math.PI + Math.PI / 3 - (5 * Math.PI) / 3) +
          (5 * Math.PI) / 3) %
        (2 * Math.PI);
      this.ballColor = "#00f";
      this.ball.color = "#00f";
    } else if (
      this.ball.x + this.ball.radius >= this.paddle2.x &&
      this.ball.y >= this.paddle2.y &&
      this.ball.y <= this.paddle2.y + this.paddle2.height
    ) {
      this.ball.theta =
        Math.random() * ((4 * Math.PI) / 3 - (2 * Math.PI) / 3) +
        (2 * Math.PI) / 3;
      this.ballColor = "#f00";
      this.ball.color = "#f00";
    }

    // Position the ball according to it's current state

    this.ball.position();
    for (let i = 0; i < this.chaosBalls.length; i++) {
      this.chaosBalls[i].position();
    }

    // Calculate score
    this.score();
  }

  /**
   * Render our game board
   */
  show() {
    this.paddle1.show(this.dimension);
    this.paddle2.show(this.dimension);
    this.ball.show(this.dimension);
    for (let i = 0; i < this.chaosBalls.length; i++) {
      this.chaosBalls[i].show(this.dimension);
    }
    this.displayScore(this.dimension, this.score1);
    this.displayScore(this.dimension, this.score2);
  }
}
