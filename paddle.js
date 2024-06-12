import { Render } from "./render.js";

export class Paddle {
  constructor(pong, x, y, width, height, velocity, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yChange = 2;
    this.velocity = velocity;
    this.color = color;
    this.pong = pong;
  }
  position() {
    this.y += this.yChange;
  }
  positionAI(ball) {
    if (
      (ball.x > this.pong.screenSize.width / 2 + this.pong.loseReactionTime &&
        ball.color === "#00f") ||
      (ball.x < this.pong.screenSize.width / 2 - this.pong.loseReactionTime &&
        ball.color === "#f00")
    ) {
      if (
        this.y > 0 &&
        ball.y < this.y + this.height / 2 &&
        !(
          ball.y > this.y + 20 * Math.random() &&
          ball.y < this.y + this.height - 20 * Math.random()
        )
      )
        this.yChange = -this.velocity;
      else if (
        this.y + this.height < this.pong.screenSize.height &&
        ball.y > this.y + this.height / 2 &&
        !(
          ball.y > this.y + 20 * Math.random() &&
          ball.y < this.y + this.height - 20 * Math.random()
        )
      )
        this.yChange = this.velocity;
      else this.yChange = 0;
    }
  }
  // Relocates to center
  relocateAI(ball) {
    if (this.y + this.height / 2 < this.pong.screenSize.height / 2 - 20) {
      this.y += this.velocity;
    }
    if (this.y + this.height / 2 > this.pong.screenSize.height / 2 + 20) {
      this.y -= this.velocity;
    } else {
      this.yChange = 0;
    }
  }
  reset() {
    this.color = "#fff";
    this.height = 100;
  }
  show() {
    Render.drawRectangle(this.color, this.width, this.height, this.x, this.y);
  }
}
