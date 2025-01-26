import Span from "../math/Span";
import Util from "../utils/Util";
import Behaviour from "./Behaviour";

/**
 * Rotate behaviour for controlling particle rotation.
 * @extends Behaviour
 */
export default class Rotate extends Behaviour {
  /**
   * @type {boolean}
   * @private
   */
  same;

  /**
   * @type {Span}
   * @private
   */
  a;

  /**
   * @type {Span}
   * @private
   */
  b;

  /**
   * @type {string}
   * @private
   */
  style;

  /**
   * @type {string}
   */
  name;

  /**
   * Creates a new Rotate instance.
   * @param {string|number|Span} [influence='Velocity'] - The rotation's influence or initial rotation.
   * @param {string|number|Span} [b] - The final rotation value or range.
   * @param {string} [style='to'] - The style of rotation ('to' or 'add').
   * @param {number} [life=Infinity] - This behaviour's life.
   * @param {string} [easing='easeLinear'] - This behaviour's easing function.
   */
  constructor(influence, b, style, life, easing) {
    super(life, easing);

    this.reset(influence, b, style);
    this.name = "Rotate";
  }

  /**
   * Resets this behaviour's parameters.
   * @param {string|number|Span} [a='Velocity'] - The rotation's influence or initial rotation.
   * @param {string|number|Span} [b] - The final rotation value or range.
   * @param {string} [style='to'] - The style of rotation ('to' or 'add').
   * @param {number} [life] - This behaviour's life.
   * @param {string} [easing] - This behaviour's easing function.
   */
  reset(a, b, style, life, easing) {
    this.same = b === null || b === undefined;

    this.a = Span.setSpanValue(Util.initValue(a, "Velocity"));
    this.b = Span.setSpanValue(Util.initValue(b, 0));
    this.style = Util.initValue(style, "to");

    life && super.reset(life, easing);
  }

  /**
   * Initializes the behaviour's parameters for a particle.
   * @param {object} particle - The particle to initialize.
   * @param {number} particle.rotation - The particle's rotation.
   * @param {object} particle.data - The particle's data object.
   */
  initialize(particle) {
    particle.rotation = this.a.getValue();
    particle.data.rotationA = this.a.getValue();

    if (!this.same) particle.data.rotationB = this.b.getValue();
  }

  /**
   * Applies this behaviour to a particle.
   * @param {object} particle - The particle to apply the behaviour to.
   * @param {number} time - The integrate time (1/ms).
   * @param {number} index - The particle index.
   */
  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);

    if (!this.same) {
      if (this.style === "to" || this.style === "TO" || this.style === "_") {
        particle.rotation +=
          particle.data.rotationB + (particle.data.rotationA - particle.data.rotationB) * this.energy;
      } else {
        particle.rotation += particle.data.rotationB;
      }
    } else if (this.a.a === "V" || this.a.a === "Velocity" || this.a.a === "v") {
      // beta...
      particle.rotation = particle.getDirection();
    }
  }
}
