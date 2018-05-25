import Vector2D from '../math/Vector2D';
import Behaviour from './Behaviour';

export default class Force extends Behaviour {

	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.Force
	 *
	 * @param {Number} fx
	 * @param {Number} fy
	 * @param {Number} [life=Infinity] 			this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	constructor(fx, fy, life, easing) {
		super(life, easing);

		this.force = this.normalizeForce(new Vector2D(fx, fy));
		this.name = 'Force';
	}

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Force
	 * @instance
	 *
	 * @param {Number} fx
	 * @param {Number} fy
	 * @param {Number} [life=Infinity] 			this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 */
	reset(fx, fy, life, easing) {
		this.force = this.normalizeForce(new Vector2D(fx, fy));

		life && super.reset(life, easing);
	}

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @method applyBehaviour
	 * @memberof Proton#Proton.Force
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} the integrate time 1/ms
	 * @param {Int} the particle index
	 */
	applyBehaviour(particle, time, index) {
		this.calculate(particle, time, index);
		particle.a.add(this.force);
	}
}