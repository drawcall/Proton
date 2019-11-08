import Util from '../utils/Util';
import Vector2D from '../math/Vector2D';
import Behaviour from './Behaviour';

export default class GravityWell extends Behaviour {

	/**
	 * @memberof! Proton#
	 * @augments Behaviour
	 * @constructor
	 * @alias GravityWell
	 *
	 * @param {Vector2D} [centerPoint=new Vector2D] The point in the center
	 * @param {Number} [force=100]					The force
	 * @param {Number} [life=Infinity]				this behaviour's life
	 * @param {String} [easing=easeLinear]	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	constructor(centerPoint, force, life, easing) {
		super(life, easing);

		this.distanceVec = new Vector2D();
		this.centerPoint = Util.initValue(centerPoint, new Vector2D);
		this.force = Util.initValue(this.normalizeValue(force), 100);

		this.name = 'GravityWell';
	}

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#GravityWell
	 * @instance
	 *
	 * @param {Vector2D} [centerPoint=new Vector2D] The point in the center
	 * @param {Number} [force=100]					The force
	 * @param {Number} [life=Infinity]				this behaviour's life
	 * @param {String} [easing=easeLinear]	this behaviour's easing
	 */
	reset(centerPoint, force, life, easing) {
		this.distanceVec = new Vector2D();
		this.centerPoint = Util.initValue(centerPoint, new Vector2D);
		this.force = Util.initValue(this.normalizeValue(force), 100);

		life && super.reset(life, easing);
	};

	/**
	 * @inheritdoc
	 */
	initialize(particle) {
	};

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @method applyBehaviour
	 * @memberof Proton#GravityWell
	 * @instance
	 *
	 * @param {Particle} particle
	 * @param {Number} the integrate time 1/ms
	 * @param {Int} the particle index
	 */
	applyBehaviour(particle, time, index) {
		this.distanceVec.set(this.centerPoint.x - particle.p.x, this.centerPoint.y - particle.p.y);
		const distanceSq = this.distanceVec.lengthSq();

		if (distanceSq !== 0) {
			const distance = this.distanceVec.length();
			const factor = (this.force * time) / (distanceSq * distance);

			particle.v.x += factor * this.distanceVec.x;
			particle.v.y += factor * this.distanceVec.y;
		}
	}
}