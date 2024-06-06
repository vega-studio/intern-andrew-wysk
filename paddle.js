export class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = 7;
    this.height = 70;
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
