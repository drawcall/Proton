(function(Proton, undefined) {

	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.Scale
	 *
	 * @todo add description for 'a' and 'b'
	 *
	 * @param {Number} a
	 * @param {String} b
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	function Scale(a, b, life, easing) {
		Scale._super_.call(this, life, easing);
		this.reset(a, b);
		this.name = "Scale";
	}


	Proton.Util.inherits(Scale, Proton.Behaviour);

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Scale
	 * @instance
	 *
	 * @param {Number} a
	 * @param {String} b
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 */
	Scale.prototype.reset = function(a, b, life, easing) {
		if (b == null || b == undefined)
			this.same = true;
		else
			this.same = false;
		this.a = Proton.Util.setSpanValue(Proton.Util.initValue(a, 1));
		this.b = Proton.Util.setSpanValue(b);
		if (life)
			Scale._super_.prototype.reset.call(this, life, easing);
	}

	/**
	 * Initialize the behaviour's parameters for all particles
	 *
	 * @method initialize
	 * @memberof Proton#Proton.Scale
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 */
	Scale.prototype.initialize = function(particle) {
		particle.transform.scaleA = this.a.getValue();
		particle.transform.oldRadius = particle.radius;
		if (this.same)
			particle.transform.scaleB = particle.transform.scaleA;
		else
			particle.transform.scaleB = this.b.getValue();

	};

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @method applyBehaviour
	 * @memberof Proton#Proton.Scale
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} 			time the integrate time 1/ms
	 * @param {Int} 			index the particle index
	 */
	Scale.prototype.applyBehaviour = function(particle, time, index) {
		Scale._super_.prototype.applyBehaviour.call(this, particle, time, index);
		particle.scale = particle.transform.scaleB + (particle.transform.scaleA - particle.transform.scaleB) * this.energy;
		if (particle.scale < 0.0001)
			particle.scale = 0;
		particle.radius = particle.transform.oldRadius * particle.scale;
	};

	Proton.Scale = Scale;
})(Proton);
