import Span from "../math/Span";
import ImgUtil from "./ImgUtil";

export default {
  /**
   * Returns the default if the value is null or undefined
   *
   * @memberof Proton#Proton.Util
   * @method initValue
   *
   * @param {Mixed} value a specific value, could be everything but null or undefined
   * @param {Mixed} defaults the default if the value is null or undefined
   */
  initValue(value, defaults) {
    value = value !== null && value !== undefined ? value : defaults;
    return value;
  },

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
  isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  },

  /**
   * Destroyes the given array
   *
   * @memberof Proton#Proton.Util
   * @method emptyArray
   *
   * @param {Array} array Any array
   */
  emptyArray(arr) {
    if (arr) arr.length = 0;
  },

  toArray(arr) {
    return this.isArray(arr) ? arr : [arr];
  },

  getRandFromArray(arr) {
    if (!arr) return null;
    return arr[Math.floor(arr.length * Math.random())];
  },

  /**
   * Destroyes the given object
   *
   * @memberof Proton#Proton.Util
   * @method emptyObject
   *
   * @param {Object} obj Any object
   */
  emptyObject(obj, ignore = null) {
    for (let key in obj) {
      if (ignore && ignore.indexOf(key) > -1) continue;
      delete obj[key];
    }
  },

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
  classApply(constructor, args = null) {
    if (!args) {
      return new constructor();
    } else {
      const FactoryFunc = constructor.bind.apply(
        constructor,
        [null].concat(args)
      );
      return new FactoryFunc();
    }
  },

  /**
   * @memberof Proton#Proton.Util
   * @method setVectorVal
   *
   * @todo add description for param `target`
   * @todo add description for param `conf`
   * @todo add description for function
   *
   * @param {Object} target
   * @param {Object} conf
   */
  setVectorVal(particle, conf = null) {
    if (!conf) return;

    if (this.hasProp(conf, "x")) particle.p.x = conf["x"];
    if (this.hasProp(conf, "y")) particle.p.y = conf["y"];

    if (this.hasProp(conf, "vx")) particle.v.x = conf["vx"];
    if (this.hasProp(conf, "vy")) particle.v.y = conf["vy"];

    if (this.hasProp(conf, "ax")) particle.a.x = conf["ax"];
    if (this.hasProp(conf, "ay")) particle.a.y = conf["ay"];

    if (this.hasProp(conf, "p")) particle.p.copy(conf["p"]);
    if (this.hasProp(conf, "v")) particle.v.copy(conf["v"]);
    if (this.hasProp(conf, "a")) particle.a.copy(conf["a"]);

    if (this.hasProp(conf, "position")) particle.p.copy(conf["position"]);
    if (this.hasProp(conf, "velocity")) particle.v.copy(conf["velocity"]);
    if (this.hasProp(conf, "accelerate")) particle.a.copy(conf["accelerate"]);
  },

  hasProp(target, key) {
    if (!target) return false;
    return target[key] !== undefined;
    // return obj.hasOwnProperty(key);
  },

  /**
   * set the prototype in a given prototypeObject
   *
   * @memberof Proton#Proton.Util
   * @method setProp
   *
   * @todo add description for param `target`
   * @todo translate desription from chinese to english
   *
   * @param {Object} target
   * @param {Object} prototypeObject An object of single prototypes
   *
   * @return {Object} target
   */
  setProp(target, props) {
    for (let prop in props) {
      if (target.hasOwnProperty(prop)) {
        target[prop] = Span.getSpanValue(props[prop]);
      }
    }

    return target;
  },

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
    return ImgUtil.getImageData(context, image, rect);
  },

  destroyAll(arr, param = null) {
    let i = arr.length;

    while (i--) {
      try {
        arr[i].destroy(param);
      } catch (e) {}

      delete arr[i];
    }

    arr.length = 0;
  },

  assign(target, source) {
    if (typeof Object.assign !== "function") {
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }

      return target;
    } else {
      return Object.assign(target, source);
    }
  }
};
