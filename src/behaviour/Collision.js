(function(Proton, undefined) {
	//can use Collision(emitter,true,function(){}) or Collision();
	function Collision(emitter, mass, callback, life, easing) {
		Collision._super_.call(this, life, easing);
		this.reset(emitter, mass, callback);
		this.name = "Collision";
	}


	Proton.Util.inherits(Collision, Proton.Behaviour);
	Collision.prototype.reset = function(emitter, mass, callback, life, easing) {
		this.emitter = Proton.Util.initValue(emitter, null);
		this.mass = Proton.Util.initValue(mass, true);
		this.callback = Proton.Util.initValue(callback, null);
		this.collisionPool = [];
		this.delta = new Proton.Vector2D();
		if (life)
			Collision._super_.prototype.reset.call(this, life, easing);
	}

	Collision.prototype.applyBehaviour = function(particle, time, index) {
		var newPool = this.emitter ? this.emitter.particles.slice(index) : this.pool.slice(index);
		var otherParticle;
		var lengthSq;
		var overlap;
		var averageMass1, averageMass2;
		var length = newPool.length;
		for (var i = 0; i < length; i++) {
			otherParticle = newPool[i];
			if (otherParticle !== particle) {
				this.delta.copy(otherParticle.p);
				this.delta.sub(particle.p);
				lengthSq = this.delta.lengthSq();
				distance = particle.radius + otherParticle.radius;

				if (lengthSq <= distance * distance) {
					overlap = distance - Math.sqrt(lengthSq);
					overlap += 0.5;
					totalMass = particle.mass + otherParticle.mass;
					averageMass1 = this.mass ? otherParticle.mass / totalMass : 0.5;
					averageMass2 = this.mass ? particle.mass / totalMass : 0.5;
					particle.p.add(this.delta.clone().normalize().multiplyScalar(overlap * -averageMass1));
					otherParticle.p.add(this.delta.normalize().multiplyScalar(overlap * averageMass2));
					if (this.callback)
						this.callback(particle, otherParticle);
				}
			}
		}
	};

	Proton.Collision = Collision;
})(Proton);

