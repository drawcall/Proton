import Types from "../utils/Types";
import ImgUtil from "../utils/ImgUtil";
import ColorUtil from "../utils/ColorUtil";
import MathUtil from "../math/MathUtil";
import BaseRenderer from "./BaseRenderer";

/**
 * CanvasRenderer class for rendering particles on a canvas element.
 * @extends BaseRenderer
 */
export default class CanvasRenderer extends BaseRenderer {
  /**
   * @type {object|null}
   * @private
   */
  stroke;

  /**
   * @type {CanvasRenderingContext2D}
   * @private
   */
  context;

  /**
   * @type {object}
   * @private
   */
  bufferCache;

  /**
   * @type {string}
   */
  name;

  /**
   * Creates a new CanvasRenderer instance.
   * @param {HTMLCanvasElement} element - The canvas element to render on.
   */
  constructor(element) {
    super(element);

    this.stroke = null;
    this.context = this.element.getContext("2d");
    this.bufferCache = {};
    this.name = "CanvasRenderer";
  }

  /**
   * Resizes the canvas element.
   * @param {number} width - The new width of the canvas.
   * @param {number} height - The new height of the canvas.
   */
  resize(width, height) {
    this.element.width = width;
    this.element.height = height;
  }

  /**
   * Clears the canvas on Proton update.
   */
  onProtonUpdate() {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  }

  /**
   * Handles particle creation.
   * @param {object} particle - The created particle.
   */
  onParticleCreated(particle) {
    if (particle.body) {
      ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
    } else {
      particle.color = particle.color || "#ff0000";
    }
  }

  /**
   * Handles particle updates.
   * @param {object} particle - The updated particle.
   */
  onParticleUpdate(particle) {
    if (particle.body) {
      if (Types.isImage(particle.body)) {
        this.drawImage(particle);
      }
    } else {
      this.drawCircle(particle);
    }
  }

  /**
   * Handles particle destruction.
   * @param {object} particle - The destroyed particle.
   */
  onParticleDead(particle) {
    particle.body = null;
  }

  /**
   * Adds an image to the particle body.
   * @param {HTMLImageElement} img - The image to add.
   * @param {object} particle - The particle to add the image to.
   * @private
   */
  addImg2Body(img, particle) {
    particle.body = img;
  }

  /**
   * Draws an image particle.
   * @param {object} particle - The particle to draw.
   * @private
   */
  drawImage(particle) {
    const w = (particle.body.width * particle.scale) | 0;
    const h = (particle.body.height * particle.scale) | 0;
    const x = particle.p.x - w / 2;
    const y = particle.p.y - h / 2;

    if (!!particle.color) {
      if (!particle.data["buffer"]) particle.data.buffer = this.createBuffer(particle.body);

      const bufContext = particle.data.buffer.getContext("2d");
      bufContext.clearRect(0, 0, particle.data.buffer.width, particle.data.buffer.height);
      bufContext.globalAlpha = particle.alpha;
      bufContext.drawImage(particle.body, 0, 0);

      bufContext.globalCompositeOperation = "source-atop";
      bufContext.fillStyle = ColorUtil.rgbToHex(particle.rgb);
      bufContext.fillRect(0, 0, particle.data.buffer.width, particle.data.buffer.height);
      bufContext.globalCompositeOperation = "source-over";
      bufContext.globalAlpha = 1;

      this.context.drawImage(
        particle.data.buffer,
        0,
        0,
        particle.data.buffer.width,
        particle.data.buffer.height,
        x,
        y,
        w,
        h
      );
    } else {
      this.context.save();

      this.context.globalAlpha = particle.alpha;
      this.context.translate(particle.p.x, particle.p.y);
      this.context.rotate(MathUtil.degreeTransform(particle.rotation));
      this.context.translate(-particle.p.x, -particle.p.y);
      this.context.drawImage(particle.body, 0, 0, particle.body.width, particle.body.height, x, y, w, h);

      this.context.globalAlpha = 1;
      this.context.restore();
    }
  }

  /**
   * Draws a circular particle.
   * @param {object} particle - The particle to draw.
   * @private
   */
  drawCircle(particle) {
    if (particle.rgb) {
      this.context.fillStyle = `rgba(${particle.rgb.r},${particle.rgb.g},${particle.rgb.b},${particle.alpha})`;
    } else {
      this.context.fillStyle = particle.color;
    }

    this.context.beginPath();
    this.context.arc(particle.p.x, particle.p.y, particle.radius, 0, Math.PI * 2, true);

    if (this.stroke) {
      this.context.strokeStyle = this.stroke.color;
      this.context.lineWidth = this.stroke.thinkness;
      this.context.stroke();
    }

    this.context.closePath();
    this.context.fill();
  }

  /**
   * Creates a buffer for image particles.
   * @param {HTMLImageElement} image - The image to create a buffer for.
   * @returns {HTMLCanvasElement|undefined} The created buffer canvas.
   * @private
   */
  createBuffer(image) {
    if (Types.isImage(image)) {
      const size = image.width + "_" + image.height;
      let canvas = this.bufferCache[size];

      if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        this.bufferCache[size] = canvas;
      }

      return canvas;
    }
  }

  /**
   * Destroys the renderer and cleans up resources.
   */
  destroy() {
    super.destroy();
    this.stroke = null;
    this.context = null;
    this.bufferCache = null;
  }
}
