import MathUtil from "../math/MathUtil";

export default class Vector2D {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
    this.y = y;
    return this;
  }

  getGradient() {
    if (this.x !== 0) return Math.atan2(this.y, this.x);
    else if (this.y > 0) return MathUtil.PI_2;
    else if (this.y < 0) return -MathUtil.PI_2;
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;

    return this;
  }

  add(v, w) {
    if (w !== undefined) {
      return this.addVectors(v, w);
    }

    this.x += v.x;
    this.y += v.y;

    return this;
  }

  addXY(a, b) {
    this.x += a;
    this.y += b;

    return this;
  }

  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;

    return this;
  }

  sub(v, w) {
    if (w !== undefined) {
      return this.subVectors(v, w);
    }

    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;

    return this;
  }

  divideScalar(s) {
    if (s !== 0) {
      this.x /= s;
      this.y /= s;
    } else {
      this.set(0, 0);
    }

    return this;
  }

  multiplyScalar(s) {
    this.x *= s;
    this.y *= s;

    return this;
  }

  negate() {
    return this.multiplyScalar(-1);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    return this.divideScalar(this.length());
  }

  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }

  rotate(tha) {
    const x = this.x;
    const y = this.y;

    this.x = x * Math.cos(tha) + y * Math.sin(tha);
    this.y = -x * Math.sin(tha) + y * Math.cos(tha);

    return this;
  }

  distanceToSquared(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return dx * dx + dy * dy;
  }

  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;

    return this;
  }

  equals(v) {
    return v.x === this.x && v.y === this.y;
  }

  clear() {
    this.x = 0.0;
    this.y = 0.0;
    return this;
  }

  clone() {
    return new Vector2D(this.x, this.y);
  }
}
