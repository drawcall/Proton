(function(Proton, undefined) {

	/**
	 * Defines what happens if the particles come to the end of the specified zone
	 *
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.CrossZone
	 *
	 * @param {Proton.Zone} zone 						can be any Proton.Zone - e.g. Proton.RectZone()
	 * @param {String} 		[crossType=dead] 			what happens if the particles pass the zone - allowed strings: dead | bound | cross
	 * @param {Number} 		[life=Infinity] 			this behaviour's life
	 * @param {String} 		[easing=Proton.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	function CrossZone(zone, crossType, life, easing) {
		CrossZone._super_.call(this, life, easing);
		this.reset(zone, crossType);
		this.name = "CrossZone";
	}

	Proton.Util.inherits(CrossZone, Proton.Behaviour);

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.CrossZone
	 * @instance
	 *
	 * @param {Proton.Zone} zone 				can be any Proton.Zone - e.g. Proton.RectZone()
 	 * @param {String} 		[crossType=dead] 	what happens if the particles pass the zone - allowed strings: dead | bound | cross
	 * @param {Number} 		[life=Infinity] 	this behaviour's life
	 * @param {String} 		[easing=easeLinear]	this behaviour's easing
	 */
	CrossZone.prototype.reset = function(zone, crossType, life, easing) {
		this.zone = zone;
		this.zone.crossType = Proton.Util.initValue(crossType, "dead");
		if (life)
			CrossZone._super_.prototype.reset.call(this, life, easing);
	}

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @method applyBehaviour
	 * @memberof Proton#Proton.CrossZone
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} the integrate time 1/ms
	 * @param {Int} the particle index
	 */
	CrossZone.prototype.applyBehaviour = function(particle, time, index) {
		CrossZone._super_.prototype.applyBehaviour.call(this, particle, time, index);
		this.zone.crossing(particle);
	};

	Proton.CrossZone = CrossZone;
})(Proton);
