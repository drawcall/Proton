import Pool from "./Pool";
import Util from "../utils/Util";
import Stats from "../debug/Stats";
import EventDispatcher from "../events/EventDispatcher";
import MathUtil from "../math/MathUtil";
import Integration from "../math/Integration";

export default class Proton {
  static USE_CLOCK = false;

  // measure 1:100
  static MEASURE = 100;
  static EULER = "euler";
  static RK2 = "runge-kutta2";

  // event name
  static PARTICLE_CREATED = "PARTICLE_CREATED";
  static PARTICLE_UPDATE = "PARTICLE_UPDATE";
  static PARTICLE_SLEEP = "PARTICLE_SLEEP";
  static PARTICLE_DEAD = "PARTICLE_DEAD";

  static EMITTER_ADDED = "EMITTER_ADDED";
  static EMITTER_REMOVED = "EMITTER_REMOVED";

  static PROTON_UPDATE = "PROTON_UPDATE";
  static PROTON_UPDATE_AFTER = "PROTON_UPDATE_AFTER";
  static DEFAULT_INTERVAL = 0.0167;

  static amendChangeTabsBug = true;

  /**
   * The constructor to add emitters
   *
   * @constructor Proton
   *
   * @todo proParticleCount is not in use
   * @todo add more documentation of the single properties and parameters
   *
   * @param {Number} [proParticleCount] not in use?
   * @param {Number} [integrationType=Proton.EULER]
   *
   * @property {String} [integrationType=Proton.EULER]
   * @property {Array} emitters   All added emitter
   * @property {Array} renderers  All added renderer
   * @property {Number} time      The active time
   * @property {Number} oldtime   The old time
   */
  constructor(integrationType) {
    this.emitters = [];
    this.renderers = [];

    this.time = 0;
    this.now = 0;
    this.then = 0;
    this.elapsed = 0;

    this.stats = new Stats(this);
    this.pool = new Pool(80);

    this.integrationType = Util.initValue(integrationType, Proton.EULER);
    this.integrator = new Integration(this.integrationType);

    this._fps = "auto";
    this._interval = Proton.DEFAULT_INTERVAL;
  }

  set fps(fps) {
    this._fps = fps;
    this._interval =
      fps === "auto" ? Proton.DEFAULT_INTERVAL : MathUtil.floor(1 / fps, 7);
  }

  get fps() {
    return this._fps;
  }

  /**
   * add a type of Renderer
   *
   * @method addRenderer
   * @memberof Proton
   * @instance
   *
   * @param {Renderer} render
   */
  addRenderer(render) {
    render.init(this);
    this.renderers.push(render);
  }

  /**
   * @name add a type of Renderer
   *
   * @method addRenderer
   * @param {Renderer} render
   */
  removeRenderer(render) {
    const index = this.renderers.indexOf(render);
    this.renderers.splice(index, 1);
    render.remove(this);
  }

  /**
   * add the Emitter
   *
   * @method addEmitter
   * @memberof Proton
   * @instance
   *
   * @param {Emitter} emitter
   */
  addEmitter(emitter) {
    this.emitters.push(emitter);
    emitter.parent = this;

    this.dispatchEvent(Proton.EMITTER_ADDED, emitter);
  }

  /**
   * Removes an Emitter
   *
   * @method removeEmitter
   * @memberof Proton
   * @instance
   *
   * @param {Proton.Emitter} emitter
   */
  removeEmitter(emitter) {
    const index = this.emitters.indexOf(emitter);
    this.emitters.splice(index, 1);
    emitter.parent = null;

    this.dispatchEvent(Proton.EMITTER_REMOVED, emitter);
  }

  /**
   * Updates all added emitters
   *
   * @method update
   * @memberof Proton
   * @instance
   */
  update() {
    // 'auto' is the default browser refresh rate, the vast majority is 60fps
    if (this._fps === "auto") {
      this.dispatchEvent(Proton.PROTON_UPDATE);

      if (Proton.USE_CLOCK) {
        if (!this.then) this.then = new Date().getTime();
        this.now = new Date().getTime();
        this.elapsed = (this.now - this.then) * 0.001;
        // Fix bugs such as chrome browser switching tabs causing excessive time difference
        this.amendChangeTabsBug();

        if (this.elapsed > 0) this.emittersUpdate(this.elapsed);
        this.then = this.now;
      } else {
        this.emittersUpdate(Proton.DEFAULT_INTERVAL);
      }

      this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
    }

    // If the fps frame rate is set
    else {
      if (!this.then) this.then = new Date().getTime();
      this.now = new Date().getTime();
      this.elapsed = (this.now - this.then) * 0.001;

      if (this.elapsed > this._interval) {
        this.dispatchEvent(Proton.PROTON_UPDATE);
        this.emittersUpdate(this._interval);
        // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
        this.then = this.now - (this.elapsed % this._interval) * 1000;
        this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
      }
    }
  }

  emittersUpdate(elapsed) {
    let i = this.emitters.length;
    while (i--) this.emitters[i].update(elapsed);
  }

  /**
   * @todo add description
   *
   * @method amendChangeTabsBug
   * @memberof Proton
   * @instance
   */
  amendChangeTabsBug() {
    if (!Proton.amendChangeTabsBug) return;
    if (this.elapsed > 0.5) {
      this.then = new Date().getTime();
      this.elapsed = 0;
    }
  }

  /**
   * Counts all particles from all emitters
   *
   * @method getCount
   * @memberof Proton
   * @instance
   */
  getCount() {
    let total = 0;
    let i = this.emitters.length;

    while (i--) total += this.emitters[i].particles.length;
    return total;
  }

  getAllParticles() {
    let particles = [];
    let i = this.emitters.length;

    while (i--) particles = particles.concat(this.emitters[i].particles);
    return particles;
  }

  destroyAllEmitters() {
    Util.destroyAll(this.emitters);
  }

  /**
   * Destroys everything related to this Proton instance. This includes all emitters, and all properties
   *
   * @method destroy
   * @memberof Proton
   * @instance
   */
  destroy(remove = false) {
    const destroyOther = () => {
      this.time = 0;
      this.then = 0;
      this.pool.destroy();

      Util.destroyAll(this.emitters);
      Util.destroyAll(this.renderers, this.getAllParticles());
    };

    if (remove) {
      setTimeout(destroyOther, 200);
    } else {
      destroyOther();
    }
  }
}

EventDispatcher.bind(Proton);
