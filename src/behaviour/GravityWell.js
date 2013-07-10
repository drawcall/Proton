(function(Proton, undefined) {
	function GravityWell(centerPoint, force, life, easing) {
		GravityWell._super_.call(this, life, easing);
		this.distanceVec = new Proton.Vector2D();
		this.centerPoint = Proton.Util.initValue(centerPoint, new Proton.Vector2D);
		this.force = Proton.Util.initValue(this.normalizeValue(force), 100);
		this.name = "GravityWell";
	}


	Proton.Util.inherits(GravityWell, Proton.Behaviour);
	GravityWell.prototype.reset = function(centerPoint, force, life, easing) {
		this.distanceVec = new Proton.Vector2D();
		this.centerPoint = Proton.Util.initValue(centerPoint, new Proton.Vector2D);
		this.force = Proton.Util.initValue(this.normalizeValue(force), 100);
		if (life)
			GravityWell._super_.prototype.reset.call(this, life, easing);
	};
	GravityWell.prototype.initialize = function(particle) {

	};

	GravityWell.prototype.applyBehaviour = function(particle, time, index) {
		this.distanceVec.set(this.centerPoint.x - particle.p.x, this.centerPoint.y - particle.p.y);
		var distanceSq = this.distanceVec.lengthSq();
		if (distanceSq != 0) {
			var distance = this.distanceVec.length();
			var factor = (this.force * time ) / (distanceSq * distance );
			particle.v.x += factor * this.distanceVec.x;
			particle.v.y += factor * this.distanceVec.y;
		}
	}

	Proton.GravityWell = GravityWell;
})(Proton);
