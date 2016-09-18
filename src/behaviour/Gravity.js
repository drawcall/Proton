(function(Proton, undefined) {

	/**
	 * @memberof! Proton#
	 * @augments Proton#Proton.Force
	 * @constructor
	 * @alias Proton.Gravity
	 *
	 * @param {Number} g 							Gravity
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	function Gravity(g, life, easing) {
		Gravity._super_.call(this, 0, g, life, easing);
		this.name = "Gravity";
	}

	Proton.Util.inherits(Gravity, Proton.Force);

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Gravity
	 * @instance
	 *
	 * @param {Number} g 							Gravity
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 */
	Gravity.prototype.reset = function(g, life, easing) {
		Gravity._super_.prototype.reset.call(this, 0, g, life, easing);
	}

	Proton.Gravity = Gravity;
	Proton.G = Gravity;
})(Proton);
