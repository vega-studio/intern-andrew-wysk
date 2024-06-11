import { Render } from "./render.js";

export class Paddle {
  constructor(x, y, width, height, velocity, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yChange = 2;
    this.velocity = velocity;
    this.color = color;
  }
  position() {
    this.y += this.yChange;
  }
  reset() {
    this.color = "#fff";
    this.height = 100;
  }
  show() {
    Render.drawRectangle(this.color, this.width, this.height, this.x, this.y);
  }
}
