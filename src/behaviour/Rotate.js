(function(Proton, undefined) {

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
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	function Rotate(a, b, style, life, easing) {
		Rotate._super_.call(this, life, easing);
		this.reset(a, b, style);
		this.name = "Rotate";
	}

	Proton.Util.inherits(Rotate, Proton.Behaviour);

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
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 */
	Rotate.prototype.reset = function(a, b, style, life, easing) {
		if (b == null || b == undefined)
			this.same = true;
		else
			this.same = false;
		this.a = Proton.Util.setSpanValue(Proton.Util.initValue(a, "Velocity"));
		this.b = Proton.Util.setSpanValue(Proton.Util.initValue(b, 0));
		this.style = Proton.Util.initValue(style, 'to');
		if (life)
			Rotate._super_.prototype.reset.call(this, life, easing);
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
	Rotate.prototype.initialize = function(particle) {
		particle.rotation = this.a.getValue();
		particle.transform.rotationA = this.a.getValue();
		if (!this.same)
			particle.transform.rotationB = this.b.getValue();
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
	Rotate.prototype.applyBehaviour = function(particle, time, index) {
		Rotate._super_.prototype.applyBehaviour.call(this, particle, time, index);
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
	};

	Proton.Rotate = Rotate;
})(Proton);
