(function(Proton, undefined) {

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
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 *
	 * @property {Number} force
	 * @property {String} name The Behaviour name
	 */
	function Repulsion(targetPosition, force, radius, life, easing) {
		Repulsion._super_.call(this, targetPosition, force, radius, life, easing);
		this.force *= -1;
		this.name = "Repulsion";
	}

	Proton.Util.inherits(Repulsion, Proton.Attraction);

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
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 */
	Repulsion.prototype.reset = function(targetPosition, force, radius, life, easing) {
		Repulsion._super_.prototype.reset.call(this, targetPosition, force, radius, life, easing);
		this.force *= -1;
	}

	Proton.Repulsion = Repulsion;
})(Proton);

