import ColorUtil from "../utils/ColorUtil";
import ArraySpan from "../math/ArraySpan";
import Behaviour from "./Behaviour";

export default class Color extends Behaviour {
  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Color
   *
   * @param {Proton.ArraySpan | String} a the string should be a hex e.g. #000000 for black
   * @param {Proton.ArraySpan | String} b the string should be a hex e.g. #000000 for black
   * @param {Number} [life=Infinity] 	this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(a, b, life, easing) {
    super(life, easing);

    this.reset(a, b);
    this.name = "Color";
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Color
   * @instance
   *
   * @param {Proton.ArraySpan | String} a the string should be a hex e.g. #000000 for black
   * @param {Proton.ArraySpan | String} b the string should be a hex e.g. #000000 for black
   * @param {Number} [life=Infinity] 	this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   */
  reset(a, b, life, easing) {
    this.a = ArraySpan.createArraySpan(a);
    this.b = ArraySpan.createArraySpan(b);
    life && super.reset(life, easing);
  }

  /**
   * Initialize the behaviour's parameters for all particles
   *
   * @method initialize
   * @memberof Proton#Proton.Color
   * @instance
   *
   * @param {Proton.Particle} particle
   */
  initialize(particle) {
    particle.color = this.a.getValue();
    particle.data.colorA = ColorUtil.hexToRgb(particle.color);

    if (this.b) particle.data.colorB = ColorUtil.hexToRgb(this.b.getValue());
  }

  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton#Proton.Color
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} the integrate time 1/ms
   * @param {Int} the particle index
   */
  applyBehaviour(particle, time, index) {
    if (this.b) {
      this.calculate(particle, time, index);

      particle.rgb.r =
        particle.data.colorB.r +
        (particle.data.colorA.r - particle.data.colorB.r) * this.energy;
      particle.rgb.g =
        particle.data.colorB.g +
        (particle.data.colorA.g - particle.data.colorB.g) * this.energy;
      particle.rgb.b =
        particle.data.colorB.b +
        (particle.data.colorA.b - particle.data.colorB.b) * this.energy;

      particle.rgb.r = Math.floor(particle.rgb.r);
      particle.rgb.g = Math.floor(particle.rgb.g);
      particle.rgb.b = Math.floor(particle.rgb.b);
    } else {
      particle.rgb.r = particle.data.colorA.r;
      particle.rgb.g = particle.data.colorA.g;
      particle.rgb.b = particle.data.colorA.b;
    }
  }
}
