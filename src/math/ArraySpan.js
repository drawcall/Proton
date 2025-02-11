import Span from "./Span";
import Util from "../utils/Util";
import MathUtil from "./MathUtil";

/**
 * Represents an ArraySpan, a subclass of Span that works with arrays.
 * @extends Span
 */
export default class ArraySpan extends Span {
  /**
   * Creates an instance of ArraySpan.
   * @param {Array|*|any} arr - The array or value to be converted to an array.
   */
  constructor(arr) {
    super();
    this._arr = Util.toArray(arr);
  }

  /**
   * Gets a random value from the array.
   * If the value is "random" or "Random", it returns a random color.
   * @returns {*} A random value from the array or a random color.
   */
  getValue() {
    const val = Util.getRandFromArray(this._arr);
    return val === "random" || val === "Random" ? MathUtil.randomColor() : val;
  }

  /**
   * Creates an ArraySpan instance from the given array.
   * If the input is already an ArraySpan instance, it returns the input.
   * @static
   * @param {Array|ArraySpan|any} arr - The array or ArraySpan instance.
   * @returns {ArraySpan|null} A new ArraySpan instance or null if the input is falsy.
   */
  static createArraySpan(arr) {
    if (!arr) return null;

    if (arr instanceof ArraySpan) return arr;
    else return new ArraySpan(arr);
  }
}

