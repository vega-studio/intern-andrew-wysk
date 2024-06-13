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
    // Marking reference lines and making counts for the number of balls in each row
    this.half = this.pong.screenSize.width / 2;
    this.row0 = this.pong.screenSize.height;
    this.count1L = 0;
    this.count1R = 0;
    this.row1 = this.pong.screenSize / 5;
    this.count2L = 0;
    this.count2R = 0;
    this.row2 = this.row1 * 2;
    this.count3L = 0;
    this.count3R = 0;
    this.row3 = this.row1 * 3;
    this.count4L = 0;
    this.count4R = 0;
    this.row4 = this.row3 * 4;
    this.count5L = 0;
    this.count5R = 0;
    this.row5 = 0;
  }
  position() {
    this.y += this.yChange;
  }
  resetCount() {
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.count5 = 0;
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
    for (let i = 0; i < this.pong.numOfGameBalls; i++) {
      const gameBall = this.pong.gameBalls[i];

      if (gameBall.x < this.half) {
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

    this.goTo(rowWithMostBalls * rowHeight + rowHeight / 2);
  }
  // Relocates to the most ball dense row chunk on the right half
  goToDenseRight() {
    for (let i = 0; i < this.pong.numOfGameBalls; i++) {
      if (this.pong.gameBalls[i].x > this.half) {
        if (
          this.pong.gameBalls[i].y > this.row0 &&
          this.pong.gameBalls[i].y < this.row1
        ) {
          this.count1R++;
        } else if (
          this.pong.gameBalls[i].y > this.row1 &&
          this.pong.gameBalls[i].y < this.row2
        ) {
          this.count2R++;
        } else if (
          this.pong.gameBalls[i].y > this.row2 &&
          this.pong.gameBalls[i].y < this.row3
        ) {
          this.count3R++;
        } else if (
          this.pong.gameBalls[i].y > this.row3 &&
          this.pong.gameBalls[i].y < this.row4
        ) {
          this.count4R++;
        } else if (
          this.pong.gameBalls[i].y > this.row4 &&
          this.pong.gameBalls[i].y < this.row5
        ) {
          this.count5R++;
        }
      } else {
        this.goTo(this.pong.screenSize / 2);
      }
      if (
        this.count1R >= this.count2R &&
        this.count1R >= this.count3R &&
        this.count1R >= this.count4R &&
        this.count1R >= this.count5R
      ) {
        this.goTo((this.row0 + this.row1) / 2);
      } else if (
        this.count2R >= this.count1R &&
        this.count2R >= this.count3R &&
        this.count2R >= this.count4R &&
        this.count2R >= this.count5R
      ) {
        this.goTo((this.row1 + this.row2) / 2);
      } else if (
        this.count3R >= this.count1R &&
        this.count3R >= this.count2R &&
        this.count3R >= this.count4R &&
        this.count3R >= this.count5R
      ) {
        this.goTo((this.row2 + this.row3) / 2);
      } else if (
        this.count4R >= this.count1R &&
        this.count4R >= this.count2R &&
        this.count4R >= this.count3R &&
        this.count4R >= this.count5R
      ) {
        this.goTo((this.row3 + this.row4) / 2);
      } else if (
        this.count5R >= this.count1R &&
        this.count5R >= this.count2R &&
        this.count5R >= this.count3R &&
        this.count5R >= this.count4R
      ) {
        this.goTo((this.row4 + this.row5) / 2);
      }
      this.resetCount();
    }
  }
  positionAI(ball) {
    if (
      (ball.x > this.half + this.pong.loseReactionTime &&
        ball.color === "#00f") ||
      (ball.x < this.half - this.pong.loseReactionTime && ball.color === "#f00")
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
  reset() {
    this.color = "#fff";
    this.height = 100;
  }
  show() {
    Render.drawRectangle(this.color, this.width, this.height, this.x, this.y);
  }
}
