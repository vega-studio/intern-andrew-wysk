import { Ball } from "../ball.js";

class BasePowerUp {
  /**
   * @param {Ball} ball The ball in play
   *
   * @return {boolean} True if the ball hits this powerup
   */
  hitTest(ball) {
    throw new Error("NOT IMPLEMENTED");
  }

  /**
   * Logic loop for executing code on the game loop.
   */
  play() {
    throw new Error("NOT IMPLEMENTED");
  }

  /**
   * Code executed for rendering
   */
  show() {
    throw new Error("NOT IMPLEMENTED");
  }
}
