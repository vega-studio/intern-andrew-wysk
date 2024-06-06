import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { Render } from "./render.js";

export class Pong {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.screenSize = this.canvas.getBoundingClientRect();
    this.canvas.width = 3840;
    this.canvas.height = 2160;

    this.dimension = this.canvas.getContext("2d");
    Render.setContext(this.dimension);

    this.score1 = 0;
    this.score2 = 0;
    this.paddleWidth = 10;
    this.paddleHeight = 50;
    this.radius = 5;
    this.velocity = 5;
    this.keys = {};

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
      this.screenSize.width - this.paddleWidth + 3,
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
      "#f00"
    );

    this.initGame();
  }

  /**
   * score: checks whether ball reached either end and adds to score accordingly. Resets ball after.
   */
  score() {
    if (this.ball.x - this.ball.radius < -5) {
      this.score2++;
      this.velocity = 5;
      this.ball.velocity = 5;
      this.ball.reset(this.screenSize.width / 2, this.screenSize.height / 2);
    } else if (this.ball.x + this.ball.radius > this.screenSize.width + 5) {
      this.score1++;
      this.velocity = 5;
      this.ball.velocity = 5;
      this.ball.reset(this.screenSize.width / 2, this.screenSize.height / 2);
    }
  }

  /**
   * displayScore: makes characters for score appear at top middle that change based on each current score.
   *
   * @param {CanvasRenderingContext2D} dim
   */
  displayScore(dim, score) {
    dim.fillStyle = "#fff";
    dim.fillRect(this.screenSize.width / 2 + 7, 0, 3, this.screenSize.height); // Center line
    dim.font = "10px Arial";
    dim.fillText("Press ' f ' to increase speed!", 15, 15);
    dim.font = "30px Arial";
    if (score === this.score1)
      if (score >= 10) dim.fillText(9, this.screenSize.width / 2 - 30, 40);
      else dim.fillText(score, this.screenSize.width / 2 - 30, 40);
    if (score === this.score2)
      if (score >= 10) dim.fillText(9, this.screenSize.width / 2 + 30, 40);
      else dim.fillText(score, this.screenSize.width / 2 + 30, 40);
    if (this.score1 >= 10 || this.score2 >= 10) {
      // Win feature -- add win string ("PLAYER _ WINS!") and delay restart
      this.score1 = 0;
      this.score2 = 0;
    }
  }

  /**
   * Game loop that updates frames
   */
  loop = () => {
    requestAnimationFrame(this.loop);
    this.dimension.clearRect(
      0,
      0,
      this.screenSize.width,
      this.screenSize.height
    );
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
    // Speed feature
    if (this.keys["f"] && this.ball.velocity <= 15 && this.velocity <= 10) {
      this.ball.velocity += 0.25;
      this.velocity += 0.125;
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

    // Position the ball according to it's current state

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
      this.ball.color = "#00f";
    } else if (
      this.ball.x + this.ball.radius >= this.paddle2.x &&
      this.ball.y >= this.paddle2.y &&
      this.ball.y <= this.paddle2.y + this.paddle2.height
    ) {
      this.ball.theta =
        Math.random() * ((4 * Math.PI) / 3 - (2 * Math.PI) / 3) +
        (2 * Math.PI) / 3;
      this.ball.color = "#f00";
    }
    // Change color every bounce
    // Reflect the angle: straight from chat gpt
    //   const deltaY = this.ball.y - (this.paddle1.y + this.paddle1.height / 2);
    //   const normalizedDeltaY = deltaY / (this.paddle1.height / 2);
    //   const maxReflectionAngle = Math.PI / 3;
    //   const reflectionAngle = normalizedDeltaY * maxReflectionAngle;
    //   this.ball.theta = (Math.PI - this.ball.theta + 2 * reflectionAngle) * -1;
    // }
    this.ball.position();
    this.score();
  }

  /**
   * Render our game board
   */
  show() {
    this.paddle1.show(this.dimension);
    this.paddle2.show(this.dimension);
    this.ball.show(this.dimension);
    this.displayScore(this.dimension, this.score1);
    this.displayScore(this.dimension, this.score2);
  }
}
