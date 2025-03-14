declare class Stats {
    constructor(proton: any);
    proton: any;
    container: HTMLDivElement | null;
    type: number;
    emitterIndex: number;
    rendererIndex: number;
    update(style: any, body: any): void;
    add(style: any, body: any): void;
    getEmitter(): any;
    getRenderer(): any;
    concatArr(arr: any): string;
    getCreatedNumber(renderer: any): any;
    getEmitterPos(e: any): string;
    destroy(): void;
}

declare class Pool {
    /**
     * @memberof! Proton#
     * @constructor
     * @alias Proton.Pool
     *
     * @todo add description
     * @todo add description of properties
     *
     * @property {Number} total
     * @property {Object} cache
     */
    constructor(num: any);
    total: number;
    cache: {};
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
    get(target: Object | Function, params?: Object, uid: any): Object;
    /**
     * @todo add description
     *
     * @method set
     * @memberof Proton#Proton.Pool
     *
     * @param {Object} target
     *
     * @return {Object}
     */
    expire(target: Object): Object;
    /**
     * Creates a new class instance
     *
     * @todo add more documentation
     *
     * @method create
     * @memberof Proton#Proton.Pool
     *
     * @param {Object|Function} target any Object or Function
     * @param {Object} [params] just add if `target` is a function
     *
     * @return {Object}
     */
    createOrClone(target: Object | Function, params?: Object): Object;
    /**
     * @todo add description - what is in the cache?
     *
     * @method getCount
     * @memberof Proton#Proton.Pool
     *
     * @return {Number}
     */
    getCount(): number;
    /**
     * Destroyes all items from Pool.cache
     *
     * @method destroy
     * @memberof Proton#Proton.Pool
     */
    destroy(): void;
    /**
     * Returns Pool.cache
     *
     * @method getCache
     * @memberof Proton#Proton.Pool
     * @private
     *
     * @param {Number} uid the unique id
     *
     * @return {Object}
     */
    private getCache;
}

declare class Integration {
    constructor(type: any);
    type: any;
    calculate(particles: any, time: any, damping: any): void;
    eulerIntegrate(particle: any, time: any, damping: any): void;
}

declare class Proton$1 {
    static USE_CLOCK: boolean;
    static MEASURE: number;
    static EULER: string;
    static RK2: string;
    static PARTICLE_CREATED: string;
    static PARTICLE_UPDATE: string;
    static PARTICLE_SLEEP: string;
    static PARTICLE_DEAD: string;
    static EMITTER_ADDED: string;
    static EMITTER_REMOVED: string;
    static PROTON_UPDATE: string;
    static PROTON_UPDATE_AFTER: string;
    static DEFAULT_INTERVAL: number;
    static amendChangeTabsBug: boolean;
    /**
     * The constructor to add emitters
     *
     * @constructor Proton
     *
     * @todo add more documentation of the single properties and parameters
     *
     * @param {Number | undefined} [integrationType=Proton.EULER]
     *
     * @property {String} [integrationType=Proton.EULER]
     * @property {Array} emitters   All added emitter
     * @property {Array} renderers  All added renderer
     * @property {Number} time      The active time
     * @property {Number} oldtime   The old time
     */
    constructor(integrationType?: number | undefined);
    emitters: any[];
    renderers: any[];
    time: number;
    now: number;
    then: number;
    elapsed: number;
    stats: Stats;
    pool: Pool;
    integrationType: Mixed;
    integrator: Integration;
    _fps: string;
    _interval: number;
    /**
     * Sets the frames per second (FPS) for the Proton system.
     * @param {number|string} fps - The desired FPS. Use "auto" for default behavior, or a number for a specific FPS.
     */
    set fps(fps: number | string);
    /**
     * Gets the current frames per second (FPS) setting.
     * @returns {number|string} The current FPS setting. Returns "auto" if set to default, or a number representing the specific FPS.
     */
    get fps(): number | string;
    /**
     * add a type of Renderer
     *
     * @method addRenderer
     * @memberof Proton
     * @instance
     *
     * @param {Renderer} render
     */
    addRenderer(render: Renderer): void;
    /**
     * @name add a type of Renderer
     *
     * @method addRenderer
     * @param {Renderer} render
     */
    removeRenderer(render: Renderer): void;
    /**
     * add the Emitter
     *
     * @method addEmitter
     * @memberof Proton
     * @instance
     *
     * @param {Emitter} emitter
     */
    addEmitter(emitter: Emitter): void;
    /**
     * Removes an Emitter
     *
     * @method removeEmitter
     * @memberof Proton
     * @instance
     *
     * @param {Proton.Emitter} emitter
     */
    removeEmitter(emitter: Proton$1.Emitter): void;
    /**
     * Updates all added emitters
     *
     * @method update
     * @memberof Proton
     * @instance
     */
    update(): void;
    emittersUpdate(elapsed: any): void;
    /**
     * @todo add description
     *
     * @method amendChangeTabsBug
     * @memberof Proton
     * @instance
     */
    amendChangeTabsBug(): void;
    /**
     * Counts all particles from all emitters
     *
     * @method getCount
     * @memberof Proton
     * @instance
     */
    getCount(): number;
    getAllParticles(): any[];
    destroyAllEmitters(): void;
    /**
     * Destroys everything related to this Proton instance. This includes all emitters, and all properties
     *
     * @method destroy
     * @memberof Proton
     * @instance
     */
    destroy(remove?: boolean): void;
}

declare class Vector2D$1 {
    /**
     * Creates a new Vector2D instance.
     * @param {number} [x=0] - The x coordinate.
     * @param {number} [y=0] - The y coordinate.
     */
    constructor(x?: number, y?: number);
    /** @type {number} */
    x: number;
    /** @type {number} */
    y: number;
    /**
     * Sets the x and y components of this vector.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @returns {Vector2D} This vector.
     */
    set(x: number, y: number): Vector2D$1;
    /**
     * Sets the x component of this vector.
     * @param {number} x - The x coordinate.
     * @returns {Vector2D} This vector.
     */
    setX(x: number): Vector2D$1;
    /**
     * Sets the y component of this vector.
     * @param {number} y - The y coordinate.
     * @returns {Vector2D} This vector.
     */
    setY(y: number): Vector2D$1;
    /**
     * Calculates the gradient (angle) of this vector.
     * @returns {number} The gradient in radians.
     */
    getGradient(): number;
    /**
     * Copies the values of another vector to this one.
     * @param {Vector2D} v - The vector to copy from.
     * @returns {Vector2D} This vector.
     */
    copy(v: Vector2D$1): Vector2D$1;
    /**
     * Adds another vector to this one.
     * @param {Vector2D} v - The vector to add.
     * @param {Vector2D} [w] - An optional second vector to add.
     * @returns {Vector2D} This vector.
     */
    add(v: Vector2D$1, w?: Vector2D$1): Vector2D$1;
    /**
     * Adds scalar values to this vector's components.
     * @param {number} a - Value to add to x.
     * @param {number} b - Value to add to y.
     * @returns {Vector2D} This vector.
     */
    addXY(a: number, b: number): Vector2D$1;
    /**
     * Adds two vectors and sets the result to this vector.
     * @param {Vector2D} a - The first vector to add.
     * @param {Vector2D} b - The second vector to add.
     * @returns {Vector2D} This vector.
     */
    addVectors(a: Vector2D$1, b: Vector2D$1): Vector2D$1;
    /**
     * Subtracts another vector from this one.
     * @param {Vector2D} v - The vector to subtract.
     * @param {Vector2D} [w] - An optional second vector to subtract.
     * @returns {Vector2D} This vector.
     */
    sub(v: Vector2D$1, w?: Vector2D$1): Vector2D$1;
    /**
     * Subtracts one vector from another and sets the result to this vector.
     * @param {Vector2D} a - The vector to subtract from.
     * @param {Vector2D} b - The vector to subtract.
     * @returns {Vector2D} This vector.
     */
    subVectors(a: Vector2D$1, b: Vector2D$1): Vector2D$1;
    /**
     * Divides this vector by a scalar.
     * @param {number} s - The scalar to divide by.
     * @returns {Vector2D} This vector.
     */
    divideScalar(s: number): Vector2D$1;
    /**
     * Multiplies this vector by a scalar.
     * @param {number} s - The scalar to multiply by.
     * @returns {Vector2D} This vector.
     */
    multiplyScalar(s: number): Vector2D$1;
    /**
     * Negates this vector (inverts its direction).
     * @returns {Vector2D} This vector.
     */
    negate(): Vector2D$1;
    /**
     * Calculates the dot product of this vector with another.
     * @param {Vector2D} v - The other vector.
     * @returns {number} The dot product.
     */
    dot(v: Vector2D$1): number;
    /**
     * Calculates the squared length of this vector.
     * @returns {number} The squared length.
     */
    lengthSq(): number;
    /**
     * Calculates the length of this vector.
     * @returns {number} The length.
     */
    length(): number;
    /**
     * Normalizes this vector (makes it unit length).
     * @returns {Vector2D} This vector.
     */
    normalize(): Vector2D$1;
    /**
     * Calculates the distance to another vector.
     * @param {Vector2D} v - The other vector.
     * @returns {number} The distance.
     */
    distanceTo(v: Vector2D$1): number;
    /**
     * Rotates this vector by an angle.
     * @param {number} tha - The angle to rotate by (in radians).
     * @returns {Vector2D} This vector.
     */
    rotate(tha: number): Vector2D$1;
    /**
     * Calculates the squared distance to another vector.
     * @param {Vector2D} v - The other vector.
     * @returns {number} The squared distance.
     */
    distanceToSquared(v: Vector2D$1): number;
    /**
     * Linearly interpolates this vector toward another vector.
     * @param {Vector2D} v - The target vector.
     * @param {number} alpha - The interpolation factor (0-1).
     * @returns {Vector2D} This vector.
     */
    lerp(v: Vector2D$1, alpha: number): Vector2D$1;
    /**
     * Checks if this vector is equal to another vector.
     * @param {Vector2D} v - The other vector.
     * @returns {boolean} True if the vectors are equal, false otherwise.
     */
    equals(v: Vector2D$1): boolean;
    /**
     * Sets this vector to zero.
     * @returns {Vector2D} This vector.
     */
    clear(): Vector2D$1;
    /**
     * Creates a new vector with the same x and y values as this one.
     * @returns {Vector2D} A new Vector2D instance.
     */
    clone(): Vector2D$1;
}

declare class Rgb {
    constructor(r?: number, g?: number, b?: number);
    r: number;
    g: number;
    b: number;
    reset(): void;
}

/**
 * Represents a particle in a particle system.
 * @class Particle
 */
declare class Particle$1 {
    /**
     * Creates a new Particle instance.
     * @param {Object} [conf] Configuration object for the particle
     */
    constructor(conf?: Object);
    /** @type {string} The unique identifier of the particle */
    id: string;
    /** @type {{p:Vector2D,v:Vector2D,a:Vector2D}} Old state of the particle */
    old: {
        p: Vector2D$1;
        v: Vector2D$1;
        a: Vector2D$1;
    };
    /** @type {object} Custom data associated with the particle */
    data: object;
    /** @type {Behaviour[]} Array of behaviours applied to the particle */
    behaviours: Behaviour[];
    /** @type {Vector2D} Current position of the particle */
    p: Vector2D$1;
    /** @type {Vector2D} Current velocity of the particle */
    v: Vector2D$1;
    /** @type {Vector2D} Current acceleration of the particle */
    a: Vector2D$1;
    /** @type {Rgb} Color of the particle */
    rgb: Rgb;
    name: string;
    /**
     * Gets the direction of the particle's movement in degrees.
     * @returns {number} The direction in degrees
     */
    getDirection(): number;
    /**
     * Resets the particle to its initial state.
     * @returns {Particle} The particle instance
     */
    reset(): Particle$1;
    life: number | undefined;
    age: number | undefined;
    dead: boolean | undefined;
    sleep: boolean | undefined;
    body: any;
    sprite: any;
    parent: any;
    energy: number | undefined;
    mass: number | undefined;
    radius: number | undefined;
    alpha: number | undefined;
    scale: number | undefined;
    rotation: number | undefined;
    color: any;
    easing: ((value: any) => any) | undefined;
    /**
     * Updates the particle's state.
     * @param {number} time The time elapsed since the last update
     * @param {number} index The index of the particle in its parent system
     */
    update(time: number, index: number): void;
    /**
     * Applies all behaviours attached to the particle.
     * @param {number} time The time elapsed since the last update
     * @param {number} index The index of the particle in its parent system
     */
    applyBehaviours(time: number, index: number): void;
    /**
     * Adds a behaviour to the particle.
     * @param {Behaviour} behaviour The behaviour to add
     */
    addBehaviour(behaviour: Behaviour): void;
    /**
     * Adds multiple behaviours to the particle.
     * @param {Behaviour[]} behaviours An array of behaviours to add
     */
    addBehaviours(behaviours: Behaviour[]): void;
    /**
     * Removes a specific behaviour from the particle.
     * @param {Behaviour} behaviour The behaviour to remove
     */
    removeBehaviour(behaviour: Behaviour): void;
    /**
     * Removes all behaviours from the particle.
     */
    removeAllBehaviours(): void;
    /**
     * Destroys the particle, removing all behaviours and setting it as dead.
     */
    destroy(): void;
}

declare namespace _default$3 {
    /**
     * Returns the default if the value is null or undefined
     *
     * @memberof Proton#Proton.Util
     * @method initValue
     *
     * @param {Mixed} value a specific value, could be everything but null or undefined
     * @param {Mixed} defaults the default if the value is null or undefined
     */
    function initValue(value: Mixed, defaults: Mixed): Mixed;
    /**
     * Checks if the value is a valid array
     *
     * @memberof Proton#Proton.Util
     * @method isArray
     *
     * @param {Array} value Any array
     *
     * @returns {Boolean}
     */
    function isArray(value: any[]): boolean;
    /**
     * Destroyes the given array
     *
     * @memberof Proton#Proton.Util
     * @method emptyArray
     *
     * @param {Array} array Any array
     */
    function emptyArray(arr: any): void;
    function toArray(arr: any): any;
    function sliceArray(arr1: any, index: any, arr2: any): void;
    function getRandFromArray(arr: any): any;
    /**
     * Destroyes the given object
     *
     * @memberof Proton#Proton.Util
     * @method emptyObject
     *
     * @param {Object} obj Any object
     */
    function emptyObject(obj: Object, ignore?: null): void;
    /**
     * Makes an instance of a class and binds the given array
     *
     * @memberof Proton#Proton.Util
     * @method classApply
     *
     * @param {Function} constructor A class to make an instance from
     * @param {Array} [args] Any array to bind it to the constructor
     *
     * @return {Object} The instance of constructor, optionally bind with args
     */
    function classApply(constructor: Function, args?: any[]): Object;
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
    function getImageData(context: HTMLCanvasElement, image: Object, rect: Proton.Rectangle): any;
    function destroyAll(arr: any, param?: null): void;
    function assign(target: any, source: any): any;
}

declare namespace _default$2 {
    /**
     * @typedef  {Object} rgbObject
     * @property {Number} r red value
     * @property {Number} g green value
     * @property {Number} b blue value
     */
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
    function hexToRgb(h: string): {
        /**
         * red value
         */
        r: number;
        /**
         * green value
         */
        g: number;
        /**
         * blue value
         */
        b: number;
    };
    /**
     * converts a rgb value to a rgb string
     *
     * @memberof Proton#Proton.Util
     * @method rgbToHex
     *
     * @param {Object | Proton.hexToRgb} rgb a rgb object like in {@link Proton#Proton.}
     *
     * @return {String} rgb()
     */
    function rgbToHex(rbg: any): string;
    function getHex16FromParticle(p: any): number;
}

declare namespace MathUtil {
    export { PI };
    export let PIx2: number;
    export let PI_2: number;
    export let PI_180: number;
    export let N180_PI: number;
    export let Infinity: number;
    export function isInfinity(num: any): boolean;
    export function randomAToB(a: any, b: any, isInt?: boolean): any;
    export function randomFloating(center: any, f: any, isInt: any): any;
    export function randomColor(): string;
    export function randomZone(display: any): void;
    export function floor(num: any, k?: number): number;
    export function degreeTransform(a: any): number;
    export function toColor16(num: any): string;
}
declare const PI: 3.1415926;

declare class Polar2D {
    constructor(r: any, tha: any);
    r: number;
    tha: any;
    set(r: any, tha: any): this;
    setR(r: any): this;
    setTha(tha: any): this;
    copy(p: any): this;
    toVector(): Vector2D$1;
    getX(): number;
    getY(): number;
    normalize(): this;
    equals(v: any): boolean;
    clear(): this;
    clone(): Polar2D;
}

declare namespace Mat3 {
    function create(mat3: any): Float32Array<ArrayBuffer>;
    function set(mat1: any, mat2: any): any;
    function multiply(mat: any, mat2: any, mat3: any): any;
    function inverse(mat: any, mat3: any): any;
    function multiplyVec2(m: any, vec: any, mat3: any): any;
}

/**
 * Represents a span of values or an array.
 */
declare class Span {
    /**
     * Returns a new Span object.
     * @param {*|Span} a - The first value or a Span object.
     * @param {*} [b] - The second value.
     * @param {*} [c] - The third value.
     * @returns {Span} A new Span instance.
     */
    static setSpanValue(a: any | Span, b?: any, c?: any): Span;
    /**
     * Returns the value from a Span, if the param is not a Span it will return the given parameter.
     * @param {*|Span} pan - The value or Span to get the value from.
     * @returns {*} The value of Span OR the parameter if it is not a Span.
     */
    static getSpanValue(pan: any | Span): any;
    /**
     * Creates a new Span instance.
     * @param {number|number[]} a - The first value or an array of values.
     * @param {number} [b] - The second value (if a is not an array).
     * @param {boolean} [center=false] - Whether to use center-based calculation.
     */
    constructor(a: number | number[], b?: number, center?: boolean);
    /**
     * @type {boolean}
     * @private
     */
    private isArray;
    /**
     * @type {number|number[]}
     * @private
     */
    private a;
    /**
     * @type {number}
     * @private
     */
    private b;
    /**
     * @type {boolean}
     * @private
     */
    private center;
    /**
     * Gets a value from the span.
     * @param {boolean} [isInt=false] - Whether to return an integer value.
     * @returns {number} A random value from the span.
     */
    getValue(isInt?: boolean): number;
}

/**
 * Represents an ArraySpan, a subclass of Span that works with arrays.
 * @extends Span
 */
declare class ArraySpan extends Span {
    /**
     * Creates an ArraySpan instance from the given array.
     * If the input is already an ArraySpan instance, it returns the input.
     * @static
     * @param {Array|ArraySpan|any} arr - The array or ArraySpan instance.
     * @returns {ArraySpan|null} A new ArraySpan instance or null if the input is falsy.
     */
    static createArraySpan(arr: any[] | ArraySpan | any): ArraySpan | null;
    /**
     * Creates an instance of ArraySpan.
     * @param {Array|*|any} arr - The array or value to be converted to an array.
     */
    constructor(arr: any[] | any | any);
    _arr: any;
    /**
     * Gets a random value from the array.
     * If the value is "random" or "Random", it returns a random color.
     * @returns {*} A random value from the array or a random color.
     */
    getValue(): any;
}

declare class Rectangle {
    constructor(x: any, y: any, w: any, h: any);
    x: any;
    y: any;
    width: any;
    height: any;
    bottom: any;
    right: any;
    contains(x: any, y: any): boolean;
}

declare namespace _default$1 {
    function easeLinear(value: any): any;
    function easeInQuad(value: any): number;
    function easeOutQuad(value: any): number;
    function easeInOutQuad(value: any): number;
    function easeInCubic(value: any): number;
    function easeOutCubic(value: any): number;
    function easeInOutCubic(value: any): number;
    function easeInQuart(value: any): number;
    function easeOutQuart(value: any): number;
    function easeInOutQuart(value: any): number;
    function easeInSine(value: any): number;
    function easeOutSine(value: any): number;
    function easeInOutSine(value: any): number;
    function easeInExpo(value: any): number;
    function easeOutExpo(value: any): number;
    function easeInOutExpo(value: any): number;
    function easeInCirc(value: any): number;
    function easeOutCirc(value: any): number;
    function easeInOutCirc(value: any): number;
    function easeInBack(value: any): number;
    function easeOutBack(value: any): number;
    function easeInOutBack(value: any): number;
    function getEasing(ease: any): any;
}

/**
 * Rate class for controlling particle emission rate.
 */
declare class Rate {
    /**
     * Creates a new Rate instance.
     * The number of particles per second emission (a [particle]/b [s]).
     * @param {Array|number|Span} [numpan=1] - The number of particles for each emission.
     * @param {Array|number|Span} [timepan=1] - The time interval between each emission.
     * @example
     * // Create a rate of 10-20 particles every 0.1-0.25 seconds
     * new Rate(new Span(10, 20), new Span(0.1, 0.25));
     */
    constructor(numpan?: any[] | number | Span, timepan?: any[] | number | Span);
    /**
     * @type {Span}
     * @private
     */
    private numPan;
    /**
     * @type {Span}
     * @private
     */
    private timePan;
    /**
     * @type {number}
     * @private
     */
    private startTime;
    /**
     * @type {number}
     * @private
     */
    private nextTime;
    /**
     * Initializes the rate.
     * @private
     */
    private init;
    /**
     * Gets the number of particles to emit based on the elapsed time.
     * @param {number} time - The elapsed time since the last update.
     * @returns {number} The number of particles to emit.
     */
    getValue(time: number): number;
}

declare class Initialize {
    reset(): void;
    init(emitter: any, particle: any): void;
    initialize(target: any): void;
}

/**
 * Life class for initializing particle lifetime.
 * @extends Initialize
 */
declare class Life extends Initialize {
    /**
     * Creates a new Life instance.
     * @param {number|Span} a - The lifetime value or the lower bound of the lifetime range.
     * @param {number} [b] - The upper bound of the lifetime range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    constructor(a: number | Span, b?: number, c?: boolean);
    /**
     * @type {Span}
     * @private
     */
    private lifePan;
    /**
     * @type {string}
     */
    name: string;
    /**
     * Initializes the lifetime of a target particle.
     * @param {object} target - The target particle to initialize.
     */
    initialize(target: object): void;
}

declare class Zone {
    vector: Vector2D$1;
    random: number;
    crossType: string;
    alert: boolean;
    getPosition(): void;
    crossing(particle: any): void;
    destroy(): void;
}

/**
 * Represents a point zone in a 2D space.
 * @extends Zone
 */
declare class PointZone extends Zone {
    /**
     * Creates a new PointZone.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     */
    constructor(x: number, y: number);
    /**
     * The x-coordinate of the point.
     * @type {number}
     */
    x: number;
    /**
     * The y-coordinate of the point.
     * @type {number}
     */
    y: number;
    /**
     * Gets the position of the point.
     * @returns {Object} An object representing the position vector.
     */
    getPosition(): Object;
    /**
     * This method is not supported for PointZone.
     * @param {Object} particle - The particle object (unused).
     */
    crossing(particle: Object): void;
}

/**
 * Position class for initializing particle positions.
 * @extends Initialize
 */
declare class Position extends Initialize {
    /**
     * Creates a new Position instance.
     * @param {PointZone|any} [zone] - The zone to use for positioning. Defaults to a new PointZone if not provided.
     */
    constructor(zone?: PointZone | any);
    /**
     * @type {PointZone|any}
     * @private
     */
    private zone;
    /**
     * @type {string}
     */
    name: string;
    /**
     * Resets this initializer's parameters.
     * @param {PointZone|any} [zone] - The new zone to use for positioning. Defaults to a new PointZone if not provided.
     */
    reset(zone?: PointZone | any): void;
    /**
     * Initializes the particle's position.
     * @param {object} target - The particle to initialize.
     * @param {object} target.p - The particle's position object.
     * @param {number} target.p.x - The particle's x coordinate.
     * @param {number} target.p.y - The particle's y coordinate.
     */
    initialize(target: {
        p: {
            x: number;
            y: number;
        };
    }): void;
}

/**
 * Velocity class for initializing particle velocities.
 * @extends Initialize
 */
declare class Velocity extends Initialize {
    /**
     * Creates a new Velocity instance.
     * @param {number|Span} [rpan] - The radial component of the velocity or its range.
     * @param {number|Span} [thapan] - The angular component of the velocity or its range.
     * @param {string} [type='vector'] - The type of velocity ('vector' or 'polar').
     */
    constructor(rpan?: number | Span, thapan?: number | Span, type?: string);
    /**
     * @type {Span}
     * @private
     */
    private rPan;
    /**
     * @type {Span}
     * @private
     */
    private thaPan;
    /**
     * @type {string}
     */
    name: string;
    type: Mixed;
    /**
     * Resets the velocity parameters.
     * @param {number|Span} [rpan] - The radial component of the velocity or its range.
     * @param {number|Span} [thapan] - The angular component of the velocity or its range.
     * @param {string} [type='vector'] - The type of velocity ('vector' or 'polar').
     */
    reset(rpan?: number | Span, thapan?: number | Span, type?: string): void;
    /**
     * Normalizes the velocity value.
     * @param {number} vr - The velocity value to normalize.
     * @returns {number} The normalized velocity value.
     * @private
     */
    private normalizeVelocity;
    /**
     * Initializes the particle's velocity.
     * @param {object} target - The particle to initialize.
     */
    initialize(target: object): void;
}

/**
 * Mass class for initializing particle mass.
 * @extends Initialize
 */
declare class Mass extends Initialize {
    /**
     * Creates a new Mass instance.
     * @param {number|Span} a - The mass value or the lower bound of the mass range.
     * @param {number} [b] - The upper bound of the mass range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    constructor(a: number | Span, b?: number, c?: boolean);
    /**
     * @type {Span}
     * @private
     */
    private massPan;
    /**
     * @type {string}
     */
    name: string;
    /**
     * Initializes the mass of a target particle.
     * @param {object} target - The target particle to initialize.
     */
    initialize(target: object): void;
}

/**
 * Radius class for initializing particle radius.
 * @extends Initialize
 */
declare class Radius extends Initialize {
    /**
     * Creates a new Radius instance.
     * @param {number|Span} a - The radius value or the lower bound of the radius range.
     * @param {number} [b] - The upper bound of the radius range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    constructor(a: number | Span, b?: number, c?: boolean);
    /**
     * @type {Span}
     */
    radius: Span;
    /**
     * @type {string}
     */
    name: string;
    /**
     * Resets this initializer's parameters.
     * @param {number|Span} a - The radius value or the lower bound of the radius range.
     * @param {number} [b] - The upper bound of the radius range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    reset(a: number | Span, b?: number, c?: boolean): void;
    /**
     * Initializes the particle's radius.
     * @param {Particle} particle - The particle to initialize.
     */
    initialize(particle: Particle): void;
}

/**
 * Body class for initializing particle bodies.
 * @extends Initialize
 */
declare class Body extends Initialize {
    /**
     * Creates a new Body instance.
     * @param {string|object|Image|HTMLImageElement|ArraySpan} image - The image source or object to use for the particle body.
     * @param {number} [w=20] - The width of the particle body.
     * @param {number} [h] - The height of the particle body. Defaults to the width if not provided.
     */
    constructor(image: string | object | (new (width?: number, height?: number) => HTMLImageElement) | HTMLImageElement | ArraySpan, w?: number, h?: number);
    /**
     * @type {ArraySpan}
     * @private
     */
    private image;
    /**
     * @type {string}
     */
    name: string;
    w: Mixed;
    h: Mixed;
    /**
     * Initializes the particle's body.
     * @param {object} particle - The particle to initialize.
     */
    initialize(particle: object): void;
    /**
     * Sets the span value for the image.
     * @param {string|object|Image|HTMLImageElement|ArraySpan} image - The image source or object to set as span value.
     * @returns {ArraySpan} The ArraySpan instance.
     * @private
     */
    private setSpanValue;
}

/**
 * The Behaviour class is the base for the other Behaviour
 * @class
 */
declare class Behaviour$1 {
    static id: number;
    /**
     * Create a new Behaviour instance
     * @param {number} [life=Infinity] - The behaviour's life
     * @param {string} [easing='easeLinear'] - The behaviour's decaying trend, for example ease.easeOutQuart
     */
    constructor(life?: number, easing?: string);
    /**
     * The behaviour's life
     * @type {number}
     */
    life: number;
    /**
     * The behaviour's easing function
     * @type {function}
     */
    easing: Function;
    /**
     * The behaviour's current age
     * @type {number}
     */
    age: number;
    /**
     * The behaviour's current energy
     * @type {number}
     */
    energy: number;
    /**
     * Whether the behaviour is dead
     * @type {boolean}
     */
    dead: boolean;
    /**
     * The behaviour's parent emitters
     * @type {Array}
     */
    parents: any[];
    /**
     * The behaviour's unique id
     * @type {string}
     */
    id: string;
    /**
     * The behaviour's name
     * @type {string}
     */
    name: string;
    /**
     * Reset this behaviour's parameters
     * @param {number} [life=Infinity] - This behaviour's new life
     * @param {string} [easing='easeLinear'] - This behaviour's new easing
     */
    reset(life?: number, easing?: string): void;
    /**
     * Normalize a force by 1:100
     * @param {Proton.Vector2D} force - The force to normalize
     * @returns {Proton.Vector2D} The normalized force
     */
    normalizeForce(force: Proton.Vector2D): Proton.Vector2D;
    /**
     * Normalize a value by 1:100
     * @param {number} value - The value to normalize
     * @returns {number} The normalized value
     */
    normalizeValue(value: number): number;
    /**
     * Initialize the behaviour's parameters for a particle
     * @param {Proton.Particle} particle - The particle to initialize
     */
    initialize(particle: Proton.Particle): void;
    /**
     * Compute the behaviour's life cycle
     * @param {Proton.Particle} particle - The particle to calculate for
     * @param {number} time - The integrate time 1/ms
     * @param {number} index - The particle index
     */
    calculate(particle: Proton.Particle, time: number, index: number): void;
    /**
     * Apply this behaviour to a particle
     * @param {Proton.Particle} particle - The particle to apply the behaviour to
     * @param {number} time - The integrate time 1/ms
     * @param {number} index - The particle index
     */
    applyBehaviour(particle: Proton.Particle, time: number, index: number): void;
    /**
     * Destroy this behaviour
     */
    destroy(): void;
}

declare class Force extends Behaviour$1 {
    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Force
     *
     * @param {Number} fx
     * @param {Number} fy
     * @param {Number} [life=Infinity] 			this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    constructor(fx: number, fy: number, life?: number, easing?: string);
    force: Proton.Vector2D;
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Force
     * @instance
     *
     * @param {Number} fx
     * @param {Number} fy
     * @param {Number} [life=Infinity] 			this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */
    reset(fx: number, fy: number, life?: number, easing?: string): void;
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Force
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    applyBehaviour(particle: Proton.Particle, time: any, index: any): void;
}

/**
 * Attraction behavior for particles.
 * This behaviour makes particles follow a specific target position.
 * @extends Behaviour
 */
declare class Attraction extends Behaviour$1 {
    /**
     * Creates an instance of Attraction.
     * @param {Vector2D} targetPosition - The attraction point coordinates.
     * @param {number} [force=100] - The strength of the attraction force.
     * @param {number} [radius=1000] - The radius of influence for the attraction.
     * @param {number} [life=Infinity] - The life span of this behaviour.
     * @param {string} [easing='ease.easeLinear'] - The easing function for this behaviour.
     */
    constructor(targetPosition: Vector2D$1, force?: number, radius?: number, life?: number, easing?: string);
    /**
     * The target position for attraction.
     * @type {Vector2D}
     */
    targetPosition: Vector2D$1;
    /**
     * The radius of influence for the attraction.
     * @type {number}
     */
    radius: number;
    /**
     * The strength of the attraction force.
     * @type {number}
     */
    force: number;
    /**
     * The squared radius (for optimization).
     * @type {number}
     */
    radiusSq: number;
    /**
     * The attraction force vector.
     * @type {Vector2D}
     */
    attractionForce: Vector2D$1;
    /**
     * The squared length of the attraction force.
     * @type {number}
     */
    lengthSq: number;
    /**
     * Resets the behaviour's parameters.
     * @param {Vector2D} targetPosition - The new attraction point coordinates.
     * @param {number} [force=100] - The new strength of the attraction force.
     * @param {number} [radius=1000] - The new radius of influence for the attraction.
     * @param {number} [life=Infinity] - The new life span of this behaviour.
     * @param {string} [easing='ease.easeLinear'] - The new easing function for this behaviour.
     */
    reset(targetPosition: Vector2D$1, force?: number, radius?: number, life?: number, easing?: string): void;
}

declare class RandomDrift extends Behaviour$1 {
    /**
     * @memberof! Proton#
     * @augments Behaviour
     * @constructor
     * @alias RandomDrift
     *
     * @param {Number} driftX 				X value of the new Vector2D
     * @param {Number} driftY  				Y value of the new Vector2D
     * @param {Number} delay 				How much delay the drift should have
     * @param {Number} [life=Infinity] 		this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     *
     * @property {Number} time The time of the drift
     * @property {String} name The Behaviour name
     */
    constructor(driftX: number, driftY: number, delay: number, life?: number, easing?: string);
    time: number;
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#RandomDrift
     * @instance
     *
     * @param {Number} driftX 				X value of the new Vector2D
     * @param {Number} driftY  				Y value of the new Vector2D
     * @param {Number} delay 				How much delay the drift should have
     * @param {Number} [life=Infinity] 		this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     */
    reset(driftX: number, driftY: number, delay: number, life?: number, easing?: string): void;
    panFoce: any;
    delay: number | undefined;
    initialize(particle: any): void;
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#RandomDrift
     * @instance
     *
     * @param {Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    applyBehaviour(particle: Particle, time: number, index: Int): void;
}

declare class Gravity extends Force {
    /**
     * @memberof! Proton#
     * @augments Proton#Proton.Force
     * @constructor
     * @alias Proton.Gravity
     *
     * @param {Number} g 							Gravity
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    constructor(g: number, life?: number, easing?: string);
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Gravity
     * @instance
     *
     * @param {Number} g 							Gravity
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */
    reset(g: number, life?: number, easing?: string): void;
}

declare class Collision extends Behaviour$1 {
    /**
     * The callback after collision
     *
     * @callback Callback
     *
     * @param {Proton.Particle} particle
     * @param {Proton.Paritcle} otherParticle
     */
    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Collision
     *
     * @todo add description to mass
     *
     * @param {Proton.Emitter} 	[emitter=null] 		the attraction point coordinates
     * @param {Boolean} 		[mass=true]
     * @param {Callback}	 	[callback=null]		the callback after the collision
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    constructor(emitter?: Proton.Emitter, mass?: boolean, callback?: (particle: Proton.Particle, otherParticle: Proton.Paritcle) => Collision, life?: number, easing?: string);
    newPool: any[];
    pool: any[];
    /**
     * Reset this behaviour's parameters
     *
     * @memberof Proton#Proton.Collision
     * @method reset
     * @instance
     *
     * @todo add description to mass
     *
     * @param {Proton.Emitter} 	[emitter=null] 		the attraction point coordinates
     * @param {Boolean} 		[mass=true]
     * @param {Callback}	 	[callback=null]		the callback after the collision
     * @param {Number} 			[life=Infinity] 	this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */
    reset(emitter?: Proton.Emitter, mass?: boolean, callback?: (particle: Proton.Particle, otherParticle: Proton.Paritcle) => Collision, life?: number, easing?: string): void;
    emitter: any;
    mass: any;
    callback: any;
    collisionPool: any[] | undefined;
    delta: Vector2D$1 | undefined;
    /**
     * Apply this behaviour for all particles every time
     *
     * @memberof Proton#Proton.Collision
     * @method applyBehaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    applyBehaviour(particle: Proton.Particle, time: number, index: Int): void;
}

declare class CrossZone extends Behaviour$1 {
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
    constructor(zone: Proton.Zone, crossType?: string, life?: number, easing?: string);
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.CrossZone
     * @instance
     *
     * @param {Proton.Zone} zone 				can be any Proton.Zone - e.g. Proton.RectZone()
     * @param {String} 		[crossType=dead] 	what happens if the particles pass the zone - allowed strings: dead | bound | cross
     * @param {Number} 		[life=Infinity] 	this behaviour's life
     * @param {String} 		[easing=easeLinear]	this behaviour's easing
     */
    reset(zone: Proton.Zone, crossType?: string, life?: number, easing?: string): void;
    zone: any;
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
    applyBehaviour(particle: Proton.Particle, time: any, index: any): void;
}

/**
 * Alpha behaviour for controlling particle opacity over time.
 * @extends Behaviour
 */
declare class Alpha extends Behaviour$1 {
    /**
     * Creates a new Alpha instance.
     * @param {number|Span} [a=1] - The initial alpha value or range.
     * @param {number|Span} [b] - The final alpha value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life=Infinity] - This behaviour's life.
     * @param {string} [easing='easeLinear'] - This behaviour's easing function.
     */
    constructor(a?: number | Span, b?: number | Span, life?: number, easing?: string);
    /**
     * @type {boolean}
     * @private
     */
    private same;
    /**
     * @type {Span}
     * @private
     */
    private a;
    /**
     * @type {Span}
     * @private
     */
    private b;
    /**
     * Resets this behaviour's parameters.
     * @param {number|Span} [a=1] - The initial alpha value or range.
     * @param {number|Span} [b] - The final alpha value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life] - This behaviour's life.
     * @param {string} [easing] - This behaviour's easing function.
     */
    reset(a?: number | Span, b?: number | Span, life?: number, easing?: string): void;
}

/**
 * Scale behaviour for controlling particle size over time.
 * @extends Behaviour
 */
declare class Scale extends Behaviour$1 {
    /**
     * Creates a new Scale instance.
     * @param {number|Span} [a=1] - The initial scale value or range.
     * @param {number|Span} [b] - The final scale value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life=Infinity] - This behaviour's life.
     * @param {string} [easing='easeLinear'] - This behaviour's easing function.
     */
    constructor(a?: number | Span, b?: number | Span, life?: number, easing?: string);
    /**
     * @type {boolean}
     * @private
     */
    private same;
    /**
     * Resets this behaviour's parameters.
     * @param {number|Span} a - The initial scale value or range.
     * @param {number|Span} [b] - The final scale value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life] - This behaviour's life.
     * @param {string} [easing] - This behaviour's easing function.
     */
    reset(a: number | Span, b?: number | Span, life?: number, easing?: string): void;
    a: Span | undefined;
    b: Span | undefined;
}

/**
 * Rotate behaviour for controlling particle rotation.
 * @extends Behaviour
 */
declare class Rotate extends Behaviour$1 {
    /**
     * Creates a new Rotate instance.
     * @param {string|number|Span} [influence='Velocity'] - The rotation's influence or initial rotation.
     * @param {string|number|Span} [b] - The final rotation value or range.
     * @param {string} [style='to'] - The style of rotation ('to' or 'add').
     * @param {number} [life=Infinity] - This behaviour's life.
     * @param {string} [easing='easeLinear'] - This behaviour's easing function.
     */
    constructor(influence?: string | number | Span, b?: string | number | Span, style?: string, life?: number, easing?: string);
    /**
     * @type {boolean}
     * @private
     */
    private same;
    /**
     * @type {Span}
     * @private
     */
    private a;
    /**
     * @type {Span}
     * @private
     */
    private b;
    /**
     * @type {string}
     * @private
     */
    private style;
    /**
     * Resets this behaviour's parameters.
     * @param {string|number|Span} [a='Velocity'] - The rotation's influence or initial rotation.
     * @param {string|number|Span} [b] - The final rotation value or range.
     * @param {string} [style='to'] - The style of rotation ('to' or 'add').
     * @param {number} [life] - This behaviour's life.
     * @param {string} [easing] - This behaviour's easing function.
     */
    reset(a?: string | number | Span, b?: string | number | Span, style?: string, life?: number, easing?: string): void;
    /**
     * Initializes the behaviour's parameters for a particle.
     * @param {object} particle - The particle to initialize.
     * @param {number} particle.rotation - The particle's rotation.
     * @param {object} particle.data - The particle's data object.
     */
    initialize(particle: {
        rotation: number;
        data: object;
    }): void;
    /**
     * Applies this behaviour to a particle.
     * @param {object} particle - The particle to apply the behaviour to.
     * @param {number} time - The integrate time (1/ms).
     * @param {number} index - The particle index.
     */
    applyBehaviour(particle: object, time: number, index: number): void;
}

declare class Color extends Behaviour$1 {
    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Color
     *
     * @param {Proton.ArraySpan | String} [a] the string should be a hex e.g. #000000 for black
     * @param {Proton.ArraySpan | String} [b] the string should be a hex e.g. #000000 for black
     * @param {Number} [life=Infinity] 	this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    constructor(a?: Proton.ArraySpan | string, b?: Proton.ArraySpan | string, life?: number, easing?: string);
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.ArraySpan | String} a the string should be a hex e.g. #000000 for black
     * @param {Proton.ArraySpan | String} b the string should be a hex e.g. #000000 for black
     * @param {Number} [life=Infinity] 	this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     */
    reset(a: Proton.ArraySpan | string, b: Proton.ArraySpan | string, life?: number, easing?: string): void;
    a: ArraySpan | null | undefined;
    b: ArraySpan | null | undefined;
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    applyBehaviour(particle: Proton.Particle, time: any, index: any): void;
}

declare class Cyclone extends Behaviour$1 {
    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Cyclone
     *
     * @param {Number} angle
     * @param {Number} force
     * @param {Number} [life=Infinity] 			this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    constructor(angle: number, force: number, life?: number, easing?: string);
    setAngleAndForce(angle: any, force: any): void;
    force: any;
    angle: any;
    span: Span | undefined;
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Cyclone
     * @instance
     *
     * @param {Number} angle
     * @param {Number} force
     * @param {Number} [life=Infinity] 			this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */
    reset(angle: number, force: number, life?: number, easing?: string): void;
    initialize(particle: any): void;
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Cyclone
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    applyBehaviour(particle: Proton.Particle, time: any, index: any): void;
}

/**
 * The opposite of Attraction - turns the force
 *
 * @class
 * @extends Proton.Attraction
 * @memberof! Proton#
 * @alias Proton.Repulsion
 */
declare class Repulsion {
    /**
     * Creates a new Repulsion behaviour instance
     *
     * @constructor
     * @param {Proton.Vector2D} targetPosition - The repulsion point coordinates
     * @param {number} [force=100] - The strength of the repulsion force
     * @param {number} [radius=1000] - The radius of influence for the repulsion
     * @param {number} [life=Infinity] - The behaviour's life
     * @param {string} [easing='easeLinear'] - The behaviour's easing function
     */
    constructor(targetPosition: Proton.Vector2D, force?: number, radius?: number, life?: number, easing?: string);
    /**
     * The name of the behaviour
     * @type {string}
     */
    name: string;
    /**
     * Reset this behaviour's parameters
     *
     * @param {Proton.Vector2D} targetPosition - The new repulsion point coordinates
     * @param {number} [force=100] - The new strength of the repulsion force
     * @param {number} [radius=1000] - The new radius of influence for the repulsion
     * @param {number} [life=Infinity] - The new behaviour's life
     * @param {string} [easing='easeLinear'] - The new behaviour's easing function
     */
    reset(targetPosition: Proton.Vector2D, force?: number, radius?: number, life?: number, easing?: string): void;
}

declare class GravityWell extends Behaviour$1 {
    /**
     * @memberof! Proton#
     * @augments Behaviour
     * @constructor
     * @alias GravityWell
     *
     * @param {Vector2D} [centerPoint=new Vector2D] The point in the center
     * @param {Number} [force=100]					The force
     * @param {Number} [life=Infinity]				this behaviour's life
     * @param {String} [easing=easeLinear]	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    constructor(centerPoint?: Vector2D$1, force?: number, life?: number, easing?: string);
    distanceVec: Vector2D$1;
    centerPoint: Mixed;
    force: Mixed;
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#GravityWell
     * @instance
     *
     * @param {Vector2D} [centerPoint=new Vector2D] The point in the center
     * @param {Number} [force=100]					The force
     * @param {Number} [life=Infinity]				this behaviour's life
     * @param {String} [easing=easeLinear]	this behaviour's easing
     */
    reset(centerPoint?: Vector2D$1, force?: number, life?: number, easing?: string): void;
    /**
     * @inheritdoc
     */
    initialize(particle: any): void;
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#GravityWell
     * @instance
     *
     * @param {Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    applyBehaviour(particle: Particle, time: any, index: any): void;
}

declare class Emitter$1 extends Particle$1 {
    particles: any[];
    initializes: any[];
    emitTime: number;
    emitSpeed: number;
    totalTime: number;
    /**
     * The friction coefficient for all particle emit by This;
     * @property damping
     * @type {Number}
     * @default 0.006
     */
    damping: number;
    /**
     * If bindEmitter the particles can bind this emitter's property;
     * @property bindEmitter
     * @type {Boolean}
     * @default true
     */
    bindEmitter: boolean;
    /**
     * The number of particles per second emit (a [particle]/b [s]);
     * @property rate
     * @type {Rate}
     * @default Rate(1, .1)
     */
    rate: Rate;
    /**
     * start emit particle
     * @method emit
     * @param {Number | String} [totalTime] begin emit time;
     * @param {String | boolean} [life] the life of this emitter
     */
    emit(totalTime?: number | string, life?: string | boolean): void;
    stoped: any;
    /**
     * stop emiting
     * @method stop
     */
    stop(): void;
    preEmit(time: any): void;
    /**
     * remove current all particles
     * @method removeAllParticles
     */
    removeAllParticles(): void;
    /**
     * add initialize to this emitter
     * @method addSelfInitialize
     */
    addSelfInitialize(initialize: any): void;
    /**
     * add the Initialize to particles;
     *
     * you can use initializes array:for example emitter.addInitialize(initialize1,initialize2,initialize3);
     * @method addInitialize
     * @param {Initialize} initialize like this new Radius(1, 12)
     */
    addInitialize(...rest: any[]): void;
    /**
     * remove the Initialize
     * @method removeInitialize
     * @param {Initialize} initialize a initialize
     */
    removeInitialize(initializer: any): void;
    /**
     * remove all Initializes
     * @method removeInitializers
     */
    removeAllInitializers(): void;
    /**
     * add the Behaviour to particles;
     *
     * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addBehaviour
     * @param {Behaviour} behaviour like this new Color('random')
     */
    addBehaviour(...rest: any[]): void;
    /**
     * remove the Behaviour
     * @method removeBehaviour
     * @param {Behaviour} behaviour a behaviour
     */
    removeBehaviour(behaviour: Behaviour): number;
    update(time: any): void;
    integrate(time: any): void;
    dispatch(event: any, target: any): void;
    emitting(time: any): void;
    /**
     * Ultra-fast particle creation - no optional parameters, minimal overhead
     * @param {Number} count - Number of particles to create
     * @private
     */
    private _fastCreateParticles;
    /**
     * High-speed loop for creating many particles
     * @private
     */
    private _createParticlesLoop;
    /**
     * Bulk initialization for particles - more efficient for large batches
     * @private
     */
    private _initializeParticlesBulk;
    /**
     * High-performance batch particle creation for large quantities
     * @param {Number} length - Number of particles to create
     * @param {Object|Array} [initialize] - Initialization parameters
     * @param {Object|Array} [behaviour] - Behavior parameters
     */
    createParticlesBatch(length: number, initialize?: Object | any[], behaviour?: Object | any[]): void;
    /**
     * Internal method to create a chunk of particles
     * @private
     */
    private _createParticleChunk;
    /**
     * Creates a single particle - now optimized for performance
     * but batch methods should be preferred for multiple particles
     */
    createParticle(initialize: any, behaviour: any): any;
    /**
     * Sets up a particle with initialization and behavior.
     * @deprecated Use direct methods instead for better performance
     */
    setupParticle(particle: any, initialize: any, behaviour: any): void;
    /**
     * Removes all particles and stops the emitter.
     */
    remove(): void;
}

declare class BehaviourEmitter extends Emitter$1 {
    /**
     * The BehaviourEmitter class inherits from Proton.Emitter
     *
     * use the BehaviourEmitter you can add behaviours to self;
     * @class Proton.BehaviourEmitter
     * @constructor
     * @param {Object} conf the parameters object;
     */
    constructor(conf: Object);
    selfBehaviours: any[];
    /**
     * add the Behaviour to emitter;
     *
     * you can use Behaviours array:emitter.addSelfBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addSelfBehaviour
     * @param {Proton.Behaviour} behaviour like this new Proton.Color('random')
     */
    addSelfBehaviour(...rest: any[]): void;
    /**
     * remove the Behaviour for self
     * @method removeSelfBehaviour
     * @param {Proton.Behaviour} behaviour a behaviour
     */
    removeSelfBehaviour(behaviour: Proton.Behaviour): void;
}

declare class FollowEmitter extends Emitter$1 {
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
    constructor(mouseTarget: Element, ease: number, conf: Object);
    mouseTarget: Mixed;
    ease: Mixed;
    _allowEmitting: boolean;
    initEventHandler(): void;
    mousemoveHandler: ((e: any) => void) | undefined;
    mousedownHandler: ((e: any) => any) | undefined;
    mouseupHandler: ((e: any) => any) | undefined;
    /**
     * start emit particle
     * @method emit
     */
    emit(): void;
    mousemove(e: any): void;
}

declare class BaseRenderer {
    constructor(element: any, stroke: any);
    pool: Pool;
    element: any;
    stroke: any;
    circleConf: {
        isCircle: boolean;
    };
    name: string;
    setStroke(color?: string, thinkness?: number): void;
    initEventHandler(): void;
    _protonUpdateHandler: (() => void) | undefined;
    _protonUpdateAfterHandler: (() => void) | undefined;
    _emitterAddedHandler: ((emitter: any) => void) | undefined;
    _emitterRemovedHandler: ((emitter: any) => void) | undefined;
    _particleCreatedHandler: ((particle: any) => void) | undefined;
    _particleUpdateHandler: ((particle: any) => void) | undefined;
    _particleDeadHandler: ((particle: any) => void) | undefined;
    init(proton: any): void;
    parent: any;
    resize(width: any, height: any): void;
    destroy(): void;
    remove(proton: any): void;
    onProtonUpdate(): void;
    onProtonUpdateAfter(): void;
    onEmitterAdded(emitter: any): void;
    onEmitterRemoved(emitter: any): void;
    onParticleCreated(particle: any): void;
    onParticleUpdate(particle: any): void;
    onParticleDead(particle: any): void;
}

/**
 * CanvasRenderer class for rendering particles on a canvas element.
 * @extends BaseRenderer
 */
declare class CanvasRenderer extends BaseRenderer {
    /**
     * Creates a new CanvasRenderer instance.
     * @param {HTMLCanvasElement} element - The canvas element to render on.
     */
    constructor(element: HTMLCanvasElement);
    /**
     * @type {object|null}
     * @private
     */
    private stroke;
    /**
     * @type {CanvasRenderingContext2D}
     * @private
     */
    private context;
    /**
     * @type {object}
     * @private
     */
    private bufferCache;
    /**
     * Resizes the canvas element.
     * @param {number} width - The new width of the canvas.
     * @param {number} height - The new height of the canvas.
     */
    resize(width: number, height: number): void;
    /**
     * Handles particle creation.
     * @param {object} particle - The created particle.
     */
    onParticleCreated(particle: object): void;
    /**
     * Handles particle updates.
     * @param {object} particle - The updated particle.
     */
    onParticleUpdate(particle: object): void;
    /**
     * Handles particle destruction.
     * @param {object} particle - The destroyed particle.
     */
    onParticleDead(particle: object): void;
    /**
     * Adds an image to the particle body.
     * @param {HTMLImageElement} img - The image to add.
     * @param {object} particle - The particle to add the image to.
     * @private
     */
    private addImg2Body;
    /**
     * Draws an image particle.
     * @param {object} particle - The particle to draw.
     * @private
     */
    private drawImage;
    /**
     * Draws a circular particle.
     * @param {object} particle - The particle to draw.
     * @private
     */
    private drawCircle;
    /**
     * Creates a buffer for image particles.
     * @param {HTMLImageElement} image - The image to create a buffer for.
     * @returns {HTMLCanvasElement|undefined} The created buffer canvas.
     * @private
     */
    private createBuffer;
}

/**
 * Represents a DOM-based renderer for particle systems.
 * @extends BaseRenderer
 */
declare class DomRenderer extends BaseRenderer {
    /**
     * Creates a new DomRenderer instance.
     * @param {HTMLElement} element - The HTML element to render to.
     */
    constructor(element: HTMLElement);
    transform3d: boolean;
    addImg2Body(img: any, particle: any): void;
    bodyReady(particle: any): any;
    createBody(body: any, particle: any): HTMLDivElement;
    createCircle(particle: any): HTMLDivElement;
    createSprite(body: any, particle: any): HTMLDivElement;
}

declare class EaselRenderer extends BaseRenderer {
    createSprite(particle: any): void;
    createCircle(particle: any): void;
}

/**
 * Represents a pixel-based renderer for particle systems.
 * @extends BaseRenderer
 */
declare class PixelRenderer extends BaseRenderer {
    /**
     * Creates a new PixelRenderer instance.
     * @param {HTMLCanvasElement} element - The canvas element to render to.
     * @param {Rectangle} [rectangle] - The rectangle defining the rendering area.
     */
    constructor(element: HTMLCanvasElement, rectangle?: Rectangle);
    context: any;
    imageData: any;
    rectangle: Rectangle | undefined;
    createImageData(rectangle: any): void;
    setPixel(imagedata: any, x: any, y: any, particle: any): void;
}

/**
 * Represents a PIXI-based renderer for particle systems.
 * Compatible with Pixi.js v7 and v8.
 * Uses the high-performance ParticleContainer for v8.
 * @extends BaseRenderer
 */
declare class PixiRenderer extends BaseRenderer {
    /**
     * Creates a new PixiRenderer instance.
     * @param {PIXI.Container} element - The PIXI container to render to.
     * @param {string|number} [stroke] - The stroke color for particles.
     * @param {Object} [options] - ParticleContainer options for v8
     */
    constructor(element: PIXI.Container, stroke?: string | number, options?: Object);
    stroke: string | number | undefined;
    color: boolean;
    setColor: boolean;
    blendMode: any;
    options: Object;
    _textureCache: Map<any, any>;
    _updateThrottle: any;
    _updateCounter: number;
    _particleUpdates: Set<any>;
    _frameSkipCounter: number;
    _frameSkipThreshold: any;
    _enableCulling: boolean;
    _cullingBounds: {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    } | {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    } | {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    } | {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    } | null;
    _priorityUpdates: Set<any>;
    _lowPriorityUpdates: Set<any>;
    _updatePriorityThreshold: any;
    _piBy180: number;
    _lastUpdateTime: number;
    _frameTime: number;
    _throttleAdjustCounter: number;
    _autoAdjustThrottle: boolean;
    _useStableSort: boolean;
    _renderBatchSize: any;
    _disableAlphaDirty: any;
    _disableRenderUpdates: boolean;
    _renderUpdateCounter: number;
    _renderUpdateThreshold: any;
    /**
     * Set default culling bounds based on the current view
     * @private
     */
    private _setDefaultCullingBounds;
    /**
     * Install optimizations for the Pixi renderer if available
     * @private
     */
    private _installRendererOptimizations;
    /**
     * Optimize the SystemRunner for better performance
     * @private
     */
    private _optimizeSystemRunner;
    _systemRunnerOptimized: boolean | undefined;
    /**
     * Optimize buildInstructions to reduce CPU usage
     * @private
     */
    private _optimizeBuildInstructions;
    _buildInstructionsOptimized: boolean | undefined;
    /**
     * Disable unnecessary updates that impact performance
     * @private
     */
    private _disableUnnecessaryUpdates;
    _updateTransformOptimized: boolean | undefined;
    /**
     * Set the PIXI class to use for rendering
     * @param {object} PIXI - The PIXI library
     */
    setPIXI(PIXI: object): void;
    createFromImage: any;
    isV8: boolean | undefined;
    /**
     * Set up ParticleContainer for Pixi.js v8
     * @private
     */
    private _setupParticleContainer;
    particleContainer: any;
    originalContainer: any;
    /**
     * Checks if an update should be processed this frame
     * @returns {boolean} Whether to process updates this frame
     * @private
     */
    private _shouldProcessUpdates;
    /**
     * Dynamically adjust throttling based on frame time
     * @private
     */
    private _adjustThrottleIfNeeded;
    /**
     * Process high priority updates first
     * @private
     */
    private _processPriorityUpdates;
    /**
     * Process normal and low priority updates
     * @private
     */
    private _processNormalUpdates;
    /**
     * Handle particle creation
     * @param {object} particle - The particle
     */
    onParticleCreated(particle: object): void;
    /**
     * Create a particle for Pixi.js v8
     * @private
     * @param {object} particle - The particle
     */
    private _createV8Particle;
    _particlesToAdd: any[] | undefined;
    /**
     * Create a legacy particle for Pixi.js v7 and earlier
     * @private
     * @param {object} particle - The particle
     */
    private _createLegacyParticle;
    /**
     * Determines particle update priority based on its properties
     * @param {object} particle - The particle
     * @returns {string} Priority level: 'high', 'normal', or 'low'
     * @private
     */
    private _getParticlePriority;
    /**
     * Gets a texture for the particle - with caching for performance
     * @param {object} particle - The particle
     * @returns {PIXI.Texture} The texture to use
     */
    getTexture(particle: object): PIXI.Texture;
    /**
     * Update particle render properties
     * @param {object} particle - The particle to update
     */
    onParticleUpdate(particle: object): void;
    /**
     * Checks if a particle is within the visible bounds
     * @param {object} particle - The particle to check
     * @returns {boolean} Whether the particle is visible
     * @private
     */
    private _isParticleVisible;
    /**
     * Update a particle for Pixi.js v8
     * @private
     * @param {object} particle - The particle
     */
    private _updateV8Particle;
    /**
     * Update a legacy particle for Pixi.js v7 and earlier
     * @private
     * @param {object} particle - The particle
     */
    private _updateLegacyParticle;
    /**
     * Handle particle removal
     * @param {object} particle - The particle to remove
     */
    onParticleDead(particle: object): void;
    /**
     * Apply transform properties to the target
     * @param {object} particle - The particle
     * @param {object} target - The target to transform
     */
    transform(particle: object, target: object): void;
    /**
     * Create a body for the particle
     * @param {object} body - The body template
     * @param {object} particle - The particle
     * @returns {object} The created body
     */
    createBody(body: object, particle: object): object;
    /**
     * Create a sprite
     * @param {object} body - The body to create a sprite from
     * @returns {PIXI.Sprite} The created sprite
     */
    createSprite(body: object): PIXI.Sprite;
    /**
     * Create a circle graphic - with caching for performance
     * @param {object} particle - The particle to render
     * @returns {PIXI.Graphics} The graphics object
     */
    createCircle(particle: object): PIXI.Graphics;
    /**
     * Destroys the renderer and cleans up resources.
     * @param {Array<Particle>} particles - The particles to clean up.
     */
    destroy(particles: Array<Particle>): void;
    /**
     * Restore the original container if it was replaced
     * @private
     */
    private _restoreOriginalContainer;
    /**
     * Restore any optimizations that need to be cleaned up
     * @private
     */
    private _restoreOptimizations;
    _queueMicroTask(callback: any): void;
}

declare class MStack {
    mats: Float32Array<ArrayBuffer>[];
    size: number;
    set(m: any, i: any): void;
    push(m: any): void;
    pop(): void;
    top(): Float32Array<ArrayBuffer>;
}

/**
 * Represents a WebGL-based renderer for particle systems.
 * @extends BaseRenderer
 */
declare class WebGLRenderer extends BaseRenderer {
    /**
     * Creates a new WebGLRenderer instance.
     * @param {HTMLCanvasElement} element - The canvas element to render to.
     */
    constructor(element: HTMLCanvasElement);
    gl: any;
    addImg2Body(img: any, particle: any): void;
    setMaxRadius(radius: any): void;
    circleCanvasURL: any;
    getVertexShader(): string;
    getFragmentShader(): string;
    initVar(): void;
    mstack: MStack | null | undefined;
    umat: Float32Array<ArrayBuffer> | null | undefined;
    smat: Float32Array<ArrayBuffer> | null | undefined;
    texturebuffers: {} | null | undefined;
    blendEquation(A: any): void;
    blendFunc(A: any, B: any): void;
    getShader(gl: any, str: any, fs: any): any;
    initShaders(): void;
    sprogram: any;
    initBuffers(): void;
    unitIBuffer: any;
    unitI33: any;
    stripBuffer: any;
    createCircle(raidus: any): any;
    circleCanvasRadius: number | undefined;
    drawImg2Canvas(particle: any): void;
    updateMatrix(particle: any): void;
}

/**
 * Represents a custom renderer that extends the BaseRenderer.
 * @extends BaseRenderer
 */
declare class CustomRenderer extends BaseRenderer {
    /**
     * Creates a new CustomRenderer instance.
     * @param {HTMLElement} element - The HTML element to render to.
     */
    constructor(element: HTMLElement);
}

/**
 * Represents a line zone for particle systems.
 * @extends Zone
 */
declare class LineZone extends Zone {
    /**
     * Creates a new LineZone.
     * @param {number} x1 - The x-coordinate of the first point.
     * @param {number} y1 - The y-coordinate of the first point.
     * @param {number} [x2] - The x-coordinate of the second point.
     * @param {number} [y2] - The y-coordinate of the second point.
     * @param {string} [direction=">"] - The direction of the line.
     */
    constructor(x1: number, y1: number, x2?: number, y2?: number, direction?: string);
    x1: number | undefined;
    y1: number | undefined;
    x2: number | undefined;
    y2: number | undefined;
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
    direction: Mixed;
    /**
     * Gets a random position on the line.
     * @returns {Vector2D} A vector representing the random position.
     */
    getPosition(): Vector2D$1;
    /**
     * Determines which side of the line a point is on.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @returns {boolean} True if the point is on the positive side of the line, false otherwise.
     */
    getDirection(x: number, y: number): boolean;
    /**
     * Calculates the distance of a point from the line.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @returns {number} The distance from the point to the line.
     */
    getDistance(x: number, y: number): number;
    /**
     * Calculates the symmetric vector of a given vector with respect to the line.
     * @param {Vector2D} v - The vector to reflect.
     * @returns {Vector2D} The reflected vector.
     */
    getSymmetric(v: Vector2D$1): Vector2D$1;
    /**
     * Gets the gradient (angle) of the line.
     * @returns {number} The gradient of the line in radians.
     */
    getGradient(): number;
    /**
     * Checks if a particle is outside the range of the line.
     * @param {Particle} particle - The particle to check.
     * @returns {boolean} True if the particle is within range, false otherwise.
     */
    rangeOut(particle: Particle): boolean;
    /**
     * Gets the length of the line.
     * @returns {number} The length of the line.
     */
    getLength(): number;
    /**
     * Handles particle crossing behavior based on the crossType.
     * @param {Particle} particle - The particle to check for crossing.
     */
    crossing(particle: Particle): void;
}

/**
 * Represents a circular zone in a 2D space.
 * @extends Zone
 */
declare class CircleZone extends Zone {
    /**
     * Creates a new CircleZone.
     * @param {number} x - The x-coordinate of the circle's center.
     * @param {number} y - The y-coordinate of the circle's center.
     * @param {number} [radius] - The radius of the circle.
     */
    constructor(x: number, y: number, radius?: number);
    x: number;
    y: number;
    radius: number | undefined;
    angle: number;
    center: {
        x: number;
        y: number;
    };
    /**
     * Gets a random position within the circle.
     * @returns {Object} An object with x and y coordinates.
     */
    getPosition(): Object;
    randomRadius: number | undefined;
    /**
     * Sets the center of the circle.
     * @param {number} x - The new x-coordinate of the center.
     * @param {number} y - The new y-coordinate of the center.
     */
    setCenter(x: number, y: number): void;
    /**
     * Handles particle crossing behavior.
     * @param {Object} particle - The particle to check for crossing.
     */
    crossing(particle: Object): void;
    /**
     * Calculates the symmetric position of a particle.
     * @param {Object} particle - The particle to calculate symmetry for.
     */
    getSymmetric(particle: Object): void;
    /**
     * Calculates the gradient for a particle.
     * @param {Object} particle - The particle to calculate the gradient for.
     * @returns {number} The calculated gradient.
     */
    getGradient(particle: Object): number;
}

/**
 * Represents a rectangular zone for particle systems.
 * @extends Zone
 */
declare class RectZone extends Zone {
    /**
     * Creates a new RectZone.
     * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
     * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
     * @param {number} [width] - The width of the rectangle.
     * @param {number} [height] - The height of the rectangle.
     */
    constructor(x: number, y: number, width?: number, height?: number);
    x: number;
    y: number;
    width: number;
    height: number;
    /**
     * Gets a random position within the rectangular zone.
     * @returns {Vector2D} A vector representing the random position.
     */
    getPosition(): Vector2D;
    /**
     * Handles particle crossing behavior based on the crossType.
     * @param {Particle} particle - The particle to check for crossing.
     */
    crossing(particle: Particle): void;
}

/**
 * Represents a zone based on image data.
 * @extends Zone
 */
declare class ImageZone extends Zone {
    /**
     * Creates an ImageZone.
     * @param {ImageData} imageData - The image data to use for the zone.
     * @param {number} [x=0] - The x-coordinate offset.
     * @param {number} [y=0] - The y-coordinate offset.
     * @param {number} [d=2] - The sampling density.
     */
    constructor(imageData: ImageData, x?: number, y?: number, d?: number);
    /**
     * Resets the ImageZone with new parameters.
     * @param {ImageData} imageData - The image data to use for the zone.
     * @param {number} [x=0] - The x-coordinate offset.
     * @param {number} [y=0] - The y-coordinate offset.
     * @param {number} [d=2] - The sampling density.
     */
    reset(imageData: ImageData, x?: number, y?: number, d?: number): void;
    imageData: ImageData | null | undefined;
    x: any;
    y: any;
    d: any;
    vectors: any[] | undefined;
    /**
     * Sets up vectors based on the image data.
     * @returns {Object} The vector object.
     */
    setVectors(): Object;
    /**
     * Checks if a point is within the bounds of the image.
     * @param {number} x - The x-coordinate to check.
     * @param {number} y - The y-coordinate to check.
     * @returns {boolean} True if the point is within bounds, false otherwise.
     */
    getBound(x: number, y: number): boolean;
    /**
     * Gets a random position within the image zone.
     * @returns {Object} A vector representing the position.
     */
    getPosition(): Object;
    /**
     * Gets the color at a specific point in the image.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @returns {Object} An object containing r, g, b, and a values.
     */
    getColor(x: number, y: number): Object;
    /**
     * Handles particle crossing behavior.
     * @param {Object} particle - The particle to check for crossing.
     */
    crossing(particle: Object): void;
}

declare namespace _default {
    function addEventListener(proton: any, func: any): void;
    function getStyle(color?: string): string;
    function drawZone(proton: any, canvas: any, zone: any, clear: any): void;
    function drawEmitter(proton: any, canvas: any, emitter: any, clear: any): void;
}

export { Alpha, ArraySpan, Attraction, Behaviour$1 as Behaviour, BehaviourEmitter, Body, CanvasRenderer, CircleZone, Collision, Color, _default$2 as ColorUtil, CrossZone, CustomRenderer, Cyclone, _default as Debug, DomRenderer, EaselRenderer, Emitter$1 as Emitter, FollowEmitter, Force, Gravity, GravityWell, ImageZone, Initialize, Life, LineZone, Mass, Mat3, MathUtil, Particle$1 as Particle, PixelRenderer, PixiRenderer, PointZone, Polar2D, Pool, Position, Radius, RandomDrift, Rate, RectZone, Rectangle, Repulsion, Rotate, Scale, Span, _default$3 as Util, Vector2D$1 as Vector2D, Velocity, WebGLRenderer, Zone, Proton$1 as default, _default$1 as ease };
