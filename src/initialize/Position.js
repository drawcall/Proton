(function(Proton, undefined) {
	function Position(zone) {
		Position._super_.call(this);
		this.zone = Proton.Util.initValue(zone, new Proton.PointZone());
	}


	Proton.Util.inherits(Position, Proton.Initialize);
	Position.prototype.reset = function(zone) {
		this.zone = Proton.Util.initValue(zone, new Proton.PointZone());
	};

	Position.prototype.initialize = function(target) {
		this.zone.getPosition();
		target.p.x = this.zone.vector.x;
		target.p.y = this.zone.vector.y;
	};

	Proton.Position = Position;
	Proton.P = Position;
})(Proton);
