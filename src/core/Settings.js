class Settings {
  constructor() {
    this.measure = 100;
  }

  // get measure() {
  //   return this._measure;
  // }

  // set measure(value) {
  //   if (typeof value === "number" && value > 0) {
  //     this._measure = value;
  //   } else {
  //     console.warn("MEASURE must be a positive number");
  //   }
  // }
}

export default new Settings();
