(function(Proton, undefined) {
	function Repulsion(targetPosition, force, radius, life, easing) {
		Repulsion._super_.call(this, targetPosition, force, radius, life, easing);
		this.force *= -1;
		this.name = "Repulsion";
	}


	Proton.Util.inherits(Repulsion, Proton.Attraction);
	Repulsion.prototype.reset = function(targetPosition, force, radius, life, easing) {
		Repulsion._super_.prototype.reset.call(this, targetPosition, force, radius, life, easing);
		this.force *= -1;
	}
	Proton.Repulsion = Repulsion;
})(Proton);

