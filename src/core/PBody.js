import Vector2D from "../math/Vector2D";

export default class RBody {
  /** @type {Vector2D} */
  p = null;

  /** @type {Vector2D} */
  v = null;

  /** @type {Vector2D} */
  a = null;

  constructor() {
    this.p = new Vector2D(0, 0);
    this.v = new Vector2D(0, 0);
    this.a = new Vector2D(0, 0);
  }

  reset() {
    this.p.set(0, 0);
    this.v.set(0, 0);
    this.a.set(0, 0);
  }

  destroy() {
    this.p = null;
    this.v = null;
    this.a = null;
  }
}
