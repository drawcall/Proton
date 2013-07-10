(function(Proton, undefined) {
	function Life(a, b, c) {
		Life._super_.call(this);
		this.lifePan = Proton.Util.setSpanValue(a, b, c);
	}


	Proton.Util.inherits(Life, Proton.Initialize);
	Life.prototype.initialize = function(target) {
		if (this.lifePan.a == Infinity)
			target.life = Infinity;
		else
			target.life = this.lifePan.getValue();
	};

	Proton.Life = Life;
})(Proton);
