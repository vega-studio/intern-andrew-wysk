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
    let x = screenToContext(object.x);
    let y = screenToContext(object.y);
    let width = screenToContext(object.width);
    let height = screenToContext(object.height);
    RenderQuad.ctx.fillStyle = color;
    RenderQuad.ctx.fillRect(x, y, width, height);
  }
}
