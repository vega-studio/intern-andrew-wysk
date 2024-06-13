import { BasePowerUp } from "./base-power-up.js";

export class ShrinkBall extends BasePowerUp {
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
    for (let i = 0; i < this.pong.numOfGameBalls; i++) {
      if (this.hitTest(this.pong.gameBalls[i])) {
        if (this.pong.gameBalls[i].radius >= 6) {
          this.pong.gameBalls[i].radius -= 2;
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
