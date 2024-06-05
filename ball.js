export class Ball {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.isLeft = true;
    this.theta = Math.PI;
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
    if (this.isLeft)
      this.theta =
        Math.random() * ((4 * Math.PI) / 3 - (2 * Math.PI) / 3) +
        (2 * Math.PI) / 3;
    else
      this.theta =
        Math.random() * (Math.PI / 3 - (5 * Math.PI) / 3) + (5 * Math.PI) / 3;
    this.x = w / 2;
    this.y = h / 2;
    this.isLeft = !this.isLeft;
  }
  show(dimension) {
    dimension.fillStyle = "#fff";
    dimension.beginPath();
    dimension.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    dimension.fill();
    dimension.closePath();
  }
}
