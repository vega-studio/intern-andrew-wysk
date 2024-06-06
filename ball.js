export class Ball {
  constructor(x, y, radius, velocity, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.isLeft = true;
    this.theta = Math.PI;
    this.color = color;
  }
  position() {
    const xChange = this.velocity * Math.cos(this.theta);
    const yChange = this.velocity * Math.sin(this.theta);
    this.x += xChange;
    this.y += yChange;
  }
  collision() {
    //Implement
  }
  reset(w, h) {
    this.x = w;
    this.y = h;
    this.isLeft = !this.isLeft;
    if (this.isLeft) this.theta = Math.PI;
    else this.theta = Math.PI * 2;
  }
  show(dimension) {
    dimension.fillStyle = this.color;
    dimension.beginPath();
    dimension.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    dimension.fill();
    dimension.closePath();
  }
}
