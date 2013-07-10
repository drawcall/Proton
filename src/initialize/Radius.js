(function(Proton, undefined) {
	function Radius(a, b, c) {
		Radius._super_.call(this);
		this.radius = Proton.Util.setSpanValue(a, b, c);
	}


	Proton.Util.inherits(Radius, Proton.Initialize);
	Radius.prototype.reset = function(a, b, c) {
		this.radius = Proton.Util.setSpanValue(a, b, c);
	};

	Radius.prototype.initialize = function(particle) {
		particle.radius = this.radius.getValue();
		particle.transform.oldRadius = particle.radius;
	};

	Proton.Radius = Radius;
})(Proton);
