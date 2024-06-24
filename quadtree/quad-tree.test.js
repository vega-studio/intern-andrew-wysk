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

  it("None1", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const none1 = [new Bounds(0, 0, 5, 5), new Bounds(995, 995, 5, 5)];
    quad.add(none1[0]);
    quad.add(none1[1]);
    assert(none1[0].hitTest(none1[1]) === 0);
  });
  it("None2", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const none2 = [new Bounds(500, 500, 5, 5), new Bounds(0, 500, 5, 5)];
    quad.add(none2[0]);
    quad.add(none2[1]);
    assert(none2[0].hitTest(none2[1]) === 0);
  });
  it("None3", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const none3 = [new Bounds(0, 0, 5, 5), new Bounds(6, 6, 5, 5)];
    quad.add(none3[0]);
    quad.add(none3[1]);
    assert(none3[0].hitTest(none3[1]) === 0);
  });
  it("InterBasic1", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const interb1 = [new Bounds(0, 0, 5, 5), new Bounds(0, 0, 10, 10)];
    quad.add(interb1[0]);
    quad.add(interb1[1]);
    assert(interb1[0].hitTest(interb1[1]) === 1);
  });
  it("InterBasic2", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const interb2 = [new Bounds(500, 500, 5, 10), new Bounds(500, 505, 10, 5)];
    quad.add(interb2[0]);
    quad.add(interb2[1]);
    assert(interb2[0].hitTest(interb2[1]) === 1);
  });
  it("InterBasic3", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const interb3 = [
      new Bounds(0, 0, 550, 550),
      new Bounds(450, 450, 500, 500),
    ];
    quad.add(interb3[0]);
    quad.add(interb3[1]);
    assert(interb3[0].hitTest(interb3[1]) === 1);
  });
  it("Inter1", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const inter1 = [new Bounds(0, 0, 5, 5), new Bounds(4, 4, 5, 5)];
    quad.add(inter1[0]);
    quad.add(inter1[1]);
    assert(inter1[0].hitTest(inter1[1]) === 1);
  });
  it("Inter2", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const inter2 = [new Bounds(500, 500, 5, 5), new Bounds(504, 504, 5, 5)];
    quad.add(inter2[0]);
    quad.add(inter2[1]);
    assert(inter2[0].hitTest(inter2[1]) === 1);
  });
  it("Inter3", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const inter3 = [new Bounds(0, 500, 5, 5), new Bounds(4, 504, 5, 5)];
    quad.add(inter3[0]);
    quad.add(inter3[1]);
    assert(inter3[0].hitTest(inter3[1]) === 1);
  });
  it("Inter4", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const inter4 = [new Bounds(0, 0, 5, 5), new Bounds(4, 0, 5, 5)];
    quad.add(inter4[0]);
    quad.add(inter4[1]);
    assert(inter4[0].hitTest(inter4[1]) === 1);
  });
  it("Full1", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const full1 = [new Bounds(0, 0, 5, 5), new Bounds(0, 0, 5, 5)];
    quad.add(full1[0]);
    quad.add(full1[1]);
    assert(full1[0].hitTest(full1[1]) === 2);
  });
  it("Full2", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const full2 = [new Bounds(500, 500, 10, 10), new Bounds(505, 505, 5, 5)];
    quad.add(full2[0]);
    quad.add(full2[1]);
    assert(full2[0].hitTest(full2[1]) === 2);
  });
  it("Full3", () => {
    const quad = new QuadTree(new Bounds(0, 0, 1000, 1000));
    const full3 = [new Bounds(500, 0, 10, 10), new Bounds(505, 0, 5, 5)];
    quad.add(full3[0]);
    quad.add(full3[1]);
    assert(full3[0].hitTest(full3[1]) === 2);
  });
});
