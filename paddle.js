class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yChange = yChange;
  }
  position() {
    this.y += this.yChange;
  }
  show(dimension) {
    dimension.fillStyle = "#fff";
    dimension.fillRect(this.x, this.y, this.width, this.height);
  }
}
