import Proton from "../core/Proton";
import Span from "../math/Span";
import Util from "../utils/Util";
import Initialize from "./Initialize";
import Polar2D from "../math/Polar2D";
import MathUtil from "../math/MathUtil";

/**
 * Velocity class for initializing particle velocities.
 * @extends Initialize
 */
export default class Velocity extends Initialize {
  /**
   * @type {Span}
   * @private
   */
  rPan;

  /**
   * @type {Span}
   * @private
   */
  thaPan;

  /**
   * @type {string}
   */
  name;

  /**
   * Creates a new Velocity instance.
   * @param {number|Span} [rpan] - The radial component of the velocity or its range.
   * @param {number|Span} [thapan] - The angular component of the velocity or its range.
   * @param {string} [type='vector'] - The type of velocity ('vector' or 'polar').
   */
  constructor(rpan, thapan, type) {
    super();

    this.rPan = Span.setSpanValue(rpan);
    this.thaPan = Span.setSpanValue(thapan);
    this.type = Util.initValue(type, "vector");

    this.name = "Velocity";
  }

  /**
   * Resets the velocity parameters.
   * @param {number|Span} [rpan] - The radial component of the velocity or its range.
   * @param {number|Span} [thapan] - The angular component of the velocity or its range.
   * @param {string} [type='vector'] - The type of velocity ('vector' or 'polar').
   */
  reset(rpan, thapan, type) {
    this.rPan = Span.setSpanValue(rpan);
    this.thaPan = Span.setSpanValue(thapan);
    this.type = Util.initValue(type, "vector");
  }

  /**
   * Normalizes the velocity value.
   * @param {number} vr - The velocity value to normalize.
   * @returns {number} The normalized velocity value.
   * @private
   */
  normalizeVelocity(vr) {
    return vr * Proton.MEASURE;
  }

  /**
   * Initializes the particle's velocity.
   * @param {object} target - The particle to initialize.
   */
  initialize(target) {
    if (this.type === "p" || this.type === "P" || this.type === "polar") {
      const polar2d = new Polar2D(
        this.normalizeVelocity(this.rPan.getValue()),
        this.thaPan.getValue() * MathUtil.PI_180
      );

      target.v.x = polar2d.getX();
      target.v.y = polar2d.getY();
    } else {
      target.v.x = this.normalizeVelocity(this.rPan.getValue());
      target.v.y = this.normalizeVelocity(this.thaPan.getValue());
    }
  }
}
