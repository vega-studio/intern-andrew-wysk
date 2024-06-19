import { Bounds } from "./bounds.js";
import { RenderQuad } from "./render-quad.js";

export class QuadTree {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.screenSize = this.canvas.getBoundingClientRect();
    this.canvas.width = this.screenSize.width * window.devicePixelRatio;
    this.canvas.height = this.screenSize.height * window.devicePixelRatio;
    this.dimension = this.canvas.getContext("2d");
    RenderQuad.setContext(this.dimension);
    this.particles = [];
    for (let i = 0; i < 5000; i++) {
      this.particles.push(
        new Bounds(
          this.screenSize.width * Math.random(),
          this.screenSize.height * Math.random(),
          5 * Math.random(),
          5 * Math.random()
        )
      );
    }
    this.fullHits = [];
    this.partialHits = [];
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        if (this.particles[i].hitTest(this.particles[j]) === 2) {
          this.fullHits.push(this.particles[i]);
          this.fullHits.push(this.particles[j]);
        } else if (this.particles[i].hitTest(this.particles[j]) === 1) {
          this.partialHits.push(this.particles[i]);
          this.partialHits.push(this.particles[j]);
        }
      }
    }
  }
  //   loop = () => {
  //     RenderQuad.clearRectangle(this.screenSize.width, this.screenSize.height);
  //     this.play();
  //     requestAnimationFrame(this.loop);
  //   };
  play() {
    particles.forEach((particle) => {
      if (fullHits.has(particle)) RenderQuad.drawRectangle("#f00", particle);
      else if (partialHits.has(particle)) {
        RenderQuad.drawRectangle("#ff0", particle);
      } else {
        RenderQuad.drawRectangle("#0f0", particle);
      }
    });
  }
}
