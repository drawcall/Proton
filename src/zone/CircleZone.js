import Zone from "./Zone";
import MathUtil from "../math/MathUtil";

/**
 * Represents a circular zone in a 2D space.
 * @extends Zone
 */
export default class CircleZone extends Zone {
  /**
   * Creates a new CircleZone.
   * @param {number} x - The x-coordinate of the circle's center.
   * @param {number} y - The y-coordinate of the circle's center.
   * @param {number} [radius] - The radius of the circle.
   */
  constructor(x, y, radius) {
    super();

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = 0;
    this.center = { x, y };
  }

  /**
   * Gets a random position within the circle.
   * @returns {Object} An object with x and y coordinates.
   */
  getPosition() {
    this.angle = MathUtil.PIx2 * Math.random();
    this.randomRadius = Math.random() * this.radius;
    this.vector.x = this.x + this.randomRadius * Math.cos(this.angle);
    this.vector.y = this.y + this.randomRadius * Math.sin(this.angle);

    return this.vector;
  }

  /**
   * Sets the center of the circle.
   * @param {number} x - The new x-coordinate of the center.
   * @param {number} y - The new y-coordinate of the center.
   */
  setCenter(x, y) {
    this.center.x = x;
    this.center.y = y;
  }

  /**
   * Handles particle crossing behavior.
   * @param {Object} particle - The particle to check for crossing.
   */
  crossing(particle) {
    const d = particle.p.distanceTo(this.center);

    if (this.crossType === "dead") {
      if (d - particle.radius > this.radius) particle.dead = true;
    } else if (this.crossType === "bound") {
      if (d + particle.radius >= this.radius) this.getSymmetric(particle);
    } else if (this.crossType === "cross") {
      if (this.alert) {
        console.error("Sorry, CircleZone does not support cross method!");
        this.alert = false;
      }
    }
  }

  /**
   * Calculates the symmetric position of a particle.
   * @param {Object} particle - The particle to calculate symmetry for.
   */
  getSymmetric(particle) {
    const tha2 = particle.v.getGradient();
    const tha1 = this.getGradient(particle);

    const tha = 2 * (tha1 - tha2);
    const oldx = particle.v.x;
    const oldy = particle.v.y;

    particle.v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
    particle.v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
  }

  /**
   * Calculates the gradient for a particle.
   * @param {Object} particle - The particle to calculate the gradient for.
   * @returns {number} The calculated gradient.
   */
  getGradient(particle) {
    return -MathUtil.PI_2 + Math.atan2(particle.p.y - this.center.y, particle.p.x - this.center.x);
  }
}
