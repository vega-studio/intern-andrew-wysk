import { BasePowerUp } from "./base-power-up.js";

export class PaddleColorBall extends BasePowerUp {
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
      if (this.hitTest(gameBall)) {
        if (gameBall.color === "#00f") {
          this.pong.paddle1.color = "#40e0d0";
        } else {
          this.pong.paddle2.color = "#ff7f50";
        }
      }
    }
  }

  reset(i) {
    this.pong.paddle1.color = "#fff";
    this.pong.paddle2.color = "#fff";
  }

  /**
   * Code executed for rendering
   */
  show() {
    super.show();
  }
}
