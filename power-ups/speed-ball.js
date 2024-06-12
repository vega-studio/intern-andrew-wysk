import { BasePowerUp } from "./base-power-up.js";

export class SpeedBall extends BasePowerUp {
  constructor(pong, x, y, radius, color) {
    super(pong, x, y, radius, color);
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
    if (this.hitTest(this.pong.ball)) {
      if (this.pong.ball.color === "#00f") {
        if (this.pong.paddle1.velocity <= 20) this.pong.paddle1.velocity++;
      } else {
        if (this.pong.paddle1.velocity <= 20) this.pong.paddle2.velocity++;
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
