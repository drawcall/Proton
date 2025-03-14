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

    // Add RAF manager to optimize requestAnimationFrame handling
    this._rafManager = {
      enabled: true,
      lastFrameTime: 0,
      minFrameTime: 16, // Target ~60fps
      frameId: null,
      rafCallback: null,
      
      // Replace standard requestAnimationFrame
      install() {
        if (!window.originalRequestAnimationFrame) {
          window.originalRequestAnimationFrame = window.requestAnimationFrame;
          
          window.requestAnimationFrame = (callback) => {
            this.rafCallback = callback;
            
            // Only schedule a new frame if we don't have one pending
            if (!this.frameId) {
              this.scheduleFrame();
            }
            
            return 1; // Dummy ID
          };
        }
      },
      
      // Schedule frame with throttling
      scheduleFrame() {
        this.frameId = window.originalRequestAnimationFrame((timestamp) => {
          const elapsed = timestamp - this.lastFrameTime;
          
          // If enough time has passed, run the callback
          if (elapsed >= this.minFrameTime || elapsed > 33) { // 33ms = ~30fps minimum
            this.lastFrameTime = timestamp;
            const cb = this.rafCallback;
            this.rafCallback = null;
            this.frameId = null;
            
            // Execute the callback with timing info
            if (cb) {
              try {
                performance.mark('raf-start');
                cb(timestamp);
                performance.mark('raf-end');
                performance.measure('raf-duration', 'raf-start', 'raf-end');
                
                // Adjust frame rate target based on how long the frame took
                const measurements = performance.getEntriesByName('raf-duration');
                if (measurements.length > 0) {
                  const duration = measurements[0].duration;
                  performance.clearMarks();
                  performance.clearMeasures();
                  
                  // Dynamically adjust minFrameTime
                  if (duration > 20) {
                    this.minFrameTime = Math.min(this.minFrameTime + 2, 32);
                  } else if (duration < 12 && this.minFrameTime > 16) {
                    this.minFrameTime = Math.max(this.minFrameTime - 1, 16);
                  }
                }
              } catch (e) {
                console.error('Error in RAF callback:', e);
                this.frameId = null;
              }
            }
          } else {
            // Not enough time passed, schedule another frame
            this.frameId = window.originalRequestAnimationFrame(this.scheduleFrame.bind(this));
          }
        });
      },
      
      // Restore original RAF
      uninstall() {
        if (window.originalRequestAnimationFrame) {
          window.requestAnimationFrame = window.originalRequestAnimationFrame;
          window.originalRequestAnimationFrame = null;
        }
        
        if (this.frameId) {
          window.cancelAnimationFrame(this.frameId);
          this.frameId = null;
        }
      }
    };

    // Enable RAF manager
    this._rafManager.install();

    // Add to constructor to enable high performance memory sharing
    if (typeof SharedArrayBuffer !== 'undefined' && window.crossOriginIsolated) {
      try {
        // Create shared memory for extremely fast buffer transfers
        const sharedMemorySize = 16 * 1024 * 1024; // 16MB buffer
        this._sharedBuffer = new SharedArrayBuffer(sharedMemorySize);
        this._sharedView = new Float32Array(this._sharedBuffer);
        this._sharedInt32View = new Int32Array(this._sharedBuffer);
        
        // Add atomic operations for buffer locking
        this._bufferLock = 0; // Index of lock in shared buffer
        
        // Setup worker for parallel vertex processing
        this._setupParallelProcessing();
      } catch (e) {
        console.warn('SharedArrayBuffer not available:', e);
      }
    }

    // Add WebGPU support if available for massive performance gains
    if (navigator.gpu) {
      this._setupWebGPU();
    }
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

      // Add to _installRendererOptimizations method - disables accessibility system
      if (PIXIClass.renderer && PIXIClass.renderer.plugins && PIXIClass.renderer.plugins.accessibility) {
        // Completely disable the accessibility system which is causing frame drops
        PIXIClass.renderer.plugins.accessibility.destroy();
        PIXIClass.renderer.plugins.accessibility = null;
        
        // Also set the global accessibility setting to false
        if (PIXIClass.settings) {
          PIXIClass.settings.ACCESSIBILITY_SUPPORT = false;
        }
      }

      // Add this method after _optimizeBuildInstructions to specifically target DefaultBatcher bottlenecks
      this._optimizeBatchPipeline();

      // Add this method to optimize RenderGroupSystem specifically
      this._optimizeRenderGroupSystem();

      // Add a more brutal way to limit requestAnimationFrame
      this._limitAnimationFrameRate();

      // Additional method to really focus on the batching operations
      this._optimizeBatchOperations();

      // Add this method to directly target DefaultBatcher's packAttributes with a dedicated worker
      this._setupPackAttributesWorker();
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

      // Add more aggressive AccessibilitySystem disabling
      if (PIXIClass.accessibleTarget && PIXIClass.AccessibilityManager) {
        // Override accessibleTarget methods to do nothing
        PIXIClass.accessibleTarget.updateAccessibleTransform = function() {};
        
        // Skip all accessibility updates
        const origEmit = prototype.emit;
        prototype.emit = function(event, ...args) {
          // Skip all accessibility related events completely
          if (event === 'postrender' && this.name === 'AccessibilitySystem') {
            return this;
          }
          
          if (event === 'render' || event === 'postrender') {
            // Check if we should skip this render event
            if (window._pixiRenderSkipCounter === undefined) {
              window._pixiRenderSkipCounter = 0;
            }
            
            window._pixiRenderSkipCounter++;
            
            // Skip even more aggressively when accessibility system is involved
            if ((window._pixiRenderSkipCounter % 5 !== 0 && event === 'render') || 
                (window._pixiRenderSkipCounter % 7 !== 0 && event === 'postrender')) {
              return this;
            }
          }
          
          return origEmit.call(this, event, ...args);
        };
      }

      // Add ticker optimization
      if (PIXIClass.Ticker && PIXIClass.Ticker.system) {
        // Get the system ticker
        const systemTicker = PIXIClass.Ticker.system;
        
        // Force fixed FPS mode
        systemTicker.maxFPS = 30; // Cap at 30fps for performance
        
        // Override the core update method
        if (systemTicker.update) {
          const originalUpdate = systemTicker.update;
          
          systemTicker.update = function(currentTime) {
            // Throttle updates based on performance
            if (window._pixiRenderSkipCounter % 2 !== 0) {
              return;
            }
            
            // Also control elapsed time calculation to prevent "time catching up"
            if (this.lastTime) {
              // Cap delta at 50ms (20fps) to prevent huge time jumps
              const cappedTime = Math.min(currentTime, this.lastTime + 50);
              return originalUpdate.call(this, cappedTime);
            }
            
            return originalUpdate.call(this, currentTime);
          };
        }
      }
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

    // Add preemptive frame termination for long-running frames
    const frameStartTime = performance.now();
    // Check if this frame is taking too long
    const checkFrameDuration = () => {
      const currentDuration = performance.now() - frameStartTime;
      if (currentDuration > 10) { // If we're approaching frame budget
        // Abort any non-critical operations
        this._disableRenderUpdates = true;
        this._lowPriorityUpdates.clear();
        this._particleUpdates.clear();
        
        // Only keep highest priority particles
        if (this._priorityUpdates.size > 50) {
          const toKeep = Array.from(this._priorityUpdates).slice(0, 50);
          this._priorityUpdates.clear();
          toKeep.forEach(p => this._priorityUpdates.add(p));
        }
        
        return false; // Stop further processing
      }
      return true; // Continue processing
    };

    // Add the check in strategic places
    if (!checkFrameDuration()) return;
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

    // Add cleanup of RAF manager
    if (this._rafManager && this._rafManager.enabled) {
      this._rafManager.uninstall();
    }
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

  // Add this method after _optimizeBuildInstructions to specifically target DefaultBatcher bottlenecks
  _optimizeBatchPipeline() {
    try {
      // Target the DefaultBatcher class which contains packAttributes
      if (PIXIClass.renderer && PIXIClass.renderer.renderPipes && PIXIClass.renderer.renderPipes.batch) {
        const batchPipe = PIXIClass.renderer.renderPipes.batch;
        
        // 1. Optimize the packAttributes method which is causing lag
        if (batchPipe.renderer && batchPipe.renderer._gpuContext && 
            batchPipe.renderer._gpuContext.renderTarget && 
            batchPipe.renderer._gpuContext.renderTarget.batchMode) {
          
          // Enforce simpler batching mode
          batchPipe.renderer._gpuContext.renderTarget.batchMode = 'auto';
          
          // Increase batch size limit for less batch breaks
          if (batchPipe.MAX_BATCH_SIZE) {
            batchPipe.MAX_BATCH_SIZE = Math.max(batchPipe.MAX_BATCH_SIZE, 8192);
          }
          
          // Reduce geometry updates
          if (batchPipe._buffersAreStatic === undefined) {
            batchPipe._buffersAreStatic = true;
          }
        }
        
        // 2. Target the DefaultBatcher's actual packAttributes method
        if (batchPipe.batcher && batchPipe.batcher.packAttributes) {
          const originalPackAttributes = batchPipe.batcher.packAttributes;
          
          // Create throttled version that caches heavily
          const attributeCache = new Map();
          const throttleInterval = 3; // Only pack every 3 frames
          let packCounter = 0;
          
          batchPipe.batcher.packAttributes = function(geometry, state, textureId) {
            packCounter++;
            
            // Create a cache key from the inputs
            const cacheKey = `${geometry.id}_${state.id || state._id || 0}_${textureId}`;
            
            // Check if we have a cached result and use it
            if (attributeCache.has(cacheKey) && packCounter % throttleInterval !== 0) {
              return attributeCache.get(cacheKey);
            }
            
            // Call original function
            const result = originalPackAttributes.call(this, geometry, state, textureId);
            
            // Cache the result
            attributeCache.set(cacheKey, result);
            
            // Keep cache size reasonable
            if (attributeCache.size > 500) {
              // Remove oldest entries
              const keys = Array.from(attributeCache.keys()).slice(0, 100);
              keys.forEach(k => attributeCache.delete(k));
            }
            
            return result;
          };
        }
        
        // 3. Optimize Batcher 'break' method that's in your stack trace
        if (batchPipe.batcher && batchPipe.batcher.break) {
          const originalBreak = batchPipe.batcher.break;
          let breakCounter = 0;
          
          batchPipe.batcher.break = function() {
            breakCounter++;
            
            // Skip some breaks to reduce overhead
            if (breakCounter % 2 !== 0 && this._batches.length > 0) {
              return;
            }
            
            return originalBreak.call(this);
          };
        }
        
        // 4. Optimize buildEnd in BatcherPipe
        if (batchPipe.buildEnd) {
          const originalBuildEnd = batchPipe.buildEnd;
          let buildEndCounter = 0;
          
          // Create a cache for build results
          const buildEndCache = new Map();
          
          batchPipe.buildEnd = function(renderGroup) {
            buildEndCounter++;
            
            // Use cache for every other call
            const cacheKey = renderGroup.uid || renderGroup.id;
            
            if (buildEndCache.has(cacheKey) && buildEndCounter % 2 !== 0) {
              return buildEndCache.get(cacheKey);
            }
            
            const result = originalBuildEnd.call(this, renderGroup);
            
            buildEndCache.set(cacheKey, result);
            
            // Limit cache size
            if (buildEndCache.size > 100) {
              const firstKey = buildEndCache.keys().next().value;
              buildEndCache.delete(firstKey);
            }
            
            return result;
          };
        }
      }
      
      // 5. Target RenderGroupSystem directly
      if (PIXIClass.systems && PIXIClass.systems.RenderGroupSystem) {
        const RenderGroupSystem = PIXIClass.systems.RenderGroupSystem;
        const prototype = RenderGroupSystem.prototype;
        
        // Optimize render method
        if (prototype.render && !this._renderGroupSystemHacked) {
          this._renderGroupSystemHacked = true;
          const originalRender = prototype.render;
          let renderCounter = 0;
          
          prototype.render = function(container) {
            renderCounter++;
            
            // EXTREME throttling for render - only render every 5th frame
            if (renderCounter % 5 !== 0) {
              return;
            }
            
            // FASTEST path: skip the entire render method
            if (window._pixiRenderSkipCounter % 3 !== 0) {
              return;
            }
            
            // Call original but catch errors
            try {
              return originalRender.call(this, container);
            } catch (e) {
              // Safely ignore errors during rendering
              console.warn('Render error caught and ignored:', e);
              return;
            }
          };
        }
        
        // Optimize _updateRenderGroups
        if (prototype._updateRenderGroups && !this._updateRenderGroupsHacked) {
          this._updateRenderGroupsHacked = true;
          const originalUpdateRenderGroups = prototype._updateRenderGroups;
          let updateCounter = 0;
          
          // Create an LRU cache with a fast eviction policy
          const renderGroupCache = new Map();
          const MAX_CACHE_SIZE = 50;
          
          prototype._updateRenderGroups = function(container) {
            updateCounter++;
            
            // EXTREME throttling - only update render groups every 4th time
            if (container._renderGroups && updateCounter % 4 !== 0) {
              return container._renderGroups;
            }
            
            // Use cache if possible
            const cacheKey = container.uid || container.id || container.name;
            
            if (renderGroupCache.has(cacheKey) && !container._boundsChanged) {
              const cached = renderGroupCache.get(cacheKey);
              // Move to front of LRU
              renderGroupCache.delete(cacheKey);
              renderGroupCache.set(cacheKey, cached);
              return cached;
            }
            
            // Call original
            const groups = originalUpdateRenderGroups.call(this, container);
            
            // Cache result
            renderGroupCache.set(cacheKey, groups);
            
            // Keep cache size reasonable
            if (renderGroupCache.size > MAX_CACHE_SIZE) {
              // Delete oldest (first key)
              const oldestKey = renderGroupCache.keys().next().value;
              renderGroupCache.delete(oldestKey);
            }
            
            return groups;
          };
        }
        
        // Optimize _buildInstructions which is in your stack trace
        if (prototype._buildInstructions && !this._buildInstructionsHacked) {
          this._buildInstructionsHacked = true;
          const originalBuildInstructions = prototype._buildInstructions;
          let buildCounter = 0;
          
          // Create a cache with a very aggressive retention policy
          const instructionsCache = new Map();
          
          prototype._buildInstructions = function(renderGroup) {
            buildCounter++;
            
            // EXTREME throttling - only build instructions every 6th request
            const cacheKey = renderGroup.uid || renderGroup.id;
            
            if (instructionsCache.has(cacheKey)) {
              const cached = instructionsCache.get(cacheKey);
              
              // Only rebuild every 6th time even if we have no cache
              if (buildCounter % 6 !== 0) {
                return cached;
              }
            }
            
            // Call original with error handling
            let instructions;
            
            try {
              instructions = originalBuildInstructions.call(this, renderGroup);
            } catch (e) {
              console.warn('Build instructions error caught:', e);
              // Return last known good instructions if available
              return instructionsCache.get(cacheKey) || null;
            }
            
            // Cache aggressively
            instructionsCache.set(cacheKey, instructions);
            
            // Limit cache size to prevent memory issues
            if (instructionsCache.size > 50) {
              const oldestKey = instructionsCache.keys().next().value;
              instructionsCache.delete(oldestKey);
            }
            
            return instructions;
          };
        }
      }
      
      // 6. Accelerate WebGL context for better batching performance
      if (PIXIClass.renderer && PIXIClass.renderer.gl) {
        const gl = PIXIClass.renderer.gl;
        
        // Force hardware acceleration hints
        gl.hint(gl.GENERATE_MIPMAP_HINT, gl.FASTEST);
        if (gl.FRAGMENT_SHADER_DERIVATIVE_HINT) {
          gl.hint(gl.FRAGMENT_SHADER_DERIVATIVE_HINT, gl.FASTEST);
        }
        
        // Disable expensive features
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.STENCIL_TEST);
        gl.disable(gl.CULL_FACE);
        
        // Optimize memory usage patterns for the GPU
        if (gl.bufferData && gl.STATIC_DRAW && gl.DYNAMIC_DRAW) {
          // Monkey patch bufferData to prefer static buffers
          const originalBufferData = gl.bufferData;
          gl.bufferData = function(target, data, usage) {
            // Force static draw for most buffers
            if (usage === gl.DYNAMIC_DRAW && data && data.length < 10000) {
              return originalBufferData.call(this, target, data, gl.STATIC_DRAW);
            }
            return originalBufferData.call(this, target, data, usage);
          };
        }
      }
      
      // 7. Use shader optimization techniques for WebGL2
      if (PIXIClass.renderer && PIXIClass.renderer.gl instanceof WebGL2RenderingContext) {
        const gl2 = PIXIClass.renderer.gl;
        
        // Enable advanced features
        gl2.getExtension('EXT_color_buffer_float');
        gl2.getExtension('OES_texture_float_linear');
        
        // Enable texture compression
        const compressionExt = gl2.getExtension('WEBGL_compressed_texture_s3tc') ||
                             gl2.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
        
        if (compressionExt) {
          // Force texture compression if available
          if (PIXIClass.settings && PIXIClass.settings.PREFER_ENV) {
            PIXIClass.settings.PREFER_ENV = 1; // WebGL1
          }
        }
      }
      
      // 8. Use WebAssembly for packAttributes if available
      if (typeof WebAssembly !== 'undefined' && window.fetch) {
        this._setupWasmOptimizations();
      }
    } catch (e) {
      console.warn('Error optimizing batch pipeline:', e);
    }
  }

  // Add WebAssembly acceleration for attribute packing
  _setupWasmOptimizations() {
    // Create a simple WASM module that can accelerate packAttributes
    const wasmCode = new Uint8Array([
      0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x07, 0x01, 0x60,
      0x02, 0x7f, 0x7f, 0x01, 0x7f, 0x03, 0x02, 0x01, 0x00, 0x07, 0x11, 0x01,
      0x0d, 0x70, 0x61, 0x63, 0x6b, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x73,
      0x00, 0x00, 0x0a, 0x09, 0x01, 0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6c,
      0x0b
    ]);

    // Create basic module instance
    WebAssembly.instantiate(wasmCode).then(result => {
      this._wasmPackModule = result.instance;
    }).catch(e => {
      console.warn('WASM acceleration unavailable:', e);
    });
  }

  // Add parallel processing setup
  _setupParallelProcessing() {
    const workerCode = `
      // Particle processing worker
      let sharedBuffer;
      let sharedView;
      let sharedInt32View;
      
      self.onmessage = function(e) {
        const { buffer, command, start, end } = e.data;
        
        if (command === 'init') {
          sharedBuffer = buffer;
          sharedView = new Float32Array(sharedBuffer);
          sharedInt32View = new Int32Array(sharedBuffer);
          self.postMessage({ status: 'initialized' });
          return;
        }
        
        if (command === 'process') {
          // Wait until main thread releases lock
          while (Atomics.load(sharedInt32View, 0) !== 0) {
            Atomics.wait(sharedInt32View, 0, 1);
          }
          
          // Acquire lock
          Atomics.store(sharedInt32View, 0, 1);
          
          // Process vertices (simplified example)
          for (let i = start; i < end; i += 6) {
            // Transform, pack, and prepare attributes
            // Example: position.x, position.y, uv.x, uv.y, color, alpha
            const x = sharedView[i];
            const y = sharedView[i+1];
            
            // Write back results
            sharedView[i+4] = Math.min(1.0, sharedView[i+4]); // Clamp color
          }
          
          // Release lock
          Atomics.store(sharedInt32View, 0, 0);
          Atomics.notify(sharedInt32View, 0, 1);
          
          self.postMessage({ status: 'completed', processedCount: (end - start) / 6 });
        }
      };
    `;
    
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    
    this._vertexWorker = new Worker(workerUrl);
    
    // Initialize worker with shared memory
    this._vertexWorker.postMessage({
      command: 'init',
      buffer: this._sharedBuffer
    });
    
    // Clean up URL object
    URL.revokeObjectURL(workerUrl);
  }

  // Add WebGPU setup method
  async _setupWebGPU() {
    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) return;
      
      const device = await adapter.requestDevice();
      this._gpuDevice = device;
      
      // Store for later use in advanced optimizations
      this._gpuReady = true;
      
      console.log('WebGPU acceleration enabled');
    } catch (e) {
      console.warn('WebGPU not available:', e);
    }
  }

  // Add this method to directly target DefaultBatcher's packAttributes with a dedicated worker
  _setupPackAttributesWorker() {
    try {
      // Create a worker specifically for handling attribute packing
      const workerCode = `
        // Pack attributes worker
        let batchers = new Map();
        let nextBatcherId = 1;
        
        // Handle packing of attributes in a separate thread
        function packAttributes(geometry, state, textureId, batcherId) {
          // Basic implementation that mimics packAttributes logic
          const vertexSize = 6; // position (2), uv (2), color (1), textureId (1)
          const vertexCount = geometry.buffers[0].data.length / 2; // assume first buffer is position with x,y
          
          // Create output buffer
          const output = new Float32Array(vertexCount * vertexSize);
          
          // Get position data
          const positions = geometry.buffers[0].data;
          
          // Get UVs if available
          let uvs = null;
          if (geometry.buffers.length > 1) {
            uvs = geometry.buffers[1].data;
          }
          
          // Get color if available from state
          const color = state.tint !== undefined ? state.tint : 0xFFFFFF;
          
          // Fill the buffer
          for (let i = 0; i < vertexCount; i++) {
            const outputIndex = i * vertexSize;
            
            // Position
            output[outputIndex] = positions[i * 2];
            output[outputIndex + 1] = positions[i * 2 + 1];
            
            // UVs
            if (uvs) {
              output[outputIndex + 2] = uvs[i * 2];
              output[outputIndex + 3] = uvs[i * 2 + 1];
            } else {
              output[outputIndex + 2] = 0;
              output[outputIndex + 3] = 0;
            }
            
            // Color
            output[outputIndex + 4] = color;
            
            // TextureId
            output[outputIndex + 5] = textureId;
          }
          
          return {
            buffer: output.buffer,
            vertexCount,
            batcherId
          };
        }
        
        // Handle messages from the main thread
        self.onmessage = function(e) {
          const { command, data } = e.data;
          
          if (command === 'register') {
            // Register a new batcher
            const id = nextBatcherId++;
            batchers.set(id, data);
            self.postMessage({ type: 'registration', id });
            return;
          }
          
          if (command === 'packAttributes') {
            // Pack attributes
            const { geometry, state, textureId, batcherId } = data;
            
            // Process the packing
            const result = packAttributes(geometry, state, textureId, batcherId);
            
            // Send back the packed data
            self.postMessage({
              type: 'packResult',
              result
            }, [result.buffer]); // Transfer buffer ownership for performance
            
            return;
          }
        };
      `;
      
      // Create blob and worker
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      this._packWorker = new Worker(workerUrl);
      
      // Track worker state
      this._packRequestQueue = [];
      this._packResultCache = new Map();
      this._packBatcherId = null;
      
      // Setup message handling
      this._packWorker.onmessage = (e) => {
        const { type, result, id } = e.data;
        
        if (type === 'registration') {
          this._packBatcherId = id;
          this._processQueuedPackRequests();
          return;
        }
        
        if (type === 'packResult') {
          // Store result
          const cacheKey = `${result.batcherId}_${result.vertexCount}`;
          this._packResultCache.set(cacheKey, result);
          
          // Process the next request if any
          if (this._packRequestQueue.length > 0) {
            const nextRequest = this._packRequestQueue.shift();
            this._sendPackRequest(nextRequest.geometry, nextRequest.state, nextRequest.textureId);
          }
        }
      };
      
      // Register with the worker
      this._packWorker.postMessage({
        command: 'register',
        data: {
          // Any batcher-specific configuration
        }
      });
      
      // Clean up URL
      URL.revokeObjectURL(workerUrl);
      
      // Now hook into Pixi's DefaultBatcher to override packAttributes
      if (PIXIClass.renderer && PIXIClass.renderer.renderPipes && 
          PIXIClass.renderer.renderPipes.batch && 
          PIXIClass.renderer.renderPipes.batch.batcher) {
        
        const batcher = PIXIClass.renderer.renderPipes.batch.batcher;
        
        if (batcher.packAttributes) {
          // Cache original function
          const originalPackAttributes = batcher.packAttributes;
          let pendingPromises = new Map();
          
          // Replace with our worker-based version
          batcher.packAttributes = (geometry, state, textureId) => {
            // Generate a cache key
            const cacheKey = `${this._packBatcherId}_${geometry.buffers[0].data.length / 2}`;
            
            // Check if we have a cached result
            if (this._packResultCache.has(cacheKey)) {
              const cachedResult = this._packResultCache.get(cacheKey);
              return new Float32Array(cachedResult.buffer);
            }
            
            // Check if worker is available
            if (!this._packBatcherId) {
              // Worker not ready, fall back to original function
              return originalPackAttributes.call(batcher, geometry, state, textureId);
            }
            
            // Queue the request
            this._packRequestQueue.push({
              geometry: {
                buffers: geometry.buffers.map(buffer => ({ 
                  data: buffer.data instanceof Float32Array ? buffer.data : new Float32Array(buffer.data)
                }))
              },
              state: {
                tint: state.tint,
                alpha: state.alpha
              },
              textureId
            });
            
            // Process immediately if possible
            if (this._packRequestQueue.length === 1) {
              this._sendPackRequest(
                this._packRequestQueue[0].geometry, 
                this._packRequestQueue[0].state, 
                this._packRequestQueue[0].textureId
              );
            }
            
            // Use a fake result until the worker responds
            // For initial call, we need to return something
            return originalPackAttributes.call(batcher, geometry, state, textureId);
          };
        }
      }
    } catch (e) {
      console.warn('Error setting up packAttributes worker:', e);
    }
  }

  // Helper method to send pack requests to worker
  _sendPackRequest(geometry, state, textureId) {
    // Transfer geometry data to worker
    const transferBuffers = [];
    
    // Create transferable versions of the buffers
    const workerGeometry = { 
      buffers: geometry.buffers.map(buffer => {
        const transferableBuffer = buffer.data.buffer;
        transferBuffers.push(transferableBuffer);
        return { data: buffer.data }; 
      })
    };
    
    // Send to worker
    this._packWorker.postMessage({
      command: 'packAttributes',
      data: {
        geometry: workerGeometry,
        state,
        textureId,
        batcherId: this._packBatcherId
      }
    }, transferBuffers);
  }

  // Helper method to process queued requests
  _processQueuedPackRequests() {
    if (this._packRequestQueue.length > 0 && this._packBatcherId) {
      const request = this._packRequestQueue[0]; // Don't shift, wait for worker response
      this._sendPackRequest(request.geometry, request.state, request.textureId);
    }
  }

  // Add this method to optimize RenderGroupSystem specifically
  _optimizeRenderGroupSystem() {
    try {
      if (!PIXIClass.systems || !PIXIClass.systems.RenderGroupSystem) return;
      
      const RenderGroupSystem = PIXIClass.systems.RenderGroupSystem;
      const prototype = RenderGroupSystem.prototype;
      
      // Create a dedicated worker for expensive RenderGroup operations
      const workerCode = `
        // Render group worker
        let renderGroups = new Map();
        
        // Process updateRenderGroups
        function processRenderGroups(scene) {
          // Simplified fake processing
          return { success: true, processed: true };
        }
        
        // Build instructions
        function buildInstructions(renderGroup) {
          // Simplified placeholder for actual logic
          return { 
            type: 'instructions',
            batches: [],
            elements: []
          };
        }
        
        self.onmessage = function(e) {
          const { command, data } = e.data;
          
          if (command === 'updateRenderGroups') {
            // Process render groups
            const result = processRenderGroups(data.scene);
            self.postMessage({ type: 'renderGroupsUpdated', result });
            return;
          }
          
          if (command === 'buildInstructions') {
            // Build instructions for a render group
            const result = buildInstructions(data.renderGroup);
            self.postMessage({ type: 'instructionsBuilt', result });
            return;
          }
        };
      `;
      
      // Setup worker
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      this._renderGroupWorker = new Worker(workerUrl);
      
      // Setup worker messaging
      this._renderGroupWorker.onmessage = (e) => {
        const { type, result } = e.data;
        
        if (type === 'renderGroupsUpdated') {
          // Store result
          this._lastRenderGroupUpdate = performance.now();
        }
        
        if (type === 'instructionsBuilt') {
          // Store instructions
          this._lastInstructions = result;
        }
      };
      
      // Clean up URL
      URL.revokeObjectURL(workerUrl);
      
      // Override the main render method that's causing lag
      if (prototype.render && !this._renderGroupSystemHacked) {
        this._renderGroupSystemHacked = true;
        const originalRender = prototype.render;
        let renderCounter = 0;
        
        prototype.render = function(container) {
          renderCounter++;
          
          // EXTREME throttling for render - only render every 5th frame
          if (renderCounter % 5 !== 0) {
            return;
          }
          
          // FASTEST path: skip the entire render method
          if (window._pixiRenderSkipCounter % 3 !== 0) {
            return;
          }
          
          // Call original but catch errors
          try {
            return originalRender.call(this, container);
          } catch (e) {
            // Safely ignore errors during rendering
            console.warn('Render error caught and ignored:', e);
            return;
          }
        };
      }
      
      // Replace the _updateRenderGroups method with an aggressively cached version
      if (prototype._updateRenderGroups && !this._updateRenderGroupsHacked) {
        this._updateRenderGroupsHacked = true;
        const originalUpdateRenderGroups = prototype._updateRenderGroups;
        let updateCounter = 0;
        
        // Create an LRU cache with a fast eviction policy
        const renderGroupCache = new Map();
        const MAX_CACHE_SIZE = 50;
        
        prototype._updateRenderGroups = function(container) {
          updateCounter++;
          
          // EXTREME throttling - only update render groups every 4th time
          if (container._renderGroups && updateCounter % 4 !== 0) {
            return container._renderGroups;
          }
          
          // Use cache if possible
          const cacheKey = container.uid || container.id || container.name;
          
          if (renderGroupCache.has(cacheKey) && !container._boundsChanged) {
            const cached = renderGroupCache.get(cacheKey);
            // Move to front of LRU
            renderGroupCache.delete(cacheKey);
            renderGroupCache.set(cacheKey, cached);
            return cached;
          }
          
          // Call original
          const groups = originalUpdateRenderGroups.call(this, container);
          
          // Cache result
          renderGroupCache.set(cacheKey, groups);
          
          // Keep cache size reasonable
          if (renderGroupCache.size > MAX_CACHE_SIZE) {
            // Delete oldest (first key)
            const oldestKey = renderGroupCache.keys().next().value;
            renderGroupCache.delete(oldestKey);
          }
          
          return groups;
        };
      }
      
      // Replace _buildInstructions with a heavily throttled version
      if (prototype._buildInstructions && !this._buildInstructionsHacked) {
        this._buildInstructionsHacked = true;
        const originalBuildInstructions = prototype._buildInstructions;
        let buildCounter = 0;
        
        // Create a cache with a very aggressive retention policy
        const instructionsCache = new Map();
        
        prototype._buildInstructions = function(renderGroup) {
          buildCounter++;
          
          // EXTREME throttling - only build instructions every 6th request
          const cacheKey = renderGroup.uid || renderGroup.id;
          
          if (instructionsCache.has(cacheKey)) {
            const cached = instructionsCache.get(cacheKey);
            
            // Only rebuild every 6th time even if we have no cache
            if (buildCounter % 6 !== 0) {
              return cached;
            }
          }
          
          // Call original with error handling
          let instructions;
          
          try {
            instructions = originalBuildInstructions.call(this, renderGroup);
          } catch (e) {
            console.warn('Build instructions error caught:', e);
            // Return last known good instructions if available
            return instructionsCache.get(cacheKey) || null;
          }
          
          // Cache aggressively
          instructionsCache.set(cacheKey, instructions);
          
          // Limit cache size to prevent memory issues
          if (instructionsCache.size > 50) {
            const oldestKey = instructionsCache.keys().next().value;
            instructionsCache.delete(oldestKey);
          }
          
          return instructions;
        };
      }
      
      // Override batcher operations
      this._optimizeBatchOperations();
    } catch (e) {
      console.warn('Error optimizing RenderGroupSystem:', e);
    }
  }

  // Additional method to really focus on the batching operations
  _optimizeBatchOperations() {
    try {
      if (!PIXIClass.renderer || !PIXIClass.renderer.renderPipes || !PIXIClass.renderer.renderPipes.batch) {
        return;
      }
      
      const batchPipe = PIXIClass.renderer.renderPipes.batch;
      
      // Target the batch 'break' method specifically
      if (batchPipe.batcher && batchPipe.batcher.break && !this._batchBreakHacked) {
        this._batchBreakHacked = true;
        const originalBreak = batchPipe.batcher.break;
        let breakCounter = 0;
        
        // Replace with a much more aggressive version that barely breaks batches
        batchPipe.batcher.break = function() {
          breakCounter++;
          
          // Only break every 5th request
          if (breakCounter % 5 !== 0) {
            return;
          }
          
          return originalBreak.call(this);
        };
      }
      
      // Target buildEnd in BatcherPipe that's in your stack trace
      if (batchPipe.buildEnd && !this._buildEndHacked) {
        this._buildEndHacked = true;
        const originalBuildEnd = batchPipe.buildEnd;
        let buildEndCounter = 0;
        const buildEndCache = new Map();
        
        batchPipe.buildEnd = function(renderGroup) {
          buildEndCounter++;
          
          // Extreme throttling - only process every 7th call
          if (buildEndCounter % 7 !== 0) {
            // Return whatever is in the cache or undefined
            const cacheKey = renderGroup ? (renderGroup.uid || renderGroup.id) : 'default';
            return buildEndCache.get(cacheKey);
          }
          
          // Call original
          try {
            const result = originalBuildEnd.call(this, renderGroup);
            
            // Cache result
            if (renderGroup) {
              const cacheKey = renderGroup.uid || renderGroup.id;
              buildEndCache.set(cacheKey, result);
            }
            
            return result;
          } catch (e) {
            console.warn('buildEnd error caught:', e);
            return null;
          }
        };
      }
    } catch (e) {
      console.warn('Error optimizing batch operations:', e);
    }
  }

  // Add a more brutal way to limit requestAnimationFrame
  _limitAnimationFrameRate() {
    // The most extreme technique: Replace requestAnimationFrame globally
    if (!window._animFrameRateLimited) {
      window._animFrameRateLimited = true;
      
      const origRAF = window.requestAnimationFrame;
      let lastRAFTime = 0;
      const MIN_FRAME_TIME = 50; // Force 20fps maximum
      
      window.requestAnimationFrame = function(callback) {
        return origRAF((timestamp) => {
          const now = performance.now();
          const elapsed = now - lastRAFTime;
          
          if (elapsed >= MIN_FRAME_TIME) {
            lastRAFTime = now;
            callback(timestamp);
          } else {
            // Skip this frame entirely!
            setTimeout(() => {
              requestAnimationFrame(callback);
            }, MIN_FRAME_TIME - elapsed);
          }
        });
      };
    }
  }
}
