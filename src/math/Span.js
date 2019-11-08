import Util from "../utils/Util";
import MathUtil from "../math/MathUtil";

export default class Span {
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
   * Returns a new Span object
   *
   * @memberof Proton#Proton.Util
   * @method setSpanValue
   *
   * @todo a, b and c should be 'Mixed' or 'Number'?
   *
   * @param {Mixed | Span} a
   * @param {Mixed}               b
   * @param {Mixed}               c
   *
   * @return {Span}
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
   * Returns the value from a Span, if the param is not a Span it will return the given parameter
   *
   * @memberof Proton#Proton.Util
   * @method getValue
   *
   * @param {Mixed | Span} pan
   *
   * @return {Mixed} the value of Span OR the parameter if it is not a Span
   */
  static getSpanValue(pan) {
    return pan instanceof Span ? pan.getValue() : pan;
  }
}
