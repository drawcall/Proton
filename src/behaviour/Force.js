(function(Proton, undefined) {

	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.Force
	 *
	 * @param {Number} fx
	 * @param {Number} fy
	 * @param {Number} [life=Infinity] 			this behaviour's life
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	function Force(fx, fy, life, easing) {
		Force._super_.call(this, life, easing);
		this.force = this.normalizeForce(new Proton.Vector2D(fx, fy));
		this.name = "Force";
	}


	Proton.Util.inherits(Force, Proton.Behaviour);

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
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 */
	Force.prototype.reset = function(fx, fy, life, easing) {
		this.force = this.normalizeForce(new Proton.Vector2D(fx, fy));
		if (life)
			Force._super_.prototype.reset.call(this, life, easing);
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
	Force.prototype.applyBehaviour = function(particle, time, index) {
		Force._super_.prototype.applyBehaviour.call(this, particle, time, index);
		particle.a.add(this.force);
	};

	Proton.Force = Force;
	Proton.F = Force;
})(Proton);
