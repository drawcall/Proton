import Span from "../math/Span";
import Util from "../utils/Util";

export default class Rate {
  /**
   * The number of particles per second emission (a [particle]/b [s]);
   * @namespace
   * @memberof! Proton#
   * @constructor
   * @alias Rate
   *
   * @param {Array | Number | Span} numpan the number of each emission;
   * @param {Array | Number | Span} timepan the time of each emission;
   * for example: new Rate(new Span(10, 20), new Span(.1, .25));
   */
  constructor(numpan, timepan) {
    this.numPan = Span.setSpanValue(Util.initValue(numpan, 1));
    this.timePan = Span.setSpanValue(Util.initValue(timepan, 1));

    this.startTime = 0;
    this.nextTime = 0;
    this.init();
  }

  init() {
    this.startTime = 0;
    this.nextTime = this.timePan.getValue();
  }

  getValue(time) {
    this.startTime += time;

    if (this.startTime >= this.nextTime) {
      this.startTime = 0;
      this.nextTime = this.timePan.getValue();

      if (this.numPan.b === 1) {
        if (this.numPan.getValue(false) > 0.5) return 1;
        else return 0;
      } else {
        return this.numPan.getValue(true);
      }
    }

    return 0;
  }
}
