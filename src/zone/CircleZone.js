(function(Proton, undefined) {
	function CircleZone(x, y, radius) {
		CircleZone._super_.call(this);
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.angle = 0;
		this.center = {
			x : this.x,
			y : this.y
		};
	}


	Proton.Util.inherits(CircleZone, Proton.Zone);
	CircleZone.prototype.getPosition = function() {
		this.random = Math.random();
		this.angle = Math.PI * 2 * Math.random();
		this.vector.x = this.x + this.random * this.radius * Math.cos(this.angle);
		this.vector.y = this.y + this.random * this.radius * Math.sin(this.angle);
		return this.vector;
	}

	CircleZone.prototype.setCenter = function(x, y) {
		this.center.x = x;
		this.center.y = y;
	}

	CircleZone.prototype.crossing = function(particle) {
		var d = particle.p.distanceTo(this.center);
		if (this.crossType == "dead") {
			if (d - particle.radius > this.radius)
				particle.dead = true;
		} else if (this.crossType == "bound") {
			if (d + particle.radius >= this.radius)
				this.getSymmetric(particle);
		} else if (this.crossType == "cross") {
			if (this.alert) {
				alert('Sorry CircleZone does not support cross method');
				this.alert = false;
			}
		}
	}

	CircleZone.prototype.getSymmetric = function(particle) {
		var tha2 = particle.v.getGradient();
		var tha1 = this.getGradient(particle);
		var tha = 2 * (tha1 - tha2);
		var oldx = particle.v.x;
		var oldy = particle.v.y;
		particle.v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
		particle.v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
	}

	CircleZone.prototype.getGradient = function(particle) {
		return -Math.PI / 2 + Math.atan2(particle.p.y - this.center.y, particle.p.x - this.center.x);
	}

	Proton.CircleZone = CircleZone;
})(Proton);
