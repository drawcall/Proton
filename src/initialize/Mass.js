import Util from '../utils/Util';
import Initialize from './Initialize';

export default class Mass extends Initialize {

	constructor(a, b, c) {
		super();
		this.massPan = Util.setSpanValue(a, b, c);
		this.name = 'Mass';
	}

	initialize(target) {
		target.mass = this.massPan.getValue();
	}
}