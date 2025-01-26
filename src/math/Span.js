import Util from "../utils/Util";
import MathUtil from "../math/MathUtil";

/**
 * Represents a span of values or an array.
 */
export default class Span {
  /**
   * @type {boolean}
   * @private
   */
  isArray;

  /**
   * @type {number|number[]}
   * @private
   */
  a;

  /**
   * @type {number}
   * @private
   */
  b;

  /**
   * @type {boolean}
   * @private
   */
  center;

  /**
   * Creates a new Span instance.
   * @param {number|number[]} a - The first value or an array of values.
   * @param {number} [b] - The second value (if a is not an array).
   * @param {boolean} [center=false] - Whether to use center-based calculation.
   */
  constructor(a, b, center) {
    if (Util.isArray(a)) {
      this.isArray = true;
      this.a = a;
    } else {
      this.isArray = false;
      this.a = Util.initValue(a, 1);
      this.b = Util.initValue(b, this.a);
      this.center = Util.initValue(center, false);
    }
  }

  /**
   * Gets a value from the span.
   * @param {boolean} [isInt=false] - Whether to return an integer value.
   * @returns {number} A random value from the span.
   */
  getValue(isInt = false) {
    if (this.isArray) {
      return Util.getRandFromArray(this.a);
    } else {
      if (!this.center) {
        return MathUtil.randomAToB(this.a, this.b, isInt);
      } else {
        return MathUtil.randomFloating(this.a, this.b, isInt);
      }
    }
  }

  /**
   * Returns a new Span object.
   * @param {*|Span} a - The first value or a Span object.
   * @param {*} [b] - The second value.
   * @param {*} [c] - The third value.
   * @returns {Span} A new Span instance.
   */
  static setSpanValue(a, b, c) {
    if (a instanceof Span) {
      return a;
    } else {
      if (b === undefined) {
        return new Span(a);
      } else {
        if (c === undefined) return new Span(a, b);
        else return new Span(a, b, c);
      }
    }
  }

  /**
   * Returns the value from a Span, if the param is not a Span it will return the given parameter.
   * @param {*|Span} pan - The value or Span to get the value from.
   * @returns {*} The value of Span OR the parameter if it is not a Span.
   */
  static getSpanValue(pan) {
    return pan instanceof Span ? pan.getValue() : pan;
  }
}
