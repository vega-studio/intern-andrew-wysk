import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { Render } from "./render.js";
import { ChaosBall } from "./power-ups/chaos-ball.js";
import { SpeedBall } from "./power-ups/speed-ball.js";
import { LengthBall } from "./power-ups/length-ball.js";
import { GrowBall } from "./power-ups/grow-ball.js";
import { PaddleColorBall } from "./power-ups/paddle-color-ball.js";
import { ShrinkBall } from "./power-ups/shrink-ball.js";

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
    this.activeAI1 = false;
    this.activeAI2 = false;
    this.keys = {};
    // Delay for AI when there is chaos
    this.loseReactionTime = 0;

    this.numOfGameBalls = 1000;
    this.gameBalls = [];

    // Power up balls
    // Chaos: Red
    // Speed: Orange
    // Length: Yellow
    // Grow: Green
    // PaddleColor: Blue
    // Shrink: Magenta
    this.powerUpBalls = [
      new ChaosBall(
        this,
        this.screenSize.width / 2 + 14,
        this.screenSize.height / 2 - 300,
        30,
        "#f00"
      ),
      new SpeedBall(
        this,
        this.screenSize.width / 2 + 14,
        this.screenSize.height / 2 - 200,
        30,
        "#ffa500"
      ),
      new LengthBall(
        this,
        this.screenSize.width / 2 + 14,
        this.screenSize.height / 2 - 100,
        30,
        "#ff0"
      ),
      new GrowBall(
        this,
        this.screenSize.width / 2 + 14,
        this.screenSize.height / 2 + 100,
        30,
        "#0f0"
      ),
      new PaddleColorBall(
        this,
        this.screenSize.width / 2 + 14,
        this.screenSize.height / 2 + 200,
        30,
        "#00f"
      ),
      new ShrinkBall(
        this,
        this.screenSize.width / 2 + 14,
        this.screenSize.height / 2 + 300,
        30,
        "#f0f"
      ),
    ];

    // Left paddle
    this.paddle1 = new Paddle(
      this,
      0,
      this.screenSize.height / 2 - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight,
      this.velocity,
      "#fff",
      this.loseReactionTime
    );

    // Right paddle
    this.paddle2 = new Paddle(
      this,
      this.screenSize.width - this.paddleWidth,
      this.screenSize.height / 2 - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight,
      this.velocity,
      "#fff",
      this.loseReactionTime
    );

    for (let i = 0; i < this.numOfGameBalls; i++) {
      if (i % 2 === 0) {
        this.gameBalls.push(
          new Ball(
            this.screenSize.width / 2,
            this.screenSize.height / 2 +
              Math.random() * (this.screenSize.height / 2 - 350),
            this.radius,
            this.velocity,
            "#f00"
          )
        );
      } else {
        this.gameBalls.push(
          new Ball(
            this.screenSize.width / 2,
            this.screenSize.height / 2 -
              Math.random() * (this.screenSize.height / 2 - 350),
            this.radius,
            this.velocity,
            "#f00"
          )
        );
      }
    }

    this.initGame();
  }

  /**
   * Score checks whether ball reached either end and adds to score accordingly. It also resets everything after
   */
  score() {
    for (let i = 0; i < this.numOfGameBalls; i++) {
      const gameBall = this.gameBalls[i];
      if (gameBall.x - gameBall.radius < -5) {
        this.score2++;
        gameBall.velocity = 10;
        this.paddle1.velocity = 10;
        this.paddle2.velocity = 10;
        this.powerUpBalls[0].balls = [];
        this.loseReactionTime = 0;
        if (i % 2 == 0) {
          gameBall.reset(
            this.screenSize.width / 2,
            this.screenSize.height / 2 +
              Math.random() * (this.screenSize.height / 2 - 350)
          );
        } else {
          gameBall.reset(
            this.screenSize.width / 2,
            this.screenSize.height / 2 -
              Math.random() * (this.screenSize.height / 2 - 350)
          );
        }
        this.paddle1.reset();
        this.paddle2.reset();
      } else if (gameBall.x + gameBall.radius > this.screenSize.width + 5) {
        this.score1++;
        gameBall.velocity = 10;
        this.paddle1.velocity = 10;
        this.paddle2.velocity = 10;
        this.powerUpBalls[0].balls = [];
        this.loseReactionTime = 0;
        if (i % 2 == 0) {
          gameBall.reset(
            this.screenSize.width / 2,
            this.screenSize.height / 2 +
              Math.random() * (this.screenSize.height / 2 - 350)
          );
        } else {
          gameBall.reset(
            this.screenSize.width / 2,
            this.screenSize.height / 2 -
              Math.random() * (this.screenSize.height / 2 - 350)
          );
        }
        this.paddle1.reset();
        this.paddle2.reset();
      }
    }
  }

  /**
   * Makes score, middle line, and instructions appear
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
    Render.drawText(
      "#fff",
      "MAKE PLAYER 1 AI: [1]",
      12.5,
      "Arial",
      this.screenSize.width - 150,
      15
    );
    Render.drawText(
      "#fff",
      "MAKE PLAYER 2 AI: [2]",
      12.5,
      "Arial",
      this.screenSize.width - 150,
      30
    );
    Render.drawText(
      "#fff",
      "TURN OFF ALL AI: [o]",
      12.5,
      "Arial",
      this.screenSize.width - 150,
      45
    );
    Render.drawText(
      "#fff",
      "RED BALL: HIT TO CREATE CHAOS ON YOUR OPPONENT'S SIDE",
      12.5,
      "Arial",
      25,
      15
    );
    Render.drawText(
      "#fff",
      "ORANGE BALL: HIT TO INCREASE YOUR PADDLE SPEED",
      12.5,
      "Arial",
      25,
      30
    );
    Render.drawText(
      "#fff",
      "YELLOW BALL: HIT TO INCREASE YOUR PADDLE'S LENGTH",
      12.5,
      "Arial",
      25,
      45
    );
    Render.drawText(
      "#fff",
      "GREEN BALL: HIT TO GROW THE BALL",
      12.5,
      "Arial",
      25,
      60
    );
    Render.drawText(
      "#fff",
      "BLUE BALL: HIT TO ENHANCE YOUR PADDLE'S COLOR",
      12.5,
      "Arial",
      25,
      75
    );
    Render.drawText(
      "#fff",
      "PURPLE BALL: HIT TO SHRINK THE BALL",
      12.5,
      "Arial",
      25,
      90
    );
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
    Render.clearRectangle(this.screenSize.width, this.screenSize.height);
    this.play();
    this.show();
    requestAnimationFrame(this.loop);
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
    this.powerUpBalls.forEach((e) => {
      {
        e.play();
      }
    });
    // Gives chaos balls random direction
    for (let i = 0; i < this.powerUpBalls[0].balls.length; i++) {
      this.powerUpBalls[0].balls[i].theta = Math.random() * 2 * Math.PI;
    }
    // Move player 1
    if (this.keys["1"]) this.activeAI1 = true;
    if (this.activeAI1) {
      if (this.numOfGameBalls === 1) {
        for (let i = 0; i < this.numOfGameBalls; i++) {
          const gameBall = this.gameBalls[i];
          this.paddle1.positionAI(gameBall);
          if (gameBall.color === "#00f") {
            this.paddle1.goTo(this.screenSize.height / 2);
          }
        }
      } else {
        this.paddle1.goToDenseLeft();
      }
    } else {
      if (this.paddle1.y > 0 && this.keys["w"])
        this.paddle1.yChange = -this.paddle1.velocity;
      else if (
        this.paddle1.y + this.paddle1.height < this.screenSize.height &&
        this.keys["s"]
      )
        this.paddle1.yChange = this.paddle1.velocity;
      else this.paddle1.yChange = 0;
    }

    // Move player 2
    if (this.keys["2"]) this.activeAI2 = true;
    if (this.activeAI2) {
      if (this.numOfGameBalls === 1) {
        for (let i = 0; i < this.numOfGameBalls; i++) {
          const gameBall = this.gameBalls[i];
          this.paddle2.positionAI(gameBall);
          if (gameBall.color === "#f00") {
            this.paddle2.goTo(this.screenSize.height / 2);
          }
        }
      } else {
        this.paddle2.goToDenseRight();
      }
    } else {
      if (this.paddle2.y > 0 && this.keys["ArrowUp"])
        this.paddle2.yChange = -this.velocity;
      else if (
        this.paddle2.y + this.paddle2.height < this.screenSize.height &&
        this.keys["ArrowDown"]
      )
        this.paddle2.yChange = this.paddle2.velocity;
      else this.paddle2.yChange = 0;
    }
    // Turns off both AIs
    if (this.keys["o"]) {
      this.activeAI1 = false;
      this.activeAI2 = false;
    }

    // Position the player according to their newly set velocities

    this.paddle1.position();
    this.paddle2.position();

    // Ceiling bounce
    for (let i = 0; i < this.numOfGameBalls; i++) {
      const gameBall = this.gameBalls[i];
      if (
        gameBall.y - gameBall.radius <= 0 ||
        gameBall.y + gameBall.radius >= this.screenSize.height
      ) {
        gameBall.theta = gameBall.theta * -1;
      }
    }

    // Paddle bounce
    for (let i = 0; i < this.numOfGameBalls; i++) {
      const gameBall = this.gameBalls[i];
      if (
        gameBall.x - gameBall.radius <= this.paddle1.x + this.paddle1.width &&
        gameBall.y >= this.paddle1.y &&
        gameBall.y <= this.paddle1.y + this.paddle1.height
      ) {
        if (gameBall.velocity <= 16.5) gameBall.velocity += 0.5;
        let relativeIntersectY =
          this.paddle1.y + this.paddle1.height / 2 - gameBall.y;
        let normalizedRelativeIntersectionY =
          relativeIntersectY / (this.paddle1.height / 2);
        let bounceAngle =
          normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
        gameBall.theta = bounceAngle;
        gameBall.color = "#00f";
      } else if (
        gameBall.x + gameBall.radius >= this.paddle2.x &&
        gameBall.y >= this.paddle2.y &&
        gameBall.y <= this.paddle2.y + this.paddle2.height
      ) {
        if (gameBall.velocity <= 16.5) gameBall.velocity += 0.5;
        let relativeIntersectY =
          this.paddle2.y + this.paddle2.height / 2 - gameBall.y;
        let normalizedRelativeIntersectionY =
          relativeIntersectY / (this.paddle2.height / 2);
        let bounceAngle =
          normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
        gameBall.theta = Math.PI - bounceAngle;
        gameBall.color = "#f00";
      }

      // Position the ball according to it's current state
      gameBall.position();
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

    // Objects have priority (appear over e verything else)
    for (let i = 0; i < this.powerUpBalls[0].balls.length; i++) {
      this.powerUpBalls[0].balls[i].show(this.dimension);
    }
    this.powerUpBalls.forEach((e) => {
      e.show(this.dimension);
    });
    this.gameBalls.forEach((e) => {
      e.show(this.dimension);
    });
    this.paddle1.show(this.dimension);
    this.paddle2.show(this.dimension);
  }
}
