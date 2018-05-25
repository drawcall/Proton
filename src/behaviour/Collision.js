import Util from '../utils/Util';
import Vector2D from '../math/Vector2D';
import Behaviour from './Behaviour';

export default class Collision extends Behaviour {

	/**
	 * The callback after collision
	 *
	 * @callback Callback
	 *
	 * @param {Proton.Particle} particle
	 * @param {Proton.Paritcle} otherParticle
	 */
	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.Collision
	 *
	 * @todo add description to mass
	 *
	 * @param {Proton.Emitter} 	[emitter=null] 		the attraction point coordinates
	 * @param {Boolean} 		[mass=true]
	 * @param {Callback}	 	[callback=null]		the callback after the collision
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	constructor(emitter, mass, callback, life, easing) {
		super(life, easing);

		this.reset(emitter, mass, callback);
		this.name = 'Collision';
	}

	/**
	 * Reset this behaviour's parameters
	 *
	 * @memberof Proton#Proton.Collision
	 * @method reset
	 * @instance
	 *
	 * @todo add description to mass
	 *
	 * @param {Proton.Emitter} 	[emitter=null] 		the attraction point coordinates
	 * @param {Boolean} 		[mass=true]
	 * @param {Callback}	 	[callback=null]		the callback after the collision
	 * @param {Number} 			[life=Infinity] 	this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 */
	reset(emitter, mass, callback, life, easing) {
		this.emitter = Util.initValue(emitter, null);
		this.mass = Util.initValue(mass, true);
		this.callback = Util.initValue(callback, null);

		this.collisionPool = [];
		this.delta = new Vector2D();

		life && super.reset(life, easing);
	}

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @memberof Proton#Proton.Collision
	 * @method applyBehaviour
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} 			time the integrate time 1/ms
	 * @param {Int} 			index the particle index
	 */
	applyBehaviour(particle, time, index) {
		const newPool = this.emitter ? this.emitter.particles.slice(index) : this.pool.slice(index);
		const length = newPool.length;

		let otherParticle;
		let lengthSq;
		let overlap;
		let totalMass;
		let averageMass1, averageMass2;
		let i;

		for (i = 0; i < length; i++) {
			otherParticle = newPool[i];

			if (otherParticle !== particle) {
				this.delta.copy(otherParticle.p);
				this.delta.sub(particle.p);

				lengthSq = this.delta.lengthSq();
				const distance = particle.radius + otherParticle.radius;

				if (lengthSq <= distance * distance) {
					overlap = distance - Math.sqrt(lengthSq);
					overlap += 0.5;

					totalMass = particle.mass + otherParticle.mass;
					averageMass1 = this.mass ? otherParticle.mass / totalMass : 0.5;
					averageMass2 = this.mass ? particle.mass / totalMass : 0.5;

					particle.p.add(this.delta.clone().normalize().multiplyScalar(overlap * -averageMass1));
					otherParticle.p.add(this.delta.normalize().multiplyScalar(overlap * averageMass2));

					this.callback && this.callback(particle, otherParticle);
				}
			}
		}
	}
}