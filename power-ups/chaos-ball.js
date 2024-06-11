import { BasePowerUp } from "./base-power-up.js";
import { Index } from "../index.js";

export class ChaosBall extends BasePowerUp {
  constructor(x, y, radius) {
    super(x, y, radius);
    // Place to store balls
    this.balls = [];
    // The loseReactionTime variable makes AI slower when there is chaos
    this.loseReactionTime = 0;

    this.ball = Index.getGame().ball;
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
    // Makes pushes new balls into balls
    if (this.hitTest(this.ball)) {
      if (this.ball.color === "#f00") {
        for (let i = 0; i < 200; i++) {
          this.balls.push(
            new Ball(
              (this.screenSize.width / 2) * Math.random(),
              this.screenSize.height * Math.random(),
              this.ball.radius,
              this.ball.velocity,
              "#f00"
            )
          );
        }
      } else {
        this.loseReactionTime += 150;
        for (let i = 0; i < 200; i++) {
          this.balls.push(
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
  }

  /**
   * Code executed for rendering
   */
  show() {
    super.show();
  }
}
