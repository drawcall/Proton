import Force from './Force';

export default class Gravity extends Force {

	/**
	 * @memberof! Proton#
	 * @augments Proton#Proton.Force
	 * @constructor
	 * @alias Proton.Gravity
	 *
	 * @param {Number} g 							Gravity
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	constructor(g, life, easing) {
		super(0, g, life, easing);
		this.name = 'Gravity';
	}

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Gravity
	 * @instance
	 *
	 * @param {Number} g 							Gravity
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 */
	reset(g, life, easing) {
		super.reset(0, g, life, easing);
	}
}