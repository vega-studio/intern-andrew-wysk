export class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yChange = 2;
  }
  position() {
    this.y += this.yChange;
  }
  show(dimension) {
    dimension.fillStyle = "#fff";
    dimension.fillRect(this.x, this.y, this.width, this.height);
  }
}
