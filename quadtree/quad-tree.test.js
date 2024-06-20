import assert from "assert";
import { QuadTree } from "./quad-tree.js";

describe("QuadTree", () => {
  it("Can create a Quad Tree", () => {
    assert(new QuadTree(new Bounds(0, 0, 1000, 1000)));
  });

  it("Will NOT create a QuadTree", () => {
    try {
      new QuadTree();
      assert(false);
    }

    catch (e) {
      assert(true);
    }
  });
});
