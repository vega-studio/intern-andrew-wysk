import { BasePowerUp } from "./base-power-up.js";

export class LengthBall extends BasePowerUp {
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
    for (let i = 0; i < this.pong.gameBalls.length; i++) {
      const gameBall = this.pong.gameBalls[i];
      if (this.hitTest(this.pong.gameBalls[i])) {
        if (this.pong.gameBalls[i].color === "#00f") {
          if (this.pong.paddle1.height <= 200) {
            this.pong.paddle1.height += 5;
          }
        } else {
          if (this.pong.paddle2.height <= 200) {
            this.pong.paddle2.height += 5;
          }
        }
      }
    }
  }

  reset(i) {
    this.pong.paddle1.height = 100;
    this.pong.paddle2.height = 100;
  }

  /**
   * Code executed for rendering
   */
  show() {
    super.show();
  }
}
