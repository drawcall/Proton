import Span from "../math/Span";
import Initialize from "./Initialize";

/**
 * Life class for initializing particle lifetime.
 * @extends Initialize
 */
export default class Life extends Initialize {
  /**
   * @type {Span}
   * @private
   */
  lifePan;

  /**
   * @type {string}
   */
  name;

  /**
   * Creates a new Life instance.
   * @param {number|Span} a - The lifetime value or the lower bound of the lifetime range.
   * @param {number} [b] - The upper bound of the lifetime range (if a is a number).
   * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
   */
  constructor(a, b, c) {
    super();

    this.lifePan = Span.setSpanValue(a, b, c);
    this.name = "Life";
  }

  /**
   * Initializes the lifetime of a target particle.
   * @param {object} target - The target particle to initialize.
   */
  initialize(target) {
    if (this.lifePan.a === Infinity) target.life = Infinity;
    else target.life = this.lifePan.getValue();
  }
}
