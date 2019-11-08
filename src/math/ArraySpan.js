import Span from "./Span";
import Util from "../utils/Util";
import MathUtil from "./MathUtil";

export default class ArraySpan extends Span {
  constructor(color) {
    super();
    this._arr = Util.toArray(color);
  }

  getValue() {
    const val = Util.getRandFromArray(this._arr);
    return val === "random" || val === "Random" ? MathUtil.randomColor() : val;
  }

  /**
   * Make sure that the color is an instance of Proton.ArraySpan, if not it makes a new instance
   *
   * @method setSpanValue
   * @memberof Proton#Proton.Color
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} the integrate time 1/ms
   * @param {Int} the particle index
   */
  static createArraySpan(arr) {
    if (!arr) return null;

    if (arr instanceof ArraySpan) return arr;
    else return new ArraySpan(arr);
  }
}
