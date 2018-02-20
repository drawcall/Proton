import Util from '../utils/Util';
import Initialize from './Initialize';
import MathUtils from '../math/MathUtils';

export default {

	initialize(emitter, particle, initializes) {
		const length = initializes.length;
		let i;

		for (i = 0; i < length; i++) {
			if (initializes[i] instanceof Initialize)
				initializes[i].init(emitter, particle);
			else
				this.init(emitter, particle, initializes[i]);
		}

		this.bindEmitter(emitter, particle);
	},

	//////////////////////init//////////////////////
	init(emitter, particle, initialize) {
		Util.setPrototypeByObject(particle, initialize);
		Util.setVector2DByObject(particle, initialize);
	},
	
	bindEmitter(emitter, particle) {
		if (emitter.bindEmitter) {
			particle.p.add(emitter.p);
			particle.v.add(emitter.v);
			particle.a.add(emitter.a);

			particle.v.rotate(MathUtils.degreeTransform(emitter.rotation));
		}
	}
}
