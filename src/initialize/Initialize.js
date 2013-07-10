(function(Proton, undefined) {
	function Initialize() {

	}


	Initialize.prototype.reset = function() {

	}

	Initialize.prototype.init = function(emitter, particle) {
		if (particle) {
			this.initialize(particle);
		} else {
			this.initialize(emitter);
		}
	};

	///sub class init
	Initialize.prototype.initialize = function(target) {
	};

	Proton.Initialize = Initialize;
})(Proton);
