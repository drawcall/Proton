(function(Proton, undefined) {
	function Attraction(targetPosition, force, radius, life, easing) {
		Attraction._super_.call(this, life, easing);
		this.targetPosition = Proton.Util.initValue(targetPosition, new Proton.Vector2D);
		this.radius = Proton.Util.initValue(radius, 1000);
		this.force = Proton.Util.initValue(this.normalizeValue(force), 100);
		this.radiusSq = this.radius * this.radius
		this.attractionForce = new Proton.Vector2D();
		this.lengthSq = 0;
		this.name = "Attraction";
	}


	Proton.Util.inherits(Attraction, Proton.Behaviour);
	Attraction.prototype.reset = function(targetPosition, force, radius, life, easing) {
		this.targetPosition = Proton.Util.initValue(targetPosition, new Proton.Vector2D);
		this.radius = Proton.Util.initValue(radius, 1000);
		this.force = Proton.Util.initValue(this.normalizeValue(force), 100);
		this.radiusSq = this.radius * this.radius
		this.attractionForce = new Proton.Vector2D();
		this.lengthSq = 0;
		if (life)
			Attraction._super_.prototype.reset.call(this, life, easing);
	}

	Attraction.prototype.applyBehaviour = function(particle, time, index) {
		Attraction._super_.prototype.applyBehaviour.call(this, particle, time, index);
		this.attractionForce.copy(this.targetPosition);
		this.attractionForce.sub(particle.p);
		this.lengthSq = this.attractionForce.lengthSq();
		if (this.lengthSq > 0.000004 && this.lengthSq < this.radiusSq) {
			this.attractionForce.normalize();
			this.attractionForce.multiplyScalar(1 - this.lengthSq / this.radiusSq);
			this.attractionForce.multiplyScalar(this.force);
			particle.a.add(this.attractionForce);
		}
	};

	Proton.Attraction = Attraction;
})(Proton);

