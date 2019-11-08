import Util from "../utils/Util";
import Initialize from "./Initialize";
import MathUtil from "../math/MathUtil";

export default {
  initialize(emitter, particle, initializes) {
    const length = initializes.length;
    let i;

    for (i = 0; i < length; i++) {
      if (initializes[i] instanceof Initialize) {
        initializes[i].init(emitter, particle);
      } else {
        this.init(emitter, particle, initializes[i]);
      }
    }

    this.bindEmitter(emitter, particle);
  },

  // init
  init(emitter, particle, initialize) {
    Util.setProp(particle, initialize);
    Util.setVectorVal(particle, initialize);
  },

  bindEmitter(emitter, particle) {
    if (emitter.bindEmitter) {
      particle.p.add(emitter.p);
      particle.v.add(emitter.v);
      particle.a.add(emitter.a);

      particle.v.rotate(MathUtil.degreeTransform(emitter.rotation));
    }
  }
};
