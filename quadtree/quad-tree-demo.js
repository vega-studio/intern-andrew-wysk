import { Bounds } from "./bounds.js";
import { RenderQuad } from "./render-quad.js";
import { QuadTree } from "./quad-tree.js";

export class QuadTreeDemo {
  constructor(canvasId) {
    const t = Date.now();
    this.canvas = document.getElementById(canvasId);
    this.screenSize = this.canvas.getBoundingClientRect();
    this.canvas.width = this.screenSize.width * window.devicePixelRatio;
    this.canvas.height = this.screenSize.height * window.devicePixelRatio;
    this.dimension = this.canvas.getContext("2d");
    RenderQuad.setContext(this.dimension);
    this.particles = [];
    for (let i = 0; i < 50000; i++) {
      this.particles.push(
        new Bounds(
          this.screenSize.width * Math.random() + 1,
          this.screenSize.height * Math.random() + 1,
          5 * Math.random() + 1,
          5 * Math.random() + 1
        )
      );
    }
    this.allHits = new Set();
    this.fullHits = new Set();
    this.partialHits = new Set();
    this.tree = new QuadTree(
      new Bounds(0, 0, this.screenSize.width, this.screenSize.height)
    );
    console.log("Run-time:", Date.now() - t, "milliseconds");
    this.loop();
  }

  // Just to see what it should look like without the use of a quad tree
  test() {
    const fullHits = new Set();
    const partialHits = new Set();
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        if (this.particles[i].hitTest(this.particles[j]) === 2) {
          fullHits.add(this.particles[i]);
          fullHits.add(this.particles[j]);
        } else if (this.particles[i].hitTest(this.particles[j]) === 1) {
          partialHits.add(this.particles[i]);
          partialHits.add(this.particles[j]);
        }
      }
    }
    this.particles.forEach((particle) => {
      if (fullHits.has(particle)) RenderQuad.drawRectangle("#f00", particle);
      else if (partialHits.has(particle)) {
        RenderQuad.drawRectangle("#ff0", particle);
      } else {
        RenderQuad.drawRectangle("#0f0", particle);
      }
    });
  }

  loop = () => {
    RenderQuad.clearRectangle(this.screenSize.width, this.screenSize.height);
    this.play();
    // this.test();
    requestAnimationFrame(this.loop);
  };

  play() {
    this.allHits = new Set();
    this.fullHits = new Set();
    this.partialHits = new Set();
    this.tree = new QuadTree(
      new Bounds(0, 0, this.screenSize.width, this.screenSize.height)
    );
    this.particles.forEach((particle) => {
      const hits = this.tree.add(particle);
      hits.forEach((hit) => {
        const collisionType = hit.hitTest(particle);
        if (collisionType === 2) {
          this.fullHits.add(hit);
          this.fullHits.add(particle);
        } else if (collisionType === 1) {
          this.partialHits.add(hit);
          this.partialHits.add(particle);
        }
        this.allHits.add(hit);
      });
    });
    this.particles.forEach((particle) => {
      if (this.fullHits.has(particle)) {
        RenderQuad.drawRectangle("#f00", particle);
      } else if (this.partialHits.has(particle)) {
        RenderQuad.drawRectangle("#ff0", particle);
      } else {
        RenderQuad.drawRectangle("#0f0", particle);
      }
    });
  }
}
