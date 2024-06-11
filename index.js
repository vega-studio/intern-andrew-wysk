import { Pong } from "./pong.js";
export class Index {
  constructor() {
    this.game = new Pong("game-board");
  }
  // Allows access to objects in pong from other classes
  static getGame() {
    return this.game;
  }
}
