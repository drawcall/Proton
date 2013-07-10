(function(Proton, undefined) {
	function ColorSpan(color) {
		if (Proton.Util.isArray(color)) {
			this.colorArr = color;
		} else {
			this.colorArr = [color];
		}
	}


	Proton.Util.inherits(ColorSpan, Proton.Span);
	ColorSpan.prototype.getValue = function() {
		var color = this.colorArr[Math.floor(this.colorArr.length * Math.random())];
		if (color == 'random' || color == 'Random')
			return Proton.MathUtils.randomColor();
		else
			return color;
	}

	Proton.ColorSpan = ColorSpan;
})(Proton);
