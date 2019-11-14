import MathUtil from "../math/MathUtil";
import Vector2D from "../math/Vector2D";
import Span from "../math/Span";
import Behaviour from "./Behaviour";

const CHANGING = "changing";

export default class Cyclone extends Behaviour {
  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Cyclone
   *
   * @param {Number} angle
   * @param {Number} force
   * @param {Number} [life=Infinity] 			this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(angle, force, life, easing) {
    super(life, easing);
    this.setAngleAndForce(angle, force);
    this.name = "Cyclone";
  }

  setAngleAndForce(angle, force) {
    this.force = CHANGING;
    this.angle = MathUtil.PI / 2;

    if (angle === "right") {
      this.angle = MathUtil.PI / 2;
    } else if (angle === "left") {
      this.angle = -MathUtil.PI / 2;
    } else if (angle === "random") {
      this.angle = "random";
    } else if (angle instanceof Span) {
      this.angle = "span";
      this.span = angle;
    } else if (angle) {
      this.angle = angle;
    }

    if (
      String(force).toLowerCase() === "changing" ||
      String(force).toLowerCase() === "chang" ||
      String(force).toLowerCase() === "auto"
    ) {
      this.force = CHANGING;
    } else if (force) {
      this.force = force;
    }
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Cyclone
   * @instance
   *
   * @param {Number} angle
   * @param {Number} force
   * @param {Number} [life=Infinity] 			this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */
  reset(angle, force, life, easing) {
    this.angle = MathUtil.PI / 2;
    this.setAngleAndForce(angle, force);
    life && super.reset(life, easing);
  }

  initialize(particle) {
    if (this.angle === "random") {
      particle.data.cangle = MathUtil.randomAToB(-MathUtil.PI, MathUtil.PI);
    } else if (this.angle === "span") {
      particle.data.cangle = this.span.getValue();
    }

    particle.data.cyclone = new Vector2D(0, 0);
  }

  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton#Proton.Cyclone
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} the integrate time 1/ms
   * @param {Int} the particle index
   */
  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);

    let length;
    let gradient = particle.v.getGradient();
    if (this.angle === "random" || this.angle === "span") {
      gradient += particle.data.cangle;
    } else {
      gradient += this.angle;
    }

    if (this.force === CHANGING) {
      length = particle.v.length() / 100;
    } else {
      length = this.force;
    }

    particle.data.cyclone.x = length * Math.cos(gradient);
    particle.data.cyclone.y = length * Math.sin(gradient);
    particle.data.cyclone = this.normalizeForce(particle.data.cyclone);
    particle.a.add(particle.data.cyclone);
  }
}
