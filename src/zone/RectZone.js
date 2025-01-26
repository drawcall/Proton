import Zone from "./Zone";

/**
 * Represents a rectangular zone for particle systems.
 * @extends Zone
 */
export default class RectZone extends Zone {
  /**
   * Creates a new RectZone.
   * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
   * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
   * @param {number} [width] - The width of the rectangle.
   * @param {number} [height] - The height of the rectangle.
   */
  constructor(x, y, width = 200, height = 200) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * Gets a random position within the rectangular zone.
   * @returns {Vector2D} A vector representing the random position.
   */
  getPosition() {
    this.vector.x = this.x + Math.random() * this.width;
    this.vector.y = this.y + Math.random() * this.height;
    return this.vector;
  }

  /**
   * Handles particle crossing behavior based on the crossType.
   * @param {Particle} particle - The particle to check for crossing.
   */
  crossing(particle) {
    // particle dead zone
    if (this.crossType === "dead") {
      if (particle.p.x + particle.radius < this.x) particle.dead = true;
      else if (particle.p.x - particle.radius > this.x + this.width) particle.dead = true;

      if (particle.p.y + particle.radius < this.y) particle.dead = true;
      else if (particle.p.y - particle.radius > this.y + this.height) particle.dead = true;
    }

    // particle bound zone
    else if (this.crossType === "bound") {
      if (particle.p.x - particle.radius < this.x) {
        particle.p.x = this.x + particle.radius;
        particle.v.x *= -1;
      } else if (particle.p.x + particle.radius > this.x + this.width) {
        particle.p.x = this.x + this.width - particle.radius;
        particle.v.x *= -1;
      }

      if (particle.p.y - particle.radius < this.y) {
        particle.p.y = this.y + particle.radius;
        particle.v.y *= -1;
      } else if (particle.p.y + particle.radius > this.y + this.height) {
        particle.p.y = this.y + this.height - particle.radius;
        particle.v.y *= -1;
      }
    }

    // particle cross zone
    else if (this.crossType === "cross") {
      if (particle.p.x + particle.radius < this.x && particle.v.x <= 0) {
        particle.p.x = this.x + this.width + particle.radius;
      } else if (particle.p.x - particle.radius > this.x + this.width && particle.v.x >= 0) {
        particle.p.x = this.x - particle.radius;
      }

      if (particle.p.y + particle.radius < this.y && particle.v.y <= 0) {
        particle.p.y = this.y + this.height + particle.radius;
      } else if (particle.p.y - particle.radius > this.y + this.height && particle.v.y >= 0) {
        particle.p.y = this.y - particle.radius;
      }
    }
  }
}
