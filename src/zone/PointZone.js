import Zone from "./Zone";

/**
 * Represents a point zone in a 2D space.
 * @extends Zone
 */
export default class PointZone extends Zone {
  /**
   * Creates a new PointZone.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   */
  constructor(x, y) {
    super();

    /**
     * The x-coordinate of the point.
     * @type {number}
     */
    this.x = x;

    /**
     * The y-coordinate of the point.
     * @type {number}
     */
    this.y = y;
  }

  /**
   * Gets the position of the point.
   * @returns {Object} An object representing the position vector.
   */
  getPosition() {
    this.vector.x = this.x;
    this.vector.y = this.y;

    return this.vector;
  }

  /**
   * This method is not supported for PointZone.
   * @param {Object} particle - The particle object (unused).
   */
  crossing(particle) {
    if (this.alert) {
      console.error("Sorry, PointZone does not support crossing method!");
      this.alert = false;
    }
  }
}
