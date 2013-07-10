(function(Proton, undefined) {
	function Force(fx, fy, life, easing) {
		Force._super_.call(this, life, easing);
		this.force = this.normalizeForce(new Proton.Vector2D(fx, fy));
		this.name = "Force";
	}


	Proton.Util.inherits(Force, Proton.Behaviour);
	Force.prototype.reset = function(fx, fy, life, easing) {
		this.force = this.normalizeForce(new Proton.Vector2D(fx, fy));
		if (life)
			Force._super_.prototype.reset.call(this, life, easing);
	}

	Force.prototype.applyBehaviour = function(particle, time, index) {
		Force._super_.prototype.applyBehaviour.call(this, particle, time, index);
		particle.a.add(this.force);
	};

	Proton.Force = Force;
	Proton.F = Force;
})(Proton);
