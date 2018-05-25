import Attraction from './Attraction';

export default class Repulsion extends Attraction {

	/**
	 * The oppisite of Proton.Attraction - turns the force
	 *
	 * @memberof! Proton#
	 * @augments Proton#Proton.Attraction
	 * @constructor
	 * @alias Proton.Repulsion
	 *
	 * @todo add description for 'force' and 'radius'
	 *
	 * @param {Proton.Vector2D} targetPosition the attraction point coordinates
	 * @param {Number} [force=100]
	 * @param {Number} [radius=1000]
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
	 *
	 * @property {Number} force
	 * @property {String} name The Behaviour name
	 */
	constructor(targetPosition, force, radius, life, easing) {
		super(targetPosition, force, radius, life, easing);

		this.force *= -1;
		this.name = 'Repulsion';
	}

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Repulsion
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
		super.reset(targetPosition, force, radius, life, easing);
		this.force *= -1;
	}
}
