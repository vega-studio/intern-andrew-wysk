import { Bounds } from "./bounds.js";
// Population limit = 2
export class QuadTree {
  constructor(bounds) {
    this.bounds = bounds;
    this.particles = [];
    this.isSplit = false;
  }

  split() {
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
  }

  add(child) {
    let hits = [];
    // Don't add if not in bounds (base case)
    if (this.bounds.hitTest(child) === 0) {
      return hits;
    }
    // Adds intersections
    this.particles.forEach((p) => {
      const hit = p.hitTest(child);
      if (hit > 0) {
        hits.push(p);
      }
    });
    // Don't go over max population
    if (this.particles.length < 2 && !this.isSplit) {
      this.particles.push(child);
      return hits;
    }
    if (!this.isSplit) {
      this.split();
    }

    // Recursively adds children to hits and to subquads
    if (this.isSplit) {
      const subQuadTrees = [
        this.topLeft,
        this.topRight,
        this.bottomLeft,
        this.bottomRight,
      ];
      subQuadTrees.forEach((subQuadTree) => {
        const subHits = subQuadTree.add(child);
        subHits.forEach((hit) => {
          hits.push(hit);
        });
      });
    }

    return hits;
  }
}
