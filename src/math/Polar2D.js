(function(Proton, undefined) {
	var Polar2D = function(r, tha) {
		this.r = Math.abs(r) || 0;
		this.tha = tha || 0;
	}

	Polar2D.prototype = {
		set : function(r, tha) {

			this.r = r;
			this.tha = tha;
			return this;

		},

		setR : function(r) {

			this.r = r;
			return this;

		},

		setTha : function(tha) {

			this.tha = tha;

			return this;

		},

		copy : function(p) {

			this.r = p.r;
			this.tha = p.tha;

			return this;

		},

		toVector : function() {
			return new Proton.Vector2D(this.getX(), this.getY());
		},

		getX : function() {
			return this.r * Math.sin(this.tha);
		},

		getY : function() {
			return -this.r * Math.cos(this.tha);
		},

		normalize : function() {

			this.r = 1;
			return this;
		},

		equals : function(v) {

			return ((v.r === this.r ) && (v.tha === this.tha ) );

		},

		toArray : function() {

			return [this.r, this.tha];

		},

		clear : function() {
			this.r = 0.0;
			this.tha = 0.0;
			return this;
		},

		clone : function() {

			return new Proton.Polar2D(this.r, this.tha);

		}
	};

	Proton.Polar2D = Polar2D;
})(Proton);
