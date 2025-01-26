import Zone from "./Zone";
import Util from "../utils/Util";
import MathUtil from "../math/MathUtil";
import Vector2D from "../math/Vector2D";

/**
 * Represents a line zone for particle systems.
 * @extends Zone
 */
export default class LineZone extends Zone {
  /**
   * Creates a new LineZone.
   * @param {number} x1 - The x-coordinate of the first point.
   * @param {number} y1 - The y-coordinate of the first point.
   * @param {number} [x2] - The x-coordinate of the second point.
   * @param {number} [y2] - The y-coordinate of the second point.
   * @param {string} [direction=">"] - The direction of the line.
   */
  constructor(x1, y1, x2, y2, direction = ">") {
    super();

    if (x2 - x1 >= 0) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
    } else {
      this.x1 = x2;
      this.y1 = y2;
      this.x2 = x1;
      this.y2 = y1;
    }

    this.dx = this.x2 - this.x1;
    this.dy = this.y2 - this.y1;

    this.minx = Math.min(this.x1, this.x2);
    this.miny = Math.min(this.y1, this.y2);
    this.maxx = Math.max(this.x1, this.x2);
    this.maxy = Math.max(this.y1, this.y2);

    this.dot = this.x2 * this.y1 - this.x1 * this.y2;
    this.xxyy = this.dx * this.dx + this.dy * this.dy;

    this.gradient = this.getGradient();
    this.length = this.getLength();
    this.direction = Util.initValue(direction, ">");
  }

  /**
   * Gets a random position on the line.
   * @returns {Vector2D} A vector representing the random position.
   */
  getPosition() {
    this.random = Math.random();
    this.vector.x = this.x1 + this.random * this.length * Math.cos(this.gradient);
    this.vector.y = this.y1 + this.random * this.length * Math.sin(this.gradient);

    return this.vector;
  }

  /**
   * Determines which side of the line a point is on.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   * @returns {boolean} True if the point is on the positive side of the line, false otherwise.
   */
  getDirection(x, y) {
    const A = this.dy;
    const B = -this.dx;
    const C = this.dot;
    const D = B === 0 ? 1 : B;

    if ((A * x + B * y + C) * D > 0) return true;
    else return false;
  }

  /**
   * Calculates the distance of a point from the line.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   * @returns {number} The distance from the point to the line.
   */
  getDistance(x, y) {
    const A = this.dy;
    const B = -this.dx;
    const C = this.dot;
    const D = A * x + B * y + C;

    return D / Math.sqrt(this.xxyy);
  }

  /**
   * Calculates the symmetric vector of a given vector with respect to the line.
   * @param {Vector2D} v - The vector to reflect.
   * @returns {Vector2D} The reflected vector.
   */
  getSymmetric(v) {
    const tha2 = v.getGradient();
    const tha1 = this.getGradient();
    const tha = 2 * (tha1 - tha2);

    const oldx = v.x;
    const oldy = v.y;

    v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
    v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);

    return v;
  }

  /**
   * Gets the gradient (angle) of the line.
   * @returns {number} The gradient of the line in radians.
   */
  getGradient() {
    return Math.atan2(this.dy, this.dx);
  }

  /**
   * Checks if a particle is outside the range of the line.
   * @param {Particle} particle - The particle to check.
   * @returns {boolean} True if the particle is within range, false otherwise.
   */
  rangeOut(particle) {
    const angle = Math.abs(this.getGradient());

    if (angle <= MathUtil.PI / 4) {
      if (particle.p.x <= this.maxx && particle.p.x >= this.minx) return true;
    } else {
      if (particle.p.y <= this.maxy && particle.p.y >= this.miny) return true;
    }

    return false;
  }

  /**
   * Gets the length of the line.
   * @returns {number} The length of the line.
   */
  getLength() {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }

  /**
   * Handles particle crossing behavior based on the crossType.
   * @param {Particle} particle - The particle to check for crossing.
   */
  crossing(particle) {
    if (this.crossType === "dead") {
      if (this.direction === ">" || this.direction === "R" || this.direction === "right" || this.direction === "down") {
        if (!this.rangeOut(particle)) return;
        if (this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
      } else {
        if (!this.rangeOut(particle)) return;
        if (!this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
      }
    } else if (this.crossType === "bound") {
      if (!this.rangeOut(particle)) return;

      if (this.getDistance(particle.p.x, particle.p.y) <= particle.radius) {
        if (this.dx === 0) {
          particle.v.x *= -1;
        } else if (this.dy === 0) {
          particle.v.y *= -1;
        } else {
          this.getSymmetric(particle.v);
        }
      }
    } else if (this.crossType === "cross") {
      if (this.alert) {
        console.error("Sorry, LineZone does not support cross method!");
        this.alert = false;
      }
    }
  }
}
