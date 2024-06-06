function screenToContext(val) {
  return val * window.devicePixelRatio;
}

export class Render {
  static ctx;

  static setContext(ctx) {
    Render.ctx = ctx;
  }

  static drawText(message, fontSize, x, y) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.screenSize.width / 2 + 7, 0, 3, this.screenSize.height); // Center line
    ctx.font = "10px Arial";
    ctx.fillText("Press ' f ' to increase speed!", 15, 15);
    ctx.font = "30px Arial";
  }

  static drawCircle() {}

  static drawRectangle() {}
}
