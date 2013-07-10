(function(Proton, undefined) {
	function PointZone(x, y) {
		PointZone._super_.call(this);
		this.x = x;
		this.y = y;
	}


	Proton.Util.inherits(PointZone, Proton.Zone);
	PointZone.prototype.getPosition = function() {
		this.vector.x = this.x;
		this.vector.y = this.y;
		return this.vector;
	}

	PointZone.prototype.crossing = function(particle) {
		if (this.alert) {
			alert('Sorry PointZone does not support crossing method');
			this.alert = false;
		}
	}

	Proton.PointZone = PointZone;
})(Proton);
