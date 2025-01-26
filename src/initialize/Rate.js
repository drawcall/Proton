import Span from "../math/Span";
import Util from "../utils/Util";

/**
 * Rate class for controlling particle emission rate.
 */
export default class Rate {
  /**
   * @type {Span}
   * @private
   */
  numPan;

  /**
   * @type {Span}
   * @private
   */
  timePan;

  /**
   * @type {number}
   * @private
   */
  startTime;

  /**
   * @type {number}
   * @private
   */
  nextTime;

  /**
   * Creates a new Rate instance.
   * The number of particles per second emission (a [particle]/b [s]).
   * @param {Array|number|Span} [numpan=1] - The number of particles for each emission.
   * @param {Array|number|Span} [timepan=1] - The time interval between each emission.
   * @example
   * // Create a rate of 10-20 particles every 0.1-0.25 seconds
   * new Rate(new Span(10, 20), new Span(0.1, 0.25));
   */
  constructor(numpan, timepan) {
    this.numPan = Span.setSpanValue(Util.initValue(numpan, 1));
    this.timePan = Span.setSpanValue(Util.initValue(timepan, 1));

    this.startTime = 0;
    this.nextTime = 0;
    this.init();
  }

  /**
   * Initializes the rate.
   * @private
   */
  init() {
    this.startTime = 0;
    this.nextTime = this.timePan.getValue();
  }

  /**
   * Gets the number of particles to emit based on the elapsed time.
   * @param {number} time - The elapsed time since the last update.
   * @returns {number} The number of particles to emit.
   */
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
