function screenToContext(val) {
  return val * window.devicePixelRatio;
}

export class Render {
  static ctx;

  static setContext(ctx) {
    Render.ctx = ctx;
  }

  static drawText(color, message, font, x, y) {
    Render.ctx.fillStyle = color;
    Render.ctx.font = font;
    Render.ctx.fillText(message, x, y);
  }

  static drawCircle(color, radius, x, y) {
    Render.ctx.fillStyle = color;
    Render.ctx.beginPath();
    Render.ctx.arc(x, y, radius, 0, Math.PI * 2);
    Render.ctx.fill();
    Render.ctx.closePath();
  }

  static drawRectangle(color, width, height, x, y) {
    Render.ctx.fillStyle = color;
    Render.ctx.fillRect(x, y, width, height);
  }
}
