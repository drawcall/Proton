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
   * @param {Number | String} [totalTime] begin emit time;
   * @param {String | boolean} [life] the life of this emitter
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
    const particles = this.particles;
    const len = particles.length;
    
    // Just mark all as dead in a tight loop
    for (let i = 0; i < len; i++) {
      particles[i].dead = true;
    }
    
    // Don't actually remove from array here - that will happen in next integrate() call
  }

  /**
   * add initialize to this emitter
   * @method addSelfInitialize
   */
  addSelfInitialize(initialize) {
    if (initialize["init"]) {
      initialize.init(this);
    } else {
      // this.initAll();
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
    if (this.age >= this.life || this.dead) {
      this.destroy();
      return;
    }

    this.emitting(time);
    this.integrate(time);
  }

  integrate(time) {
    if (!this.parent) return;

    const damping = 1 - this.damping;
    this.parent.integrator.calculate(this, time, damping);

    // Optimization for 500k particles: Use fast iteration with minimal GC impact
    const particles = this.particles;
    const length = particles.length;
    const parent = this.parent;
    const pool = parent.pool;
    const integrator = parent.integrator;
    const shouldDispatchUpdates = Boolean(this.parent || this.bindEvent);
    
    // Optimization: Use swap-and-pop method for removing dead particles
    // This is much faster than splice for large arrays
    let aliveCount = length;
    let i = 0;

    // Single-pass particle update with efficient removal
    while (i < aliveCount) {
      const particle = particles[i];
      
      // Fast update and check for dead particles
      particle.update(time, i);
      integrator.calculate(particle, time, damping);
      
      // Dispatch update events only if needed and not too many particles
      // Skip event dispatching for extremely large particle counts
      if (shouldDispatchUpdates && length < 10000) {
        this.dispatch("PARTICLE_UPDATE", particle);
      }
      
      // Check if particle is dead
      if (particle.dead) {
        // Dispatch death events only when needed and not too many particles
        if (shouldDispatchUpdates && length < 10000) {
          this.dispatch("PARTICLE_DEAD", particle);
        }
        
        // Fast removal: swap with the last alive particle and decrement counter
        // This avoids expensive array splicing
        aliveCount--;
        if (i < aliveCount) {
          // Only swap if this isn't already the last particle
          particles[i] = particles[aliveCount];
          particles[aliveCount] = particle;
          
          // Return to pool
          pool.expire(particle);
          continue; // Don't increment i, process the swapped particle
        } else {
          // Last particle case
          pool.expire(particle);
        }
      }
      i++;
    }
    
    // If we have dead particles at the end, remove them all at once
    if (aliveCount < length) {
      particles.length = aliveCount; // Truncate the array (much faster than multiple splices)
    }
  }

  dispatch(event, target) {
    // Optimize by skipping work if no listeners
    if (!this.parent && !this.bindEvent) return;
    
    // For performance with many particles, only dispatch certain events
    if (this.particles && this.particles.length > 50000) {
      // With very large particle counts, only dispatch critical events
      if (event !== "PARTICLE_CREATED" && event !== "PARTICLE_DEAD") {
        return;
      }
    }
    
    this.parent && this.parent.dispatchEvent(event, target);
    this.bindEvent && this.dispatchEvent(event, target);
  }

  emitting(time) {
    if (this.stoped) return;

    // Maximum particles to emit in a single frame to prevent lag spikes
    const MAX_EMIT_PER_FRAME = 10000;

    // Direct property access for performance
    let emitTime = this.emitTime;
    const totalTime = this.totalTime;
    
    if (totalTime === "none") {
      this.emitTime = emitTime + time;
      return;
    } 
    
    if (totalTime === "once") {
      // Fast path for "once" emission
      let numToEmit = this.rate.getValue(99999);
      
      // Cap emission count to prevent frame drops
      if (numToEmit > MAX_EMIT_PER_FRAME) {
        // Log warning only in development if trying to emit too many at once
        if (process && process.env && process.env.NODE_ENV === 'development') {
          console.warn(`Attempting to emit ${numToEmit} particles at once, capped to ${MAX_EMIT_PER_FRAME}`);
        }
        numToEmit = MAX_EMIT_PER_FRAME;
      }
      
      if (numToEmit <= 0) return;
      
      // Cache emission speed and emit particles
      this.emitSpeed = numToEmit;
      
      // Use the optimized method for bulk creation
      this._fastCreateParticles(numToEmit);
      
      // Mark as completed
      this.totalTime = "none";
      return;
    }
    
    // Regular emission logic - extreme optimization
    emitTime += time;
    this.emitTime = emitTime;
    
    if (emitTime < totalTime) {
      // Get particle count using rate
      let numToEmit = this.rate.getValue(time);
      
      if (numToEmit <= 0) return;
      
      // Cap emission to prevent lag spikes
      if (numToEmit > MAX_EMIT_PER_FRAME) {
        numToEmit = MAX_EMIT_PER_FRAME;
      }
      
      this.emitSpeed = numToEmit;
      
      // Use fastest particle creation method
      this._fastCreateParticles(numToEmit);
    }
  }

  /**
   * Ultra-fast particle creation - no optional parameters, minimal overhead
   * @param {Number} count - Number of particles to create
   * @private
   */
  _fastCreateParticles(count) {
    // Early exit for zero count
    if (count <= 0 || !this.parent) return;
    
    // Direct property access - avoid repeated lookups
    const parent = this.parent;
    const pool = parent.pool;
    const particlesArr = this.particles;
    const initializes = this.initializes;
    const behaviours = this.behaviours;
    
    // Emergency circuit breaker - prevent memory issues when too many particles
    const MAX_SAFE_PARTICLES = 1000000; // 1 million particles max
    if (particlesArr.length + count > MAX_SAFE_PARTICLES) {
      count = Math.max(0, MAX_SAFE_PARTICLES - particlesArr.length);
      if (count <= 0) return; // Already at max capacity
    }
    
    // Use faster bulk retrieval if available
    let particles;
    if (pool.getBulk) {
      // Get multiple particles at once from pool
      particles = pool.getBulk(Particle, count);
      
      // Fast-path batch initialization
      this._initializeParticlesBulk(particles, initializes, behaviours);
    } else {
      // Fast path direct initialization - optimized for huge particle counts
      this._createParticlesLoop(count, pool, particlesArr, initializes, behaviours);
    }
  }
  
  /**
   * High-speed loop for creating many particles
   * @private
   */
  _createParticlesLoop(count, pool, particlesArr, initializes, behaviours) {
    // Pre-calculate array growth to avoid resizing
    const newLength = particlesArr.length + count;
    
    // Handle array growth efficiently for large particle counts
    if (particlesArr.length === 0 && count > 10000) {
      try {
        // Try to preallocate the array with correct capacity
        particlesArr.length = count;
        particlesArr.length = 0; // Reset but keep capacity
      } catch (e) {
        // Ignore if this optimization isn't supported
      }
    }
  
    // Cache values for dispatch check
    const shouldDispatch = (this.parent || this.bindEvent) && particlesArr.length < 10000;
    const dispatchFn = shouldDispatch ? this.dispatch.bind(this) : null;
    
    // Minimal particle creation loop - optimized for speed
    let i = 0;
    let particle;
    
    // Using while loop (faster than for loop in many JS engines)
    while (i < count) {
      // Get from pool
      particle = pool.get(Particle);
      
      // Fastest possible reset
      particle.reset();
      
      // Direct initialize call with cached values
      InitializeUtil.initialize(this, particle, initializes);
      
      // Add behaviors
      particle.addBehaviours(behaviours);
      particle.parent = this;
      
      // Push to array
      particlesArr.push(particle);
      
      // Only dispatch if absolutely necessary
      if (dispatchFn) {
        dispatchFn("PARTICLE_CREATED", particle);
      }
      
      i++;
    }
  }
  
  /**
   * Bulk initialization for particles - more efficient for large batches
   * @private
   */
  _initializeParticlesBulk(particles, initializes, behaviours) {
    const count = particles.length;
    const particlesArr = this.particles;
    
    // Cache values for dispatch check
    const shouldDispatch = (this.parent || this.bindEvent) && particlesArr.length < 10000;
    const dispatchFn = shouldDispatch ? this.dispatch.bind(this) : null;
    
    // One-time binding of this context for the loop
    const emitter = this;
    
    // Bulk initialize particles
    for (let i = 0; i < count; i++) {
      const particle = particles[i];
      
      // Initialize the particle directly
      InitializeUtil.initialize(emitter, particle, initializes);
      
      // Set properties
      particle.parent = emitter;
      
      // Add behaviors - use direct array if possible for better performance
      particle.addBehaviours(behaviours);
      
      // Add to particles array
      particlesArr.push(particle);
      
      // Only dispatch if necessary
      if (dispatchFn) {
        dispatchFn("PARTICLE_CREATED", particle);
      }
    }
  }

  /**
   * High-performance batch particle creation for large quantities
   * @param {Number} length - Number of particles to create
   * @param {Object|Array} [initialize] - Initialization parameters
   * @param {Object|Array} [behaviour] - Behavior parameters
   */
  createParticlesBatch(length, initialize, behaviour) {
    // Immediate redirect to fast creation when no custom initializers/behaviors
    if (!initialize && !behaviour) {
      this._fastCreateParticles(length);
      return;
    }
    
    // For huge batches, split into smaller chunks
    const BATCH_SIZE = 5000;
    
    if (length > BATCH_SIZE && length > 10000) {
      // Process in chunks for very large particle counts
      for (let i = 0; i < length; i += BATCH_SIZE) {
        const chunkSize = Math.min(BATCH_SIZE, length - i);
        this._createParticleChunk(chunkSize, initialize, behaviour);
      }
    } else {
      // Process all at once for smaller batches
      this._createParticleChunk(length, initialize, behaviour);
    }
  }
  
  /**
   * Internal method to create a chunk of particles
   * @private
   */
  _createParticleChunk(length, initialize, behaviour) {
    // Early exit for zero particles
    if (length <= 0) return;
    
    // Cache values for reuse
    const parent = this.parent;
    const pool = parent.pool;
    const particlesArr = this.particles;
    
    // Check if we'd exceed max safe count
    const MAX_SAFE_PARTICLES = 1000000; // 1 million particles max
    if (particlesArr.length + length > MAX_SAFE_PARTICLES) {
      length = Math.max(0, MAX_SAFE_PARTICLES - particlesArr.length);
      if (length <= 0) return;
    }
    
    // Only calculate this once outside the loop
    const shouldDispatch = (this.parent || this.bindEvent) && particlesArr.length < 10000;
    
    // Handle initializes/behaviors
    const initializes = initialize ? Util.toArray(initialize) : this.initializes;
    const behaviours = behaviour ? Util.toArray(behaviour) : this.behaviours;
    
    // Pre-bind functions and cache properties for the loop
    const dispatchFn = shouldDispatch ? this.dispatch.bind(this) : null;
    const emitter = this;
    
    // Pre-allocate capacity if possible
    if (Array.prototype.reserve) {
      const newCapacity = particlesArr.length + length;
      if (particlesArr.capacity < newCapacity) {
        particlesArr.reserve(newCapacity);
      }
    }
    
    // Creation loop - unrolled for performance
    let i = 0;
    let particle;
    
    // Fast loop with minimal overhead
    while (i < length) {
      particle = pool.get(Particle);
      
      // Fastest reset possible
      particle.reset();
      
      // Initialize using cached values
      InitializeUtil.initialize(emitter, particle, initializes);
      
      // Add behaviors
      particle.addBehaviours(behaviours);
      particle.parent = emitter;
      
      // Add to particles array
      particlesArr.push(particle);
      
      // Dispatch only if needed
      if (dispatchFn) {
        dispatchFn("PARTICLE_CREATED", particle);
      }
      
      i++;
    }
  }

  /**
   * Creates a single particle - now optimized for performance
   * but batch methods should be preferred for multiple particles
   */
  createParticle(initialize, behaviour) {
    // Fast path when we have a parent
    if (!this.parent) return null;
    
    const particle = this.parent.pool.get(Particle);
    
    // Direct setup
    particle.reset();
    
    // Handle initializes/behaviors
    const initializes = initialize ? Util.toArray(initialize) : this.initializes;
    const behaviours = behaviour ? Util.toArray(behaviour) : this.behaviours;
    
    // Initialize and add behaviors
    InitializeUtil.initialize(this, particle, initializes);
    particle.addBehaviours(behaviours);
    particle.parent = this;

    // Add to array - directly push to avoid function call
    this.particles.push(particle);
    
    // Only dispatch if needed and not too many particles
    if ((this.parent || this.bindEvent) && this.particles.length < 10000) {
      this.dispatch("PARTICLE_CREATED", particle);
    }

    return particle;
  }

  /**
   * Sets up a particle with initialization and behavior.
   * @deprecated Use direct methods instead for better performance
   */
  setupParticle(particle, initialize, behaviour) {
    // Direct setup
    particle.reset();
    
    // Handle initializes/behaviors
    const initializes = initialize ? Util.toArray(initialize) : this.initializes;
    const behaviours = behaviour ? Util.toArray(behaviour) : this.behaviours;
    
    // Initialize
    InitializeUtil.initialize(this, particle, initializes);
    particle.addBehaviours(behaviours);
    particle.parent = this;

    // Add to array
    this.particles.push(particle);
  }

  /**
   * Removes all particles and stops the emitter.
   */
  remove() {
    this.stop();
    
    // More efficient particle cleanup
    const particles = this.particles;
    const len = particles.length;
    
    // Return all particles to pool
    if (this.parent && this.parent.pool) {
      const pool = this.parent.pool;
      for (let i = 0; i < len; i++) {
        pool.expire(particles[i]);
      }
    }
    
    // Clear array in one operation
    particles.length = 0;
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

    this.rate = null;
    this.old = null;
    this.rgb = null;
    this.v = null;
    this.a = null;
    this.p = null;
  }
}

EventDispatcher.bind(Emitter);
