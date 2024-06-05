import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";

export class Pong {
  constructor(canvasId, velocity) {
    this.canvas = document.getElementById(canvasId);
    this.dimension = this.canvas.getContext("2d");
    this.score1 = 0;
    this.score2 = 0;
    this.paddleWidth = 10;
    this.paddleHeight = 100;
    this.radius = 10;
    this.velocity = velocity;
    this.keys = {};

    this.p1 = new Paddle(0, this.canvas.height / 2 - this.paddleHeight);
    this.p2 = new Paddle(
      this.canvas.width - this.paddleWidth,
      this.canvas.height / 2 - this.paddleHeight
    );

    this.b = new Ball(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.radius,
      this.velocity
    );

    this.initGame();
  }

  /**
   * asdlkfjasd;fjasdlk
   */
  score() {
    if (this.b.x - this.b.radius <= 0) {
      this.score1++;
      this.b.reset();
    } else if (this.b.x + this.b.radius >= this.canvas.width) {
      this.score2++;
      this.b.reset();
    }
  }

  /**
   * asdjfadsljfal;sdj
   *
   * @param {CanvasRenderingContext2D} dim
   */
  displayScore(dim, score) {
    dim.fillStyle = "#fff";
    dim.font = "20px Arial";
    if (score === this.score1)
      dim.fillText(score, this.canvas.width / 2 - 30, this.canvas.height - 30);
    if (score === this.score2)
      dim.fillText(score, this.canvas.width / 2 + 30, this.canvas.height - 30);
    dim.fillRect(this.canvas.height / 2, this, 0, 5, this.canvas.height); //Center Line
  }

  /**
   * asldkfj
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
    if (this.p1.y < this.canvas.height && this.keys["w"])
      this.p1.yChange = this.p1.velocity;
    else if (this.p1.y > 0 && this.keys["s"])
      this.p1.yChange = -this.p1.velocity;
    else this.p1.yChange = 0;

    // Move player 2
    if (this.p2.y < this.canvas.height && this.keys["ArrowUp"])
      this.p2.yChange = this.p2.velocity;
    else if (this.p2.y > 0 && this.keys["ArrowDown"])
      this.p2.yChange = -this.p2.velocity;
    else this.p2.yChange = 0;

    // Position the player according to their newly set velocities
    this.p1.position();
    this.p2.position();

    // Position the ball according to it's current state
    this.ball.position();
  }

  /**
   * Render our game board
   */
  show() {
    this.p1.show(this.dimension);
    this.p2.show(this.dimension);
    this.b.show(this.dimension);
    this.displayScore(this.dimension, this.score1);
    this.displayScore(this.imension, this.score2);
  }
}
