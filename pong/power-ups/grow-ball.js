import { BasePowerUp } from "./base-power-up.js";

export class GrowBall extends BasePowerUp {
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
        if (gameBall.radius <= 100) {
          gameBall.radius++;
        }
      }
    }
  }
  reset(i) {
    this.pong.gameBalls[i].radius = 8;
  }

  /**
   * Code executed for rendering
   */
  show() {
    super.show();
  }
}
