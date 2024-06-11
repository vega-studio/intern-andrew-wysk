import { Ball } from "../ball.js";
import { Render } from "../render.js";
import { Index } from "../index.js";

export class BasePowerUp {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ball = Index.getGame().ball;
  }
  /**
   * @param {Ball} ball The ball in play
   *
   * @return {boolean} True if the ball hits this powerup
   */
  hitTest(ball) {
    const point1 = [this.x, this.y];
    const point2 = [this.ball.x, this.ball.y];
    const dist =
      Math.pow(Math.abs(point1[0] - point2[0]), 2) +
      Math.pow(Math.abs(point1[1] - point2[1]), 2);
    return dist * dist <= this.radius + this.ball.radius;
  }

  /**
   * Code executed for rendering
   */
  show() {
    Render.drawCircle(this.color, this.radius, this.x, this.y);
  }
}
