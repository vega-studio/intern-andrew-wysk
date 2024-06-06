function screenToContext(val) {
  return val * window.devicePixelRatio;
}

export class Render {
  static ctx;

  static setContext(ctx) {
    Render.ctx = ctx;
  }

  static clearRectangle(width, height) {
    width = screenToContext(width);
    height = screenToContext(height);
    Render.ctx.clearRect(0, 0, width, height);
  }

  static drawText(color, message, fontSize, fontFamily, x, y) {
    x = screenToContext(x);
    y = screenToContext(y);
    fontSize = screenToContext(fontSize);
    Render.ctx.fillStyle = color;
    Render.ctx.font = `${fontSize}px ${fontFamily}`;
    Render.ctx.fillText(message, x, y);
  }

  static drawCircle(color, radius, x, y) {
    x = screenToContext(x);
    y = screenToContext(y);
    radius = screenToContext(radius);
    Render.ctx.fillStyle = color;
    Render.ctx.beginPath();
    Render.ctx.arc(x, y, radius, 0, Math.PI * 2);
    Render.ctx.fill();
    Render.ctx.closePath();
  }

  static drawRectangle(color, width, height, x, y) {
    x = screenToContext(x);
    y = screenToContext(y);
    width = screenToContext(width);
    height = screenToContext(height);
    Render.ctx.fillStyle = color;
    Render.ctx.fillRect(x, y, width, height);
  }
}
