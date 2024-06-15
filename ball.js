import { Render } from "./render.js";

export class Ball {
  constructor(x, y, radius, velocity, color, theta) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.isLeft = true;
    this.theta = theta;
    this.color = color;
  }
  position() {
    const xChange = this.velocity * Math.cos(this.theta);
    const yChange = this.velocity * Math.sin(this.theta);
    this.x += xChange;
    this.y += yChange;
  }
  reset(w, h) {
    this.x = w;
    this.y = h;
    this.isLeft = !this.isLeft;
    if (this.isLeft) {
      this.theta = Math.PI;
      this.color = "#f00";
    } else {
      this.theta = Math.PI * 2;
      this.color = "#00f";
    }
  }
  show() {
    Render.drawCircle(this.color, this.radius, this.x, this.y);
  }
}
