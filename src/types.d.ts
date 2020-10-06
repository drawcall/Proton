interface Dict<T extends any = any> {
  [key: string]: T;
}

type AnyObj = { [key: string]: any };
type AnyFn = (...args: any[]) => any;

// PIT is short of ProtonIntegrationType
type PIT_euler = "euler";
type PIT_runge_kutta2 = "runge-kutta2";
type PIT_types = PIT_euler | PIT_runge_kutta2;

type PARTICLE_CREATED = "PARTICLE_CREATED";
type PARTICLE_DEAD = "PARTICLE_DEAD";
type PARTICLE_SLEEP = "PARTICLE_SLEEP";
type PARTICLE_UPDATE = "PARTICLE_UPDATE";
type PROTON_UPDATE = "PROTON_UPDATE";
type PROTON_UPDATE_AFTER = "PROTON_UPDATE_AFTER";
type PARTICLE_EVENT =
  | PARTICLE_CREATED
  | PARTICLE_DEAD
  | PARTICLE_SLEEP
  | PARTICLE_UPDATE;
type PROTON_EVENT = PROTON_UPDATE | PROTON_UPDATE_AFTER;

type InvalidValues = number | string | boolean | AnyFn | any[];

interface ParticleCtorConf {
  life: number;
  dead: boolean;
}

interface VectorValConf {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  ax?: number;
  ay?: number;
  p?: number;
  v?: number;
  a?: number;
  position?: number;
  velocity?: number;
  accelerate?: number;
}

interface VectorV {
  x: number;
  y: number;
}

declare class BaseRenderer {
  constructor(element: HTMLElement, stroke: any);
  setStroke(color: string, thinkness: number): void;
  initHandler(): void;
  init(t: any): void;
  resize(width: number, heigh: number): void;
  destroy(t: any): void;
  remove(): void;
  onProtonUpdate(): void;
  onProtonUpdateAfter(): void;
  onEmitterAdded(emitter: Proton.Emitter): void;
  onEmitterRemoved(emitter: Proton.Emitter): void;
  onParticleCreated(particle: Proton.Particle): void;
  onParticleUpdate(particle: Proton.Particle): void;
  onParticleDead(particle: Proton.Particle): void;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

declare class Ease {
  static easeInBack(value: number): number;

  static easeInCirc(value: number): number;

  static easeInCubic(value: number): number;

  static easeInExpo(value: number): number;

  static easeInOutBack(value: number): number;

  static easeInOutCirc(value: number): number;

  static easeInOutCubic(value: number): number;

  static easeInOutExpo(value: number): number;

  static easeInOutQuad(value: number): number;

  static easeInOutQuart(value: number): number;

  static easeInOutSine(value: number): number;

  static easeInQuad(value: number): number;

  static easeInQuart(value: number): number;

  static easeInSine(value: number): number;

  static easeLinear(value: number): number;

  static easeOutBack(value: number): number;

  static easeOutCirc(value: number): number;

  static easeOutCubic(value: number): number;

  static easeOutExpo(value: number): number;

  static easeOutQuad(value: number): number;

  static easeOutQuart(value: number): number;

  static easeOutSine(value: number): number;

  static getEasing(value: number): number;
}

// 实际上代码里 Proton 并未继承 Ease， Ease里的所有方法是通过Object.assign分配到Proton上的，
// 同时Proton也可以通过Proton.ease 访问Ease里的所有方法, 所有抽出一个Ease，
// 让Proton类继承它，同时也让Proton命名空间里有个ease常量类型定义为它
declare class Proton extends Ease {
  static CustomRenderer(t: any): any;

  static DEFAULT_INTERVAL: number;

  static EMITTER_ADDED: string;

  static EMITTER_REMOVED: string;

  static EULER: PIT_euler;

  static RK2: PIT_runge_kutta2;

  static MEASURE: number;

  static PARTICLE_CREATED: PARTICLE_CREATED;

  static PARTICLE_DEAD: PARTICLE_DEAD;

  static PARTICLE_SLEEP: PARTICLE_SLEEP;

  static PARTICLE_UPDATE: PARTICLE_UPDATE;

  static PROTON_UPDATE: PROTON_UPDATE;

  static PROTON_UPDATE_AFTER: PROTON_UPDATE_AFTER;

  static USE_CLOCK: "USE_CLOCK";

  static amendChangeTabsBug: boolean;

  // !!! 已在 namespace里定义
  // static createArraySpan(t: any): any;

  // !!! 已在 namespace里定义
  // static getSpan(t: any, e: any, i: any): any;

  fps: number;

  integrationType: PIT_types;

  emitters: Proton.Emitter[];

  renderers: BaseRenderer[];

  time: number;

  oldtime: number;

  constructor(integrationType: PIT_types);

  /**
   * add the Emitter
   *
   * @method addEmitter
   * @memberof Proton
   * @instance
   *
   * @param {Proton.Emitter} emitter
   */
  addEmitter(emitter: Proton.Emitter): void;

  addEventListener(type: string, listener: Function): Function;

  /**
   * add a type of Renderer
   *
   * @method addRenderer
   * @memberof Proton
   * @instance
   *
   * @param {BaseRenderer} render
   */
  addRenderer<T extends BaseRenderer>(render: T): void;

  amendChangeTabsBug(): void;

  /**
   * Destroys everything related to this Proton instance. This includes all emitters, and all properties
   *
   * @method destroy
   * @memberof Proton
   * @param {boolean} [remove=false]
   */
  destroy(remove: boolean): void;

  destroyAllEmitters(): void;

  dispatchEvent(t: any, e: any): any;

  emittersUpdate(t: any): void;

  getAllParticles(): any;

  /**
   * Counts all particles from all emitters
   *
   * @method getCount
   * @memberof Proton
   * @instance
   */
  getCount(): number;

  hasEventListener(t: any): any;

  removeAllEventListeners(t: any): void;

  removeEmitter(t: any): void;

  removeEventListener(t: any, e: any): void;

  removeRenderer(t: any): void;

  update(): void;
}

/**
 * Advanced Combinations
 * see https://www.typescriptlang.org/docs/handbook/declaration-files/deep-dive.html
 */
declare namespace Proton {
  const getSpan: (a: any, b: any, center: any) => typeof Span;

  const createArraySpan: typeof ArraySpan.createArraySpan;

  class Alpha {
    name: string;

    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Alpha
     *
     * @todo add description for 'a' and 'b'
     *
     * @param {Number} a
     * @param {String} b
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */
    constructor(a: number, b: string, life: number, easing: string);

    /**
     * @method applyBehaviour
     * @memberof Proton#Proton.Alpha
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    applyBehaviour(
      particle: Proton.Particle,
      time: number,
      index: number
    ): void;

    /**
     * Sets the new alpha value of the particle
     *
     * @method initialize
     * @memberof Proton#Proton.Alpha
     * @instance
     *
     * @param {Proton.Particle} particle A single Proton generated particle
     */
    initialize(particle: Proton.Particle): void;

    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Alpha
     * @instance
     *
     * @todo add description for 'a' and 'b'
     *
     * @param {Number} a
     * @param {String} b
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */
    reset(a: number, b: string, life: number, easing: string): void;

    static id: number;
  }

  class ArraySpan {
    constructor(t: any);

    getValue(): any;

    /**
     * Make sure that the color is an instance of Proton.ArraySpan, if not it makes a new instance
     */
    static createArraySpan(arr: any[]): any;

    static getSpanValue(t: any): any;

    static setSpanValue(t: any, e: any, i: any): any;
  }

  const A: Attraction;

  class Attraction {
    /**
     * This behaviour let the particles follow one specific Proton.Vector2D
     *
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Attraction
     *
     * @todo add description for 'force' and 'radius'
     *
     * @param {Proton.Vector2D} targetPosition the attraction point coordinates
     * @param {Number} [force=100]
     * @param {Number} [radius=1000]
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {Proton.Vector2D} targetPosition
     * @property {Number} radius
     * @property {Number} force
     * @property {Number} radiusSq
     * @property {Proton.Vector2D} attractionForce
     * @property {Number} lengthSq
     * @property {String} name The Behaviour name
     */
    constructor(
      targetPosition: Proton.Vector2D,
      force: number,
      radius: number,
      life: number,
      easing: string
    );

    applyBehaviour(t: any, e: any, i: any): void;

    reset(t: any, e: any, i: any, a: any, r: any): void;

    static id: number;
  }

  class Behaviour {
    static id: number;
    id: number;
    age: number;
    energy: number;
    dead: boolean;
    parents: Behaviour[];
    name: string;

    /**
     * The Behaviour class is the base for the other Behaviour
     *
     * @memberof! -
     * @interface
     * @alias Proton.Behaviour
     *
     * @param {Number} life 	the behaviours life
     * @param {String} easing 	The behaviour's decaying trend, for example ease.easeOutQuart
     *
     * @property {String}  id 		The behaviours id
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     * @property {Number}  age=0 	How long the particle should be 'alife'
     * @property {Number}  energy=1
     * @property {Boolean} dead=false The particle is dead at first
     * @property {Array}   parents 	The behaviour's parents array
     * @property {String}  name 	The behaviour name
     */
    constructor(life: number, easing: string);

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     */
    calculate(particle: Particle, time: number): void;

    destroy(): void;

    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton.Behaviour
     */
    initialize(t: any): void;

    /**
     * Normalize a force by 1:100;
     *
     * @method normalizeForce
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Vector2D} force
     */
    normalizeForce(force: Vector2D): Vector2D;

    /**
     * Normalize a value by 1:100;
     *
     * @method normalizeValue
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Number} value
     */
    normalizeValue(value: number): number;

    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Number} [life=Infinity] 		this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     */
    reset(life: number, easing: string): void;
  }

  class BehaviourEmitter {
    constructor(t: any);

    addSelfBehaviour(...args: any[]): void;

    removeSelfBehaviour(t: any): void;

    update(t: any): void;
  }

  const B: Body;

  class Body extends Initialize {
    constructor(image: ArraySpan | string, w: number, h: number);

    initialize(t: any): void;

    setSpanValue(t: any): any;
  }

  class CanvasRenderer extends BaseRenderer {
    constructor(element: HTMLElement);

    addImg2Body(img: string, particle: Particle): void;

    createBuffer(image: HTMLImageElement): any;

    drawCircle(particle: Particle): void;

    drawImage(particle: Particle): void;

    onParticleCreated(particle: Particle): void;

    onParticleDead(particle: Particle): void;

    onParticleUpdate(particle: Particle): void;

    onProtonUpdate(): void;

    resize(width: number, heigh: number): void;
  }

  class DomRenderer extends BaseRenderer {
    constructor(element: HTMLElement);

    addImg2Body(t: any, e: any): void;

    bodyReady(particle: Particle): boolean;

    createBody(body: any, particle: Particle): HTMLDivElement;

    createCircle(particle: Particle): HTMLDivElement;

    createSprite(body: any, particle: Particle): HTMLDivElement;

    onParticleCreated(particle: Particle): void;

    onParticleDead(particle: Particle): void;

    onParticleUpdate(particle: Particle): void;
  }

  class EaselRenderer extends BaseRenderer {
    constructor(element: HTMLElement, stroke: any);

    createCircle(particle: Particle): HTMLDivElement;

    createSprite(t: any): void;

    onParticleCreated(particle: Particle): void;

    onParticleDead(particle: Particle): void;

    onParticleUpdate(particle: Particle): void;
  }

  class PixelRenderer extends BaseRenderer {
    constructor(element: HTMLElement, stroke: any);

    createImageData(t: any): void;

    onParticleCreated(particle: Particle): void;

    onParticleDead(particle: Particle): void;

    onParticleUpdate(particle: Particle): void;

    onProtonUpdate(): void;

    onProtonUpdateAfter(): void;

    resize(width: number, height: number): void;

    setPixel(imagedata: any, x: number, y: number, particle: Particle): void;
  }

  class PixiRenderer extends BaseRenderer {
    constructor(element: HTMLElement, stroke: any);

    createBody(t: any, e: any): any;

    createCircle(t: any): any;

    createSprite(t: any): any;

    destroy(t: any): void;

    onParticleCreated(particle: Particle): void;

    onParticleDead(particle: Particle): void;

    onParticleUpdate(particle: Particle): void;

    onProtonUpdate(): void;

    setPIXI(t: any): void;

    transform(t: any, e: any): void;
  }

  class CircleZone extends Zone {
    x: number;

    y: number;

    radius: number;

    /** @default 0 */
    angle: number;

    center: { x: number; y: number };

    constructor(t: any, e: any, i: any);

    crossing(particle: Particle): void;

    getGradient(particle: Particle): number;

    getPosition(): any;

    getSymmetric(particle: Particle): void;

    setCenter(x: number, y: number): void;
  }

  class Collision {
    constructor(t: any, e: any, i: any, a: any, r: any);

    applyBehaviour(t: any, e: any, i: any): void;

    reset(t: any, e: any, i: any, a: any, r: any): void;

    static id: number;
  }

  class Color {
    constructor(t: any, e: any, i: any, a: any);

    applyBehaviour(t: any, e: any, i: any): void;

    initialize(t: any): void;

    reset(t: any, e: any, i: any, a: any): void;

    static id: number;
  }

  class CrossZone extends Behaviour {
    zone: Zone;

    name: "CrossZone";

    /**
     * Defines what happens if the particles come to the end of the specified zone
     *
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.CrossZone
     *
     * @param {Proton.Zone} zone 						can be any Proton.Zone - e.g. Proton.RectZone()
     * @param {String} 		[crossType=dead] 			what happens if the particles pass the zone - allowed strings: dead | bound | cross
     * @param {Number} 		[life=Infinity] 			this behaviour's life
     * @param {String} 		[easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    constructor(zone: Zone, crossType: string, life: number, easing: string);

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.CrossZone
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    applyBehaviour(particle: Particle, time: number, index: number): void;

    reset(zone: Zone, crossType: string, life: number, easing: string): void;

    static id: number;
  }

  class Cyclone extends Behaviour {
    name: "Cyclone";

    constructor(t: any, e: any, i: any, a: any);

    applyBehaviour(t: any, e: any, i: any): void;

    initialize(t: any): void;

    reset(t: any, e: any, i: any, a: any): void;

    setAngleAndForce(t: any, e: any): void;

    static id: number;
  }

  class Emitter extends Particle {
    particles: Particle[];
    behaviours: Behaviour[];
    initializes: Initialize[];
    emitTime: number;
    emitSpeed: number;
    totalTime: number;
    /**
     * The friction coefficient for all particle emit by This;
     * @default 0.006
     */
    damping: number;
    /**
     * If bindEmitter the particles can bind this emitter's property;
     * @default true
     */
    bindEmitter: boolean;
    /**
     * If bindEmitter the particles can bind this emitter's property;
     * @default {Rate(1, .1)}
     */
    rate: Rate;
    name: string;
    id: string;

    constructor(conf: ParticleCtorConf);

    /**
     * add the Behaviour to particles;
     *
     * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addBehaviour
     * @param {Behaviour} behaviour like this new Color('random')
     */
    addBehaviour(...args: Behaviour[]): void;

    addEventListener(t: any, e: any): any;

    /**
     * add the Initialize to particles;
     *
     * you can use initializes array:for example emitter.addInitialize(initialize1,initialize2,initialize3);
     * @method addInitialize
     * @param {Initialize} initialize like this new Radius(1, 12)
     */
    addInitialize(...args: Initialize[]): void;

    /**
     * add initialize to this emitter
     * @method addSelfInitialize
     */
    addSelfInitialize(initialize: Initialize): void;

    /**
     * create single particle;
     *
     * can use emit({x:10},new Gravity(10),{'particleUpdate',fun}) or emit([{x:10},new Initialize],new Gravity(10),{'particleUpdate',fun})
     */
    createParticle(initialize: Initialize, behaviour: Behaviour): any;

    destroy(): void;

    dispatch(t: any, e: any): void;

    dispatchEvent(t: any, e: any): any;

    /**
     * start emit particle
     * @method emit
     * @param {Number} emitTime begin emit time;
     * @param {String} life the life of this emitter
     */
    emit(emitTime: number, life: string): void;

    emitting(t: any): void;

    hasEventListener(t: any): any;

    integrate(time: number): void;

    preEmit(time: number): void;

    remove(): void;

    removeAllBehaviours(): void;

    removeAllEventListeners(t: any): void;

    removeAllInitializers(): void;

    removeAllParticles(): void;

    /**
     * remove the Behaviour
     * @method removeBehaviour
     * @param {Behaviour} behaviour a behaviour
     */
    removeBehaviour(behaviour: Behaviour): any;

    removeEventListener(t: any, e: any): void;

    /**
     * remove the Initialize
     * @method removeInitialize
     * @param {Initialize} initialize a initialize
     */
    removeInitialize(initialize: Initialize): void;

    setupParticle(t: any, e: any, i: any): void;

    stop(): void;

    update(time: number): void;
  }

  class FollowEmitter {
    constructor(t: any, e: any, i: any);

    destroy(): void;

    emit(): void;

    initEventHandler(): any;

    mousemove(t: any): void;

    stop(): void;
  }

  const F: Force;

  class Force {
    constructor(t: any, e: any, i: any, a: any);

    applyBehaviour(t: any, e: any, i: any): void;

    reset(t: any, e: any, i: any, a: any): void;

    static id: number;
  }

  const G: Gravity;

  class Gravity extends Force {
    name: "Gravity";

    constructor(t: any, e: any, i: any);

    reset(t: any, e: any, i: any): void;

    static id: number;
  }

  class GravityWell extends Behaviour {
    distanceVec: Vector2D;

    centerPoint: number;

    force: number;

    name: "GravityWell";

    constructor(t: any, e: any, i: any, a: any);

    applyBehaviour(t: any, e: any): void;

    initialize(): void;

    reset(t: any, e: any, i: any, a: any): void;

    static id: number;
  }

  class ImageZone extends Zone {
    x: number;

    y: number;

    d: number;

    vectors: Vector2D[];

    constructor(t: any, e: any, i: any, a: any);

    crossing(t: any): void;

    getBound(t: any, e: any): any;

    getColor(x: number, y: number): boolean;

    getPosition(): any;

    reset(t: any, e: any, i: any, a: any): void;

    setVectors(): any;
  }

  const Init: Initialize;

  class Initialize {
    constructor();

    init(t: any, e: any): void;

    initialize(t: any): void;

    reset(t: any, e: any, i: any): void;
  }

  const L: Life;

  class Life extends Initialize {
    constructor(t: any, e: any, i: any);

    initialize(t: any): void;
  }

  class LineZone extends Zone {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    dx: number;
    dy: number;
    minx: number;
    miny: number;
    maxx: number;
    maxy: number;
    dot: number;
    xxyy: number;
    gradient: number;
    length: number;
    direction: number;

    constructor(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      direction: number
    );

    crossing(particle: Particle): void;

    getDirection(x: number, y: number): number;

    getDistance(x: number, y: number): number;

    getGradient(): number;

    getLength(): number;

    getPosition(): Vector2D;

    getSymmetric(v: any): any;

    rangeOut(particle: Particle): any;
  }

  const M: Mass;

  class Mass extends Initialize {
    name: string;

    massPan: Span;

    constructor(a: any, b: any, c: any);

    initialize(target: any): void;
  }

  const P: Particle;

  class Particle {
    id: string;

    old: { p: Vector2D; v: Vector2D; a: Vector2D };

    data: Dict;

    behaviours: Behaviour[];

    p: Vector2D;

    v: Vector2D;

    a: Vector2D;

    rgb: RGB;

    constructor(conf: ParticleCtorConf);

    getDirection(): number;

    reset(): this;

    update(time: number, index: number): void;

    applyBehaviours(time: number, index: number): void;

    addBehaviour(behaviour: Behaviour): void;

    addBehaviours(behaviours: Behaviour[]): void;

    removeBehaviour(behaviour: Behaviour): void;

    removeAllBehaviours(): void;

    destroy(): void;
  }

  class PointZone extends Zone {
    x: number;

    y: number;

    constructor(x: number, y: number);

    crossing(): void;

    getPosition(): Vector2D;
  }

  const Polar: Polar2D;

  class Polar2D {
    r: number;

    tha: number;

    constructor(r: number, tha: number);

    clear(): this;

    clone(): Polar2D;

    copy(t: any): any;

    equals(t: any): boolean;

    getX(): number;

    getY(): number;

    normalize(): this;

    set(r: number, tha: number): this;

    setR(r: number): this;

    setTha(tha: number): this;

    toVector(): Vector2D;
  }

  class Pool {
    total: number;

    cache: Dict;

    constructor(t: any);

    createOrClone(t: any, e: any): any;

    destroy(): void;

    expire(t: any): any;

    /**
     * @todo add description
     *
     * @method get
     * @memberof Proton#Proton.Pool
     *
     * @param {Object|Function} target
     * @param {Object} [params] just add if `target` is a function
     *
     * @return {Object}
     */
    get(target: Object | Function, params: any, uid: string): any;

    getCache(t: any, ...args: any[]): any;

    /**
     * @todo add description - what is in the cache?
     *
     * @method getCount
     * @memberof Proton#Proton.Pool
     *
     * @return {Number}
     */
    getCount(): number;
  }

  class Position {
    constructor(t: any);

    initialize(t: any): void;

    reset(t: any): void;
  }

  const R: Radius;

  class Radius extends Initialize {
    radius: Span;

    name: "Radius";

    constructor(t: any, e: any, i: any);

    initialize(particle: Particle): void;

    reset(t: any, e: any, i: any): void;
  }

  const RD: RandomDrift;

  class RandomDrift extends Behaviour {
    /** @default 0 */
    time: number;

    name: "RandomDrift";

    constructor(t: any, e: any, i: any, a: any, r: any);

    applyBehaviour(t: any, e: any, i: any): void;

    initialize(t: any): void;

    reset(t: any, e: any, i: any, a: any, r: any): void;

    static id: number;
  }

  class Rate {
    constructor(t: any, e: any);

    getValue(t: any): any;

    init(): void;
  }

  class RectZone extends Zone {
    constructor(t: any, e: any, i: any, a: any);

    crossing(particle: Particle): void;

    getPosition(): any;
  }

  class Rectangle {
    constructor(t: any, e: any, i: any, a: any);

    contains(t: any, e: any): any;
  }

  class Repulsion extends Attraction {
    name: "Repulsion";

    constructor(t: any, e: any, i: any, a: any, r: any);

    reset(t: any, e: any, i: any, a: any, r: any): void;

    static id: number;
  }

  class Rotate extends Behaviour {
    name: "Rotate";

    constructor(t: any, e: any, i: any, a: any, r: any);

    applyBehaviour(t: any, e: any, i: any): void;

    initialize(t: any): void;

    reset(t: any, e: any, i: any, a: any, r: any): void;

    static id: number;
  }

  const S: Scale;

  class Scale extends Behaviour {
    name: "Scale";

    constructor(t: any, e: any, i: any, a: any);

    applyBehaviour(t: any, e: any, i: any): void;

    initialize(t: any): void;

    reset(t: any, e: any, i: any, a: any): void;

    static id: number;
  }

  class Span {
    constructor(t: any, e: any, i: any);

    getValue(t: any, ...args: any[]): any;

    static getSpanValue(t: any): any;

    static setSpanValue(t: any, e: any, i: any): any;
  }

  const Vector: Vector2D;

  class Vector2D {
    /** @default 0 */
    x: number;
    /** @default 0 */
    y: number;

    constructor(x: number, y: number);

    add(v: VectorV, w: VectorV): this;

    addVectors(t: VectorV, e: VectorV): this;

    addXY(x: number, y: number): any;

    clear(): this;

    clone(): Vector2D;

    copy(v: VectorV): this;

    distanceTo(v: VectorV): number;

    distanceToSquared(v: VectorV): number;

    divideScalar(s: number): this;

    dot(v: VectorV): number;

    equals(v: VectorV): boolean;

    getGradient(): number;

    length(): number;

    lengthSq(): number;

    lerp(v: VectorV, alpha: number): this;

    multiplyScalar(s: number): this;

    negate(): this;

    normalize(): this;

    rotate(tha: number): this;

    set(x: number, y: number): this;

    setX(x: number): this;

    setY(y: number): this;

    sub(v: VectorV, w: VectorV): this;

    subVectors(a: VectorV, b: VectorV): this;
  }

  const V: Velocity;

  class Velocity extends Initialize {
    rPan: Span;

    thaPan: Span;

    type: string;

    name: string;

    constructor(rpan: Span | string, thapan: Span | string, type: string);

    initialize(target: any): void;

    normalizeVelocity(vr: number): number;

    reset(rpan: Span | string, thapan: Span | string, type: string): void;
  }

  const WebGlRenderer: WebGLRenderer;

  class WebGLRenderer extends BaseRenderer {
    constructor(t: any);

    addImg2Body(t: any, e: any): void;

    blendEquation(t: any): void;

    blendFunc(t: any, e: any): void;

    createCircle(t: any): any;

    drawImg2Canvas(t: any): void;

    getFragmentShader(): any;

    getShader(t: any, e: any, i: any): any;

    getVertexShader(): any;

    init(t: any): void;

    initBuffers(): void;

    initShaders(): void;

    initVar(): void;

    onParticleCreated(t: any): void;

    onParticleDead(): void;

    onParticleUpdate(t: any): void;

    onProtonUpdate(): void;

    resize(t: any, e: any): void;

    setMaxRadius(t: any): void;

    updateMatrix(t: any): void;
  }

  class Zone {
    vector: Vector2D;
    /**
     * @default 0
     */
    random: number;
    /**
     * @default 'dead'
     */
    crossType: string;
    /**
     * @default true
     */
    alert: boolean;

    constructor();

    crossing(particle: Particle): void;

    getPosition(): void;
  }

  namespace ColorUtil {
    /**
     * converts a hex value to a rgb object
     *
     * @memberof Proton#Proton.Util
     * @method hexToRgb
     *
     * @param {String} h any hex value, e.g. #000000 or 000000 for black
     *
     * @return {rgbObject}
     */
    function hexToRgb(hex: string): RGB;
    function rgbToHex(rgbObject: RGB): string;
    function getHex16FromParticle(particle: Proton.Particle): string;
  }

  namespace Debug {
    function addEventListener(t: any, e: any): any;

    function drawEmitter(t: any, e: any, i: any, a: any): void;

    function drawZone(t: any, e: any, i: any, a: any): void;

    function getStyle(t: any, ...args: any[]): any;
  }

  namespace Mat3 {
    function create(t: any): any;

    function inverse(t: any, e: any): any;

    function multiply(t: any, e: any, i: any): any;

    function multiplyVec2(t: any, e: any, i: any): any;

    function set(t: any, e: any): any;
  }

  namespace MathUtil {
    const Infinity: number;

    const N180_PI: number;

    const PI: number;

    const PI_180: number;

    const PI_2: number;

    const PIx2: number;

    function degreeTransform(t: any): any;

    function floor(t: any, e: any, ...args: any[]): any;

    function isInfinity(t: any): any;

    function randomAToB(t: any, e: any, i: any, ...args: any[]): any;

    function randomColor(): any;

    function randomFloating(t: any, e: any, i: any): any;

    function randomZone(): void;

    function toColor16(t: any): any;
  }

  namespace Util {
    function initValue(value: InvalidValues, defaults: any): any;
    function isArray(value: any): boolean;
    function emptyArray(arr: any[]): boolean;
    function toArray<T>(input: T): T extends any[] ? T : T[];
    function getRandFromArray<T>(input: T): T extends any[] ? number : null;
    /**
     * @description - Destroyes the given object
     */
    function emptyObject<T extends AnyObj>(input: T, ignore?: string[]): void;
    function classApply(constructor: Function, args?: any[]): any;
    function setVectorVal(particle: Particle, conf?: VectorValConf): void;
    function hasProp(target: any, key: string): boolean;
    function setProp<T extends AnyObj, U extends T>(
      target: T,
      props: string[]
    ): U;
    /**
     * This will get the image data. It could be necessary to create a Proton.Zone.
     *
     * @memberof Proton#Proton.Util
     * @method getImageData
     *
     * @param {HTMLCanvasElement}   context any canvas, must be a 2dContext 'canvas.getContext('2d')'
     * @param {Object}              image   could be any dom image, e.g. document.getElementById('thisIsAnImgTag');
     * @param {Proton.Rectangle}    rect
     */
    function getImageData(
      context: HTMLCanvasElement,
      image: object,
      rect: Proton.Rectangle
    ): void;
    function destroyAll(arr: any[], param?: any): void;
    function assign<T extends AnyObj>(target: AnyObj, source: AnyObj): T;
  }

  const ease: Ease;
}

declare let defaultExport: typeof Proton;
export default defaultExport;
