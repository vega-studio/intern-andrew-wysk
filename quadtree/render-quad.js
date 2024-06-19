function screenToContext(val) {
  return val * window.devicePixelRatio;
}

export class RenderQuad {
  static ctx;

  static setContext(ctx) {
    RenderQuad.ctx = ctx;
  }

  static clearRectangle(width, height) {
    width = screenToContext(width);
    height = screenToContext(height);
    RenderQuad.ctx.clearRect(0, 0, width, height);
  }

  static drawRectangle(color, object) {
    x = screenToContext(x);
    y = screenToContext(y);
    width = screenToContext(width);
    height = screenToContext(height);
    RenderQuad.ctx.fillStyle = color;
    RenderQuad.ctx.fillRect(object.x, object.y, object.width, object.height);
  }
}
