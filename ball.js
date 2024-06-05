class Ball {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.xChange = velocity;
    this.yChange = velocity;
  }
  position() {
    this.x += this.xChange;
    this.y += this.yChange;
  }
  collision() {
    //Implement
  }
  reset(w, h) {
    this.x = w / 2;
    this.y = h / 2;
  }
  show(dimension) {
    dimension.fillStyle = "#fff";
    dimension.beginPath();
    dimension.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    dimension.fill();
    dimension.closePath();
  }
}
