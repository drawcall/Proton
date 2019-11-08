import Zone from "./Zone";
import Util from "../utils/Util";

export default class ImageZone extends Zone {
  constructor(imageData, x, y, d) {
    super();

    this.reset(imageData, x, y, d);
  }

  reset(imageData, x, y, d) {
    this.imageData = imageData;
    this.x = Util.initValue(x, 0);
    this.y = Util.initValue(y, 0);
    this.d = Util.initValue(d, 2);

    this.vectors = [];
    this.setVectors();
  }

  setVectors() {
    let i, j;
    const length1 = this.imageData.width;
    const length2 = this.imageData.height;

    for (i = 0; i < length1; i += this.d) {
      for (j = 0; j < length2; j += this.d) {
        let index = ((j >> 0) * length1 + (i >> 0)) * 4;

        if (this.imageData.data[index + 3] > 0) {
          this.vectors.push({ x: i + this.x, y: j + this.y });
        }
      }
    }

    return this.vector;
  }

  getBound(x, y) {
    var index = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
    if (this.imageData.data[index + 3] > 0) return true;
    else return false;
  }

  getPosition() {
    const vector = Util.getRandFromArray(this.vectors);
    return this.vector.copy(vector);
  }

  getColor(x, y) {
    x -= this.x;
    y -= this.y;
    var i = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;

    return {
      r: this.imageData.data[i],
      g: this.imageData.data[i + 1],
      b: this.imageData.data[i + 2],
      a: this.imageData.data[i + 3]
    };
  }

  crossing(particle) {
    if (this.crossType === "dead") {
      if (this.getBound(particle.p.x - this.x, particle.p.y - this.y))
        particle.dead = true;
      else particle.dead = false;
    } else if (this.crossType === "bound") {
      if (!this.getBound(particle.p.x - this.x, particle.p.y - this.y))
        particle.v.negate();
    }
  }
}
