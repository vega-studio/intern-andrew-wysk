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
    for (let i = 0; i < 5000; i++) {
      this.particles.push(
        new Bounds(
          this.screenSize.width * Math.random() + 1,
          this.screenSize.height * Math.random() + 1,
          10 * Math.random() + 1,
          10 * Math.random() + 1
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
    const fullHits = new Set();
    const partialHits = new Set();
    this.tree = new QuadTree(
      new Bounds(0, 0, this.screenSize.width, this.screenSize.height)
    );

    this.particles.forEach((particle) => {
      const hits = this.tree.add(particle);

      hits.forEach((hit) => {
        if (hit === particle) return;
        const collisionType = hit.hitTest(particle);

        if (collisionType === 2) {
          fullHits.add(hit);
          fullHits.add(particle);
        } else if (collisionType === 1) {
          partialHits.add(hit);
          partialHits.add(particle);
        }
      });
    });

    this.particles.forEach((particle) => {
      if (fullHits.has(particle)) {
        RenderQuad.drawRectangle(rgbToHex(255, 0, 0), particle);
      } else if (partialHits.has(particle)) {
        RenderQuad.drawRectangle(rgbToHex(255, 255, 0), particle);
      } else {
        RenderQuad.drawRectangle(
          rgbToHex(
            0,
            Math.floor(Math.random() * 255) | 1,
            Math.floor(Math.random() * 255) | 1
          ),
          particle
        );
      }
    });

    this.tree.draw();
  }
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
