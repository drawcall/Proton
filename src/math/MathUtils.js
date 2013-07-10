(function(Proton, undefined) {
	var MathUtils = {
		randomAToB : function(a, b, INT) {
			if (!INT)
				return a + Math.random() * (b - a );
			else
				return Math.floor(Math.random() * (b - a)) + a;
		},
		randomFloating : function(center, f, INT) {
			return MathUtils.randomAToB(center - f, center + f, INT);
		},
		randomZone : function(display) {

		},

		degreeTransform : function(a) {
			return a * Math.PI / 180;
		},

		toColor16 : function getRGB(num) {
			return "#" + num.toString(16);
		},
		
		randomColor : function() {
			return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
		}
	}

	Proton.MathUtils = MathUtils;
})(Proton);
