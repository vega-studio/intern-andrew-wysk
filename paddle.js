import { Render } from "./render.js";

export class Paddle {
  constructor(pong, x, y, width, height, velocity, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yChange = 2;
    this.velocity = velocity;
    this.color = color;
    this.pong = pong;
  }
  position() {
    this.y += this.yChange;
  }
  // Relocates to given y coordinate
  goTo(yCoord) {
    if (this.y + this.height / 2 < yCoord - 20) {
      this.y += this.velocity;
    }
    if (this.y + this.height / 2 > yCoord + 20) {
      this.y -= this.velocity;
    } else {
      this.yChange = 0;
    }
  }
  // Relocates to the most ball dense row chunk on the left half
  goToDenseLeft() {
    const rowHeight = 50;
    const rows = [];

    // Find out how many balls per row
    for (let i = 0; i < this.pong.gameBalls.length; i++) {
      const gameBall = this.pong.gameBalls[i];

      if (
        gameBall.x < this.pong.screenSize.width / 2 &&
        gameBall.color === "#f00"
      ) {
        const rowIndex = Math.floor(gameBall.y / rowHeight);
        rows[rowIndex] = (rows[rowIndex] || 0) + 1;
      }
    }

    // Find the row with the most balls
    let maxCount = 0;
    let rowWithMostBalls = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i] > maxCount) {
        maxCount = rows[i];
        rowWithMostBalls = i;
      }
    }
    if (maxCount === 0) {
      this.goTo(this.pong.screenSize.height / 2);
    } else {
      this.goTo(rowWithMostBalls * rowHeight + rowHeight / 2);
    }
  }
  // Relocates to the most ball dense row chunk on the right half
  goToDenseRight() {
    const rowHeight = 50;
    const rows = [];

    // Find out how many balls per row
    for (let i = 0; i < this.pong.gameBalls.length; i++) {
      const gameBall = this.pong.gameBalls[i];

      if (
        gameBall.x > this.pong.screenSize.width / 2 &&
        gameBall.color === "#00f"
      ) {
        const rowIndex = Math.floor(gameBall.y / rowHeight);
        rows[rowIndex] = (rows[rowIndex] || 0) + 1;
      }
    }

    // Find the row with the most balls
    let maxCount = 0;
    let rowWithMostBalls = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i] > maxCount) {
        maxCount = rows[i];
        rowWithMostBalls = i;
      }
    }
    if (maxCount === 0) {
      this.goTo(this.pong.screenSize.height / 2);
    } else {
      this.goTo(rowWithMostBalls * rowHeight + rowHeight / 2);
    }
  }
  positionAI(ball) {
    if (
      (ball.x > this.pong.screenSize.width / 2 + this.pong.loseReactionTime &&
        ball.color === "#00f") ||
      (ball.x < this.pong.screenSize.width / 2 - this.pong.loseReactionTime &&
        ball.color === "#f00")
    ) {
      if (
        this.y > 0 &&
        ball.y < this.y + this.height / 2 &&
        !(
          ball.y > this.y + 20 * Math.random() &&
          ball.y < this.y + this.height - 20 * Math.random()
        )
      )
        this.yChange = -this.velocity;
      else if (
        this.y + this.height < this.pong.screenSize.height &&
        ball.y > this.y + this.height / 2 &&
        !(
          ball.y > this.y + 20 * Math.random() &&
          ball.y < this.y + this.height - 20 * Math.random()
        )
      )
        this.yChange = this.velocity;
      else this.yChange = 0;
    }
  }

  show() {
    Render.drawRectangle(this.color, this.width, this.height, this.x, this.y);
  }
}
