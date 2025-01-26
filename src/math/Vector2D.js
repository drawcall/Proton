import MathUtil from "../math/MathUtil";

export default class Vector2D {
  /** @type {number} */
  x;

  /** @type {number} */
  y;

  /**
   * Creates a new Vector2D instance.
   * @param {number} [x=0] - The x coordinate.
   * @param {number} [y=0] - The y coordinate.
   */
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  /**
   * Sets the x and y components of this vector.
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   * @returns {Vector2D} This vector.
   */
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Sets the x component of this vector.
   * @param {number} x - The x coordinate.
   * @returns {Vector2D} This vector.
   */
  setX(x) {
    this.x = x;
    return this;
  }

  /**
   * Sets the y component of this vector.
   * @param {number} y - The y coordinate.
   * @returns {Vector2D} This vector.
   */
  setY(y) {
    this.y = y;
    return this;
  }

  /**
   * Calculates the gradient (angle) of this vector.
   * @returns {number} The gradient in radians.
   */
  getGradient() {
    if (this.x !== 0) return Math.atan2(this.y, this.x);
    else if (this.y > 0) return MathUtil.PI_2;
    else if (this.y < 0) return -MathUtil.PI_2;
  }

  /**
   * Copies the values of another vector to this one.
   * @param {Vector2D} v - The vector to copy from.
   * @returns {Vector2D} This vector.
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;

    return this;
  }

  /**
   * Adds another vector to this one.
   * @param {Vector2D} v - The vector to add.
   * @param {Vector2D} [w] - An optional second vector to add.
   * @returns {Vector2D} This vector.
   */
  add(v, w) {
    if (w !== undefined) {
      return this.addVectors(v, w);
    }

    this.x += v.x;
    this.y += v.y;

    return this;
  }

  /**
   * Adds scalar values to this vector's components.
   * @param {number} a - Value to add to x.
   * @param {number} b - Value to add to y.
   * @returns {Vector2D} This vector.
   */
  addXY(a, b) {
    this.x += a;
    this.y += b;

    return this;
  }

  /**
   * Adds two vectors and sets the result to this vector.
   * @param {Vector2D} a - The first vector to add.
   * @param {Vector2D} b - The second vector to add.
   * @returns {Vector2D} This vector.
   */
  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;

    return this;
  }

  /**
   * Subtracts another vector from this one.
   * @param {Vector2D} v - The vector to subtract.
   * @param {Vector2D} [w] - An optional second vector to subtract.
   * @returns {Vector2D} This vector.
   */
  sub(v, w) {
    if (w !== undefined) {
      return this.subVectors(v, w);
    }

    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  /**
   * Subtracts one vector from another and sets the result to this vector.
   * @param {Vector2D} a - The vector to subtract from.
   * @param {Vector2D} b - The vector to subtract.
   * @returns {Vector2D} This vector.
   */
  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;

    return this;
  }

  /**
   * Divides this vector by a scalar.
   * @param {number} s - The scalar to divide by.
   * @returns {Vector2D} This vector.
   */
  divideScalar(s) {
    if (s !== 0) {
      this.x /= s;
      this.y /= s;
    } else {
      this.set(0, 0);
    }

    return this;
  }

  /**
   * Multiplies this vector by a scalar.
   * @param {number} s - The scalar to multiply by.
   * @returns {Vector2D} This vector.
   */
  multiplyScalar(s) {
    this.x *= s;
    this.y *= s;

    return this;
  }

  /**
   * Negates this vector (inverts its direction).
   * @returns {Vector2D} This vector.
   */
  negate() {
    return this.multiplyScalar(-1);
  }

  /**
   * Calculates the dot product of this vector with another.
   * @param {Vector2D} v - The other vector.
   * @returns {number} The dot product.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Calculates the squared length of this vector.
   * @returns {number} The squared length.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Calculates the length of this vector.
   * @returns {number} The length.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Normalizes this vector (makes it unit length).
   * @returns {Vector2D} This vector.
   */
  normalize() {
    return this.divideScalar(this.length());
  }

  /**
   * Calculates the distance to another vector.
   * @param {Vector2D} v - The other vector.
   * @returns {number} The distance.
   */
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }

  /**
   * Rotates this vector by an angle.
   * @param {number} tha - The angle to rotate by (in radians).
   * @returns {Vector2D} This vector.
   */
  rotate(tha) {
    const x = this.x;
    const y = this.y;

    this.x = x * Math.cos(tha) + y * Math.sin(tha);
    this.y = -x * Math.sin(tha) + y * Math.cos(tha);

    return this;
  }

  /**
   * Calculates the squared distance to another vector.
   * @param {Vector2D} v - The other vector.
   * @returns {number} The squared distance.
   */
  distanceToSquared(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return dx * dx + dy * dy;
  }

  /**
   * Linearly interpolates this vector toward another vector.
   * @param {Vector2D} v - The target vector.
   * @param {number} alpha - The interpolation factor (0-1).
   * @returns {Vector2D} This vector.
   */
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;

    return this;
  }

  /**
   * Checks if this vector is equal to another vector.
   * @param {Vector2D} v - The other vector.
   * @returns {boolean} True if the vectors are equal, false otherwise.
   */
  equals(v) {
    return v.x === this.x && v.y === this.y;
  }

  /**
   * Sets this vector to zero.
   * @returns {Vector2D} This vector.
   */
  clear() {
    this.x = 0.0;
    this.y = 0.0;
    return this;
  }

  /**
   * Creates a new vector with the same x and y values as this one.
   * @returns {Vector2D} A new Vector2D instance.
   */
  clone() {
    return new Vector2D(this.x, this.y);
  }
}
