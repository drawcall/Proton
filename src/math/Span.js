import Util from '../utils/Util';
import MathUtils from '../math/MathUtils';

export default class Span {

	constructor(a, b, center) {
		this.isArray = false;

		if (Util.isArray(a)) {
			this.isArray = true;
			this.a = a;
		} else {
			this.a = Util.initValue(a, 1);
			this.b = Util.initValue(b, this.a);
			this.center = Util.initValue(center, false);
		}

	}

	getValue(INT) {
		if (this.isArray) {
			return this.a[Math.floor(this.a.length * Math.random())];
		} else {
			if (!this.center)
				return MathUtils.randomAToB(this.a, this.b, INT);
			else
				return MathUtils.randomFloating(this.a, this.b, INT);
		}
	}
}