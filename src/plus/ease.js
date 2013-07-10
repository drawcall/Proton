(function(Proton, undefined) {
	var ease = ease || {
		easeLinear : function(value) {
			return value;
		},

		easeInQuad : function(value) {
			return Math.pow(value, 2);
		},

		easeOutQuad : function(value) {
			return -(Math.pow((value - 1), 2) - 1);
		},

		easeInOutQuad : function(value) {
			if ((value /= 0.5) < 1)
				return 0.5 * Math.pow(value, 2);
			return -0.5 * ((value -= 2) * value - 2);
		},

		easeInCubic : function(value) {
			return Math.pow(value, 3);
		},

		easeOutCubic : function(value) {
			return (Math.pow((value - 1), 3) + 1);
		},

		easeInOutCubic : function(value) {
			if ((value /= 0.5) < 1)
				return 0.5 * Math.pow(value, 3);
			return 0.5 * (Math.pow((value - 2), 3) + 2);
		},

		easeInQuart : function(value) {
			return Math.pow(value, 4);
		},

		easeOutQuart : function(value) {
			return -(Math.pow((value - 1), 4) - 1);
		},

		easeInOutQuart : function(value) {
			if ((value /= 0.5) < 1)
				return 0.5 * Math.pow(value, 4);
			return -0.5 * ((value -= 2) * Math.pow(value, 3) - 2);
		},
	
		easeInSine : function(value) {
			return -Math.cos(value * (Math.PI / 2)) + 1;
		},

		easeOutSine : function(value) {
			return Math.sin(value * (Math.PI / 2));
		},

		easeInOutSine : function(value) {
			return (-0.5 * (Math.cos(Math.PI * value) - 1));
		},

		easeInExpo : function(value) {
			return (value === 0) ? 0 : Math.pow(2, 10 * (value - 1));
		},

		easeOutExpo : function(value) {
			return (value === 1) ? 1 : -Math.pow(2, -10 * value) + 1;
		},

		easeInOutExpo : function(value) {
			if (value === 0)
				return 0;
			if (value === 1)
				return 1;
			if ((value /= 0.5) < 1)
				return 0.5 * Math.pow(2, 10 * (value - 1));
			return 0.5 * (-Math.pow(2, -10 * --value) + 2);
		},

		easeInCirc : function(value) {
			return -(Math.sqrt(1 - (value * value)) - 1);
		},

		easeOutCirc : function(value) {
			return Math.sqrt(1 - Math.pow((value - 1), 2));
		},

		easeInOutCirc : function(value) {
			if ((value /= 0.5) < 1)
				return -0.5 * (Math.sqrt(1 - value * value) - 1);
			return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
		},
		
		easeInBack : function(value) {
			var s = 1.70158;
			return (value) * value * ((s + 1) * value - s);
		},

		easeOutBack : function(value) {
			var s = 1.70158;
			return ( value = value - 1) * value * ((s + 1) * value + s) + 1;
		},

		easeInOutBack : function(value) {
			var s = 1.70158;
			if ((value /= 0.5) < 1)
				return 0.5 * (value * value * (((s *= (1.525)) + 1) * value - s));
			return 0.5 * ((value -= 2) * value * (((s *= (1.525)) + 1) * value + s) + 2);
		},

		setEasingByName : function(name) {
			switch (name) {
				case 'easeLinear':
					return Proton.ease.easeLinear;
					break;

				case 'easeInQuad':
					return Proton.ease.easeInQuad;
					break;

				case 'easeOutQuad':
					return Proton.ease.easeOutQuad;
					break;

				case 'easeInOutQuad':
					return Proton.ease.easeInOutQuad;
					break;

				case 'easeInCubic':
					return Proton.ease.easeInCubic;
					break;

				case 'easeOutCubic':
					return Proton.ease.easeOutCubic;
					break;

				case 'easeInOutCubic':
					return Proton.ease.easeInOutCubic;
					break;

				case 'easeInQuart':
					return Proton.ease.easeInQuart;
					break;

				case 'easeOutQuart':
					return Proton.ease.easeOutQuart;
					break;

				case 'easeInOutQuart':
					return Proton.ease.easeInOutQuart;
					break;

				case 'easeInSine':
					return Proton.ease.easeInSine;
					break;

				case 'easeOutSine':
					return Proton.ease.easeOutSine;
					break;

				case 'easeInOutSine':
					return Proton.ease.easeInOutSine;
					break;

				case 'easeInExpo':
					return Proton.ease.easeInExpo;
					break;

				case 'easeOutExpo':
					return Proton.ease.easeOutExpo;
					break;

				case 'easeInOutExpo':
					return Proton.ease.easeInOutExpo;
					break;

				case 'easeInCirc':
					return Proton.ease.easeInCirc;
					break;

				case 'easeOutCirc':
					return Proton.ease.easeOutCirc;
					break;

				case 'easeInOutCirc':
					return Proton.ease.easeInOutCirc;
					break;

				case 'easeInBack':
					return Proton.ease.easeInBack;
					break;

				case 'easeOutBack':
					return Proton.ease.easeOutBack;
					break;

				case 'easeInOutBack':
					return Proton.ease.easeInOutBack;
					break;
				
				default:
					return Proton.ease.easeLinear;
					break;
			}
		}
	}

	Proton.ease = ease;
	Proton.easeLinear = 'easeLinear';

	Proton.easeInQuad = 'easeInQuad';
	Proton.easeOutQuad = 'easeOutQuad';
	Proton.easeInOutQuad = 'easeInOutQuad';

	Proton.easeInCubic = 'easeInCubic';
	Proton.easeOutCubic = 'easeOutCubic';
	Proton.easeInOutCubic = 'easeInOutCubic';

	Proton.easeInQuart = 'easeInQuart';
	Proton.easeOutQuart = 'easeOutQuart';
	Proton.easeInOutQuart = 'easeInOutQuart';

	Proton.easeInSine = 'easeInSine';
	Proton.easeOutSine = 'easeOutSine';
	Proton.easeInOutSine = 'easeInOutSine';

	Proton.easeInExpo = 'easeInExpo';
	Proton.easeOutExpo = 'easeOutExpo';
	Proton.easeInOutExpo = 'easeInOutExpo';

	Proton.easeInCirc = 'easeInCirc';
	Proton.easeOutCirc = 'easeOutCirc';
	Proton.easeInOutCirc = 'easeInOutCirc';

	Proton.easeInBack = 'easeInBack';
	Proton.easeOutBack = 'easeOutBack';
	Proton.easeInOutBack = 'easeInOutBack';
	
})(Proton);
