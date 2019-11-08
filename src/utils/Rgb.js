export default class Rgb {
  constructor(r = 255, g = 255, b = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  reset() {
    this.r = 255;
    this.g = 255;
    this.b = 255;
  }
}
