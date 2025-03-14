import Types from "../utils/Types";
import ColorUtil from "../utils/ColorUtil";
import MathUtil from "../math/MathUtil";
import BaseRenderer from "./BaseRenderer";
import Pool from "../core/Pool";

let PIXIClass;

// Counter to generate unique IDs for each renderer instance
let rendererIdCounter = 0;

/**
 * A specialized pool that ensures particles are never shared between different emitters
 */
class EmitterAwarePool extends Pool {
  constructor() {
    super();
    // Store pools by emitter ID to ensure separation
    this.emitterPools = new Map();
  }

  /**
   * Get an item from the pool, ensuring it's specific to the emitter
   */
  get(target, params, emitterId) {
    // Ensure we have a valid emitter ID
    emitterId = emitterId || (params && params.parent && params.parent.id) || 'default';
    
    // Get or create the emitter-specific pool
    if (!this.emitterPools.has(emitterId)) {
      this.emitterPools.set(emitterId, []);
    }
    
    const emitterPool = this.emitterPools.get(emitterId);
    
    // Get from the emitter-specific pool or create new
    let p;
    if (emitterPool.length > 0) {
      p = emitterPool.pop();
    } else {
      p = this.createOrClone(target, params);
      // Tag with emitter ID for tracking
      p.__emitterId = emitterId;
    }
    
    return p;
  }

  /**
   * Return an item to its emitter-specific pool
   */
  expire(target, emitterId) {
    if (!emitterId && target.__emitterId) {
      emitterId = target.__emitterId;
    }
    
    // Default to the general pool if no emitter ID is found
    emitterId = emitterId || 'default';
    
    // Get or create the emitter-specific pool
    if (!this.emitterPools.has(emitterId)) {
      this.emitterPools.set(emitterId, []);
    }
    
    // Return to the emitter-specific pool
    return this.emitterPools.get(emitterId).push(target);
  }

  /**
   * Clean up all pools
   */
  destroy() {
    super.destroy();
    
    // Clear all emitter-specific pools
    this.emitterPools.forEach(pool => {
      pool.length = 0;
    });
    
    this.emitterPools.clear();
    this.emitterPools = null;
  }
}

/**
 * Represents a PIXI-based renderer for particle systems.
 * @extends BaseRenderer
 */
export default class PixiRenderer extends BaseRenderer {
  /**
   * Creates a new PixiRenderer instance.
   * @param {PIXI.Container} element - The PIXI container to render to.
   * @param {string|number} [stroke] - The stroke color for particles.
   */
  constructor(element, stroke) {
    super(element);

    this.stroke = stroke;
    this.color = false;
    this.setColor = false;
    this.blendMode = null;
    
    // Assign a unique ID to this renderer instance
    this.rendererId = ++rendererIdCounter;
    
    // Create a new emitter-aware pool for this renderer
    this.pixiPool = new EmitterAwarePool();
    this.pixiPool.create = (body, particle) => this.createBody(body, particle);
    
    // Track emitters and their particles
    this.emitterMap = new Map();
    
    this.setPIXI(window.PIXI);

    this.name = "PixiRenderer";
  }

  setPIXI(PIXI) {
    try {
      PIXIClass = PIXI || { Sprite: {} };
      this.createFromImage = PIXIClass.Sprite.from;
    } catch (e) {}
  }

  onProtonUpdate() {}

  onEmitterAdded(emitter) {
    // Add emitter to tracking map
    if (!this.emitterMap.has(emitter.id)) {
      this.emitterMap.set(emitter.id, new Set());
    }
  }

  onEmitterRemoved(emitter) {
    // Clean up emitter's tracked particles
    if (this.emitterMap.has(emitter.id)) {
      this.emitterMap.delete(emitter.id);
    }
  }

  /**
   * @param particle
   */
  onParticleCreated(particle) {
    // Get the emitter ID for this particle and store it directly on the particle
    const emitterId = particle.parent ? particle.parent.id : 'orphaned';
    
    // Store emitter ID directly on the particle for when parent reference is lost
    particle.__emitterId = emitterId;
    
    if (particle.body) {
      particle.body = this.pixiPool.get(particle.body, particle, emitterId);
    } else {
      particle.body = this.pixiPool.get(this.circleConf, particle, emitterId);
    }

    if (this.blendMode) {
      particle.body.blendMode = this.blendMode;
    }

    // Track this particle with its emitter
    if (this.emitterMap.has(emitterId)) {
      this.emitterMap.get(emitterId).add(particle);
    }

    this.element.addChild(particle.body);
  }

  /**
   * @param particle
   */
  onParticleUpdate(particle) {
    this.transform(particle, particle.body);

    if (this.setColor === true || this.color === true) {
      particle.body.tint = ColorUtil.getHex16FromParticle(particle);
    }
  }

  /**
   * @param particle
   */
  onParticleDead(particle) {
    if (!particle.body) return;
    
    this.element.removeChild(particle.body);
    
    // Use the cached emitter ID instead of accessing parent which might be null
    const emitterId = particle.__emitterId || (particle.parent ? particle.parent.id : 'orphaned');
    
    // Return to the emitter-specific pool
    this.pixiPool.expire(particle.body, emitterId);
    
    // Remove from tracked particles
    if (this.emitterMap.has(emitterId)) {
      this.emitterMap.get(emitterId).delete(particle);
    }
    
    particle.body = null;
  }

  transform(particle, target) {
    target.x = particle.p.x;
    target.y = particle.p.y;

    target.alpha = particle.alpha;

    target.scale.x = particle.scale;
    target.scale.y = particle.scale;

    target.rotation = particle.rotation * MathUtil.PI_180;
  }

  createBody(body, particle) {
    if (body.isCircle) return this.createCircle(particle);
    else return this.createSprite(body);
  }

  createSprite(body) {
    const sprite = body.isInner ? this.createFromImage(body.src) : new PIXIClass.Sprite(body);

    sprite.anchor.set(0.5, 0.5);

    return sprite;
  }

  createCircle(particle) {
    const graphics = new PIXIClass.Graphics();
    
    if (this.stroke) {
      const stroke = Types.isString(this.stroke) ? this.stroke : 0x000000;
      graphics.lineStyle(1, stroke);
    }

    graphics.beginFill(particle.color || 0x008ced);
    graphics.drawCircle(0, 0, particle.radius);
    graphics.endFill();

    return graphics;
  }

  /**
   * Destroys the renderer and cleans up resources.
   * @param {Array<Particle>} particles - The particles to clean up.
   */
  destroy(particles) {
    super.destroy();

    // Clean up tracking maps
    this.emitterMap.clear();
    this.emitterMap = null;

    // Clean up the instance-specific particle pool
    this.pixiPool.destroy();
    this.pixiPool = null;

    let i = particles.length;
    while (i--) {
      let particle = particles[i];
      if (particle.body) {
        this.element.removeChild(particle.body);
        particle.body.destroy({ children: true });
      }
    }
  }
}