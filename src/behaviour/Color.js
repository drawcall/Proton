(function(Proton, undefined) {

	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.Color
	 *
	 * @param {Proton.ColorSpan | String} color1 the string should be a hex e.g. #000000 for black
	 * @param {Proton.ColorSpan | String} color2 the string should be a hex e.g. #000000 for black
	 * @param {Number} [life=Infinity] 	this behaviour's life
	 * @param {String} [easing=easeLinear] 	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	function Color(color1, color2, life, easing) {
		Color._super_.call(this, life, easing);
		this.reset(color1, color2);
		this.name = "Color";
	}


	Proton.Util.inherits(Color, Proton.Behaviour);

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Color
	 * @instance
	 *
	 * @param {Proton.ColorSpan | String} color1 the string should be a hex e.g. #000000 for black
	 * @param {Proton.ColorSpan | String} color2 the string should be a hex e.g. #000000 for black
	 * @param {Number} [life=Infinity] 	this behaviour's life
	 * @param {String} [easing=easeLinear] 	this behaviour's easing
	 */
	Color.prototype.reset = function(color1, color2, life, easing) {
		this.color1 = this.setSpanValue(color1);
		this.color2 = this.setSpanValue(color2);
		if (life)
			Color._super_.prototype.reset.call(this, life, easing);
	}

	/**
	 * Initialize the behaviour's parameters for all particles
	 *
	 * @method initialize
	 * @memberof Proton#Proton.Color
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 */
	Color.prototype.initialize = function(particle) {
		particle.color = this.color1.getValue();
		particle.transform.beginRGB = Proton.Util.hexToRGB(particle.color);

		if (this.color2)
			particle.transform.endRGB = Proton.Util.hexToRGB(this.color2.getValue());
	};

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @method applyBehaviour
	 * @memberof Proton#Proton.Color
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} the integrate time 1/ms
	 * @param {Int} the particle index
	 */
	Color.prototype.applyBehaviour = function(particle, time, index) {
		if (this.color2) {
			Color._super_.prototype.applyBehaviour.call(this, particle, time, index);
			particle.transform.rgb.r = particle.transform.endRGB.r + (particle.transform.beginRGB.r - particle.transform.endRGB.r) * this.energy;
			particle.transform.rgb.g = particle.transform.endRGB.g + (particle.transform.beginRGB.g - particle.transform.endRGB.g) * this.energy;
			particle.transform.rgb.b = particle.transform.endRGB.b + (particle.transform.beginRGB.b - particle.transform.endRGB.b) * this.energy;
			particle.transform.rgb.r = parseInt(particle.transform.rgb.r, 10);
			particle.transform.rgb.g = parseInt(particle.transform.rgb.g, 10);
			particle.transform.rgb.b = parseInt(particle.transform.rgb.b, 10);
		} else {
			particle.transform.rgb.r = particle.transform.beginRGB.r;
			particle.transform.rgb.g = particle.transform.beginRGB.g;
			particle.transform.rgb.b = particle.transform.beginRGB.b;

		}
	};

	/**
	 * Make sure that the color is an instance of Proton.ColorSpan, if not it makes a new instance
	 *
	 * @method setSpanValue
	 * @memberof Proton#Proton.Color
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} the integrate time 1/ms
	 * @param {Int} the particle index
	 */
	Color.prototype.setSpanValue = function(color) {
		if (color) {
			if ( color instanceof Proton.ColorSpan) {
				return color;
			} else {
				return new Proton.ColorSpan(color);
			}
		} else {
			return null;
		}
	}

	Proton.Color = Color;
})(Proton);
