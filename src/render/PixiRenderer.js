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
    this.pool.create = (body, particle) => this.createBody(body, particle);
    this.setPIXI(window.PIXI);

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
        options.maxSize || 10000,
        { ...defaultOptions, ...options },
        options.batchSize
      );
    }

    this.name = "PixiRenderer";
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

  onProtonUpdate() {}

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
    this.transform(particle, particle.body);

    if (this.setColor === true || this.color === true) {
      // In v8, tint is handled differently depending on object type
      if (this.isV8 && particle.body.tint !== undefined) {
        particle.body.tint = ColorUtil.getHex16FromParticle(particle);
      } else if (!this.isV8) {
        particle.body.tint = ColorUtil.getHex16FromParticle(particle);
      }
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

    // using cached version of MathUtil.PI_180 for slight performance increase.
    target.rotation = particle.rotation * MathUtil.PI_180;
  }

  createBody(body, particle) {
    if (body.isCircle) return this.createCircle(particle);
    else return this.createSprite(body);
  }

  createSprite(body) {
    const sprite = body.isInner ? this.createFromImage(body.src) : new PIXIClass.Sprite(body);

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    return sprite;
  }

  /**
   * Create a circle graphic
   * Updated for Pixi.js v8 compatibility
   * @param {object} particle - The particle to render
   * @returns {PIXI.Graphics} The graphics object
   */
  createCircle(particle) {
    const graphics = new PIXIClass.Graphics();
    const color = particle.color || 0x008ced;
    
    // Check if we're using Pixi.js v8
    if (this.isV8) {
      // Pixi.js v8 style
      if (this.stroke) {
        const strokeColor = Types.isString(this.stroke) ? this.stroke : 0x000000;
        graphics
          .circle(0, 0, particle.radius)
          .fill(color)
          .stroke({ width: 1, color: strokeColor });
      } else {
        graphics
          .circle(0, 0, particle.radius)
          .fill(color);
      }
    } else {
      // Pixi.js v7 and earlier style
      if (this.stroke) {
        const strokeColor = Types.isString(this.stroke) ? this.stroke : 0x000000;
        graphics.lineStyle(1, strokeColor);
      }
      
      graphics.beginFill(color);
      graphics.drawCircle(0, 0, particle.radius);
      graphics.endFill();
    }

    return graphics;
  }

  /**
   * Destroys the renderer and cleans up resources.
   * @param {Array<Particle>} particles - The particles to clean up.
   */
  destroy(particles) {
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