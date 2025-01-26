import Util from "../utils/Util";
import Span from "../math/Span";
import Behaviour from "./Behaviour";

/**
 * Alpha behaviour for controlling particle opacity over time.
 * @extends Behaviour
 */
export default class Alpha extends Behaviour {
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
   */
  name;

  /**
   * Creates a new Alpha instance.
   * @param {number|Span} [a=1] - The initial alpha value or range.
   * @param {number|Span} [b] - The final alpha value or range. If not provided, it will be the same as 'a'.
   * @param {number} [life=Infinity] - This behaviour's life.
   * @param {string} [easing='easeLinear'] - This behaviour's easing function.
   */
  constructor(a, b, life, easing) {
    super(life, easing);

    this.reset(a, b);
    this.name = "Alpha";
  }

  /**
   * Resets this behaviour's parameters.
   * @param {number|Span} [a=1] - The initial alpha value or range.
   * @param {number|Span} [b] - The final alpha value or range. If not provided, it will be the same as 'a'.
   * @param {number} [life] - This behaviour's life.
   * @param {string} [easing] - This behaviour's easing function.
   */
  reset(a, b, life, easing) {
    this.same = b === null || b === undefined;
    this.a = Span.setSpanValue(Util.initValue(a, 1));
    this.b = Span.setSpanValue(b);

    life && super.reset(life, easing);
  }

  /**
   * Initializes the particle's alpha values.
   * @param {Particle} particle - The particle to initialize.
   */
  initialize(particle) {
    particle.data.alphaA = this.a.getValue();

    if (this.same) particle.data.alphaB = particle.data.alphaA;
    else particle.data.alphaB = this.b.getValue();
  }

  /**
   * Applies the alpha behaviour to the particle.
   * @param {Particle} particle - The particle to apply the behaviour to.
   * @param {number} time - The current simulation time.
   * @param {number} index - The index of the particle.
   */
  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);

    particle.alpha = particle.data.alphaB + (particle.data.alphaA - particle.data.alphaB) * this.energy;

    if (particle.alpha < 0.001) particle.alpha = 0;
  }
}
