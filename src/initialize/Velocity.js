(function(Proton, undefined) {
	//radius and tha
	function Velocity(rpan, thapan, type) {
		Velocity._super_.call(this);
		this.rPan = Proton.Util.setSpanValue(rpan);
		this.thaPan = Proton.Util.setSpanValue(thapan);
		this.type = Proton.Util.initValue(type, 'vector');
	}


	Proton.Util.inherits(Velocity, Proton.Initialize);

	Velocity.prototype.reset = function(rpan, thapan, type) {
		this.rPan = Proton.Util.setSpanValue(rpan);
		this.thaPan = Proton.Util.setSpanValue(thapan);
		this.type = Proton.Util.initValue(type, 'vector');
	};

	Velocity.prototype.normalizeVelocity = function(vr) {
		return vr * Proton.MEASURE;
	}

	Velocity.prototype.initialize = function(target) {
		if (this.type == 'p' || this.type == 'P' || this.type == 'polar') {
			var polar2d = new Proton.Polar2D(this.normalizeVelocity(this.rPan.getValue()), this.thaPan.getValue() * Math.PI / 180);
			target.v.x = polar2d.getX();
			target.v.y = polar2d.getY();
		} else {
			target.v.x = this.normalizeVelocity(this.rPan.getValue());
			target.v.y = this.normalizeVelocity(this.thaPan.getValue());
		}
	};

	Proton.Velocity = Velocity;
	Proton.V = Velocity;
})(Proton);
