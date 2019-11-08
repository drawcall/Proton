import Util from "../utils/Util";
import Emitter from "./Emitter";

export default class FollowEmitter extends Emitter {
  /**
   * The FollowEmitter class inherits from Proton.Emitter
   *
   * use the FollowEmitter will emit particle when mousemoving
   *
   * @class Proton.FollowEmitter
   * @constructor
   * @param {Element} mouseTarget mouseevent's target;
   * @param {Number} ease the easing of following speed;
   * @default 0.7
   * @param {Object} conf the parameters object;
   */
  constructor(mouseTarget, ease, conf) {
    super(conf);

    this.mouseTarget = Util.initValue(mouseTarget, window);
    this.ease = Util.initValue(ease, 0.7);

    this._allowEmitting = false;
    this.initEventHandler();
  }

  initEventHandler() {
    this.mousemoveHandler = e => this.mousemove.call(this, e);
    this.mousedownHandler = e => this.mousedown.call(this, e);
    this.mouseupHandler = e => this.mouseup.call(this, e);

    this.mouseTarget.addEventListener(
      "mousemove",
      this.mousemoveHandler,
      false
    );
  }

  /**
   * start emit particle
   * @method emit
   */
  emit() {
    this._allowEmitting = true;
  }

  /**
   * stop emiting
   * @method stop
   */
  stop() {
    this._allowEmitting = false;
  }

  mousemove(e) {
    if (e.layerX || e.layerX === 0) {
      this.p.x += (e.layerX - this.p.x) * this.ease;
      this.p.y += (e.layerY - this.p.y) * this.ease;
    } else if (e.offsetX || e.offsetX === 0) {
      this.p.x += (e.offsetX - this.p.x) * this.ease;
      this.p.y += (e.offsetY - this.p.y) * this.ease;
    }

    if (this._allowEmitting) super.emit("once");
  }

  /**
   * Destory this Emitter
   * @method destroy
   */
  destroy() {
    super.destroy();
    this.mouseTarget.removeEventListener(
      "mousemove",
      this.mousemoveHandler,
      false
    );
  }
}
