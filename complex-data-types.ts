class LinkedList {}

class Node {
  constructor(prev, next) {
    this.prev;
    this.next;
  }

  add(index) {}

  delete(index) {}

  get(index) {}
}

const list = new LinkedList();

for (let i = 0; i < 100; i++) {
  list.push(new Node());
}

const first = list.first;
let next = first;
let count;

while (next !== null) {
  next = next.next;
  count++;
}

const tree = new BinaryTree();
tree.buildRandomTree();

function walkTree(node, out = []) {
  if (node.left) walkTree(node.left, out);
  if (node.right) walkTree(node.right, out);
  out.push(node.value);
  return out;
}

function stack1() {
  const doThings = 2;
  stack2();
}

function stack2() {
  const doThings = 8;
  stack3();
}

function stack3() {
  const doThings = 9;
  stack4();
}

function stack4() {
  const doThings = 10;
  stack5();
}

function stack5() {
  const doThings = 11;
}

function stackOverflow() {
  stackOverflow();
}

const doThings = 5;
stack1();
console.log(doThings); // 5

function walkTree(node) {
  const next = node;
  const toProcess = [];

  while (next) {
    if (next.right) toProcess.push(next.right);
    if (next.left) toProcess.push(next.left);
    next = toProcess.pop();
  }
}

class Bounds {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  hitTest(testBounds: Bounds) {
    // return 1 if they overlap
    // return 0 if no intersection
    // return 2 if testBounds completely within this bounds
  }
}

// Population limit = 4

class QuadTree {
  bounds: Bounds;

  constructor(bounds: Bounds) {
    this.bounds = bounds;
  }

  add(child: Bounds): Bounds[] {
    return [];
  }
}

const quad = new QuadTree(new Bounds(0, 0, screen.width, screen.height));
const particles = new Array(50000);
const allHits = new Set();

particles.forEach((particle) => {
  const hits = quad.add(particle);
  hits.forEach((hit) => allHits.add(hit));
});

particles.forEach((particle) => {
  if (allHits.has(particle)) renderRed(particle);
  else renderBlue(particle);
});
