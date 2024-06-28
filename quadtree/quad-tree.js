import { Bounds } from "./bounds.js";

let i, j, iMax, p, hit;

// Population limit = 2
export class QuadTree {
  constructor(bounds) {
    this.bounds = bounds;
    this.particles = [];
    this.isSplit = false;
  }

  split() {
    const children = this.particles;
    this.particles = [];
    this.isSplit = true;
    // Split into four sections
    this.topLeft = new QuadTree(
      new Bounds(
        this.bounds.x,
        this.bounds.y,
        this.bounds.width / 2,
        this.bounds.height / 2
      )
    );
    this.topRight = new QuadTree(
      new Bounds(
        this.bounds.x + this.bounds.width / 2,
        this.bounds.y,
        this.bounds.width / 2,
        this.bounds.height / 2
      )
    );
    this.bottomLeft = new QuadTree(
      new Bounds(
        this.bounds.x,
        this.bounds.y + this.bounds.height / 2,
        this.bounds.width / 2,
        this.bounds.height / 2
      )
    );
    this.bottomRight = new QuadTree(
      new Bounds(
        this.bounds.x + this.bounds.width / 2,
        this.bounds.y + this.bounds.height / 2,
        this.bounds.width / 2,
        this.bounds.height / 2
      )
    );
    children.forEach((c) => {
      this.add(c);
    });
  }

  add(child, out = []) {
    // Don't add if not in bounds (base case)
    if (this.bounds.hitTest(child) === 0) {
      return out;
    }

    // Adds intersections
    for (i = 0, iMax = this.particles.length; i < iMax; i++) {
      p = this.particles[i];
      hit = p.hitTest(child);

      if (hit > 0) {
        out.push(p);
      }
    }

    // Don't go over max population
    if (!this.isSplit) {
      if (this.particles.length < 2) {
        this.particles.push(child);
        return out;
      }
      this.split();
    }

    // Recursively adds children to hits and to subquads
    else {
      const subQuadTrees = [
        this.topLeft,
        this.topRight,
        this.bottomLeft,
        this.bottomRight,
      ];

      for (j = 0; j < subQuadTrees.length; j++) {
        const subQuadTree = subQuadTrees[j];
        const test = subQuadTree.bounds.hitTest(child);

        if (test > 1) {
          subQuadTree.add(child, out);
          break;
        } else if (test > 0) {
          this.particles.push(child);
          break;
        }
      }
    }

    return out;
  }
}
