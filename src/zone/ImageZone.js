import Zone from "./Zone";
import Util from "../utils/Util";

/**
 * Represents a zone based on image data.
 * @extends Zone
 */
export default class ImageZone extends Zone {
  /**
   * Creates an ImageZone.
   * @param {ImageData} imageData - The image data to use for the zone.
   * @param {number} [x=0] - The x-coordinate offset.
   * @param {number} [y=0] - The y-coordinate offset.
   * @param {number} [d=2] - The sampling density.
   */
  constructor(imageData, x, y, d) {
    super();
    this.reset(imageData, x, y, d);
  }

  /**
   * Resets the ImageZone with new parameters.
   * @param {ImageData} imageData - The image data to use for the zone.
   * @param {number} [x=0] - The x-coordinate offset.
   * @param {number} [y=0] - The y-coordinate offset.
   * @param {number} [d=2] - The sampling density.
   */
  reset(imageData, x, y, d) {
    this.imageData = imageData;
    this.x = Util.initValue(x, 0);
    this.y = Util.initValue(y, 0);
    this.d = Util.initValue(d, 2);

    this.vectors = [];
    this.setVectors();
  }

  /**
   * Sets up vectors based on the image data.
   * @returns {Object} The vector object.
   */
  setVectors() {
    let i, j;
    const length1 = this.imageData.width;
    const length2 = this.imageData.height;

    for (i = 0; i < length1; i += this.d) {
      for (j = 0; j < length2; j += this.d) {
        let index = ((j >> 0) * length1 + (i >> 0)) * 4;

        if (this.imageData.data[index + 3] > 0) {
          this.vectors.push({ x: i + this.x, y: j + this.y });
        }
      }
    }

    return this.vector;
  }

  /**
   * Checks if a point is within the bounds of the image.
   * @param {number} x - The x-coordinate to check.
   * @param {number} y - The y-coordinate to check.
   * @returns {boolean} True if the point is within bounds, false otherwise.
   */
  getBound(x, y) {
    const index = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
    return this.imageData.data[index + 3] > 0;
  }

  /**
   * Gets a random position within the image zone.
   * @returns {Object} A vector representing the position.
   */
  getPosition() {
    const vector = Util.getRandFromArray(this.vectors);
    return this.vector.copy(vector);
  }

  /**
   * Gets the color at a specific point in the image.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @returns {Object} An object containing r, g, b, and a values.
   */
  getColor(x, y) {
    x -= this.x;
    y -= this.y;
    const i = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;

    return {
      r: this.imageData.data[i],
      g: this.imageData.data[i + 1],
      b: this.imageData.data[i + 2],
      a: this.imageData.data[i + 3]
    };
  }

  /**
   * Handles particle crossing behavior.
   * @param {Object} particle - The particle to check for crossing.
   */
  crossing(particle) {
    if (this.crossType === "dead") {
      particle.dead = this.getBound(particle.p.x - this.x, particle.p.y - this.y);
    } else if (this.crossType === "bound") {
      if (!this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.v.negate();
    }
  }

  /**
   * Destroys the ImageZone and cleans up resources.
   */
  destroy() {
    super.destroy();
    this.imageData = null;
  }
}
