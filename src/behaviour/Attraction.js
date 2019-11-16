import Util from "../utils/Util";
import Vector2D from "../math/Vector2D";
import Behaviour from "./Behaviour";

export default class Attraction extends Behaviour {
  /**
   * This behaviour let the particles follow one specific Proton.Vector2D
   *
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Attraction
   *
   * @todo add description for 'force' and 'radius'
   *
   * @param {Proton.Vector2D} targetPosition the attraction point coordinates
   * @param {Number} [force=100]
   * @param {Number} [radius=1000]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {Proton.Vector2D} targetPosition
   * @property {Number} radius
   * @property {Number} force
   * @property {Number} radiusSq
   * @property {Proton.Vector2D} attractionForce
   * @property {Number} lengthSq
   * @property {String} name The Behaviour name
   */
  constructor(targetPosition, force, radius, life, easing) {
    super(life, easing);

    this.targetPosition = Util.initValue(targetPosition, new Vector2D());
    this.radius = Util.initValue(radius, 1000);
    this.force = Util.initValue(this.normalizeValue(force), 100);

    this.radiusSq = this.radius * this.radius;
    this.attractionForce = new Vector2D();
    this.lengthSq = 0;

    this.name = "Attraction";
  }

  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Attraction
   * @instance
   *
   * @todo add description for 'force' and 'radius'
   *
   * @param {Proton.Vector2D} targetPosition the attraction point coordinates
   * @param {Number} [force=100]
   * @param {Number} [radius=1000]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */
  reset(targetPosition, force, radius, life, easing) {
    this.targetPosition = Util.initValue(targetPosition, new Vector2D());
    this.radius = Util.initValue(radius, 1000);
    this.force = Util.initValue(this.normalizeValue(force), 100);

    this.radiusSq = this.radius * this.radius;
    this.attractionForce = new Vector2D();
    this.lengthSq = 0;

    life && super.reset(life, easing);
  }

  /**
   * Apply this behaviour for all particles every time
   *
   * @memberof Proton#Proton.Attraction
   * @method applyBehaviour
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} 			time the integrate time 1/ms
   * @param {Int} 			index the particle index
   */
  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);

    this.attractionForce.copy(this.targetPosition);
    this.attractionForce.sub(particle.p);
    this.lengthSq = this.attractionForce.lengthSq();

    if (this.lengthSq > 0.00004 && this.lengthSq < this.radiusSq) {
      this.attractionForce.normalize();
      this.attractionForce.multiplyScalar(1 - this.lengthSq / this.radiusSq);
      this.attractionForce.multiplyScalar(this.force);

      particle.a.add(this.attractionForce);
    }
  }
}
