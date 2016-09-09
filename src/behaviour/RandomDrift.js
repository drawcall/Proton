(function(Proton, undefined) {

	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.RandomDrift
	 *
	 * @param {Number} driftX 				X value of the new Proton.Vector2D
	 * @param {Number} driftY  				Y value of the new Proton.Vector2D
	 * @param {Number} delay 				How much delay the drift should have
	 * @param {Number} [life=Infinity] 		this behaviour's life
	 * @param {String} [easing=easeLinear] 	this behaviour's easing
	 *
	 * @property {Number} time The time of the drift
	 * @property {String} name The Behaviour name
	 */
	function RandomDrift(driftX, driftY, delay, life, easing) {
		RandomDrift._super_.call(this, life, easing);
		this.reset(driftX, driftY, delay);
		this.time = 0;
		this.name = "RandomDrift";
	}

	Proton.Util.inherits(RandomDrift, Proton.Behaviour);

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.RandomDrift
	 * @instance
	 *
	 * @param {Number} driftX 				X value of the new Proton.Vector2D
	 * @param {Number} driftY  				Y value of the new Proton.Vector2D
	 * @param {Number} delay 				How much delay the drift should have
	 * @param {Number} [life=Infinity] 		this behaviour's life
	 * @param {String} [easing=easeLinear] 	this behaviour's easing
	 */
	RandomDrift.prototype.reset = function(driftX, driftY, delay, life, easing) {
		this.panFoce = new Proton.Vector2D(driftX, driftY);
		this.panFoce = this.normalizeForce(this.panFoce);
		this.delay = delay;
		if (life)
			RandomDrift._super_.prototype.reset.call(this, life, easing);
	}

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @method applyBehaviour
	 * @memberof Proton#Proton.RandomDrift
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} 			time the integrate time 1/ms
	 * @param {Int} 			index the particle index
	 */
	RandomDrift.prototype.applyBehaviour = function(particle, time, index) {
		RandomDrift._super_.prototype.applyBehaviour.call(this, particle, time, index);
		this.time += time;
		if (this.time >= this.delay) {
			
			particle.a.addXY(Proton.MathUtils.randomAToB(-this.panFoce.x, this.panFoce.x), Proton.MathUtils.randomAToB(-this.panFoce.y, this.panFoce.y));
			this.time = 0;
		};
	};

	Proton.RandomDrift = RandomDrift;
})(Proton);
