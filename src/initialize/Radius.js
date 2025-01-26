import Span from "../math/Span";
import Initialize from "./Initialize";

/**
 * Radius class for initializing particle radius.
 * @extends Initialize
 */
export default class Radius extends Initialize {
  /**
   * @type {Span}
   */
  radius;

  /**
   * @type {string}
   */
  name;

  /**
   * Creates a new Radius instance.
   * @param {number|Span} a - The radius value or the lower bound of the radius range.
   * @param {number} [b] - The upper bound of the radius range (if a is a number).
   * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
   */
  constructor(a, b, c) {
    super();
    this.radius = Span.setSpanValue(a, b, c);
    this.name = "Radius";
  }

  /**
   * Resets this initializer's parameters.
   * @param {number|Span} a - The radius value or the lower bound of the radius range.
   * @param {number} [b] - The upper bound of the radius range (if a is a number).
   * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
   */
  reset(a, b, c) {
    this.radius = Span.setSpanValue(a, b, c);
  }

  /**
   * Initializes the particle's radius.
   * @param {Particle} particle - The particle to initialize.
   */
  initialize(particle) {
    particle.radius = this.radius.getValue();
    particle.data.oldRadius = particle.radius;
  }
}
