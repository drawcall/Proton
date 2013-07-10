(function(Proton, undefined) {
	function Mass(a, b, c) {
		Mass._super_.call(this);
		this.massPan = Proton.Util.setSpanValue(a, b, c);
	}


	Proton.Util.inherits(Mass, Proton.Initialize);
	Mass.prototype.initialize = function(target) {
		target.mass = this.massPan.getValue();
	};

	Proton.Mass = Mass;
})(Proton);
