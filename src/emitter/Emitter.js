import Util from "../utils/Util";
import Puid from "../utils/Puid";
import Particle from "../core/Particle";
import EventDispatcher from "../events/EventDispatcher";

import Rate from "../initialize/Rate";
import InitializeUtil from "../initialize/InitializeUtil";

export default class Emitter extends Particle {
  /**
   * You can use this emit particles.
   *
   * It will dispatch follow events:
   * PARTICLE_CREATED
   * PARTICLE_UPDATA
   * PARTICLE_DEAD
   *
   * @class Emitter
   * @constructor
   * @param {Object} conf the parameters object;
   * for example {damping:0.01,bindEmitter:false}
   */
  constructor(conf = {}) {
    super(conf);

    this.particles = [];
    this.behaviours = [];
    this.initializes = [];

    this.emitTime = 0;
    this.emitSpeed = 0;
    this.totalTime = -1;

    /**
     * The friction coefficient for all particle emit by This;
     * @property damping
     * @type {Number}
     * @default 0.006
     */
    this.damping = 0.006;

    /**
     * If bindEmitter the particles can bind this emitter's property;
     * @property bindEmitter
     * @type {Boolean}
     * @default true
     */
    this.bindEmitter = true;

    /**
     * The number of particles per second emit (a [particle]/b [s]);
     * @property rate
     * @type {Rate}
     * @default Rate(1, .1)
     */
    this.rate = new Rate(1, 0.1);

    this.name = "Emitter";
    this.id = Puid.id(this.name);
  }

  /**
   * start emit particle
   * @method emit
   * @param {Number} emitTime begin emit time;
   * @param {String} life the life of this emitter
   */
  emit(totalTime, life) {
    this.stoped = false;
    this.emitTime = 0;
    this.totalTime = Util.initValue(totalTime, Infinity);

    if (life === true || life === "life" || life === "destroy") {
      this.life = totalTime === "once" ? 1 : this.totalTime;
    } else if (!isNaN(life)) {
      this.life = life;
    }

    this.rate.init();
  }

  /**
   * stop emiting
   * @method stop
   */
  stop() {
    this.totalTime = -1;
    this.emitTime = 0;
    this.stoped = true;
  }

  preEmit(time) {
    let oldStoped = this.stoped;
    let oldEmitTime = this.emitTime;
    let oldTotalTime = this.totalTime;

    this.stoped = false;
    this.emitTime = 0;
    this.totalTime = time;
    this.rate.init();

    const step = 0.0167;
    while (time > step) {
      time -= step;
      this.update(step);
    }

    this.stoped = oldStoped;
    this.emitTime = oldEmitTime + Math.max(time, 0);
    this.totalTime = oldTotalTime;
  }

  /**
   * remove current all particles
   * @method removeAllParticles
   */
  removeAllParticles() {
    let i = this.particles.length;
    while (i--) this.particles[i].dead = true;
  }

  /**
   * add initialize to this emitter
   * @method addSelfInitialize
   */
  addSelfInitialize(initialize) {
    if (initialize["init"]) {
      initialize.init(this);
    } else {
      this.initAll();
    }
  }

  /**
   * add the Initialize to particles;
   *
   * you can use initializes array:for example emitter.addInitialize(initialize1,initialize2,initialize3);
   * @method addInitialize
   * @param {Initialize} initialize like this new Radius(1, 12)
   */
  addInitialize(...rest) {
    let i = rest.length;
    while (i--) this.initializes.push(rest[i]);
  }

  /**
   * remove the Initialize
   * @method removeInitialize
   * @param {Initialize} initialize a initialize
   */
  removeInitialize(initializer) {
    const index = this.initializes.indexOf(initializer);
    if (index > -1) this.initializes.splice(index, 1);
  }

  /**
   * remove all Initializes
   * @method removeInitializers
   */
  removeAllInitializers() {
    Util.emptyArray(this.initializes);
  }

  /**
   * add the Behaviour to particles;
   *
   * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
   * @method addBehaviour
   * @param {Behaviour} behaviour like this new Color('random')
   */
  addBehaviour(...rest) {
    let i = arguments.length;
    while (i--) {
      let behaviour = rest[i];
      this.behaviours.push(behaviour);
      if (behaviour.parents) behaviour.parents.push(this);
    }
  }

  /**
   * remove the Behaviour
   * @method removeBehaviour
   * @param {Behaviour} behaviour a behaviour
   */
  removeBehaviour(behaviour) {
    let index = this.behaviours.indexOf(behaviour);
    this.behaviours.splice(index, 1);

    if (behaviour.parents) {
      index = behaviour.parents.indexOf(behaviour);
      behaviour.parents.splice(index, 1);
    }

    return index;
  }

  /**
   * remove all behaviours
   * @method removeAllBehaviours
   */
  removeAllBehaviours() {
    Util.emptyArray(this.behaviours);
  }

  // emitter update
  update(time) {
    this.age += time;
    if (this.age >= this.life || this.dead) this.destroy();

    this.emitting(time);
    this.integrate(time);
  }

  integrate(time) {
    if (!this.parent) return;

    const damping = 1 - this.damping;
    this.parent.integrator.calculate(this, time, damping);

    const length = this.particles.length;
    let i, particle;

    for (i = length - 1; i >= 0; i--) {
      particle = this.particles[i];

      // particle update
      particle.update(time, i);
      this.parent.integrator.calculate(particle, time, damping);
      this.dispatch("PARTICLE_UPDATE", particle);

      // check dead
      if (particle.dead) {
        this.dispatch("PARTICLE_DEAD", particle);

        this.parent.pool.expire(particle);
        this.particles.splice(i, 1);
      }
    }
  }

  dispatch(event, target) {
    this.parent && this.parent.dispatchEvent(event, target);
    this.bindEvent && this.dispatchEvent(event, target);
  }

  emitting(time) {
    if (this.totalTime === "once") {
      let i;
      const length = this.rate.getValue(99999);

      if (length > 0) this.emitSpeed = length;
      for (i = 0; i < length; i++) this.createParticle();
      this.totalTime = "none";
    } else {
      this.emitTime += time;

      if (this.emitTime < this.totalTime) {
        const length = this.rate.getValue(time);
        let i;

        if (length > 0) this.emitSpeed = length;
        for (i = 0; i < length; i++) this.createParticle();
      }
    }
  }

  /**
   * create single particle;
   *
   * can use emit({x:10},new Gravity(10),{'particleUpdate',fun}) or emit([{x:10},new Initialize],new Gravity(10),{'particleUpdate',fun})
   * @method removeAllParticles
   */
  createParticle(initialize, behaviour) {
    const particle = this.parent.pool.get(Particle);
    this.setupParticle(particle, initialize, behaviour);
    this.dispatch("PARTICLE_CREATED", particle);

    return particle;
  }

  setupParticle(particle, initialize, behaviour) {
    let initializes = this.initializes;
    let behaviours = this.behaviours;

    if (initialize) initializes = Util.toArray(initialize);
    if (behaviour) behaviours = Util.toArray(behaviour);

    particle.reset();
    InitializeUtil.initialize(this, particle, initializes);
    particle.addBehaviours(behaviours);
    particle.parent = this;

    this.particles.push(particle);
  }

  remove() {
    this.stop();
    Util.destroyAll(this.particles);
  }

  /**
   * Destory this Emitter
   * @method destroy
   */
  destroy() {
    this.dead = true;
    this.remove();
    this.removeAllInitializers();
    this.removeAllBehaviours();
    this.parent && this.parent.removeEmitter(this);
  }
}

EventDispatcher.bind(Emitter);
