(function(Proton, undefined) {
	/**
	 * The number of particles per second emission (a [particle]/b [s]);
	 * @class Proton.Rate
	 * @constructor
	 * @param {Array or Number or Proton.Span} numpan the number of each emission;
	 * @param {Array or Number or Proton.Span} timepan the time of each emission;
	 * for example: new Proton.Rate(new Proton.Span(10, 20), new Proton.Span(.1, .25));
	 */
	function Rate(numpan, timepan) {
		this.numPan = Proton.Util.initValue(numpan, 1);
		this.timePan = Proton.Util.initValue(timepan, 1);
		this.numPan = Proton.Util.setSpanValue(this.numPan);
		this.timePan = Proton.Util.setSpanValue(this.timePan);
		this.startTime = 0;
		this.nextTime = 0;
		this.init();
	}


	Rate.prototype = {
		init : function() {
			this.startTime = 0;
			this.nextTime = this.timePan.getValue();
		},

		getValue : function(time) {
			this.startTime += time;
			if (this.startTime >= this.nextTime) {
				this.startTime = 0;
				this.nextTime = this.timePan.getValue();
				if (this.numPan.b == 1) {
					if (this.numPan.getValue(false) > 0.5)
						return 1;
					else
						return 0;
				} else {
					return this.numPan.getValue(true);
				}
			}
			return 0;
		}
	}

	Proton.Rate = Rate;
})(Proton);
