export class Bounds {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // return 0 if no intersection
  // return 1 if they overlap
  // return 2 if testBounds completely within this bounds
  hitTest(testBounds) {
    const boundWidth = this.x + this.width;
    const testWidth = testBounds.x + testBounds.width;
    const boundHeight = this.y + this.height;
    const testHeight = testBounds.y + testBounds.height;
    if (
      this.x >= testWidth ||
      testBounds.x >= boundWidth ||
      this.y >= testHeight ||
      testBounds.y >= boundHeight
    ) {
      return 0;
    }

    if (
      testBounds.x >= this.x &&
      testWidth <= boundWidth &&
      testBounds.y >= this.y &&
      testHeight <= boundHeight
    ) {
      return 2;
    }

    return 1;
  }
}
