(function(Proton, undefined) {
	function Span(a, b, center) {
		this.isArray = false;

		if (Proton.Util.isArray(a)) {
			this.isArray = true;
			this.a = a;
		} else {
			this.a = Proton.Util.initValue(a, 1);
			this.b = Proton.Util.initValue(b, this.a);
			this.center = Proton.Util.initValue(center, false);
		}
	}


	Span.prototype = {
		getValue : function(INT) {
			if (this.isArray) {
				return this.a[Math.floor(this.a.length * Math.random())];
			} else {
				if (!this.center)
					return Proton.MathUtils.randomAToB(this.a, this.b, INT);
				else
					return Proton.MathUtils.randomFloating(this.a, this.b, INT);
			}
		}
	}

	Proton.Span = Span;
	Proton.getSpan = function(a, b, center) {
		return new Proton.Span(a, b, center);
	}
})(Proton);
