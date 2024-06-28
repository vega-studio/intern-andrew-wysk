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

  static drawOutline(color, lineWidth, object) {
    let x = screenToContext(object.x);
    let y = screenToContext(object.y);
    let width = screenToContext(object.width);
    let height = screenToContext(object.height);
    RenderQuad.ctx.fillStyle = color;
    // Canvas draw rectangle outline
    RenderQuad.ctx.beginPath();
    RenderQuad.ctx.rect(x, y, width, height);
    RenderQuad.ctx.strokeStyle = color;
    RenderQuad.ctx.lineWidth = lineWidth;
    RenderQuad.ctx.stroke();
    RenderQuad.ctx.closePath();
  }
}
