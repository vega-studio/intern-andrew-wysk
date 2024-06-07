import { Render } from "./render.js";

export class Paddle {
  constructor(x, y, width, height, velocity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yChange = 2;
    this.velocity = velocity;
  }
  position() {
    this.y += this.yChange;
  }
  show() {
    Render.drawRectangle("#fff", this.width, this.height, this.x, this.y);
  }
}
