import Util from "../utils/Util";
import ArraySpan from "../math/ArraySpan";
import Initialize from "./Initialize";

export default class Body extends Initialize {
  constructor(image, w, h) {
    super();

    this.image = this.setSpanValue(image);
    this.w = Util.initValue(w, 20);
    this.h = Util.initValue(h, this.w);
    this.name = "Body";
  }

  initialize(particle) {
    const imageTarget = this.image.getValue();

    if (typeof imageTarget === "string") {
      particle.body = {
        width: this.w,
        height: this.h,
        src: imageTarget,
        isInner: true,
        inner: true
      };
    } else {
      particle.body = imageTarget;
    }
  }

  setSpanValue(image) {
    return image instanceof ArraySpan ? image : new ArraySpan(image);
  }
}
