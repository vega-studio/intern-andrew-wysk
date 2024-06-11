import { BasePowerUp } from "./base-power-up.js";
import { Index } from "../index.js";

export class SpeedBall extends BasePowerUp {
  constructor(x, y, radius) {
    super(x, y, radius);
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
    if (this.hitTest(this.ball)) {
      if (this.ball.color === "#00f") {
        if (this.paddle1.velocity <= 20) this.paddle1.velocity += 2;
      } else {
        if (this.paddle1.velocity <= 20) this.paddle2.velocity += 2;
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
