(function(Proton, undefined) {

	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.Alpha
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
	function Alpha(a, b, life, easing) {
		Alpha._super_.call(this, life, easing);
		this.reset(a, b);
		this.name = "Alpha";
	}


	Proton.Util.inherits(Alpha, Proton.Behaviour);

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Alpha
	 * @instance
	 *
	 * @todo add description for 'a' and 'b'
	 *
	 * @param {Number} a
	 * @param {String} b
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 */
	Alpha.prototype.reset = function(a, b, life, easing) {
		if (b == null || b == undefined)
			this.same = true;
		else
			this.same = false;
		this.a = Proton.Util.setSpanValue(Proton.Util.initValue(a, 1));
		this.b = Proton.Util.setSpanValue(b);
		if (life)
			Alpha._super_.prototype.reset.call(this, life, easing);
	}

	/**
	 * Sets the new alpha value of the particle
	 *
	 * @method initialize
	 * @memberof Proton#Proton.Alpha
	 * @instance
	 *
	 * @param {Proton.Particle} particle A single Proton generated particle
	 */
	Alpha.prototype.initialize = function(particle) {
		particle.transform.alphaA = this.a.getValue();
		if (this.same)
			particle.transform.alphaB = particle.transform.alphaA;
		else
			particle.transform.alphaB = this.b.getValue();
	};

	/**
	 * @method applyBehaviour
	 * @memberof Proton#Proton.Alpha
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} 			time the integrate time 1/ms
	 * @param {Int} 			index the particle index
 	 */
	Alpha.prototype.applyBehaviour = function(particle, time, index) {
		Alpha._super_.prototype.applyBehaviour.call(this, particle, time, index);
		particle.alpha = particle.transform.alphaB + (particle.transform.alphaA - particle.transform.alphaB) * this.energy;
		if (particle.alpha < 0.001)
			particle.alpha = 0;
	};

	Proton.Alpha = Alpha;
})(Proton);
