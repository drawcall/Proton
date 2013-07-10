(function(Proton, undefined) {
	function Zone() {
		this.vector = new Proton.Vector2D(0, 0);
		this.random = 0;
		this.crossType = "dead";
		this.alert = true;
	}


	Zone.prototype = {
		getPosition : function() {

		},

		crossing : function(particle) {

		}
	};

	Proton.Zone = Zone;
})(Proton);
