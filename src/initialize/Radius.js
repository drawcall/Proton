import Util from '../utils/Util';
import Initialize from './Initialize';

export default class Radius extends Initialize {

	constructor(a, b, c) {
		super();
		this.radius = Util.setSpanValue(a, b, c);

		this.name = 'Radius';
	}

	reset(a, b, c) {
		this.radius = Util.setSpanValue(a, b, c);
	};

	initialize(particle) {
		particle.radius = this.radius.getValue();
		particle.transform.oldRadius = particle.radius;
	};
}