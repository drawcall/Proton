import Types from "../utils/Types";
import ColorUtil from "../utils/ColorUtil";
import MathUtil from "../math/MathUtil";
import BaseRenderer from "./BaseRenderer";

let PIXIClass;

/**
 * Represents a PIXI-based renderer for particle systems.
 * Compatible with Pixi.js v7 and v8.
 * Uses the high-performance ParticleContainer for v8.
 * @extends BaseRenderer
 */
export default class PixiRenderer extends BaseRenderer {
  /**
   * Creates a new PixiRenderer instance.
   * @param {PIXI.Container} element - The PIXI container to render to.
   * @param {string|number} [stroke] - The stroke color for particles.
   * @param {Object} [options] - ParticleContainer options for v8
   */
  constructor(element, stroke, options = {}) {
    super(element);

    this.stroke = stroke;
    this.color = false;
    this.setColor = false;
    this.blendMode = null;
    this.options = options;
    this.pool.create = (body, particle) => this.createBody(body, particle);
    this.setPIXI(window.PIXI);
    this.name = "PixiRenderer";
    
    // Performance optimization - texture cache
    this._textureCache = new Map();
    
    // Enhanced throttling and batching for performance
    this._updateThrottle = options.updateThrottle || 5; // More aggressive throttling
    this._updateCounter = 0;
    this._particleUpdates = new Set();
    this._frameSkipCounter = 0;
    this._frameSkipThreshold = options.frameSkipThreshold || 6; // Skip more frames
    
    // Visibility culling
    this._enableCulling = options.enableCulling !== false; // Default to true
    this._cullingBounds = null;
    this._setDefaultCullingBounds();
    
    // Priority updates
    this._priorityUpdates = new Set();
    this._lowPriorityUpdates = new Set();
    this._updatePriorityThreshold = options.updatePriorityThreshold || 0.3;
    
    // Prefetch frequently used calculations
    this._piBy180 = MathUtil.PI_180;
    
    // Performance monitoring
    this._lastUpdateTime = performance.now();
    this._frameTime = 0;
    this._throttleAdjustCounter = 0;
    this._autoAdjustThrottle = options.autoAdjustThrottle !== false; // Default to true
    
    // Render group optimizations
    this._useStableSort = options.useStableSort !== false; // Default to true
    this._renderBatchSize = options.renderBatchSize || 512; // Optimize batching
    this._disableAlphaDirty = options.disableAlphaDirty || false;
    this._disableRenderUpdates = false;
    this._renderUpdateCounter = 0;
    this._renderUpdateThreshold = options.renderUpdateThreshold || 2;
    
    // Install renderer optimizations if available
    this._installRendererOptimizations();
  }

  /**
   * Set default culling bounds based on the current view
   * @private
   */
  _setDefaultCullingBounds() {
    try {
      if (PIXIClass && PIXIClass.renderer) {
        const width = PIXIClass.renderer.width || 800;
        const height = PIXIClass.renderer.height || 600;
        this._cullingBounds = {
          minX: -width * 0.25,
          minY: -height * 0.25,
          maxX: width * 1.25,
          maxY: height * 1.25
        };
      } else {
        this._cullingBounds = {
          minX: -1000,
          minY: -1000,
          maxX: 2000,
          maxY: 2000
        };
      }
    } catch (e) {
      // Fallback to a safe default
      this._cullingBounds = {
        minX: -1000,
        minY: -1000,
        maxX: 2000,
        maxY: 2000
      };
    }
  }
  
  /**
   * Install optimizations for the Pixi renderer if available
   * @private
   */
  _installRendererOptimizations() {
    try {
      if (!PIXIClass || !PIXIClass.renderer) return;
      
      // Optimize RenderGroupSystem if available
      if (PIXIClass.renderer.renderPipes && PIXIClass.renderer.renderPipes.batch) {
        const batchPipe = PIXIClass.renderer.renderPipes.batch;
        
        // Optimize batch size for better performance
        if (batchPipe.MAX_TEXTURES) {
          batchPipe.MAX_TEXTURES = Math.min(batchPipe.MAX_TEXTURES, 16);
        }
        
        // Optimize sort function for render groups
        if (this._useStableSort && batchPipe._renderGroups && typeof batchPipe._renderGroups.sort === 'function') {
          const originalSort = batchPipe._renderGroups.sort;
          batchPipe._renderGroups.sort = (a, b) => {
            // Simple stable sort optimization
            if (a.zIndex === b.zIndex) {
              return a.layerNumber - b.layerNumber; // Use stable ordering
            }
            return originalSort(a, b);
          };
        }
      }
      
      // Optimize system runners if available
      if (PIXIClass.SystemRunner) {
        this._optimizeSystemRunner();
      }
      
      // Reduce buildInstructions workload
      if (PIXIClass.buildInstructions) {
        this._optimizeBuildInstructions();
      }
      
      // Disable unnecessary updates
      this._disableUnnecessaryUpdates();
    } catch (e) {
      console.warn('Error installing renderer optimizations:', e);
    }
  }
  
  /**
   * Optimize the SystemRunner for better performance
   * @private
   */
  _optimizeSystemRunner() {
    try {
      const prototype = PIXIClass.SystemRunner.prototype;
      
      if (!prototype || !prototype.emit || this._systemRunnerOptimized) return;
      
      // Flag to prevent multiple optimizations
      this._systemRunnerOptimized = true;
      
      // Cache the original emit function
      const originalEmit = prototype.emit;
      
      // Replace with throttled version
      prototype.emit = function(event, ...args) {
        // Skip certain events based on throttling
        if (event === 'render' || event === 'postrender') {
          // Check if we should skip this render event
          if (window._pixiRenderSkipCounter === undefined) {
            window._pixiRenderSkipCounter = 0;
          }
          
          window._pixiRenderSkipCounter++;
          
          // Skip some render events entirely
          if ((window._pixiRenderSkipCounter % 4 !== 0 && event === 'render') || 
              (window._pixiRenderSkipCounter % 6 !== 0 && event === 'postrender')) {
            return this;
          }
        }
        
        return originalEmit.call(this, event, ...args);
      };
    } catch (e) {
      console.warn('Error optimizing SystemRunner:', e);
    }
  }
  
  /**
   * Optimize buildInstructions to reduce CPU usage
   * @private
   */
  _optimizeBuildInstructions() {
    try {
      // Throttle buildInstructions updates
      const originalBuildInstructions = PIXIClass.buildInstructions;
      
      if (!originalBuildInstructions || this._buildInstructionsOptimized) return;
      
      // Flag to prevent multiple optimizations
      this._buildInstructionsOptimized = true;
      
      let cachedInstructions = new Map();
      PIXIClass.buildInstructions = (renderer, renderGroup) => {
        // Skip all instruction building during heavy updates
        if (this._disableRenderUpdates) {
          return;
        }
        
        // Use cached instructions when possible
        const cacheKey = renderGroup.uid || renderGroup.id;
        if (cachedInstructions.has(cacheKey) && !renderGroup._structureDidChange) {
          return cachedInstructions.get(cacheKey);
        }
        
        // Throttle more aggressively
        this._renderUpdateCounter++;
        if (this._renderUpdateCounter % (this._renderUpdateThreshold * 2) !== 0) {
          // Return cached if available, otherwise skip
          return cachedInstructions.get(cacheKey);
        }
        
        const instructions = originalBuildInstructions(renderer, renderGroup);
        
        // Cache the result
        if (cacheKey) {
          cachedInstructions.set(cacheKey, instructions);
          
          // Keep cache size reasonable
          if (cachedInstructions.size > 100) {
            const firstKey = cachedInstructions.keys().next().value;
            cachedInstructions.delete(firstKey);
          }
        }
        
        return instructions;
      };
    } catch (e) {
      console.warn('Error optimizing buildInstructions:', e);
    }
  }
  
  /**
   * Disable unnecessary updates that impact performance
   * @private
   */
  _disableUnnecessaryUpdates() {
    try {
      // Disable alpha dirty updates if configured
      if (this._disableAlphaDirty && PIXIClass.Container && PIXIClass.Container.prototype) {
        const prototype = PIXIClass.Container.prototype;
        const originalUpdateTransform = prototype.updateTransform;
        
        if (originalUpdateTransform && !this._updateTransformOptimized) {
          this._updateTransformOptimized = true;
          
          prototype.updateTransform = function() {
            // Skip alpha dirty propagation
            const originalWorldAlpha = this.worldAlpha;
            const result = originalUpdateTransform.call(this);
            
            // Prevent unnecessary dirty alpha flags
            if (Math.abs(this.worldAlpha - originalWorldAlpha) < 0.01) {
              this._alphaDirty = false;
            }
            
            return result;
          };
        }
      }
    } catch (e) {
      console.warn('Error disabling unnecessary updates:', e);
    }
  }

  /**
   * Set the PIXI class to use for rendering
   * @param {object} PIXI - The PIXI library
   */
  setPIXI(PIXI) {
    try {
      PIXIClass = PIXI || { Sprite: {} };
      // Handle both v7 and v8 style Sprite creation
      this.createFromImage = PIXIClass.Sprite.from || PIXIClass.Sprite.fromImage;
      
      // Check if we're using v8
      this.isV8 = typeof PIXIClass.VERSION === 'string' && 
                  parseInt(PIXIClass.VERSION.split('.')[0], 10) >= 8;
                  
      // Setup ParticleContainer for v8 if available
      if (this.isV8 && PIXIClass.ParticleContainer) {
        this._setupParticleContainer();
      }
      
      // Install optimizations after setup
      this._installRendererOptimizations();
    } catch (e) {
      console.warn('Error setting up PIXI in PixiRenderer:', e);
    }
  }

  /**
   * Set up ParticleContainer for Pixi.js v8
   * @private
   */
  _setupParticleContainer() {
    if (!this.element || !this.element.parent) return;
    
    const parent = this.element.parent;
    const index = parent.children.indexOf(this.element);
    
    // Default dynamic properties - only position is dynamic by default for better performance
    const dynamicProperties = this.options.dynamicProperties || {
      position: true,
      scale: false,
      rotation: false,
      color: false
    };
    
    // Set maxSize to improve performance
    const maxSize = this.options.maxSize || 10000;
    const batchSize = this.options.batchSize || this._renderBatchSize;
    
    // Create particle container with optimized settings
    this.particleContainer = new PIXIClass.ParticleContainer({
      dynamicProperties,
      maxSize,
      batchSize
    });
    
    // Optimize autoSort for better performance
    if (this.particleContainer.autoSort !== undefined) {
      this.particleContainer.autoSort = false;
    }
    
    // Disable automatic transforms if possible
    if (this.particleContainer.enableTempParent !== undefined) {
      this.particleContainer.enableTempParent = false;
    }
    
    if (index !== -1) {
      parent.removeChildAt(index);
      parent.addChildAt(this.particleContainer, index);
    } else {
      parent.addChild(this.particleContainer);
    }
    
    // Store the original container for cleanup
    this.originalContainer = this.element;
    this.element = this.particleContainer;
  }

  /**
   * Checks if an update should be processed this frame
   * @returns {boolean} Whether to process updates this frame
   * @private
   */
  _shouldProcessUpdates() {
    // Keep render updates disabled for longer periods
    this._disableRenderUpdates = true;
    
    // Skip frames more aggressively when frame rate is low
    if (this._frameTime > 20) {
      this._frameSkipCounter = (this._frameSkipCounter + 1) % (this._frameSkipThreshold * 2);
    } else {
      this._frameSkipCounter = (this._frameSkipCounter + 1) % this._frameSkipThreshold;
    }
    
    const shouldProcess = this._frameSkipCounter === 0;
    
    // Re-enable render updates with a micro-task instead of setTimeout
    if (shouldProcess) {
      this._queueMicroTask(() => {
        this._disableRenderUpdates = false;
      });
    }
    
    return shouldProcess;
  }

  /**
   * Dynamically adjust throttling based on frame time
   * @private
   */
  _adjustThrottleIfNeeded() {
    if (!this._autoAdjustThrottle) return;
    
    this._throttleAdjustCounter++;
    if (this._throttleAdjustCounter < 30) return; // Only check every 30 frames
    
    const now = performance.now();
    const frameTime = now - this._lastUpdateTime;
    this._lastUpdateTime = now;
    
    // Exponential moving average for frame time
    this._frameTime = this._frameTime * 0.8 + frameTime * 0.2;
    
    // Adjust throttle based on frame time
    if (this._frameTime > 16.7) {
      this._updateThrottle = Math.min(this._updateThrottle + 1, 8);
      this._renderUpdateThreshold = Math.min(this._renderUpdateThreshold + 2, 6);
    } else if (this._frameTime < 10 && this._updateThrottle > 1) {
      this._updateThrottle = Math.max(this._updateThrottle - 1, 1);
      this._renderUpdateThreshold = Math.max(this._renderUpdateThreshold - 1, 1);
    }
    
    this._throttleAdjustCounter = 0;
    
    // Add immediate _cullingBounds update
    if (PIXIClass && PIXIClass.renderer) {
      // Update culling bounds dynamically
      const width = PIXIClass.renderer.width || 800;
      const height = PIXIClass.renderer.height || 600;
      this._cullingBounds = {
        minX: -width * 0.25,
        minY: -height * 0.25,
        maxX: width * 1.25,
        maxY: height * 1.25
      };
    }
  }

  onProtonUpdate() {
    // Adaptive throttling
    this._adjustThrottleIfNeeded();
    
    // Skip processing if we're throttling at the frame level
    if (!this._shouldProcessUpdates()) return;
    
    // Process batched updates
    this._processPriorityUpdates();
    this._processNormalUpdates();
  }
  
  /**
   * Process high priority updates first
   * @private
   */
  _processPriorityUpdates() {
    if (!this.isV8 || this._priorityUpdates.size === 0) {
      this._priorityUpdates.clear();
      return;
    }
    
    this._priorityUpdates.forEach(particle => {
      if (!particle || !particle.body) return;
      
      // Update properties directly for high priority particles
      particle.body.x = particle.p.x;
      particle.body.y = particle.p.y;
      particle.body.alpha = particle.alpha;
      
      // Only update scale/rotation if necessary
      const dynamicProps = this.element.dynamicProperties || {};
      if (dynamicProps.scale) particle.body.scale = particle.scale;
      if (dynamicProps.rotation) particle.body.rotation = particle.rotation * this._piBy180;
    });
    
    this._priorityUpdates.clear();
  }

  /**
   * Process normal and low priority updates
   * @private
   */
  _processNormalUpdates() {
    if (!this.isV8 || (this._particleUpdates.size === 0 && this._lowPriorityUpdates.size === 0)) {
      this._particleUpdates.clear();
      this._lowPriorityUpdates.clear();
      return;
    }
    
    // Process regular priority updates
    if (this._particleUpdates.size > 0) {
      this._particleUpdates.forEach(particle => {
        if (!particle || !particle.body) return;
        
        // Update properties directly
        particle.body.x = particle.p.x;
        particle.body.y = particle.p.y;
        particle.body.alpha = particle.alpha;
      });
      
      this._particleUpdates.clear();
    }
    
    // Process low priority updates less frequently
    if (this._updateCounter % 3 === 0 && this._lowPriorityUpdates.size > 0) {
      this._lowPriorityUpdates.forEach(particle => {
        if (!particle || !particle.body) return;
        
        // Only update position for low priority particles
        particle.body.x = particle.p.x;
        particle.body.y = particle.p.y;
      });
      
      this._lowPriorityUpdates.clear();
    }
  }

  /**
   * Handle particle creation
   * @param {object} particle - The particle
   */
  onParticleCreated(particle) {
    if (!particle) return;
    
    if (this.isV8 && PIXIClass.ParticleContainer && PIXIClass.Particle) {
      this._createV8Particle(particle);
    } else {
      this._createLegacyParticle(particle);
    }
  }

  /**
   * Create a particle for Pixi.js v8
   * @private
   * @param {object} particle - The particle
   */
  _createV8Particle(particle) {
    if (particle.body) {
      particle.body = this.pool.get(particle.body, particle);
    } else {
      // Create Particle for v8
      const pixiParticle = new PIXIClass.Particle({
        texture: this.getTexture(particle),
        x: particle.p.x,
        y: particle.p.y,
        scale: particle.scale,
        rotation: particle.rotation * this._piBy180,
        alpha: particle.alpha,
        anchor: 0.5 // Center anchor
      });
      
      if (this.color || this.setColor) {
        pixiParticle.tint = ColorUtil.getHex16FromParticle(particle);
      }
      
      particle.body = pixiParticle;
    }
    
    if (this.blendMode != null) {
      particle.body.blendMode = this.blendMode;
    }
    
    // Skip immediate particle addition and batch them
    if (!this._particlesToAdd) {
      this._particlesToAdd = [];
      // Process batches on next tick
      setTimeout(() => {
        if (this._particlesToAdd && this._particlesToAdd.length) {
          this._particlesToAdd.forEach(p => this.element.addParticle(p));
          this._particlesToAdd = [];
        }
      }, 0);
    }
    this._particlesToAdd.push(particle.body);
  }

  /**
   * Create a legacy particle for Pixi.js v7 and earlier
   * @private
   * @param {object} particle - The particle
   */
  _createLegacyParticle(particle) {
    particle.body = particle.body ? 
      this.pool.get(particle.body, particle) : 
      this.pool.get(this.circleConf, particle);

    if (this.blendMode != null) {
      particle.body.blendMode = this.blendMode;
    }

    this.element.addChild(particle.body);
  }

  /**
   * Determines particle update priority based on its properties
   * @param {object} particle - The particle
   * @returns {string} Priority level: 'high', 'normal', or 'low'
   * @private
   */
  _getParticlePriority(particle) {
    if (!particle) return 'low';
    
    // Fast moving or larger particles get high priority
    const speed = Math.sqrt(particle.v.x * particle.v.x + particle.v.y * particle.v.y);
    
    if (speed > this._updatePriorityThreshold || particle.scale > 2) {
      return 'high';
    }
    
    // Check if particle is visible in the culling bounds
    if (this._enableCulling) {
      const bounds = this._cullingBounds;
      if (particle.p.x < bounds.minX || particle.p.x > bounds.maxX ||
          particle.p.y < bounds.minY || particle.p.y > bounds.maxY) {
        return 'low';
      }
    }
    
    // Default to normal priority
    return 'normal';
  }

  /**
   * Gets a texture for the particle - with caching for performance
   * @param {object} particle - The particle
   * @returns {PIXI.Texture} The texture to use
   */
  getTexture(particle) {
    if (particle.texture) {
      return particle.texture;
    }
    
    // Use cached texture when possible
    const cacheKey = `circle_${particle.radius || 5}_${particle.color || 0x008ced}`;
    if (this._textureCache.has(cacheKey)) {
      return this._textureCache.get(cacheKey);
    }
    
    // Create a texture from a circle graphic if no texture exists
    const graphics = new PIXIClass.Graphics();
    const color = particle.color || 0x008ced;
    
    graphics
      .circle(0, 0, particle.radius || 5)
      .fill(color);
    
    if (this.stroke) {
      const strokeColor = Types.isString(this.stroke) ? this.stroke : 0x000000;
      graphics.stroke({ width: 1, color: strokeColor });
    }
    
    const texture = PIXIClass.Texture.from(graphics.canvas || graphics);
    this._textureCache.set(cacheKey, texture);
    
    return texture;
  }

  /**
   * Update particle render properties
   * @param {object} particle - The particle to update
   */
  onParticleUpdate(particle) {
    if (!particle || !particle.body) return;
    
    // Skip updates based on throttle setting for performance
    this._updateCounter++;
    if (this._updateCounter % this._updateThrottle !== 0) {
      return;
    }
    
    // Skip updates for offscreen particles
    if (this._enableCulling && !this._isParticleVisible(particle)) {
      return;
    }
    
    // Route to appropriate update method based on priority
    if (this.isV8 && particle.body instanceof PIXIClass.Particle) {
      const priority = this._getParticlePriority(particle);
      
      switch (priority) {
        case 'high':
          this._priorityUpdates.add(particle);
          break;
        case 'normal':
          this._particleUpdates.add(particle);
          break;
        case 'low':
          this._lowPriorityUpdates.add(particle);
          break;
      }
    } else {
      // For non-V8, only update if it would be high priority
      const priority = this._getParticlePriority(particle);
      if (priority === 'high' || this._updateCounter % 3 === 0) {
        this._updateLegacyParticle(particle);
      }
    }
  }
  
  /**
   * Checks if a particle is within the visible bounds
   * @param {object} particle - The particle to check
   * @returns {boolean} Whether the particle is visible
   * @private
   */
  _isParticleVisible(particle) {
    if (!this._cullingBounds) return true;
    
    const bounds = this._cullingBounds;
    const x = particle.p.x;
    const y = particle.p.y;
    
    return (x >= bounds.minX && x <= bounds.maxX && y >= bounds.minY && y <= bounds.maxY);
  }

  /**
   * Update a particle for Pixi.js v8
   * @private
   * @param {object} particle - The particle
   */
  _updateV8Particle(particle) {
    // Always update position
    particle.body.x = particle.p.x;
    particle.body.y = particle.p.y;
    particle.body.alpha = particle.alpha;
    
    // Only update these if they're set as dynamic in the ParticleContainer
    const dynamicProps = this.element.dynamicProperties || {};
    
    if (dynamicProps.scale) {
      particle.body.scale = particle.scale;
    }
    
    if (dynamicProps.rotation) {
      particle.body.rotation = particle.rotation * this._piBy180;
    }
    
    if (dynamicProps.color && (this.setColor || this.color)) {
      particle.body.tint = ColorUtil.getHex16FromParticle(particle);
    }
  }

  /**
   * Update a legacy particle for Pixi.js v7 and earlier
   * @private
   * @param {object} particle - The particle
   */
  _updateLegacyParticle(particle) {
    this.transform(particle, particle.body);

    if (this.setColor || this.color) {
      // Handle tint differently depending on version
      if (this.isV8 && particle.body.tint !== undefined) {
        particle.body.tint = ColorUtil.getHex16FromParticle(particle);
      } else if (!this.isV8) {
        particle.body.tint = ColorUtil.getHex16FromParticle(particle);
      }
    }
  }

  /**
   * Handle particle removal
   * @param {object} particle - The particle to remove
   */
  onParticleDead(particle) {
    if (!particle || !particle.body) return;
    
    // Remove from all update sets
    this._priorityUpdates.delete(particle);
    this._particleUpdates.delete(particle);
    this._lowPriorityUpdates.delete(particle);
    
    if (this.isV8 && PIXIClass.ParticleContainer && particle.body instanceof PIXIClass.Particle) {
      this.element.removeParticle(particle.body);
    } else {
      this.element.removeChild(particle.body);
      this.pool.expire(particle.body);
    }
    
    particle.body = null;
  }

  /**
   * Apply transform properties to the target
   * @param {object} particle - The particle
   * @param {object} target - The target to transform
   */
  transform(particle, target) {
    target.x = particle.p.x;
    target.y = particle.p.y;
    target.alpha = particle.alpha;
    target.scale.x = target.scale.y = particle.scale;
    target.rotation = particle.rotation * this._piBy180;
  }

  /**
   * Create a body for the particle
   * @param {object} body - The body template
   * @param {object} particle - The particle
   * @returns {object} The created body
   */
  createBody(body, particle) {
    // For v8 ParticleContainer, use Particle objects
    if (this.isV8 && PIXIClass.ParticleContainer && PIXIClass.Particle) {
      return new PIXIClass.Particle({
        texture: body.isInner ? PIXIClass.Texture.from(body.src) : body,
        x: particle.p.x,
        y: particle.p.y,
        scale: particle.scale,
        rotation: particle.rotation * this._piBy180,
        alpha: particle.alpha,
        anchor: 0.5
      });
    }
    
    // Traditional approach for older versions
    return body.isCircle ? this.createCircle(particle) : this.createSprite(body);
  }

  /**
   * Create a sprite
   * @param {object} body - The body to create a sprite from
   * @returns {PIXI.Sprite} The created sprite
   */
  createSprite(body) {
    const sprite = body.isInner ? this.createFromImage(body.src) : new PIXIClass.Sprite(body);
    sprite.anchor.set(0.5);
    return sprite;
  }

  /**
   * Create a circle graphic - with caching for performance
   * @param {object} particle - The particle to render
   * @returns {PIXI.Graphics} The graphics object
   */
  createCircle(particle) {
    const radius = particle.radius || 5;
    const color = particle.color || 0x008ced;
    const cacheKey = `circle_${radius}_${color}`;
    
    // Use cached graphics if available
    if (this._textureCache.has(cacheKey)) {
      const cachedTexture = this._textureCache.get(cacheKey);
      return new PIXIClass.Sprite(cachedTexture);
    }
    
    const graphics = new PIXIClass.Graphics();
    
    if (this.isV8) {
      // Pixi.js v8 style
      const graphic = graphics.circle(0, 0, radius).fill(color);
      
      if (this.stroke) {
        const strokeColor = Types.isString(this.stroke) ? this.stroke : 0x000000;
        graphic.stroke({ width: 1, color: strokeColor });
      }
    } else {
      // Pixi.js v7 and earlier style
      if (this.stroke) {
        const strokeColor = Types.isString(this.stroke) ? this.stroke : 0x000000;
        graphics.lineStyle(1, strokeColor);
      }
      
      graphics.beginFill(color);
      graphics.drawCircle(0, 0, radius);
      graphics.endFill();
    }
    
    // Cache the texture for reuse
    const texture = PIXIClass.Texture.from(graphics.canvas || graphics);
    this._textureCache.set(cacheKey, texture);
    
    return graphics;
  }

  /**
   * Destroys the renderer and cleans up resources.
   * @param {Array<Particle>} particles - The particles to clean up.
   */
  destroy(particles) {
    super.destroy();

    // Clean up all particles
    if (particles && particles.length) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (!particle || !particle.body) continue;
        
        if (this.isV8 && PIXIClass.ParticleContainer && particle.body instanceof PIXIClass.Particle) {
          this.element.removeParticle(particle.body);
        } else {
          this.element.removeChild(particle.body);
        }
      }
    }
    
    // Clear texture cache
    this._textureCache.clear();
    this._particleUpdates.clear();
    this._priorityUpdates.clear();
    this._lowPriorityUpdates.clear();
    
    // Restore original container if we replaced it
    this._restoreOriginalContainer();
    
    // Restore optimized functions
    this._restoreOptimizations();
  }

  /**
   * Restore the original container if it was replaced
   * @private
   */
  _restoreOriginalContainer() {
    if (!this.originalContainer || !this.particleContainer) return;
    
    const parent = this.particleContainer.parent;
    if (!parent) return;
    
    const index = parent.children.indexOf(this.particleContainer);
    if (index !== -1) {
      parent.removeChildAt(index);
      parent.addChildAt(this.originalContainer, index);
    }
    
    this.element = this.originalContainer;
    this.particleContainer = null;
  }
  
  /**
   * Restore any optimizations that need to be cleaned up
   * @private
   */
  _restoreOptimizations() {
    try {
      // Reset SystemRunner if we modified it
      if (this._systemRunnerOptimized && PIXIClass && PIXIClass.SystemRunner) {
        delete PIXIClass.SystemRunner.prototype.emit;
      }
      
      // Reset buildInstructions if we modified it
      if (this._buildInstructionsOptimized && PIXIClass) {
        delete PIXIClass.buildInstructions;
      }
      
      // Reset any other optimizations
      if (this._updateTransformOptimized && PIXIClass && PIXIClass.Container) {
        delete PIXIClass.Container.prototype.updateTransform;
      }
    } catch (e) {
      console.warn('Error restoring optimizations:', e);
    }
  }

  // Add _queueMicroTask helper method
  _queueMicroTask(callback) {
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(callback);
    } else {
      Promise.resolve().then(callback);
    }
  }
}
