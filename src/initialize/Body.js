import Util from "../utils/Util";
import ArraySpan from "../math/ArraySpan";
import Initialize from "./Initialize";

/**
 * Body class for initializing particle bodies.
 * @extends Initialize
 */
export default class Body extends Initialize {
  /**
   * @type {ArraySpan}
   * @private
   */
  image;

  /**
   * @type {string}
   */
  name;

  /**
   * Creates a new Body instance.
   * @param {string|object|ArraySpan} image - The image source or object to use for the particle body.
   * @param {number} [w=20] - The width of the particle body.
   * @param {number} [h] - The height of the particle body. Defaults to the width if not provided.
   */
  constructor(image, w, h) {
    super();

    this.image = this.setSpanValue(image);
    this.w = Util.initValue(w, 20);
    this.h = Util.initValue(h, this.w);
    this.name = "Body";
  }

  /**
   * Initializes the particle's body.
   * @param {object} particle - The particle to initialize.
   */
  initialize(particle) {
    const imageTarget = this.image.getValue();

    if (typeof imageTarget === "string") {
      particle.body = {
        width: this.w,
        height: this.h,
        src: imageTarget,
        isInner: true,
        inner: true
      };
    } else {
      particle.body = imageTarget;
    }
  }

  /**
   * Sets the span value for the image.
   * @param {string|object|ArraySpan} image - The image source or object to set as span value.
   * @returns {ArraySpan} The ArraySpan instance.
   * @private
   */
  setSpanValue(image) {
    return image instanceof ArraySpan ? image : new ArraySpan(image);
  }
}
