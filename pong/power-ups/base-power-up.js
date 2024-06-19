import { Ball } from "../ball.js";
import { Render } from "../render.js";

export class BasePowerUp {
  constructor(pong, x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.pong = pong;
  }
  /**
   * @param {Ball} ball The ball in play
   *
   * @return {boolean} True if the ball hits this powerup
   */
  hitTest(ball) {
    const point1 = [this.x, this.y];
    const point2 = [ball.x, ball.y];
    const distSquared =
      Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2);
    const sum = this.radius + ball.radius;
    return distSquared <= Math.pow(sum, 2);
  }

  play() {
    throw new Error("ABSTRACT");
  }
  reset(i) {
    throw new Error("ABSTRACT");
  }

  /**
   * Code executed for rendering
   */
  show() {
    Render.drawCircle(this.color, this.radius, this.x, this.y);
  }
}
