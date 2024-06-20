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
      const topLeftHits = this.topLeft.add(child);
      const topRightHits = this.topRight.add(child);
      const bottomLeftHits = this.bottomLeft.add(child);
      const bottomRightHits = this.bottomRight.add(child);
      topLeftHits.forEach((c) => {
        hits.push(c);
      });
      topRightHits.forEach((c) => {
        hits.push(c);
      });
      bottomLeftHits.forEach((c) => {
        hits.push(c);
      });
      bottomRightHits.forEach((c) => {
        hits.push(c);
      });
    }
    // Adds intersections
    this.particles.forEach((p) => {
      const hit = p.hitTest(child);
      if (hit > 0) {
        hits.push(p);
      }
    });

    return hits;
  }
}
