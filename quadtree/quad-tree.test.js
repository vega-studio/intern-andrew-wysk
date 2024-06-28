import assert from "assert";
import { QuadTree } from "./quad-tree.js";
import { Bounds } from "./bounds.js";

describe("QuadTree", () => {
  it("Can create a Quad Tree", () => {
    assert(new QuadTree(new Bounds(0, 0, 1000, 1000)));
  });

  it("Will NOT create a QuadTree", () => {
    try {
      new QuadTree();
      assert(false);
    } catch (e) {
      assert(true);
    }
  });

  it("Should handle two bounds at opposite corners as no collision", () => {
    const none1 = [new Bounds(0, 0, 5, 5), new Bounds(995, 995, 5, 5)];
    assert(none1[0].hitTest(none1[1]) === 0);
  });
  it("Should handle two bounds on the middle line, but not colliding", () => {
    const none2 = [new Bounds(500, 500, 5, 5), new Bounds(0, 500, 5, 5)];
    assert(none2[0].hitTest(none2[1]) === 0);
  });
  it("Should handle two bounds very close to each other, but not touching", () => {
    const none3 = [new Bounds(0, 0, 5, 5), new Bounds(6, 6, 5, 5)];
    assert(none3[0].hitTest(none3[1]) === 0);
  });
  it("Should handle an intersection of a bigger bounds over a smaller bounds", () => {
    const interb1 = [new Bounds(0, 0, 5, 5), new Bounds(0, 0, 10, 10)];
    assert(interb1[0].hitTest(interb1[1]) === 1);
  });
  it("Should handle an intersection between two bounds in the center that cross", () => {
    const interb2 = [new Bounds(500, 500, 5, 10), new Bounds(500, 505, 10, 5)];
    assert(interb2[0].hitTest(interb2[1]) === 1);
  });
  it("Should handle two large bounds intersecting in the center", () => {
    const interb3 = [
      new Bounds(0, 0, 550, 550),
      new Bounds(450, 450, 500, 500),
    ];
    assert(interb3[0].hitTest(interb3[1]) === 1);
  });
  it("Should handle two bounds overlapping at their corners", () => {
    const inter1 = [new Bounds(0, 0, 5, 5), new Bounds(4, 4, 5, 5)];
    assert(inter1[0].hitTest(inter1[1]) === 1);
  });
  it("Edges at exact border corner should NOT intersect", () => {
    const inter1 = [new Bounds(0, 0, 5, 5), new Bounds(5, 5, 5, 5)];
    assert(inter1[0].hitTest(inter1[1]) === 0);
  });
  it("Should handle two bounds overlapping at their sides in the middle", () => {
    const inter2 = [new Bounds(500, 500, 5, 5), new Bounds(504, 504, 5, 5)];
    assert(inter2[0].hitTest(inter2[1]) === 1);
  });
  it("Should handle a side by side intersecion on the side of the screen", () => {
    const inter3 = [new Bounds(0, 500, 5, 5), new Bounds(4, 504, 5, 5)];
    assert(inter3[0].hitTest(inter3[1]) === 1);
  });
  it("Should handle two bounds overlapping at their sides", () => {
    const inter4 = [new Bounds(0, 0, 5, 5), new Bounds(4, 0, 5, 5)];
    assert(inter4[0].hitTest(inter4[1]) === 1);
  });
  it("Should handle two bounds overlapping each other fully", () => {
    const full1 = [new Bounds(0, 0, 5, 5), new Bounds(0, 0, 5, 5)];
    assert(full1[0].hitTest(full1[1]) === 2);
  });
  it("Should handle a bigger bounds covering a smaller one in the center", () => {
    const full2 = [new Bounds(500, 500, 10, 10), new Bounds(505, 505, 5, 5)];
    assert(full2[0].hitTest(full2[1]) === 2);
  });
  it("Should handle a bigger bounds covering a smaller one at the top middle", () => {
    const full3 = [new Bounds(500, 0, 10, 10), new Bounds(505, 0, 5, 5)];
    assert(full3[0].hitTest(full3[1]) === 2);
  });

  it("Should intersect five Bounds", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(500, 500, 10, 10),
      new Bounds(505, 505, 5, 5),
      new Bounds(495, 495, 15, 15),
      new Bounds(490, 490, 20, 20),
      new Bounds(485, 485, 25, 25),
      new Bounds(0, 0, 5, 5),
      new Bounds(990, 990, 5, 5),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 5);

    const shouldHit = [0, 1, 2, 3, 4];

    for (let i = 0; i < shouldHit.length; i++) {
      assert(allHits.has(bounds[shouldHit[i]]));
    }
  });

  it("Should intersect three large Bounds", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(200, 200, 600, 600),
      new Bounds(300, 300, 400, 400),
      new Bounds(250, 250, 500, 500),
      new Bounds(50, 50, 100, 100),
      new Bounds(0, 0, 5, 5),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 3);

    const shouldHit = [0, 1, 2];

    for (let i = 0; i < shouldHit.length; i++) {
      assert(allHits.has(bounds[shouldHit[i]]));
    }
  });
  it("Should intersect two Bounds on the edges", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(0, 0, 200, 200),
      new Bounds(800, 800, 200, 200),
      new Bounds(990, 990, 10, 10),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 2);

    const shouldHit = [1, 2];

    for (let i = 0; i < shouldHit.length; i++) {
      assert(allHits.has(bounds[shouldHit[i]]));
    }
  });
  it("Should intersect four nested Bounds", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(400, 400, 200, 200),
      new Bounds(450, 450, 100, 100),
      new Bounds(470, 470, 60, 60),
      new Bounds(480, 480, 40, 40),
      new Bounds(10, 10, 20, 20),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 4);

    const shouldHit = [0, 1, 2, 3];

    for (let i = 0; i < shouldHit.length; i++) {
      assert(allHits.has(bounds[shouldHit[i]]));
    }
  });
  it("Should intersect three Bounds diagonally", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(100, 100, 60, 60),
      new Bounds(150, 150, 60, 60),
      new Bounds(200, 200, 60, 60),
      new Bounds(800, 800, 100, 100),
      new Bounds(300, 300, 30, 30),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 3);

    const shouldHit = [0, 1, 2];

    for (let i = 0; i < shouldHit.length; i++) {
      assert(allHits.has(bounds[shouldHit[i]]));
    }
  });
  it("Should intersect four Bounds overlapping corners", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(100, 100, 100, 100),
      new Bounds(150, 150, 100, 100),
      new Bounds(120, 120, 100, 100),
      new Bounds(180, 180, 50, 50),
      new Bounds(500, 500, 100, 100),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 4);

    const shouldHit = [0, 1, 2, 3];

    for (let i = 0; i < shouldHit.length; i++) {
      assert(allHits.has(bounds[shouldHit[i]]));
    }
  });
  it("Should intersect sparse and dense clusters of Bounds", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(100, 100, 10, 10),
      new Bounds(105, 105, 5, 5),
      new Bounds(200, 200, 50, 50),
      new Bounds(205, 205, 30, 30),
      new Bounds(300, 300, 100, 100),
      new Bounds(310, 310, 90, 90),
      new Bounds(500, 500, 200, 200),
      new Bounds(700, 700, 50, 50),
      new Bounds(750, 750, 40, 40),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 6);

    const shouldHit = [0, 1, 2, 3, 4, 5];

    for (let i = 0; i < shouldHit.length; i++) {
      assert(allHits.has(bounds[shouldHit[i]]));
    }
  });
  it("Should intersect no disjoint Bounds", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(100, 100, 50, 50),
      new Bounds(200, 200, 50, 50),
      new Bounds(300, 300, 50, 50),
      new Bounds(400, 400, 50, 50),
      new Bounds(500, 500, 50, 50),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 0);
  });
  it("Should NOT intersect Bounds with overlapping edges", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(100, 100, 100, 100),
      new Bounds(200, 200, 100, 100),
      new Bounds(300, 300, 100, 100),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 0);

    const shouldHit = [];

    for (let i = 0; i < shouldHit.length; i++) {
      assert(allHits.has(bounds[shouldHit[i]]));
    }
  });
  it("Should intersect Bounds that are fully contained within others", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(0, 0, 500, 500),
      new Bounds(10, 10, 400, 400),
      new Bounds(15, 15, 300, 300),
      new Bounds(20, 20, 200, 200),
      new Bounds(25, 25, 100, 100),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 5);

    const shouldHit = [0, 1, 2, 3, 4];

    for (let i = 0; i < shouldHit.length; i++) {
      assert(allHits.has(bounds[shouldHit[i]]));
    }
  });
  it("Should handle non-overlapping Bounds in different quadrants", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(100, 100, 50, 50),
      new Bounds(800, 100, 50, 50),
      new Bounds(100, 800, 50, 50),
      new Bounds(800, 800, 50, 50),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 0);
  });

  it("Should handle overlapping Bounds at the boundaries of quadrants", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [new Bounds(500, 0, 50, 1050), new Bounds(0, 500, 1050, 50)];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 2);

    const shouldHit = [0, 1];

    for (let i = 0; i < shouldHit.length; i++) {
      assert(allHits.has(bounds[shouldHit[i]]));
    }
  });

  it("Should handle Bounds partially outside the QuadTree boundary", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [
      new Bounds(-50, -50, 100, 100),
      new Bounds(950, 950, 100, 100),
      new Bounds(-50, 950, 100, 100),
      new Bounds(950, -50, 100, 100),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 0);
  });

  it("Should handle large number of small, overlapping Bounds", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const bounds = [];
    for (let i = 0; i < 100; i++) {
      bounds.push(new Bounds(i * 10, i * 10, 20, 20));
    }
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 100);

    for (let i = 0; i < bounds.length; i++) {
      assert(allHits.has(bounds[i]));
    }
  });

  it("Should handle Bounds with negative coordinates", () => {
    const quad = new QuadTree(new Bounds(-500, -500, 1000, 1000));
    const bounds = [
      new Bounds(-400, -400, 50, 50),
      new Bounds(-300, -300, 50, 50),
      new Bounds(-200, -200, 50, 50),
      new Bounds(-100, -100, 50, 50),
      new Bounds(0, 0, 50, 50),
    ];
    const allHits = new Set();

    for (let i = 0; i < bounds.length; i++) {
      const hits = quad.add(bounds[i]);
      if (hits.length > 0) allHits.add(bounds[i]);
      hits.forEach((hit) => allHits.add(hit));
    }

    assert(allHits.size === 0);
  });

  it("Should handle adding Bounds to already split QuadTree", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    quad.add(new Bounds(10, 10, 10, 10));
    quad.add(new Bounds(80, 80, 10, 10));
    const hits = quad.add(new Bounds(50, 50, 10, 10));
    assert(hits.length === 0);
  });

  it("Should handle Bounds touching QuadTree boundary", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds = new Bounds(0, 0, 100, 100);
    const hits = quad.add(bounds);
    assert(hits.length === 0);
  });

  it("Should handle Bounds partially overlapping multiple quadrants", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds = new Bounds(45, 45, 20, 20);
    const hits = quad.add(bounds);
    assert(hits.length === 0);
  });

  it("Should handle adding Bounds outside initial QuadTree boundary", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds = new Bounds(150, 150, 10, 10);
    const hits = quad.add(bounds);
    assert(hits.length === 0);
  });

  it("Should handle multiple overlapping Bounds", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds1 = new Bounds(20, 20, 30, 30);
    const bounds2 = new Bounds(25, 25, 30, 30);
    quad.add(bounds1);
    const hits = quad.add(bounds2);
    assert(hits.length === 1 && hits[0] === bounds1);
  });

  it("Should handle Bounds completely within a quadrant", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds1 = new Bounds(10, 10, 10, 10);
    const bounds2 = new Bounds(15, 15, 5, 5);
    quad.add(bounds1);
    const hits = quad.add(bounds2);
    assert(hits.length === 1 && hits[0] === bounds1);
  });

  it("Should handle Bounds exactly overlapping a quadrant boundary", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds = new Bounds(50, 50, 20, 20);
    const hits = quad.add(bounds);
    assert(hits.length === 0);
  });

  it("Should handle Bounds partially overlapping a quadrant boundary", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds1 = new Bounds(45, 45, 10, 10);
    const bounds2 = new Bounds(50, 50, 10, 10);
    quad.add(bounds1);
    const hits = quad.add(bounds2);
    assert(hits.length === 1 && hits[0] === bounds1);
  });

  it("Should handle large number of non-overlapping Bounds", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    for (let i = 1; i < 50; i++) {
      quad.add(new Bounds(i * 10, i * 10, 5, 5));
    }
    const allHits = new Set();
    quad.add(new Bounds(0, 0, 5, 5)).forEach((hit) => allHits.add(hit));
    assert(allHits.size === 0);
  });

  it("Should handle large number of overlapping Bounds", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const boundsList = [];
    for (let i = 0; i < 50; i++) {
      boundsList.push(new Bounds(i * 10, i * 10, 20, 20));
    }
    const allHits = new Set();
    boundsList.forEach((bounds) => {
      quad.add(bounds).forEach((hit) => allHits.add(hit));
    });
    assert(allHits.size > 0);
  });

  it("Should handle Bounds with zero width and height", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds = new Bounds(50, 50, 0, 0);
    const hits = quad.add(bounds);
    assert(hits.length === 0);
  });

  it("Should handle Bounds with very large size", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds = new Bounds(-50, -50, 200, 200);
    const hits = quad.add(bounds);
    assert(hits.length === 0);
  });

  it("Should handle adding the same Bounds multiple times", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds = new Bounds(10, 10, 10, 10);
    quad.add(bounds);
    const hits = quad.add(bounds);
    assert(hits.length === 1 && hits[0] === bounds);
  });

  it("Should handle Bounds with floating-point coordinates", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds = new Bounds(10.5, 10.5, 10.5, 10.5);
    const hits = quad.add(bounds);
    assert(hits.length === 0);
  });

  it("Should handle Bounds with negative width or height", () => {
    const quad = new QuadTree(new Bounds(0, 0, 100, 100));
    const bounds = new Bounds(10, 10, -10, -10);
    const hits = quad.add(bounds);
    assert(hits.length === 0);
  });
});
