import Vector2D from "./Vector2D";

export default class Polar2D {
  constructor(r, tha) {
    this.r = Math.abs(r) || 0;
    this.tha = tha || 0;
  }

  set(r, tha) {
    this.r = r;
    this.tha = tha;
    return this;
  }

  setR(r) {
    this.r = r;
    return this;
  }

  setTha(tha) {
    this.tha = tha;
    return this;
  }

  copy(p) {
    this.r = p.r;
    this.tha = p.tha;
    return this;
  }

  toVector() {
    return new Vector2D(this.getX(), this.getY());
  }

  getX() {
    return this.r * Math.sin(this.tha);
  }

  getY() {
    return -this.r * Math.cos(this.tha);
  }

  normalize() {
    this.r = 1;
    return this;
  }

  equals(v) {
    return v.r === this.r && v.tha === this.tha;
  }

  clear() {
    this.r = 0.0;
    this.tha = 0.0;
    return this;
  }

  clone() {
    return new Polar2D(this.r, this.tha);
  }
}
