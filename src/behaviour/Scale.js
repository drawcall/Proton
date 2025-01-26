import Span from "../math/Span";
import Util from "../utils/Util";
import Behaviour from "./Behaviour";

/**
 * Scale behaviour for controlling particle size over time.
 * @extends Behaviour
 */
export default class Scale extends Behaviour {
  /**
   * @type {boolean}
   * @private
   */
  same;

  /**
   * @type {string}
   */
  name;

  /**
   * Creates a new Scale instance.
   * @param {number|Span} [a=1] - The initial scale value or range.
   * @param {number|Span} [b] - The final scale value or range. If not provided, it will be the same as 'a'.
   * @param {number} [life=Infinity] - This behaviour's life.
   * @param {string} [easing='easeLinear'] - This behaviour's easing function.
   */
  constructor(a, b, life, easing) {
    super(life, easing);

    this.reset(a, b);
    this.name = "Scale";
  }

  /**
   * Resets this behaviour's parameters.
   * @param {number|Span} a - The initial scale value or range.
   * @param {number|Span} [b] - The final scale value or range. If not provided, it will be the same as 'a'.
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
   * Initializes the particle's scale values.
   * @param {Particle} particle - The particle to initialize.
   */
  initialize(particle) {
    particle.data.scaleA = this.a.getValue();
    particle.data.oldRadius = particle.radius;
    particle.data.scaleB = this.same ? particle.data.scaleA : this.b.getValue();
  }

  /**
   * Applies the scale behaviour to the particle.
   * @param {Particle} particle - The particle to apply the behaviour to.
   * @param {number} time - The current simulation time.
   * @param {number} index - The index of the particle.
   */
  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);
    particle.scale = particle.data.scaleB + (particle.data.scaleA - particle.data.scaleB) * this.energy;

    if (particle.scale < 0.0001) particle.scale = 0;
    particle.radius = particle.data.oldRadius * particle.scale;
  }
}
