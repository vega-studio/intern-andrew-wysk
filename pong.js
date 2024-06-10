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
    this.activeAI = false;
    this.keys = {};

    // Power up balls
    this.chaosPowerUp = new Ball(
      this.screenSize.width / 2 + 14,
      this.screenSize.height / 2 + 120,
      30,
      0,
      "#ff00ff"
    );
    this.speedPowerUp = new Ball(
      this.screenSize.width / 2 + 14,
      this.screenSize.height / 2 - 120,
      30,
      0,
      "#ff0"
    );

    // The loseReactionTime variable makes AI slower when there is chaos
    this.loseReactionTime = 0;
    this.chaosBalls = [];

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
      "#f00"
    );

    this.initGame();
  }

  /**
   * Score checks whether ball reached either end and adds to score accordingly. It also resets the ball after
   */
  score() {
    if (this.ball.x - this.ball.radius < -5) {
      this.score2++;
      this.ball.velocity = 10;
      this.paddle1.velocity = 10;
      this.paddle2.velocity = 10;
      this.chaosBalls = [];
      this.loseReactionTime = 0;
      this.ball.reset(this.screenSize.width / 2, this.screenSize.height / 2);
    } else if (this.ball.x + this.ball.radius > this.screenSize.width + 5) {
      this.score1++;
      this.ball.velocity = 10;
      this.paddle1.velocity = 10;
      this.paddle2.velocity = 10;
      this.chaosBalls = [];
      this.loseReactionTime = 0;
      if (
        this.paddle2.y + this.paddle2.height / 2 <
        this.screenSize.height / 2 - 20
      )
        this.paddle2.y += this.paddle2.velocity;
      if (
        this.paddle2.y + this.paddle2.height / 2 >
        this.screenSize.height / 2 + 20
      )
        this.paddle2.y -= this.paddle2.velocity;
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
    Render.drawText("#fff", "PLAY AGAINST AI: [a]", 20, "Arial", 25, 25);
    Render.drawText("#fff", "TURN OFF AI: [o]", 20, "Arial", 25, 50);
    Render.drawText(
      "#fff",
      "HIT YELLOW SPHERE FOR PADDLE SPEED",
      20,
      "Arial",
      25,
      75
    );
    Render.drawText(
      "#fff",
      "HIT PURPLE SPHERE FOR CHAOS ON YOUR OPPONENT'S SIDE",
      20,
      "Arial",
      25,
      100
    );
    // Render.drawText("#fff", "CLEAR CHAOS BALLS: [c]", 20, "Arial", 25, 50);
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
      }, 1500);
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
    // Power Ups

    if (
      this.ball.x >= this.chaosPowerUp.x - this.chaosPowerUp.radius &&
      this.ball.x <= this.chaosPowerUp.x + this.chaosPowerUp.radius &&
      this.ball.y >= this.chaosPowerUp.y - this.chaosPowerUp.radius &&
      this.ball.y <= this.chaosPowerUp.y + this.chaosPowerUp.radius
    ) {
      if (this.ball.color === "#f00") {
        for (let i = 0; i < 200; i++) {
          this.chaosBalls.push(
            new Ball(
              (this.screenSize.width / 2) * Math.random(),
              this.screenSize.height * Math.random(),
              this.radius,
              this.velocity,
              "#f00"
            )
          );
        }
      } else {
        this.loseReactionTime += 200;
        for (let i = 0; i < 200; i++) {
          this.chaosBalls.push(
            new Ball(
              (this.screenSize.width / 2) * Math.random() +
                this.screenSize.width / 2,
              this.screenSize.height * Math.random(),
              this.radius,
              this.velocity,
              "#00f"
            )
          );
        }
      }
    }
    if (
      this.ball.x >= this.speedPowerUp.x - this.speedPowerUp.radius &&
      this.ball.x <= this.speedPowerUp.x + this.speedPowerUp.radius &&
      this.ball.y >= this.speedPowerUp.y - this.speedPowerUp.radius &&
      this.ball.y <= this.speedPowerUp.y + this.speedPowerUp.radius
    ) {
      if (this.ball.color === "#00f") {
        if (this.paddle1.velocity <= 20) this.paddle1.velocity += 2;
      } else {
        if (this.paddle1.velocity <= 20) this.paddle2.velocity += 2;
      }
    }
    // Chaos random direction
    for (let i = 0; i < this.chaosBalls.length; i++) {
      this.chaosBalls[i].theta = Math.random() * 2 * Math.PI;
    }
    // Move player 1
    if (this.paddle1.y > 0 && this.keys["w"])
      this.paddle1.yChange = -this.paddle1.velocity;
    else if (
      this.paddle1.y + this.paddle1.height < this.screenSize.height &&
      this.keys["s"]
    )
      this.paddle1.yChange = this.paddle1.velocity;
    else this.paddle1.yChange = 0;

    // Move player 2
    // AI feature
    if (this.keys["a"]) this.activeAI = true;
    if (this.keys["o"]) this.activeAI = false;
    if (this.activeAI) {
      if (
        this.ball.x > this.screenSize.width / 2 + this.loseReactionTime &&
        this.ball.color === "#00f"
      ) {
        if (
          this.paddle2.y > 0 &&
          this.ball.y < this.paddle2.y + this.paddle2.height / 2 &&
          !(
            this.ball.y > this.paddle2.y + 20 * Math.random() &&
            this.ball.y <
              this.paddle2.y + this.paddle2.height - 20 * Math.random()
          )
        )
          this.paddle2.yChange = -this.paddle2.velocity;
        else if (
          this.paddle2.y + this.paddle2.height < this.screenSize.height &&
          this.ball.y > this.paddle2.y + this.paddle2.height / 2 &&
          !(
            this.ball.y > this.paddle2.y + 20 * Math.random() &&
            this.ball.y <
              this.paddle2.y + this.paddle2.height - 20 * Math.random()
          )
        )
          this.paddle2.yChange = this.paddle2.velocity;
        else this.paddle2.yChange = 0;
        // Relocate paddle to center
      } else if (this.ball.color === "#f00") {
        if (
          this.paddle2.y + this.paddle2.height / 2 <
          this.screenSize.height / 2 - 20
        )
          this.paddle2.y += this.paddle2.velocity;
        if (
          this.paddle2.y + this.paddle2.height / 2 >
          this.screenSize.height / 2 + 20
        )
          this.paddle2.y -= this.paddle2.velocity;
      } else this.paddle2.yChange = 0;
    } else {
      if (this.paddle2.y > 0 && this.keys["ArrowUp"])
        this.paddle2.yChange = -this.velocity;
      else if (
        this.paddle2.y + this.paddle2.height < this.screenSize.height &&
        this.keys["ArrowDown"]
      )
        this.paddle2.yChange = this.velocity;
      else this.paddle2.yChange = 0;
    }

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
      if (this.ball.velocity <= 16.5) this.ball.velocity += 0.5;
      let relativeIntersectY =
        this.paddle1.y + this.paddle1.height / 2 - this.ball.y;
      let normalizedRelativeIntersectionY =
        relativeIntersectY / (this.paddle1.height / 2);
      let bounceAngle = normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
      this.ball.theta = bounceAngle;
      //   this.ball.theta =
      //     (Math.random() * (2 * Math.PI + Math.PI / 3 - (5 * Math.PI) / 3) +
      //       (5 * Math.PI) / 3) %
      //     (2 * Math.PI);
      this.ball.color = "#00f";
    } else if (
      this.ball.x + this.ball.radius >= this.paddle2.x &&
      this.ball.y >= this.paddle2.y &&
      this.ball.y <= this.paddle2.y + this.paddle2.height
    ) {
      if (this.ball.velocity <= 16.5) this.ball.velocity += 0.5;
      let relativeIntersectY =
        this.paddle2.y + this.paddle2.height / 2 - this.ball.y;
      let normalizedRelativeIntersectionY =
        relativeIntersectY / (this.paddle2.height / 2);
      let bounceAngle = normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
      this.ball.theta = Math.PI - bounceAngle;
      //   this.ball.theta =
      //     Math.random() * ((4 * Math.PI) / 3 - (2 * Math.PI) / 3) +
      //     (2 * Math.PI) / 3;
      this.ball.color = "#f00";
    }

    // Position the ball according to it's current state

    this.ball.position();
    for (let i = 0; i < this.chaosBalls.length; i++) {
      if (
        !(
          this.chaosBalls[i].x > this.screenSize.width / 2 - 30 &&
          this.chaosBalls[i].x < this.screenSize.width / 2 + 30
        )
      )
        this.chaosBalls[i].position();
      else if (this.chaosBalls[i].color === "#f00") this.chaosBalls[i].x -= 50;
      else if (this.chaosBalls[i].color === "#00f") this.chaosBalls[i].x += 50;
    }

    // Calculate score
    this.score();
  }

  /**
   * Render our game board
   */
  show() {
    // Scoring system behind everything else
    this.displayScore(this.dimension, this.score1);
    this.displayScore(this.dimension, this.score2);

    // Objects have priority (appear over everything else)
    for (let i = 0; i < this.chaosBalls.length; i++) {
      this.chaosBalls[i].show(this.dimension);
    }
    this.chaosPowerUp.show(this.dimension);
    this.speedPowerUp.show(this.dimension);
    this.ball.show(this.dimension);
    this.paddle1.show(this.dimension);
    this.paddle2.show(this.dimension);
  }
}
