import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";

export class Pong {
  constructor(canvasId, velocity) {
    this.canvas = document.getElementById(canvasId);
    this.dimension = this.canvas.getContext("2d");
    this.score1 = 0;
    this.score2 = 0;
    this.paddleWidth = 10;
    this.paddleHeight = 50;
    this.radius = 5;
    this.velocity = velocity;
    this.keys = {};
    this.canvas.width = 500;
    this.canvas.height = 400;

    this.paddle1 = new Paddle(
      0,
      this.canvas.height / 2 - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight,
      this.velocity
    );
    this.paddle2 = new Paddle(
      this.canvas.width - this.paddleWidth,
      this.canvas.height / 2 - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight,
      this.velocity
    );

    this.ball = new Ball(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.radius,
      this.velocity
    );

    this.initGame();
  }

  /**
   * score: checks whether ball reached either end and adds to score accordingly. Resets ball after.
   */
  score() {
    if (this.ball.x - this.ball.radius <= 0) {
      this.score2++;
      this.ball.reset();
    } else if (this.ball.x + this.ball.radius >= this.canvas.width) {
      this.score1++;
      this.ball.reset();
    }
  }

  /**
   * displayScore: makes characters for score appear at top middle that change based on each current score.
   *
   * @param {CanvasRenderingContext2D} dim
   */
  displayScore(dim, score) {
    dim.fillStyle = "#fff";
    dim.font = "30px Arial";
    if (score === this.score1)
      dim.fillText(score, this.canvas.width / 2 - 30, this.canvas.height - 30);
    if (score === this.score2)
      dim.fillText(score, this.canvas.width / 2 + 30, this.canvas.height - 30);
    dim.fillRect(this.canvas.height / 2, this, 0, 5, this.canvas.height); //Center Line
  }

  /**
   * game loop that updates frames
   */
  loop = () => {
    requestAnimationFrame(this.loop);
    this.dimension.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    // Move player 1
    if (this.paddle1.y < this.canvas.height && this.keys["w"])
      this.paddle1.yChange = -this.velocity;
    else if (this.paddle1.y > 0 && this.keys["s"])
      this.paddle1.yChange = this.velocity;
    else this.paddle1.yChange = 0;

    // Move player 2
    if (this.paddle2.y < this.canvas.height && this.keys["ArrowUp"])
      this.paddle2.yChange = -this.velocity;
    else if (this.paddle2.y > 0 && this.keys["ArrowDown"])
      this.paddle2.yChange = this.velocity;
    else this.paddle2.yChange = 0;
    // Position the player according to their newly set velocities
    this.paddle1.position();
    this.paddle2.position();

    // Position the ball according to it's current state

    if (
      // Ceiling bounce
      this.ball.y - this.ball.radius <= 0 ||
      this.ball.y + this.ball.radius >= this.canvas.height
    ) {
      this.ball.theta = this.ball.theta;
      this.ball.theta *= -1;
    }

    if (
      // Paddle bounce: straight from chatgpt
      (this.ball.x - this.ball.radius <= this.paddle1.x + this.paddle1.width &&
        this.ball.y >= this.paddle1.y &&
        this.ball.y <= this.paddle1.y + this.paddle1.height) ||
      (this.ball.x + this.ball.radius >= this.paddle2.x &&
        this.ball.y >= this.paddle2.y &&
        this.ball.y <= this.paddle2.y + this.paddle2.height)
    ) {
      // Reflect the angle
      const deltaY = this.ball.y - (this.paddle1.y + this.paddle1.height / 2);
      const normalizedDeltaY = deltaY / (this.paddle1.height / 2);
      const maxReflectionAngle = Math.PI / 3;
      const reflectionAngle = normalizedDeltaY * maxReflectionAngle;
      this.ball.theta = Math.PI - this.ball.theta + 2 * reflectionAngle;
      this.ball.theta *= -1;
    }
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
