(function(Proton, undefined) {
	function Scale(a, b, life, easing) {
		Scale._super_.call(this, life, easing);
		this.reset(a, b);
		this.name = "Scale";
	}


	Proton.Util.inherits(Scale, Proton.Behaviour);
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

	Scale.prototype.initialize = function(particle) {
		particle.transform.scaleA = this.a.getValue();
		particle.transform.oldRadius = particle.radius;
		if (this.same)
			particle.transform.scaleB = particle.transform.scaleA;
		else
			particle.transform.scaleB = this.b.getValue();

	};

	Scale.prototype.applyBehaviour = function(particle, time, index) {
		Scale._super_.prototype.applyBehaviour.call(this, particle, time, index);
		particle.scale = particle.transform.scaleB + (particle.transform.scaleA - particle.transform.scaleB) * this.energy;
		if (particle.scale < 0.0001)
			particle.scale = 0;
		particle.radius = particle.transform.oldRadius * particle.scale;
	};

	Proton.Scale = Scale;
})(Proton);
