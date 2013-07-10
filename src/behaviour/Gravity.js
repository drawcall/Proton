(function(Proton, undefined) {
	function Gravity(g, life, easing) {
		Gravity._super_.call(this, 0, g, life, easing);
		this.name = "Gravity";
	}


	Proton.Util.inherits(Gravity, Proton.Force);
	Gravity.prototype.reset = function(g, life, easing) {
		Gravity._super_.prototype.reset.call(this, 0, g, life, easing);
	}
	Proton.Gravity = Gravity;
	Proton.G = Gravity;
})(Proton);
