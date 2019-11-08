import Mat3 from "../math/Mat3";

export default class MStack {
  constructor() {
    this.mats = [];
    this.size = 0;

    for (let i = 0; i < 20; i++)
      this.mats.push(Mat3.create([0, 0, 0, 0, 0, 0, 0, 0, 0]));
  }

  set(m, i) {
    if (i === 0) Mat3.set(m, this.mats[0]);
    else Mat3.multiply(this.mats[i - 1], m, this.mats[i]);

    this.size = Math.max(this.size, i + 1);
  }

  push(m) {
    if (this.size === 0) Mat3.set(m, this.mats[0]);
    else Mat3.multiply(this.mats[this.size - 1], m, this.mats[this.size]);

    this.size++;
  }

  pop() {
    if (this.size > 0) this.size--;
  }

  top() {
    return this.mats[this.size - 1];
  }
}
