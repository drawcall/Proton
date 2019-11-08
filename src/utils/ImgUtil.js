import WebGLUtil from "./WebGLUtil";
import DomUtil from "./DomUtil";

const imgsCache = {};
const canvasCache = {};
let canvasId = 0;

export default {
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
  getImageData(context, image, rect) {
    context.drawImage(image, rect.x, rect.y);
    const imagedata = context.getImageData(
      rect.x,
      rect.y,
      rect.width,
      rect.height
    );
    context.clearRect(rect.x, rect.y, rect.width, rect.height);

    return imagedata;
  },

  /**
   * @memberof Proton#Proton.Util
   * @method getImgFromCache
   *
   * @todo add description
   * @todo describe func
   *
   * @param {Mixed}               img
   * @param {Proton.Particle}     particle
   * @param {Boolean}             drawCanvas  set to true if a canvas should be saved into particle.data.canvas
   * @param {Boolean}             func
   */
  getImgFromCache(img, callback, param) {
    const src = typeof img === "string" ? img : img.src;

    if (imgsCache[src]) {
      callback(imgsCache[src], param);
    } else {
      const image = new Image();
      image.onload = e => {
        imgsCache[src] = e.target;
        callback(imgsCache[src], param);
      };

      image.src = src;
    }
  },

  getCanvasFromCache(img, callback, param) {
    const src = img.src;

    if (!canvasCache[src]) {
      const width = WebGLUtil.nhpot(img.width);
      const height = WebGLUtil.nhpot(img.height);

      const canvas = DomUtil.createCanvas(
        `proton_canvas_cache_${++canvasId}`,
        width,
        height
      );
      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, img.width, img.height);

      canvasCache[src] = canvas;
    }

    callback && callback(canvasCache[src], param);

    return canvasCache[src];
  }
};
