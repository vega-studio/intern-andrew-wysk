import { BasePowerUp } from "./base-power-up.js";

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
    super.hitTest(ball);
  }

  /**
   * Logic loop for executing code on the game loop.
   */
  play() {
    // Makes and pushes new balls into balls
    if (this.hitTest(this.pong.ball)) {
      if (this.pong.ball.color === "#f00") {
        for (let i = 0; i < 200; i++) {
          this.balls.push(
            new Ball(
              (this.pong.screenSize.width / 2) * Math.random(),
              this.pong.screenSize.height * Math.random(),
              this.pong.radius,
              this.pong.ball.velocity,
              "#f00"
            )
          );
        }
      } else {
        this.pong.loseReactionTime += 150;
        for (let i = 0; i < 200; i++) {
          this.balls.push(
            new Ball(
              (this.pong.screenSize.width / 2) * Math.random() +
                this.pong.screenSize.width / 2,
              this.screenSize.height * Math.random(),
              this.pong.ball.radius,
              this.pong.ball.velocity,
              "#00f"
            )
          );
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
  }

  /**
   * Code executed for rendering
   */
  show() {
    super.show();
  }
}
