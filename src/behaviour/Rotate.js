import Util from '../utils/Util';
import Behaviour from './Behaviour';

export default class Rotate extends Behaviour {

	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.Rotate
	 *
	 * @todo add description for 'a', 'b' and 'style'
	 *
	 * @param {Number} a
	 * @param {String} b
	 * @param {String} [style=to]
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	constructor(a, b, style, life, easing) {
		super(life, easing);

		this.reset(a, b, style);
		this.name = "Rotate";
	}

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Rotate
	 * @instance
	 *
	 * @todo add description for 'a', 'b' and 'style'
	 *
	 * @param {Number} a
	 * @param {String} b
	 * @param {String} [style=to]
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 */
	reset(a, b, style, life, easing) {
		this.same = b === null || b === undefined ? true : false;

		this.a = Util.setSpanValue(Util.initValue(a, "Velocity"));
		this.b = Util.setSpanValue(Util.initValue(b, 0));
		this.style = Util.initValue(style, 'to');

		life && super.reset(life, easing);
	}

	/**
	 * Initialize the behaviour's parameters for all particles
	 *
	 * @method initialize
	 * @memberof Proton#Proton.Rotate
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 */
	initialize(particle) {
		particle.rotation = this.a.getValue();
		particle.transform.rotationA = this.a.getValue();

		if (!this.same) particle.transform.rotationB = this.b.getValue();
	};

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @method applyBehaviour
	 * @memberof Proton#Proton.Rotate
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} 			time the integrate time 1/ms
	 * @param {Int} 			index the particle index
	 */
	applyBehaviour(particle, time, index) {
		this.calculate(particle, time, index);

		if (!this.same) {
			if (this.style == 'to' || this.style == 'TO' || this.style == '_') {
				particle.rotation += particle.transform.rotationB + (particle.transform.rotationA - particle.transform.rotationB) * this.energy
			} else {
				particle.rotation += particle.transform.rotationB;
			}
		} else if (this.a.a == "V" || this.a.a == "Velocity" || this.a.a == "v") {
			//beta...
			particle.rotation = particle.getDirection();
		}
	}

}