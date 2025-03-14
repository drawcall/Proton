import Types from "../utils/Types";
import ColorUtil from "../utils/ColorUtil";
import MathUtil from "../math/MathUtil";
import BaseRenderer from "./BaseRenderer";

let PIXIClass;

/**
 * Represents a PIXI-based renderer for particle systems.
 * Compatible with Pixi.js v8.
 * @extends BaseRenderer
 */
export default class PixiRenderer extends BaseRenderer {
  /**
   * Creates a new PixiRenderer instance.
   * @param {PIXI.Container|PIXI.ParticleContainer} element - The PIXI container to render to.
   * @param {string|number} [stroke] - The stroke color for particles.
   * @param {object} [options] - ParticleContainer options
   */
  constructor(element, stroke, options = {}) {
    super(element);

    this.stroke = stroke;
    this.color = false;
    this.setColor = false;
    this.blendMode = null;
    
    // Enhanced object pooling with better reuse
    this.pool.create = (body, particle) => this.createBody(body, particle);
    this.setPIXI(window.PIXI);
    
    // Texture cache for sprites and graphics
    this._textureCache = new Map();
    this._graphicsCache = new Map();
    
    // Update batching
    this._batchSize = options.batchSize || 100;
    this._updateQueue = [];
    this._isDirty = false;
    
    // Reusable objects to avoid allocations
    this._tempRotation = 0;
    this._tempColor = 0;
    this._strokeColor = 0;
    
    // Pre-compute frequently used values
    this._defaultRadius = options.defaultRadius || 10;
    this._defaultColor = options.defaultColor || 0x008ced;

    // Create ParticleContainer if element is not provided
    if (!element && PIXIClass) {
      const defaultOptions = {
        scale: true,
        position: true,
        rotation: true,
        uvs: true,
        alpha: true
      };
      this.element = new PIXIClass.ParticleContainer(
        options.maxSize || 50000, // Increased default for better batching
        { ...defaultOptions, ...options },
        this._batchSize
      );
    }

    this.name = "PixiRenderer";
    
    // Batch rendering
    this._batchedUpdates = options.batchUpdates !== false;
    this._updateScheduled = false;
  }

  /**
   * Set the PIXI class to use for rendering
   * Updated for Pixi.js v8 compatibility
   * @param {object} PIXI - The PIXI library
   */
  setPIXI(PIXI) {
    try {
      PIXIClass = PIXI || { Sprite: {}, ParticleContainer: {} };
      // Handle both v7 and v8 style Sprite creation
      this.createFromImage = PIXIClass.Sprite.from || PIXIClass.Sprite.fromImage;
      
      // Check if we're using v8
      this.isV8 = typeof PIXIClass.VERSION === 'string' && 
                  parseInt(PIXIClass.VERSION.split('.')[0], 10) >= 8;
    } catch (e) {
      console.warn('Error setting up PIXI in PixiRenderer:', e);
    }
  }

  onProtonUpdate() {
    // Process batched updates if any
    if (this._batchedUpdates && this._isDirty && !this._updateScheduled) {
      this._updateScheduled = true;
      
      // Use requestAnimationFrame for batching if available
      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => this._processBatchedUpdates());
      } else {
        // Fallback to immediate processing
        this._processBatchedUpdates();
      }
    }
  }

  /**
   * Process all batched updates at once
   * @private
   */
  _processBatchedUpdates() {
    if (this._updateQueue.length) {
      // Optimize by updating properties in batches
      // This minimizes state changes and layout thrashing
      const queue = this._updateQueue;
      let i = 0;
      const len = queue.length;
      
      // Process position updates
      for (; i < len; i++) {
        const item = queue[i];
        item.target.x = item.x;
        item.target.y = item.y;
      }
      
      // Process scale updates
      for (i = 0; i < len; i++) {
        const item = queue[i];
        if (item.hasScale) {
          item.target.scale.x = item.scaleX;
          item.target.scale.y = item.scaleY;
        }
      }
      
      // Process remaining properties
      for (i = 0; i < len; i++) {
        const item = queue[i];
        if (item.hasAlpha) item.target.alpha = item.alpha;
        if (item.hasRotation) item.target.rotation = item.rotation;
        if (item.hasTint && item.target.tint !== undefined) {
          item.target.tint = item.tint;
        }
      }
      
      // Clear the queue
      this._updateQueue.length = 0;
    }
    
    this._isDirty = false;
    this._updateScheduled = false;
  }

  /**
   * Get cached texture or create a new one
   * @param {string} key - Cache key
   * @param {Function} createFn - Function to create texture if not in cache
   * @returns {PIXI.Texture} The cached or new texture
   * @private
   */
  _getOrCreateTexture(key, createFn) {
    if (!this._textureCache.has(key)) {
      this._textureCache.set(key, createFn());
    }
    return this._textureCache.get(key);
  }

  /**
   * @param particle
   */
  onParticleCreated(particle) {
    if (particle.body) {
      particle.body = this.pool.get(particle.body, particle);
    } else {
      particle.body = this.pool.get(this.circleConf, particle);
    }

    if (this.blendMode && particle.body.blendMode !== undefined) {
      particle.body.blendMode = this.blendMode;
    }

    this.element.addChild(particle.body);
  }

  /**
   * @param particle
   */
  onParticleUpdate(particle) {
    if (this._batchedUpdates) {
      // Add to update queue for batched processing
      this._queueParticleUpdate(particle);
    } else {
      // Direct update for immediate mode
      this.transform(particle, particle.body);
      
      if (this.setColor === true || this.color === true) {
        if (this.isV8 && particle.body.tint !== undefined) {
          particle.body.tint = ColorUtil.getHex16FromParticle(particle);
        } else if (!this.isV8) {
          particle.body.tint = ColorUtil.getHex16FromParticle(particle);
        }
      }
    }
  }
  
  /**
   * Queue a particle update for batch processing
   * @param {object} particle - The particle to update
   * @private
   */
  _queueParticleUpdate(particle) {
    // Reuse queue items if possible to reduce allocations
    let queueItem;
    
    if (this._updateQueue.length < 10000) { // Limit queue size for memory safety
      queueItem = {
        target: particle.body,
        x: particle.p.x,
        y: particle.p.y,
        scaleX: particle.scale,
        scaleY: particle.scale,
        alpha: particle.alpha,
        rotation: particle.rotation * MathUtil.PI_180,
        hasScale: true,
        hasAlpha: true,
        hasRotation: true,
        hasTint: this.setColor === true || this.color === true
      };
      
      if (queueItem.hasTint) {
        queueItem.tint = ColorUtil.getHex16FromParticle(particle);
      }
      
      this._updateQueue.push(queueItem);
      this._isDirty = true;
    }
  }

  /**
   * @param particle
   */
  onParticleDead(particle) {
    this.element.removeChild(particle.body);
    this.pool.expire(particle.body);
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
    let sprite;
    
    if (body.isInner) {
      // Cache textures by source
      const cacheKey = `sprite_${body.src}`;
      if (!this._textureCache.has(cacheKey)) {
        const texture = this.createFromImage(body.src);
        this._textureCache.set(cacheKey, texture);
        sprite = new PIXIClass.Sprite(texture);
      } else {
        sprite = new PIXIClass.Sprite(this._textureCache.get(cacheKey));
      }
    } else {
      sprite = new PIXIClass.Sprite(body);
    }

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    return sprite;
  }

  /**
   * Create a circle graphic
   * Updated for Pixi.js v8 compatibility with caching
   * @param {object} particle - The particle to render
   * @returns {PIXI.Graphics} The graphics object
   */
  createCircle(particle) {
    const radius = particle.radius || this._defaultRadius;
    const color = particle.color || this._defaultColor;
    const hasStroke = !!this.stroke;
    
    // Create cache key based on properties
    const cacheKey = `circle_${radius}_${color}_${hasStroke ? 1 : 0}_${hasStroke ? (Types.isString(this.stroke) ? this.stroke : 0) : 0}`;
    
    // Check cache first
    if (this._graphicsCache.has(cacheKey)) {
      return this._graphicsCache.get(cacheKey).clone();
    }
    
    // Create new graphics
    const graphics = new PIXIClass.Graphics();
    
    if (this.isV8) {
      // Pixi.js v8 style
      if (hasStroke) {
        this._strokeColor = Types.isString(this.stroke) ? this.stroke : 0x000000;
        graphics
          .circle(0, 0, radius)
          .fill(color)
          .stroke({ width: 1, color: this._strokeColor });
      } else {
        graphics
          .circle(0, 0, radius)
          .fill(color);
      }
    } else {
      // Pixi.js v7 and earlier style
      if (hasStroke) {
        this._strokeColor = Types.isString(this.stroke) ? this.stroke : 0x000000;
        graphics.lineStyle(1, this._strokeColor);
      }
      
      graphics.beginFill(color);
      graphics.drawCircle(0, 0, radius);
      graphics.endFill();
    }
    
    // Cache the graphics
    this._graphicsCache.set(cacheKey, graphics.clone());
    
    return graphics;
  }

  /**
   * Clear texture and graphics caches
   */
  clearCaches() {
    this._textureCache.clear();
    this._graphicsCache.clear();
  }

  /**
   * Destroys the renderer and cleans up resources.
   * @param {Array<Particle>} particles - The particles to clean up.
   */
  destroy(particles) {
    // Cancel any pending updates
    this._updateScheduled = false;
    this._updateQueue.length = 0;
    
    // Clear all caches
    this.clearCaches();
    
    super.destroy();

    let i = particles.length;
    while (i--) {
      let particle = particles[i];
      if (particle.body) {
        this.element.removeChild(particle.body);
      }
    }
  }
}