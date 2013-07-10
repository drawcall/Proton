(function(Proton, undefined) {
	function CrossZone(zone, crossType, life, easing) {
		CrossZone._super_.call(this, life, easing);
		this.reset(zone, crossType);
		///dead /bound /cross
		this.name = "CrossZone";
	}


	Proton.Util.inherits(CrossZone, Proton.Behaviour);
	CrossZone.prototype.reset = function(zone, crossType, life, easing) {
		this.zone = zone;
		this.zone.crossType = Proton.Util.initValue(crossType, "dead");
		if (life)
			CrossZone._super_.prototype.reset.call(this, life, easing);
	}

	CrossZone.prototype.applyBehaviour = function(particle, time, index) {
		CrossZone._super_.prototype.applyBehaviour.call(this, particle, time, index);
		this.zone.crossing(particle);
	};

	Proton.CrossZone = CrossZone;
})(Proton);
