(function(Proton, undefined) {
	function Alpha(a, b, life, easing) {
		Alpha._super_.call(this, life, easing);
		this.reset(a, b);
		/**
		 * The Behaviour name;
		 * @property name
		 * @type {string}
		 */
		this.name = "Alpha";
	}


	Proton.Util.inherits(Alpha, Proton.Behaviour);
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

	Alpha.prototype.initialize = function(particle) {
		particle.transform.alphaA = this.a.getValue();
		if (this.same)
			particle.transform.alphaB = particle.transform.alphaA;
		else
			particle.transform.alphaB = this.b.getValue();
	};

	Alpha.prototype.applyBehaviour = function(particle, time, index) {
		Alpha._super_.prototype.applyBehaviour.call(this, particle, time, index);
		particle.alpha = particle.transform.alphaB + (particle.transform.alphaA - particle.transform.alphaB) * this.energy;
		if (particle.alpha < 0.001)
			particle.alpha = 0;
	};

	Proton.Alpha = Alpha;
})(Proton);
