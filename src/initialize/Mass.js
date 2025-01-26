import Span from "../math/Span";
import Initialize from "./Initialize";

/**
 * Mass class for initializing particle mass.
 * @extends Initialize
 */
export default class Mass extends Initialize {
  /**
   * @type {Span}
   * @private
   */
  massPan;

  /**
   * @type {string}
   */
  name;

  /**
   * Creates a new Mass instance.
   * @param {number|Span} a - The mass value or the lower bound of the mass range.
   * @param {number} [b] - The upper bound of the mass range (if a is a number).
   * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
   */
  constructor(a, b, c) {
    super();
    this.massPan = Span.setSpanValue(a, b, c);
    this.name = "Mass";
  }

  /**
   * Initializes the mass of a target particle.
   * @param {object} target - The target particle to initialize.
   */
  initialize(target) {
    target.mass = this.massPan.getValue();
  }
}
