import assert from "assert";
import { QuadTree } from "./quad-tree.js";

describe("QuadTree", () => {
  it("Can create a Quad Tree", () => {
    assert(new QuadTree());
  });
});
