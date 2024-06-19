import { BasePowerUp } from "./base-power-up.js";
import { Ball } from "../ball.js";

export class ChaosBall extends BasePowerUp {
  constructor(pong, x, y, radius, color) {
    super(pong, x, y, radius, color);
    // Place to store balls
    this.balls = [];
    // The loseReactionTime variable makes AI slower when there is chaos
  }
  /**
   * @param {Ball} ball The ball in play
   *
   * @return {boolean} True if the ball hits this powerup
   */
  hitTest(ball) {
    return super.hitTest(ball);
  }

  /**
   * Logic loop for executing code on the game loop.
   */
  play() {
    // Makes and pushes new balls into balls
    for (let i = 0; i < this.pong.gameBalls.length; i++) {
      const gameBall = this.pong.gameBalls[i];
      if (this.hitTest(gameBall)) {
        if (gameBall.color === "#f00") {
          if (this.pong.loseReactionTime <= 200) {
            this.pong.loseReactionTime += 50;
          }
          for (let j = 0; j < 100; j++) {
            this.balls.push(
              new Ball(
                (this.pong.screenSize.width / 2) * Math.random(),
                this.pong.screenSize.height * Math.random(),
                8,
                gameBall.velocity,
                "#f00",
                this.pong.theta
              )
            );
          }
        } else {
          if (this.pong.loseReactionTime <= 200) {
            this.pong.loseReactionTime += 50;
          }
          for (let j = 0; j < 100; j++) {
            this.balls.push(
              new Ball(
                (this.pong.screenSize.width / 2) * Math.random() +
                  this.pong.screenSize.width / 2,
                this.pong.screenSize.height * Math.random(),
                8,
                gameBall.velocity,
                "#00f",
                this.pong.theta
              )
            );
          }
        }
      }
    }

    // Makes barrier for chaos balls so they don't cross center line
    for (let i = 0; i < this.balls.length; i++) {
      if (
        !(
          this.balls[i].x > this.pong.screenSize.width / 2 - 30 &&
          this.balls[i].x < this.pong.screenSize.width / 2 + 30
        )
      ) {
        this.balls[i].position();
      } else if (this.balls[i].color === "#f00") this.balls[i].x -= 50;
      else if (this.balls[i].color === "#00f") this.balls[i].x += 50;
    }

    // Gives chaos balls random direction
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].theta = Math.random() * 2 * Math.PI;
    }
  }

  reset(i) {
    this.balls = [];
    this.pong.loseReactionTime = 0;
  }

  /**
   * Code executed for rendering
   */
  show() {
    super.show();
  }
}
