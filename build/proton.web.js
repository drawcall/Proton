this.Proton = (function () {
  'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  var WebGLUtil = {
    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method ipot
     *
     * @todo add description
     * @todo add length description
     *
     * @param {Number} length
     *
     * @return {Boolean}
     */
    ipot: function ipot(length) {
      return (length & length - 1) === 0;
    },
    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method nhpot
     *
     * @todo add description
     * @todo add length description
     *
     * @param {Number} length
     *
     * @return {Number}
     */
    nhpot: function nhpot(length) {
      --length;
      for (var i = 1; i < 32; i <<= 1) {
        length = length | length >> i;
      }
      return length + 1;
    },
    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method makeTranslation
     *
     * @todo add description
     * @todo add tx, ty description
     * @todo add return description
     *
     * @param {Number} tx either 0 or 1
     * @param {Number} ty either 0 or 1
     *
     * @return {Object}
     */
    makeTranslation: function makeTranslation(tx, ty) {
      return [1, 0, 0, 0, 1, 0, tx, ty, 1];
    },
    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method makeRotation
     *
     * @todo add description
     * @todo add return description
     *
     * @param {Number} angleInRadians
     *
     * @return {Object}
     */
    makeRotation: function makeRotation(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
      return [c, -s, 0, s, c, 0, 0, 0, 1];
    },
    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method makeScale
     *
     * @todo add description
     * @todo add tx, ty description
     * @todo add return description
     *
     * @param {Number} sx either 0 or 1
     * @param {Number} sy either 0 or 1
     *
     * @return {Object}
     */
    makeScale: function makeScale(sx, sy) {
      return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
    },
    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method matrixMultiply
     *
     * @todo add description
     * @todo add a, b description
     * @todo add return description
     *
     * @param {Object} a
     * @param {Object} b
     *
     * @return {Object}
     */
    matrixMultiply: function matrixMultiply(a, b) {
      var a00 = a[0 * 3 + 0];
      var a01 = a[0 * 3 + 1];
      var a02 = a[0 * 3 + 2];
      var a10 = a[1 * 3 + 0];
      var a11 = a[1 * 3 + 1];
      var a12 = a[1 * 3 + 2];
      var a20 = a[2 * 3 + 0];
      var a21 = a[2 * 3 + 1];
      var a22 = a[2 * 3 + 2];
      var b00 = b[0 * 3 + 0];
      var b01 = b[0 * 3 + 1];
      var b02 = b[0 * 3 + 2];
      var b10 = b[1 * 3 + 0];
      var b11 = b[1 * 3 + 1];
      var b12 = b[1 * 3 + 2];
      var b20 = b[2 * 3 + 0];
      var b21 = b[2 * 3 + 1];
      var b22 = b[2 * 3 + 2];
      return [a00 * b00 + a01 * b10 + a02 * b20, a00 * b01 + a01 * b11 + a02 * b21, a00 * b02 + a01 * b12 + a02 * b22, a10 * b00 + a11 * b10 + a12 * b20, a10 * b01 + a11 * b11 + a12 * b21, a10 * b02 + a11 * b12 + a12 * b22, a20 * b00 + a21 * b10 + a22 * b20, a20 * b01 + a21 * b11 + a22 * b21, a20 * b02 + a21 * b12 + a22 * b22];
    }
  };

  var DomUtil = {
    /**
     * Creates and returns a new canvas. The opacity is by default set to 0
     *
     * @memberof Proton#Proton.DomUtil
     * @method createCanvas
     *
     * @param {String} $id the canvas' id
     * @param {Number} $width the canvas' width
     * @param {Number} $height the canvas' height
     * @param {String} [$position=absolute] the canvas' position, default is 'absolute'
     *
     * @return {Object}
     */
    createCanvas: function createCanvas(id, width, height, position) {
      if (position === void 0) {
        position = "absolute";
      }
      var dom = document.createElement("canvas");
      dom.id = id;
      dom.width = width;
      dom.height = height;
      dom.style.opacity = 0;
      dom.style.position = position;
      this.transform(dom, -500, -500, 0, 0);
      return dom;
    },
    createDiv: function createDiv(id, width, height) {
      var dom = document.createElement("div");
      dom.id = id;
      dom.style.position = "absolute";
      this.resize(dom, width, height);
      return dom;
    },
    resize: function resize(dom, width, height) {
      dom.style.width = width + "px";
      dom.style.height = height + "px";
      dom.style.marginLeft = -width / 2 + "px";
      dom.style.marginTop = -height / 2 + "px";
    },
    /**
     * Adds a transform: translate(), scale(), rotate() to a given div dom for all browsers
     *
     * @memberof Proton#Proton.DomUtil
     * @method transform
     *
     * @param {HTMLDivElement} div
     * @param {Number} $x
     * @param {Number} $y
     * @param {Number} $scale
     * @param {Number} $rotate
     */
    transform: function transform(div, x, y, scale, rotate) {
      div.style.willChange = "transform";
      var transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ") rotate(" + rotate + "deg)";
      this.css3(div, "transform", transform);
    },
    transform3d: function transform3d(div, x, y, scale, rotate) {
      div.style.willChange = "transform";
      var transform = "translate3d(" + x + "px, " + y + "px, 0) scale(" + scale + ") rotate(" + rotate + "deg)";
      this.css3(div, "backfaceVisibility", "hidden");
      this.css3(div, "transform", transform);
    },
    css3: function css3(div, key, val) {
      var bkey = key.charAt(0).toUpperCase() + key.substr(1);
      div.style["Webkit" + bkey] = val;
      div.style["Moz" + bkey] = val;
      div.style["O" + bkey] = val;
      div.style["ms" + bkey] = val;
      div.style["" + key] = val;
    }
  };

  var imgsCache = {};
  var canvasCache = {};
  var canvasId = 0;
  var ImgUtil = {
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
    getImageData: function getImageData(context, image, rect) {
      context.drawImage(image, rect.x, rect.y);
      var imagedata = context.getImageData(rect.x, rect.y, rect.width, rect.height);
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
    getImgFromCache: function getImgFromCache(img, callback, param) {
      var src = typeof img === "string" ? img : img.src;
      if (imgsCache[src]) {
        callback(imgsCache[src], param);
      } else {
        var image = new Image();
        image.onload = function (e) {
          imgsCache[src] = e.target;
          callback(imgsCache[src], param);
        };
        image.src = src;
      }
    },
    getCanvasFromCache: function getCanvasFromCache(img, callback, param) {
      var src = img.src;
      if (!canvasCache[src]) {
        var width = WebGLUtil.nhpot(img.width);
        var height = WebGLUtil.nhpot(img.height);
        var canvas = DomUtil.createCanvas("proton_canvas_cache_" + ++canvasId, width, height);
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width, img.height);
        canvasCache[src] = canvas;
      }
      callback && callback(canvasCache[src], param);
      return canvasCache[src];
    }
  };

  var Util = {
    /**
     * Returns the default if the value is null or undefined
     *
     * @memberof Proton#Proton.Util
     * @method initValue
     *
     * @param {Mixed} value a specific value, could be everything but null or undefined
     * @param {Mixed} defaults the default if the value is null or undefined
     */
    initValue: function initValue(value, defaults) {
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
    isArray: function isArray(value) {
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
    emptyArray: function emptyArray(arr) {
      if (arr) arr.length = 0;
    },
    toArray: function toArray(arr) {
      return this.isArray(arr) ? arr : [arr];
    },
    sliceArray: function sliceArray(arr1, index, arr2) {
      this.emptyArray(arr2);
      for (var i = index; i < arr1.length; i++) {
        arr2.push(arr1[i]);
      }
    },
    getRandFromArray: function getRandFromArray(arr) {
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
    emptyObject: function emptyObject(obj, ignore) {
      if (ignore === void 0) {
        ignore = null;
      }
      for (var key in obj) {
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
    classApply: function classApply(constructor, args) {
      if (args === void 0) {
        args = null;
      }
      if (!args) {
        return new constructor();
      } else {
        var FactoryFunc = constructor.bind.apply(constructor, [null].concat(args));
        return new FactoryFunc();
      }
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
    getImageData: function getImageData(context, image, rect) {
      return ImgUtil.getImageData(context, image, rect);
    },
    destroyAll: function destroyAll(arr, param) {
      if (param === void 0) {
        param = null;
      }
      var i = arr.length;
      while (i--) {
        try {
          arr[i].destroy(param);
        } catch (e) {}
        delete arr[i];
      }
      arr.length = 0;
    },
    assign: function assign(target, source) {
      if (typeof Object.assign !== "function") {
        for (var key in source) {
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

  var idsMap = {};
  var Puid = {
    _index: 0,
    _cache: {},
    id: function id(type) {
      if (idsMap[type] === undefined || idsMap[type] === null) idsMap[type] = 0;
      return type + "_" + idsMap[type]++;
    },
    getId: function getId(target) {
      var uid = this.getIdFromCache(target);
      if (uid) return uid;
      uid = "PUID_" + this._index++;
      this._cache[uid] = target;
      return uid;
    },
    getIdFromCache: function getIdFromCache(target) {
      var obj, id;
      for (id in this._cache) {
        obj = this._cache[id];
        if (obj === target) return id;
        if (this.isBody(obj, target) && obj.src === target.src) return id;
      }
      return null;
    },
    isBody: function isBody(obj, target) {
      return typeof obj === "object" && typeof target === "object" && obj.isInner && target.isInner;
    },
    getTarget: function getTarget(uid) {
      return this._cache[uid];
    }
  };

  /**
   * Pool is the cache pool of the proton engine, it is very important.
   *
   * get(target, params, uid)
   *  Class
   *    uid = Puid.getId -> Puid save target cache
   *    target.__puid = uid
   *
   *  body
   *    uid = Puid.getId -> Puid save target cache
   *
   *
   * expire(target)
   *  cache[target.__puid] push target
   *
   */
  var Pool = /*#__PURE__*/function () {
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
    function Pool(num) {
      this.total = 0;
      this.cache = {};
    }

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
    var _proto = Pool.prototype;
    _proto.get = function get(target, params, uid) {
      var p;
      uid = uid || target.__puid || Puid.getId(target);
      if (this.cache[uid] && this.cache[uid].length > 0) {
        p = this.cache[uid].pop();
      } else {
        p = this.createOrClone(target, params);
      }
      p.__puid = target.__puid || uid;
      return p;
    }

    /**
     * @todo add description
     *
     * @method set
     * @memberof Proton#Proton.Pool
     *
     * @param {Object} target
     *
     * @return {Object}
     */;
    _proto.expire = function expire(target) {
      return this.getCache(target.__puid).push(target);
    }

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
     */;
    _proto.createOrClone = function createOrClone(target, params) {
      this.total++;
      if (this.create) {
        return this.create(target, params);
      } else if (typeof target === "function") {
        return Util.classApply(target, params);
      } else {
        return target.clone();
      }
    }

    /**
     * @todo add description - what is in the cache?
     *
     * @method getCount
     * @memberof Proton#Proton.Pool
     *
     * @return {Number}
     */;
    _proto.getCount = function getCount() {
      var count = 0;
      for (var id in this.cache) {
        count += this.cache[id].length;
      }
      return count++;
    }

    /**
     * Destroyes all items from Pool.cache
     *
     * @method destroy
     * @memberof Proton#Proton.Pool
     */;
    _proto.destroy = function destroy() {
      for (var id in this.cache) {
        this.cache[id].length = 0;
        delete this.cache[id];
      }
    }

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
     */;
    _proto.getCache = function getCache(uid) {
      if (uid === void 0) {
        uid = "default";
      }
      if (!this.cache[uid]) this.cache[uid] = [];
      return this.cache[uid];
    };
    return Pool;
  }();

  var Stats = /*#__PURE__*/function () {
    function Stats(proton) {
      this.proton = proton;
      this.container = null;
      this.type = 1;
      this.emitterIndex = 0;
      this.rendererIndex = 0;
    }
    var _proto = Stats.prototype;
    _proto.update = function update(style, body) {
      this.add(style, body);
      var emitter = this.getEmitter();
      var renderer = this.getRenderer();
      var str = "";
      switch (this.type) {
        case 2:
          str += "emitter:" + this.proton.emitters.length + "<br>";
          if (emitter) str += "em speed:" + emitter.emitSpeed + "<br>";
          if (emitter) str += "pos:" + this.getEmitterPos(emitter);
          break;
        case 3:
          if (emitter) str += "initializes:" + emitter.initializes.length + "<br>";
          if (emitter) str += '<span style="display:inline-block;">' + this.concatArr(emitter.initializes) + "</span><br>";
          if (emitter) str += "behaviours:" + emitter.behaviours.length + "<br>";
          if (emitter) str += '<span style="display:inline-block;">' + this.concatArr(emitter.behaviours) + "</span><br>";
          break;
        case 4:
          if (renderer) str += renderer.name + "<br>";
          if (renderer) str += "body:" + this.getCreatedNumber(renderer) + "<br>";
          break;
        default:
          str += "particles:" + this.proton.getCount() + "<br>";
          str += "pool:" + this.proton.pool.getCount() + "<br>";
          str += "total:" + this.proton.pool.total;
      }
      this.container.innerHTML = str;
    };
    _proto.add = function add(style, body) {
      var _this = this;
      if (!this.container) {
        this.type = 1;
        this.container = document.createElement("div");
        this.container.style.cssText = ["position:absolute;bottom:0px;left:0;cursor:pointer;", "opacity:0.9;z-index:10000;padding:10px;font-size:12px;font-family:Helvetica,Arial,sans-serif;", "width:120px;height:50px;background-color:#002;color:#0ff;"].join("");
        this.container.addEventListener("click", function (e) {
          _this.type++;
          if (_this.type > 4) _this.type = 1;
        }, false);
        var bg, color;
        switch (style) {
          case 2:
            bg = "#201";
            color = "#f08";
            break;
          case 3:
            bg = "#020";
            color = "#0f0";
            break;
          default:
            bg = "#002";
            color = "#0ff";
        }
        this.container.style["background-color"] = bg;
        this.container.style["color"] = color;
      }
      if (!this.container.parentNode) {
        body = body || this.body || document.body;
        body.appendChild(this.container);
      }
    };
    _proto.getEmitter = function getEmitter() {
      return this.proton.emitters[this.emitterIndex];
    };
    _proto.getRenderer = function getRenderer() {
      return this.proton.renderers[this.rendererIndex];
    };
    _proto.concatArr = function concatArr(arr) {
      var result = "";
      if (!arr || !arr.length) return result;
      for (var i = 0; i < arr.length; i++) {
        result += (arr[i].name || "").substr(0, 1) + ".";
      }
      return result;
    };
    _proto.getCreatedNumber = function getCreatedNumber(renderer) {
      return renderer.pool.total || renderer.cpool && renderer.cpool.total || 0;
    };
    _proto.getEmitterPos = function getEmitterPos(e) {
      return Math.round(e.p.x) + "," + Math.round(e.p.y);
    };
    _proto.destroy = function destroy() {
      if (this.container && this.container.parentNode) {
        var body = this.body || document.body;
        body.removeChild(this.container);
      }
      this.proton = null;
      this.container = null;
    };
    return Stats;
  }();

  /*
   * EventDispatcher
   * This code reference since http://createjs.com/.
   *
   **/
  var EventDispatcher = /*#__PURE__*/function () {
    function EventDispatcher() {
      this._listeners = null;
    }
    EventDispatcher.bind = function bind(target) {
      target.prototype.dispatchEvent = EventDispatcher.prototype.dispatchEvent;
      target.prototype.hasEventListener = EventDispatcher.prototype.hasEventListener;
      target.prototype.addEventListener = EventDispatcher.prototype.addEventListener;
      target.prototype.removeEventListener = EventDispatcher.prototype.removeEventListener;
      target.prototype.removeAllEventListeners = EventDispatcher.prototype.removeAllEventListeners;
    };
    var _proto = EventDispatcher.prototype;
    _proto.addEventListener = function addEventListener(type, listener) {
      if (!this._listeners) {
        this._listeners = {};
      } else {
        this.removeEventListener(type, listener);
      }
      if (!this._listeners[type]) this._listeners[type] = [];
      this._listeners[type].push(listener);
      return listener;
    };
    _proto.removeEventListener = function removeEventListener(type, listener) {
      if (!this._listeners) return;
      if (!this._listeners[type]) return;
      var arr = this._listeners[type];
      var length = arr.length;
      for (var i = 0; i < length; i++) {
        if (arr[i] === listener) {
          if (length === 1) {
            delete this._listeners[type];
          }

          // allows for faster checks.
          else {
            arr.splice(i, 1);
          }
          break;
        }
      }
    };
    _proto.removeAllEventListeners = function removeAllEventListeners(type) {
      if (!type) this._listeners = null;else if (this._listeners) delete this._listeners[type];
    };
    _proto.dispatchEvent = function dispatchEvent(type, args) {
      var result = false;
      var listeners = this._listeners;
      if (type && listeners) {
        var arr = listeners[type];
        if (!arr) return result;

        // arr = arr.slice();
        // to avoid issues with items being removed or added during the dispatch

        var handler;
        var i = arr.length;
        while (i--) {
          handler = arr[i];
          result = result || handler(args);
        }
      }
      return !!result;
    };
    _proto.hasEventListener = function hasEventListener(type) {
      var listeners = this._listeners;
      return !!(listeners && listeners[type]);
    };
    return EventDispatcher;
  }();

  var PI = 3.1415926;
  var INFINITY = Infinity;
  var MathUtil = {
    PI: PI,
    PIx2: PI * 2,
    PI_2: PI / 2,
    PI_180: PI / 180,
    N180_PI: 180 / PI,
    Infinity: -999,
    isInfinity: function isInfinity(num) {
      return num === this.Infinity || num === INFINITY;
    },
    randomAToB: function randomAToB(a, b, isInt) {
      if (isInt === void 0) {
        isInt = false;
      }
      if (!isInt) return a + Math.random() * (b - a);else return (Math.random() * (b - a) >> 0) + a;
    },
    randomFloating: function randomFloating(center, f, isInt) {
      return this.randomAToB(center - f, center + f, isInt);
    },
    randomColor: function randomColor() {
      return "#" + ("00000" + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    },
    randomZone: function randomZone(display) {},
    floor: function floor(num, k) {
      if (k === void 0) {
        k = 4;
      }
      var digits = Math.pow(10, k);
      return Math.floor(num * digits) / digits;
    },
    degreeTransform: function degreeTransform(a) {
      return a * PI / 180;
    },
    toColor16: function toColor16(num) {
      return "#" + num.toString(16);
    }
  };

  var Integration = /*#__PURE__*/function () {
    function Integration(type) {
      this.type = type;
    }
    var _proto = Integration.prototype;
    _proto.calculate = function calculate(particles, time, damping) {
      this.eulerIntegrate(particles, time, damping);
    }

    // Euler Integrate
    // https://rosettacode.org/wiki/Euler_method
    ;
    _proto.eulerIntegrate = function eulerIntegrate(particle, time, damping) {
      if (!particle.sleep) {
        particle.old.p.copy(particle.p);
        particle.old.v.copy(particle.v);
        particle.a.multiplyScalar(1 / particle.mass);
        particle.v.add(particle.a.multiplyScalar(time));
        particle.p.add(particle.old.v.multiplyScalar(time));
        if (damping) particle.v.multiplyScalar(damping);
        particle.a.clear();
      }
    };
    return Integration;
  }();

  var Proton = /*#__PURE__*/function () {
    // measure 1:100

    // event name

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
    function Proton(integrationType) {
      this.emitters = [];
      this.renderers = [];
      this.time = 0;
      this.now = 0;
      this.then = 0;
      this.elapsed = 0;
      this.stats = new Stats(this);
      this.pool = new Pool(80);
      this.integrationType = Util.initValue(integrationType, Proton.EULER);
      this.integrator = new Integration(this.integrationType);
      this._fps = "auto";
      this._interval = Proton.DEFAULT_INTERVAL;
    }
    var _proto = Proton.prototype;
    /**
     * add a type of Renderer
     *
     * @method addRenderer
     * @memberof Proton
     * @instance
     *
     * @param {Renderer} render
     */
    _proto.addRenderer = function addRenderer(render) {
      render.init(this);
      this.renderers.push(render);
    }

    /**
     * @name add a type of Renderer
     *
     * @method addRenderer
     * @param {Renderer} render
     */;
    _proto.removeRenderer = function removeRenderer(render) {
      var index = this.renderers.indexOf(render);
      this.renderers.splice(index, 1);
      render.remove(this);
    }

    /**
     * add the Emitter
     *
     * @method addEmitter
     * @memberof Proton
     * @instance
     *
     * @param {Emitter} emitter
     */;
    _proto.addEmitter = function addEmitter(emitter) {
      this.emitters.push(emitter);
      emitter.parent = this;
      this.dispatchEvent(Proton.EMITTER_ADDED, emitter);
    }

    /**
     * Removes an Emitter
     *
     * @method removeEmitter
     * @memberof Proton
     * @instance
     *
     * @param {Proton.Emitter} emitter
     */;
    _proto.removeEmitter = function removeEmitter(emitter) {
      var index = this.emitters.indexOf(emitter);
      this.emitters.splice(index, 1);
      emitter.parent = null;
      this.dispatchEvent(Proton.EMITTER_REMOVED, emitter);
    }

    /**
     * Updates all added emitters
     *
     * @method update
     * @memberof Proton
     * @instance
     */;
    _proto.update = function update() {
      // 'auto' is the default browser refresh rate, the vast majority is 60fps
      if (this._fps === "auto") {
        this.dispatchEvent(Proton.PROTON_UPDATE);
        if (Proton.USE_CLOCK) {
          if (!this.then) this.then = new Date().getTime();
          this.now = new Date().getTime();
          this.elapsed = (this.now - this.then) * 0.001;
          // Fix bugs such as chrome browser switching tabs causing excessive time difference
          this.amendChangeTabsBug();
          if (this.elapsed > 0) this.emittersUpdate(this.elapsed);
          this.then = this.now;
        } else {
          this.emittersUpdate(Proton.DEFAULT_INTERVAL);
        }
        this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
      }

      // If the fps frame rate is set
      else {
        if (!this.then) this.then = new Date().getTime();
        this.now = new Date().getTime();
        this.elapsed = (this.now - this.then) * 0.001;
        if (this.elapsed > this._interval) {
          this.dispatchEvent(Proton.PROTON_UPDATE);
          this.emittersUpdate(this._interval);
          // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
          this.then = this.now - this.elapsed % this._interval * 1000;
          this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
        }
      }
    };
    _proto.emittersUpdate = function emittersUpdate(elapsed) {
      var i = this.emitters.length;
      while (i--) {
        this.emitters[i].update(elapsed);
      }
    }

    /**
     * @todo add description
     *
     * @method amendChangeTabsBug
     * @memberof Proton
     * @instance
     */;
    _proto.amendChangeTabsBug = function amendChangeTabsBug() {
      if (!Proton.amendChangeTabsBug) return;
      if (this.elapsed > 0.5) {
        this.then = new Date().getTime();
        this.elapsed = 0;
      }
    }

    /**
     * Counts all particles from all emitters
     *
     * @method getCount
     * @memberof Proton
     * @instance
     */;
    _proto.getCount = function getCount() {
      var total = 0;
      var i = this.emitters.length;
      while (i--) {
        total += this.emitters[i].particles.length;
      }
      return total;
    };
    _proto.getAllParticles = function getAllParticles() {
      var particles = [];
      var i = this.emitters.length;
      while (i--) {
        particles = particles.concat(this.emitters[i].particles);
      }
      return particles;
    };
    _proto.destroyAllEmitters = function destroyAllEmitters() {
      Util.destroyAll(this.emitters);
    }

    /**
     * Destroys everything related to this Proton instance. This includes all emitters, and all properties
     *
     * @method destroy
     * @memberof Proton
     * @instance
     */;
    _proto.destroy = function destroy(remove) {
      var _this = this;
      if (remove === void 0) {
        remove = false;
      }
      var destroyOther = function destroyOther() {
        _this.time = 0;
        _this.then = 0;
        _this.pool.destroy();
        _this.stats.destroy();
        Util.destroyAll(_this.emitters);
        Util.destroyAll(_this.renderers, _this.getAllParticles());
        _this.integrator = null;
        _this.renderers = null;
        _this.emitters = null;
        _this.stats = null;
        _this.pool = null;
      };
      if (remove) {
        setTimeout(destroyOther, 200);
      } else {
        destroyOther();
      }
    };
    _createClass(Proton, [{
      key: "fps",
      get: function get() {
        return this._fps;
      },
      set: function set(fps) {
        this._fps = fps;
        this._interval = fps === "auto" ? Proton.DEFAULT_INTERVAL : MathUtil.floor(1 / fps, 7);
      }
    }]);
    return Proton;
  }();
  Proton.USE_CLOCK = false;
  Proton.MEASURE = 100;
  Proton.EULER = "euler";
  Proton.RK2 = "runge-kutta2";
  Proton.PARTICLE_CREATED = "PARTICLE_CREATED";
  Proton.PARTICLE_UPDATE = "PARTICLE_UPDATE";
  Proton.PARTICLE_SLEEP = "PARTICLE_SLEEP";
  Proton.PARTICLE_DEAD = "PARTICLE_DEAD";
  Proton.EMITTER_ADDED = "EMITTER_ADDED";
  Proton.EMITTER_REMOVED = "EMITTER_REMOVED";
  Proton.PROTON_UPDATE = "PROTON_UPDATE";
  Proton.PROTON_UPDATE_AFTER = "PROTON_UPDATE_AFTER";
  Proton.DEFAULT_INTERVAL = 0.0167;
  Proton.amendChangeTabsBug = true;
  EventDispatcher.bind(Proton);

  var Rgb = /*#__PURE__*/function () {
    function Rgb(r, g, b) {
      if (r === void 0) {
        r = 255;
      }
      if (g === void 0) {
        g = 255;
      }
      if (b === void 0) {
        b = 255;
      }
      this.r = r;
      this.g = g;
      this.b = b;
    }
    var _proto = Rgb.prototype;
    _proto.reset = function reset() {
      this.r = 255;
      this.g = 255;
      this.b = 255;
    };
    return Rgb;
  }();

  /**
   * Represents a span of values or an array.
   */
  var Span = /*#__PURE__*/function () {
    /**
     * @type {boolean}
     * @private
     */

    /**
     * @type {number|number[]}
     * @private
     */

    /**
     * @type {number}
     * @private
     */

    /**
     * @type {boolean}
     * @private
     */

    /**
     * Creates a new Span instance.
     * @param {number|number[]} a - The first value or an array of values.
     * @param {number} [b] - The second value (if a is not an array).
     * @param {boolean} [center=false] - Whether to use center-based calculation.
     */
    function Span(a, b, center) {
      this.isArray = void 0;
      this.a = void 0;
      this.b = void 0;
      this.center = void 0;
      if (Util.isArray(a)) {
        this.isArray = true;
        this.a = a;
      } else {
        this.isArray = false;
        this.a = Util.initValue(a, 1);
        this.b = Util.initValue(b, this.a);
        this.center = Util.initValue(center, false);
      }
    }

    /**
     * Gets a value from the span.
     * @param {boolean} [isInt=false] - Whether to return an integer value.
     * @returns {number} A random value from the span.
     */
    var _proto = Span.prototype;
    _proto.getValue = function getValue(isInt) {
      if (isInt === void 0) {
        isInt = false;
      }
      if (this.isArray) {
        return Util.getRandFromArray(this.a);
      } else {
        if (!this.center) {
          return MathUtil.randomAToB(this.a, this.b, isInt);
        } else {
          return MathUtil.randomFloating(this.a, this.b, isInt);
        }
      }
    }

    /**
     * Returns a new Span object.
     * @param {*|Span} a - The first value or a Span object.
     * @param {*} [b] - The second value.
     * @param {*} [c] - The third value.
     * @returns {Span} A new Span instance.
     */;
    Span.setSpanValue = function setSpanValue(a, b, c) {
      if (a instanceof Span) {
        return a;
      } else {
        if (b === undefined) {
          return new Span(a);
        } else {
          if (c === undefined) return new Span(a, b);else return new Span(a, b, c);
        }
      }
    }

    /**
     * Returns the value from a Span, if the param is not a Span it will return the given parameter.
     * @param {*|Span} pan - The value or Span to get the value from.
     * @returns {*} The value of Span OR the parameter if it is not a Span.
     */;
    Span.getSpanValue = function getSpanValue(pan) {
      return pan instanceof Span ? pan.getValue() : pan;
    };
    return Span;
  }();

  var PropUtil = {
    hasProp: function hasProp(target, key) {
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
    setProp: function setProp(target, props) {
      for (var prop in props) {
        if (target.hasOwnProperty(prop)) {
          target[prop] = Span.getSpanValue(props[prop]);
        }
      }
      return target;
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
    setVectorVal: function setVectorVal(particle, conf) {
      if (conf === void 0) {
        conf = null;
      }
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
    }
  };

  var ease = {
    easeLinear: function easeLinear(value) {
      return value;
    },
    easeInQuad: function easeInQuad(value) {
      return Math.pow(value, 2);
    },
    easeOutQuad: function easeOutQuad(value) {
      return -(Math.pow(value - 1, 2) - 1);
    },
    easeInOutQuad: function easeInOutQuad(value) {
      if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 2);
      return -0.5 * ((value -= 2) * value - 2);
    },
    easeInCubic: function easeInCubic(value) {
      return Math.pow(value, 3);
    },
    easeOutCubic: function easeOutCubic(value) {
      return Math.pow(value - 1, 3) + 1;
    },
    easeInOutCubic: function easeInOutCubic(value) {
      if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 3);
      return 0.5 * (Math.pow(value - 2, 3) + 2);
    },
    easeInQuart: function easeInQuart(value) {
      return Math.pow(value, 4);
    },
    easeOutQuart: function easeOutQuart(value) {
      return -(Math.pow(value - 1, 4) - 1);
    },
    easeInOutQuart: function easeInOutQuart(value) {
      if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 4);
      return -0.5 * ((value -= 2) * Math.pow(value, 3) - 2);
    },
    easeInSine: function easeInSine(value) {
      return -Math.cos(value * MathUtil.PI_2) + 1;
    },
    easeOutSine: function easeOutSine(value) {
      return Math.sin(value * MathUtil.PI_2);
    },
    easeInOutSine: function easeInOutSine(value) {
      return -0.5 * (Math.cos(Math.PI * value) - 1);
    },
    easeInExpo: function easeInExpo(value) {
      return value === 0 ? 0 : Math.pow(2, 10 * (value - 1));
    },
    easeOutExpo: function easeOutExpo(value) {
      return value === 1 ? 1 : -Math.pow(2, -10 * value) + 1;
    },
    easeInOutExpo: function easeInOutExpo(value) {
      if (value === 0) return 0;
      if (value === 1) return 1;
      if ((value /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (value - 1));
      return 0.5 * (-Math.pow(2, -10 * --value) + 2);
    },
    easeInCirc: function easeInCirc(value) {
      return -(Math.sqrt(1 - value * value) - 1);
    },
    easeOutCirc: function easeOutCirc(value) {
      return Math.sqrt(1 - Math.pow(value - 1, 2));
    },
    easeInOutCirc: function easeInOutCirc(value) {
      if ((value /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - value * value) - 1);
      return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
    },
    easeInBack: function easeInBack(value) {
      var s = 1.70158;
      return value * value * ((s + 1) * value - s);
    },
    easeOutBack: function easeOutBack(value) {
      var s = 1.70158;
      return (value = value - 1) * value * ((s + 1) * value + s) + 1;
    },
    easeInOutBack: function easeInOutBack(value) {
      var s = 1.70158;
      if ((value /= 0.5) < 1) return 0.5 * (value * value * (((s *= 1.525) + 1) * value - s));
      return 0.5 * ((value -= 2) * value * (((s *= 1.525) + 1) * value + s) + 2);
    },
    getEasing: function getEasing(ease) {
      if (typeof ease === "function") return ease;else return this[ease] || this.easeLinear;
    }
  };

  var Vector2D = /*#__PURE__*/function () {
    /** @type {number} */

    /** @type {number} */

    /**
     * Creates a new Vector2D instance.
     * @param {number} [x=0] - The x coordinate.
     * @param {number} [y=0] - The y coordinate.
     */
    function Vector2D(x, y) {
      this.x = void 0;
      this.y = void 0;
      this.x = x || 0;
      this.y = y || 0;
    }

    /**
     * Sets the x and y components of this vector.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @returns {Vector2D} This vector.
     */
    var _proto = Vector2D.prototype;
    _proto.set = function set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }

    /**
     * Sets the x component of this vector.
     * @param {number} x - The x coordinate.
     * @returns {Vector2D} This vector.
     */;
    _proto.setX = function setX(x) {
      this.x = x;
      return this;
    }

    /**
     * Sets the y component of this vector.
     * @param {number} y - The y coordinate.
     * @returns {Vector2D} This vector.
     */;
    _proto.setY = function setY(y) {
      this.y = y;
      return this;
    }

    /**
     * Calculates the gradient (angle) of this vector.
     * @returns {number} The gradient in radians.
     */;
    _proto.getGradient = function getGradient() {
      if (this.x !== 0) return Math.atan2(this.y, this.x);else if (this.y > 0) return MathUtil.PI_2;else if (this.y < 0) return -MathUtil.PI_2;
    }

    /**
     * Copies the values of another vector to this one.
     * @param {Vector2D} v - The vector to copy from.
     * @returns {Vector2D} This vector.
     */;
    _proto.copy = function copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    }

    /**
     * Adds another vector to this one.
     * @param {Vector2D} v - The vector to add.
     * @param {Vector2D} [w] - An optional second vector to add.
     * @returns {Vector2D} This vector.
     */;
    _proto.add = function add(v, w) {
      if (w !== undefined) {
        return this.addVectors(v, w);
      }
      this.x += v.x;
      this.y += v.y;
      return this;
    }

    /**
     * Adds scalar values to this vector's components.
     * @param {number} a - Value to add to x.
     * @param {number} b - Value to add to y.
     * @returns {Vector2D} This vector.
     */;
    _proto.addXY = function addXY(a, b) {
      this.x += a;
      this.y += b;
      return this;
    }

    /**
     * Adds two vectors and sets the result to this vector.
     * @param {Vector2D} a - The first vector to add.
     * @param {Vector2D} b - The second vector to add.
     * @returns {Vector2D} This vector.
     */;
    _proto.addVectors = function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      return this;
    }

    /**
     * Subtracts another vector from this one.
     * @param {Vector2D} v - The vector to subtract.
     * @param {Vector2D} [w] - An optional second vector to subtract.
     * @returns {Vector2D} This vector.
     */;
    _proto.sub = function sub(v, w) {
      if (w !== undefined) {
        return this.subVectors(v, w);
      }
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }

    /**
     * Subtracts one vector from another and sets the result to this vector.
     * @param {Vector2D} a - The vector to subtract from.
     * @param {Vector2D} b - The vector to subtract.
     * @returns {Vector2D} This vector.
     */;
    _proto.subVectors = function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      return this;
    }

    /**
     * Divides this vector by a scalar.
     * @param {number} s - The scalar to divide by.
     * @returns {Vector2D} This vector.
     */;
    _proto.divideScalar = function divideScalar(s) {
      if (s !== 0) {
        this.x /= s;
        this.y /= s;
      } else {
        this.set(0, 0);
      }
      return this;
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} s - The scalar to multiply by.
     * @returns {Vector2D} This vector.
     */;
    _proto.multiplyScalar = function multiplyScalar(s) {
      this.x *= s;
      this.y *= s;
      return this;
    }

    /**
     * Negates this vector (inverts its direction).
     * @returns {Vector2D} This vector.
     */;
    _proto.negate = function negate() {
      return this.multiplyScalar(-1);
    }

    /**
     * Calculates the dot product of this vector with another.
     * @param {Vector2D} v - The other vector.
     * @returns {number} The dot product.
     */;
    _proto.dot = function dot(v) {
      return this.x * v.x + this.y * v.y;
    }

    /**
     * Calculates the squared length of this vector.
     * @returns {number} The squared length.
     */;
    _proto.lengthSq = function lengthSq() {
      return this.x * this.x + this.y * this.y;
    }

    /**
     * Calculates the length of this vector.
     * @returns {number} The length.
     */;
    _proto.length = function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Normalizes this vector (makes it unit length).
     * @returns {Vector2D} This vector.
     */;
    _proto.normalize = function normalize() {
      return this.divideScalar(this.length());
    }

    /**
     * Calculates the distance to another vector.
     * @param {Vector2D} v - The other vector.
     * @returns {number} The distance.
     */;
    _proto.distanceTo = function distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }

    /**
     * Rotates this vector by an angle.
     * @param {number} tha - The angle to rotate by (in radians).
     * @returns {Vector2D} This vector.
     */;
    _proto.rotate = function rotate(tha) {
      var x = this.x;
      var y = this.y;
      this.x = x * Math.cos(tha) + y * Math.sin(tha);
      this.y = -x * Math.sin(tha) + y * Math.cos(tha);
      return this;
    }

    /**
     * Calculates the squared distance to another vector.
     * @param {Vector2D} v - The other vector.
     * @returns {number} The squared distance.
     */;
    _proto.distanceToSquared = function distanceToSquared(v) {
      var dx = this.x - v.x;
      var dy = this.y - v.y;
      return dx * dx + dy * dy;
    }

    /**
     * Linearly interpolates this vector toward another vector.
     * @param {Vector2D} v - The target vector.
     * @param {number} alpha - The interpolation factor (0-1).
     * @returns {Vector2D} This vector.
     */;
    _proto.lerp = function lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      return this;
    }

    /**
     * Checks if this vector is equal to another vector.
     * @param {Vector2D} v - The other vector.
     * @returns {boolean} True if the vectors are equal, false otherwise.
     */;
    _proto.equals = function equals(v) {
      return v.x === this.x && v.y === this.y;
    }

    /**
     * Sets this vector to zero.
     * @returns {Vector2D} This vector.
     */;
    _proto.clear = function clear() {
      this.x = 0.0;
      this.y = 0.0;
      return this;
    }

    /**
     * Creates a new vector with the same x and y values as this one.
     * @returns {Vector2D} A new Vector2D instance.
     */;
    _proto.clone = function clone() {
      return new Vector2D(this.x, this.y);
    };
    return Vector2D;
  }();

  /**
   * Represents a particle in a particle system.
   * @class Particle
   */
  var Particle = /*#__PURE__*/function () {
    /** @type {string} The unique identifier of the particle */

    /** @type {{p:Vector2D,v:Vector2D,a:Vector2D}} Old state of the particle */

    /** @type {object} Custom data associated with the particle */

    /** @type {Behaviour[]} Array of behaviours applied to the particle */

    /** @type {Vector2D} Current position of the particle */

    /** @type {Vector2D} Current velocity of the particle */

    /** @type {Vector2D} Current acceleration of the particle */

    /** @type {Rgb} Color of the particle */

    /**
     * Creates a new Particle instance.
     * @param {Object} [conf] Configuration object for the particle
     */
    function Particle(conf) {
      this.id = "";
      this.old = null;
      this.data = null;
      this.behaviours = null;
      this.p = null;
      this.v = null;
      this.a = null;
      this.rgb = null;
      this.name = "Particle";
      this.id = Puid.id(this.name);
      this.old = {};
      this.data = {};
      this.behaviours = [];
      this.p = new Vector2D();
      this.v = new Vector2D();
      this.a = new Vector2D();
      this.old.p = new Vector2D();
      this.old.v = new Vector2D();
      this.old.a = new Vector2D();
      this.rgb = new Rgb();
      this.reset();
      conf && PropUtil.setProp(this, conf);
    }

    /**
     * Gets the direction of the particle's movement in degrees.
     * @returns {number} The direction in degrees
     */
    var _proto = Particle.prototype;
    _proto.getDirection = function getDirection() {
      return Math.atan2(this.v.x, -this.v.y) * MathUtil.N180_PI;
    }

    /**
     * Resets the particle to its initial state.
     * @returns {Particle} The particle instance
     */;
    _proto.reset = function reset() {
      this.life = Infinity;
      this.age = 0;
      this.dead = false;
      this.sleep = false;
      this.body = null;
      this.sprite = null;
      this.parent = null;
      this.energy = 1; // Energy Loss
      this.mass = 1;
      this.radius = 10;
      this.alpha = 1;
      this.scale = 1;
      this.rotation = 0;
      this.color = null;
      this.p.set(0, 0);
      this.v.set(0, 0);
      this.a.set(0, 0);
      this.old.p.set(0, 0);
      this.old.v.set(0, 0);
      this.old.a.set(0, 0);
      this.easing = ease.easeLinear;
      this.rgb.reset();
      Util.emptyObject(this.data);
      this.removeAllBehaviours();
      return this;
    }

    /**
     * Updates the particle's state.
     * @param {number} time The time elapsed since the last update
     * @param {number} index The index of the particle in its parent system
     */;
    _proto.update = function update(time, index) {
      if (!this.sleep) {
        this.age += time;
        this.applyBehaviours(time, index);
      }
      if (this.age < this.life) {
        var scale = this.easing(this.age / this.life);
        this.energy = Math.max(1 - scale, 0);
      } else {
        this.destroy();
      }
    }

    /**
     * Applies all behaviours attached to the particle.
     * @param {number} time The time elapsed since the last update
     * @param {number} index The index of the particle in its parent system
     */;
    _proto.applyBehaviours = function applyBehaviours(time, index) {
      var length = this.behaviours.length;
      var i;
      for (i = 0; i < length; i++) {
        this.behaviours[i] && this.behaviours[i].applyBehaviour(this, time, index);
      }
    }

    /**
     * Adds a behaviour to the particle.
     * @param {Behaviour} behaviour The behaviour to add
     */;
    _proto.addBehaviour = function addBehaviour(behaviour) {
      this.behaviours.push(behaviour);
      if (behaviour.hasOwnProperty("parents")) behaviour.parents.push(this);
      behaviour.initialize(this);
    }

    /**
     * Adds multiple behaviours to the particle.
     * @param {Behaviour[]} behaviours An array of behaviours to add
     */;
    _proto.addBehaviours = function addBehaviours(behaviours) {
      var length = behaviours.length;
      var i;
      for (i = 0; i < length; i++) {
        this.addBehaviour(behaviours[i]);
      }
    }

    /**
     * Removes a specific behaviour from the particle.
     * @param {Behaviour} behaviour The behaviour to remove
     */;
    _proto.removeBehaviour = function removeBehaviour(behaviour) {
      var index = this.behaviours.indexOf(behaviour);
      if (index > -1) {
        var _behaviour = this.behaviours.splice(index, 1);
        _behaviour.parents = null;
      }
    }

    /**
     * Removes all behaviours from the particle.
     */;
    _proto.removeAllBehaviours = function removeAllBehaviours() {
      Util.emptyArray(this.behaviours);
    }

    /**
     * Destroys the particle, removing all behaviours and setting it as dead.
     */;
    _proto.destroy = function destroy() {
      this.removeAllBehaviours();
      this.energy = 0;
      this.dead = true;
      this.parent = null;
    };
    return Particle;
  }();

  var ColorUtil = {
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
    hexToRgb: function hexToRgb(h) {
      var hex16 = h.charAt(0) === "#" ? h.substring(1, 7) : h;
      var r = parseInt(hex16.substring(0, 2), 16);
      var g = parseInt(hex16.substring(2, 4), 16);
      var b = parseInt(hex16.substring(4, 6), 16);
      return {
        r: r,
        g: g,
        b: b
      };
    },
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
    rgbToHex: function rgbToHex(rbg) {
      return "rgb(" + rbg.r + ", " + rbg.g + ", " + rbg.b + ")";
    },
    getHex16FromParticle: function getHex16FromParticle(p) {
      return Number(p.rgb.r) * 65536 + Number(p.rgb.g) * 256 + Number(p.rgb.b);
    }
  };

  var Polar2D = /*#__PURE__*/function () {
    function Polar2D(r, tha) {
      this.r = Math.abs(r) || 0;
      this.tha = tha || 0;
    }
    var _proto = Polar2D.prototype;
    _proto.set = function set(r, tha) {
      this.r = r;
      this.tha = tha;
      return this;
    };
    _proto.setR = function setR(r) {
      this.r = r;
      return this;
    };
    _proto.setTha = function setTha(tha) {
      this.tha = tha;
      return this;
    };
    _proto.copy = function copy(p) {
      this.r = p.r;
      this.tha = p.tha;
      return this;
    };
    _proto.toVector = function toVector() {
      return new Vector2D(this.getX(), this.getY());
    };
    _proto.getX = function getX() {
      return this.r * Math.sin(this.tha);
    };
    _proto.getY = function getY() {
      return -this.r * Math.cos(this.tha);
    };
    _proto.normalize = function normalize() {
      this.r = 1;
      return this;
    };
    _proto.equals = function equals(v) {
      return v.r === this.r && v.tha === this.tha;
    };
    _proto.clear = function clear() {
      this.r = 0.0;
      this.tha = 0.0;
      return this;
    };
    _proto.clone = function clone() {
      return new Polar2D(this.r, this.tha);
    };
    return Polar2D;
  }();

  var Mat3 = {
    create: function create(mat3) {
      var mat = new Float32Array(9);
      if (mat3) this.set(mat3, mat);
      return mat;
    },
    set: function set(mat1, mat2) {
      for (var i = 0; i < 9; i++) {
        mat2[i] = mat1[i];
      }
      return mat2;
    },
    multiply: function multiply(mat, mat2, mat3) {
      var a00 = mat[0],
        a01 = mat[1],
        a02 = mat[2],
        a10 = mat[3],
        a11 = mat[4],
        a20 = mat[6],
        a21 = mat[7],
        b00 = mat2[0],
        b01 = mat2[1],
        b02 = mat2[2],
        b10 = mat2[3],
        b11 = mat2[4],
        b20 = mat2[6],
        b21 = mat2[7];
      mat3[0] = b00 * a00 + b01 * a10;
      mat3[1] = b00 * a01 + b01 * a11;
      mat3[2] = a02 * b02;
      mat3[3] = b10 * a00 + b11 * a10;
      mat3[4] = b10 * a01 + b11 * a11;
      mat3[6] = b20 * a00 + b21 * a10 + a20;
      mat3[7] = b20 * a01 + b21 * a11 + a21;
      return mat3;
    },
    inverse: function inverse(mat, mat3) {
      var a00 = mat[0],
        a01 = mat[1],
        a10 = mat[3],
        a11 = mat[4],
        a20 = mat[6],
        a21 = mat[7],
        b01 = a11,
        b11 = -a10,
        b21 = a21 * a10 - a11 * a20,
        d = a00 * b01 + a01 * b11,
        id;
      id = 1 / d;
      mat3[0] = b01 * id;
      mat3[1] = -a01 * id;
      mat3[3] = b11 * id;
      mat3[4] = a00 * id;
      mat3[6] = b21 * id;
      mat3[7] = (-a21 * a00 + a01 * a20) * id;
      return mat3;
    },
    multiplyVec2: function multiplyVec2(m, vec, mat3) {
      var x = vec[0],
        y = vec[1];
      mat3[0] = x * m[0] + y * m[3] + m[6];
      mat3[1] = x * m[1] + y * m[4] + m[7];
      return mat3;
    }
  };

  var ArraySpan = /*#__PURE__*/function (_Span) {
    _inheritsLoose(ArraySpan, _Span);
    function ArraySpan(color) {
      var _this;
      _this = _Span.call(this) || this;
      _this._arr = Util.toArray(color);
      return _this;
    }
    var _proto = ArraySpan.prototype;
    _proto.getValue = function getValue() {
      var val = Util.getRandFromArray(this._arr);
      return val === "random" || val === "Random" ? MathUtil.randomColor() : val;
    }

    /**
     * Make sure that the color is an instance of Proton.ArraySpan, if not it makes a new instance
     *
     * @method setSpanValue
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */;
    ArraySpan.createArraySpan = function createArraySpan(arr) {
      if (!arr) return null;
      if (arr instanceof ArraySpan) return arr;else return new ArraySpan(arr);
    };
    return ArraySpan;
  }(Span);

  var Rectangle = /*#__PURE__*/function () {
    function Rectangle(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.bottom = this.y + this.height;
      this.right = this.x + this.width;
    }
    var _proto = Rectangle.prototype;
    _proto.contains = function contains(x, y) {
      if (x <= this.right && x >= this.x && y <= this.bottom && y >= this.y) return true;else return false;
    };
    return Rectangle;
  }();

  /**
   * Rate class for controlling particle emission rate.
   */
  var Rate = /*#__PURE__*/function () {
    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {number}
     * @private
     */

    /**
     * @type {number}
     * @private
     */

    /**
     * Creates a new Rate instance.
     * The number of particles per second emission (a [particle]/b [s]).
     * @param {Array|number|Span} [numpan=1] - The number of particles for each emission.
     * @param {Array|number|Span} [timepan=1] - The time interval between each emission.
     * @example
     * // Create a rate of 10-20 particles every 0.1-0.25 seconds
     * new Rate(new Span(10, 20), new Span(0.1, 0.25));
     */
    function Rate(numpan, timepan) {
      this.numPan = void 0;
      this.timePan = void 0;
      this.startTime = void 0;
      this.nextTime = void 0;
      this.numPan = Span.setSpanValue(Util.initValue(numpan, 1));
      this.timePan = Span.setSpanValue(Util.initValue(timepan, 1));
      this.startTime = 0;
      this.nextTime = 0;
      this.init();
    }

    /**
     * Initializes the rate.
     * @private
     */
    var _proto = Rate.prototype;
    _proto.init = function init() {
      this.startTime = 0;
      this.nextTime = this.timePan.getValue();
    }

    /**
     * Gets the number of particles to emit based on the elapsed time.
     * @param {number} time - The elapsed time since the last update.
     * @returns {number} The number of particles to emit.
     */;
    _proto.getValue = function getValue(time) {
      this.startTime += time;
      if (this.startTime >= this.nextTime) {
        this.startTime = 0;
        this.nextTime = this.timePan.getValue();
        if (this.numPan.b === 1) {
          if (this.numPan.getValue(false) > 0.5) return 1;else return 0;
        } else {
          return this.numPan.getValue(true);
        }
      }
      return 0;
    };
    return Rate;
  }();

  var Initialize = /*#__PURE__*/function () {
    function Initialize() {}
    var _proto = Initialize.prototype;
    _proto.reset = function reset() {};
    _proto.init = function init(emitter, particle) {
      if (particle) {
        this.initialize(particle);
      } else {
        this.initialize(emitter);
      }
    }

    // sub class init
    ;
    _proto.initialize = function initialize(target) {};
    return Initialize;
  }();

  /**
   * Life class for initializing particle lifetime.
   * @extends Initialize
   */
  var Life = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Life, _Initialize);
    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Life instance.
     * @param {number|Span} a - The lifetime value or the lower bound of the lifetime range.
     * @param {number} [b] - The upper bound of the lifetime range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    function Life(a, b, c) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.lifePan = void 0;
      _this.name = void 0;
      _this.lifePan = Span.setSpanValue(a, b, c);
      _this.name = "Life";
      return _this;
    }

    /**
     * Initializes the lifetime of a target particle.
     * @param {object} target - The target particle to initialize.
     */
    var _proto = Life.prototype;
    _proto.initialize = function initialize(target) {
      if (this.lifePan.a === Infinity) target.life = Infinity;else target.life = this.lifePan.getValue();
    };
    return Life;
  }(Initialize);

  var Zone = /*#__PURE__*/function () {
    function Zone() {
      this.vector = new Vector2D(0, 0);
      this.random = 0;
      this.crossType = "dead";
      this.alert = true;
    }
    var _proto = Zone.prototype;
    _proto.getPosition = function getPosition() {};
    _proto.crossing = function crossing(particle) {};
    _proto.destroy = function destroy() {
      this.vector = null;
    };
    return Zone;
  }();

  /**
   * Represents a point zone in a 2D space.
   * @extends Zone
   */
  var PointZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(PointZone, _Zone);
    /**
     * Creates a new PointZone.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     */
    function PointZone(x, y) {
      var _this;
      _this = _Zone.call(this) || this;

      /**
       * The x-coordinate of the point.
       * @type {number}
       */
      _this.x = x;

      /**
       * The y-coordinate of the point.
       * @type {number}
       */
      _this.y = y;
      return _this;
    }

    /**
     * Gets the position of the point.
     * @returns {Object} An object representing the position vector.
     */
    var _proto = PointZone.prototype;
    _proto.getPosition = function getPosition() {
      this.vector.x = this.x;
      this.vector.y = this.y;
      return this.vector;
    }

    /**
     * This method is not supported for PointZone.
     * @param {Object} particle - The particle object (unused).
     */;
    _proto.crossing = function crossing(particle) {
      if (this.alert) {
        console.error("Sorry, PointZone does not support crossing method!");
        this.alert = false;
      }
    };
    return PointZone;
  }(Zone);

  /**
   * Position class for initializing particle positions.
   * @extends Initialize
   */
  var Position = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Position, _Initialize);
    /**
     * @type {PointZone|any}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Position instance.
     * @param {PointZone|any} [zone] - The zone to use for positioning. Defaults to a new PointZone if not provided.
     */
    function Position(zone) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.zone = void 0;
      _this.name = void 0;
      _this.zone = Util.initValue(zone, new PointZone());
      _this.name = "Position";
      return _this;
    }

    /**
     * Resets this initializer's parameters.
     * @param {PointZone|any} [zone] - The new zone to use for positioning. Defaults to a new PointZone if not provided.
     */
    var _proto = Position.prototype;
    _proto.reset = function reset(zone) {
      this.zone = Util.initValue(zone, new PointZone());
    }

    /**
     * Initializes the particle's position.
     * @param {object} target - The particle to initialize.
     * @param {object} target.p - The particle's position object.
     * @param {number} target.p.x - The particle's x coordinate.
     * @param {number} target.p.y - The particle's y coordinate.
     */;
    _proto.initialize = function initialize(target) {
      this.zone.getPosition();
      target.p.x = this.zone.vector.x;
      target.p.y = this.zone.vector.y;
    };
    return Position;
  }(Initialize);

  /**
   * Velocity class for initializing particle velocities.
   * @extends Initialize
   */
  var Velocity = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Velocity, _Initialize);
    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Velocity instance.
     * @param {number|Span} [rpan] - The radial component of the velocity or its range.
     * @param {number|Span} [thapan] - The angular component of the velocity or its range.
     * @param {string} [type='vector'] - The type of velocity ('vector' or 'polar').
     */
    function Velocity(rpan, thapan, type) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.rPan = void 0;
      _this.thaPan = void 0;
      _this.name = void 0;
      _this.rPan = Span.setSpanValue(rpan);
      _this.thaPan = Span.setSpanValue(thapan);
      _this.type = Util.initValue(type, "vector");
      _this.name = "Velocity";
      return _this;
    }

    /**
     * Resets the velocity parameters.
     * @param {number|Span} [rpan] - The radial component of the velocity or its range.
     * @param {number|Span} [thapan] - The angular component of the velocity or its range.
     * @param {string} [type='vector'] - The type of velocity ('vector' or 'polar').
     */
    var _proto = Velocity.prototype;
    _proto.reset = function reset(rpan, thapan, type) {
      this.rPan = Span.setSpanValue(rpan);
      this.thaPan = Span.setSpanValue(thapan);
      this.type = Util.initValue(type, "vector");
    }

    /**
     * Normalizes the velocity value.
     * @param {number} vr - The velocity value to normalize.
     * @returns {number} The normalized velocity value.
     * @private
     */;
    _proto.normalizeVelocity = function normalizeVelocity(vr) {
      return vr * Proton.MEASURE;
    }

    /**
     * Initializes the particle's velocity.
     * @param {object} target - The particle to initialize.
     */;
    _proto.initialize = function initialize(target) {
      if (this.type === "p" || this.type === "P" || this.type === "polar") {
        var polar2d = new Polar2D(this.normalizeVelocity(this.rPan.getValue()), this.thaPan.getValue() * MathUtil.PI_180);
        target.v.x = polar2d.getX();
        target.v.y = polar2d.getY();
      } else {
        target.v.x = this.normalizeVelocity(this.rPan.getValue());
        target.v.y = this.normalizeVelocity(this.thaPan.getValue());
      }
    };
    return Velocity;
  }(Initialize);

  /**
   * Mass class for initializing particle mass.
   * @extends Initialize
   */
  var Mass = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Mass, _Initialize);
    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Mass instance.
     * @param {number|Span} a - The mass value or the lower bound of the mass range.
     * @param {number} [b] - The upper bound of the mass range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    function Mass(a, b, c) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.massPan = void 0;
      _this.name = void 0;
      _this.massPan = Span.setSpanValue(a, b, c);
      _this.name = "Mass";
      return _this;
    }

    /**
     * Initializes the mass of a target particle.
     * @param {object} target - The target particle to initialize.
     */
    var _proto = Mass.prototype;
    _proto.initialize = function initialize(target) {
      target.mass = this.massPan.getValue();
    };
    return Mass;
  }(Initialize);

  /**
   * Radius class for initializing particle radius.
   * @extends Initialize
   */
  var Radius = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Radius, _Initialize);
    /**
     * @type {Span}
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Radius instance.
     * @param {number|Span} a - The radius value or the lower bound of the radius range.
     * @param {number} [b] - The upper bound of the radius range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    function Radius(a, b, c) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.radius = void 0;
      _this.name = void 0;
      _this.radius = Span.setSpanValue(a, b, c);
      _this.name = "Radius";
      return _this;
    }

    /**
     * Resets this initializer's parameters.
     * @param {number|Span} a - The radius value or the lower bound of the radius range.
     * @param {number} [b] - The upper bound of the radius range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    var _proto = Radius.prototype;
    _proto.reset = function reset(a, b, c) {
      this.radius = Span.setSpanValue(a, b, c);
    }

    /**
     * Initializes the particle's radius.
     * @param {Particle} particle - The particle to initialize.
     */;
    _proto.initialize = function initialize(particle) {
      particle.radius = this.radius.getValue();
      particle.data.oldRadius = particle.radius;
    };
    return Radius;
  }(Initialize);

  /**
   * Body class for initializing particle bodies.
   * @extends Initialize
   */
  var Body = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Body, _Initialize);
    /**
     * @type {ArraySpan}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Body instance.
     * @param {string|object|ArraySpan} image - The image source or object to use for the particle body.
     * @param {number} [w=20] - The width of the particle body.
     * @param {number} [h] - The height of the particle body. Defaults to the width if not provided.
     */
    function Body(image, w, h) {
      var _this;
      _this = _Initialize.call(this) || this;
      _this.image = void 0;
      _this.name = void 0;
      _this.image = _this.setSpanValue(image);
      _this.w = Util.initValue(w, 20);
      _this.h = Util.initValue(h, _this.w);
      _this.name = "Body";
      return _this;
    }

    /**
     * Initializes the particle's body.
     * @param {object} particle - The particle to initialize.
     */
    var _proto = Body.prototype;
    _proto.initialize = function initialize(particle) {
      var imageTarget = this.image.getValue();
      if (typeof imageTarget === "string") {
        particle.body = {
          width: this.w,
          height: this.h,
          src: imageTarget,
          isInner: true,
          inner: true
        };
      } else {
        particle.body = imageTarget;
      }
    }

    /**
     * Sets the span value for the image.
     * @param {string|object|ArraySpan} image - The image source or object to set as span value.
     * @returns {ArraySpan} The ArraySpan instance.
     * @private
     */;
    _proto.setSpanValue = function setSpanValue(image) {
      return image instanceof ArraySpan ? image : new ArraySpan(image);
    };
    return Body;
  }(Initialize);

  /**
   * The Behaviour class is the base for the other Behaviour
   * @class
   */
  var Behaviour = /*#__PURE__*/function () {
    /**
     * Create a new Behaviour instance
     * @param {number} [life=Infinity] - The behaviour's life
     * @param {string} [easing='easeLinear'] - The behaviour's decaying trend, for example ease.easeOutQuart
     */
    function Behaviour(life, easing) {
      /**
       * The behaviour's life
       * @type {number}
       */
      this.life = Util.initValue(life, Infinity);

      /**
       * The behaviour's easing function
       * @type {function}
       */
      this.easing = ease.getEasing(easing);

      /**
       * The behaviour's current age
       * @type {number}
       */
      this.age = 0;

      /**
       * The behaviour's current energy
       * @type {number}
       */
      this.energy = 1;

      /**
       * Whether the behaviour is dead
       * @type {boolean}
       */
      this.dead = false;

      /**
       * The behaviour's parent emitters
       * @type {Array}
       */
      this.parents = [];

      /**
       * The behaviour's unique id
       * @type {string}
       */
      this.id = "Behaviour_" + Behaviour.id++;

      /**
       * The behaviour's name
       * @type {string}
       */
      this.name = "Behaviour";
    }

    /**
     * Reset this behaviour's parameters
     * @param {number} [life=Infinity] - This behaviour's new life
     * @param {string} [easing='easeLinear'] - This behaviour's new easing
     */
    var _proto = Behaviour.prototype;
    _proto.reset = function reset(life, easing) {
      this.life = Util.initValue(life, Infinity);
      this.easing = ease.getEasing(easing);
    }

    /**
     * Normalize a force by 1:100
     * @param {Proton.Vector2D} force - The force to normalize
     * @returns {Proton.Vector2D} The normalized force
     */;
    _proto.normalizeForce = function normalizeForce(force) {
      return force.multiplyScalar(Proton.MEASURE);
    }

    /**
     * Normalize a value by 1:100
     * @param {number} value - The value to normalize
     * @returns {number} The normalized value
     */;
    _proto.normalizeValue = function normalizeValue(value) {
      return value * Proton.MEASURE;
    }

    /**
     * Initialize the behaviour's parameters for a particle
     * @param {Proton.Particle} particle - The particle to initialize
     */;
    _proto.initialize = function initialize(particle) {}

    /**
     * Compute the behaviour's life cycle
     * @param {Proton.Particle} particle - The particle to calculate for
     * @param {number} time - The integrate time 1/ms
     * @param {number} index - The particle index
     */;
    _proto.calculate = function calculate(particle, time, index) {
      this.age += time;
      if (this.age >= this.life || this.dead) {
        this.energy = 0;
        this.dead = true;
        this.destroy();
      } else {
        var scale = this.easing(particle.age / particle.life);
        this.energy = Math.max(1 - scale, 0);
      }
    }

    /**
     * Apply this behaviour to a particle
     * @param {Proton.Particle} particle - The particle to apply the behaviour to
     * @param {number} time - The integrate time 1/ms
     * @param {number} index - The particle index
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
    }

    /**
     * Destroy this behaviour
     */;
    _proto.destroy = function destroy() {
      var i = this.parents.length;
      while (i--) {
        this.parents[i].removeBehaviour(this);
      }
      this.parents.length = 0;
    };
    return Behaviour;
  }();
  Behaviour.id = 0;

  var Force = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Force, _Behaviour);
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
    function Force(fx, fy, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.force = _this.normalizeForce(new Vector2D(fx, fy));
      _this.name = "Force";
      return _this;
    }

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
    var _proto = Force.prototype;
    _proto.reset = function reset(fx, fy, life, easing) {
      this.force = this.normalizeForce(new Vector2D(fx, fy));
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

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
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.a.add(this.force);
    };
    return Force;
  }(Behaviour);

  /**
   * Attraction behavior for particles.
   * This behaviour makes particles follow a specific target position.
   * @extends Behaviour
   */
  var Attraction = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Attraction, _Behaviour);
    /**
     * Creates an instance of Attraction.
     * @param {Vector2D} targetPosition - The attraction point coordinates.
     * @param {number} [force=100] - The strength of the attraction force.
     * @param {number} [radius=1000] - The radius of influence for the attraction.
     * @param {number} [life=Infinity] - The life span of this behaviour.
     * @param {string} [easing='ease.easeLinear'] - The easing function for this behaviour.
     */
    function Attraction(targetPosition, force, radius, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;

      /**
       * The target position for attraction.
       * @type {Vector2D}
       */
      _this.targetPosition = Util.initValue(targetPosition, new Vector2D());

      /**
       * The radius of influence for the attraction.
       * @type {number}
       */
      _this.radius = Util.initValue(radius, 1000);

      /**
       * The strength of the attraction force.
       * @type {number}
       */
      _this.force = Util.initValue(_this.normalizeValue(force), 100);

      /**
       * The squared radius (for optimization).
       * @type {number}
       */
      _this.radiusSq = _this.radius * _this.radius;

      /**
       * The attraction force vector.
       * @type {Vector2D}
       */
      _this.attractionForce = new Vector2D();

      /**
       * The squared length of the attraction force.
       * @type {number}
       */
      _this.lengthSq = 0;

      /**
       * The name of the behaviour.
       * @type {string}
       */
      _this.name = "Attraction";
      return _this;
    }

    /**
     * Resets the behaviour's parameters.
     * @param {Vector2D} targetPosition - The new attraction point coordinates.
     * @param {number} [force=100] - The new strength of the attraction force.
     * @param {number} [radius=1000] - The new radius of influence for the attraction.
     * @param {number} [life=Infinity] - The new life span of this behaviour.
     * @param {string} [easing='ease.easeLinear'] - The new easing function for this behaviour.
     */
    var _proto = Attraction.prototype;
    _proto.reset = function reset(targetPosition, force, radius, life, easing) {
      this.targetPosition = Util.initValue(targetPosition, new Vector2D());
      this.radius = Util.initValue(radius, 1000);
      this.force = Util.initValue(this.normalizeValue(force), 100);
      this.radiusSq = this.radius * this.radius;
      this.attractionForce = new Vector2D();
      this.lengthSq = 0;
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

    /**
     * Applies this behaviour to a particle.
     * @param {Particle} particle - The particle to apply the behaviour to.
     * @param {number} time - The current simulation time.
     * @param {number} index - The index of the particle.
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      this.attractionForce.copy(this.targetPosition);
      this.attractionForce.sub(particle.p);
      this.lengthSq = this.attractionForce.lengthSq();
      if (this.lengthSq > 0.00004 && this.lengthSq < this.radiusSq) {
        this.attractionForce.normalize();
        this.attractionForce.multiplyScalar(1 - this.lengthSq / this.radiusSq);
        this.attractionForce.multiplyScalar(this.force);
        particle.a.add(this.attractionForce);
      }
    };
    return Attraction;
  }(Behaviour);

  var RandomDrift = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(RandomDrift, _Behaviour);
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
    function RandomDrift(driftX, driftY, delay, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.reset(driftX, driftY, delay);
      _this.time = 0;
      _this.name = "RandomDrift";
      return _this;
    }

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
    var _proto = RandomDrift.prototype;
    _proto.reset = function reset(driftX, driftY, delay, life, easing) {
      this.panFoce = new Vector2D(driftX, driftY);
      this.panFoce = this.normalizeForce(this.panFoce);
      this.delay = delay;
      life && _Behaviour.prototype.reset.call(this, life, easing);
    };
    _proto.initialize = function initialize(particle) {
      particle.data.time = 0;
    }

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
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.data.time += time;
      if (particle.data.time >= this.delay) {
        particle.a.addXY(MathUtil.randomAToB(-this.panFoce.x, this.panFoce.x), MathUtil.randomAToB(-this.panFoce.y, this.panFoce.y));
        particle.data.time = 0;
      }
    };
    return RandomDrift;
  }(Behaviour);

  var Gravity = /*#__PURE__*/function (_Force) {
    _inheritsLoose(Gravity, _Force);
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
    function Gravity(g, life, easing) {
      var _this;
      _this = _Force.call(this, 0, g, life, easing) || this;
      _this.name = "Gravity";
      return _this;
    }

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
    var _proto = Gravity.prototype;
    _proto.reset = function reset(g, life, easing) {
      _Force.prototype.reset.call(this, 0, g, life, easing);
    };
    return Gravity;
  }(Force);

  var Collision = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Collision, _Behaviour);
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
    function Collision(emitter, mass, callback, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.reset(emitter, mass, callback);
      _this.newPool = [];
      _this.pool = [];
      _this.name = "Collision";
      return _this;
    }

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
    var _proto = Collision.prototype;
    _proto.reset = function reset(emitter, mass, callback, life, easing) {
      this.emitter = Util.initValue(emitter, null);
      this.mass = Util.initValue(mass, true);
      this.callback = Util.initValue(callback, null);
      this.collisionPool = [];
      this.delta = new Vector2D();
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

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
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      if (this.emitter) {
        Util.sliceArray(this.emitter.particles, index, this.newPool);
      } else {
        Util.sliceArray(this.pool, index, this.newPool);
      }
      var length = this.newPool.length;
      var otherParticle;
      var lengthSq;
      var overlap;
      var totalMass;
      var averageMass1, averageMass2;
      var i;
      for (i = 0; i < length; i++) {
        otherParticle = this.newPool[i];
        if (otherParticle !== particle) {
          this.delta.copy(otherParticle.p);
          this.delta.sub(particle.p);
          lengthSq = this.delta.lengthSq();
          var distance = particle.radius + otherParticle.radius;
          if (lengthSq <= distance * distance) {
            overlap = distance - Math.sqrt(lengthSq);
            overlap += 0.5;
            totalMass = particle.mass + otherParticle.mass;
            averageMass1 = this.mass ? otherParticle.mass / totalMass : 0.5;
            averageMass2 = this.mass ? particle.mass / totalMass : 0.5;
            particle.p.add(this.delta.clone().normalize().multiplyScalar(overlap * -averageMass1));
            otherParticle.p.add(this.delta.normalize().multiplyScalar(overlap * averageMass2));
            this.callback && this.callback(particle, otherParticle);
          }
        }
      }
    };
    return Collision;
  }(Behaviour);

  var CrossZone = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(CrossZone, _Behaviour);
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
    function CrossZone(zone, crossType, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.reset(zone, crossType);
      _this.name = "CrossZone";
      return _this;
    }

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
    var _proto = CrossZone.prototype;
    _proto.reset = function reset(zone, crossType, life, easing) {
      this.zone = zone;
      this.zone.crossType = Util.initValue(crossType, "dead");
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

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
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      this.zone.crossing(particle);
    };
    return CrossZone;
  }(Behaviour);

  /**
   * Alpha behaviour for controlling particle opacity over time.
   * @extends Behaviour
   */
  var Alpha = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Alpha, _Behaviour);
    /**
     * @type {boolean}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Alpha instance.
     * @param {number|Span} [a=1] - The initial alpha value or range.
     * @param {number|Span} [b] - The final alpha value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life=Infinity] - This behaviour's life.
     * @param {string} [easing='easeLinear'] - This behaviour's easing function.
     */
    function Alpha(a, b, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.same = void 0;
      _this.a = void 0;
      _this.b = void 0;
      _this.name = void 0;
      _this.reset(a, b);
      _this.name = "Alpha";
      return _this;
    }

    /**
     * Resets this behaviour's parameters.
     * @param {number|Span} [a=1] - The initial alpha value or range.
     * @param {number|Span} [b] - The final alpha value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life] - This behaviour's life.
     * @param {string} [easing] - This behaviour's easing function.
     */
    var _proto = Alpha.prototype;
    _proto.reset = function reset(a, b, life, easing) {
      this.same = b === null || b === undefined;
      this.a = Span.setSpanValue(Util.initValue(a, 1));
      this.b = Span.setSpanValue(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

    /**
     * Initializes the particle's alpha values.
     * @param {Particle} particle - The particle to initialize.
     */;
    _proto.initialize = function initialize(particle) {
      particle.data.alphaA = this.a.getValue();
      if (this.same) particle.data.alphaB = particle.data.alphaA;else particle.data.alphaB = this.b.getValue();
    }

    /**
     * Applies the alpha behaviour to the particle.
     * @param {Particle} particle - The particle to apply the behaviour to.
     * @param {number} time - The current simulation time.
     * @param {number} index - The index of the particle.
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.alpha = particle.data.alphaB + (particle.data.alphaA - particle.data.alphaB) * this.energy;
      if (particle.alpha < 0.001) particle.alpha = 0;
    };
    return Alpha;
  }(Behaviour);

  /**
   * Scale behaviour for controlling particle size over time.
   * @extends Behaviour
   */
  var Scale = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Scale, _Behaviour);
    /**
     * @type {boolean}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Scale instance.
     * @param {number|Span} [a=1] - The initial scale value or range.
     * @param {number|Span} [b] - The final scale value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life=Infinity] - This behaviour's life.
     * @param {string} [easing='easeLinear'] - This behaviour's easing function.
     */
    function Scale(a, b, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.same = void 0;
      _this.name = void 0;
      _this.reset(a, b);
      _this.name = "Scale";
      return _this;
    }

    /**
     * Resets this behaviour's parameters.
     * @param {number|Span} a - The initial scale value or range.
     * @param {number|Span} [b] - The final scale value or range. If not provided, it will be the same as 'a'.
     * @param {number} [life] - This behaviour's life.
     * @param {string} [easing] - This behaviour's easing function.
     */
    var _proto = Scale.prototype;
    _proto.reset = function reset(a, b, life, easing) {
      this.same = b === null || b === undefined;
      this.a = Span.setSpanValue(Util.initValue(a, 1));
      this.b = Span.setSpanValue(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

    /**
     * Initializes the particle's scale values.
     * @param {Particle} particle - The particle to initialize.
     */;
    _proto.initialize = function initialize(particle) {
      particle.data.scaleA = this.a.getValue();
      particle.data.oldRadius = particle.radius;
      particle.data.scaleB = this.same ? particle.data.scaleA : this.b.getValue();
    }

    /**
     * Applies the scale behaviour to the particle.
     * @param {Particle} particle - The particle to apply the behaviour to.
     * @param {number} time - The current simulation time.
     * @param {number} index - The index of the particle.
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.scale = particle.data.scaleB + (particle.data.scaleA - particle.data.scaleB) * this.energy;
      if (particle.scale < 0.0001) particle.scale = 0;
      particle.radius = particle.data.oldRadius * particle.scale;
    };
    return Scale;
  }(Behaviour);

  /**
   * Rotate behaviour for controlling particle rotation.
   * @extends Behaviour
   */
  var Rotate = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Rotate, _Behaviour);
    /**
     * @type {boolean}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {Span}
     * @private
     */

    /**
     * @type {string}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new Rotate instance.
     * @param {string|number|Span} [influence='Velocity'] - The rotation's influence or initial rotation.
     * @param {string|number|Span} [b] - The final rotation value or range.
     * @param {string} [style='to'] - The style of rotation ('to' or 'add').
     * @param {number} [life=Infinity] - This behaviour's life.
     * @param {string} [easing='easeLinear'] - This behaviour's easing function.
     */
    function Rotate(influence, b, style, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.same = void 0;
      _this.a = void 0;
      _this.b = void 0;
      _this.style = void 0;
      _this.name = void 0;
      _this.reset(influence, b, style);
      _this.name = "Rotate";
      return _this;
    }

    /**
     * Resets this behaviour's parameters.
     * @param {string|number|Span} [a='Velocity'] - The rotation's influence or initial rotation.
     * @param {string|number|Span} [b] - The final rotation value or range.
     * @param {string} [style='to'] - The style of rotation ('to' or 'add').
     * @param {number} [life] - This behaviour's life.
     * @param {string} [easing] - This behaviour's easing function.
     */
    var _proto = Rotate.prototype;
    _proto.reset = function reset(a, b, style, life, easing) {
      this.same = b === null || b === undefined;
      this.a = Span.setSpanValue(Util.initValue(a, "Velocity"));
      this.b = Span.setSpanValue(Util.initValue(b, 0));
      this.style = Util.initValue(style, "to");
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

    /**
     * Initializes the behaviour's parameters for a particle.
     * @param {object} particle - The particle to initialize.
     * @param {number} particle.rotation - The particle's rotation.
     * @param {object} particle.data - The particle's data object.
     */;
    _proto.initialize = function initialize(particle) {
      particle.rotation = this.a.getValue();
      particle.data.rotationA = this.a.getValue();
      if (!this.same) particle.data.rotationB = this.b.getValue();
    }

    /**
     * Applies this behaviour to a particle.
     * @param {object} particle - The particle to apply the behaviour to.
     * @param {number} time - The integrate time (1/ms).
     * @param {number} index - The particle index.
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      if (!this.same) {
        if (this.style === "to" || this.style === "TO" || this.style === "_") {
          particle.rotation += particle.data.rotationB + (particle.data.rotationA - particle.data.rotationB) * this.energy;
        } else {
          particle.rotation += particle.data.rotationB;
        }
      } else if (this.a.a === "V" || this.a.a === "Velocity" || this.a.a === "v") {
        // beta...
        particle.rotation = particle.getDirection();
      }
    };
    return Rotate;
  }(Behaviour);

  var Color = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Color, _Behaviour);
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
    function Color(a, b, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.reset(a, b);
      _this.name = "Color";
      return _this;
    }

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
    var _proto = Color.prototype;
    _proto.reset = function reset(a, b, life, easing) {
      this.a = ArraySpan.createArraySpan(a);
      this.b = ArraySpan.createArraySpan(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.Particle} particle
     */;
    _proto.initialize = function initialize(particle) {
      particle.color = this.a.getValue();
      particle.data.colorA = ColorUtil.hexToRgb(particle.color);
      if (this.b) particle.data.colorB = ColorUtil.hexToRgb(this.b.getValue());
    }

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
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      if (this.b) {
        this.calculate(particle, time, index);
        particle.rgb.r = particle.data.colorB.r + (particle.data.colorA.r - particle.data.colorB.r) * this.energy;
        particle.rgb.g = particle.data.colorB.g + (particle.data.colorA.g - particle.data.colorB.g) * this.energy;
        particle.rgb.b = particle.data.colorB.b + (particle.data.colorA.b - particle.data.colorB.b) * this.energy;
        particle.rgb.r = particle.rgb.r << 0;
        particle.rgb.g = particle.rgb.g << 0;
        particle.rgb.b = particle.rgb.b << 0;
      } else {
        particle.rgb.r = particle.data.colorA.r;
        particle.rgb.g = particle.data.colorA.g;
        particle.rgb.b = particle.data.colorA.b;
      }
    };
    return Color;
  }(Behaviour);

  var CHANGING = "changing";
  var Cyclone = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Cyclone, _Behaviour);
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
    function Cyclone(angle, force, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.setAngleAndForce(angle, force);
      _this.name = "Cyclone";
      return _this;
    }
    var _proto = Cyclone.prototype;
    _proto.setAngleAndForce = function setAngleAndForce(angle, force) {
      this.force = CHANGING;
      this.angle = MathUtil.PI / 2;
      if (angle === "right") {
        this.angle = MathUtil.PI / 2;
      } else if (angle === "left") {
        this.angle = -MathUtil.PI / 2;
      } else if (angle === "random") {
        this.angle = "random";
      } else if (angle instanceof Span) {
        this.angle = "span";
        this.span = angle;
      } else if (angle) {
        this.angle = angle;
      }
      if (String(force).toLowerCase() === "changing" || String(force).toLowerCase() === "chang" || String(force).toLowerCase() === "auto") {
        this.force = CHANGING;
      } else if (force) {
        this.force = force;
      }
    }

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
     */;
    _proto.reset = function reset(angle, force, life, easing) {
      this.angle = MathUtil.PI / 2;
      this.setAngleAndForce(angle, force);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    };
    _proto.initialize = function initialize(particle) {
      if (this.angle === "random") {
        particle.data.cangle = MathUtil.randomAToB(-MathUtil.PI, MathUtil.PI);
      } else if (this.angle === "span") {
        particle.data.cangle = this.span.getValue();
      }
      particle.data.cyclone = new Vector2D(0, 0);
    }

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
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      var length;
      var gradient = particle.v.getGradient();
      if (this.angle === "random" || this.angle === "span") {
        gradient += particle.data.cangle;
      } else {
        gradient += this.angle;
      }
      if (this.force === CHANGING) {
        length = particle.v.length() / 100;
      } else {
        length = this.force;
      }
      particle.data.cyclone.x = length * Math.cos(gradient);
      particle.data.cyclone.y = length * Math.sin(gradient);
      particle.data.cyclone = this.normalizeForce(particle.data.cyclone);
      particle.a.add(particle.data.cyclone);
    };
    return Cyclone;
  }(Behaviour);

  /**
   * The opposite of Attraction - turns the force
   *
   * @class
   * @extends Proton.Attraction
   * @memberof! Proton#
   * @alias Proton.Repulsion
   */
  var Repulsion = /*#__PURE__*/function (_Attraction) {
    _inheritsLoose(Repulsion, _Attraction);
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
    function Repulsion(targetPosition, force, radius, life, easing) {
      var _this;
      _this = _Attraction.call(this, targetPosition, force, radius, life, easing) || this;

      /**
       * The strength of the repulsion force
       * @type {number}
       */
      _this.force *= -1;

      /**
       * The name of the behaviour
       * @type {string}
       */
      _this.name = "Repulsion";
      return _this;
    }

    /**
     * Reset this behaviour's parameters
     *
     * @param {Proton.Vector2D} targetPosition - The new repulsion point coordinates
     * @param {number} [force=100] - The new strength of the repulsion force
     * @param {number} [radius=1000] - The new radius of influence for the repulsion
     * @param {number} [life=Infinity] - The new behaviour's life
     * @param {string} [easing='easeLinear'] - The new behaviour's easing function
     */
    var _proto = Repulsion.prototype;
    _proto.reset = function reset(targetPosition, force, radius, life, easing) {
      _Attraction.prototype.reset.call(this, targetPosition, force, radius, life, easing);
      this.force *= -1;
    };
    return Repulsion;
  }(Attraction);

  var GravityWell = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(GravityWell, _Behaviour);
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
    function GravityWell(centerPoint, force, life, easing) {
      var _this;
      _this = _Behaviour.call(this, life, easing) || this;
      _this.distanceVec = new Vector2D();
      _this.centerPoint = Util.initValue(centerPoint, new Vector2D());
      _this.force = Util.initValue(_this.normalizeValue(force), 100);
      _this.name = "GravityWell";
      return _this;
    }

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
    var _proto = GravityWell.prototype;
    _proto.reset = function reset(centerPoint, force, life, easing) {
      this.distanceVec = new Vector2D();
      this.centerPoint = Util.initValue(centerPoint, new Vector2D());
      this.force = Util.initValue(this.normalizeValue(force), 100);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }

    /**
     * @inheritdoc
     */;
    _proto.initialize = function initialize(particle) {}

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
     */;
    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.distanceVec.set(this.centerPoint.x - particle.p.x, this.centerPoint.y - particle.p.y);
      var distanceSq = this.distanceVec.lengthSq();
      if (distanceSq !== 0) {
        var distance = this.distanceVec.length();
        var factor = this.force * time / (distanceSq * distance);
        particle.v.x += factor * this.distanceVec.x;
        particle.v.y += factor * this.distanceVec.y;
      }
    };
    return GravityWell;
  }(Behaviour);

  var InitializeUtil = {
    initialize: function initialize(emitter, particle, initializes) {
      var length = initializes.length;
      var i;
      for (i = 0; i < length; i++) {
        if (initializes[i] instanceof Initialize) {
          initializes[i].init(emitter, particle);
        } else {
          this.init(emitter, particle, initializes[i]);
        }
      }
      this.bindEmitter(emitter, particle);
    },
    // init
    init: function init(emitter, particle, initialize) {
      PropUtil.setProp(particle, initialize);
      PropUtil.setVectorVal(particle, initialize);
    },
    bindEmitter: function bindEmitter(emitter, particle) {
      if (emitter.bindEmitter) {
        particle.p.add(emitter.p);
        particle.v.add(emitter.v);
        particle.a.add(emitter.a);
        particle.v.rotate(MathUtil.degreeTransform(emitter.rotation));
      }
    }
  };

  var Emitter = /*#__PURE__*/function (_Particle) {
    _inheritsLoose(Emitter, _Particle);
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
    function Emitter(conf) {
      var _this;
      if (conf === void 0) {
        conf = {};
      }
      _this = _Particle.call(this, conf) || this;
      _this.particles = [];
      _this.behaviours = [];
      _this.initializes = [];
      _this.emitTime = 0;
      _this.emitSpeed = 0;
      _this.totalTime = -1;

      /**
       * The friction coefficient for all particle emit by This;
       * @property damping
       * @type {Number}
       * @default 0.006
       */
      _this.damping = 0.006;

      /**
       * If bindEmitter the particles can bind this emitter's property;
       * @property bindEmitter
       * @type {Boolean}
       * @default true
       */
      _this.bindEmitter = true;

      /**
       * The number of particles per second emit (a [particle]/b [s]);
       * @property rate
       * @type {Rate}
       * @default Rate(1, .1)
       */
      _this.rate = new Rate(1, 0.1);
      _this.name = "Emitter";
      _this.id = Puid.id(_this.name);
      return _this;
    }

    /**
     * start emit particle
     * @method emit
     * @param {Number | String} [totalTime] begin emit time;
     * @param {String | boolean} [life] the life of this emitter
     */
    var _proto = Emitter.prototype;
    _proto.emit = function emit(totalTime, life) {
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
     */;
    _proto.stop = function stop() {
      this.totalTime = -1;
      this.emitTime = 0;
      this.stoped = true;
    };
    _proto.preEmit = function preEmit(time) {
      var oldStoped = this.stoped;
      var oldEmitTime = this.emitTime;
      var oldTotalTime = this.totalTime;
      this.stoped = false;
      this.emitTime = 0;
      this.totalTime = time;
      this.rate.init();
      var step = 0.0167;
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
     */;
    _proto.removeAllParticles = function removeAllParticles() {
      var i = this.particles.length;
      while (i--) {
        this.particles[i].dead = true;
      }
    }

    /**
     * add initialize to this emitter
     * @method addSelfInitialize
     */;
    _proto.addSelfInitialize = function addSelfInitialize(initialize) {
      if (initialize["init"]) {
        initialize.init(this);
      }
    }

    /**
     * add the Initialize to particles;
     *
     * you can use initializes array:for example emitter.addInitialize(initialize1,initialize2,initialize3);
     * @method addInitialize
     * @param {Initialize} initialize like this new Radius(1, 12)
     */;
    _proto.addInitialize = function addInitialize() {
      for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }
      var i = rest.length;
      while (i--) {
        this.initializes.push(rest[i]);
      }
    }

    /**
     * remove the Initialize
     * @method removeInitialize
     * @param {Initialize} initialize a initialize
     */;
    _proto.removeInitialize = function removeInitialize(initializer) {
      var index = this.initializes.indexOf(initializer);
      if (index > -1) this.initializes.splice(index, 1);
    }

    /**
     * remove all Initializes
     * @method removeInitializers
     */;
    _proto.removeAllInitializers = function removeAllInitializers() {
      Util.emptyArray(this.initializes);
    }

    /**
     * add the Behaviour to particles;
     *
     * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addBehaviour
     * @param {Behaviour} behaviour like this new Color('random')
     */;
    _proto.addBehaviour = function addBehaviour() {
      for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        rest[_key2] = arguments[_key2];
      }
      var i = arguments.length;
      while (i--) {
        var behaviour = rest[i];
        this.behaviours.push(behaviour);
        if (behaviour.parents) behaviour.parents.push(this);
      }
    }

    /**
     * remove the Behaviour
     * @method removeBehaviour
     * @param {Behaviour} behaviour a behaviour
     */;
    _proto.removeBehaviour = function removeBehaviour(behaviour) {
      var index = this.behaviours.indexOf(behaviour);
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
     */;
    _proto.removeAllBehaviours = function removeAllBehaviours() {
      Util.emptyArray(this.behaviours);
    }

    // emitter update
    ;
    _proto.update = function update(time) {
      this.age += time;
      if (this.age >= this.life || this.dead) this.destroy();
      this.emitting(time);
      this.integrate(time);
    };
    _proto.integrate = function integrate(time) {
      if (!this.parent) return;
      var damping = 1 - this.damping;
      this.parent.integrator.calculate(this, time, damping);
      var length = this.particles.length;
      var i, particle;
      for (i = length - 1; i >= 0; i--) {
        particle = this.particles[i];

        // particle update
        particle.update(time, i);
        this.parent.integrator.calculate(particle, time, damping);
        this.dispatch("PARTICLE_UPDATE", particle);

        // check dead
        if (particle.dead) {
          this.dispatch("PARTICLE_DEAD", particle);
          this.parent.pool.expire(particle);
          this.particles.splice(i, 1);
        }
      }
    };
    _proto.dispatch = function dispatch(event, target) {
      this.parent && this.parent.dispatchEvent(event, target);
      this.bindEvent && this.dispatchEvent(event, target);
    };
    _proto.emitting = function emitting(time) {
      if (this.stoped) return;
      if (this.totalTime === "none") {
        this.emitTime += time;
      } else if (this.totalTime === "once") {
        var i;
        var length = this.rate.getValue(99999);
        if (length > 0) this.emitSpeed = length;
        for (i = 0; i < length; i++) {
          this.createParticle();
        }
        this.totalTime = "none";
      } else {
        this.emitTime += time;
        if (this.emitTime < this.totalTime) {
          var _length = this.rate.getValue(time);
          var _i;
          if (_length > 0) this.emitSpeed = _length;
          for (_i = 0; _i < _length; _i++) {
            this.createParticle();
          }
        }
      }
    }

    /**
     * create single particle;
     *
     * can use emit({x:10},new Gravity(10),{'particleUpdate',fun}) or emit([{x:10},new Initialize],new Gravity(10),{'particleUpdate',fun})
     * @method removeAllParticles
     */;
    _proto.createParticle = function createParticle(initialize, behaviour) {
      var particle = this.parent.pool.get(Particle);
      this.setupParticle(particle, initialize, behaviour);
      this.dispatch("PARTICLE_CREATED", particle);
      return particle;
    };
    _proto.setupParticle = function setupParticle(particle, initialize, behaviour) {
      var initializes = this.initializes;
      var behaviours = this.behaviours;
      if (initialize) initializes = Util.toArray(initialize);
      if (behaviour) behaviours = Util.toArray(behaviour);
      particle.reset();
      InitializeUtil.initialize(this, particle, initializes);
      particle.addBehaviours(behaviours);
      particle.parent = this;
      this.particles.push(particle);
    };
    _proto.remove = function remove() {
      this.stop();
      Util.destroyAll(this.particles);
    }

    /**
     * Destory this Emitter
     * @method destroy
     */;
    _proto.destroy = function destroy() {
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
    };
    return Emitter;
  }(Particle);
  EventDispatcher.bind(Emitter);

  var BehaviourEmitter = /*#__PURE__*/function (_Emitter) {
    _inheritsLoose(BehaviourEmitter, _Emitter);
    /**
     * The BehaviourEmitter class inherits from Proton.Emitter
     *
     * use the BehaviourEmitter you can add behaviours to self;
     * @class Proton.BehaviourEmitter
     * @constructor
     * @param {Object} conf the parameters object;
     */
    function BehaviourEmitter(conf) {
      var _this;
      _this = _Emitter.call(this, conf) || this;
      _this.selfBehaviours = [];
      return _this;
    }

    /**
     * add the Behaviour to emitter;
     *
     * you can use Behaviours array:emitter.addSelfBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addSelfBehaviour
     * @param {Proton.Behaviour} behaviour like this new Proton.Color('random')
     */
    var _proto = BehaviourEmitter.prototype;
    _proto.addSelfBehaviour = function addSelfBehaviour() {
      for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }
      var i,
        length = rest.length;
      for (i = 0; i < length; i++) {
        var behaviour = rest[i];
        this.selfBehaviours.push(behaviour);
        behaviour.initialize(this);
      }
    }

    /**
     * remove the Behaviour for self
     * @method removeSelfBehaviour
     * @param {Proton.Behaviour} behaviour a behaviour
     */;
    _proto.removeSelfBehaviour = function removeSelfBehaviour(behaviour) {
      var index = this.selfBehaviours.indexOf(behaviour);
      if (index > -1) this.selfBehaviours.splice(index, 1);
    };
    _proto.update = function update(time) {
      _Emitter.prototype.update.call(this, time);
      if (!this.sleep) {
        var length = this.selfBehaviours.length;
        var i;
        for (i = 0; i < length; i++) {
          this.selfBehaviours[i].applyBehaviour(this, time, i);
        }
      }
    };
    return BehaviourEmitter;
  }(Emitter);

  var FollowEmitter = /*#__PURE__*/function (_Emitter) {
    _inheritsLoose(FollowEmitter, _Emitter);
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
    function FollowEmitter(mouseTarget, ease, conf) {
      var _this;
      _this = _Emitter.call(this, conf) || this;
      _this.mouseTarget = Util.initValue(mouseTarget, window);
      _this.ease = Util.initValue(ease, 0.7);
      _this._allowEmitting = false;
      _this.initEventHandler();
      return _this;
    }
    var _proto = FollowEmitter.prototype;
    _proto.initEventHandler = function initEventHandler() {
      var _this2 = this;
      this.mousemoveHandler = function (e) {
        return _this2.mousemove.call(_this2, e);
      };
      this.mousedownHandler = function (e) {
        return _this2.mousedown.call(_this2, e);
      };
      this.mouseupHandler = function (e) {
        return _this2.mouseup.call(_this2, e);
      };
      this.mouseTarget.addEventListener("mousemove", this.mousemoveHandler, false);
    }

    /**
     * start emit particle
     * @method emit
     */;
    _proto.emit = function emit() {
      this._allowEmitting = true;
    }

    /**
     * stop emiting
     * @method stop
     */;
    _proto.stop = function stop() {
      this._allowEmitting = false;
    };
    _proto.mousemove = function mousemove(e) {
      if (e.layerX || e.layerX === 0) {
        this.p.x += (e.layerX - this.p.x) * this.ease;
        this.p.y += (e.layerY - this.p.y) * this.ease;
      } else if (e.offsetX || e.offsetX === 0) {
        this.p.x += (e.offsetX - this.p.x) * this.ease;
        this.p.y += (e.offsetY - this.p.y) * this.ease;
      }
      if (this._allowEmitting) _Emitter.prototype.emit.call(this, "once");
    }

    /**
     * Destory this Emitter
     * @method destroy
     */;
    _proto.destroy = function destroy() {
      _Emitter.prototype.destroy.call(this);
      this.mouseTarget.removeEventListener("mousemove", this.mousemoveHandler, false);
    };
    return FollowEmitter;
  }(Emitter);

  var Types = {
    /**
     * Determine whether it is a picture object
     *
     * @return {boolean} is or no
     */
    isImage: function isImage(obj) {
      if (!obj) return false;
      if (obj.__isImage) return true;
      var tagName = ("" + obj.tagName).toUpperCase();
      var nodeName = ("" + obj.nodeName).toUpperCase();
      if (nodeName === "IMG" || tagName === "IMG") {
        obj.__isImage = true;
        return true;
      }
      return false;
    },
    /**
     * Determine whether it is a string object
     *
     * @return {boolean} is or no
     */
    isString: function isString(obj) {
      return typeof obj === "string";
    }
  };

  var BaseRenderer = /*#__PURE__*/function () {
    function BaseRenderer(element, stroke) {
      this.pool = new Pool();
      this.element = element;
      this.stroke = stroke;
      this.circleConf = {
        isCircle: true
      };
      this.initEventHandler();
      this.name = "BaseRenderer";
    }
    var _proto = BaseRenderer.prototype;
    _proto.setStroke = function setStroke(color, thinkness) {
      if (color === void 0) {
        color = "#000000";
      }
      if (thinkness === void 0) {
        thinkness = 1;
      }
      this.stroke = {
        color: color,
        thinkness: thinkness
      };
    };
    _proto.initEventHandler = function initEventHandler() {
      var _this = this;
      this._protonUpdateHandler = function () {
        _this.onProtonUpdate.call(_this);
      };
      this._protonUpdateAfterHandler = function () {
        _this.onProtonUpdateAfter.call(_this);
      };
      this._emitterAddedHandler = function (emitter) {
        _this.onEmitterAdded.call(_this, emitter);
      };
      this._emitterRemovedHandler = function (emitter) {
        _this.onEmitterRemoved.call(_this, emitter);
      };
      this._particleCreatedHandler = function (particle) {
        _this.onParticleCreated.call(_this, particle);
      };
      this._particleUpdateHandler = function (particle) {
        _this.onParticleUpdate.call(_this, particle);
      };
      this._particleDeadHandler = function (particle) {
        _this.onParticleDead.call(_this, particle);
      };
    };
    _proto.init = function init(proton) {
      this.parent = proton;
      proton.addEventListener("PROTON_UPDATE", this._protonUpdateHandler);
      proton.addEventListener("PROTON_UPDATE_AFTER", this._protonUpdateAfterHandler);
      proton.addEventListener("EMITTER_ADDED", this._emitterAddedHandler);
      proton.addEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);
      proton.addEventListener("PARTICLE_CREATED", this._particleCreatedHandler);
      proton.addEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
      proton.addEventListener("PARTICLE_DEAD", this._particleDeadHandler);
    };
    _proto.resize = function resize(width, height) {};
    _proto.destroy = function destroy() {
      this.remove();
      this.pool.destroy();
      this.pool = null;
      this.element = null;
      this.stroke = null;
    };
    _proto.remove = function remove(proton) {
      this.parent.removeEventListener("PROTON_UPDATE", this._protonUpdateHandler);
      this.parent.removeEventListener("PROTON_UPDATE_AFTER", this._protonUpdateAfterHandler);
      this.parent.removeEventListener("EMITTER_ADDED", this._emitterAddedHandler);
      this.parent.removeEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);
      this.parent.removeEventListener("PARTICLE_CREATED", this._particleCreatedHandler);
      this.parent.removeEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
      this.parent.removeEventListener("PARTICLE_DEAD", this._particleDeadHandler);
      this.parent = null;
    };
    _proto.onProtonUpdate = function onProtonUpdate() {};
    _proto.onProtonUpdateAfter = function onProtonUpdateAfter() {};
    _proto.onEmitterAdded = function onEmitterAdded(emitter) {};
    _proto.onEmitterRemoved = function onEmitterRemoved(emitter) {};
    _proto.onParticleCreated = function onParticleCreated(particle) {};
    _proto.onParticleUpdate = function onParticleUpdate(particle) {};
    _proto.onParticleDead = function onParticleDead(particle) {};
    return BaseRenderer;
  }();

  /**
   * CanvasRenderer class for rendering particles on a canvas element.
   * @extends BaseRenderer
   */
  var CanvasRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(CanvasRenderer, _BaseRenderer);
    /**
     * @type {object|null}
     * @private
     */

    /**
     * @type {CanvasRenderingContext2D}
     * @private
     */

    /**
     * @type {object}
     * @private
     */

    /**
     * @type {string}
     */

    /**
     * Creates a new CanvasRenderer instance.
     * @param {HTMLCanvasElement} element - The canvas element to render on.
     */
    function CanvasRenderer(element) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = void 0;
      _this.context = void 0;
      _this.bufferCache = void 0;
      _this.name = void 0;
      _this.stroke = null;
      _this.context = _this.element.getContext("2d");
      _this.bufferCache = {};
      _this.name = "CanvasRenderer";
      return _this;
    }

    /**
     * Resizes the canvas element.
     * @param {number} width - The new width of the canvas.
     * @param {number} height - The new height of the canvas.
     */
    var _proto = CanvasRenderer.prototype;
    _proto.resize = function resize(width, height) {
      this.element.width = width;
      this.element.height = height;
    }

    /**
     * Clears the canvas on Proton update.
     */;
    _proto.onProtonUpdate = function onProtonUpdate() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
    }

    /**
     * Handles particle creation.
     * @param {object} particle - The created particle.
     */;
    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        particle.color = particle.color || "#ff0000";
      }
    }

    /**
     * Handles particle updates.
     * @param {object} particle - The updated particle.
     */;
    _proto.onParticleUpdate = function onParticleUpdate(particle) {
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
     */;
    _proto.onParticleDead = function onParticleDead(particle) {
      particle.body = null;
    }

    /**
     * Adds an image to the particle body.
     * @param {HTMLImageElement} img - The image to add.
     * @param {object} particle - The particle to add the image to.
     * @private
     */;
    _proto.addImg2Body = function addImg2Body(img, particle) {
      particle.body = img;
    }

    /**
     * Draws an image particle.
     * @param {object} particle - The particle to draw.
     * @private
     */;
    _proto.drawImage = function drawImage(particle) {
      var w = particle.body.width * particle.scale | 0;
      var h = particle.body.height * particle.scale | 0;
      var x = particle.p.x - w / 2;
      var y = particle.p.y - h / 2;
      if (!!particle.color) {
        if (!particle.data["buffer"]) particle.data.buffer = this.createBuffer(particle.body);
        var bufContext = particle.data.buffer.getContext("2d");
        bufContext.clearRect(0, 0, particle.data.buffer.width, particle.data.buffer.height);
        bufContext.globalAlpha = particle.alpha;
        bufContext.drawImage(particle.body, 0, 0);
        bufContext.globalCompositeOperation = "source-atop";
        bufContext.fillStyle = ColorUtil.rgbToHex(particle.rgb);
        bufContext.fillRect(0, 0, particle.data.buffer.width, particle.data.buffer.height);
        bufContext.globalCompositeOperation = "source-over";
        bufContext.globalAlpha = 1;
        this.context.drawImage(particle.data.buffer, 0, 0, particle.data.buffer.width, particle.data.buffer.height, x, y, w, h);
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
     */;
    _proto.drawCircle = function drawCircle(particle) {
      if (particle.rgb) {
        this.context.fillStyle = "rgba(" + particle.rgb.r + "," + particle.rgb.g + "," + particle.rgb.b + "," + particle.alpha + ")";
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
     */;
    _proto.createBuffer = function createBuffer(image) {
      if (Types.isImage(image)) {
        var size = image.width + "_" + image.height;
        var canvas = this.bufferCache[size];
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
     */;
    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);
      this.stroke = null;
      this.context = null;
      this.bufferCache = null;
    };
    return CanvasRenderer;
  }(BaseRenderer);

  /**
   * Represents a DOM-based renderer for particle systems.
   * @extends BaseRenderer
   */
  var DomRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(DomRenderer, _BaseRenderer);
    /**
     * Creates a new DomRenderer instance.
     * @param {HTMLElement} element - The HTML element to render to.
     */
    function DomRenderer(element) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = null;
      _this.transform3d = false;
      _this.pool.create = function (body, particle) {
        return _this.createBody(body, particle);
      };
      _this.addImg2Body = _this.addImg2Body.bind(_assertThisInitialized(_this));
      _this.name = "DomRenderer";
      return _this;
    }
    var _proto = DomRenderer.prototype;
    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        particle.body = this.pool.get(this.circleConf, particle);
        this.element.appendChild(particle.body);
      }
    };
    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (this.bodyReady(particle)) {
        if (this.transform3d) {
          DomUtil.transform3d(particle.body, particle.p.x, particle.p.y, particle.scale, particle.rotation);
        } else {
          DomUtil.transform(particle.body, particle.p.x, particle.p.y, particle.scale, particle.rotation);
        }
        particle.body.style.opacity = particle.alpha;
        if (particle.body.isCircle) {
          particle.body.style.backgroundColor = particle.color || "#ff0000";
        }
      }
    };
    _proto.onParticleDead = function onParticleDead(particle) {
      if (this.bodyReady(particle)) {
        this.element.removeChild(particle.body);
        this.pool.expire(particle.body);
        particle.body = null;
      }
    };
    _proto.bodyReady = function bodyReady(particle) {
      return typeof particle.body === "object" && particle.body && !particle.body.isInner;
    }

    // private method
    ;
    _proto.addImg2Body = function addImg2Body(img, particle) {
      if (particle.dead) return;
      particle.body = this.pool.get(img, particle);
      DomUtil.resize(particle.body, img.width, img.height);
      this.element.appendChild(particle.body);
    };
    _proto.createBody = function createBody(body, particle) {
      if (body.isCircle) return this.createCircle(particle);
      return this.createSprite(body, particle);
    }

    // private methods
    ;
    _proto.createCircle = function createCircle(particle) {
      var dom = DomUtil.createDiv(particle.id + "_dom", 2 * particle.radius, 2 * particle.radius);
      dom.style.borderRadius = particle.radius + "px";
      if (this.stroke) {
        dom.style.borderColor = this.stroke.color;
        dom.style.borderWidth = this.stroke.thinkness + "px";
      }
      dom.isCircle = true;
      return dom;
    };
    _proto.createSprite = function createSprite(body, particle) {
      var url = typeof body === "string" ? body : body.src;
      var dom = DomUtil.createDiv(particle.id + "_dom", body.width, body.height);
      dom.style.backgroundImage = "url(" + url + ")";
      return dom;
    }

    /**
     * Destroys the renderer and cleans up resources.
     */;
    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);
      this.stroke = null;
    };
    return DomRenderer;
  }(BaseRenderer);

  var EaselRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(EaselRenderer, _BaseRenderer);
    function EaselRenderer(element, stroke) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = stroke;
      _this.name = "EaselRenderer";
      return _this;
    }
    var _proto = EaselRenderer.prototype;
    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        this.createSprite(particle);
      } else {
        this.createCircle(particle);
      }
      this.element.addChild(particle.body);
    };
    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (particle.body) {
        particle.body.x = particle.p.x;
        particle.body.y = particle.p.y;
        particle.body.alpha = particle.alpha;
        particle.body.scaleX = particle.body.scaleY = particle.scale;
        particle.body.rotation = particle.rotation;
      }
    };
    _proto.onParticleDead = function onParticleDead(particle) {
      if (particle.body) {
        particle.body.parent && particle.body.parent.removeChild(particle.body);
        this.pool.expire(particle.body);
        particle.body = null;
      }
      if (particle.graphics) this.pool.expire(particle.graphics);
    }

    // private
    ;
    _proto.createSprite = function createSprite(particle) {
      particle.body = this.pool.get(particle.body);
      if (particle.body.parent) return;
      if (particle.body["image"]) {
        particle.body.regX = particle.body.image.width / 2;
        particle.body.regY = particle.body.image.height / 2;
      }
    };
    _proto.createCircle = function createCircle(particle) {
      var graphics = this.pool.get(window.createjs.Graphics);
      if (this.stroke) {
        if (Types.isString(this.stroke)) {
          graphics.beginStroke(this.stroke);
        } else {
          graphics.beginStroke("#000000");
        }
      }
      graphics.beginFill(particle.color || "#ff0000").drawCircle(0, 0, particle.radius);
      var shape = this.pool.get(window.createjs.Shape, [graphics]);
      particle.body = shape;
      particle.graphics = graphics;
    };
    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);
      this.stroke = null;
    };
    return EaselRenderer;
  }(BaseRenderer);

  /**
   * Represents a pixel-based renderer for particle systems.
   * @extends BaseRenderer
   */
  var PixelRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(PixelRenderer, _BaseRenderer);
    /**
     * Creates a new PixelRenderer instance.
     * @param {HTMLCanvasElement} element - The canvas element to render to.
     * @param {Rectangle} [rectangle] - The rectangle defining the rendering area.
     */
    function PixelRenderer(element, rectangle) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;
      _this.context = _this.element.getContext("2d");
      _this.imageData = null;
      _this.rectangle = rectangle;
      _this.createImageData(rectangle);
      _this.name = "PixelRenderer";
      return _this;
    }
    var _proto = PixelRenderer.prototype;
    _proto.resize = function resize(width, height) {
      this.element.width = width;
      this.element.height = height;
    };
    _proto.createImageData = function createImageData(rectangle) {
      this.rectangle = rectangle ? rectangle : new Rectangle(0, 0, this.element.width, this.element.height);
      this.imageData = this.context.createImageData(this.rectangle.width, this.rectangle.height);
      this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
    };
    _proto.onProtonUpdate = function onProtonUpdate() {
      this.context.clearRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
      this.imageData = this.context.getImageData(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
    };
    _proto.onProtonUpdateAfter = function onProtonUpdateAfter() {
      this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
    };
    _proto.onParticleCreated = function onParticleCreated(particle) {};
    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (this.imageData) {
        this.setPixel(this.imageData, particle.p.x - this.rectangle.x >> 0, particle.p.y - this.rectangle.y >> 0, particle);
      }
    };
    _proto.setPixel = function setPixel(imagedata, x, y, particle) {
      var rgb = particle.rgb;
      if (x < 0 || x > this.element.width || y < 0 || y > this.element.height) return;
      var i = ((y >> 0) * imagedata.width + (x >> 0)) * 4;
      imagedata.data[i] = rgb.r;
      imagedata.data[i + 1] = rgb.g;
      imagedata.data[i + 2] = rgb.b;
      imagedata.data[i + 3] = particle.alpha * 255;
    };
    _proto.onParticleDead = function onParticleDead(particle) {}

    /**
     * Destroys the renderer and cleans up resources.
     */;
    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);
      this.stroke = null;
      this.context = null;
      this.imageData = null;
      this.rectangle = null;
    };
    return PixelRenderer;
  }(BaseRenderer);

  var PIXIClass;

  /**
   * Represents a PIXI-based renderer for particle systems.
   * @extends BaseRenderer
   */
  var PixiRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(PixiRenderer, _BaseRenderer);
    /**
     * Creates a new PixiRenderer instance.
     * @param {PIXI.Container} element - The PIXI container to render to.
     * @param {string|number} [stroke] - The stroke color for particles.
     */
    function PixiRenderer(element, stroke) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = stroke;
      _this.color = false;
      _this.setColor = false;
      _this.blendMode = null;
      _this.pool.create = function (body, particle) {
        return _this.createBody(body, particle);
      };
      _this.setPIXI(window.PIXI);
      _this.name = "PixiRenderer";
      return _this;
    }
    var _proto = PixiRenderer.prototype;
    _proto.setPIXI = function setPIXI(PIXI) {
      try {
        PIXIClass = PIXI || {
          Sprite: {}
        };
        this.createFromImage = PIXIClass.Sprite.from || PIXIClass.Sprite.fromImage;
      } catch (e) {}
    };
    _proto.onProtonUpdate = function onProtonUpdate() {}

    /**
     * @param particle
     */;
    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        particle.body = this.pool.get(particle.body, particle);
      } else {
        particle.body = this.pool.get(this.circleConf, particle);
      }
      if (this.blendMode) {
        particle.body.blendMode = this.blendMode;
      }
      this.element.addChild(particle.body);
    }

    /**
     * @param particle
     */;
    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      this.transform(particle, particle.body);
      if (this.setColor === true || this.color === true) {
        particle.body.tint = ColorUtil.getHex16FromParticle(particle);
      }
    }

    /**
     * @param particle
     */;
    _proto.onParticleDead = function onParticleDead(particle) {
      this.element.removeChild(particle.body);
      this.pool.expire(particle.body);
      particle.body = null;
    };
    _proto.transform = function transform(particle, target) {
      target.x = particle.p.x;
      target.y = particle.p.y;
      target.alpha = particle.alpha;
      target.scale.x = particle.scale;
      target.scale.y = particle.scale;

      // using cached version of MathUtil.PI_180 for slight performance increase.
      target.rotation = particle.rotation * MathUtil.PI_180; // MathUtil.PI_180;
    };
    _proto.createBody = function createBody(body, particle) {
      if (body.isCircle) return this.createCircle(particle);else return this.createSprite(body);
    };
    _proto.createSprite = function createSprite(body) {
      var sprite = body.isInner ? this.createFromImage(body.src) : new PIXIClass.Sprite(body);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      return sprite;
    };
    _proto.createCircle = function createCircle(particle) {
      var graphics = new PIXIClass.Graphics();
      if (this.stroke) {
        var stroke = Types.isString(this.stroke) ? this.stroke : 0x000000;
        graphics.beginStroke(stroke);
      }
      graphics.beginFill(particle.color || 0x008ced);
      graphics.drawCircle(0, 0, particle.radius);
      graphics.endFill();
      return graphics;
    }

    /**
     * Destroys the renderer and cleans up resources.
     * @param {Array<Particle>} particles - The particles to clean up.
     */;
    _proto.destroy = function destroy(particles) {
      _BaseRenderer.prototype.destroy.call(this);
      var i = particles.length;
      while (i--) {
        var particle = particles[i];
        if (particle.body) {
          this.element.removeChild(particle.body);
        }
      }
    };
    return PixiRenderer;
  }(BaseRenderer);

  var MStack = /*#__PURE__*/function () {
    function MStack() {
      this.mats = [];
      this.size = 0;
      for (var i = 0; i < 20; i++) {
        this.mats.push(Mat3.create([0, 0, 0, 0, 0, 0, 0, 0, 0]));
      }
    }
    var _proto = MStack.prototype;
    _proto.set = function set(m, i) {
      if (i === 0) Mat3.set(m, this.mats[0]);else Mat3.multiply(this.mats[i - 1], m, this.mats[i]);
      this.size = Math.max(this.size, i + 1);
    };
    _proto.push = function push(m) {
      if (this.size === 0) Mat3.set(m, this.mats[0]);else Mat3.multiply(this.mats[this.size - 1], m, this.mats[this.size]);
      this.size++;
    };
    _proto.pop = function pop() {
      if (this.size > 0) this.size--;
    };
    _proto.top = function top() {
      return this.mats[this.size - 1];
    };
    return MStack;
  }();

  /**
   * Represents a WebGL-based renderer for particle systems.
   * @extends BaseRenderer
   */
  var WebGLRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(WebGLRenderer, _BaseRenderer);
    /**
     * Creates a new WebGLRenderer instance.
     * @param {HTMLCanvasElement} element - The canvas element to render to.
     */
    function WebGLRenderer(element) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;
      _this.gl = _this.element.getContext("experimental-webgl", {
        antialias: true,
        stencil: false,
        depth: false
      });
      if (!_this.gl) alert("Sorry your browser do not suppest WebGL!");
      _this.initVar();
      _this.setMaxRadius();
      _this.initShaders();
      _this.initBuffers();
      _this.gl.blendEquation(_this.gl.FUNC_ADD);
      _this.gl.blendFunc(_this.gl.SRC_ALPHA, _this.gl.ONE_MINUS_SRC_ALPHA);
      _this.gl.enable(_this.gl.BLEND);
      _this.addImg2Body = _this.addImg2Body.bind(_assertThisInitialized(_this));
      _this.name = "WebGLRenderer";
      return _this;
    }
    var _proto = WebGLRenderer.prototype;
    _proto.init = function init(proton) {
      _BaseRenderer.prototype.init.call(this, proton);
      this.resize(this.element.width, this.element.height);
    };
    _proto.resize = function resize(width, height) {
      this.umat[4] = -2;
      this.umat[7] = 1;
      this.smat[0] = 1 / width;
      this.smat[4] = 1 / height;
      this.mstack.set(this.umat, 0);
      this.mstack.set(this.smat, 1);
      this.gl.viewport(0, 0, width, height);
      this.element.width = width;
      this.element.height = height;
    };
    _proto.setMaxRadius = function setMaxRadius(radius) {
      this.circleCanvasURL = this.createCircle(radius);
    };
    _proto.getVertexShader = function getVertexShader() {
      var vsSource = ["uniform vec2 viewport;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 tMat;", "varying vec2 vTextureCoord;", "varying float alpha;", "void main() {", "vec3 v = tMat * vec3(aVertexPosition, 1.0);", "gl_Position = vec4(v.x, v.y, 0, 1);", "vTextureCoord = aTextureCoord;", "alpha = tMat[0][2];", "}"].join("\n");
      return vsSource;
    };
    _proto.getFragmentShader = function getFragmentShader() {
      var fsSource = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying float alpha;", "uniform sampler2D uSampler;", "uniform vec4 color;", "uniform bool useTexture;", "uniform vec3 uColor;", "void main() {", "vec4 textureColor = texture2D(uSampler, vTextureCoord);", "gl_FragColor = textureColor * vec4(uColor, 1.0);", "gl_FragColor.w *= alpha;", "}"].join("\n");
      return fsSource;
    };
    _proto.initVar = function initVar() {
      this.mstack = new MStack();
      this.umat = Mat3.create([2, 0, 1, 0, -2, 0, -1, 1, 1]);
      this.smat = Mat3.create([1 / 100, 0, 1, 0, 1 / 100, 0, 0, 0, 1]);
      this.texturebuffers = {};
    };
    _proto.blendEquation = function blendEquation(A) {
      this.gl.blendEquation(this.gl[A]);
    };
    _proto.blendFunc = function blendFunc(A, B) {
      this.gl.blendFunc(this.gl[A], this.gl[B]);
    };
    _proto.getShader = function getShader(gl, str, fs) {
      var shader = fs ? gl.createShader(gl.FRAGMENT_SHADER) : gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(shader, str);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };
    _proto.initShaders = function initShaders() {
      var fragmentShader = this.getShader(this.gl, this.getFragmentShader(), true);
      var vertexShader = this.getShader(this.gl, this.getVertexShader(), false);
      this.sprogram = this.gl.createProgram();
      this.gl.attachShader(this.sprogram, vertexShader);
      this.gl.attachShader(this.sprogram, fragmentShader);
      this.gl.linkProgram(this.sprogram);
      if (!this.gl.getProgramParameter(this.sprogram, this.gl.LINK_STATUS)) alert("Could not initialise shaders");
      this.gl.useProgram(this.sprogram);
      this.sprogram.vpa = this.gl.getAttribLocation(this.sprogram, "aVertexPosition");
      this.sprogram.tca = this.gl.getAttribLocation(this.sprogram, "aTextureCoord");
      this.gl.enableVertexAttribArray(this.sprogram.tca);
      this.gl.enableVertexAttribArray(this.sprogram.vpa);
      this.sprogram.tMatUniform = this.gl.getUniformLocation(this.sprogram, "tMat");
      this.sprogram.samplerUniform = this.gl.getUniformLocation(this.sprogram, "uSampler");
      this.sprogram.useTex = this.gl.getUniformLocation(this.sprogram, "useTexture");
      this.sprogram.color = this.gl.getUniformLocation(this.sprogram, "uColor");
      this.gl.uniform1i(this.sprogram.useTex, 1);
    };
    _proto.initBuffers = function initBuffers() {
      var vs = [0, 3, 1, 0, 2, 3];
      var idx;
      this.unitIBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vs), this.gl.STATIC_DRAW);
      var i;
      var ids = [];
      for (i = 0; i < 100; i++) {
        ids.push(i);
      }
      idx = new Uint16Array(ids);
      this.unitI33 = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
      ids = [];
      for (i = 0; i < 100; i++) {
        ids.push(i, i + 1, i + 2);
      }
      idx = new Uint16Array(ids);
      this.stripBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.stripBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
    };
    _proto.createCircle = function createCircle(raidus) {
      this.circleCanvasRadius = WebGLUtil.nhpot(Util.initValue(raidus, 32));
      var canvas = DomUtil.createCanvas("circle_canvas", this.circleCanvasRadius * 2, this.circleCanvasRadius * 2);
      var context = canvas.getContext("2d");
      context.beginPath();
      context.arc(this.circleCanvasRadius, this.circleCanvasRadius, this.circleCanvasRadius, 0, Math.PI * 2, true);
      context.closePath();
      context.fillStyle = "#FFF";
      context.fill();
      return canvas.toDataURL();
    };
    _proto.drawImg2Canvas = function drawImg2Canvas(particle) {
      var _w = particle.body.width;
      var _h = particle.body.height;
      var _width = WebGLUtil.nhpot(particle.body.width);
      var _height = WebGLUtil.nhpot(particle.body.height);
      var _scaleX = particle.body.width / _width;
      var _scaleY = particle.body.height / _height;
      if (!this.texturebuffers[particle.data.src]) this.texturebuffers[particle.data.src] = [this.gl.createTexture(), this.gl.createBuffer(), this.gl.createBuffer()];
      particle.data.texture = this.texturebuffers[particle.data.src][0];
      particle.data.vcBuffer = this.texturebuffers[particle.data.src][1];
      particle.data.tcBuffer = this.texturebuffers[particle.data.src][2];
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.tcBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _scaleX, 0.0, 0.0, _scaleY, _scaleY, _scaleY]), this.gl.STATIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.vcBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _w, 0.0, 0.0, _h, _w, _h]), this.gl.STATIC_DRAW);
      var context = particle.data.canvas.getContext("2d");
      var data = context.getImageData(0, 0, _width, _height);
      this.gl.bindTexture(this.gl.TEXTURE_2D, particle.data.texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
      this.gl.generateMipmap(this.gl.TEXTURE_2D);
      particle.data.textureLoaded = true;
      particle.data.textureWidth = _w;
      particle.data.textureHeight = _h;
    };
    _proto.onProtonUpdate = function onProtonUpdate() {
      // this.gl.clearColor(0, 0, 0, 1);
      // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    };
    _proto.onParticleCreated = function onParticleCreated(particle) {
      particle.data.textureLoaded = false;
      particle.data.tmat = Mat3.create();
      particle.data.tmat[8] = 1;
      particle.data.imat = Mat3.create();
      particle.data.imat[8] = 1;
      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        ImgUtil.getImgFromCache(this.circleCanvasURL, this.addImg2Body, particle);
        particle.data.oldScale = particle.radius / this.circleCanvasRadius;
      }
    }

    // private
    ;
    _proto.addImg2Body = function addImg2Body(img, particle) {
      if (particle.dead) return;
      particle.body = img;
      particle.data.src = img.src;
      particle.data.canvas = ImgUtil.getCanvasFromCache(img);
      particle.data.oldScale = 1;
      this.drawImg2Canvas(particle);
    };
    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (particle.data.textureLoaded) {
        this.updateMatrix(particle);
        this.gl.uniform3f(this.sprogram.color, particle.rgb.r / 255, particle.rgb.g / 255, particle.rgb.b / 255);
        this.gl.uniformMatrix3fv(this.sprogram.tMatUniform, false, this.mstack.top());
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.vcBuffer);
        this.gl.vertexAttribPointer(this.sprogram.vpa, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.tcBuffer);
        this.gl.vertexAttribPointer(this.sprogram.tca, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, particle.data.texture);
        this.gl.uniform1i(this.sprogram.samplerUniform, 0);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
        this.mstack.pop();
      }
    };
    _proto.onParticleDead = function onParticleDead(particle) {};
    _proto.updateMatrix = function updateMatrix(particle) {
      var moveOriginMatrix = WebGLUtil.makeTranslation(-particle.data.textureWidth / 2, -particle.data.textureHeight / 2);
      var translationMatrix = WebGLUtil.makeTranslation(particle.p.x, particle.p.y);
      var angel = particle.rotation * MathUtil.PI_180;
      var rotationMatrix = WebGLUtil.makeRotation(angel);
      var scale = particle.scale * particle.data.oldScale;
      var scaleMatrix = WebGLUtil.makeScale(scale, scale);
      var matrix = WebGLUtil.matrixMultiply(moveOriginMatrix, scaleMatrix);
      matrix = WebGLUtil.matrixMultiply(matrix, rotationMatrix);
      matrix = WebGLUtil.matrixMultiply(matrix, translationMatrix);
      Mat3.inverse(matrix, particle.data.imat);
      matrix[2] = particle.alpha;
      this.mstack.push(matrix);
    };
    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);
      this.gl = null;
      this.mstack = null;
      this.umat = null;
      this.smat = null;
      this.texturebuffers = null;
    };
    return WebGLRenderer;
  }(BaseRenderer);

  /**
   * Represents a custom renderer that extends the BaseRenderer.
   * @extends BaseRenderer
   */
  var CustomRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(CustomRenderer, _BaseRenderer);
    /**
     * Creates a new CustomRenderer instance.
     * @param {HTMLElement} element - The HTML element to render to.
     */
    function CustomRenderer(element) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;

      /**
       * The name of the renderer.
       * @type {string}
       */
      _this.name = "CustomRenderer";
      return _this;
    }
    return CustomRenderer;
  }(BaseRenderer);

  /**
   * Represents a line zone for particle systems.
   * @extends Zone
   */
  var LineZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(LineZone, _Zone);
    /**
     * Creates a new LineZone.
     * @param {number} x1 - The x-coordinate of the first point.
     * @param {number} y1 - The y-coordinate of the first point.
     * @param {number} [x2] - The x-coordinate of the second point.
     * @param {number} [y2] - The y-coordinate of the second point.
     * @param {string} [direction=">"] - The direction of the line.
     */
    function LineZone(x1, y1, x2, y2, direction) {
      var _this;
      if (direction === void 0) {
        direction = ">";
      }
      _this = _Zone.call(this) || this;
      if (x2 - x1 >= 0) {
        _this.x1 = x1;
        _this.y1 = y1;
        _this.x2 = x2;
        _this.y2 = y2;
      } else {
        _this.x1 = x2;
        _this.y1 = y2;
        _this.x2 = x1;
        _this.y2 = y1;
      }
      _this.dx = _this.x2 - _this.x1;
      _this.dy = _this.y2 - _this.y1;
      _this.minx = Math.min(_this.x1, _this.x2);
      _this.miny = Math.min(_this.y1, _this.y2);
      _this.maxx = Math.max(_this.x1, _this.x2);
      _this.maxy = Math.max(_this.y1, _this.y2);
      _this.dot = _this.x2 * _this.y1 - _this.x1 * _this.y2;
      _this.xxyy = _this.dx * _this.dx + _this.dy * _this.dy;
      _this.gradient = _this.getGradient();
      _this.length = _this.getLength();
      _this.direction = Util.initValue(direction, ">");
      return _this;
    }

    /**
     * Gets a random position on the line.
     * @returns {Vector2D} A vector representing the random position.
     */
    var _proto = LineZone.prototype;
    _proto.getPosition = function getPosition() {
      this.random = Math.random();
      this.vector.x = this.x1 + this.random * this.length * Math.cos(this.gradient);
      this.vector.y = this.y1 + this.random * this.length * Math.sin(this.gradient);
      return this.vector;
    }

    /**
     * Determines which side of the line a point is on.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @returns {boolean} True if the point is on the positive side of the line, false otherwise.
     */;
    _proto.getDirection = function getDirection(x, y) {
      var A = this.dy;
      var B = -this.dx;
      var C = this.dot;
      var D = B === 0 ? 1 : B;
      if ((A * x + B * y + C) * D > 0) return true;else return false;
    }

    /**
     * Calculates the distance of a point from the line.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @returns {number} The distance from the point to the line.
     */;
    _proto.getDistance = function getDistance(x, y) {
      var A = this.dy;
      var B = -this.dx;
      var C = this.dot;
      var D = A * x + B * y + C;
      return D / Math.sqrt(this.xxyy);
    }

    /**
     * Calculates the symmetric vector of a given vector with respect to the line.
     * @param {Vector2D} v - The vector to reflect.
     * @returns {Vector2D} The reflected vector.
     */;
    _proto.getSymmetric = function getSymmetric(v) {
      var tha2 = v.getGradient();
      var tha1 = this.getGradient();
      var tha = 2 * (tha1 - tha2);
      var oldx = v.x;
      var oldy = v.y;
      v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
      v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
      return v;
    }

    /**
     * Gets the gradient (angle) of the line.
     * @returns {number} The gradient of the line in radians.
     */;
    _proto.getGradient = function getGradient() {
      return Math.atan2(this.dy, this.dx);
    }

    /**
     * Checks if a particle is outside the range of the line.
     * @param {Particle} particle - The particle to check.
     * @returns {boolean} True if the particle is within range, false otherwise.
     */;
    _proto.rangeOut = function rangeOut(particle) {
      var angle = Math.abs(this.getGradient());
      if (angle <= MathUtil.PI / 4) {
        if (particle.p.x <= this.maxx && particle.p.x >= this.minx) return true;
      } else {
        if (particle.p.y <= this.maxy && particle.p.y >= this.miny) return true;
      }
      return false;
    }

    /**
     * Gets the length of the line.
     * @returns {number} The length of the line.
     */;
    _proto.getLength = function getLength() {
      return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }

    /**
     * Handles particle crossing behavior based on the crossType.
     * @param {Particle} particle - The particle to check for crossing.
     */;
    _proto.crossing = function crossing(particle) {
      if (this.crossType === "dead") {
        if (this.direction === ">" || this.direction === "R" || this.direction === "right" || this.direction === "down") {
          if (!this.rangeOut(particle)) return;
          if (this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
        } else {
          if (!this.rangeOut(particle)) return;
          if (!this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
        }
      } else if (this.crossType === "bound") {
        if (!this.rangeOut(particle)) return;
        if (this.getDistance(particle.p.x, particle.p.y) <= particle.radius) {
          if (this.dx === 0) {
            particle.v.x *= -1;
          } else if (this.dy === 0) {
            particle.v.y *= -1;
          } else {
            this.getSymmetric(particle.v);
          }
        }
      } else if (this.crossType === "cross") {
        if (this.alert) {
          console.error("Sorry, LineZone does not support cross method!");
          this.alert = false;
        }
      }
    };
    return LineZone;
  }(Zone);

  /**
   * Represents a circular zone in a 2D space.
   * @extends Zone
   */
  var CircleZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(CircleZone, _Zone);
    /**
     * Creates a new CircleZone.
     * @param {number} x - The x-coordinate of the circle's center.
     * @param {number} y - The y-coordinate of the circle's center.
     * @param {number} [radius] - The radius of the circle.
     */
    function CircleZone(x, y, radius) {
      var _this;
      _this = _Zone.call(this) || this;
      _this.x = x;
      _this.y = y;
      _this.radius = radius;
      _this.angle = 0;
      _this.center = {
        x: x,
        y: y
      };
      return _this;
    }

    /**
     * Gets a random position within the circle.
     * @returns {Object} An object with x and y coordinates.
     */
    var _proto = CircleZone.prototype;
    _proto.getPosition = function getPosition() {
      this.angle = MathUtil.PIx2 * Math.random();
      this.randomRadius = Math.random() * this.radius;
      this.vector.x = this.x + this.randomRadius * Math.cos(this.angle);
      this.vector.y = this.y + this.randomRadius * Math.sin(this.angle);
      return this.vector;
    }

    /**
     * Sets the center of the circle.
     * @param {number} x - The new x-coordinate of the center.
     * @param {number} y - The new y-coordinate of the center.
     */;
    _proto.setCenter = function setCenter(x, y) {
      this.center.x = x;
      this.center.y = y;
    }

    /**
     * Handles particle crossing behavior.
     * @param {Object} particle - The particle to check for crossing.
     */;
    _proto.crossing = function crossing(particle) {
      var d = particle.p.distanceTo(this.center);
      if (this.crossType === "dead") {
        if (d - particle.radius > this.radius) particle.dead = true;
      } else if (this.crossType === "bound") {
        if (d + particle.radius >= this.radius) this.getSymmetric(particle);
      } else if (this.crossType === "cross") {
        if (this.alert) {
          console.error("Sorry, CircleZone does not support cross method!");
          this.alert = false;
        }
      }
    }

    /**
     * Calculates the symmetric position of a particle.
     * @param {Object} particle - The particle to calculate symmetry for.
     */;
    _proto.getSymmetric = function getSymmetric(particle) {
      var tha2 = particle.v.getGradient();
      var tha1 = this.getGradient(particle);
      var tha = 2 * (tha1 - tha2);
      var oldx = particle.v.x;
      var oldy = particle.v.y;
      particle.v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
      particle.v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
    }

    /**
     * Calculates the gradient for a particle.
     * @param {Object} particle - The particle to calculate the gradient for.
     * @returns {number} The calculated gradient.
     */;
    _proto.getGradient = function getGradient(particle) {
      return -MathUtil.PI_2 + Math.atan2(particle.p.y - this.center.y, particle.p.x - this.center.x);
    };
    return CircleZone;
  }(Zone);

  /**
   * Represents a rectangular zone for particle systems.
   * @extends Zone
   */
  var RectZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(RectZone, _Zone);
    /**
     * Creates a new RectZone.
     * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
     * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
     * @param {number} [width] - The width of the rectangle.
     * @param {number} [height] - The height of the rectangle.
     */
    function RectZone(x, y, width, height) {
      var _this;
      if (width === void 0) {
        width = 200;
      }
      if (height === void 0) {
        height = 200;
      }
      _this = _Zone.call(this) || this;
      _this.x = x;
      _this.y = y;
      _this.width = width;
      _this.height = height;
      return _this;
    }

    /**
     * Gets a random position within the rectangular zone.
     * @returns {Vector2D} A vector representing the random position.
     */
    var _proto = RectZone.prototype;
    _proto.getPosition = function getPosition() {
      this.vector.x = this.x + Math.random() * this.width;
      this.vector.y = this.y + Math.random() * this.height;
      return this.vector;
    }

    /**
     * Handles particle crossing behavior based on the crossType.
     * @param {Particle} particle - The particle to check for crossing.
     */;
    _proto.crossing = function crossing(particle) {
      // particle dead zone
      if (this.crossType === "dead") {
        if (particle.p.x + particle.radius < this.x) particle.dead = true;else if (particle.p.x - particle.radius > this.x + this.width) particle.dead = true;
        if (particle.p.y + particle.radius < this.y) particle.dead = true;else if (particle.p.y - particle.radius > this.y + this.height) particle.dead = true;
      }

      // particle bound zone
      else if (this.crossType === "bound") {
        if (particle.p.x - particle.radius < this.x) {
          particle.p.x = this.x + particle.radius;
          particle.v.x *= -1;
        } else if (particle.p.x + particle.radius > this.x + this.width) {
          particle.p.x = this.x + this.width - particle.radius;
          particle.v.x *= -1;
        }
        if (particle.p.y - particle.radius < this.y) {
          particle.p.y = this.y + particle.radius;
          particle.v.y *= -1;
        } else if (particle.p.y + particle.radius > this.y + this.height) {
          particle.p.y = this.y + this.height - particle.radius;
          particle.v.y *= -1;
        }
      }

      // particle cross zone
      else if (this.crossType === "cross") {
        if (particle.p.x + particle.radius < this.x && particle.v.x <= 0) {
          particle.p.x = this.x + this.width + particle.radius;
        } else if (particle.p.x - particle.radius > this.x + this.width && particle.v.x >= 0) {
          particle.p.x = this.x - particle.radius;
        }
        if (particle.p.y + particle.radius < this.y && particle.v.y <= 0) {
          particle.p.y = this.y + this.height + particle.radius;
        } else if (particle.p.y - particle.radius > this.y + this.height && particle.v.y >= 0) {
          particle.p.y = this.y - particle.radius;
        }
      }
    };
    return RectZone;
  }(Zone);

  /**
   * Represents a zone based on image data.
   * @extends Zone
   */
  var ImageZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(ImageZone, _Zone);
    /**
     * Creates an ImageZone.
     * @param {ImageData} imageData - The image data to use for the zone.
     * @param {number} [x=0] - The x-coordinate offset.
     * @param {number} [y=0] - The y-coordinate offset.
     * @param {number} [d=2] - The sampling density.
     */
    function ImageZone(imageData, x, y, d) {
      var _this;
      _this = _Zone.call(this) || this;
      _this.reset(imageData, x, y, d);
      return _this;
    }

    /**
     * Resets the ImageZone with new parameters.
     * @param {ImageData} imageData - The image data to use for the zone.
     * @param {number} [x=0] - The x-coordinate offset.
     * @param {number} [y=0] - The y-coordinate offset.
     * @param {number} [d=2] - The sampling density.
     */
    var _proto = ImageZone.prototype;
    _proto.reset = function reset(imageData, x, y, d) {
      this.imageData = imageData;
      this.x = Util.initValue(x, 0);
      this.y = Util.initValue(y, 0);
      this.d = Util.initValue(d, 2);
      this.vectors = [];
      this.setVectors();
    }

    /**
     * Sets up vectors based on the image data.
     * @returns {Object} The vector object.
     */;
    _proto.setVectors = function setVectors() {
      var i, j;
      var length1 = this.imageData.width;
      var length2 = this.imageData.height;
      for (i = 0; i < length1; i += this.d) {
        for (j = 0; j < length2; j += this.d) {
          var index = ((j >> 0) * length1 + (i >> 0)) * 4;
          if (this.imageData.data[index + 3] > 0) {
            this.vectors.push({
              x: i + this.x,
              y: j + this.y
            });
          }
        }
      }
      return this.vector;
    }

    /**
     * Checks if a point is within the bounds of the image.
     * @param {number} x - The x-coordinate to check.
     * @param {number} y - The y-coordinate to check.
     * @returns {boolean} True if the point is within bounds, false otherwise.
     */;
    _proto.getBound = function getBound(x, y) {
      var index = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
      return this.imageData.data[index + 3] > 0;
    }

    /**
     * Gets a random position within the image zone.
     * @returns {Object} A vector representing the position.
     */;
    _proto.getPosition = function getPosition() {
      var vector = Util.getRandFromArray(this.vectors);
      return this.vector.copy(vector);
    }

    /**
     * Gets the color at a specific point in the image.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @returns {Object} An object containing r, g, b, and a values.
     */;
    _proto.getColor = function getColor(x, y) {
      x -= this.x;
      y -= this.y;
      var i = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
      return {
        r: this.imageData.data[i],
        g: this.imageData.data[i + 1],
        b: this.imageData.data[i + 2],
        a: this.imageData.data[i + 3]
      };
    }

    /**
     * Handles particle crossing behavior.
     * @param {Object} particle - The particle to check for crossing.
     */;
    _proto.crossing = function crossing(particle) {
      if (this.crossType === "dead") {
        particle.dead = this.getBound(particle.p.x - this.x, particle.p.y - this.y);
      } else if (this.crossType === "bound") {
        if (!this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.v.negate();
      }
    }

    /**
     * Destroys the ImageZone and cleans up resources.
     */;
    _proto.destroy = function destroy() {
      _Zone.prototype.destroy.call(this);
      this.imageData = null;
    };
    return ImageZone;
  }(Zone);

  var Debug = {
    addEventListener: function addEventListener(proton, func) {
      proton.addEventListener("PROTON_UPDATE_AFTER", function () {
        return func();
      });
    },
    getStyle: function getStyle(color) {
      if (color === void 0) {
        color = "#ff0000";
      }
      var rgb = ColorUtil.hexToRgb(color);
      return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 0.5)";
    },
    drawZone: function drawZone(proton, canvas, zone, clear) {
      var context = canvas.getContext("2d");
      var style = this.getStyle();
      this.addEventListener(proton, function () {
        if (clear) context.clearRect(0, 0, canvas.width, canvas.height);
        if (zone instanceof PointZone) {
          context.beginPath();
          context.fillStyle = style;
          context.arc(zone.x, zone.y, 10, 0, Math.PI * 2, true);
          context.fill();
          context.closePath();
        } else if (zone instanceof LineZone) {
          context.beginPath();
          context.strokeStyle = style;
          context.moveTo(zone.x1, zone.y1);
          context.lineTo(zone.x2, zone.y2);
          context.stroke();
          context.closePath();
        } else if (zone instanceof RectZone) {
          context.beginPath();
          context.strokeStyle = style;
          context.drawRect(zone.x, zone.y, zone.width, zone.height);
          context.stroke();
          context.closePath();
        } else if (zone instanceof CircleZone) {
          context.beginPath();
          context.strokeStyle = style;
          context.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2, true);
          context.stroke();
          context.closePath();
        }
      });
    },
    drawEmitter: function drawEmitter(proton, canvas, emitter, clear) {
      var context = canvas.getContext("2d");
      var style = this.getStyle();
      this.addEventListener(proton, function () {
        if (clear) context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = style;
        context.arc(emitter.p.x, emitter.p.y, 10, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
      });
    }
  };

  // namespace
  Proton.Particle = Particle;
  Proton.Pool = Pool;
  Proton.Util = Util;
  Proton.ColorUtil = ColorUtil;
  Proton.MathUtil = MathUtil;
  Proton.Vector2D = Proton.Vector = Vector2D;
  Proton.Polar2D = Proton.Polar = Polar2D;
  Proton.ArraySpan = ArraySpan;
  Proton.Rectangle = Rectangle;
  Proton.Rate = Rate;
  Proton.ease = ease;
  Proton.Span = Span;
  Proton.Mat3 = Mat3;
  Proton.getSpan = function (a, b, center) {
    return new Span(a, b, center);
  };
  Proton.createArraySpan = ArraySpan.createArraySpan;
  Proton.Initialize = Proton.Init = Initialize;
  Proton.Life = Proton.L = Life;
  Proton.Position = Proton.P = Position;
  Proton.Velocity = Proton.V = Velocity;
  Proton.Mass = Proton.M = Mass;
  Proton.Radius = Proton.R = Radius;
  Proton.Body = Proton.B = Body;
  Proton.Behaviour = Behaviour;
  Proton.Force = Proton.F = Force;
  Proton.Attraction = Proton.A = Attraction;
  Proton.RandomDrift = Proton.RD = RandomDrift;
  Proton.Gravity = Proton.G = Gravity;
  Proton.Collision = Collision;
  Proton.CrossZone = CrossZone;
  Proton.Alpha = Alpha;
  Proton.Scale = Proton.S = Scale;
  Proton.Rotate = Rotate;
  Proton.Color = Color;
  Proton.Repulsion = Repulsion;
  Proton.Cyclone = Cyclone;
  Proton.GravityWell = GravityWell;
  Proton.Emitter = Emitter;
  Proton.BehaviourEmitter = BehaviourEmitter;
  Proton.FollowEmitter = FollowEmitter;
  Proton.Zone = Zone;
  Proton.LineZone = LineZone;
  Proton.CircleZone = CircleZone;
  Proton.PointZone = PointZone;
  Proton.RectZone = RectZone;
  Proton.ImageZone = ImageZone;
  Proton.CanvasRenderer = CanvasRenderer;
  Proton.DomRenderer = DomRenderer;
  Proton.EaselRenderer = EaselRenderer;
  Proton.PixiRenderer = PixiRenderer;
  Proton.PixelRenderer = PixelRenderer;
  Proton.WebGLRenderer = Proton.WebGlRenderer = WebGLRenderer;
  Proton.CustomRenderer = CustomRenderer;
  Proton.Debug = Debug;
  Util.assign(Proton, ease);

  return Proton;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLndlYi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3V0aWxzL1dlYkdMVXRpbC5qcyIsIi4uL3NyYy91dGlscy9Eb21VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0ltZ1V0aWwuanMiLCIuLi9zcmMvdXRpbHMvVXRpbC5qcyIsIi4uL3NyYy91dGlscy9QdWlkLmpzIiwiLi4vc3JjL2NvcmUvUG9vbC5qcyIsIi4uL3NyYy9kZWJ1Zy9TdGF0cy5qcyIsIi4uL3NyYy9ldmVudHMvRXZlbnREaXNwYXRjaGVyLmpzIiwiLi4vc3JjL21hdGgvTWF0aFV0aWwuanMiLCIuLi9zcmMvbWF0aC9JbnRlZ3JhdGlvbi5qcyIsIi4uL3NyYy9jb3JlL1Byb3Rvbi5qcyIsIi4uL3NyYy91dGlscy9SZ2IuanMiLCIuLi9zcmMvbWF0aC9TcGFuLmpzIiwiLi4vc3JjL3V0aWxzL1Byb3BVdGlsLmpzIiwiLi4vc3JjL21hdGgvZWFzZS5qcyIsIi4uL3NyYy9tYXRoL1ZlY3RvcjJELmpzIiwiLi4vc3JjL2NvcmUvUGFydGljbGUuanMiLCIuLi9zcmMvdXRpbHMvQ29sb3JVdGlsLmpzIiwiLi4vc3JjL21hdGgvUG9sYXIyRC5qcyIsIi4uL3NyYy9tYXRoL01hdDMuanMiLCIuLi9zcmMvbWF0aC9BcnJheVNwYW4uanMiLCIuLi9zcmMvbWF0aC9SZWN0YW5nbGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9SYXRlLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0xpZmUuanMiLCIuLi9zcmMvem9uZS9ab25lLmpzIiwiLi4vc3JjL3pvbmUvUG9pbnRab25lLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvUG9zaXRpb24uanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9WZWxvY2l0eS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL01hc3MuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9SYWRpdXMuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Cb2R5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9CZWhhdmlvdXIuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0ZvcmNlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9BdHRyYWN0aW9uLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SYW5kb21EcmlmdC5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvR3Jhdml0eS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQ29sbGlzaW9uLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Dcm9zc1pvbmUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0FscGhhLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9TY2FsZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvUm90YXRlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xvci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQ3ljbG9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvUmVwdWxzaW9uLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5V2VsbC5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0luaXRpYWxpemVVdGlsLmpzIiwiLi4vc3JjL2VtaXR0ZXIvRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0JlaGF2aW91ckVtaXR0ZXIuanMiLCIuLi9zcmMvZW1pdHRlci9Gb2xsb3dFbWl0dGVyLmpzIiwiLi4vc3JjL3V0aWxzL1R5cGVzLmpzIiwiLi4vc3JjL3JlbmRlci9CYXNlUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0NhbnZhc1JlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9Eb21SZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvRWFzZWxSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvUGl4ZWxSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvUGl4aVJlbmRlcmVyLmpzIiwiLi4vc3JjL3V0aWxzL01TdGFjay5qcyIsIi4uL3NyYy9yZW5kZXIvV2ViR0xSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ3VzdG9tUmVuZGVyZXIuanMiLCIuLi9zcmMvem9uZS9MaW5lWm9uZS5qcyIsIi4uL3NyYy96b25lL0NpcmNsZVpvbmUuanMiLCIuLi9zcmMvem9uZS9SZWN0Wm9uZS5qcyIsIi4uL3NyYy96b25lL0ltYWdlWm9uZS5qcyIsIi4uL3NyYy9kZWJ1Zy9EZWJ1Zy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBpcG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGlwb3QobGVuZ3RoKSB7XG4gICAgcmV0dXJuIChsZW5ndGggJiAobGVuZ3RoIC0gMSkpID09PSAwO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBuaHBvdFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGxlbmd0aCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICovXG4gIG5ocG90KGxlbmd0aCkge1xuICAgIC0tbGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzI7IGkgPDw9IDEpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IChsZW5ndGggPj4gaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlbmd0aCArIDE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG1ha2VUcmFuc2xhdGlvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHR4LCB0eSBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0eCBlaXRoZXIgMCBvciAxXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0eSBlaXRoZXIgMCBvciAxXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIG1ha2VUcmFuc2xhdGlvbih0eCwgdHkpIHtcbiAgICByZXR1cm4gWzEsIDAsIDAsIDAsIDEsIDAsIHR4LCB0eSwgMV07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG1ha2VSb3RhdGlvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVJblJhZGlhbnNcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSB7XG4gICAgbGV0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XG4gICAgbGV0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XG5cbiAgICByZXR1cm4gW2MsIC1zLCAwLCBzLCBjLCAwLCAwLCAwLCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVNjYWxlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVNjYWxlKHN4LCBzeSkge1xuICAgIHJldHVybiBbc3gsIDAsIDAsIDAsIHN5LCAwLCAwLCAwLCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWF0cml4TXVsdGlwbHlcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBhLCBiIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGFcbiAgICogQHBhcmFtIHtPYmplY3R9IGJcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWF0cml4TXVsdGlwbHkoYSwgYikge1xuICAgIGxldCBhMDAgPSBhWzAgKiAzICsgMF07XG4gICAgbGV0IGEwMSA9IGFbMCAqIDMgKyAxXTtcbiAgICBsZXQgYTAyID0gYVswICogMyArIDJdO1xuICAgIGxldCBhMTAgPSBhWzEgKiAzICsgMF07XG4gICAgbGV0IGExMSA9IGFbMSAqIDMgKyAxXTtcbiAgICBsZXQgYTEyID0gYVsxICogMyArIDJdO1xuICAgIGxldCBhMjAgPSBhWzIgKiAzICsgMF07XG4gICAgbGV0IGEyMSA9IGFbMiAqIDMgKyAxXTtcbiAgICBsZXQgYTIyID0gYVsyICogMyArIDJdO1xuICAgIGxldCBiMDAgPSBiWzAgKiAzICsgMF07XG4gICAgbGV0IGIwMSA9IGJbMCAqIDMgKyAxXTtcbiAgICBsZXQgYjAyID0gYlswICogMyArIDJdO1xuICAgIGxldCBiMTAgPSBiWzEgKiAzICsgMF07XG4gICAgbGV0IGIxMSA9IGJbMSAqIDMgKyAxXTtcbiAgICBsZXQgYjEyID0gYlsxICogMyArIDJdO1xuICAgIGxldCBiMjAgPSBiWzIgKiAzICsgMF07XG4gICAgbGV0IGIyMSA9IGJbMiAqIDMgKyAxXTtcbiAgICBsZXQgYjIyID0gYlsyICogMyArIDJdO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIGEwMCAqIGIwMCArIGEwMSAqIGIxMCArIGEwMiAqIGIyMCxcbiAgICAgIGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMSxcbiAgICAgIGEwMCAqIGIwMiArIGEwMSAqIGIxMiArIGEwMiAqIGIyMixcbiAgICAgIGExMCAqIGIwMCArIGExMSAqIGIxMCArIGExMiAqIGIyMCxcbiAgICAgIGExMCAqIGIwMSArIGExMSAqIGIxMSArIGExMiAqIGIyMSxcbiAgICAgIGExMCAqIGIwMiArIGExMSAqIGIxMiArIGExMiAqIGIyMixcbiAgICAgIGEyMCAqIGIwMCArIGEyMSAqIGIxMCArIGEyMiAqIGIyMCxcbiAgICAgIGEyMCAqIGIwMSArIGEyMSAqIGIxMSArIGEyMiAqIGIyMSxcbiAgICAgIGEyMCAqIGIwMiArIGEyMSAqIGIxMiArIGEyMiAqIGIyMlxuICAgIF07XG4gIH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IGNhbnZhcy4gVGhlIG9wYWNpdHkgaXMgYnkgZGVmYXVsdCBzZXQgdG8gMFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Eb21VdGlsXG4gICAqIEBtZXRob2QgY3JlYXRlQ2FudmFzXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAkaWQgdGhlIGNhbnZhcycgaWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICR3aWR0aCB0aGUgY2FudmFzJyB3aWR0aFxuICAgKiBAcGFyYW0ge051bWJlcn0gJGhlaWdodCB0aGUgY2FudmFzJyBoZWlnaHRcbiAgICogQHBhcmFtIHtTdHJpbmd9IFskcG9zaXRpb249YWJzb2x1dGVdIHRoZSBjYW52YXMnIHBvc2l0aW9uLCBkZWZhdWx0IGlzICdhYnNvbHV0ZSdcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgY3JlYXRlQ2FudmFzKGlkLCB3aWR0aCwgaGVpZ2h0LCBwb3NpdGlvbiA9IFwiYWJzb2x1dGVcIikge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20ud2lkdGggPSB3aWR0aDtcbiAgICBkb20uaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnRyYW5zZm9ybShkb20sIC01MDAsIC01MDAsIDAsIDApO1xuXG4gICAgcmV0dXJuIGRvbTtcbiAgfSxcblxuICBjcmVhdGVEaXYoaWQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgZG9tLmlkID0gaWQ7XG4gICAgZG9tLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHRoaXMucmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIHJlc2l6ZShkb20sIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBkb20uc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcbiAgICBkb20uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5MZWZ0ID0gLXdpZHRoIC8gMiArIFwicHhcIjtcbiAgICBkb20uc3R5bGUubWFyZ2luVG9wID0gLWhlaWdodCAvIDIgKyBcInB4XCI7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgpLCBzY2FsZSgpLCByb3RhdGUoKSB0byBhIGdpdmVuIGRpdiBkb20gZm9yIGFsbCBicm93c2Vyc1xuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Eb21VdGlsXG4gICAqIEBtZXRob2QgdHJhbnNmb3JtXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGRpdlxuICAgKiBAcGFyYW0ge051bWJlcn0gJHhcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICR5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkc2NhbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRyb3RhdGVcbiAgICovXG4gIHRyYW5zZm9ybShkaXYsIHgsIHksIHNjYWxlLCByb3RhdGUpIHtcbiAgICBkaXYuc3R5bGUud2lsbENoYW5nZSA9IFwidHJhbnNmb3JtXCI7XG4gICAgY29uc3QgdHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIHRyYW5zZm9ybTNkKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt4fXB4LCAke3l9cHgsIDApIHNjYWxlKCR7c2NhbGV9KSByb3RhdGUoJHtyb3RhdGV9ZGVnKWA7XG4gICAgdGhpcy5jc3MzKGRpdiwgXCJiYWNrZmFjZVZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgdGhpcy5jc3MzKGRpdiwgXCJ0cmFuc2Zvcm1cIiwgdHJhbnNmb3JtKTtcbiAgfSxcblxuICBjc3MzKGRpdiwga2V5LCB2YWwpIHtcbiAgICBjb25zdCBia2V5ID0ga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cigxKTtcblxuICAgIGRpdi5zdHlsZVtgV2Via2l0JHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgTW96JHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgTyR7YmtleX1gXSA9IHZhbDtcbiAgICBkaXYuc3R5bGVbYG1zJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgJHtrZXl9YF0gPSB2YWw7XG4gIH1cbn07XG4iLCJpbXBvcnQgV2ViR0xVdGlsIGZyb20gXCIuL1dlYkdMVXRpbFwiO1xuaW1wb3J0IERvbVV0aWwgZnJvbSBcIi4vRG9tVXRpbFwiO1xuXG5jb25zdCBpbWdzQ2FjaGUgPSB7fTtcbmNvbnN0IGNhbnZhc0NhY2hlID0ge307XG5sZXQgY2FudmFzSWQgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBpbWFnZSBkYXRhLiBJdCBjb3VsZCBiZSBuZWNlc3NhcnkgdG8gY3JlYXRlIGEgUHJvdG9uLlpvbmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRJbWFnZURhdGFcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gICBjb250ZXh0IGFueSBjYW52YXMsIG11c3QgYmUgYSAyZENvbnRleHQgJ2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpJ1xuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgIGltYWdlICAgY291bGQgYmUgYW55IGRvbSBpbWFnZSwgZS5nLiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpc0lzQW5JbWdUYWcnKTtcbiAgICogQHBhcmFtIHtQcm90b24uUmVjdGFuZ2xlfSAgICByZWN0XG4gICAqL1xuICBnZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpIHtcbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgcmVjdC54LCByZWN0LnkpO1xuICAgIGNvbnN0IGltYWdlZGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKHJlY3QueCwgcmVjdC55LCByZWN0LndpZHRoLCByZWN0LmhlaWdodCk7XG4gICAgY29udGV4dC5jbGVhclJlY3QocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcblxuICAgIHJldHVybiBpbWFnZWRhdGE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRJbWdGcm9tQ2FjaGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGRlc2NyaWJlIGZ1bmNcbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZH0gICAgICAgICAgICAgICBpbWdcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9ICAgICBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICAgICAgICAgIGRyYXdDYW52YXMgIHNldCB0byB0cnVlIGlmIGEgY2FudmFzIHNob3VsZCBiZSBzYXZlZCBpbnRvIHBhcnRpY2xlLmRhdGEuY2FudmFzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZnVuY1xuICAgKi9cbiAgZ2V0SW1nRnJvbUNhY2hlKGltZywgY2FsbGJhY2ssIHBhcmFtKSB7XG4gICAgY29uc3Qgc3JjID0gdHlwZW9mIGltZyA9PT0gXCJzdHJpbmdcIiA/IGltZyA6IGltZy5zcmM7XG5cbiAgICBpZiAoaW1nc0NhY2hlW3NyY10pIHtcbiAgICAgIGNhbGxiYWNrKGltZ3NDYWNoZVtzcmNdLCBwYXJhbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWFnZS5vbmxvYWQgPSBlID0+IHtcbiAgICAgICAgaW1nc0NhY2hlW3NyY10gPSBlLnRhcmdldDtcbiAgICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICAgIH07XG5cbiAgICAgIGltYWdlLnNyYyA9IHNyYztcbiAgICB9XG4gIH0sXG5cbiAgZ2V0Q2FudmFzRnJvbUNhY2hlKGltZywgY2FsbGJhY2ssIHBhcmFtKSB7XG4gICAgY29uc3Qgc3JjID0gaW1nLnNyYztcblxuICAgIGlmICghY2FudmFzQ2FjaGVbc3JjXSkge1xuICAgICAgY29uc3Qgd2lkdGggPSBXZWJHTFV0aWwubmhwb3QoaW1nLndpZHRoKTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IFdlYkdMVXRpbC5uaHBvdChpbWcuaGVpZ2h0KTtcblxuICAgICAgY29uc3QgY2FudmFzID0gRG9tVXRpbC5jcmVhdGVDYW52YXMoYHByb3Rvbl9jYW52YXNfY2FjaGVfJHsrK2NhbnZhc0lkfWAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG5cbiAgICAgIGNhbnZhc0NhY2hlW3NyY10gPSBjYW52YXM7XG4gICAgfVxuXG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soY2FudmFzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuXG4gICAgcmV0dXJuIGNhbnZhc0NhY2hlW3NyY107XG4gIH1cbn07XG4iLCJpbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi9JbWdVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRlZmF1bHQgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpbml0VmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgYSBzcGVjaWZpYyB2YWx1ZSwgY291bGQgYmUgZXZlcnl0aGluZyBidXQgbnVsbCBvciB1bmRlZmluZWRcbiAgICogQHBhcmFtIHtNaXhlZH0gZGVmYXVsdHMgdGhlIGRlZmF1bHQgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkXG4gICAqL1xuICBpbml0VmFsdWUodmFsdWUsIGRlZmF1bHRzKSB7XG4gICAgdmFsdWUgPSB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBkZWZhdWx0cztcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgdmFsdWUgaXMgYSB2YWxpZCBhcnJheVxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgaXNBcnJheVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSB2YWx1ZSBBbnkgYXJyYXlcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBpc0FycmF5KHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgfSxcblxuICAvKipcbiAgICogRGVzdHJveWVzIHRoZSBnaXZlbiBhcnJheVxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgZW1wdHlBcnJheVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBBbnkgYXJyYXlcbiAgICovXG4gIGVtcHR5QXJyYXkoYXJyKSB7XG4gICAgaWYgKGFycikgYXJyLmxlbmd0aCA9IDA7XG4gIH0sXG5cbiAgdG9BcnJheShhcnIpIHtcbiAgICByZXR1cm4gdGhpcy5pc0FycmF5KGFycikgPyBhcnIgOiBbYXJyXTtcbiAgfSxcblxuICBzbGljZUFycmF5KGFycjEsIGluZGV4LCBhcnIyKSB7XG4gICAgdGhpcy5lbXB0eUFycmF5KGFycjIpO1xuICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IGFycjEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjIucHVzaChhcnIxW2ldKTtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0UmFuZEZyb21BcnJheShhcnIpIHtcbiAgICBpZiAoIWFycikgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGFycltNYXRoLmZsb29yKGFyci5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKV07XG4gIH0sXG5cbiAgLyoqXG4gICAqIERlc3Ryb3llcyB0aGUgZ2l2ZW4gb2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eU9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIEFueSBvYmplY3RcbiAgICovXG4gIGVtcHR5T2JqZWN0KG9iaiwgaWdub3JlID0gbnVsbCkge1xuICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChpZ25vcmUgJiYgaWdub3JlLmluZGV4T2Yoa2V5KSA+IC0xKSBjb250aW51ZTtcbiAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ha2VzIGFuIGluc3RhbmNlIG9mIGEgY2xhc3MgYW5kIGJpbmRzIHRoZSBnaXZlbiBhcnJheVxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgY2xhc3NBcHBseVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvciBBIGNsYXNzIHRvIG1ha2UgYW4gaW5zdGFuY2UgZnJvbVxuICAgKiBAcGFyYW0ge0FycmF5fSBbYXJnc10gQW55IGFycmF5IHRvIGJpbmQgaXQgdG8gdGhlIGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGluc3RhbmNlIG9mIGNvbnN0cnVjdG9yLCBvcHRpb25hbGx5IGJpbmQgd2l0aCBhcmdzXG4gICAqL1xuICBjbGFzc0FwcGx5KGNvbnN0cnVjdG9yLCBhcmdzID0gbnVsbCkge1xuICAgIGlmICghYXJncykge1xuICAgICAgcmV0dXJuIG5ldyBjb25zdHJ1Y3RvcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBGYWN0b3J5RnVuYyA9IGNvbnN0cnVjdG9yLmJpbmQuYXBwbHkoY29uc3RydWN0b3IsIFtudWxsXS5jb25jYXQoYXJncykpO1xuICAgICAgcmV0dXJuIG5ldyBGYWN0b3J5RnVuYygpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogVGhpcyB3aWxsIGdldCB0aGUgaW1hZ2UgZGF0YS4gSXQgY291bGQgYmUgbmVjZXNzYXJ5IHRvIGNyZWF0ZSBhIFByb3Rvbi5ab25lLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgZ2V0SW1hZ2VEYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9ICAgY29udGV4dCBhbnkgY2FudmFzLCBtdXN0IGJlIGEgMmRDb250ZXh0ICdjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSdcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICAgICBpbWFnZSAgIGNvdWxkIGJlIGFueSBkb20gaW1hZ2UsIGUuZy4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoaXNJc0FuSW1nVGFnJyk7XG4gICAqIEBwYXJhbSB7UHJvdG9uLlJlY3RhbmdsZX0gICAgcmVjdFxuICAgKi9cbiAgZ2V0SW1hZ2VEYXRhKGNvbnRleHQsIGltYWdlLCByZWN0KSB7XG4gICAgcmV0dXJuIEltZ1V0aWwuZ2V0SW1hZ2VEYXRhKGNvbnRleHQsIGltYWdlLCByZWN0KTtcbiAgfSxcblxuICBkZXN0cm95QWxsKGFyciwgcGFyYW0gPSBudWxsKSB7XG4gICAgbGV0IGkgPSBhcnIubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXJyW2ldLmRlc3Ryb3kocGFyYW0pO1xuICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgZGVsZXRlIGFycltpXTtcbiAgICB9XG5cbiAgICBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZm9yIChsZXQga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpO1xuICAgIH1cbiAgfVxufTtcbiIsImNvbnN0IGlkc01hcCA9IHt9O1xuXG5jb25zdCBQdWlkID0ge1xuICBfaW5kZXg6IDAsXG4gIF9jYWNoZToge30sXG5cbiAgaWQodHlwZSkge1xuICAgIGlmIChpZHNNYXBbdHlwZV0gPT09IHVuZGVmaW5lZCB8fCBpZHNNYXBbdHlwZV0gPT09IG51bGwpIGlkc01hcFt0eXBlXSA9IDA7XG4gICAgcmV0dXJuIGAke3R5cGV9XyR7aWRzTWFwW3R5cGVdKyt9YDtcbiAgfSxcblxuICBnZXRJZCh0YXJnZXQpIHtcbiAgICBsZXQgdWlkID0gdGhpcy5nZXRJZEZyb21DYWNoZSh0YXJnZXQpO1xuICAgIGlmICh1aWQpIHJldHVybiB1aWQ7XG5cbiAgICB1aWQgPSBgUFVJRF8ke3RoaXMuX2luZGV4Kyt9YDtcbiAgICB0aGlzLl9jYWNoZVt1aWRdID0gdGFyZ2V0O1xuICAgIHJldHVybiB1aWQ7XG4gIH0sXG5cbiAgZ2V0SWRGcm9tQ2FjaGUodGFyZ2V0KSB7XG4gICAgbGV0IG9iaiwgaWQ7XG5cbiAgICBmb3IgKGlkIGluIHRoaXMuX2NhY2hlKSB7XG4gICAgICBvYmogPSB0aGlzLl9jYWNoZVtpZF07XG5cbiAgICAgIGlmIChvYmogPT09IHRhcmdldCkgcmV0dXJuIGlkO1xuICAgICAgaWYgKHRoaXMuaXNCb2R5KG9iaiwgdGFyZ2V0KSAmJiBvYmouc3JjID09PSB0YXJnZXQuc3JjKSByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgaXNCb2R5KG9iaiwgdGFyZ2V0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHRhcmdldCA9PT0gXCJvYmplY3RcIiAmJiBvYmouaXNJbm5lciAmJiB0YXJnZXQuaXNJbm5lcjtcbiAgfSxcblxuICBnZXRUYXJnZXQodWlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlW3VpZF07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1aWQ7XG4iLCIvKipcbiAqIFBvb2wgaXMgdGhlIGNhY2hlIHBvb2wgb2YgdGhlIHByb3RvbiBlbmdpbmUsIGl0IGlzIHZlcnkgaW1wb3J0YW50LlxuICpcbiAqIGdldCh0YXJnZXQsIHBhcmFtcywgdWlkKVxuICogIENsYXNzXG4gKiAgICB1aWQgPSBQdWlkLmdldElkIC0+IFB1aWQgc2F2ZSB0YXJnZXQgY2FjaGVcbiAqICAgIHRhcmdldC5fX3B1aWQgPSB1aWRcbiAqXG4gKiAgYm9keVxuICogICAgdWlkID0gUHVpZC5nZXRJZCAtPiBQdWlkIHNhdmUgdGFyZ2V0IGNhY2hlXG4gKlxuICpcbiAqIGV4cGlyZSh0YXJnZXQpXG4gKiAgY2FjaGVbdGFyZ2V0Ll9fcHVpZF0gcHVzaCB0YXJnZXRcbiAqXG4gKi9cbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUHVpZCBmcm9tIFwiLi4vdXRpbHMvUHVpZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb29sIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Qb29sXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gb2YgcHJvcGVydGllc1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdG90YWxcbiAgICogQHByb3BlcnR5IHtPYmplY3R9IGNhY2hlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihudW0pIHtcbiAgICB0aGlzLnRvdGFsID0gMDtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10ganVzdCBhZGQgaWYgYHRhcmdldGAgaXMgYSBmdW5jdGlvblxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXQodGFyZ2V0LCBwYXJhbXMsIHVpZCkge1xuICAgIGxldCBwO1xuICAgIHVpZCA9IHVpZCB8fCB0YXJnZXQuX19wdWlkIHx8IFB1aWQuZ2V0SWQodGFyZ2V0KTtcblxuICAgIGlmICh0aGlzLmNhY2hlW3VpZF0gJiYgdGhpcy5jYWNoZVt1aWRdLmxlbmd0aCA+IDApIHtcbiAgICAgIHAgPSB0aGlzLmNhY2hlW3VpZF0ucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHAgPSB0aGlzLmNyZWF0ZU9yQ2xvbmUodGFyZ2V0LCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHAuX19wdWlkID0gdGFyZ2V0Ll9fcHVpZCB8fCB1aWQ7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBleHBpcmUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGUodGFyZ2V0Ll9fcHVpZCkucHVzaCh0YXJnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY2xhc3MgaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIG1vcmUgZG9jdW1lbnRhdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXQgYW55IE9iamVjdCBvciBGdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10ganVzdCBhZGQgaWYgYHRhcmdldGAgaXMgYSBmdW5jdGlvblxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVPckNsb25lKHRhcmdldCwgcGFyYW1zKSB7XG4gICAgdGhpcy50b3RhbCsrO1xuXG4gICAgaWYgKHRoaXMuY3JlYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGUodGFyZ2V0LCBwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRhcmdldCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gVXRpbC5jbGFzc0FwcGx5KHRhcmdldCwgcGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRhcmdldC5jbG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gLSB3aGF0IGlzIGluIHRoZSBjYWNoZT9cbiAgICpcbiAgICogQG1ldGhvZCBnZXRDb3VudFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICovXG4gIGdldENvdW50KCkge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5jYWNoZSkgY291bnQgKz0gdGhpcy5jYWNoZVtpZF0ubGVuZ3RoO1xuICAgIHJldHVybiBjb3VudCsrO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3llcyBhbGwgaXRlbXMgZnJvbSBQb29sLmNhY2hlXG4gICAqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGZvciAobGV0IGlkIGluIHRoaXMuY2FjaGUpIHtcbiAgICAgIHRoaXMuY2FjaGVbaWRdLmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5jYWNoZVtpZF07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgUG9vbC5jYWNoZVxuICAgKlxuICAgKiBAbWV0aG9kIGdldENhY2hlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICogQHByaXZhdGVcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHVpZCB0aGUgdW5pcXVlIGlkXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldENhY2hlKHVpZCA9IFwiZGVmYXVsdFwiKSB7XG4gICAgaWYgKCF0aGlzLmNhY2hlW3VpZF0pIHRoaXMuY2FjaGVbdWlkXSA9IFtdO1xuICAgIHJldHVybiB0aGlzLmNhY2hlW3VpZF07XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzIHtcbiAgY29uc3RydWN0b3IocHJvdG9uKSB7XG4gICAgdGhpcy5wcm90b24gPSBwcm90b247XG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMudHlwZSA9IDE7XG5cbiAgICB0aGlzLmVtaXR0ZXJJbmRleCA9IDA7XG4gICAgdGhpcy5yZW5kZXJlckluZGV4ID0gMDtcbiAgfVxuXG4gIHVwZGF0ZShzdHlsZSwgYm9keSkge1xuICAgIHRoaXMuYWRkKHN0eWxlLCBib2R5KTtcblxuICAgIGNvbnN0IGVtaXR0ZXIgPSB0aGlzLmdldEVtaXR0ZXIoKTtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKTtcbiAgICBsZXQgc3RyID0gXCJcIjtcblxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHN0ciArPSBcImVtaXR0ZXI6XCIgKyB0aGlzLnByb3Rvbi5lbWl0dGVycy5sZW5ndGggKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSBcImVtIHNwZWVkOlwiICsgZW1pdHRlci5lbWl0U3BlZWQgKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSBcInBvczpcIiArIHRoaXMuZ2V0RW1pdHRlclBvcyhlbWl0dGVyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSBcImluaXRpYWxpemVzOlwiICsgZW1pdHRlci5pbml0aWFsaXplcy5sZW5ndGggKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpXG4gICAgICAgICAgc3RyICs9ICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO1wiPicgKyB0aGlzLmNvbmNhdEFycihlbWl0dGVyLmluaXRpYWxpemVzKSArIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSBcImJlaGF2aW91cnM6XCIgKyBlbWl0dGVyLmJlaGF2aW91cnMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI+JyArIHRoaXMuY29uY2F0QXJyKGVtaXR0ZXIuYmVoYXZpb3VycykgKyBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGlmIChyZW5kZXJlcikgc3RyICs9IHJlbmRlcmVyLm5hbWUgKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKHJlbmRlcmVyKSBzdHIgKz0gXCJib2R5OlwiICsgdGhpcy5nZXRDcmVhdGVkTnVtYmVyKHJlbmRlcmVyKSArIFwiPGJyPlwiO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc3RyICs9IFwicGFydGljbGVzOlwiICsgdGhpcy5wcm90b24uZ2V0Q291bnQoKSArIFwiPGJyPlwiO1xuICAgICAgICBzdHIgKz0gXCJwb29sOlwiICsgdGhpcy5wcm90b24ucG9vbC5nZXRDb3VudCgpICsgXCI8YnI+XCI7XG4gICAgICAgIHN0ciArPSBcInRvdGFsOlwiICsgdGhpcy5wcm90b24ucG9vbC50b3RhbDtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSBzdHI7XG4gIH1cblxuICBhZGQoc3R5bGUsIGJvZHkpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLnR5cGUgPSAxO1xuXG4gICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gW1xuICAgICAgICBcInBvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowcHg7bGVmdDowO2N1cnNvcjpwb2ludGVyO1wiLFxuICAgICAgICBcIm9wYWNpdHk6MC45O3otaW5kZXg6MTAwMDA7cGFkZGluZzoxMHB4O2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1wiLFxuICAgICAgICBcIndpZHRoOjEyMHB4O2hlaWdodDo1MHB4O2JhY2tncm91bmQtY29sb3I6IzAwMjtjb2xvcjojMGZmO1wiXG4gICAgICBdLmpvaW4oXCJcIik7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgZSA9PiB7XG4gICAgICAgICAgdGhpcy50eXBlKys7XG4gICAgICAgICAgaWYgKHRoaXMudHlwZSA+IDQpIHRoaXMudHlwZSA9IDE7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuXG4gICAgICBsZXQgYmcsIGNvbG9yO1xuICAgICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgYmcgPSBcIiMyMDFcIjtcbiAgICAgICAgICBjb2xvciA9IFwiI2YwOFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBiZyA9IFwiIzAyMFwiO1xuICAgICAgICAgIGNvbG9yID0gXCIjMGYwXCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBiZyA9IFwiIzAwMlwiO1xuICAgICAgICAgIGNvbG9yID0gXCIjMGZmXCI7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IGJnO1xuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGVbXCJjb2xvclwiXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb250YWluZXIucGFyZW50Tm9kZSkge1xuICAgICAgYm9keSA9IGJvZHkgfHwgdGhpcy5ib2R5IHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICBib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gIH1cblxuICBnZXRFbWl0dGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3Rvbi5lbWl0dGVyc1t0aGlzLmVtaXR0ZXJJbmRleF07XG4gIH1cblxuICBnZXRSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm90b24ucmVuZGVyZXJzW3RoaXMucmVuZGVyZXJJbmRleF07XG4gIH1cblxuICBjb25jYXRBcnIoYXJyKSB7XG4gICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgaWYgKCFhcnIgfHwgIWFyci5sZW5ndGgpIHJldHVybiByZXN1bHQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0ICs9IChhcnJbaV0ubmFtZSB8fCBcIlwiKS5zdWJzdHIoMCwgMSkgKyBcIi5cIjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0Q3JlYXRlZE51bWJlcihyZW5kZXJlcikge1xuICAgIHJldHVybiByZW5kZXJlci5wb29sLnRvdGFsIHx8IChyZW5kZXJlci5jcG9vbCAmJiByZW5kZXJlci5jcG9vbC50b3RhbCkgfHwgMDtcbiAgfVxuXG4gIGdldEVtaXR0ZXJQb3MoZSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGUucC54KSArIFwiLFwiICsgTWF0aC5yb3VuZChlLnAueSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICBjb25zdCBib2R5ID0gdGhpcy5ib2R5IHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICBib2R5LnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3RvbiA9IG51bGw7XG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICB9XG59XG4iLCIvKlxuICogRXZlbnREaXNwYXRjaGVyXG4gKiBUaGlzIGNvZGUgcmVmZXJlbmNlIHNpbmNlIGh0dHA6Ly9jcmVhdGVqcy5jb20vLlxuICpcbiAqKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBiaW5kKHRhcmdldCkge1xuICAgIHRhcmdldC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudDtcbiAgICB0YXJnZXQucHJvdG90eXBlLmhhc0V2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmhhc0V2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVBbGxFdmVudExpc3RlbmVycztcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHRoaXMuX2xpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIHRoaXMuX2xpc3RlbmVyc1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykgcmV0dXJuO1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzW3R5cGVdKSByZXR1cm47XG5cbiAgICBjb25zdCBhcnIgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgY29uc3QgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0gPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWxsb3dzIGZvciBmYXN0ZXIgY2hlY2tzLlxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnModHlwZSkge1xuICAgIGlmICghdHlwZSkgdGhpcy5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICBlbHNlIGlmICh0aGlzLl9saXN0ZW5lcnMpIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KHR5cGUsIGFyZ3MpIHtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzO1xuXG4gICAgaWYgKHR5cGUgJiYgbGlzdGVuZXJzKSB7XG4gICAgICBsZXQgYXJyID0gbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgaWYgKCFhcnIpIHJldHVybiByZXN1bHQ7XG5cbiAgICAgIC8vIGFyciA9IGFyci5zbGljZSgpO1xuICAgICAgLy8gdG8gYXZvaWQgaXNzdWVzIHdpdGggaXRlbXMgYmVpbmcgcmVtb3ZlZCBvciBhZGRlZCBkdXJpbmcgdGhlIGRpc3BhdGNoXG5cbiAgICAgIGxldCBoYW5kbGVyO1xuICAgICAgbGV0IGkgPSBhcnIubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBoYW5kbGVyID0gYXJyW2ldO1xuICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgaGFuZGxlcihhcmdzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gISFyZXN1bHQ7XG4gIH1cblxuICBoYXNFdmVudExpc3RlbmVyKHR5cGUpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgcmV0dXJuICEhKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnNbdHlwZV0pO1xuICB9XG59XG4iLCJjb25zdCBQSSA9IDMuMTQxNTkyNjtcbmNvbnN0IElORklOSVRZID0gSW5maW5pdHk7XG5cbmNvbnN0IE1hdGhVdGlsID0ge1xuICBQSTogUEksXG4gIFBJeDI6IFBJICogMixcbiAgUElfMjogUEkgLyAyLFxuICBQSV8xODA6IFBJIC8gMTgwLFxuICBOMTgwX1BJOiAxODAgLyBQSSxcbiAgSW5maW5pdHk6IC05OTksXG5cbiAgaXNJbmZpbml0eShudW0pIHtcbiAgICByZXR1cm4gbnVtID09PSB0aGlzLkluZmluaXR5IHx8IG51bSA9PT0gSU5GSU5JVFk7XG4gIH0sXG5cbiAgcmFuZG9tQVRvQihhLCBiLCBpc0ludCA9IGZhbHNlKSB7XG4gICAgaWYgKCFpc0ludCkgcmV0dXJuIGEgKyBNYXRoLnJhbmRvbSgpICogKGIgLSBhKTtcbiAgICBlbHNlIHJldHVybiAoKE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpKSA+PiAwKSArIGE7XG4gIH0sXG5cbiAgcmFuZG9tRmxvYXRpbmcoY2VudGVyLCBmLCBpc0ludCkge1xuICAgIHJldHVybiB0aGlzLnJhbmRvbUFUb0IoY2VudGVyIC0gZiwgY2VudGVyICsgZiwgaXNJbnQpO1xuICB9LFxuXG4gIHJhbmRvbUNvbG9yKCkge1xuICAgIHJldHVybiBcIiNcIiArIChcIjAwMDAwXCIgKyAoKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDApIDw8IDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTYpO1xuICB9LFxuXG4gIHJhbmRvbVpvbmUoZGlzcGxheSkge30sXG5cbiAgZmxvb3IobnVtLCBrID0gNCkge1xuICAgIGNvbnN0IGRpZ2l0cyA9IE1hdGgucG93KDEwLCBrKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihudW0gKiBkaWdpdHMpIC8gZGlnaXRzO1xuICB9LFxuXG4gIGRlZ3JlZVRyYW5zZm9ybShhKSB7XG4gICAgcmV0dXJuIChhICogUEkpIC8gMTgwO1xuICB9LFxuXG4gIHRvQ29sb3IxNihudW0pIHtcbiAgICByZXR1cm4gYCMke251bS50b1N0cmluZygxNil9YDtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hdGhVdGlsO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZWdyYXRpb24ge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGNhbGN1bGF0ZShwYXJ0aWNsZXMsIHRpbWUsIGRhbXBpbmcpIHtcbiAgICB0aGlzLmV1bGVySW50ZWdyYXRlKHBhcnRpY2xlcywgdGltZSwgZGFtcGluZyk7XG4gIH1cblxuICAvLyBFdWxlciBJbnRlZ3JhdGVcbiAgLy8gaHR0cHM6Ly9yb3NldHRhY29kZS5vcmcvd2lraS9FdWxlcl9tZXRob2RcbiAgZXVsZXJJbnRlZ3JhdGUocGFydGljbGUsIHRpbWUsIGRhbXBpbmcpIHtcbiAgICBpZiAoIXBhcnRpY2xlLnNsZWVwKSB7XG4gICAgICBwYXJ0aWNsZS5vbGQucC5jb3B5KHBhcnRpY2xlLnApO1xuICAgICAgcGFydGljbGUub2xkLnYuY29weShwYXJ0aWNsZS52KTtcblxuICAgICAgcGFydGljbGUuYS5tdWx0aXBseVNjYWxhcigxIC8gcGFydGljbGUubWFzcyk7XG4gICAgICBwYXJ0aWNsZS52LmFkZChwYXJ0aWNsZS5hLm11bHRpcGx5U2NhbGFyKHRpbWUpKTtcbiAgICAgIHBhcnRpY2xlLnAuYWRkKHBhcnRpY2xlLm9sZC52Lm11bHRpcGx5U2NhbGFyKHRpbWUpKTtcblxuICAgICAgaWYgKGRhbXBpbmcpIHBhcnRpY2xlLnYubXVsdGlwbHlTY2FsYXIoZGFtcGluZyk7XG5cbiAgICAgIHBhcnRpY2xlLmEuY2xlYXIoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb29sIGZyb20gXCIuL1Bvb2xcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgU3RhdHMgZnJvbSBcIi4uL2RlYnVnL1N0YXRzXCI7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBJbnRlZ3JhdGlvbiBmcm9tIFwiLi4vbWF0aC9JbnRlZ3JhdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm90b24ge1xuICBzdGF0aWMgVVNFX0NMT0NLID0gZmFsc2U7XG5cbiAgLy8gbWVhc3VyZSAxOjEwMFxuICBzdGF0aWMgTUVBU1VSRSA9IDEwMDtcbiAgc3RhdGljIEVVTEVSID0gXCJldWxlclwiO1xuICBzdGF0aWMgUksyID0gXCJydW5nZS1rdXR0YTJcIjtcblxuICAvLyBldmVudCBuYW1lXG4gIHN0YXRpYyBQQVJUSUNMRV9DUkVBVEVEID0gXCJQQVJUSUNMRV9DUkVBVEVEXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9VUERBVEUgPSBcIlBBUlRJQ0xFX1VQREFURVwiO1xuICBzdGF0aWMgUEFSVElDTEVfU0xFRVAgPSBcIlBBUlRJQ0xFX1NMRUVQXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9ERUFEID0gXCJQQVJUSUNMRV9ERUFEXCI7XG5cbiAgc3RhdGljIEVNSVRURVJfQURERUQgPSBcIkVNSVRURVJfQURERURcIjtcbiAgc3RhdGljIEVNSVRURVJfUkVNT1ZFRCA9IFwiRU1JVFRFUl9SRU1PVkVEXCI7XG5cbiAgc3RhdGljIFBST1RPTl9VUERBVEUgPSBcIlBST1RPTl9VUERBVEVcIjtcbiAgc3RhdGljIFBST1RPTl9VUERBVEVfQUZURVIgPSBcIlBST1RPTl9VUERBVEVfQUZURVJcIjtcbiAgc3RhdGljIERFRkFVTFRfSU5URVJWQUwgPSAwLjAxNjc7XG5cbiAgc3RhdGljIGFtZW5kQ2hhbmdlVGFic0J1ZyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciB0byBhZGQgZW1pdHRlcnNcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yIFByb3RvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgbW9yZSBkb2N1bWVudGF0aW9uIG9mIHRoZSBzaW5nbGUgcHJvcGVydGllcyBhbmQgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlciB8IHVuZGVmaW5lZH0gW2ludGVncmF0aW9uVHlwZT1Qcm90b24uRVVMRVJdXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbaW50ZWdyYXRpb25UeXBlPVByb3Rvbi5FVUxFUl1cbiAgICogQHByb3BlcnR5IHtBcnJheX0gZW1pdHRlcnMgICBBbGwgYWRkZWQgZW1pdHRlclxuICAgKiBAcHJvcGVydHkge0FycmF5fSByZW5kZXJlcnMgIEFsbCBhZGRlZCByZW5kZXJlclxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSAgICAgIFRoZSBhY3RpdmUgdGltZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gb2xkdGltZSAgIFRoZSBvbGQgdGltZVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW50ZWdyYXRpb25UeXBlKSB7XG4gICAgdGhpcy5lbWl0dGVycyA9IFtdO1xuICAgIHRoaXMucmVuZGVyZXJzID0gW107XG5cbiAgICB0aGlzLnRpbWUgPSAwO1xuICAgIHRoaXMubm93ID0gMDtcbiAgICB0aGlzLnRoZW4gPSAwO1xuICAgIHRoaXMuZWxhcHNlZCA9IDA7XG5cbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzKHRoaXMpO1xuICAgIHRoaXMucG9vbCA9IG5ldyBQb29sKDgwKTtcblxuICAgIHRoaXMuaW50ZWdyYXRpb25UeXBlID0gVXRpbC5pbml0VmFsdWUoaW50ZWdyYXRpb25UeXBlLCBQcm90b24uRVVMRVIpO1xuICAgIHRoaXMuaW50ZWdyYXRvciA9IG5ldyBJbnRlZ3JhdGlvbih0aGlzLmludGVncmF0aW9uVHlwZSk7XG5cbiAgICB0aGlzLl9mcHMgPSBcImF1dG9cIjtcbiAgICB0aGlzLl9pbnRlcnZhbCA9IFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMO1xuICB9XG5cbiAgc2V0IGZwcyhmcHMpIHtcbiAgICB0aGlzLl9mcHMgPSBmcHM7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSBmcHMgPT09IFwiYXV0b1wiID8gUHJvdG9uLkRFRkFVTFRfSU5URVJWQUwgOiBNYXRoVXRpbC5mbG9vcigxIC8gZnBzLCA3KTtcbiAgfVxuXG4gIGdldCBmcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgYSB0eXBlIG9mIFJlbmRlcmVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkUmVuZGVyZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyXG4gICAqL1xuICBhZGRSZW5kZXJlcihyZW5kZXIpIHtcbiAgICByZW5kZXIuaW5pdCh0aGlzKTtcbiAgICB0aGlzLnJlbmRlcmVycy5wdXNoKHJlbmRlcik7XG4gIH1cblxuICAvKipcbiAgICogQG5hbWUgYWRkIGEgdHlwZSBvZiBSZW5kZXJlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZFJlbmRlcmVyXG4gICAqIEBwYXJhbSB7UmVuZGVyZXJ9IHJlbmRlclxuICAgKi9cbiAgcmVtb3ZlUmVuZGVyZXIocmVuZGVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnJlbmRlcmVycy5pbmRleE9mKHJlbmRlcik7XG4gICAgdGhpcy5yZW5kZXJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZW5kZXIucmVtb3ZlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgRW1pdHRlclxuICAgKlxuICAgKiBAbWV0aG9kIGFkZEVtaXR0ZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtFbWl0dGVyfSBlbWl0dGVyXG4gICAqL1xuICBhZGRFbWl0dGVyKGVtaXR0ZXIpIHtcbiAgICB0aGlzLmVtaXR0ZXJzLnB1c2goZW1pdHRlcik7XG4gICAgZW1pdHRlci5wYXJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5FTUlUVEVSX0FEREVELCBlbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIEVtaXR0ZXJcbiAgICpcbiAgICogQG1ldGhvZCByZW1vdmVFbWl0dGVyXG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IGVtaXR0ZXJcbiAgICovXG4gIHJlbW92ZUVtaXR0ZXIoZW1pdHRlcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5lbWl0dGVycy5pbmRleE9mKGVtaXR0ZXIpO1xuICAgIHRoaXMuZW1pdHRlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBlbWl0dGVyLnBhcmVudCA9IG51bGw7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLkVNSVRURVJfUkVNT1ZFRCwgZW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbGwgYWRkZWQgZW1pdHRlcnNcbiAgICpcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICAvLyAnYXV0bycgaXMgdGhlIGRlZmF1bHQgYnJvd3NlciByZWZyZXNoIHJhdGUsIHRoZSB2YXN0IG1ham9yaXR5IGlzIDYwZnBzXG4gICAgaWYgKHRoaXMuX2ZwcyA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURSk7XG5cbiAgICAgIGlmIChQcm90b24uVVNFX0NMT0NLKSB7XG4gICAgICAgIGlmICghdGhpcy50aGVuKSB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMubm93IC0gdGhpcy50aGVuKSAqIDAuMDAxO1xuICAgICAgICAvLyBGaXggYnVncyBzdWNoIGFzIGNocm9tZSBicm93c2VyIHN3aXRjaGluZyB0YWJzIGNhdXNpbmcgZXhjZXNzaXZlIHRpbWUgZGlmZmVyZW5jZVxuICAgICAgICB0aGlzLmFtZW5kQ2hhbmdlVGFic0J1ZygpO1xuXG4gICAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiAwKSB0aGlzLmVtaXR0ZXJzVXBkYXRlKHRoaXMuZWxhcHNlZCk7XG4gICAgICAgIHRoaXMudGhlbiA9IHRoaXMubm93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyc1VwZGF0ZShQcm90b24uREVGQVVMVF9JTlRFUlZBTCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURV9BRlRFUik7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZwcyBmcmFtZSByYXRlIGlzIHNldFxuICAgIGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnRoZW4pIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuZWxhcHNlZCA9ICh0aGlzLm5vdyAtIHRoaXMudGhlbikgKiAwLjAwMTtcblxuICAgICAgaWYgKHRoaXMuZWxhcHNlZCA+IHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uUFJPVE9OX1VQREFURSk7XG4gICAgICAgIHRoaXMuZW1pdHRlcnNVcGRhdGUodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTc2NDAxOC9jb250cm9sbGluZy1mcHMtd2l0aC1yZXF1ZXN0YW5pbWF0aW9uZnJhbWVcbiAgICAgICAgdGhpcy50aGVuID0gdGhpcy5ub3cgLSAodGhpcy5lbGFwc2VkICUgdGhpcy5faW50ZXJ2YWwpICogMTAwMDtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFX0FGVEVSKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbWl0dGVyc1VwZGF0ZShlbGFwc2VkKSB7XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLmVtaXR0ZXJzW2ldLnVwZGF0ZShlbGFwc2VkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBhbWVuZENoYW5nZVRhYnNCdWdcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGFtZW5kQ2hhbmdlVGFic0J1ZygpIHtcbiAgICBpZiAoIVByb3Rvbi5hbWVuZENoYW5nZVRhYnNCdWcpIHJldHVybjtcbiAgICBpZiAodGhpcy5lbGFwc2VkID4gMC41KSB7XG4gICAgICB0aGlzLnRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvdW50cyBhbGwgcGFydGljbGVzIGZyb20gYWxsIGVtaXR0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q291bnRcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGdldENvdW50KCkge1xuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHRvdGFsICs9IHRoaXMuZW1pdHRlcnNbaV0ucGFydGljbGVzLmxlbmd0aDtcbiAgICByZXR1cm4gdG90YWw7XG4gIH1cblxuICBnZXRBbGxQYXJ0aWNsZXMoKSB7XG4gICAgbGV0IHBhcnRpY2xlcyA9IFtdO1xuICAgIGxldCBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSBwYXJ0aWNsZXMgPSBwYXJ0aWNsZXMuY29uY2F0KHRoaXMuZW1pdHRlcnNbaV0ucGFydGljbGVzKTtcbiAgICByZXR1cm4gcGFydGljbGVzO1xuICB9XG5cbiAgZGVzdHJveUFsbEVtaXR0ZXJzKCkge1xuICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLmVtaXR0ZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gdGhpcyBQcm90b24gaW5zdGFuY2UuIFRoaXMgaW5jbHVkZXMgYWxsIGVtaXR0ZXJzLCBhbmQgYWxsIHByb3BlcnRpZXNcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b25cbiAgICogQGluc3RhbmNlXG4gICAqL1xuICBkZXN0cm95KHJlbW92ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGVzdHJveU90aGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgIHRoaXMudGhlbiA9IDA7XG4gICAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgICAgdGhpcy5zdGF0cy5kZXN0cm95KCk7XG5cbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLmVtaXR0ZXJzKTtcbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnJlbmRlcmVycywgdGhpcy5nZXRBbGxQYXJ0aWNsZXMoKSk7XG5cbiAgICAgIHRoaXMuaW50ZWdyYXRvciA9IG51bGw7XG4gICAgICB0aGlzLnJlbmRlcmVycyA9IG51bGw7XG4gICAgICB0aGlzLmVtaXR0ZXJzID0gbnVsbDtcbiAgICAgIHRoaXMuc3RhdHMgPSBudWxsO1xuICAgICAgdGhpcy5wb29sID0gbnVsbDtcbiAgICB9O1xuXG4gICAgaWYgKHJlbW92ZSkge1xuICAgICAgc2V0VGltZW91dChkZXN0cm95T3RoZXIsIDIwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3Ryb3lPdGhlcigpO1xuICAgIH1cbiAgfVxufVxuXG5FdmVudERpc3BhdGNoZXIuYmluZChQcm90b24pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmdiIHtcbiAgY29uc3RydWN0b3IociA9IDI1NSwgZyA9IDI1NSwgYiA9IDI1NSkge1xuICAgIHRoaXMuciA9IHI7XG4gICAgdGhpcy5nID0gZztcbiAgICB0aGlzLmIgPSBiO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5yID0gMjU1O1xuICAgIHRoaXMuZyA9IDI1NTtcbiAgICB0aGlzLmIgPSAyNTU7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3BhbiBvZiB2YWx1ZXMgb3IgYW4gYXJyYXkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYW4ge1xuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0FycmF5O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfG51bWJlcltdfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGI7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2VudGVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFNwYW4gaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfG51bWJlcltdfSBhIC0gVGhlIGZpcnN0IHZhbHVlIG9yIGFuIGFycmF5IG9mIHZhbHVlcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtiXSAtIFRoZSBzZWNvbmQgdmFsdWUgKGlmIGEgaXMgbm90IGFuIGFycmF5KS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbY2VudGVyPWZhbHNlXSAtIFdoZXRoZXIgdG8gdXNlIGNlbnRlci1iYXNlZCBjYWxjdWxhdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGNlbnRlcikge1xuICAgIGlmIChVdGlsLmlzQXJyYXkoYSkpIHtcbiAgICAgIHRoaXMuaXNBcnJheSA9IHRydWU7XG4gICAgICB0aGlzLmEgPSBhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzQXJyYXkgPSBmYWxzZTtcbiAgICAgIHRoaXMuYSA9IFV0aWwuaW5pdFZhbHVlKGEsIDEpO1xuICAgICAgdGhpcy5iID0gVXRpbC5pbml0VmFsdWUoYiwgdGhpcy5hKTtcbiAgICAgIHRoaXMuY2VudGVyID0gVXRpbC5pbml0VmFsdWUoY2VudGVyLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSB2YWx1ZSBmcm9tIHRoZSBzcGFuLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0ludD1mYWxzZV0gLSBXaGV0aGVyIHRvIHJldHVybiBhbiBpbnRlZ2VyIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBBIHJhbmRvbSB2YWx1ZSBmcm9tIHRoZSBzcGFuLlxuICAgKi9cbiAgZ2V0VmFsdWUoaXNJbnQgPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLmlzQXJyYXkpIHtcbiAgICAgIHJldHVybiBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy5hKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLmNlbnRlcikge1xuICAgICAgICByZXR1cm4gTWF0aFV0aWwucmFuZG9tQVRvQih0aGlzLmEsIHRoaXMuYiwgaXNJbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGhVdGlsLnJhbmRvbUZsb2F0aW5nKHRoaXMuYSwgdGhpcy5iLCBpc0ludCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgU3BhbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7KnxTcGFufSBhIC0gVGhlIGZpcnN0IHZhbHVlIG9yIGEgU3BhbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7Kn0gW2JdIC0gVGhlIHNlY29uZCB2YWx1ZS5cbiAgICogQHBhcmFtIHsqfSBbY10gLSBUaGUgdGhpcmQgdmFsdWUuXG4gICAqIEByZXR1cm5zIHtTcGFufSBBIG5ldyBTcGFuIGluc3RhbmNlLlxuICAgKi9cbiAgc3RhdGljIHNldFNwYW5WYWx1ZShhLCBiLCBjKSB7XG4gICAgaWYgKGEgaW5zdGFuY2VvZiBTcGFuKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmV3IFNwYW4oYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3IFNwYW4oYSwgYik7XG4gICAgICAgIGVsc2UgcmV0dXJuIG5ldyBTcGFuKGEsIGIsIGMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmcm9tIGEgU3BhbiwgaWYgdGhlIHBhcmFtIGlzIG5vdCBhIFNwYW4gaXQgd2lsbCByZXR1cm4gdGhlIGdpdmVuIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHsqfFNwYW59IHBhbiAtIFRoZSB2YWx1ZSBvciBTcGFuIHRvIGdldCB0aGUgdmFsdWUgZnJvbS5cbiAgICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSBvZiBTcGFuIE9SIHRoZSBwYXJhbWV0ZXIgaWYgaXQgaXMgbm90IGEgU3Bhbi5cbiAgICovXG4gIHN0YXRpYyBnZXRTcGFuVmFsdWUocGFuKSB7XG4gICAgcmV0dXJuIHBhbiBpbnN0YW5jZW9mIFNwYW4gPyBwYW4uZ2V0VmFsdWUoKSA6IHBhbjtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGhhc1Byb3AodGFyZ2V0LCBrZXkpIHtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIHJldHVybiBvYmouaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgfSxcblxuICAvKipcbiAgICogc2V0IHRoZSBwcm90b3R5cGUgaW4gYSBnaXZlbiBwcm90b3R5cGVPYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHNldFByb3BcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgdGFyZ2V0YFxuICAgKiBAdG9kbyB0cmFuc2xhdGUgZGVzcmlwdGlvbiBmcm9tIGNoaW5lc2UgdG8gZW5nbGlzaFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGVPYmplY3QgQW4gb2JqZWN0IG9mIHNpbmdsZSBwcm90b3R5cGVzXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gdGFyZ2V0XG4gICAqL1xuICBzZXRQcm9wKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XG4gICAgICBpZiAodGFyZ2V0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIHRhcmdldFtwcm9wXSA9IFNwYW4uZ2V0U3BhblZhbHVlKHByb3BzW3Byb3BdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0VmVjdG9yVmFsXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYHRhcmdldGBcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgY29uZmBcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBmdW5jdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mXG4gICAqL1xuICBzZXRWZWN0b3JWYWwocGFydGljbGUsIGNvbmYgPSBudWxsKSB7XG4gICAgaWYgKCFjb25mKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwieFwiKSkgcGFydGljbGUucC54ID0gY29uZltcInhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInlcIikpIHBhcnRpY2xlLnAueSA9IGNvbmZbXCJ5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZ4XCIpKSBwYXJ0aWNsZS52LnggPSBjb25mW1widnhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZ5XCIpKSBwYXJ0aWNsZS52LnkgPSBjb25mW1widnlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYXhcIikpIHBhcnRpY2xlLmEueCA9IGNvbmZbXCJheFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYXlcIikpIHBhcnRpY2xlLmEueSA9IGNvbmZbXCJheVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJwXCIpKSBwYXJ0aWNsZS5wLmNvcHkoY29uZltcInBcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2XCIpKSBwYXJ0aWNsZS52LmNvcHkoY29uZltcInZcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJhXCIpKSBwYXJ0aWNsZS5hLmNvcHkoY29uZltcImFcIl0pO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInBvc2l0aW9uXCIpKSBwYXJ0aWNsZS5wLmNvcHkoY29uZltcInBvc2l0aW9uXCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidmVsb2NpdHlcIikpIHBhcnRpY2xlLnYuY29weShjb25mW1widmVsb2NpdHlcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJhY2NlbGVyYXRlXCIpKSBwYXJ0aWNsZS5hLmNvcHkoY29uZltcImFjY2VsZXJhdGVcIl0pO1xuICB9XG59O1xuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZWFzZUxpbmVhcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICBlYXNlSW5RdWFkKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCAyKTtcbiAgfSxcblxuICBlYXNlT3V0UXVhZCh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGgucG93KHZhbHVlIC0gMSwgMikgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5PdXRRdWFkKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCAyKTtcblxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlIC0gMik7XG4gIH0sXG5cbiAgZWFzZUluQ3ViaWModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDMpO1xuICB9LFxuXG4gIGVhc2VPdXRDdWJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSAtIDEsIDMpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRDdWJpYyh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgMyk7XG5cbiAgICByZXR1cm4gMC41ICogKE1hdGgucG93KHZhbHVlIC0gMiwgMykgKyAyKTtcbiAgfSxcblxuICBlYXNlSW5RdWFydCh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgNCk7XG4gIH0sXG5cbiAgZWFzZU91dFF1YXJ0KHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCA0KSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbk91dFF1YXJ0KHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCA0KTtcblxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIE1hdGgucG93KHZhbHVlLCAzKSAtIDIpO1xuICB9LFxuXG4gIGVhc2VJblNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gLU1hdGguY29zKHZhbHVlICogTWF0aFV0aWwuUElfMikgKyAxO1xuICB9LFxuXG4gIGVhc2VPdXRTaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGguc2luKHZhbHVlICogTWF0aFV0aWwuUElfMik7XG4gIH0sXG5cbiAgZWFzZUluT3V0U2luZSh2YWx1ZSkge1xuICAgIHJldHVybiAtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiB2YWx1ZSkgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5FeHBvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gMCA6IE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xuICB9LFxuXG4gIGVhc2VPdXRFeHBvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAxID8gMSA6IC1NYXRoLnBvdygyLCAtMTAgKiB2YWx1ZSkgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEV4cG8odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IDApIHJldHVybiAwO1xuXG4gICAgaWYgKHZhbHVlID09PSAxKSByZXR1cm4gMTtcblxuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAxMCAqICh2YWx1ZSAtIDEpKTtcblxuICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdmFsdWUpICsgMik7XG4gIH0sXG5cbiAgZWFzZUluQ2lyYyh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcbiAgfSxcblxuICBlYXNlT3V0Q2lyYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIE1hdGgucG93KHZhbHVlIC0gMSwgMikpO1xuICB9LFxuXG4gIGVhc2VJbk91dENpcmModmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHZhbHVlICogdmFsdWUpIC0gMSk7XG4gICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtICh2YWx1ZSAtPSAyKSAqIHZhbHVlKSArIDEpO1xuICB9LFxuXG4gIGVhc2VJbkJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuIHZhbHVlICogdmFsdWUgKiAoKHMgKyAxKSAqIHZhbHVlIC0gcyk7XG4gIH0sXG5cbiAgZWFzZU91dEJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuICh2YWx1ZSA9IHZhbHVlIC0gMSkgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgKyBzKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0QmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogKHZhbHVlICogdmFsdWUgKiAoKChzICo9IDEuNTI1KSArIDEpICogdmFsdWUgLSBzKSk7XG4gICAgcmV0dXJuIDAuNSAqICgodmFsdWUgLT0gMikgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSArIHMpICsgMik7XG4gIH0sXG5cbiAgZ2V0RWFzaW5nKGVhc2UpIHtcbiAgICBpZiAodHlwZW9mIGVhc2UgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGVhc2U7XG4gICAgZWxzZSByZXR1cm4gdGhpc1tlYXNlXSB8fCB0aGlzLmVhc2VMaW5lYXI7XG4gIH1cbn07XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yMkQge1xuICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgeDtcblxuICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgeTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBWZWN0b3IyRCBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt4PTBdIC0gVGhlIHggY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt5PTBdIC0gVGhlIHkgY29vcmRpbmF0ZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgdGhpcy55ID0geSB8fCAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHggYW5kIHkgY29tcG9uZW50cyBvZiB0aGlzIHZlY3Rvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeCBjb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5IGNvb3JkaW5hdGUuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBzZXQoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB4IGNvbXBvbmVudCBvZiB0aGlzIHZlY3Rvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeCBjb29yZGluYXRlLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgc2V0WCh4KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB5IGNvbXBvbmVudCBvZiB0aGlzIHZlY3Rvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeSBjb29yZGluYXRlLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgc2V0WSh5KSB7XG4gICAgdGhpcy55ID0geTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBncmFkaWVudCAoYW5nbGUpIG9mIHRoaXMgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZ3JhZGllbnQgaW4gcmFkaWFucy5cbiAgICovXG4gIGdldEdyYWRpZW50KCkge1xuICAgIGlmICh0aGlzLnggIT09IDApIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcbiAgICBlbHNlIGlmICh0aGlzLnkgPiAwKSByZXR1cm4gTWF0aFV0aWwuUElfMjtcbiAgICBlbHNlIGlmICh0aGlzLnkgPCAwKSByZXR1cm4gLU1hdGhVdGlsLlBJXzI7XG4gIH1cblxuICAvKipcbiAgICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyBvbmUuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgdmVjdG9yIHRvIGNvcHkgZnJvbS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIGNvcHkodikge1xuICAgIHRoaXMueCA9IHYueDtcbiAgICB0aGlzLnkgPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFub3RoZXIgdmVjdG9yIHRvIHRoaXMgb25lLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIHZlY3RvciB0byBhZGQuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFt3XSAtIEFuIG9wdGlvbmFsIHNlY29uZCB2ZWN0b3IgdG8gYWRkLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgYWRkKHYsIHcpIHtcbiAgICBpZiAodyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRWZWN0b3JzKHYsIHcpO1xuICAgIH1cblxuICAgIHRoaXMueCArPSB2Lng7XG4gICAgdGhpcy55ICs9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgc2NhbGFyIHZhbHVlcyB0byB0aGlzIHZlY3RvcidzIGNvbXBvbmVudHMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhIC0gVmFsdWUgdG8gYWRkIHRvIHguXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBiIC0gVmFsdWUgdG8gYWRkIHRvIHkuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBhZGRYWShhLCBiKSB7XG4gICAgdGhpcy54ICs9IGE7XG4gICAgdGhpcy55ICs9IGI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHR3byB2ZWN0b3JzIGFuZCBzZXRzIHRoZSByZXN1bHQgdG8gdGhpcyB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IGEgLSBUaGUgZmlyc3QgdmVjdG9yIHRvIGFkZC5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gYiAtIFRoZSBzZWNvbmQgdmVjdG9yIHRvIGFkZC5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIGFkZFZlY3RvcnMoYSwgYikge1xuICAgIHRoaXMueCA9IGEueCArIGIueDtcbiAgICB0aGlzLnkgPSBhLnkgKyBiLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFt3XSAtIEFuIG9wdGlvbmFsIHNlY29uZCB2ZWN0b3IgdG8gc3VidHJhY3QuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBzdWIodiwgdykge1xuICAgIGlmICh3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YlZlY3RvcnModiwgdyk7XG4gICAgfVxuXG4gICAgdGhpcy54IC09IHYueDtcbiAgICB0aGlzLnkgLT0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSBhbm90aGVyIGFuZCBzZXRzIHRoZSByZXN1bHQgdG8gdGhpcyB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IGEgLSBUaGUgdmVjdG9yIHRvIHN1YnRyYWN0IGZyb20uXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IGIgLSBUaGUgdmVjdG9yIHRvIHN1YnRyYWN0LlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgc3ViVmVjdG9ycyhhLCBiKSB7XG4gICAgdGhpcy54ID0gYS54IC0gYi54O1xuICAgIHRoaXMueSA9IGEueSAtIGIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERpdmlkZXMgdGhpcyB2ZWN0b3IgYnkgYSBzY2FsYXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzIC0gVGhlIHNjYWxhciB0byBkaXZpZGUgYnkuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBkaXZpZGVTY2FsYXIocykge1xuICAgIGlmIChzICE9PSAwKSB7XG4gICAgICB0aGlzLnggLz0gcztcbiAgICAgIHRoaXMueSAvPSBzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldCgwLCAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHRoaXMgdmVjdG9yIGJ5IGEgc2NhbGFyLlxuICAgKiBAcGFyYW0ge251bWJlcn0gcyAtIFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgYnkuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBtdWx0aXBseVNjYWxhcihzKSB7XG4gICAgdGhpcy54ICo9IHM7XG4gICAgdGhpcy55ICo9IHM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBOZWdhdGVzIHRoaXMgdmVjdG9yIChpbnZlcnRzIGl0cyBkaXJlY3Rpb24pLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgbmVnYXRlKCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyKC0xKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciB3aXRoIGFub3RoZXIuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgb3RoZXIgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZG90IHByb2R1Y3QuXG4gICAqL1xuICBkb3Qodikge1xuICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2Lnk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBzcXVhcmVkIGxlbmd0aC5cbiAgICovXG4gIGxlbmd0aFNxKCkge1xuICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbGVuZ3RoLlxuICAgKi9cbiAgbGVuZ3RoKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemVzIHRoaXMgdmVjdG9yIChtYWtlcyBpdCB1bml0IGxlbmd0aCkuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBub3JtYWxpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKHRoaXMubGVuZ3RoKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIHRvIGFub3RoZXIgdmVjdG9yLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIG90aGVyIHZlY3Rvci5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGRpc3RhbmNlLlxuICAgKi9cbiAgZGlzdGFuY2VUbyh2KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlVG9TcXVhcmVkKHYpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGVzIHRoaXMgdmVjdG9yIGJ5IGFuIGFuZ2xlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGhhIC0gVGhlIGFuZ2xlIHRvIHJvdGF0ZSBieSAoaW4gcmFkaWFucykuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICByb3RhdGUodGhhKSB7XG4gICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICBjb25zdCB5ID0gdGhpcy55O1xuXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKHRoYSkgKyB5ICogTWF0aC5zaW4odGhhKTtcbiAgICB0aGlzLnkgPSAteCAqIE1hdGguc2luKHRoYSkgKyB5ICogTWF0aC5jb3ModGhhKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZGlzdGFuY2UgdG8gYW5vdGhlciB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgb3RoZXIgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgc3F1YXJlZCBkaXN0YW5jZS5cbiAgICovXG4gIGRpc3RhbmNlVG9TcXVhcmVkKHYpIHtcbiAgICBjb25zdCBkeCA9IHRoaXMueCAtIHYueDtcbiAgICBjb25zdCBkeSA9IHRoaXMueSAtIHYueTtcblxuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5lYXJseSBpbnRlcnBvbGF0ZXMgdGhpcyB2ZWN0b3IgdG93YXJkIGFub3RoZXIgdmVjdG9yLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIHRhcmdldCB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbHBoYSAtIFRoZSBpbnRlcnBvbGF0aW9uIGZhY3RvciAoMC0xKS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIGxlcnAodiwgYWxwaGEpIHtcbiAgICB0aGlzLnggKz0gKHYueCAtIHRoaXMueCkgKiBhbHBoYTtcbiAgICB0aGlzLnkgKz0gKHYueSAtIHRoaXMueSkgKiBhbHBoYTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGlzIHZlY3RvciBpcyBlcXVhbCB0byBhbm90aGVyIHZlY3Rvci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSBvdGhlciB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgZXF1YWxzKHYpIHtcbiAgICByZXR1cm4gdi54ID09PSB0aGlzLnggJiYgdi55ID09PSB0aGlzLnk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGlzIHZlY3RvciB0byB6ZXJvLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy54ID0gMC4wO1xuICAgIHRoaXMueSA9IDAuMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHZlY3RvciB3aXRoIHRoZSBzYW1lIHggYW5kIHkgdmFsdWVzIGFzIHRoaXMgb25lLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IEEgbmV3IFZlY3RvcjJEIGluc3RhbmNlLlxuICAgKi9cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLngsIHRoaXMueSk7XG4gIH1cbn1cbiIsImltcG9ydCBSZ2IgZnJvbSBcIi4uL3V0aWxzL1JnYlwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUHJvcFV0aWwgZnJvbSBcIi4uL3V0aWxzL1Byb3BVdGlsXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi4vbWF0aC9lYXNlXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwYXJ0aWNsZSBpbiBhIHBhcnRpY2xlIHN5c3RlbS5cbiAqIEBjbGFzcyBQYXJ0aWNsZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XG4gIC8qKiBAdHlwZSB7c3RyaW5nfSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIHBhcnRpY2xlICovXG4gIGlkID0gXCJcIjtcblxuICAvKiogQHR5cGUge3twOlZlY3RvcjJELHY6VmVjdG9yMkQsYTpWZWN0b3IyRH19IE9sZCBzdGF0ZSBvZiB0aGUgcGFydGljbGUgKi9cbiAgb2xkID0gbnVsbDtcblxuICAvKiogQHR5cGUge29iamVjdH0gQ3VzdG9tIGRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSBwYXJ0aWNsZSAqL1xuICBkYXRhID0gbnVsbDtcblxuICAvKiogQHR5cGUge0JlaGF2aW91cltdfSBBcnJheSBvZiBiZWhhdmlvdXJzIGFwcGxpZWQgdG8gdGhlIHBhcnRpY2xlICovXG4gIGJlaGF2aW91cnMgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9IEN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHBhcnRpY2xlICovXG4gIHAgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9IEN1cnJlbnQgdmVsb2NpdHkgb2YgdGhlIHBhcnRpY2xlICovXG4gIHYgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9IEN1cnJlbnQgYWNjZWxlcmF0aW9uIG9mIHRoZSBwYXJ0aWNsZSAqL1xuICBhID0gbnVsbDtcblxuICAvKiogQHR5cGUge1JnYn0gQ29sb3Igb2YgdGhlIHBhcnRpY2xlICovXG4gIHJnYiA9IG51bGw7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUGFydGljbGUgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZl0gQ29uZmlndXJhdGlvbiBvYmplY3QgZm9yIHRoZSBwYXJ0aWNsZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZikge1xuICAgIHRoaXMubmFtZSA9IFwiUGFydGljbGVcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICAgIHRoaXMub2xkID0ge307XG4gICAgdGhpcy5kYXRhID0ge307XG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XG5cbiAgICB0aGlzLnAgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLnYgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmEgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC5wID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQudiA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLmEgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIHRoaXMucmdiID0gbmV3IFJnYigpO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBjb25mICYmIFByb3BVdGlsLnNldFByb3AodGhpcywgY29uZik7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZGlyZWN0aW9uIG9mIHRoZSBwYXJ0aWNsZSdzIG1vdmVtZW50IGluIGRlZ3JlZXMuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBkaXJlY3Rpb24gaW4gZGVncmVlc1xuICAgKi9cbiAgZ2V0RGlyZWN0aW9uKCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMudi54LCAtdGhpcy52LnkpICogTWF0aFV0aWwuTjE4MF9QSTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIHBhcnRpY2xlIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuICAgKiBAcmV0dXJucyB7UGFydGljbGV9IFRoZSBwYXJ0aWNsZSBpbnN0YW5jZVxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5saWZlID0gSW5maW5pdHk7XG4gICAgdGhpcy5hZ2UgPSAwO1xuXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5zbGVlcCA9IGZhbHNlO1xuICAgIHRoaXMuYm9keSA9IG51bGw7XG4gICAgdGhpcy5zcHJpdGUgPSBudWxsO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcblxuICAgIHRoaXMuZW5lcmd5ID0gMTsgLy8gRW5lcmd5IExvc3NcbiAgICB0aGlzLm1hc3MgPSAxO1xuICAgIHRoaXMucmFkaXVzID0gMTA7XG4gICAgdGhpcy5hbHBoYSA9IDE7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgdGhpcy5jb2xvciA9IG51bGw7XG5cbiAgICB0aGlzLnAuc2V0KDAsIDApO1xuICAgIHRoaXMudi5zZXQoMCwgMCk7XG4gICAgdGhpcy5hLnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC5wLnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC52LnNldCgwLCAwKTtcbiAgICB0aGlzLm9sZC5hLnNldCgwLCAwKTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZWFzZUxpbmVhcjtcblxuICAgIHRoaXMucmdiLnJlc2V0KCk7XG4gICAgVXRpbC5lbXB0eU9iamVjdCh0aGlzLmRhdGEpO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcGFydGljbGUncyBzdGF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIHRpbWUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB1cGRhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgcGFydGljbGUgaW4gaXRzIHBhcmVudCBzeXN0ZW1cbiAgICovXG4gIHVwZGF0ZSh0aW1lLCBpbmRleCkge1xuICAgIGlmICghdGhpcy5zbGVlcCkge1xuICAgICAgdGhpcy5hZ2UgKz0gdGltZTtcbiAgICAgIHRoaXMuYXBwbHlCZWhhdmlvdXJzKHRpbWUsIGluZGV4KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hZ2UgPCB0aGlzLmxpZmUpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcodGhpcy5hZ2UgLyB0aGlzLmxpZmUpO1xuICAgICAgdGhpcy5lbmVyZ3kgPSBNYXRoLm1heCgxIC0gc2NhbGUsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhbGwgYmVoYXZpb3VycyBhdHRhY2hlZCB0byB0aGUgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIFRoZSB0aW1lIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdXBkYXRlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIHBhcnRpY2xlIGluIGl0cyBwYXJlbnQgc3lzdGVtXG4gICAqL1xuICBhcHBseUJlaGF2aW91cnModGltZSwgaW5kZXgpIHtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmJlaGF2aW91cnMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmJlaGF2aW91cnNbaV0gJiYgdGhpcy5iZWhhdmlvdXJzW2ldLmFwcGx5QmVoYXZpb3VyKHRoaXMsIHRpbWUsIGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGJlaGF2aW91ciB0byB0aGUgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgVGhlIGJlaGF2aW91ciB0byBhZGRcbiAgICovXG4gIGFkZEJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGJlaGF2aW91ci5oYXNPd25Qcm9wZXJ0eShcInBhcmVudHNcIikpIGJlaGF2aW91ci5wYXJlbnRzLnB1c2godGhpcyk7XG4gICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBtdWx0aXBsZSBiZWhhdmlvdXJzIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtCZWhhdmlvdXJbXX0gYmVoYXZpb3VycyBBbiBhcnJheSBvZiBiZWhhdmlvdXJzIHRvIGFkZFxuICAgKi9cbiAgYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYWRkQmVoYXZpb3VyKGJlaGF2aW91cnNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgc3BlY2lmaWMgYmVoYXZpb3VyIGZyb20gdGhlIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIFRoZSBiZWhhdmlvdXIgdG8gcmVtb3ZlXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGNvbnN0IGJlaGF2aW91ciA9IHRoaXMuYmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgYmVoYXZpb3VyLnBhcmVudHMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBiZWhhdmlvdXJzIGZyb20gdGhlIHBhcnRpY2xlLlxuICAgKi9cbiAgcmVtb3ZlQWxsQmVoYXZpb3VycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgcGFydGljbGUsIHJlbW92aW5nIGFsbCBiZWhhdmlvdXJzIGFuZCBzZXR0aW5nIGl0IGFzIGRlYWQuXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgIHRoaXMuZW5lcmd5ID0gMDtcbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogQHR5cGVkZWYgIHtPYmplY3R9IHJnYk9iamVjdFxuICAgKiBAcHJvcGVydHkge051bWJlcn0gciByZWQgdmFsdWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGcgZ3JlZW4gdmFsdWVcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGIgYmx1ZSB2YWx1ZVxuICAgKi9cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGEgaGV4IHZhbHVlIHRvIGEgcmdiIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgaGV4VG9SZ2JcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGggYW55IGhleCB2YWx1ZSwgZS5nLiAjMDAwMDAwIG9yIDAwMDAwMCBmb3IgYmxhY2tcbiAgICpcbiAgICogQHJldHVybiB7cmdiT2JqZWN0fVxuICAgKi9cbiAgaGV4VG9SZ2IoaCkge1xuICAgIGNvbnN0IGhleDE2ID0gaC5jaGFyQXQoMCkgPT09IFwiI1wiID8gaC5zdWJzdHJpbmcoMSwgNykgOiBoO1xuICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoMCwgMiksIDE2KTtcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDIsIDQpLCAxNik7XG4gICAgY29uc3QgYiA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZyg0LCA2KSwgMTYpO1xuXG4gICAgcmV0dXJuIHsgciwgZywgYiB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhIHJnYiB2YWx1ZSB0byBhIHJnYiBzdHJpbmdcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHJnYlRvSGV4XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgUHJvdG9uLmhleFRvUmdifSByZ2IgYSByZ2Igb2JqZWN0IGxpa2UgaW4ge0BsaW5rIFByb3RvbiNQcm90b24ufVxuICAgKlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHJnYigpXG4gICAqL1xuICByZ2JUb0hleChyYmcpIHtcbiAgICByZXR1cm4gYHJnYigke3JiZy5yfSwgJHtyYmcuZ30sICR7cmJnLmJ9KWA7XG4gIH0sXG5cbiAgZ2V0SGV4MTZGcm9tUGFydGljbGUocCkge1xuICAgIHJldHVybiBOdW1iZXIocC5yZ2IucikgKiA2NTUzNiArIE51bWJlcihwLnJnYi5nKSAqIDI1NiArIE51bWJlcihwLnJnYi5iKTtcbiAgfVxufTtcbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9WZWN0b3IyRFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2xhcjJEIHtcbiAgY29uc3RydWN0b3IociwgdGhhKSB7XG4gICAgdGhpcy5yID0gTWF0aC5hYnMocikgfHwgMDtcbiAgICB0aGlzLnRoYSA9IHRoYSB8fCAwO1xuICB9XG5cbiAgc2V0KHIsIHRoYSkge1xuICAgIHRoaXMuciA9IHI7XG4gICAgdGhpcy50aGEgPSB0aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRSKHIpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0VGhhKHRoYSkge1xuICAgIHRoaXMudGhhID0gdGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29weShwKSB7XG4gICAgdGhpcy5yID0gcC5yO1xuICAgIHRoaXMudGhhID0gcC50aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b1ZlY3RvcigpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMuZ2V0WCgpLCB0aGlzLmdldFkoKSk7XG4gIH1cblxuICBnZXRYKCkge1xuICAgIHJldHVybiB0aGlzLnIgKiBNYXRoLnNpbih0aGlzLnRoYSk7XG4gIH1cblxuICBnZXRZKCkge1xuICAgIHJldHVybiAtdGhpcy5yICogTWF0aC5jb3ModGhpcy50aGEpO1xuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHRoaXMuciA9IDE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnIgPT09IHRoaXMuciAmJiB2LnRoYSA9PT0gdGhpcy50aGE7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnIgPSAwLjA7XG4gICAgdGhpcy50aGEgPSAwLjA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFBvbGFyMkQodGhpcy5yLCB0aGlzLnRoYSk7XG4gIH1cbn1cbiIsImNvbnN0IE1hdDMgPSB7XG4gIGNyZWF0ZShtYXQzKSB7XG4gICAgY29uc3QgbWF0ID0gbmV3IEZsb2F0MzJBcnJheSg5KTtcbiAgICBpZiAobWF0MykgdGhpcy5zZXQobWF0MywgbWF0KTtcblxuICAgIHJldHVybiBtYXQ7XG4gIH0sXG5cbiAgc2V0KG1hdDEsIG1hdDIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykgbWF0MltpXSA9IG1hdDFbaV07XG5cbiAgICByZXR1cm4gbWF0MjtcbiAgfSxcblxuICBtdWx0aXBseShtYXQsIG1hdDIsIG1hdDMpIHtcbiAgICBsZXQgYTAwID0gbWF0WzBdLFxuICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgYTAyID0gbWF0WzJdLFxuICAgICAgYTEwID0gbWF0WzNdLFxuICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgYTIwID0gbWF0WzZdLFxuICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgYjAwID0gbWF0MlswXSxcbiAgICAgIGIwMSA9IG1hdDJbMV0sXG4gICAgICBiMDIgPSBtYXQyWzJdLFxuICAgICAgYjEwID0gbWF0MlszXSxcbiAgICAgIGIxMSA9IG1hdDJbNF0sXG4gICAgICBiMjAgPSBtYXQyWzZdLFxuICAgICAgYjIxID0gbWF0Mls3XTtcblxuICAgIG1hdDNbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTA7XG4gICAgbWF0M1sxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMTtcbiAgICBtYXQzWzJdID0gYTAyICogYjAyO1xuICAgIG1hdDNbM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTA7XG4gICAgbWF0M1s0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMTtcbiAgICBtYXQzWzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYTIwO1xuICAgIG1hdDNbN10gPSBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBhMjE7XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfSxcblxuICBpbnZlcnNlKG1hdCwgbWF0Mykge1xuICAgIGxldCBhMDAgPSBtYXRbMF0sXG4gICAgICBhMDEgPSBtYXRbMV0sXG4gICAgICBhMTAgPSBtYXRbM10sXG4gICAgICBhMTEgPSBtYXRbNF0sXG4gICAgICBhMjAgPSBtYXRbNl0sXG4gICAgICBhMjEgPSBtYXRbN10sXG4gICAgICBiMDEgPSBhMTEsXG4gICAgICBiMTEgPSAtYTEwLFxuICAgICAgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwLFxuICAgICAgZCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSxcbiAgICAgIGlkO1xuXG4gICAgaWQgPSAxIC8gZDtcbiAgICBtYXQzWzBdID0gYjAxICogaWQ7XG4gICAgbWF0M1sxXSA9IC1hMDEgKiBpZDtcbiAgICBtYXQzWzNdID0gYjExICogaWQ7XG4gICAgbWF0M1s0XSA9IGEwMCAqIGlkO1xuICAgIG1hdDNbNl0gPSBiMjEgKiBpZDtcbiAgICBtYXQzWzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogaWQ7XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfSxcblxuICBtdWx0aXBseVZlYzIobSwgdmVjLCBtYXQzKSB7XG4gICAgbGV0IHggPSB2ZWNbMF0sXG4gICAgICB5ID0gdmVjWzFdO1xuXG4gICAgbWF0M1swXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyBtWzZdO1xuICAgIG1hdDNbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgbVs3XTtcblxuICAgIHJldHVybiBtYXQzO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXQzO1xuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4vU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJheVNwYW4gZXh0ZW5kcyBTcGFuIHtcbiAgY29uc3RydWN0b3IoY29sb3IpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2FyciA9IFV0aWwudG9BcnJheShjb2xvcik7XG4gIH1cblxuICBnZXRWYWx1ZSgpIHtcbiAgICBjb25zdCB2YWwgPSBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy5fYXJyKTtcbiAgICByZXR1cm4gdmFsID09PSBcInJhbmRvbVwiIHx8IHZhbCA9PT0gXCJSYW5kb21cIiA/IE1hdGhVdGlsLnJhbmRvbUNvbG9yKCkgOiB2YWw7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBzdXJlIHRoYXQgdGhlIGNvbG9yIGlzIGFuIGluc3RhbmNlIG9mIFByb3Rvbi5BcnJheVNwYW4sIGlmIG5vdCBpdCBtYWtlcyBhIG5ldyBpbnN0YW5jZVxuICAgKlxuICAgKiBAbWV0aG9kIHNldFNwYW5WYWx1ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlQXJyYXlTcGFuKGFycikge1xuICAgIGlmICghYXJyKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChhcnIgaW5zdGFuY2VvZiBBcnJheVNwYW4pIHJldHVybiBhcnI7XG4gICAgZWxzZSByZXR1cm4gbmV3IEFycmF5U3BhbihhcnIpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXG4gICAgdGhpcy53aWR0aCA9IHc7XG4gICAgdGhpcy5oZWlnaHQgPSBoO1xuXG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy54ICsgdGhpcy53aWR0aDtcbiAgfVxuXG4gIGNvbnRhaW5zKHgsIHkpIHtcbiAgICBpZiAoeCA8PSB0aGlzLnJpZ2h0ICYmIHggPj0gdGhpcy54ICYmIHkgPD0gdGhpcy5ib3R0b20gJiYgeSA+PSB0aGlzLnkpIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuXG4vKipcbiAqIFJhdGUgY2xhc3MgZm9yIGNvbnRyb2xsaW5nIHBhcnRpY2xlIGVtaXNzaW9uIHJhdGUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGUge1xuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBudW1QYW47XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGltZVBhbjtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXJ0VGltZTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIG5leHRUaW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFJhdGUgaW5zdGFuY2UuXG4gICAqIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHBlciBzZWNvbmQgZW1pc3Npb24gKGEgW3BhcnRpY2xlXS9iIFtzXSkuXG4gICAqIEBwYXJhbSB7QXJyYXl8bnVtYmVyfFNwYW59IFtudW1wYW49MV0gLSBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBmb3IgZWFjaCBlbWlzc2lvbi5cbiAgICogQHBhcmFtIHtBcnJheXxudW1iZXJ8U3Bhbn0gW3RpbWVwYW49MV0gLSBUaGUgdGltZSBpbnRlcnZhbCBiZXR3ZWVuIGVhY2ggZW1pc3Npb24uXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIENyZWF0ZSBhIHJhdGUgb2YgMTAtMjAgcGFydGljbGVzIGV2ZXJ5IDAuMS0wLjI1IHNlY29uZHNcbiAgICogbmV3IFJhdGUobmV3IFNwYW4oMTAsIDIwKSwgbmV3IFNwYW4oMC4xLCAwLjI1KSk7XG4gICAqL1xuICBjb25zdHJ1Y3RvcihudW1wYW4sIHRpbWVwYW4pIHtcbiAgICB0aGlzLm51bVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKG51bXBhbiwgMSkpO1xuICAgIHRoaXMudGltZVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKHRpbWVwYW4sIDEpKTtcblxuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLm5leHRUaW1lID0gMDtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcmF0ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMubmV4dFRpbWUgPSB0aGlzLnRpbWVQYW4uZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgcGFydGljbGVzIHRvIGVtaXQgYmFzZWQgb24gdGhlIGVsYXBzZWQgdGltZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBUaGUgZWxhcHNlZCB0aW1lIHNpbmNlIHRoZSBsYXN0IHVwZGF0ZS5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgdG8gZW1pdC5cbiAgICovXG4gIGdldFZhbHVlKHRpbWUpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lID49IHRoaXMubmV4dFRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcbiAgICAgIHRoaXMubmV4dFRpbWUgPSB0aGlzLnRpbWVQYW4uZ2V0VmFsdWUoKTtcblxuICAgICAgaWYgKHRoaXMubnVtUGFuLmIgPT09IDEpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtUGFuLmdldFZhbHVlKGZhbHNlKSA+IDAuNSkgcmV0dXJuIDE7XG4gICAgICAgIGVsc2UgcmV0dXJuIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5udW1QYW4uZ2V0VmFsdWUodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEluaXRpYWxpemUge1xuICByZXNldCgpIHt9XG5cbiAgaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZSkge1xuICAgICAgdGhpcy5pbml0aWFsaXplKHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsaXplKGVtaXR0ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHN1YiBjbGFzcyBpbml0XG4gIGluaXRpYWxpemUodGFyZ2V0KSB7fVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG4vKipcbiAqIExpZmUgY2xhc3MgZm9yIGluaXRpYWxpemluZyBwYXJ0aWNsZSBsaWZldGltZS5cbiAqIEBleHRlbmRzIEluaXRpYWxpemVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlmZSBleHRlbmRzIEluaXRpYWxpemUge1xuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBsaWZlUGFuO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBMaWZlIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBhIC0gVGhlIGxpZmV0aW1lIHZhbHVlIG9yIHRoZSBsb3dlciBib3VuZCBvZiB0aGUgbGlmZXRpbWUgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbYl0gLSBUaGUgdXBwZXIgYm91bmQgb2YgdGhlIGxpZmV0aW1lIHJhbmdlIChpZiBhIGlzIGEgbnVtYmVyKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbY10gLSBXaGV0aGVyIHRvIHVzZSBjZW50ZXItYmFzZWQgY2FsY3VsYXRpb24gKGlmIGEgYW5kIGIgYXJlIG51bWJlcnMpLlxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmxpZmVQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcbiAgICB0aGlzLm5hbWUgPSBcIkxpZmVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbGlmZXRpbWUgb2YgYSB0YXJnZXQgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgLSBUaGUgdGFyZ2V0IHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqL1xuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIGlmICh0aGlzLmxpZmVQYW4uYSA9PT0gSW5maW5pdHkpIHRhcmdldC5saWZlID0gSW5maW5pdHk7XG4gICAgZWxzZSB0YXJnZXQubGlmZSA9IHRoaXMubGlmZVBhbi5nZXRWYWx1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVjdG9yID0gbmV3IFZlY3RvcjJEKDAsIDApO1xuICAgIHRoaXMucmFuZG9tID0gMDtcbiAgICB0aGlzLmNyb3NzVHlwZSA9IFwiZGVhZFwiO1xuICAgIHRoaXMuYWxlcnQgPSB0cnVlO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7fVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy52ZWN0b3IgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBvaW50IHpvbmUgaW4gYSAyRCBzcGFjZS5cbiAqIEBleHRlbmRzIFpvbmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRab25lIGV4dGVuZHMgWm9uZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFBvaW50Wm9uZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnggPSB4O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2ludC5cbiAgICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcG9zaXRpb24gdmVjdG9yLlxuICAgKi9cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueDtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIFBvaW50Wm9uZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIG9iamVjdCAodW51c2VkKS5cbiAgICovXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb3JyeSwgUG9pbnRab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3NpbmcgbWV0aG9kIVwiKTtcbiAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuLi96b25lL1BvaW50Wm9uZVwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG4vKipcbiAqIFBvc2l0aW9uIGNsYXNzIGZvciBpbml0aWFsaXppbmcgcGFydGljbGUgcG9zaXRpb25zLlxuICogQGV4dGVuZHMgSW5pdGlhbGl6ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3NpdGlvbiBleHRlbmRzIEluaXRpYWxpemUge1xuICAvKipcbiAgICogQHR5cGUge1BvaW50Wm9uZXxhbnl9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB6b25lO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBQb3NpdGlvbiBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtQb2ludFpvbmV8YW55fSBbem9uZV0gLSBUaGUgem9uZSB0byB1c2UgZm9yIHBvc2l0aW9uaW5nLiBEZWZhdWx0cyB0byBhIG5ldyBQb2ludFpvbmUgaWYgbm90IHByb3ZpZGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3Ioem9uZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgICB0aGlzLm5hbWUgPSBcIlBvc2l0aW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoaXMgaW5pdGlhbGl6ZXIncyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge1BvaW50Wm9uZXxhbnl9IFt6b25lXSAtIFRoZSBuZXcgem9uZSB0byB1c2UgZm9yIHBvc2l0aW9uaW5nLiBEZWZhdWx0cyB0byBhIG5ldyBQb2ludFpvbmUgaWYgbm90IHByb3ZpZGVkLlxuICAgKi9cbiAgcmVzZXQoem9uZSkge1xuICAgIHRoaXMuem9uZSA9IFV0aWwuaW5pdFZhbHVlKHpvbmUsIG5ldyBQb2ludFpvbmUoKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBhcnRpY2xlJ3MgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgLSBUaGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldC5wIC0gVGhlIHBhcnRpY2xlJ3MgcG9zaXRpb24gb2JqZWN0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0LnAueCAtIFRoZSBwYXJ0aWNsZSdzIHggY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldC5wLnkgLSBUaGUgcGFydGljbGUncyB5IGNvb3JkaW5hdGUuXG4gICAqL1xuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIHRoaXMuem9uZS5nZXRQb3NpdGlvbigpO1xuXG4gICAgdGFyZ2V0LnAueCA9IHRoaXMuem9uZS52ZWN0b3IueDtcbiAgICB0YXJnZXQucC55ID0gdGhpcy56b25lLnZlY3Rvci55O1xuICB9XG59XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcbmltcG9ydCBQb2xhcjJEIGZyb20gXCIuLi9tYXRoL1BvbGFyMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG4vKipcbiAqIFZlbG9jaXR5IGNsYXNzIGZvciBpbml0aWFsaXppbmcgcGFydGljbGUgdmVsb2NpdGllcy5cbiAqIEBleHRlbmRzIEluaXRpYWxpemVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVsb2NpdHkgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgclBhbjtcblxuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGFQYW47XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFZlbG9jaXR5IGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbcnBhbl0gLSBUaGUgcmFkaWFsIGNvbXBvbmVudCBvZiB0aGUgdmVsb2NpdHkgb3IgaXRzIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbdGhhcGFuXSAtIFRoZSBhbmd1bGFyIGNvbXBvbmVudCBvZiB0aGUgdmVsb2NpdHkgb3IgaXRzIHJhbmdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGU9J3ZlY3RvciddIC0gVGhlIHR5cGUgb2YgdmVsb2NpdHkgKCd2ZWN0b3InIG9yICdwb2xhcicpLlxuICAgKi9cbiAgY29uc3RydWN0b3IocnBhbiwgdGhhcGFuLCB0eXBlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuclBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHJwYW4pO1xuICAgIHRoaXMudGhhUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUodGhhcGFuKTtcbiAgICB0aGlzLnR5cGUgPSBVdGlsLmluaXRWYWx1ZSh0eXBlLCBcInZlY3RvclwiKTtcblxuICAgIHRoaXMubmFtZSA9IFwiVmVsb2NpdHlcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIHZlbG9jaXR5IHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFtycGFuXSAtIFRoZSByYWRpYWwgY29tcG9uZW50IG9mIHRoZSB2ZWxvY2l0eSBvciBpdHMgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFt0aGFwYW5dIC0gVGhlIGFuZ3VsYXIgY29tcG9uZW50IG9mIHRoZSB2ZWxvY2l0eSBvciBpdHMgcmFuZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT0ndmVjdG9yJ10gLSBUaGUgdHlwZSBvZiB2ZWxvY2l0eSAoJ3ZlY3Rvcicgb3IgJ3BvbGFyJykuXG4gICAqL1xuICByZXNldChycGFuLCB0aGFwYW4sIHR5cGUpIHtcbiAgICB0aGlzLnJQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShycGFuKTtcbiAgICB0aGlzLnRoYVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHRoYXBhbik7XG4gICAgdGhpcy50eXBlID0gVXRpbC5pbml0VmFsdWUodHlwZSwgXCJ2ZWN0b3JcIik7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyB0aGUgdmVsb2NpdHkgdmFsdWUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2ciAtIFRoZSB2ZWxvY2l0eSB2YWx1ZSB0byBub3JtYWxpemUuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBub3JtYWxpemVkIHZlbG9jaXR5IHZhbHVlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbm9ybWFsaXplVmVsb2NpdHkodnIpIHtcbiAgICByZXR1cm4gdnIgKiBQcm90b24uTUVBU1VSRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGFydGljbGUncyB2ZWxvY2l0eS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKi9cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSBcInBcIiB8fCB0aGlzLnR5cGUgPT09IFwiUFwiIHx8IHRoaXMudHlwZSA9PT0gXCJwb2xhclwiKSB7XG4gICAgICBjb25zdCBwb2xhcjJkID0gbmV3IFBvbGFyMkQoXG4gICAgICAgIHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy5yUGFuLmdldFZhbHVlKCkpLFxuICAgICAgICB0aGlzLnRoYVBhbi5nZXRWYWx1ZSgpICogTWF0aFV0aWwuUElfMTgwXG4gICAgICApO1xuXG4gICAgICB0YXJnZXQudi54ID0gcG9sYXIyZC5nZXRYKCk7XG4gICAgICB0YXJnZXQudi55ID0gcG9sYXIyZC5nZXRZKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC52LnggPSB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMuclBhbi5nZXRWYWx1ZSgpKTtcbiAgICAgIHRhcmdldC52LnkgPSB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMudGhhUGFuLmdldFZhbHVlKCkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG4vKipcbiAqIE1hc3MgY2xhc3MgZm9yIGluaXRpYWxpemluZyBwYXJ0aWNsZSBtYXNzLlxuICogQGV4dGVuZHMgSW5pdGlhbGl6ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXNzIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIG1hc3NQYW47XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IE1hc3MgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IGEgLSBUaGUgbWFzcyB2YWx1ZSBvciB0aGUgbG93ZXIgYm91bmQgb2YgdGhlIG1hc3MgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbYl0gLSBUaGUgdXBwZXIgYm91bmQgb2YgdGhlIG1hc3MgcmFuZ2UgKGlmIGEgaXMgYSBudW1iZXIpLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjXSAtIFdoZXRoZXIgdG8gdXNlIGNlbnRlci1iYXNlZCBjYWxjdWxhdGlvbiAoaWYgYSBhbmQgYiBhcmUgbnVtYmVycykuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hc3NQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcbiAgICB0aGlzLm5hbWUgPSBcIk1hc3NcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbWFzcyBvZiBhIHRhcmdldCBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCAtIFRoZSB0YXJnZXQgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICovXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgdGFyZ2V0Lm1hc3MgPSB0aGlzLm1hc3NQYW4uZ2V0VmFsdWUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG4vKipcbiAqIFJhZGl1cyBjbGFzcyBmb3IgaW5pdGlhbGl6aW5nIHBhcnRpY2xlIHJhZGl1cy5cbiAqIEBleHRlbmRzIEluaXRpYWxpemVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaXVzIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICovXG4gIHJhZGl1cztcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUmFkaXVzIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBhIC0gVGhlIHJhZGl1cyB2YWx1ZSBvciB0aGUgbG93ZXIgYm91bmQgb2YgdGhlIHJhZGl1cyByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtiXSAtIFRoZSB1cHBlciBib3VuZCBvZiB0aGUgcmFkaXVzIHJhbmdlIChpZiBhIGlzIGEgbnVtYmVyKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbY10gLSBXaGV0aGVyIHRvIHVzZSBjZW50ZXItYmFzZWQgY2FsY3VsYXRpb24gKGlmIGEgYW5kIGIgYXJlIG51bWJlcnMpLlxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yYWRpdXMgPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcbiAgICB0aGlzLm5hbWUgPSBcIlJhZGl1c1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGlzIGluaXRpYWxpemVyJ3MgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gYSAtIFRoZSByYWRpdXMgdmFsdWUgb3IgdGhlIGxvd2VyIGJvdW5kIG9mIHRoZSByYWRpdXMgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbYl0gLSBUaGUgdXBwZXIgYm91bmQgb2YgdGhlIHJhZGl1cyByYW5nZSAoaWYgYSBpcyBhIG51bWJlcikuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NdIC0gV2hldGhlciB0byB1c2UgY2VudGVyLWJhc2VkIGNhbGN1bGF0aW9uIChpZiBhIGFuZCBiIGFyZSBudW1iZXJzKS5cbiAgICovXG4gIHJlc2V0KGEsIGIsIGMpIHtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwYXJ0aWNsZSdzIHJhZGl1cy5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5yYWRpdXMgPSB0aGlzLnJhZGl1cy5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuLyoqXG4gKiBCb2R5IGNsYXNzIGZvciBpbml0aWFsaXppbmcgcGFydGljbGUgYm9kaWVzLlxuICogQGV4dGVuZHMgSW5pdGlhbGl6ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2R5IGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXlTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaW1hZ2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IEJvZHkgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdHxBcnJheVNwYW59IGltYWdlIC0gVGhlIGltYWdlIHNvdXJjZSBvciBvYmplY3QgdG8gdXNlIGZvciB0aGUgcGFydGljbGUgYm9keS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt3PTIwXSAtIFRoZSB3aWR0aCBvZiB0aGUgcGFydGljbGUgYm9keS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtoXSAtIFRoZSBoZWlnaHQgb2YgdGhlIHBhcnRpY2xlIGJvZHkuIERlZmF1bHRzIHRvIHRoZSB3aWR0aCBpZiBub3QgcHJvdmlkZWQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbWFnZSwgdywgaCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmltYWdlID0gdGhpcy5zZXRTcGFuVmFsdWUoaW1hZ2UpO1xuICAgIHRoaXMudyA9IFV0aWwuaW5pdFZhbHVlKHcsIDIwKTtcbiAgICB0aGlzLmggPSBVdGlsLmluaXRWYWx1ZShoLCB0aGlzLncpO1xuICAgIHRoaXMubmFtZSA9IFwiQm9keVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwYXJ0aWNsZSdzIGJvZHkuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGltYWdlVGFyZ2V0ID0gdGhpcy5pbWFnZS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKHR5cGVvZiBpbWFnZVRhcmdldCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcGFydGljbGUuYm9keSA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMudyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmgsXG4gICAgICAgIHNyYzogaW1hZ2VUYXJnZXQsXG4gICAgICAgIGlzSW5uZXI6IHRydWUsXG4gICAgICAgIGlubmVyOiB0cnVlXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gaW1hZ2VUYXJnZXQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNwYW4gdmFsdWUgZm9yIHRoZSBpbWFnZS5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fEFycmF5U3Bhbn0gaW1hZ2UgLSBUaGUgaW1hZ2Ugc291cmNlIG9yIG9iamVjdCB0byBzZXQgYXMgc3BhbiB2YWx1ZS5cbiAgICogQHJldHVybnMge0FycmF5U3Bhbn0gVGhlIEFycmF5U3BhbiBpbnN0YW5jZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldFNwYW5WYWx1ZShpbWFnZSkge1xuICAgIHJldHVybiBpbWFnZSBpbnN0YW5jZW9mIEFycmF5U3BhbiA/IGltYWdlIDogbmV3IEFycmF5U3BhbihpbWFnZSk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4uL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IGVhc2UgZnJvbSBcIi4uL21hdGgvZWFzZVwiO1xuXG4vKipcbiAqIFRoZSBCZWhhdmlvdXIgY2xhc3MgaXMgdGhlIGJhc2UgZm9yIHRoZSBvdGhlciBCZWhhdmlvdXJcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZWhhdmlvdXIge1xuICBzdGF0aWMgaWQgPSAwO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgQmVoYXZpb3VyIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGUgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kLCBmb3IgZXhhbXBsZSBlYXNlLmVhc2VPdXRRdWFydFxuICAgKi9cbiAgY29uc3RydWN0b3IobGlmZSwgZWFzaW5nKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGJlaGF2aW91cidzIGxpZmVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGlmZSA9IFV0aWwuaW5pdFZhbHVlKGxpZmUsIEluZmluaXR5KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb25cbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICovXG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmdldEVhc2luZyhlYXNpbmcpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGJlaGF2aW91cidzIGN1cnJlbnQgYWdlXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmFnZSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgY3VycmVudCBlbmVyZ3lcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuZW5lcmd5ID0gMTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGJlaGF2aW91ciBpcyBkZWFkXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgcGFyZW50IGVtaXR0ZXJzXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIHRoaXMucGFyZW50cyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGJlaGF2aW91cidzIHVuaXF1ZSBpZFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5pZCA9IGBCZWhhdmlvdXJfJHtCZWhhdmlvdXIuaWQrK31gO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGJlaGF2aW91cidzIG5hbWVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiQmVoYXZpb3VyXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGlzIGJlaGF2aW91cidzIG5ldyBsaWZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlTGluZWFyJ10gLSBUaGlzIGJlaGF2aW91cidzIG5ldyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMubGlmZSA9IFV0aWwuaW5pdFZhbHVlKGxpZmUsIEluZmluaXR5KTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZ2V0RWFzaW5nKGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIGEgZm9yY2UgYnkgMToxMDBcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IGZvcmNlIC0gVGhlIGZvcmNlIHRvIG5vcm1hbGl6ZVxuICAgKiBAcmV0dXJucyB7UHJvdG9uLlZlY3RvcjJEfSBUaGUgbm9ybWFsaXplZCBmb3JjZVxuICAgKi9cbiAgbm9ybWFsaXplRm9yY2UoZm9yY2UpIHtcbiAgICByZXR1cm4gZm9yY2UubXVsdGlwbHlTY2FsYXIoUHJvdG9uLk1FQVNVUkUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIHZhbHVlIGJ5IDE6MTAwXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBub3JtYWxpemVcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5vcm1hbGl6ZWQgdmFsdWVcbiAgICovXG4gIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICogUHJvdG9uLk1FQVNVUkU7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge31cblxuICAvKipcbiAgICogQ29tcHV0ZSB0aGUgYmVoYXZpb3VyJ3MgbGlmZSBjeWNsZVxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gY2FsY3VsYXRlIGZvclxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuYWdlICs9IHRpbWU7XG5cbiAgICBpZiAodGhpcy5hZ2UgPj0gdGhpcy5saWZlIHx8IHRoaXMuZGVhZCkge1xuICAgICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZWFzaW5nKHBhcnRpY2xlLmFnZSAvIHBhcnRpY2xlLmxpZmUpO1xuICAgICAgdGhpcy5lbmVyZ3kgPSBNYXRoLm1heCgxIC0gc2NhbGUsIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciB0byBhIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhpcyBiZWhhdmlvdXJcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgbGV0IGkgPSB0aGlzLnBhcmVudHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMucGFyZW50c1tpXS5yZW1vdmVCZWhhdmlvdXIodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJlbnRzLmxlbmd0aCA9IDA7XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yY2UgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkZvcmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeFxuICAgKiBAcGFyYW0ge051bWJlcn0gZnlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZngsIGZ5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5mb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UobmV3IFZlY3RvcjJEKGZ4LCBmeSkpO1xuICAgIHRoaXMubmFtZSA9IFwiRm9yY2VcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGZ4LCBmeSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5mb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UobmV3IFZlY3RvcjJEKGZ4LCBmeSkpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLmEuYWRkKHRoaXMuZm9yY2UpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG4vKipcbiAqIEF0dHJhY3Rpb24gYmVoYXZpb3IgZm9yIHBhcnRpY2xlcy5cbiAqIFRoaXMgYmVoYXZpb3VyIG1ha2VzIHBhcnRpY2xlcyBmb2xsb3cgYSBzcGVjaWZpYyB0YXJnZXQgcG9zaXRpb24uXG4gKiBAZXh0ZW5kcyBCZWhhdmlvdXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXR0cmFjdGlvbiBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEF0dHJhY3Rpb24uXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIC0gVGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZm9yY2U9MTAwXSAtIFRoZSBzdHJlbmd0aCBvZiB0aGUgYXR0cmFjdGlvbiBmb3JjZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtyYWRpdXM9MTAwMF0gLSBUaGUgcmFkaXVzIG9mIGluZmx1ZW5jZSBmb3IgdGhlIGF0dHJhY3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGUgbGlmZSBzcGFuIG9mIHRoaXMgYmVoYXZpb3VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZS5lYXNlTGluZWFyJ10gLSBUaGUgZWFzaW5nIGZ1bmN0aW9uIGZvciB0aGlzIGJlaGF2aW91ci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBwb3NpdGlvbiBmb3IgYXR0cmFjdGlvbi5cbiAgICAgKiBAdHlwZSB7VmVjdG9yMkR9XG4gICAgICovXG4gICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IFV0aWwuaW5pdFZhbHVlKHRhcmdldFBvc2l0aW9uLCBuZXcgVmVjdG9yMkQoKSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmFkaXVzIG9mIGluZmx1ZW5jZSBmb3IgdGhlIGF0dHJhY3Rpb24uXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnJhZGl1cyA9IFV0aWwuaW5pdFZhbHVlKHJhZGl1cywgMTAwMCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3RyZW5ndGggb2YgdGhlIGF0dHJhY3Rpb24gZm9yY2UuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3F1YXJlZCByYWRpdXMgKGZvciBvcHRpbWl6YXRpb24pLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5yYWRpdXNTcSA9IHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXM7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYXR0cmFjdGlvbiBmb3JjZSB2ZWN0b3IuXG4gICAgICogQHR5cGUge1ZlY3RvcjJEfVxuICAgICAqL1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlID0gbmV3IFZlY3RvcjJEKCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3F1YXJlZCBsZW5ndGggb2YgdGhlIGF0dHJhY3Rpb24gZm9yY2UuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbmd0aFNxID0gMDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBiZWhhdmlvdXIuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcIkF0dHJhY3Rpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIC0gVGhlIG5ldyBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2ZvcmNlPTEwMF0gLSBUaGUgbmV3IHN0cmVuZ3RoIG9mIHRoZSBhdHRyYWN0aW9uIGZvcmNlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3JhZGl1cz0xMDAwXSAtIFRoZSBuZXcgcmFkaXVzIG9mIGluZmx1ZW5jZSBmb3IgdGhlIGF0dHJhY3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGUgbmV3IGxpZmUgc3BhbiBvZiB0aGlzIGJlaGF2aW91ci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2UuZWFzZUxpbmVhciddIC0gVGhlIG5ldyBlYXNpbmcgZnVuY3Rpb24gZm9yIHRoaXMgYmVoYXZpb3VyLlxuICAgKi9cbiAgcmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMudGFyZ2V0UG9zaXRpb24gPSBVdGlsLmluaXRWYWx1ZSh0YXJnZXRQb3NpdGlvbiwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMucmFkaXVzID0gVXRpbC5pbml0VmFsdWUocmFkaXVzLCAxMDAwKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG4gICAgdGhpcy5yYWRpdXNTcSA9IHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXM7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmxlbmd0aFNxID0gMDtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoaXMgYmVoYXZpb3VyIHRvIGEgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIGN1cnJlbnQgc2ltdWxhdGlvbiB0aW1lLlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHBhcnRpY2xlLlxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLmNvcHkodGhpcy50YXJnZXRQb3NpdGlvbik7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2Uuc3ViKHBhcnRpY2xlLnApO1xuICAgIHRoaXMubGVuZ3RoU3EgPSB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5sZW5ndGhTcSgpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoU3EgPiAwLjAwMDA0ICYmIHRoaXMubGVuZ3RoU3EgPCB0aGlzLnJhZGl1c1NxKSB7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5ub3JtYWxpemUoKTtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm11bHRpcGx5U2NhbGFyKDEgLSB0aGlzLmxlbmd0aFNxIC8gdGhpcy5yYWRpdXNTcSk7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5tdWx0aXBseVNjYWxhcih0aGlzLmZvcmNlKTtcblxuICAgICAgcGFydGljbGUuYS5hZGQodGhpcy5hdHRyYWN0aW9uRm9yY2UpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmRvbURyaWZ0IGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUmFuZG9tRHJpZnRcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WCBcdFx0XHRcdFggdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRZICBcdFx0XHRcdFkgdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgXHRcdFx0XHRIb3cgbXVjaCBkZWxheSB0aGUgZHJpZnQgc2hvdWxkIGhhdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgVGhlIHRpbWUgb2YgdGhlIGRyaWZ0XG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZHJpZnRYLCBkcmlmdFksIGRlbGF5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChkcmlmdFgsIGRyaWZ0WSwgZGVsYXkpO1xuICAgIHRoaXMudGltZSA9IDA7XG4gICAgdGhpcy5uYW1lID0gXCJSYW5kb21EcmlmdFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUmFuZG9tRHJpZnRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFggXHRcdFx0XHRYIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WSAgXHRcdFx0XHRZIHZhbHVlIG9mIHRoZSBuZXcgVmVjdG9yMkRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5IFx0XHRcdFx0SG93IG11Y2ggZGVsYXkgdGhlIGRyaWZ0IHNob3VsZCBoYXZlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChkcmlmdFgsIGRyaWZ0WSwgZGVsYXksIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMucGFuRm9jZSA9IG5ldyBWZWN0b3IyRChkcmlmdFgsIGRyaWZ0WSk7XG4gICAgdGhpcy5wYW5Gb2NlID0gdGhpcy5ub3JtYWxpemVGb3JjZSh0aGlzLnBhbkZvY2UpO1xuICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1JhbmRvbURyaWZ0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLmRhdGEudGltZSArPSB0aW1lO1xuXG4gICAgaWYgKHBhcnRpY2xlLmRhdGEudGltZSA+PSB0aGlzLmRlbGF5KSB7XG4gICAgICBwYXJ0aWNsZS5hLmFkZFhZKFxuICAgICAgICBNYXRoVXRpbC5yYW5kb21BVG9CKC10aGlzLnBhbkZvY2UueCwgdGhpcy5wYW5Gb2NlLngpLFxuICAgICAgICBNYXRoVXRpbC5yYW5kb21BVG9CKC10aGlzLnBhbkZvY2UueSwgdGhpcy5wYW5Gb2NlLnkpXG4gICAgICApO1xuXG4gICAgICBwYXJ0aWNsZS5kYXRhLnRpbWUgPSAwO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEZvcmNlIGZyb20gXCIuL0ZvcmNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZpdHkgZXh0ZW5kcyBGb3JjZSB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3RvbiNQcm90b24uRm9yY2VcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uR3Jhdml0eVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZyBcdFx0XHRcdFx0XHRcdEdyYXZpdHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihnLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcigwLCBnLCBsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMubmFtZSA9IFwiR3Jhdml0eVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkdyYXZpdHlcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnIFx0XHRcdFx0XHRcdFx0R3Jhdml0eVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIucmVzZXQoMCwgZywgbGlmZSwgZWFzaW5nKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlzaW9uIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayBhZnRlciBjb2xsaXNpb25cbiAgICpcbiAgICogQGNhbGxiYWNrIENhbGxiYWNrXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJpdGNsZX0gb3RoZXJQYXJ0aWNsZVxuICAgKi9cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Db2xsaXNpb25cbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIHRvIG1hc3NcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gXHRbZW1pdHRlcj1udWxsXSBcdFx0dGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtCb29sZWFufSBcdFx0W21hc3M9dHJ1ZV1cbiAgICogQHBhcmFtIHtDYWxsYmFja31cdCBcdFtjYWxsYmFjaz1udWxsXVx0XHR0aGUgY2FsbGJhY2sgYWZ0ZXIgdGhlIGNvbGxpc2lvblxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMucmVzZXQoZW1pdHRlciwgbWFzcywgY2FsbGJhY2spO1xuICAgIHRoaXMubmV3UG9vbCA9IFtdO1xuICAgIHRoaXMucG9vbCA9IFtdO1xuICAgIHRoaXMubmFtZSA9IFwiQ29sbGlzaW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbGxpc2lvblxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChlbWl0dGVyLCBtYXNzLCBjYWxsYmFjaywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5lbWl0dGVyID0gVXRpbC5pbml0VmFsdWUoZW1pdHRlciwgbnVsbCk7XG4gICAgdGhpcy5tYXNzID0gVXRpbC5pbml0VmFsdWUobWFzcywgdHJ1ZSk7XG4gICAgdGhpcy5jYWxsYmFjayA9IFV0aWwuaW5pdFZhbHVlKGNhbGxiYWNrLCBudWxsKTtcblxuICAgIHRoaXMuY29sbGlzaW9uUG9vbCA9IFtdO1xuICAgIHRoaXMuZGVsdGEgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbGxpc2lvblxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdHRpbWUgdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IFx0XHRcdGluZGV4IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMuZW1pdHRlcikge1xuICAgICAgVXRpbC5zbGljZUFycmF5KHRoaXMuZW1pdHRlci5wYXJ0aWNsZXMsIGluZGV4LCB0aGlzLm5ld1Bvb2wpO1xuICAgIH0gZWxzZSB7XG4gICAgICBVdGlsLnNsaWNlQXJyYXkodGhpcy5wb29sLCBpbmRleCwgdGhpcy5uZXdQb29sKTtcbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLm5ld1Bvb2wubGVuZ3RoO1xuICAgIGxldCBvdGhlclBhcnRpY2xlO1xuICAgIGxldCBsZW5ndGhTcTtcbiAgICBsZXQgb3ZlcmxhcDtcbiAgICBsZXQgdG90YWxNYXNzO1xuICAgIGxldCBhdmVyYWdlTWFzczEsIGF2ZXJhZ2VNYXNzMjtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgb3RoZXJQYXJ0aWNsZSA9IHRoaXMubmV3UG9vbFtpXTtcblxuICAgICAgaWYgKG90aGVyUGFydGljbGUgIT09IHBhcnRpY2xlKSB7XG4gICAgICAgIHRoaXMuZGVsdGEuY29weShvdGhlclBhcnRpY2xlLnApO1xuICAgICAgICB0aGlzLmRlbHRhLnN1YihwYXJ0aWNsZS5wKTtcblxuICAgICAgICBsZW5ndGhTcSA9IHRoaXMuZGVsdGEubGVuZ3RoU3EoKTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBwYXJ0aWNsZS5yYWRpdXMgKyBvdGhlclBhcnRpY2xlLnJhZGl1cztcblxuICAgICAgICBpZiAobGVuZ3RoU3EgPD0gZGlzdGFuY2UgKiBkaXN0YW5jZSkge1xuICAgICAgICAgIG92ZXJsYXAgPSBkaXN0YW5jZSAtIE1hdGguc3FydChsZW5ndGhTcSk7XG4gICAgICAgICAgb3ZlcmxhcCArPSAwLjU7XG5cbiAgICAgICAgICB0b3RhbE1hc3MgPSBwYXJ0aWNsZS5tYXNzICsgb3RoZXJQYXJ0aWNsZS5tYXNzO1xuICAgICAgICAgIGF2ZXJhZ2VNYXNzMSA9IHRoaXMubWFzcyA/IG90aGVyUGFydGljbGUubWFzcyAvIHRvdGFsTWFzcyA6IDAuNTtcbiAgICAgICAgICBhdmVyYWdlTWFzczIgPSB0aGlzLm1hc3MgPyBwYXJ0aWNsZS5tYXNzIC8gdG90YWxNYXNzIDogMC41O1xuXG4gICAgICAgICAgcGFydGljbGUucC5hZGQoXG4gICAgICAgICAgICB0aGlzLmRlbHRhXG4gICAgICAgICAgICAgIC5jbG9uZSgpXG4gICAgICAgICAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgICAgICAgICAubXVsdGlwbHlTY2FsYXIob3ZlcmxhcCAqIC1hdmVyYWdlTWFzczEpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBvdGhlclBhcnRpY2xlLnAuYWRkKHRoaXMuZGVsdGEubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIob3ZlcmxhcCAqIGF2ZXJhZ2VNYXNzMikpO1xuXG4gICAgICAgICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKHBhcnRpY2xlLCBvdGhlclBhcnRpY2xlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyb3NzWm9uZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBEZWZpbmVzIHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIGNvbWUgdG8gdGhlIGVuZCBvZiB0aGUgc3BlY2lmaWVkIHpvbmVcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNyb3NzWm9uZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5ab25lfSB6b25lIFx0XHRcdFx0XHRcdGNhbiBiZSBhbnkgUHJvdG9uLlpvbmUgLSBlLmcuIFByb3Rvbi5SZWN0Wm9uZSgpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Nyb3NzVHlwZT1kZWFkXSBcdFx0XHR3aGF0IGhhcHBlbnMgaWYgdGhlIHBhcnRpY2xlcyBwYXNzIHRoZSB6b25lIC0gYWxsb3dlZCBzdHJpbmdzOiBkZWFkIHwgYm91bmQgfCBjcm9zc1xuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHpvbmUsIGNyb3NzVHlwZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoem9uZSwgY3Jvc3NUeXBlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNyb3NzWm9uZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNyb3NzWm9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uWm9uZX0gem9uZSBcdFx0XHRcdGNhbiBiZSBhbnkgUHJvdG9uLlpvbmUgLSBlLmcuIFByb3Rvbi5SZWN0Wm9uZSgpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Nyb3NzVHlwZT1kZWFkXSBcdHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIHBhc3MgdGhlIHpvbmUgLSBhbGxvd2VkIHN0cmluZ3M6IGRlYWQgfCBib3VuZCB8IGNyb3NzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0W2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBcdFx0W2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KHpvbmUsIGNyb3NzVHlwZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy56b25lID0gem9uZTtcbiAgICB0aGlzLnpvbmUuY3Jvc3NUeXBlID0gVXRpbC5pbml0VmFsdWUoY3Jvc3NUeXBlLCBcImRlYWRcIik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNyb3NzWm9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHRoaXMuem9uZS5jcm9zc2luZyhwYXJ0aWNsZSk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG4vKipcbiAqIEFscGhhIGJlaGF2aW91ciBmb3IgY29udHJvbGxpbmcgcGFydGljbGUgb3BhY2l0eSBvdmVyIHRpbWUuXG4gKiBAZXh0ZW5kcyBCZWhhdmlvdXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxwaGEgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzYW1lO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGE7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYjtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQWxwaGEgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFthPTFdIC0gVGhlIGluaXRpYWwgYWxwaGEgdmFsdWUgb3IgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFtiXSAtIFRoZSBmaW5hbCBhbHBoYSB2YWx1ZSBvciByYW5nZS4gSWYgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIHRoZSBzYW1lIGFzICdhJy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoaXMgYmVoYXZpb3VyJ3MgbGlmZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2VMaW5lYXInXSAtIFRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJBbHBoYVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFthPTFdIC0gVGhlIGluaXRpYWwgYWxwaGEgdmFsdWUgb3IgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFtiXSAtIFRoZSBmaW5hbCBhbHBoYSB2YWx1ZSBvciByYW5nZS4gSWYgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIHRoZSBzYW1lIGFzICdhJy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlXSAtIFRoaXMgYmVoYXZpb3VyJ3MgbGlmZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmddIC0gVGhpcyBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb24uXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZDtcbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCAxKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoYik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBhcnRpY2xlJ3MgYWxwaGEgdmFsdWVzLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEuYWxwaGFBID0gdGhpcy5hLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodGhpcy5zYW1lKSBwYXJ0aWNsZS5kYXRhLmFscGhhQiA9IHBhcnRpY2xlLmRhdGEuYWxwaGFBO1xuICAgIGVsc2UgcGFydGljbGUuZGF0YS5hbHBoYUIgPSB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSBhbHBoYSBiZWhhdmlvdXIgdG8gdGhlIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFRoZSBjdXJyZW50IHNpbXVsYXRpb24gdGltZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBwYXJ0aWNsZS5cbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBwYXJ0aWNsZS5hbHBoYSA9IHBhcnRpY2xlLmRhdGEuYWxwaGFCICsgKHBhcnRpY2xlLmRhdGEuYWxwaGFBIC0gcGFydGljbGUuZGF0YS5hbHBoYUIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICBpZiAocGFydGljbGUuYWxwaGEgPCAwLjAwMSkgcGFydGljbGUuYWxwaGEgPSAwO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuLyoqXG4gKiBTY2FsZSBiZWhhdmlvdXIgZm9yIGNvbnRyb2xsaW5nIHBhcnRpY2xlIHNpemUgb3ZlciB0aW1lLlxuICogQGV4dGVuZHMgQmVoYXZpb3VyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYWxlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2FtZTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgU2NhbGUgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFthPTFdIC0gVGhlIGluaXRpYWwgc2NhbGUgdmFsdWUgb3IgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFtiXSAtIFRoZSBmaW5hbCBzY2FsZSB2YWx1ZSBvciByYW5nZS4gSWYgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIHRoZSBzYW1lIGFzICdhJy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoaXMgYmVoYXZpb3VyJ3MgbGlmZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2VMaW5lYXInXSAtIFRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJTY2FsZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IGEgLSBUaGUgaW5pdGlhbCBzY2FsZSB2YWx1ZSBvciByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2JdIC0gVGhlIGZpbmFsIHNjYWxlIHZhbHVlIG9yIHJhbmdlLiBJZiBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgdGhlIHNhbWUgYXMgJ2EnLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmVdIC0gVGhpcyBiZWhhdmlvdXIncyBsaWZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZ10gLSBUaGlzIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvbi5cbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkO1xuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIDEpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGFydGljbGUncyBzY2FsZSB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS5zY2FsZUEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcbiAgICBwYXJ0aWNsZS5kYXRhLnNjYWxlQiA9IHRoaXMuc2FtZSA/IHBhcnRpY2xlLmRhdGEuc2NhbGVBIDogdGhpcy5iLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgc2NhbGUgYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0by5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBUaGUgY3VycmVudCBzaW11bGF0aW9uIHRpbWUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcGFydGljbGUuXG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLnNjYWxlID0gcGFydGljbGUuZGF0YS5zY2FsZUIgKyAocGFydGljbGUuZGF0YS5zY2FsZUEgLSBwYXJ0aWNsZS5kYXRhLnNjYWxlQikgKiB0aGlzLmVuZXJneTtcblxuICAgIGlmIChwYXJ0aWNsZS5zY2FsZSA8IDAuMDAwMSkgcGFydGljbGUuc2NhbGUgPSAwO1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzICogcGFydGljbGUuc2NhbGU7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG4vKipcbiAqIFJvdGF0ZSBiZWhhdmlvdXIgZm9yIGNvbnRyb2xsaW5nIHBhcnRpY2xlIHJvdGF0aW9uLlxuICogQGV4dGVuZHMgQmVoYXZpb3VyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdGF0ZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNhbWU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYTtcblxuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBiO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3R5bGU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFJvdGF0ZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfFNwYW59IFtpbmZsdWVuY2U9J1ZlbG9jaXR5J10gLSBUaGUgcm90YXRpb24ncyBpbmZsdWVuY2Ugb3IgaW5pdGlhbCByb3RhdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfFNwYW59IFtiXSAtIFRoZSBmaW5hbCByb3RhdGlvbiB2YWx1ZSBvciByYW5nZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzdHlsZT0ndG8nXSAtIFRoZSBzdHlsZSBvZiByb3RhdGlvbiAoJ3RvJyBvciAnYWRkJykuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGlzIGJlaGF2aW91cidzIGxpZmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlTGluZWFyJ10gLSBUaGlzIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGluZmx1ZW5jZSwgYiwgc3R5bGUsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGluZmx1ZW5jZSwgYiwgc3R5bGUpO1xuICAgIHRoaXMubmFtZSA9IFwiUm90YXRlXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfFNwYW59IFthPSdWZWxvY2l0eSddIC0gVGhlIHJvdGF0aW9uJ3MgaW5mbHVlbmNlIG9yIGluaXRpYWwgcm90YXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxTcGFufSBbYl0gLSBUaGUgZmluYWwgcm90YXRpb24gdmFsdWUgb3IgcmFuZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc3R5bGU9J3RvJ10gLSBUaGUgc3R5bGUgb2Ygcm90YXRpb24gKCd0bycgb3IgJ2FkZCcpLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmVdIC0gVGhpcyBiZWhhdmlvdXIncyBsaWZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZ10gLSBUaGlzIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvbi5cbiAgICovXG4gIHJlc2V0KGEsIGIsIHN0eWxlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIFwiVmVsb2NpdHlcIikpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGIsIDApKTtcbiAgICB0aGlzLnN0eWxlID0gVXRpbC5pbml0VmFsdWUoc3R5bGUsIFwidG9cIik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGEgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGFydGljbGUucm90YXRpb24gLSBUaGUgcGFydGljbGUncyByb3RhdGlvbi5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlLmRhdGEgLSBUaGUgcGFydGljbGUncyBkYXRhIG9iamVjdC5cbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEucm90YXRpb25BID0gdGhpcy5hLmdldFZhbHVlKCk7XG5cbiAgICBpZiAoIXRoaXMuc2FtZSkgcGFydGljbGUuZGF0YS5yb3RhdGlvbkIgPSB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoaXMgYmVoYXZpb3VyIHRvIGEgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFRoZSBpbnRlZ3JhdGUgdGltZSAoMS9tcykuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBwYXJ0aWNsZSBpbmRleC5cbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBpZiAoIXRoaXMuc2FtZSkge1xuICAgICAgaWYgKHRoaXMuc3R5bGUgPT09IFwidG9cIiB8fCB0aGlzLnN0eWxlID09PSBcIlRPXCIgfHwgdGhpcy5zdHlsZSA9PT0gXCJfXCIpIHtcbiAgICAgICAgcGFydGljbGUucm90YXRpb24gKz1cbiAgICAgICAgICBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQiArIChwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQSAtIHBhcnRpY2xlLmRhdGEucm90YXRpb25CKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydGljbGUucm90YXRpb24gKz0gcGFydGljbGUuZGF0YS5yb3RhdGlvbkI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmEuYSA9PT0gXCJWXCIgfHwgdGhpcy5hLmEgPT09IFwiVmVsb2NpdHlcIiB8fCB0aGlzLmEuYSA9PT0gXCJ2XCIpIHtcbiAgICAgIC8vIGJldGEuLi5cbiAgICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gcGFydGljbGUuZ2V0RGlyZWN0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBBcnJheVNwYW4gZnJvbSBcIi4uL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvciBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ29sb3JcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBbYV0gdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IFtiXSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiQ29sb3JcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBhIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBiIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmEgPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuKGEpO1xuICAgIHRoaXMuYiA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW4oYik7XG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5jb2xvciA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuY29sb3JBID0gQ29sb3JVdGlsLmhleFRvUmdiKHBhcnRpY2xlLmNvbG9yKTtcblxuICAgIGlmICh0aGlzLmIpIHBhcnRpY2xlLmRhdGEuY29sb3JCID0gQ29sb3JVdGlsLmhleFRvUmdiKHRoaXMuYi5nZXRWYWx1ZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMuYikge1xuICAgICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5yICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLnIgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5yKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5nICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLmcgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5nKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5iICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLmIgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5iKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLnJnYi5yIDw8IDA7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLnJnYi5nIDw8IDA7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLnJnYi5iIDw8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUuZGF0YS5jb2xvckEucjtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUuZGF0YS5jb2xvckEuZztcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUuZGF0YS5jb2xvckEuYjtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5jb25zdCBDSEFOR0lORyA9IFwiY2hhbmdpbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ljbG9uZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3ljbG9uZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFuZ2xlLCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLnNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkN5Y2xvbmVcIjtcbiAgfVxuXG4gIHNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKSB7XG4gICAgdGhpcy5mb3JjZSA9IENIQU5HSU5HO1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG5cbiAgICBpZiAoYW5nbGUgPT09IFwicmlnaHRcIikge1xuICAgICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSBcImxlZnRcIikge1xuICAgICAgdGhpcy5hbmdsZSA9IC1NYXRoVXRpbC5QSSAvIDI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gXCJyYW5kb21cIikge1xuICAgICAgdGhpcy5hbmdsZSA9IFwicmFuZG9tXCI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSBpbnN0YW5jZW9mIFNwYW4pIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBcInNwYW5cIjtcbiAgICAgIHRoaXMuc3BhbiA9IGFuZ2xlO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiY2hhbmdpbmdcIiB8fFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImNoYW5nXCIgfHxcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJhdXRvXCJcbiAgICApIHtcbiAgICAgIHRoaXMuZm9yY2UgPSBDSEFOR0lORztcbiAgICB9IGVsc2UgaWYgKGZvcmNlKSB7XG4gICAgICB0aGlzLmZvcmNlID0gZm9yY2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkN5Y2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhbmdsZSwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG4gICAgdGhpcy5zZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSk7XG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmFuZ2xlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICBwYXJ0aWNsZS5kYXRhLmNhbmdsZSA9IE1hdGhVdGlsLnJhbmRvbUFUb0IoLU1hdGhVdGlsLlBJLCBNYXRoVXRpbC5QSSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFuZ2xlID09PSBcInNwYW5cIikge1xuICAgICAgcGFydGljbGUuZGF0YS5jYW5nbGUgPSB0aGlzLnNwYW4uZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUgPSBuZXcgVmVjdG9yMkQoMCwgMCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkN5Y2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIGxldCBsZW5ndGg7XG4gICAgbGV0IGdyYWRpZW50ID0gcGFydGljbGUudi5nZXRHcmFkaWVudCgpO1xuICAgIGlmICh0aGlzLmFuZ2xlID09PSBcInJhbmRvbVwiIHx8IHRoaXMuYW5nbGUgPT09IFwic3BhblwiKSB7XG4gICAgICBncmFkaWVudCArPSBwYXJ0aWNsZS5kYXRhLmNhbmdsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JhZGllbnQgKz0gdGhpcy5hbmdsZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JjZSA9PT0gQ0hBTkdJTkcpIHtcbiAgICAgIGxlbmd0aCA9IHBhcnRpY2xlLnYubGVuZ3RoKCkgLyAxMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRoaXMuZm9yY2U7XG4gICAgfVxuXG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lLnggPSBsZW5ndGggKiBNYXRoLmNvcyhncmFkaWVudCk7XG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lLnkgPSBsZW5ndGggKiBNYXRoLnNpbihncmFkaWVudCk7XG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lID0gdGhpcy5ub3JtYWxpemVGb3JjZShwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUpO1xuICAgIHBhcnRpY2xlLmEuYWRkKHBhcnRpY2xlLmRhdGEuY3ljbG9uZSk7XG4gIH1cbn1cbiIsImltcG9ydCBBdHRyYWN0aW9uIGZyb20gXCIuL0F0dHJhY3Rpb25cIjtcblxuLyoqXG4gKiBUaGUgb3Bwb3NpdGUgb2YgQXR0cmFjdGlvbiAtIHR1cm5zIHRoZSBmb3JjZVxuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgUHJvdG9uLkF0dHJhY3Rpb25cbiAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICogQGFsaWFzIFByb3Rvbi5SZXB1bHNpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwdWxzaW9uIGV4dGVuZHMgQXR0cmFjdGlvbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFJlcHVsc2lvbiBiZWhhdmlvdXIgaW5zdGFuY2VcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiAtIFRoZSByZXB1bHNpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtmb3JjZT0xMDBdIC0gVGhlIHN0cmVuZ3RoIG9mIHRoZSByZXB1bHNpb24gZm9yY2VcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtyYWRpdXM9MTAwMF0gLSBUaGUgcmFkaXVzIG9mIGluZmx1ZW5jZSBmb3IgdGhlIHJlcHVsc2lvblxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhlIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2VMaW5lYXInXSAtIFRoZSBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJlbmd0aCBvZiB0aGUgcmVwdWxzaW9uIGZvcmNlXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGJlaGF2aW91clxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5uYW1lID0gXCJSZXB1bHNpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIC0gVGhlIG5ldyByZXB1bHNpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtmb3JjZT0xMDBdIC0gVGhlIG5ldyBzdHJlbmd0aCBvZiB0aGUgcmVwdWxzaW9uIGZvcmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcmFkaXVzPTEwMDBdIC0gVGhlIG5ldyByYWRpdXMgb2YgaW5mbHVlbmNlIGZvciB0aGUgcmVwdWxzaW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGUgbmV3IGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2VMaW5lYXInXSAtIFRoZSBuZXcgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uXG4gICAqL1xuICByZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIucmVzZXQodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5mb3JjZSAqPSAtMTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eVdlbGwgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBCZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBHcmF2aXR5V2VsbFxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBbY2VudGVyUG9pbnQ9bmV3IFZlY3RvcjJEXSBUaGUgcG9pbnQgaW4gdGhlIGNlbnRlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cdFx0XHRcdFx0VGhlIGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV1cdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXVx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjZW50ZXJQb2ludCwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmRpc3RhbmNlVmVjID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5jZW50ZXJQb2ludCA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlclBvaW50LCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgdGhpcy5uYW1lID0gXCJHcmF2aXR5V2VsbFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jR3Jhdml0eVdlbGxcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFtjZW50ZXJQb2ludD1uZXcgVmVjdG9yMkRdIFRoZSBwb2ludCBpbiB0aGUgY2VudGVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVx0XHRcdFx0XHRUaGUgZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XVx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoY2VudGVyUG9pbnQsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmRpc3RhbmNlVmVjID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5jZW50ZXJQb2ludCA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlclBvaW50LCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5mb3JjZSA9IFV0aWwuaW5pdFZhbHVlKHRoaXMubm9ybWFsaXplVmFsdWUoZm9yY2UpLCAxMDApO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbmhlcml0ZG9jXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7fVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNHcmF2aXR5V2VsbFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuZGlzdGFuY2VWZWMuc2V0KHRoaXMuY2VudGVyUG9pbnQueCAtIHBhcnRpY2xlLnAueCwgdGhpcy5jZW50ZXJQb2ludC55IC0gcGFydGljbGUucC55KTtcbiAgICBjb25zdCBkaXN0YW5jZVNxID0gdGhpcy5kaXN0YW5jZVZlYy5sZW5ndGhTcSgpO1xuXG4gICAgaWYgKGRpc3RhbmNlU3EgIT09IDApIHtcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZVZlYy5sZW5ndGgoKTtcbiAgICAgIGNvbnN0IGZhY3RvciA9ICh0aGlzLmZvcmNlICogdGltZSkgLyAoZGlzdGFuY2VTcSAqIGRpc3RhbmNlKTtcblxuICAgICAgcGFydGljbGUudi54ICs9IGZhY3RvciAqIHRoaXMuZGlzdGFuY2VWZWMueDtcbiAgICAgIHBhcnRpY2xlLnYueSArPSBmYWN0b3IgKiB0aGlzLmRpc3RhbmNlVmVjLnk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUHJvcFV0aWwgZnJvbSBcIi4uL3V0aWxzL1Byb3BVdGlsXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0aWFsaXplKGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplcykge1xuICAgIGNvbnN0IGxlbmd0aCA9IGluaXRpYWxpemVzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGluaXRpYWxpemVzW2ldIGluc3RhbmNlb2YgSW5pdGlhbGl6ZSkge1xuICAgICAgICBpbml0aWFsaXplc1tpXS5pbml0KGVtaXR0ZXIsIHBhcnRpY2xlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYmluZEVtaXR0ZXIoZW1pdHRlciwgcGFydGljbGUpO1xuICB9LFxuXG4gIC8vIGluaXRcbiAgaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZSkge1xuICAgIFByb3BVdGlsLnNldFByb3AocGFydGljbGUsIGluaXRpYWxpemUpO1xuICAgIFByb3BVdGlsLnNldFZlY3RvclZhbChwYXJ0aWNsZSwgaW5pdGlhbGl6ZSk7XG4gIH0sXG5cbiAgYmluZEVtaXR0ZXIoZW1pdHRlciwgcGFydGljbGUpIHtcbiAgICBpZiAoZW1pdHRlci5iaW5kRW1pdHRlcikge1xuICAgICAgcGFydGljbGUucC5hZGQoZW1pdHRlci5wKTtcbiAgICAgIHBhcnRpY2xlLnYuYWRkKGVtaXR0ZXIudik7XG4gICAgICBwYXJ0aWNsZS5hLmFkZChlbWl0dGVyLmEpO1xuICAgICAgcGFydGljbGUudi5yb3RhdGUoTWF0aFV0aWwuZGVncmVlVHJhbnNmb3JtKGVtaXR0ZXIucm90YXRpb24pKTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBQYXJ0aWNsZSBmcm9tIFwiLi4vY29yZS9QYXJ0aWNsZVwiO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiO1xuXG5pbXBvcnQgUmF0ZSBmcm9tIFwiLi4vaW5pdGlhbGl6ZS9SYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZVV0aWwgZnJvbSBcIi4uL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdHRlciBleHRlbmRzIFBhcnRpY2xlIHtcbiAgLyoqXG4gICAqIFlvdSBjYW4gdXNlIHRoaXMgZW1pdCBwYXJ0aWNsZXMuXG4gICAqXG4gICAqIEl0IHdpbGwgZGlzcGF0Y2ggZm9sbG93IGV2ZW50czpcbiAgICogUEFSVElDTEVfQ1JFQVRFRFxuICAgKiBQQVJUSUNMRV9VUERBVEFcbiAgICogUEFSVElDTEVfREVBRFxuICAgKlxuICAgKiBAY2xhc3MgRW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmYgdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKiBmb3IgZXhhbXBsZSB7ZGFtcGluZzowLjAxLGJpbmRFbWl0dGVyOmZhbHNlfVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZiA9IHt9KSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuICAgIHRoaXMuaW5pdGlhbGl6ZXMgPSBbXTtcblxuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMuZW1pdFNwZWVkID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IC0xO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyaWN0aW9uIGNvZWZmaWNpZW50IGZvciBhbGwgcGFydGljbGUgZW1pdCBieSBUaGlzO1xuICAgICAqIEBwcm9wZXJ0eSBkYW1waW5nXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAwLjAwNlxuICAgICAqL1xuICAgIHRoaXMuZGFtcGluZyA9IDAuMDA2O1xuXG4gICAgLyoqXG4gICAgICogSWYgYmluZEVtaXR0ZXIgdGhlIHBhcnRpY2xlcyBjYW4gYmluZCB0aGlzIGVtaXR0ZXIncyBwcm9wZXJ0eTtcbiAgICAgKiBAcHJvcGVydHkgYmluZEVtaXR0ZXJcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgdGhpcy5iaW5kRW1pdHRlciA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyBwZXIgc2Vjb25kIGVtaXQgKGEgW3BhcnRpY2xlXS9iIFtzXSk7XG4gICAgICogQHByb3BlcnR5IHJhdGVcbiAgICAgKiBAdHlwZSB7UmF0ZX1cbiAgICAgKiBAZGVmYXVsdCBSYXRlKDEsIC4xKVxuICAgICAqL1xuICAgIHRoaXMucmF0ZSA9IG5ldyBSYXRlKDEsIDAuMSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkVtaXR0ZXJcIjtcbiAgICB0aGlzLmlkID0gUHVpZC5pZCh0aGlzLm5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqIEBwYXJhbSB7TnVtYmVyIHwgU3RyaW5nfSBbdG90YWxUaW1lXSBiZWdpbiBlbWl0IHRpbWU7XG4gICAqIEBwYXJhbSB7U3RyaW5nIHwgYm9vbGVhbn0gW2xpZmVdIHRoZSBsaWZlIG9mIHRoaXMgZW1pdHRlclxuICAgKi9cbiAgZW1pdCh0b3RhbFRpbWUsIGxpZmUpIHtcbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gVXRpbC5pbml0VmFsdWUodG90YWxUaW1lLCBJbmZpbml0eSk7XG5cbiAgICBpZiAobGlmZSA9PT0gdHJ1ZSB8fCBsaWZlID09PSBcImxpZmVcIiB8fCBsaWZlID09PSBcImRlc3Ryb3lcIikge1xuICAgICAgdGhpcy5saWZlID0gdG90YWxUaW1lID09PSBcIm9uY2VcIiA/IDEgOiB0aGlzLnRvdGFsVGltZTtcbiAgICB9IGVsc2UgaWYgKCFpc05hTihsaWZlKSkge1xuICAgICAgdGhpcy5saWZlID0gbGlmZTtcbiAgICB9XG4gICAgdGhpcy5yYXRlLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdG9wIGVtaXRpbmdcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqL1xuICBzdG9wKCkge1xuICAgIHRoaXMudG90YWxUaW1lID0gLTE7XG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy5zdG9wZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJlRW1pdCh0aW1lKSB7XG4gICAgbGV0IG9sZFN0b3BlZCA9IHRoaXMuc3RvcGVkO1xuICAgIGxldCBvbGRFbWl0VGltZSA9IHRoaXMuZW1pdFRpbWU7XG4gICAgbGV0IG9sZFRvdGFsVGltZSA9IHRoaXMudG90YWxUaW1lO1xuXG4gICAgdGhpcy5zdG9wZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IHRpbWU7XG4gICAgdGhpcy5yYXRlLmluaXQoKTtcblxuICAgIGNvbnN0IHN0ZXAgPSAwLjAxNjc7XG4gICAgd2hpbGUgKHRpbWUgPiBzdGVwKSB7XG4gICAgICB0aW1lIC09IHN0ZXA7XG4gICAgICB0aGlzLnVwZGF0ZShzdGVwKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3BlZCA9IG9sZFN0b3BlZDtcbiAgICB0aGlzLmVtaXRUaW1lID0gb2xkRW1pdFRpbWUgKyBNYXRoLm1heCh0aW1lLCAwKTtcbiAgICB0aGlzLnRvdGFsVGltZSA9IG9sZFRvdGFsVGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgY3VycmVudCBhbGwgcGFydGljbGVzXG4gICAqIEBtZXRob2QgcmVtb3ZlQWxsUGFydGljbGVzXG4gICAqL1xuICByZW1vdmVBbGxQYXJ0aWNsZXMoKSB7XG4gICAgbGV0IGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5wYXJ0aWNsZXNbaV0uZGVhZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogYWRkIGluaXRpYWxpemUgdG8gdGhpcyBlbWl0dGVyXG4gICAqIEBtZXRob2QgYWRkU2VsZkluaXRpYWxpemVcbiAgICovXG4gIGFkZFNlbGZJbml0aWFsaXplKGluaXRpYWxpemUpIHtcbiAgICBpZiAoaW5pdGlhbGl6ZVtcImluaXRcIl0pIHtcbiAgICAgIGluaXRpYWxpemUuaW5pdCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcy5pbml0QWxsKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgSW5pdGlhbGl6ZSB0byBwYXJ0aWNsZXM7XG4gICAqXG4gICAqIHlvdSBjYW4gdXNlIGluaXRpYWxpemVzIGFycmF5OmZvciBleGFtcGxlIGVtaXR0ZXIuYWRkSW5pdGlhbGl6ZShpbml0aWFsaXplMSxpbml0aWFsaXplMixpbml0aWFsaXplMyk7XG4gICAqIEBtZXRob2QgYWRkSW5pdGlhbGl6ZVxuICAgKiBAcGFyYW0ge0luaXRpYWxpemV9IGluaXRpYWxpemUgbGlrZSB0aGlzIG5ldyBSYWRpdXMoMSwgMTIpXG4gICAqL1xuICBhZGRJbml0aWFsaXplKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IHJlc3QubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHRoaXMuaW5pdGlhbGl6ZXMucHVzaChyZXN0W2ldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEluaXRpYWxpemVcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBhIGluaXRpYWxpemVcbiAgICovXG4gIHJlbW92ZUluaXRpYWxpemUoaW5pdGlhbGl6ZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5pdGlhbGl6ZXMuaW5kZXhPZihpbml0aWFsaXplcik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuaW5pdGlhbGl6ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIEluaXRpYWxpemVzXG4gICAqIEBtZXRob2QgcmVtb3ZlSW5pdGlhbGl6ZXJzXG4gICAqL1xuICByZW1vdmVBbGxJbml0aWFsaXplcnMoKSB7XG4gICAgVXRpbC5lbXB0eUFycmF5KHRoaXMuaW5pdGlhbGl6ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgQmVoYXZpb3VyIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgQmVoYXZpb3VycyBhcnJheTplbWl0dGVyLmFkZEJlaGF2aW91cihCZWhhdmlvdXIxLEJlaGF2aW91cjIsQmVoYXZpb3VyMyk7XG4gICAqIEBtZXRob2QgYWRkQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgbGlrZSB0aGlzIG5ldyBDb2xvcigncmFuZG9tJylcbiAgICovXG4gIGFkZEJlaGF2aW91ciguLi5yZXN0KSB7XG4gICAgbGV0IGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCBiZWhhdmlvdXIgPSByZXN0W2ldO1xuICAgICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcbiAgICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykgYmVoYXZpb3VyLnBhcmVudHMucHVzaCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBCZWhhdmlvdXJcbiAgICogQG1ldGhvZCByZW1vdmVCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBhIGJlaGF2aW91clxuICAgKi9cbiAgcmVtb3ZlQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGxldCBpbmRleCA9IHRoaXMuYmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgdGhpcy5iZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBpZiAoYmVoYXZpb3VyLnBhcmVudHMpIHtcbiAgICAgIGluZGV4ID0gYmVoYXZpb3VyLnBhcmVudHMuaW5kZXhPZihiZWhhdmlvdXIpO1xuICAgICAgYmVoYXZpb3VyLnBhcmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIGFsbCBiZWhhdmlvdXJzXG4gICAqIEBtZXRob2QgcmVtb3ZlQWxsQmVoYXZpb3Vyc1xuICAgKi9cbiAgcmVtb3ZlQWxsQmVoYXZpb3VycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcbiAgfVxuXG4gIC8vIGVtaXR0ZXIgdXBkYXRlXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgdGhpcy5hZ2UgKz0gdGltZTtcbiAgICBpZiAodGhpcy5hZ2UgPj0gdGhpcy5saWZlIHx8IHRoaXMuZGVhZCkgdGhpcy5kZXN0cm95KCk7XG5cbiAgICB0aGlzLmVtaXR0aW5nKHRpbWUpO1xuICAgIHRoaXMuaW50ZWdyYXRlKHRpbWUpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHRpbWUpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm47XG5cbiAgICBjb25zdCBkYW1waW5nID0gMSAtIHRoaXMuZGFtcGluZztcbiAgICB0aGlzLnBhcmVudC5pbnRlZ3JhdG9yLmNhbGN1bGF0ZSh0aGlzLCB0aW1lLCBkYW1waW5nKTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICBsZXQgaSwgcGFydGljbGU7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgcGFydGljbGUgPSB0aGlzLnBhcnRpY2xlc1tpXTtcblxuICAgICAgLy8gcGFydGljbGUgdXBkYXRlXG4gICAgICBwYXJ0aWNsZS51cGRhdGUodGltZSwgaSk7XG4gICAgICB0aGlzLnBhcmVudC5pbnRlZ3JhdG9yLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgZGFtcGluZyk7XG4gICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfVVBEQVRFXCIsIHBhcnRpY2xlKTtcblxuICAgICAgLy8gY2hlY2sgZGVhZFxuICAgICAgaWYgKHBhcnRpY2xlLmRlYWQpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChcIlBBUlRJQ0xFX0RFQURcIiwgcGFydGljbGUpO1xuXG4gICAgICAgIHRoaXMucGFyZW50LnBvb2wuZXhwaXJlKHBhcnRpY2xlKTtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRpc3BhdGNoKGV2ZW50LCB0YXJnZXQpIHtcbiAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICAgIHRoaXMuYmluZEV2ZW50ICYmIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCwgdGFyZ2V0KTtcbiAgfVxuXG4gIGVtaXR0aW5nKHRpbWUpIHtcbiAgICBpZiAodGhpcy5zdG9wZWQpIHJldHVybjtcblxuICAgIGlmICh0aGlzLnRvdGFsVGltZSA9PT0gXCJub25lXCIpIHtcbiAgICAgIHRoaXMuZW1pdFRpbWUgKz0gdGltZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxUaW1lID09PSBcIm9uY2VcIikge1xuICAgICAgbGV0IGk7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnJhdGUuZ2V0VmFsdWUoOTk5OTkpO1xuXG4gICAgICBpZiAobGVuZ3RoID4gMCkgdGhpcy5lbWl0U3BlZWQgPSBsZW5ndGg7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHRoaXMuY3JlYXRlUGFydGljbGUoKTtcbiAgICAgIHRoaXMudG90YWxUaW1lID0gXCJub25lXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdFRpbWUgKz0gdGltZTtcblxuICAgICAgaWYgKHRoaXMuZW1pdFRpbWUgPCB0aGlzLnRvdGFsVGltZSkge1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnJhdGUuZ2V0VmFsdWUodGltZSk7XG4gICAgICAgIGxldCBpO1xuXG4gICAgICAgIGlmIChsZW5ndGggPiAwKSB0aGlzLmVtaXRTcGVlZCA9IGxlbmd0aDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB0aGlzLmNyZWF0ZVBhcnRpY2xlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBzaW5nbGUgcGFydGljbGU7XG4gICAqXG4gICAqIGNhbiB1c2UgZW1pdCh7eDoxMH0sbmV3IEdyYXZpdHkoMTApLHsncGFydGljbGVVcGRhdGUnLGZ1bn0pIG9yIGVtaXQoW3t4OjEwfSxuZXcgSW5pdGlhbGl6ZV0sbmV3IEdyYXZpdHkoMTApLHsncGFydGljbGVVcGRhdGUnLGZ1bn0pXG4gICAqIEBtZXRob2QgcmVtb3ZlQWxsUGFydGljbGVzXG4gICAqL1xuICBjcmVhdGVQYXJ0aWNsZShpbml0aWFsaXplLCBiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBwYXJ0aWNsZSA9IHRoaXMucGFyZW50LnBvb2wuZ2V0KFBhcnRpY2xlKTtcbiAgICB0aGlzLnNldHVwUGFydGljbGUocGFydGljbGUsIGluaXRpYWxpemUsIGJlaGF2aW91cik7XG4gICAgdGhpcy5kaXNwYXRjaChcIlBBUlRJQ0xFX0NSRUFURURcIiwgcGFydGljbGUpO1xuXG4gICAgcmV0dXJuIHBhcnRpY2xlO1xuICB9XG5cbiAgc2V0dXBQYXJ0aWNsZShwYXJ0aWNsZSwgaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKSB7XG4gICAgbGV0IGluaXRpYWxpemVzID0gdGhpcy5pbml0aWFsaXplcztcbiAgICBsZXQgYmVoYXZpb3VycyA9IHRoaXMuYmVoYXZpb3VycztcblxuICAgIGlmIChpbml0aWFsaXplKSBpbml0aWFsaXplcyA9IFV0aWwudG9BcnJheShpbml0aWFsaXplKTtcbiAgICBpZiAoYmVoYXZpb3VyKSBiZWhhdmlvdXJzID0gVXRpbC50b0FycmF5KGJlaGF2aW91cik7XG5cbiAgICBwYXJ0aWNsZS5yZXNldCgpO1xuICAgIEluaXRpYWxpemVVdGlsLmluaXRpYWxpemUodGhpcywgcGFydGljbGUsIGluaXRpYWxpemVzKTtcbiAgICBwYXJ0aWNsZS5hZGRCZWhhdmlvdXJzKGJlaGF2aW91cnMpO1xuICAgIHBhcnRpY2xlLnBhcmVudCA9IHRoaXM7XG5cbiAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKTtcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLnN0b3AoKTtcbiAgICBVdGlsLmRlc3Ryb3lBbGwodGhpcy5wYXJ0aWNsZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBFbWl0dGVyXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgdGhpcy5yZW1vdmVBbGxJbml0aWFsaXplcnMoKTtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcbiAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5yZW1vdmVFbWl0dGVyKHRoaXMpO1xuXG4gICAgdGhpcy5yYXRlID0gbnVsbDtcbiAgICB0aGlzLm9sZCA9IG51bGw7XG4gICAgdGhpcy5yZ2IgPSBudWxsO1xuICAgIHRoaXMudiA9IG51bGw7XG4gICAgdGhpcy5hID0gbnVsbDtcbiAgICB0aGlzLnAgPSBudWxsO1xuICB9XG59XG5cbkV2ZW50RGlzcGF0Y2hlci5iaW5kKEVtaXR0ZXIpO1xuIiwiaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vRW1pdHRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZWhhdmlvdXJFbWl0dGVyIGV4dGVuZHMgRW1pdHRlciB7XG4gIC8qKlxuICAgKiBUaGUgQmVoYXZpb3VyRW1pdHRlciBjbGFzcyBpbmhlcml0cyBmcm9tIFByb3Rvbi5FbWl0dGVyXG4gICAqXG4gICAqIHVzZSB0aGUgQmVoYXZpb3VyRW1pdHRlciB5b3UgY2FuIGFkZCBiZWhhdmlvdXJzIHRvIHNlbGY7XG4gICAqIEBjbGFzcyBQcm90b24uQmVoYXZpb3VyRW1pdHRlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmYgdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZikge1xuICAgIHN1cGVyKGNvbmYpO1xuXG4gICAgdGhpcy5zZWxmQmVoYXZpb3VycyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgQmVoYXZpb3VyIHRvIGVtaXR0ZXI7XG4gICAqXG4gICAqIHlvdSBjYW4gdXNlIEJlaGF2aW91cnMgYXJyYXk6ZW1pdHRlci5hZGRTZWxmQmVoYXZpb3VyKEJlaGF2aW91cjEsQmVoYXZpb3VyMixCZWhhdmlvdXIzKTtcbiAgICogQG1ldGhvZCBhZGRTZWxmQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7UHJvdG9uLkJlaGF2aW91cn0gYmVoYXZpb3VyIGxpa2UgdGhpcyBuZXcgUHJvdG9uLkNvbG9yKCdyYW5kb20nKVxuICAgKi9cbiAgYWRkU2VsZkJlaGF2aW91ciguLi5yZXN0KSB7XG4gICAgbGV0IGksXG4gICAgICBsZW5ndGggPSByZXN0Lmxlbmd0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJlaGF2aW91ciA9IHJlc3RbaV07XG4gICAgICB0aGlzLnNlbGZCZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcbiAgICAgIGJlaGF2aW91ci5pbml0aWFsaXplKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEJlaGF2aW91ciBmb3Igc2VsZlxuICAgKiBAbWV0aG9kIHJlbW92ZVNlbGZCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtQcm90b24uQmVoYXZpb3VyfSBiZWhhdmlvdXIgYSBiZWhhdmlvdXJcbiAgICovXG4gIHJlbW92ZVNlbGZCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnNlbGZCZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5zZWxmQmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgdXBkYXRlKHRpbWUpIHtcbiAgICBzdXBlci51cGRhdGUodGltZSk7XG5cbiAgICBpZiAoIXRoaXMuc2xlZXApIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuc2VsZkJlaGF2aW91cnMubGVuZ3RoO1xuICAgICAgbGV0IGk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnNlbGZCZWhhdmlvdXJzW2ldLmFwcGx5QmVoYXZpb3VyKHRoaXMsIHRpbWUsIGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBFbWl0dGVyIGZyb20gXCIuL0VtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9sbG93RW1pdHRlciBleHRlbmRzIEVtaXR0ZXIge1xuICAvKipcbiAgICogVGhlIEZvbGxvd0VtaXR0ZXIgY2xhc3MgaW5oZXJpdHMgZnJvbSBQcm90b24uRW1pdHRlclxuICAgKlxuICAgKiB1c2UgdGhlIEZvbGxvd0VtaXR0ZXIgd2lsbCBlbWl0IHBhcnRpY2xlIHdoZW4gbW91c2Vtb3ZpbmdcbiAgICpcbiAgICogQGNsYXNzIFByb3Rvbi5Gb2xsb3dFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IG1vdXNlVGFyZ2V0IG1vdXNlZXZlbnQncyB0YXJnZXQ7XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlYXNlIHRoZSBlYXNpbmcgb2YgZm9sbG93aW5nIHNwZWVkO1xuICAgKiBAZGVmYXVsdCAwLjdcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmYgdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKi9cbiAgY29uc3RydWN0b3IobW91c2VUYXJnZXQsIGVhc2UsIGNvbmYpIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMubW91c2VUYXJnZXQgPSBVdGlsLmluaXRWYWx1ZShtb3VzZVRhcmdldCwgd2luZG93KTtcbiAgICB0aGlzLmVhc2UgPSBVdGlsLmluaXRWYWx1ZShlYXNlLCAwLjcpO1xuXG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaW5pdEV2ZW50SGFuZGxlcigpO1xuICB9XG5cbiAgaW5pdEV2ZW50SGFuZGxlcigpIHtcbiAgICB0aGlzLm1vdXNlbW92ZUhhbmRsZXIgPSBlID0+IHRoaXMubW91c2Vtb3ZlLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZWRvd25IYW5kbGVyID0gZSA9PiB0aGlzLm1vdXNlZG93bi5jYWxsKHRoaXMsIGUpO1xuICAgIHRoaXMubW91c2V1cEhhbmRsZXIgPSBlID0+IHRoaXMubW91c2V1cC5jYWxsKHRoaXMsIGUpO1xuICAgIHRoaXMubW91c2VUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlbW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGFydCBlbWl0IHBhcnRpY2xlXG4gICAqIEBtZXRob2QgZW1pdFxuICAgKi9cbiAgZW1pdCgpIHtcbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdG9wIGVtaXRpbmdcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqL1xuICBzdG9wKCkge1xuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIG1vdXNlbW92ZShlKSB7XG4gICAgaWYgKGUubGF5ZXJYIHx8IGUubGF5ZXJYID09PSAwKSB7XG4gICAgICB0aGlzLnAueCArPSAoZS5sYXllclggLSB0aGlzLnAueCkgKiB0aGlzLmVhc2U7XG4gICAgICB0aGlzLnAueSArPSAoZS5sYXllclkgLSB0aGlzLnAueSkgKiB0aGlzLmVhc2U7XG4gICAgfSBlbHNlIGlmIChlLm9mZnNldFggfHwgZS5vZmZzZXRYID09PSAwKSB7XG4gICAgICB0aGlzLnAueCArPSAoZS5vZmZzZXRYIC0gdGhpcy5wLngpICogdGhpcy5lYXNlO1xuICAgICAgdGhpcy5wLnkgKz0gKGUub2Zmc2V0WSAtIHRoaXMucC55KSAqIHRoaXMuZWFzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYWxsb3dFbWl0dGluZykgc3VwZXIuZW1pdChcIm9uY2VcIik7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIEVtaXR0ZXJcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLm1vdXNlVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIERldGVybWluZSB3aGV0aGVyIGl0IGlzIGEgcGljdHVyZSBvYmplY3RcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gaXMgb3Igbm9cbiAgICovXG4gIGlzSW1hZ2Uob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBmYWxzZTtcbiAgICBpZiAob2JqLl9faXNJbWFnZSkgcmV0dXJuIHRydWU7XG5cbiAgICBjb25zdCB0YWdOYW1lID0gYCR7b2JqLnRhZ05hbWV9YC50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IG5vZGVOYW1lID0gYCR7b2JqLm5vZGVOYW1lfWAudG9VcHBlckNhc2UoKTtcbiAgICBpZiAobm9kZU5hbWUgPT09IFwiSU1HXCIgfHwgdGFnTmFtZSA9PT0gXCJJTUdcIikge1xuICAgICAgb2JqLl9faXNJbWFnZSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERldGVybWluZSB3aGV0aGVyIGl0IGlzIGEgc3RyaW5nIG9iamVjdFxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBpcyBvciBub1xuICAgKi9cbiAgaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCI7XG4gIH1cbn07XG4iLCJpbXBvcnQgUG9vbCBmcm9tIFwiLi4vY29yZS9Qb29sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHN0cm9rZSkge1xuICAgIHRoaXMucG9vbCA9IG5ldyBQb29sKCk7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICB0aGlzLmNpcmNsZUNvbmYgPSB7IGlzQ2lyY2xlOiB0cnVlIH07XG5cbiAgICB0aGlzLmluaXRFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLm5hbWUgPSBcIkJhc2VSZW5kZXJlclwiO1xuICB9XG5cbiAgc2V0U3Ryb2tlKGNvbG9yID0gXCIjMDAwMDAwXCIsIHRoaW5rbmVzcyA9IDEpIHtcbiAgICB0aGlzLnN0cm9rZSA9IHsgY29sb3IsIHRoaW5rbmVzcyB9O1xuICB9XG5cbiAgaW5pdEV2ZW50SGFuZGxlcigpIHtcbiAgICB0aGlzLl9wcm90b25VcGRhdGVIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5vblByb3RvblVwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIH07XG5cbiAgICB0aGlzLl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLm9uUHJvdG9uVXBkYXRlQWZ0ZXIuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZW1pdHRlckFkZGVkSGFuZGxlciA9IGVtaXR0ZXIgPT4ge1xuICAgICAgdGhpcy5vbkVtaXR0ZXJBZGRlZC5jYWxsKHRoaXMsIGVtaXR0ZXIpO1xuICAgIH07XG5cbiAgICB0aGlzLl9lbWl0dGVyUmVtb3ZlZEhhbmRsZXIgPSBlbWl0dGVyID0+IHtcbiAgICAgIHRoaXMub25FbWl0dGVyUmVtb3ZlZC5jYWxsKHRoaXMsIGVtaXR0ZXIpO1xuICAgIH07XG5cbiAgICB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyID0gcGFydGljbGUgPT4ge1xuICAgICAgdGhpcy5vblBhcnRpY2xlQ3JlYXRlZC5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyID0gcGFydGljbGUgPT4ge1xuICAgICAgdGhpcy5vblBhcnRpY2xlVXBkYXRlLmNhbGwodGhpcywgcGFydGljbGUpO1xuICAgIH07XG5cbiAgICB0aGlzLl9wYXJ0aWNsZURlYWRIYW5kbGVyID0gcGFydGljbGUgPT4ge1xuICAgICAgdGhpcy5vblBhcnRpY2xlRGVhZC5jYWxsKHRoaXMsIHBhcnRpY2xlKTtcbiAgICB9O1xuICB9XG5cbiAgaW5pdChwcm90b24pIHtcbiAgICB0aGlzLnBhcmVudCA9IHByb3RvbjtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURVwiLCB0aGlzLl9wcm90b25VcGRhdGVIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgdGhpcy5fcHJvdG9uVXBkYXRlQWZ0ZXJIYW5kbGVyKTtcblxuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9BRERFRFwiLCB0aGlzLl9lbWl0dGVyQWRkZWRIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfUkVNT1ZFRFwiLCB0aGlzLl9lbWl0dGVyUmVtb3ZlZEhhbmRsZXIpO1xuXG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9DUkVBVEVEXCIsIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfVVBEQVRFXCIsIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9ERUFEXCIsIHRoaXMuX3BhcnRpY2xlRGVhZEhhbmRsZXIpO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICAgIHRoaXMucG9vbC5kZXN0cm95KCk7XG4gICAgdGhpcy5wb29sID0gbnVsbDtcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgfVxuXG4gIHJlbW92ZShwcm90b24pIHtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURVwiLCB0aGlzLl9wcm90b25VcGRhdGVIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURV9BRlRFUlwiLCB0aGlzLl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIpO1xuXG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfQURERURcIiwgdGhpcy5fZW1pdHRlckFkZGVkSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIkVNSVRURVJfUkVNT1ZFRFwiLCB0aGlzLl9lbWl0dGVyUmVtb3ZlZEhhbmRsZXIpO1xuXG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0NSRUFURURcIiwgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX1VQREFURVwiLCB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9ERUFEXCIsIHRoaXMuX3BhcnRpY2xlRGVhZEhhbmRsZXIpO1xuXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7fVxuICBvblByb3RvblVwZGF0ZUFmdGVyKCkge31cblxuICBvbkVtaXR0ZXJBZGRlZChlbWl0dGVyKSB7fVxuICBvbkVtaXR0ZXJSZW1vdmVkKGVtaXR0ZXIpIHt9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHt9XG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHt9XG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fVxufVxuIiwiaW1wb3J0IFR5cGVzIGZyb20gXCIuLi91dGlscy9UeXBlc1wiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG4vKipcbiAqIENhbnZhc1JlbmRlcmVyIGNsYXNzIGZvciByZW5kZXJpbmcgcGFydGljbGVzIG9uIGEgY2FudmFzIGVsZW1lbnQuXG4gKiBAZXh0ZW5kcyBCYXNlUmVuZGVyZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICAvKipcbiAgICogQHR5cGUge29iamVjdHxudWxsfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3Ryb2tlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29udGV4dDtcblxuICAvKipcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGJ1ZmZlckNhY2hlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBDYW52YXNSZW5kZXJlciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gZWxlbWVudCAtIFRoZSBjYW52YXMgZWxlbWVudCB0byByZW5kZXIgb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0ge307XG4gICAgdGhpcy5uYW1lID0gXCJDYW52YXNSZW5kZXJlclwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZXMgdGhlIGNhbnZhcyBlbGVtZW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSBUaGUgbmV3IHdpZHRoIG9mIHRoZSBjYW52YXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgLSBUaGUgbmV3IGhlaWdodCBvZiB0aGUgY2FudmFzLlxuICAgKi9cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgY2FudmFzIG9uIFByb3RvbiB1cGRhdGUuXG4gICAqL1xuICBvblByb3RvblVwZGF0ZSgpIHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwYXJ0aWNsZSBjcmVhdGlvbi5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIGNyZWF0ZWQgcGFydGljbGUuXG4gICAqL1xuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmNvbG9yID0gcGFydGljbGUuY29sb3IgfHwgXCIjZmYwMDAwXCI7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgdXBkYXRlcy5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIHVwZGF0ZWQgcGFydGljbGUuXG4gICAqL1xuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIGlmIChUeXBlcy5pc0ltYWdlKHBhcnRpY2xlLmJvZHkpKSB7XG4gICAgICAgIHRoaXMuZHJhd0ltYWdlKHBhcnRpY2xlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmF3Q2lyY2xlKHBhcnRpY2xlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwYXJ0aWNsZSBkZXN0cnVjdGlvbi5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIGRlc3Ryb3llZCBwYXJ0aWNsZS5cbiAgICovXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBpbWFnZSB0byB0aGUgcGFydGljbGUgYm9keS5cbiAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBpbWcgLSBUaGUgaW1hZ2UgdG8gYWRkLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gYWRkIHRoZSBpbWFnZSB0by5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFkZEltZzJCb2R5KGltZywgcGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gaW1nO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIGFuIGltYWdlIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gZHJhdy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRyYXdJbWFnZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHcgPSAocGFydGljbGUuYm9keS53aWR0aCAqIHBhcnRpY2xlLnNjYWxlKSB8IDA7XG4gICAgY29uc3QgaCA9IChwYXJ0aWNsZS5ib2R5LmhlaWdodCAqIHBhcnRpY2xlLnNjYWxlKSB8IDA7XG4gICAgY29uc3QgeCA9IHBhcnRpY2xlLnAueCAtIHcgLyAyO1xuICAgIGNvbnN0IHkgPSBwYXJ0aWNsZS5wLnkgLSBoIC8gMjtcblxuICAgIGlmICghIXBhcnRpY2xlLmNvbG9yKSB7XG4gICAgICBpZiAoIXBhcnRpY2xlLmRhdGFbXCJidWZmZXJcIl0pIHBhcnRpY2xlLmRhdGEuYnVmZmVyID0gdGhpcy5jcmVhdGVCdWZmZXIocGFydGljbGUuYm9keSk7XG5cbiAgICAgIGNvbnN0IGJ1ZkNvbnRleHQgPSBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICBidWZDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci53aWR0aCwgcGFydGljbGUuZGF0YS5idWZmZXIuaGVpZ2h0KTtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIGJ1ZkNvbnRleHQuZHJhd0ltYWdlKHBhcnRpY2xlLmJvZHksIDAsIDApO1xuXG4gICAgICBidWZDb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLWF0b3BcIjtcbiAgICAgIGJ1ZkNvbnRleHQuZmlsbFN0eWxlID0gQ29sb3JVdGlsLnJnYlRvSGV4KHBhcnRpY2xlLnJnYik7XG4gICAgICBidWZDb250ZXh0LmZpbGxSZWN0KDAsIDAsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLndpZHRoLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci5oZWlnaHQpO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcblxuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLndpZHRoLFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci5oZWlnaHQsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHcsXG4gICAgICAgIGhcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG5cbiAgICAgIHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuICAgICAgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZShwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSk7XG4gICAgICB0aGlzLmNvbnRleHQucm90YXRlKE1hdGhVdGlsLmRlZ3JlZVRyYW5zZm9ybShwYXJ0aWNsZS5yb3RhdGlvbikpO1xuICAgICAgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSgtcGFydGljbGUucC54LCAtcGFydGljbGUucC55KTtcbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UocGFydGljbGUuYm9keSwgMCwgMCwgcGFydGljbGUuYm9keS53aWR0aCwgcGFydGljbGUuYm9keS5oZWlnaHQsIHgsIHksIHcsIGgpO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgYSBjaXJjdWxhciBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGRyYXcuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkcmF3Q2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLnJnYikge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7cGFydGljbGUucmdiLnJ9LCR7cGFydGljbGUucmdiLmd9LCR7cGFydGljbGUucmdiLmJ9LCR7cGFydGljbGUuYWxwaGF9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBwYXJ0aWNsZS5jb2xvcjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmFyYyhwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSwgcGFydGljbGUucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuc3Ryb2tlLmNvbG9yO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMuc3Ryb2tlLnRoaW5rbmVzcztcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYnVmZmVyIGZvciBpbWFnZSBwYXJ0aWNsZXMuXG4gICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudH0gaW1hZ2UgLSBUaGUgaW1hZ2UgdG8gY3JlYXRlIGEgYnVmZmVyIGZvci5cbiAgICogQHJldHVybnMge0hUTUxDYW52YXNFbGVtZW50fHVuZGVmaW5lZH0gVGhlIGNyZWF0ZWQgYnVmZmVyIGNhbnZhcy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNyZWF0ZUJ1ZmZlcihpbWFnZSkge1xuICAgIGlmIChUeXBlcy5pc0ltYWdlKGltYWdlKSkge1xuICAgICAgY29uc3Qgc2l6ZSA9IGltYWdlLndpZHRoICsgXCJfXCIgKyBpbWFnZS5oZWlnaHQ7XG4gICAgICBsZXQgY2FudmFzID0gdGhpcy5idWZmZXJDYWNoZVtzaXplXTtcblxuICAgICAgaWYgKCFjYW52YXMpIHtcbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYnVmZmVyQ2FjaGVbc2l6ZV0gPSBjYW52YXM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSByZW5kZXJlciBhbmQgY2xlYW5zIHVwIHJlc291cmNlcy5cbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyQ2FjaGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIERPTS1iYXNlZCByZW5kZXJlciBmb3IgcGFydGljbGUgc3lzdGVtcy5cbiAqIEBleHRlbmRzIEJhc2VSZW5kZXJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21SZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IERvbVJlbmRlcmVyIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gVGhlIEhUTUwgZWxlbWVudCB0byByZW5kZXIgdG8uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy50cmFuc2Zvcm0zZCA9IGZhbHNlO1xuICAgIHRoaXMucG9vbC5jcmVhdGUgPSAoYm9keSwgcGFydGljbGUpID0+IHRoaXMuY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSk7XG4gICAgdGhpcy5hZGRJbWcyQm9keSA9IHRoaXMuYWRkSW1nMkJvZHkuYmluZCh0aGlzKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRG9tUmVuZGVyZXJcIjtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHBhcnRpY2xlLmJvZHksIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQodGhpcy5jaXJjbGVDb25mLCBwYXJ0aWNsZSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmJvZHlSZWFkeShwYXJ0aWNsZSkpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zZm9ybTNkKSB7XG4gICAgICAgIERvbVV0aWwudHJhbnNmb3JtM2QocGFydGljbGUuYm9keSwgcGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnksIHBhcnRpY2xlLnNjYWxlLCBwYXJ0aWNsZS5yb3RhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBEb21VdGlsLnRyYW5zZm9ybShwYXJ0aWNsZS5ib2R5LCBwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSwgcGFydGljbGUuc2NhbGUsIHBhcnRpY2xlLnJvdGF0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcGFydGljbGUuYm9keS5zdHlsZS5vcGFjaXR5ID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5ib2R5LmlzQ2lyY2xlKSB7XG4gICAgICAgIHBhcnRpY2xlLmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcGFydGljbGUuY29sb3IgfHwgXCIjZmYwMDAwXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5ib2R5UmVhZHkocGFydGljbGUpKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgICB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgYm9keVJlYWR5KHBhcnRpY2xlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBwYXJ0aWNsZS5ib2R5ID09PSBcIm9iamVjdFwiICYmIHBhcnRpY2xlLmJvZHkgJiYgIXBhcnRpY2xlLmJvZHkuaXNJbm5lcjtcbiAgfVxuXG4gIC8vIHByaXZhdGUgbWV0aG9kXG4gIGFkZEltZzJCb2R5KGltZywgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuZGVhZCkgcmV0dXJuO1xuICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KGltZywgcGFydGljbGUpO1xuICAgIERvbVV0aWwucmVzaXplKHBhcnRpY2xlLmJvZHksIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocGFydGljbGUuYm9keSk7XG4gIH1cblxuICBjcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKSB7XG4gICAgaWYgKGJvZHkuaXNDaXJjbGUpIHJldHVybiB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlU3ByaXRlKGJvZHksIHBhcnRpY2xlKTtcbiAgfVxuXG4gIC8vIHByaXZhdGUgbWV0aG9kc1xuICBjcmVhdGVDaXJjbGUocGFydGljbGUpIHtcbiAgICBjb25zdCBkb20gPSBEb21VdGlsLmNyZWF0ZURpdihgJHtwYXJ0aWNsZS5pZH1fZG9tYCwgMiAqIHBhcnRpY2xlLnJhZGl1cywgMiAqIHBhcnRpY2xlLnJhZGl1cyk7XG4gICAgZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9IGAke3BhcnRpY2xlLnJhZGl1c31weGA7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGRvbS5zdHlsZS5ib3JkZXJDb2xvciA9IHRoaXMuc3Ryb2tlLmNvbG9yO1xuICAgICAgZG9tLnN0eWxlLmJvcmRlcldpZHRoID0gYCR7dGhpcy5zdHJva2UudGhpbmtuZXNzfXB4YDtcbiAgICB9XG4gICAgZG9tLmlzQ2lyY2xlID0gdHJ1ZTtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuICBjcmVhdGVTcHJpdGUoYm9keSwgcGFydGljbGUpIHtcbiAgICBjb25zdCB1cmwgPSB0eXBlb2YgYm9keSA9PT0gXCJzdHJpbmdcIiA/IGJvZHkgOiBib2R5LnNyYztcbiAgICBjb25zdCBkb20gPSBEb21VdGlsLmNyZWF0ZURpdihgJHtwYXJ0aWNsZS5pZH1fZG9tYCwgYm9keS53aWR0aCwgYm9keS5oZWlnaHQpO1xuICAgIGRvbS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7dXJsfSlgO1xuXG4gICAgcmV0dXJuIGRvbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgcmVuZGVyZXIgYW5kIGNsZWFucyB1cCByZXNvdXJjZXMuXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBUeXBlcyBmcm9tIFwiLi4vdXRpbHMvVHlwZXNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVhc2VsUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHJva2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMubmFtZSA9IFwiRWFzZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgdGhpcy5jcmVhdGVTcHJpdGUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZUNpcmNsZShwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZENoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnggPSBwYXJ0aWNsZS5wLng7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnkgPSBwYXJ0aWNsZS5wLnk7XG5cbiAgICAgIHBhcnRpY2xlLmJvZHkuYWxwaGEgPSBwYXJ0aWNsZS5hbHBoYTtcbiAgICAgIHBhcnRpY2xlLmJvZHkuc2NhbGVYID0gcGFydGljbGUuYm9keS5zY2FsZVkgPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICAgIHBhcnRpY2xlLmJvZHkucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbjtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnBhcmVudCAmJiBwYXJ0aWNsZS5ib2R5LnBhcmVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUuZ3JhcGhpY3MpIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuZ3JhcGhpY3MpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICBjcmVhdGVTcHJpdGUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5KTtcblxuICAgIGlmIChwYXJ0aWNsZS5ib2R5LnBhcmVudCkgcmV0dXJuO1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5W1wiaW1hZ2VcIl0pIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkucmVnWCA9IHBhcnRpY2xlLmJvZHkuaW1hZ2Uud2lkdGggLyAyO1xuICAgICAgcGFydGljbGUuYm9keS5yZWdZID0gcGFydGljbGUuYm9keS5pbWFnZS5oZWlnaHQgLyAyO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gdGhpcy5wb29sLmdldCh3aW5kb3cuY3JlYXRlanMuR3JhcGhpY3MpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBpZiAoVHlwZXMuaXNTdHJpbmcodGhpcy5zdHJva2UpKSB7XG4gICAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKHRoaXMuc3Ryb2tlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKFwiIzAwMDAwMFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZ3JhcGhpY3MuYmVnaW5GaWxsKHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiKS5kcmF3Q2lyY2xlKDAsIDAsIHBhcnRpY2xlLnJhZGl1cyk7XG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLnBvb2wuZ2V0KHdpbmRvdy5jcmVhdGVqcy5TaGFwZSwgW2dyYXBoaWNzXSk7XG5cbiAgICBwYXJ0aWNsZS5ib2R5ID0gc2hhcGU7XG4gICAgcGFydGljbGUuZ3JhcGhpY3MgPSBncmFwaGljcztcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFJlY3RhbmdsZSBmcm9tIFwiLi4vbWF0aC9SZWN0YW5nbGVcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBpeGVsLWJhc2VkIHJlbmRlcmVyIGZvciBwYXJ0aWNsZSBzeXN0ZW1zLlxuICogQGV4dGVuZHMgQmFzZVJlbmRlcmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpeGVsUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBQaXhlbFJlbmRlcmVyIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBlbGVtZW50IC0gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHJlbmRlciB0by5cbiAgICogQHBhcmFtIHtSZWN0YW5nbGV9IFtyZWN0YW5nbGVdIC0gVGhlIHJlY3RhbmdsZSBkZWZpbmluZyB0aGUgcmVuZGVyaW5nIGFyZWEuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCByZWN0YW5nbGUpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICAgIHRoaXMucmVjdGFuZ2xlID0gcmVjdGFuZ2xlO1xuICAgIHRoaXMuY3JlYXRlSW1hZ2VEYXRhKHJlY3RhbmdsZSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlBpeGVsUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIGNyZWF0ZUltYWdlRGF0YShyZWN0YW5nbGUpIHtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZSA/IHJlY3RhbmdsZSA6IG5ldyBSZWN0YW5nbGUoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5jcmVhdGVJbWFnZURhdGEodGhpcy5yZWN0YW5nbGUud2lkdGgsIHRoaXMucmVjdGFuZ2xlLmhlaWdodCk7XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlRGF0YSwgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSk7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnksIHRoaXMucmVjdGFuZ2xlLndpZHRoLCB0aGlzLnJlY3RhbmdsZS5oZWlnaHQpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YShcbiAgICAgIHRoaXMucmVjdGFuZ2xlLngsXG4gICAgICB0aGlzLnJlY3RhbmdsZS55LFxuICAgICAgdGhpcy5yZWN0YW5nbGUud2lkdGgsXG4gICAgICB0aGlzLnJlY3RhbmdsZS5oZWlnaHRcbiAgICApO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGVBZnRlcigpIHtcbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCB0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55KTtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5pbWFnZURhdGEpIHtcbiAgICAgIHRoaXMuc2V0UGl4ZWwoXG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhLFxuICAgICAgICAocGFydGljbGUucC54IC0gdGhpcy5yZWN0YW5nbGUueCkgPj4gMCxcbiAgICAgICAgKHBhcnRpY2xlLnAueSAtIHRoaXMucmVjdGFuZ2xlLnkpID4+IDAsXG4gICAgICAgIHBhcnRpY2xlXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHNldFBpeGVsKGltYWdlZGF0YSwgeCwgeSwgcGFydGljbGUpIHtcbiAgICBjb25zdCByZ2IgPSBwYXJ0aWNsZS5yZ2I7XG4gICAgaWYgKHggPCAwIHx8IHggPiB0aGlzLmVsZW1lbnQud2lkdGggfHwgeSA8IDAgfHwgeSA+IHRoaXMuZWxlbWVudC5oZWlnaHQpIHJldHVybjtcblxuICAgIGNvbnN0IGkgPSAoKHkgPj4gMCkgKiBpbWFnZWRhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuICAgIGltYWdlZGF0YS5kYXRhW2ldID0gcmdiLnI7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDFdID0gcmdiLmc7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDJdID0gcmdiLmI7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDNdID0gcGFydGljbGUuYWxwaGEgKiAyNTU7XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHJlbmRlcmVyIGFuZCBjbGVhbnMgdXAgcmVzb3VyY2VzLlxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICAgIHRoaXMucmVjdGFuZ2xlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFR5cGVzIGZyb20gXCIuLi91dGlscy9UeXBlc1wiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmxldCBQSVhJQ2xhc3M7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFBJWEktYmFzZWQgcmVuZGVyZXIgZm9yIHBhcnRpY2xlIHN5c3RlbXMuXG4gKiBAZXh0ZW5kcyBCYXNlUmVuZGVyZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGl4aVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUGl4aVJlbmRlcmVyIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge1BJWEkuQ29udGFpbmVyfSBlbGVtZW50IC0gVGhlIFBJWEkgY29udGFpbmVyIHRvIHJlbmRlciB0by5cbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbc3Ryb2tlXSAtIFRoZSBzdHJva2UgY29sb3IgZm9yIHBhcnRpY2xlcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHN0cm9rZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Q29sb3IgPSBmYWxzZTtcbiAgICB0aGlzLmJsZW5kTW9kZSA9IG51bGw7XG4gICAgdGhpcy5wb29sLmNyZWF0ZSA9IChib2R5LCBwYXJ0aWNsZSkgPT4gdGhpcy5jcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKTtcbiAgICB0aGlzLnNldFBJWEkod2luZG93LlBJWEkpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhpUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFBJWEkoUElYSSkge1xuICAgIHRyeSB7XG4gICAgICBQSVhJQ2xhc3MgPSBQSVhJIHx8IHsgU3ByaXRlOiB7fSB9O1xuICAgICAgdGhpcy5jcmVhdGVGcm9tSW1hZ2UgPSBQSVhJQ2xhc3MuU3ByaXRlLmZyb20gfHwgUElYSUNsYXNzLlNwcml0ZS5mcm9tSW1hZ2U7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSkge1xuICAgICAgcGFydGljbGUuYm9keS5ibGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkQ2hpbGQocGFydGljbGUuYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgdGhpcy50cmFuc2Zvcm0ocGFydGljbGUsIHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgaWYgKHRoaXMuc2V0Q29sb3IgPT09IHRydWUgfHwgdGhpcy5jb2xvciA9PT0gdHJ1ZSkge1xuICAgICAgcGFydGljbGUuYm9keS50aW50ID0gQ29sb3JVdGlsLmdldEhleDE2RnJvbVBhcnRpY2xlKHBhcnRpY2xlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmJvZHkpO1xuICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICB9XG5cbiAgdHJhbnNmb3JtKHBhcnRpY2xlLCB0YXJnZXQpIHtcbiAgICB0YXJnZXQueCA9IHBhcnRpY2xlLnAueDtcbiAgICB0YXJnZXQueSA9IHBhcnRpY2xlLnAueTtcblxuICAgIHRhcmdldC5hbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgdGFyZ2V0LnNjYWxlLnggPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICB0YXJnZXQuc2NhbGUueSA9IHBhcnRpY2xlLnNjYWxlO1xuXG4gICAgLy8gdXNpbmcgY2FjaGVkIHZlcnNpb24gb2YgTWF0aFV0aWwuUElfMTgwIGZvciBzbGlnaHQgcGVyZm9ybWFuY2UgaW5jcmVhc2UuXG4gICAgdGFyZ2V0LnJvdGF0aW9uID0gcGFydGljbGUucm90YXRpb24gKiBNYXRoVXRpbC5QSV8xODA7IC8vIE1hdGhVdGlsLlBJXzE4MDtcbiAgfVxuXG4gIGNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpIHtcbiAgICBpZiAoYm9keS5pc0NpcmNsZSkgcmV0dXJuIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICBlbHNlIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZVNwcml0ZShib2R5KSB7XG4gICAgY29uc3Qgc3ByaXRlID0gYm9keS5pc0lubmVyID8gdGhpcy5jcmVhdGVGcm9tSW1hZ2UoYm9keS5zcmMpIDogbmV3IFBJWElDbGFzcy5TcHJpdGUoYm9keSk7XG5cbiAgICBzcHJpdGUuYW5jaG9yLnggPSAwLjU7XG4gICAgc3ByaXRlLmFuY2hvci55ID0gMC41O1xuXG4gICAgcmV0dXJuIHNwcml0ZTtcbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gbmV3IFBJWElDbGFzcy5HcmFwaGljcygpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBjb25zdCBzdHJva2UgPSBUeXBlcy5pc1N0cmluZyh0aGlzLnN0cm9rZSkgPyB0aGlzLnN0cm9rZSA6IDB4MDAwMDAwO1xuICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2Uoc3Ryb2tlKTtcbiAgICB9XG5cbiAgICBncmFwaGljcy5iZWdpbkZpbGwocGFydGljbGUuY29sb3IgfHwgMHgwMDhjZWQpO1xuICAgIGdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgcGFydGljbGUucmFkaXVzKTtcbiAgICBncmFwaGljcy5lbmRGaWxsKCk7XG5cbiAgICByZXR1cm4gZ3JhcGhpY3M7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHJlbmRlcmVyIGFuZCBjbGVhbnMgdXAgcmVzb3VyY2VzLlxuICAgKiBAcGFyYW0ge0FycmF5PFBhcnRpY2xlPn0gcGFydGljbGVzIC0gVGhlIHBhcnRpY2xlcyB0byBjbGVhbiB1cC5cbiAgICovXG4gIGRlc3Ryb3kocGFydGljbGVzKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgbGV0IGkgPSBwYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCBwYXJ0aWNsZSA9IHBhcnRpY2xlc1tpXTtcbiAgICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXQzIGZyb20gXCIuLi9tYXRoL01hdDNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTVN0YWNrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXRzID0gW107XG4gICAgdGhpcy5zaXplID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykgdGhpcy5tYXRzLnB1c2goTWF0My5jcmVhdGUoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdKSk7XG4gIH1cblxuICBzZXQobSwgaSkge1xuICAgIGlmIChpID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbaSAtIDFdLCBtLCB0aGlzLm1hdHNbaV0pO1xuXG4gICAgdGhpcy5zaXplID0gTWF0aC5tYXgodGhpcy5zaXplLCBpICsgMSk7XG4gIH1cblxuICBwdXNoKG0pIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSBNYXQzLnNldChtLCB0aGlzLm1hdHNbMF0pO1xuICAgIGVsc2UgTWF0My5tdWx0aXBseSh0aGlzLm1hdHNbdGhpcy5zaXplIC0gMV0sIG0sIHRoaXMubWF0c1t0aGlzLnNpemVdKTtcblxuICAgIHRoaXMuc2l6ZSsrO1xuICB9XG5cbiAgcG9wKCkge1xuICAgIGlmICh0aGlzLnNpemUgPiAwKSB0aGlzLnNpemUtLTtcbiAgfVxuXG4gIHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRzW3RoaXMuc2l6ZSAtIDFdO1xuICB9XG59XG4iLCJpbXBvcnQgTWF0MyBmcm9tIFwiLi4vbWF0aC9NYXQzXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEltZ1V0aWwgZnJvbSBcIi4uL3V0aWxzL0ltZ1V0aWxcIjtcbmltcG9ydCBNU3RhY2sgZnJvbSBcIi4uL3V0aWxzL01TdGFja1wiO1xuaW1wb3J0IERvbVV0aWwgZnJvbSBcIi4uL3V0aWxzL0RvbVV0aWxcIjtcbmltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4uL3V0aWxzL1dlYkdMVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFdlYkdMLWJhc2VkIHJlbmRlcmVyIGZvciBwYXJ0aWNsZSBzeXN0ZW1zLlxuICogQGV4dGVuZHMgQmFzZVJlbmRlcmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYkdMUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBXZWJHTFJlbmRlcmVyIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBlbGVtZW50IC0gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHJlbmRlciB0by5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuZ2wgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiLCB7IGFudGlhbGlhczogdHJ1ZSwgc3RlbmNpbDogZmFsc2UsIGRlcHRoOiBmYWxzZSB9KTtcbiAgICBpZiAoIXRoaXMuZ2wpIGFsZXJ0KFwiU29ycnkgeW91ciBicm93c2VyIGRvIG5vdCBzdXBwZXN0IFdlYkdMIVwiKTtcblxuICAgIHRoaXMuaW5pdFZhcigpO1xuICAgIHRoaXMuc2V0TWF4UmFkaXVzKCk7XG4gICAgdGhpcy5pbml0U2hhZGVycygpO1xuICAgIHRoaXMuaW5pdEJ1ZmZlcnMoKTtcblxuICAgIHRoaXMuZ2wuYmxlbmRFcXVhdGlvbih0aGlzLmdsLkZVTkNfQUREKTtcbiAgICB0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsLlNSQ19BTFBIQSwgdGhpcy5nbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTtcbiAgICB0aGlzLmFkZEltZzJCb2R5ID0gdGhpcy5hZGRJbWcyQm9keS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJXZWJHTFJlbmRlcmVyXCI7XG4gIH1cblxuICBpbml0KHByb3Rvbikge1xuICAgIHN1cGVyLmluaXQocHJvdG9uKTtcbiAgICB0aGlzLnJlc2l6ZSh0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnVtYXRbNF0gPSAtMjtcbiAgICB0aGlzLnVtYXRbN10gPSAxO1xuXG4gICAgdGhpcy5zbWF0WzBdID0gMSAvIHdpZHRoO1xuICAgIHRoaXMuc21hdFs0XSA9IDEgLyBoZWlnaHQ7XG5cbiAgICB0aGlzLm1zdGFjay5zZXQodGhpcy51bWF0LCAwKTtcbiAgICB0aGlzLm1zdGFjay5zZXQodGhpcy5zbWF0LCAxKTtcblxuICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIHNldE1heFJhZGl1cyhyYWRpdXMpIHtcbiAgICB0aGlzLmNpcmNsZUNhbnZhc1VSTCA9IHRoaXMuY3JlYXRlQ2lyY2xlKHJhZGl1cyk7XG4gIH1cblxuICBnZXRWZXJ0ZXhTaGFkZXIoKSB7XG4gICAgY29uc3QgdnNTb3VyY2UgPSBbXG4gICAgICBcInVuaWZvcm0gdmVjMiB2aWV3cG9ydDtcIixcbiAgICAgIFwiYXR0cmlidXRlIHZlYzIgYVZlcnRleFBvc2l0aW9uO1wiLFxuICAgICAgXCJhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ1bmlmb3JtIG1hdDMgdE1hdDtcIixcbiAgICAgIFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInZhcnlpbmcgZmxvYXQgYWxwaGE7XCIsXG4gICAgICBcInZvaWQgbWFpbigpIHtcIixcbiAgICAgIFwidmVjMyB2ID0gdE1hdCAqIHZlYzMoYVZlcnRleFBvc2l0aW9uLCAxLjApO1wiLFxuICAgICAgXCJnbF9Qb3NpdGlvbiA9IHZlYzQodi54LCB2LnksIDAsIDEpO1wiLFxuICAgICAgXCJ2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcIixcbiAgICAgIFwiYWxwaGEgPSB0TWF0WzBdWzJdO1wiLFxuICAgICAgXCJ9XCJcbiAgICBdLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIHZzU291cmNlO1xuICB9XG5cbiAgZ2V0RnJhZ21lbnRTaGFkZXIoKSB7XG4gICAgY29uc3QgZnNTb3VyY2UgPSBbXG4gICAgICBcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFxuICAgICAgXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidmFyeWluZyBmbG9hdCBhbHBoYTtcIixcbiAgICAgIFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXG4gICAgICBcInVuaWZvcm0gdmVjNCBjb2xvcjtcIixcbiAgICAgIFwidW5pZm9ybSBib29sIHVzZVRleHR1cmU7XCIsXG4gICAgICBcInVuaWZvcm0gdmVjMyB1Q29sb3I7XCIsXG4gICAgICBcInZvaWQgbWFpbigpIHtcIixcbiAgICAgIFwidmVjNCB0ZXh0dXJlQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1wiLFxuICAgICAgXCJnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlQ29sb3IgKiB2ZWM0KHVDb2xvciwgMS4wKTtcIixcbiAgICAgIFwiZ2xfRnJhZ0NvbG9yLncgKj0gYWxwaGE7XCIsXG4gICAgICBcIn1cIlxuICAgIF0uam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gZnNTb3VyY2U7XG4gIH1cblxuICBpbml0VmFyKCkge1xuICAgIHRoaXMubXN0YWNrID0gbmV3IE1TdGFjaygpO1xuICAgIHRoaXMudW1hdCA9IE1hdDMuY3JlYXRlKFsyLCAwLCAxLCAwLCAtMiwgMCwgLTEsIDEsIDFdKTtcbiAgICB0aGlzLnNtYXQgPSBNYXQzLmNyZWF0ZShbMSAvIDEwMCwgMCwgMSwgMCwgMSAvIDEwMCwgMCwgMCwgMCwgMV0pO1xuICAgIHRoaXMudGV4dHVyZWJ1ZmZlcnMgPSB7fTtcbiAgfVxuXG4gIGJsZW5kRXF1YXRpb24oQSkge1xuICAgIHRoaXMuZ2wuYmxlbmRFcXVhdGlvbih0aGlzLmdsW0FdKTtcbiAgfVxuXG4gIGJsZW5kRnVuYyhBLCBCKSB7XG4gICAgdGhpcy5nbC5ibGVuZEZ1bmModGhpcy5nbFtBXSwgdGhpcy5nbFtCXSk7XG4gIH1cblxuICBnZXRTaGFkZXIoZ2wsIHN0ciwgZnMpIHtcbiAgICBjb25zdCBzaGFkZXIgPSBmcyA/IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpIDogZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuXG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc3RyKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG5cbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgYWxlcnQoZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cblxuICBpbml0U2hhZGVycygpIHtcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMuZ2V0U2hhZGVyKHRoaXMuZ2wsIHRoaXMuZ2V0RnJhZ21lbnRTaGFkZXIoKSwgdHJ1ZSk7XG4gICAgY29uc3QgdmVydGV4U2hhZGVyID0gdGhpcy5nZXRTaGFkZXIodGhpcy5nbCwgdGhpcy5nZXRWZXJ0ZXhTaGFkZXIoKSwgZmFsc2UpO1xuXG4gICAgdGhpcy5zcHJvZ3JhbSA9IHRoaXMuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHRoaXMuc3Byb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5zcHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIHRoaXMuZ2wubGlua1Byb2dyYW0odGhpcy5zcHJvZ3JhbSk7XG5cbiAgICBpZiAoIXRoaXMuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnNwcm9ncmFtLCB0aGlzLmdsLkxJTktfU1RBVFVTKSkgYWxlcnQoXCJDb3VsZCBub3QgaW5pdGlhbGlzZSBzaGFkZXJzXCIpO1xuXG4gICAgdGhpcy5nbC51c2VQcm9ncmFtKHRoaXMuc3Byb2dyYW0pO1xuICAgIHRoaXMuc3Byb2dyYW0udnBhID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcImFWZXJ0ZXhQb3NpdGlvblwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLnRjYSA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJhVGV4dHVyZUNvb3JkXCIpO1xuICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5zcHJvZ3JhbS50Y2EpO1xuICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5zcHJvZ3JhbS52cGEpO1xuXG4gICAgdGhpcy5zcHJvZ3JhbS50TWF0VW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidE1hdFwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLnNhbXBsZXJVbmlmb3JtID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ1U2FtcGxlclwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLnVzZVRleCA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwidXNlVGV4dHVyZVwiKTtcbiAgICB0aGlzLnNwcm9ncmFtLmNvbG9yID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ1Q29sb3JcIik7XG4gICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zcHJvZ3JhbS51c2VUZXgsIDEpO1xuICB9XG5cbiAgaW5pdEJ1ZmZlcnMoKSB7XG4gICAgY29uc3QgdnMgPSBbMCwgMywgMSwgMCwgMiwgM107XG4gICAgbGV0IGlkeDtcblxuICAgIHRoaXMudW5pdElCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQxNkFycmF5KHZzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBsZXQgaTtcbiAgICBsZXQgaWRzID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDEwMDsgaSsrKSBpZHMucHVzaChpKTtcbiAgICBpZHggPSBuZXcgVWludDE2QXJyYXkoaWRzKTtcblxuICAgIHRoaXMudW5pdEkzMyA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdEkzMyk7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGlkeCwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBpZHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTAwOyBpKyspIGlkcy5wdXNoKGksIGkgKyAxLCBpICsgMik7XG4gICAgaWR4ID0gbmV3IFVpbnQxNkFycmF5KGlkcyk7XG5cbiAgICB0aGlzLnN0cmlwQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5zdHJpcEJ1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGlkeCwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG4gIH1cblxuICBjcmVhdGVDaXJjbGUocmFpZHVzKSB7XG4gICAgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgPSBXZWJHTFV0aWwubmhwb3QoVXRpbC5pbml0VmFsdWUocmFpZHVzLCAzMikpO1xuICAgIGNvbnN0IGNhbnZhcyA9IERvbVV0aWwuY3JlYXRlQ2FudmFzKFwiY2lyY2xlX2NhbnZhc1wiLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyAqIDIsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzICogMik7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQuYXJjKHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgY29udGV4dC5maWxsKCk7XG5cbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgpO1xuICB9XG5cbiAgZHJhd0ltZzJDYW52YXMocGFydGljbGUpIHtcbiAgICBjb25zdCBfdyA9IHBhcnRpY2xlLmJvZHkud2lkdGg7XG4gICAgY29uc3QgX2ggPSBwYXJ0aWNsZS5ib2R5LmhlaWdodDtcblxuICAgIGNvbnN0IF93aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChwYXJ0aWNsZS5ib2R5LndpZHRoKTtcbiAgICBjb25zdCBfaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KHBhcnRpY2xlLmJvZHkuaGVpZ2h0KTtcblxuICAgIGNvbnN0IF9zY2FsZVggPSBwYXJ0aWNsZS5ib2R5LndpZHRoIC8gX3dpZHRoO1xuICAgIGNvbnN0IF9zY2FsZVkgPSBwYXJ0aWNsZS5ib2R5LmhlaWdodCAvIF9oZWlnaHQ7XG5cbiAgICBpZiAoIXRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdKVxuICAgICAgdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY10gPSBbXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpLFxuICAgICAgICB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpLFxuICAgICAgICB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpXG4gICAgICBdO1xuXG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMF07XG4gICAgcGFydGljbGUuZGF0YS52Y0J1ZmZlciA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzFdO1xuICAgIHBhcnRpY2xlLmRhdGEudGNCdWZmZXIgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVsyXTtcblxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS50Y0J1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKFxuICAgICAgdGhpcy5nbC5BUlJBWV9CVUZGRVIsXG4gICAgICBuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMCwgX3NjYWxlWCwgMC4wLCAwLjAsIF9zY2FsZVksIF9zY2FsZVksIF9zY2FsZVldKSxcbiAgICAgIHRoaXMuZ2wuU1RBVElDX0RSQVdcbiAgICApO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS52Y0J1ZmZlcik7XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKFxuICAgICAgdGhpcy5nbC5BUlJBWV9CVUZGRVIsXG4gICAgICBuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMCwgX3csIDAuMCwgMC4wLCBfaCwgX3csIF9oXSksXG4gICAgICB0aGlzLmdsLlNUQVRJQ19EUkFXXG4gICAgKTtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBwYXJ0aWNsZS5kYXRhLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgZGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIF93aWR0aCwgX2hlaWdodCk7XG5cbiAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgcGFydGljbGUuZGF0YS50ZXh0dXJlKTtcbiAgICB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcbiAgICB0aGlzLmdsLnRleFBhcmFtZXRlcmkodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy5nbC5MSU5FQVIpO1xuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCk7XG4gICAgdGhpcy5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLmdsLlRFWFRVUkVfMkQpO1xuXG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlTG9hZGVkID0gdHJ1ZTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVXaWR0aCA9IF93O1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZUhlaWdodCA9IF9oO1xuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7XG4gICAgLy8gdGhpcy5nbC5jbGVhckNvbG9yKDAsIDAsIDAsIDEpO1xuICAgIC8vIHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUIHwgdGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlTG9hZGVkID0gZmFsc2U7XG4gICAgcGFydGljbGUuZGF0YS50bWF0ID0gTWF0My5jcmVhdGUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRtYXRbOF0gPSAxO1xuICAgIHBhcnRpY2xlLmRhdGEuaW1hdCA9IE1hdDMuY3JlYXRlKCk7XG4gICAgcGFydGljbGUuZGF0YS5pbWF0WzhdID0gMTtcblxuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBJbWdVdGlsLmdldEltZ0Zyb21DYWNoZShwYXJ0aWNsZS5ib2R5LCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHRoaXMuY2lyY2xlQ2FudmFzVVJMLCB0aGlzLmFkZEltZzJCb2R5LCBwYXJ0aWNsZSk7XG4gICAgICBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlID0gcGFydGljbGUucmFkaXVzIC8gdGhpcy5jaXJjbGVDYW52YXNSYWRpdXM7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuICBhZGRJbWcyQm9keShpbWcsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmRlYWQpIHJldHVybjtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gaW1nO1xuICAgIHBhcnRpY2xlLmRhdGEuc3JjID0gaW1nLnNyYztcbiAgICBwYXJ0aWNsZS5kYXRhLmNhbnZhcyA9IEltZ1V0aWwuZ2V0Q2FudmFzRnJvbUNhY2hlKGltZyk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRTY2FsZSA9IDE7XG5cbiAgICB0aGlzLmRyYXdJbWcyQ2FudmFzKHBhcnRpY2xlKTtcbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuZGF0YS50ZXh0dXJlTG9hZGVkKSB7XG4gICAgICB0aGlzLnVwZGF0ZU1hdHJpeChwYXJ0aWNsZSk7XG5cbiAgICAgIHRoaXMuZ2wudW5pZm9ybTNmKHRoaXMuc3Byb2dyYW0uY29sb3IsIHBhcnRpY2xlLnJnYi5yIC8gMjU1LCBwYXJ0aWNsZS5yZ2IuZyAvIDI1NSwgcGFydGljbGUucmdiLmIgLyAyNTUpO1xuICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4M2Z2KHRoaXMuc3Byb2dyYW0udE1hdFVuaWZvcm0sIGZhbHNlLCB0aGlzLm1zdGFjay50b3AoKSk7XG5cbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS52Y0J1ZmZlcik7XG4gICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zcHJvZ3JhbS52cGEsIDIsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGUuZGF0YS50Y0J1ZmZlcik7XG4gICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zcHJvZ3JhbS50Y2EsIDIsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCBwYXJ0aWNsZS5kYXRhLnRleHR1cmUpO1xuICAgICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5zcHJvZ3JhbS5zYW1wbGVyVW5pZm9ybSwgMCk7XG4gICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0SUJ1ZmZlcik7XG5cbiAgICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKHRoaXMuZ2wuVFJJQU5HTEVTLCA2LCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JULCAwKTtcbiAgICAgIHRoaXMubXN0YWNrLnBvcCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fVxuXG4gIHVwZGF0ZU1hdHJpeChwYXJ0aWNsZSkge1xuICAgIGNvbnN0IG1vdmVPcmlnaW5NYXRyaXggPSBXZWJHTFV0aWwubWFrZVRyYW5zbGF0aW9uKFxuICAgICAgLXBhcnRpY2xlLmRhdGEudGV4dHVyZVdpZHRoIC8gMixcbiAgICAgIC1wYXJ0aWNsZS5kYXRhLnRleHR1cmVIZWlnaHQgLyAyXG4gICAgKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbk1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlVHJhbnNsYXRpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpO1xuXG4gICAgY29uc3QgYW5nZWwgPSBwYXJ0aWNsZS5yb3RhdGlvbiAqIE1hdGhVdGlsLlBJXzE4MDtcbiAgICBjb25zdCByb3RhdGlvbk1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlUm90YXRpb24oYW5nZWwpO1xuXG4gICAgY29uc3Qgc2NhbGUgPSBwYXJ0aWNsZS5zY2FsZSAqIHBhcnRpY2xlLmRhdGEub2xkU2NhbGU7XG4gICAgY29uc3Qgc2NhbGVNYXRyaXggPSBXZWJHTFV0aWwubWFrZVNjYWxlKHNjYWxlLCBzY2FsZSk7XG4gICAgbGV0IG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtb3ZlT3JpZ2luTWF0cml4LCBzY2FsZU1hdHJpeCk7XG5cbiAgICBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobWF0cml4LCByb3RhdGlvbk1hdHJpeCk7XG4gICAgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1hdHJpeCwgdHJhbnNsYXRpb25NYXRyaXgpO1xuXG4gICAgTWF0My5pbnZlcnNlKG1hdHJpeCwgcGFydGljbGUuZGF0YS5pbWF0KTtcbiAgICBtYXRyaXhbMl0gPSBwYXJ0aWNsZS5hbHBoYTtcblxuICAgIHRoaXMubXN0YWNrLnB1c2gobWF0cml4KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuZ2wgPSBudWxsO1xuICAgIHRoaXMubXN0YWNrID0gbnVsbDtcbiAgICB0aGlzLnVtYXQgPSBudWxsO1xuICAgIHRoaXMuc21hdCA9IG51bGw7XG4gICAgdGhpcy50ZXh0dXJlYnVmZmVycyA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGN1c3RvbSByZW5kZXJlciB0aGF0IGV4dGVuZHMgdGhlIEJhc2VSZW5kZXJlci5cbiAqIEBleHRlbmRzIEJhc2VSZW5kZXJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21SZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IEN1c3RvbVJlbmRlcmVyIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gVGhlIEhUTUwgZWxlbWVudCB0byByZW5kZXIgdG8uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgcmVuZGVyZXIuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcIkN1c3RvbVJlbmRlcmVyXCI7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaW5lIHpvbmUgZm9yIHBhcnRpY2xlIHN5c3RlbXMuXG4gKiBAZXh0ZW5kcyBab25lXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVab25lIGV4dGVuZHMgWm9uZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IExpbmVab25lLlxuICAgKiBAcGFyYW0ge251bWJlcn0geDEgLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBmaXJzdCBwb2ludC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkxIC0gVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgZmlyc3QgcG9pbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeDJdIC0gVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgc2Vjb25kIHBvaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3kyXSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHNlY29uZCBwb2ludC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtkaXJlY3Rpb249XCI+XCJdIC0gVGhlIGRpcmVjdGlvbiBvZiB0aGUgbGluZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHgxLCB5MSwgeDIsIHkyLCBkaXJlY3Rpb24gPSBcIj5cIikge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoeDIgLSB4MSA+PSAwKSB7XG4gICAgICB0aGlzLngxID0geDE7XG4gICAgICB0aGlzLnkxID0geTE7XG4gICAgICB0aGlzLngyID0geDI7XG4gICAgICB0aGlzLnkyID0geTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueDEgPSB4MjtcbiAgICAgIHRoaXMueTEgPSB5MjtcbiAgICAgIHRoaXMueDIgPSB4MTtcbiAgICAgIHRoaXMueTIgPSB5MTtcbiAgICB9XG5cbiAgICB0aGlzLmR4ID0gdGhpcy54MiAtIHRoaXMueDE7XG4gICAgdGhpcy5keSA9IHRoaXMueTIgLSB0aGlzLnkxO1xuXG4gICAgdGhpcy5taW54ID0gTWF0aC5taW4odGhpcy54MSwgdGhpcy54Mik7XG4gICAgdGhpcy5taW55ID0gTWF0aC5taW4odGhpcy55MSwgdGhpcy55Mik7XG4gICAgdGhpcy5tYXh4ID0gTWF0aC5tYXgodGhpcy54MSwgdGhpcy54Mik7XG4gICAgdGhpcy5tYXh5ID0gTWF0aC5tYXgodGhpcy55MSwgdGhpcy55Mik7XG5cbiAgICB0aGlzLmRvdCA9IHRoaXMueDIgKiB0aGlzLnkxIC0gdGhpcy54MSAqIHRoaXMueTI7XG4gICAgdGhpcy54eHl5ID0gdGhpcy5keCAqIHRoaXMuZHggKyB0aGlzLmR5ICogdGhpcy5keTtcblxuICAgIHRoaXMuZ3JhZGllbnQgPSB0aGlzLmdldEdyYWRpZW50KCk7XG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLmdldExlbmd0aCgpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gVXRpbC5pbml0VmFsdWUoZGlyZWN0aW9uLCBcIj5cIik7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHJhbmRvbSBwb3NpdGlvbiBvbiB0aGUgbGluZS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHJhbmRvbSBwb3NpdGlvbi5cbiAgICovXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMucmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLmNvcyh0aGlzLmdyYWRpZW50KTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55MSArIHRoaXMucmFuZG9tICogdGhpcy5sZW5ndGggKiBNYXRoLnNpbih0aGlzLmdyYWRpZW50KTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoaWNoIHNpZGUgb2YgdGhlIGxpbmUgYSBwb2ludCBpcyBvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBvaW50IGlzIG9uIHRoZSBwb3NpdGl2ZSBzaWRlIG9mIHRoZSBsaW5lLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBnZXREaXJlY3Rpb24oeCwgeSkge1xuICAgIGNvbnN0IEEgPSB0aGlzLmR5O1xuICAgIGNvbnN0IEIgPSAtdGhpcy5keDtcbiAgICBjb25zdCBDID0gdGhpcy5kb3Q7XG4gICAgY29uc3QgRCA9IEIgPT09IDAgPyAxIDogQjtcblxuICAgIGlmICgoQSAqIHggKyBCICogeSArIEMpICogRCA+IDApIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIG9mIGEgcG9pbnQgZnJvbSB0aGUgbGluZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGRpc3RhbmNlIGZyb20gdGhlIHBvaW50IHRvIHRoZSBsaW5lLlxuICAgKi9cbiAgZ2V0RGlzdGFuY2UoeCwgeSkge1xuICAgIGNvbnN0IEEgPSB0aGlzLmR5O1xuICAgIGNvbnN0IEIgPSAtdGhpcy5keDtcbiAgICBjb25zdCBDID0gdGhpcy5kb3Q7XG4gICAgY29uc3QgRCA9IEEgKiB4ICsgQiAqIHkgKyBDO1xuXG4gICAgcmV0dXJuIEQgLyBNYXRoLnNxcnQodGhpcy54eHl5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzeW1tZXRyaWMgdmVjdG9yIG9mIGEgZ2l2ZW4gdmVjdG9yIHdpdGggcmVzcGVjdCB0byB0aGUgbGluZS5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSB2ZWN0b3IgdG8gcmVmbGVjdC5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGUgcmVmbGVjdGVkIHZlY3Rvci5cbiAgICovXG4gIGdldFN5bW1ldHJpYyh2KSB7XG4gICAgY29uc3QgdGhhMiA9IHYuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGExID0gdGhpcy5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYSA9IDIgKiAodGhhMSAtIHRoYTIpO1xuXG4gICAgY29uc3Qgb2xkeCA9IHYueDtcbiAgICBjb25zdCBvbGR5ID0gdi55O1xuXG4gICAgdi54ID0gb2xkeCAqIE1hdGguY29zKHRoYSkgLSBvbGR5ICogTWF0aC5zaW4odGhhKTtcbiAgICB2LnkgPSBvbGR4ICogTWF0aC5zaW4odGhhKSArIG9sZHkgKiBNYXRoLmNvcyh0aGEpO1xuXG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZ3JhZGllbnQgKGFuZ2xlKSBvZiB0aGUgbGluZS5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGdyYWRpZW50IG9mIHRoZSBsaW5lIGluIHJhZGlhbnMuXG4gICAqL1xuICBnZXRHcmFkaWVudCgpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLmR5LCB0aGlzLmR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBwYXJ0aWNsZSBpcyBvdXRzaWRlIHRoZSByYW5nZSBvZiB0aGUgbGluZS5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXJ0aWNsZSBpcyB3aXRoaW4gcmFuZ2UsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIHJhbmdlT3V0KHBhcnRpY2xlKSB7XG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmFicyh0aGlzLmdldEdyYWRpZW50KCkpO1xuXG4gICAgaWYgKGFuZ2xlIDw9IE1hdGhVdGlsLlBJIC8gNCkge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCA8PSB0aGlzLm1heHggJiYgcGFydGljbGUucC54ID49IHRoaXMubWlueCkgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgPD0gdGhpcy5tYXh5ICYmIHBhcnRpY2xlLnAueSA+PSB0aGlzLm1pbnkpIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsZW5ndGggb2YgdGhlIGxpbmUuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBsZW5ndGggb2YgdGhlIGxpbmUuXG4gICAqL1xuICBnZXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmR4ICogdGhpcy5keCArIHRoaXMuZHkgKiB0aGlzLmR5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBhcnRpY2xlIGNyb3NzaW5nIGJlaGF2aW9yIGJhc2VkIG9uIHRoZSBjcm9zc1R5cGUuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGNoZWNrIGZvciBjcm9zc2luZy5cbiAgICovXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcIj5cIiB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gXCJSXCIgfHwgdGhpcy5kaXJlY3Rpb24gPT09IFwicmlnaHRcIiB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gXCJkb3duXCIpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJhbmdlT3V0KHBhcnRpY2xlKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5nZXREaXJlY3Rpb24ocGFydGljbGUucC54LCBwYXJ0aWNsZS5wLnkpKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5yYW5nZU91dChwYXJ0aWNsZSkpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLmdldERpcmVjdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKCF0aGlzLnJhbmdlT3V0KHBhcnRpY2xlKSkgcmV0dXJuO1xuXG4gICAgICBpZiAodGhpcy5nZXREaXN0YW5jZShwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSkgPD0gcGFydGljbGUucmFkaXVzKSB7XG4gICAgICAgIGlmICh0aGlzLmR4ID09PSAwKSB7XG4gICAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHkgPT09IDApIHtcbiAgICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5nZXRTeW1tZXRyaWMocGFydGljbGUudik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImNyb3NzXCIpIHtcbiAgICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb3JyeSwgTGluZVpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcyBtZXRob2QhXCIpO1xuICAgICAgICB0aGlzLmFsZXJ0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY2lyY3VsYXIgem9uZSBpbiBhIDJEIHNwYWNlLlxuICogQGV4dGVuZHMgWm9uZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVab25lIGV4dGVuZHMgWm9uZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IENpcmNsZVpvbmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgY2lyY2xlJ3MgY2VudGVyLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIGNpcmNsZSdzIGNlbnRlci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtyYWRpdXNdIC0gVGhlIHJhZGl1cyBvZiB0aGUgY2lyY2xlLlxuICAgKi9cbiAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICB0aGlzLmNlbnRlciA9IHsgeCwgeSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSByYW5kb20gcG9zaXRpb24gd2l0aGluIHRoZSBjaXJjbGUuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIHggYW5kIHkgY29vcmRpbmF0ZXMuXG4gICAqL1xuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEl4MiAqIE1hdGgucmFuZG9tKCk7XG4gICAgdGhpcy5yYW5kb21SYWRpdXMgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5yYWRpdXM7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIHRoaXMucmFuZG9tUmFkaXVzICogTWF0aC5jb3ModGhpcy5hbmdsZSk7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueSArIHRoaXMucmFuZG9tUmFkaXVzICogTWF0aC5zaW4odGhpcy5hbmdsZSk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIG5ldyB4LWNvb3JkaW5hdGUgb2YgdGhlIGNlbnRlci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgbmV3IHktY29vcmRpbmF0ZSBvZiB0aGUgY2VudGVyLlxuICAgKi9cbiAgc2V0Q2VudGVyKHgsIHkpIHtcbiAgICB0aGlzLmNlbnRlci54ID0geDtcbiAgICB0aGlzLmNlbnRlci55ID0geTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBhcnRpY2xlIGNyb3NzaW5nIGJlaGF2aW9yLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gY2hlY2sgZm9yIGNyb3NzaW5nLlxuICAgKi9cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBjb25zdCBkID0gcGFydGljbGUucC5kaXN0YW5jZVRvKHRoaXMuY2VudGVyKTtcblxuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIGlmIChkIC0gcGFydGljbGUucmFkaXVzID4gdGhpcy5yYWRpdXMpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKGQgKyBwYXJ0aWNsZS5yYWRpdXMgPj0gdGhpcy5yYWRpdXMpIHRoaXMuZ2V0U3ltbWV0cmljKHBhcnRpY2xlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImNyb3NzXCIpIHtcbiAgICAgIGlmICh0aGlzLmFsZXJ0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb3JyeSwgQ2lyY2xlWm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzIG1ldGhvZCFcIik7XG4gICAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3ltbWV0cmljIHBvc2l0aW9uIG9mIGEgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjYWxjdWxhdGUgc3ltbWV0cnkgZm9yLlxuICAgKi9cbiAgZ2V0U3ltbWV0cmljKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdGhhMiA9IHBhcnRpY2xlLnYuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGExID0gdGhpcy5nZXRHcmFkaWVudChwYXJ0aWNsZSk7XG5cbiAgICBjb25zdCB0aGEgPSAyICogKHRoYTEgLSB0aGEyKTtcbiAgICBjb25zdCBvbGR4ID0gcGFydGljbGUudi54O1xuICAgIGNvbnN0IG9sZHkgPSBwYXJ0aWNsZS52Lnk7XG5cbiAgICBwYXJ0aWNsZS52LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHBhcnRpY2xlLnYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZ3JhZGllbnQgZm9yIGEgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjYWxjdWxhdGUgdGhlIGdyYWRpZW50IGZvci5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGNhbGN1bGF0ZWQgZ3JhZGllbnQuXG4gICAqL1xuICBnZXRHcmFkaWVudChwYXJ0aWNsZSkge1xuICAgIHJldHVybiAtTWF0aFV0aWwuUElfMiArIE1hdGguYXRhbjIocGFydGljbGUucC55IC0gdGhpcy5jZW50ZXIueSwgcGFydGljbGUucC54IC0gdGhpcy5jZW50ZXIueCk7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmVjdGFuZ3VsYXIgem9uZSBmb3IgcGFydGljbGUgc3lzdGVtcy5cbiAqIEBleHRlbmRzIFpvbmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUmVjdFpvbmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbd2lkdGhdIC0gVGhlIHdpZHRoIG9mIHRoZSByZWN0YW5nbGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbaGVpZ2h0XSAtIFRoZSBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoID0gMjAwLCBoZWlnaHQgPSAyMDApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgcmFuZG9tIHBvc2l0aW9uIHdpdGhpbiB0aGUgcmVjdGFuZ3VsYXIgem9uZS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHJhbmRvbSBwb3NpdGlvbi5cbiAgICovXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLnggKyBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aDtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55ICsgTWF0aC5yYW5kb20oKSAqIHRoaXMuaGVpZ2h0O1xuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBhcnRpY2xlIGNyb3NzaW5nIGJlaGF2aW9yIGJhc2VkIG9uIHRoZSBjcm9zc1R5cGUuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGNoZWNrIGZvciBjcm9zc2luZy5cbiAgICovXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgLy8gcGFydGljbGUgZGVhZCB6b25lXG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcblxuICAgICAgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICBlbHNlIGlmIChwYXJ0aWNsZS5wLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmhlaWdodCkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gcGFydGljbGUgYm91bmQgem9uZVxuICAgIGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggLSBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLngpIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54ICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueCArIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueCArIHRoaXMud2lkdGgpIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54ICsgdGhpcy53aWR0aCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi54ICo9IC0xO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFydGljbGUucC55IC0gcGFydGljbGUucmFkaXVzIDwgdGhpcy55KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmhlaWdodCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgICAgcGFydGljbGUudi55ICo9IC0xO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhcnRpY2xlIGNyb3NzIHpvbmVcbiAgICBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJjcm9zc1wiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy54ICYmIHBhcnRpY2xlLnYueCA8PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueCA9IHRoaXMueCArIHRoaXMud2lkdGggKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueCArIHRoaXMud2lkdGggJiYgcGFydGljbGUudi54ID49IDApIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy55ICYmIHBhcnRpY2xlLnYueSA8PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0ICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmhlaWdodCAmJiBwYXJ0aWNsZS52LnkgPj0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnkgPSB0aGlzLnkgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB6b25lIGJhc2VkIG9uIGltYWdlIGRhdGEuXG4gKiBAZXh0ZW5kcyBab25lXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlWm9uZSBleHRlbmRzIFpvbmUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBJbWFnZVpvbmUuXG4gICAqIEBwYXJhbSB7SW1hZ2VEYXRhfSBpbWFnZURhdGEgLSBUaGUgaW1hZ2UgZGF0YSB0byB1c2UgZm9yIHRoZSB6b25lLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3g9MF0gLSBUaGUgeC1jb29yZGluYXRlIG9mZnNldC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt5PTBdIC0gVGhlIHktY29vcmRpbmF0ZSBvZmZzZXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZD0yXSAtIFRoZSBzYW1wbGluZyBkZW5zaXR5LlxuICAgKi9cbiAgY29uc3RydWN0b3IoaW1hZ2VEYXRhLCB4LCB5LCBkKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlc2V0KGltYWdlRGF0YSwgeCwgeSwgZCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBJbWFnZVpvbmUgd2l0aCBuZXcgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtJbWFnZURhdGF9IGltYWdlRGF0YSAtIFRoZSBpbWFnZSBkYXRhIHRvIHVzZSBmb3IgdGhlIHpvbmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSAtIFRoZSB4LWNvb3JkaW5hdGUgb2Zmc2V0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gLSBUaGUgeS1jb29yZGluYXRlIG9mZnNldC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtkPTJdIC0gVGhlIHNhbXBsaW5nIGRlbnNpdHkuXG4gICAqL1xuICByZXNldChpbWFnZURhdGEsIHgsIHksIGQpIHtcbiAgICB0aGlzLmltYWdlRGF0YSA9IGltYWdlRGF0YTtcbiAgICB0aGlzLnggPSBVdGlsLmluaXRWYWx1ZSh4LCAwKTtcbiAgICB0aGlzLnkgPSBVdGlsLmluaXRWYWx1ZSh5LCAwKTtcbiAgICB0aGlzLmQgPSBVdGlsLmluaXRWYWx1ZShkLCAyKTtcblxuICAgIHRoaXMudmVjdG9ycyA9IFtdO1xuICAgIHRoaXMuc2V0VmVjdG9ycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdXAgdmVjdG9ycyBiYXNlZCBvbiB0aGUgaW1hZ2UgZGF0YS5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIHZlY3RvciBvYmplY3QuXG4gICAqL1xuICBzZXRWZWN0b3JzKCkge1xuICAgIGxldCBpLCBqO1xuICAgIGNvbnN0IGxlbmd0aDEgPSB0aGlzLmltYWdlRGF0YS53aWR0aDtcbiAgICBjb25zdCBsZW5ndGgyID0gdGhpcy5pbWFnZURhdGEuaGVpZ2h0O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDE7IGkgKz0gdGhpcy5kKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbGVuZ3RoMjsgaiArPSB0aGlzLmQpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gKChqID4+IDApICogbGVuZ3RoMSArIChpID4+IDApKSAqIDQ7XG5cbiAgICAgICAgaWYgKHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXSA+IDApIHtcbiAgICAgICAgICB0aGlzLnZlY3RvcnMucHVzaCh7IHg6IGkgKyB0aGlzLngsIHk6IGogKyB0aGlzLnkgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgcG9pbnQgaXMgd2l0aGluIHRoZSBib3VuZHMgb2YgdGhlIGltYWdlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWNvb3JkaW5hdGUgdG8gY2hlY2suXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHktY29vcmRpbmF0ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBvaW50IGlzIHdpdGhpbiBib3VuZHMsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIGdldEJvdW5kKHgsIHkpIHtcbiAgICBjb25zdCBpbmRleCA9ICgoeSA+PiAwKSAqIHRoaXMuaW1hZ2VEYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcbiAgICByZXR1cm4gdGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgcmFuZG9tIHBvc2l0aW9uIHdpdGhpbiB0aGUgaW1hZ2Ugem9uZS5cbiAgICogQHJldHVybnMge09iamVjdH0gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBwb3NpdGlvbi5cbiAgICovXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIGNvbnN0IHZlY3RvciA9IFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLnZlY3RvcnMpO1xuICAgIHJldHVybiB0aGlzLnZlY3Rvci5jb3B5KHZlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY29sb3IgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aGUgaW1hZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHgtY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeS1jb29yZGluYXRlLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3QgY29udGFpbmluZyByLCBnLCBiLCBhbmQgYSB2YWx1ZXMuXG4gICAqL1xuICBnZXRDb2xvcih4LCB5KSB7XG4gICAgeCAtPSB0aGlzLng7XG4gICAgeSAtPSB0aGlzLnk7XG4gICAgY29uc3QgaSA9ICgoeSA+PiAwKSAqIHRoaXMuaW1hZ2VEYXRhLndpZHRoICsgKHggPj4gMCkpICogNDtcblxuICAgIHJldHVybiB7XG4gICAgICByOiB0aGlzLmltYWdlRGF0YS5kYXRhW2ldLFxuICAgICAgZzogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgMV0sXG4gICAgICBiOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAyXSxcbiAgICAgIGE6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDNdXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBhcnRpY2xlIGNyb3NzaW5nIGJlaGF2aW9yLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gY2hlY2sgZm9yIGNyb3NzaW5nLlxuICAgKi9cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBwYXJ0aWNsZS5kZWFkID0gdGhpcy5nZXRCb3VuZChwYXJ0aWNsZS5wLnggLSB0aGlzLngsIHBhcnRpY2xlLnAueSAtIHRoaXMueSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoIXRoaXMuZ2V0Qm91bmQocGFydGljbGUucC54IC0gdGhpcy54LCBwYXJ0aWNsZS5wLnkgLSB0aGlzLnkpKSBwYXJ0aWNsZS52Lm5lZ2F0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgSW1hZ2Vab25lIGFuZCBjbGVhbnMgdXAgcmVzb3VyY2VzLlxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBDaXJjbGVab25lIGZyb20gXCIuLi96b25lL0NpcmNsZVpvbmVcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4uL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgTGluZVpvbmUgZnJvbSBcIi4uL3pvbmUvTGluZVpvbmVcIjtcbmltcG9ydCBSZWN0Wm9uZSBmcm9tIFwiLi4vem9uZS9SZWN0Wm9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCBmdW5jKSB7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsICgpID0+IGZ1bmMoKSk7XG4gIH0sXG5cbiAgZ2V0U3R5bGUoY29sb3IgPSBcIiNmZjAwMDBcIikge1xuICAgIGNvbnN0IHJnYiA9IENvbG9yVXRpbC5oZXhUb1JnYihjb2xvcik7XG4gICAgcmV0dXJuIGByZ2JhKCR7cmdiLnJ9LCAke3JnYi5nfSwgJHtyZ2IuYn0sIDAuNSlgO1xuICB9LFxuXG4gIGRyYXdab25lKHByb3RvbiwgY2FudmFzLCB6b25lLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBpZiAoem9uZSBpbnN0YW5jZW9mIFBvaW50Wm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmFyYyh6b25lLngsIHpvbmUueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBMaW5lWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKHpvbmUueDEsIHpvbmUueTEpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyh6b25lLngyLCB6b25lLnkyKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIFJlY3Rab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5kcmF3UmVjdCh6b25lLngsIHpvbmUueSwgem9uZS53aWR0aCwgem9uZS5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgQ2lyY2xlWm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuYXJjKHpvbmUueCwgem9uZS55LCB6b25lLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGRyYXdFbWl0dGVyKHByb3RvbiwgY2FudmFzLCBlbWl0dGVyLCBjbGVhcikge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHByb3RvbiwgKCkgPT4ge1xuICAgICAgaWYgKGNsZWFyKSBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcbiAgICAgIGNvbnRleHQuYXJjKGVtaXR0ZXIucC54LCBlbWl0dGVyLnAueSwgMTAsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9KTtcbiAgfVxufTtcbiJdLCJuYW1lcyI6WyJpcG90IiwibGVuZ3RoIiwibmhwb3QiLCJpIiwibWFrZVRyYW5zbGF0aW9uIiwidHgiLCJ0eSIsIm1ha2VSb3RhdGlvbiIsImFuZ2xlSW5SYWRpYW5zIiwiYyIsIk1hdGgiLCJjb3MiLCJzIiwic2luIiwibWFrZVNjYWxlIiwic3giLCJzeSIsIm1hdHJpeE11bHRpcGx5IiwiYSIsImIiLCJhMDAiLCJhMDEiLCJhMDIiLCJhMTAiLCJhMTEiLCJhMTIiLCJhMjAiLCJhMjEiLCJhMjIiLCJiMDAiLCJiMDEiLCJiMDIiLCJiMTAiLCJiMTEiLCJiMTIiLCJiMjAiLCJiMjEiLCJiMjIiLCJjcmVhdGVDYW52YXMiLCJpZCIsIndpZHRoIiwiaGVpZ2h0IiwicG9zaXRpb24iLCJkb20iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsIm9wYWNpdHkiLCJ0cmFuc2Zvcm0iLCJjcmVhdGVEaXYiLCJyZXNpemUiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiZGl2IiwieCIsInkiLCJzY2FsZSIsInJvdGF0ZSIsIndpbGxDaGFuZ2UiLCJjc3MzIiwidHJhbnNmb3JtM2QiLCJrZXkiLCJ2YWwiLCJia2V5IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJpbWdzQ2FjaGUiLCJjYW52YXNDYWNoZSIsImNhbnZhc0lkIiwiZ2V0SW1hZ2VEYXRhIiwiY29udGV4dCIsImltYWdlIiwicmVjdCIsImRyYXdJbWFnZSIsImltYWdlZGF0YSIsImNsZWFyUmVjdCIsImdldEltZ0Zyb21DYWNoZSIsImltZyIsImNhbGxiYWNrIiwicGFyYW0iLCJzcmMiLCJJbWFnZSIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJnZXRDYW52YXNGcm9tQ2FjaGUiLCJXZWJHTFV0aWwiLCJjYW52YXMiLCJEb21VdGlsIiwiZ2V0Q29udGV4dCIsImluaXRWYWx1ZSIsInZhbHVlIiwiZGVmYXVsdHMiLCJ1bmRlZmluZWQiLCJpc0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiZW1wdHlBcnJheSIsImFyciIsInRvQXJyYXkiLCJzbGljZUFycmF5IiwiYXJyMSIsImluZGV4IiwiYXJyMiIsInB1c2giLCJnZXRSYW5kRnJvbUFycmF5IiwiZmxvb3IiLCJyYW5kb20iLCJlbXB0eU9iamVjdCIsIm9iaiIsImlnbm9yZSIsImluZGV4T2YiLCJjbGFzc0FwcGx5IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiRmFjdG9yeUZ1bmMiLCJiaW5kIiwiYXBwbHkiLCJjb25jYXQiLCJJbWdVdGlsIiwiZGVzdHJveUFsbCIsImRlc3Ryb3kiLCJhc3NpZ24iLCJzb3VyY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImlkc01hcCIsIlB1aWQiLCJfaW5kZXgiLCJfY2FjaGUiLCJ0eXBlIiwiZ2V0SWQiLCJ1aWQiLCJnZXRJZEZyb21DYWNoZSIsImlzQm9keSIsImlzSW5uZXIiLCJnZXRUYXJnZXQiLCJQb29sIiwibnVtIiwidG90YWwiLCJjYWNoZSIsIl9wcm90byIsImdldCIsInBhcmFtcyIsInAiLCJfX3B1aWQiLCJwb3AiLCJjcmVhdGVPckNsb25lIiwiZXhwaXJlIiwiZ2V0Q2FjaGUiLCJjcmVhdGUiLCJVdGlsIiwiY2xvbmUiLCJnZXRDb3VudCIsImNvdW50IiwiU3RhdHMiLCJwcm90b24iLCJjb250YWluZXIiLCJlbWl0dGVySW5kZXgiLCJyZW5kZXJlckluZGV4IiwidXBkYXRlIiwiYm9keSIsImFkZCIsImVtaXR0ZXIiLCJnZXRFbWl0dGVyIiwicmVuZGVyZXIiLCJnZXRSZW5kZXJlciIsInN0ciIsImVtaXR0ZXJzIiwiZW1pdFNwZWVkIiwiZ2V0RW1pdHRlclBvcyIsImluaXRpYWxpemVzIiwiY29uY2F0QXJyIiwiYmVoYXZpb3VycyIsIm5hbWUiLCJnZXRDcmVhdGVkTnVtYmVyIiwicG9vbCIsImlubmVySFRNTCIsIl90aGlzIiwiY3NzVGV4dCIsImpvaW4iLCJhZGRFdmVudExpc3RlbmVyIiwiYmciLCJjb2xvciIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsInJlbmRlcmVycyIsInJlc3VsdCIsImNwb29sIiwicm91bmQiLCJyZW1vdmVDaGlsZCIsIkV2ZW50RGlzcGF0Y2hlciIsIl9saXN0ZW5lcnMiLCJkaXNwYXRjaEV2ZW50IiwiaGFzRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBbGxFdmVudExpc3RlbmVycyIsImxpc3RlbmVyIiwic3BsaWNlIiwibGlzdGVuZXJzIiwiaGFuZGxlciIsIlBJIiwiSU5GSU5JVFkiLCJJbmZpbml0eSIsIk1hdGhVdGlsIiwiUEl4MiIsIlBJXzIiLCJQSV8xODAiLCJOMTgwX1BJIiwiaXNJbmZpbml0eSIsInJhbmRvbUFUb0IiLCJpc0ludCIsInJhbmRvbUZsb2F0aW5nIiwiY2VudGVyIiwiZiIsInJhbmRvbUNvbG9yIiwic2xpY2UiLCJyYW5kb21ab25lIiwiZGlzcGxheSIsImsiLCJkaWdpdHMiLCJwb3ciLCJkZWdyZWVUcmFuc2Zvcm0iLCJ0b0NvbG9yMTYiLCJJbnRlZ3JhdGlvbiIsImNhbGN1bGF0ZSIsInBhcnRpY2xlcyIsInRpbWUiLCJkYW1waW5nIiwiZXVsZXJJbnRlZ3JhdGUiLCJwYXJ0aWNsZSIsInNsZWVwIiwib2xkIiwiY29weSIsInYiLCJtdWx0aXBseVNjYWxhciIsIm1hc3MiLCJjbGVhciIsIlByb3RvbiIsImludGVncmF0aW9uVHlwZSIsIm5vdyIsInRoZW4iLCJlbGFwc2VkIiwic3RhdHMiLCJFVUxFUiIsImludGVncmF0b3IiLCJfZnBzIiwiX2ludGVydmFsIiwiREVGQVVMVF9JTlRFUlZBTCIsImFkZFJlbmRlcmVyIiwicmVuZGVyIiwiaW5pdCIsInJlbW92ZVJlbmRlcmVyIiwicmVtb3ZlIiwiYWRkRW1pdHRlciIsInBhcmVudCIsIkVNSVRURVJfQURERUQiLCJyZW1vdmVFbWl0dGVyIiwiRU1JVFRFUl9SRU1PVkVEIiwiUFJPVE9OX1VQREFURSIsIlVTRV9DTE9DSyIsIkRhdGUiLCJnZXRUaW1lIiwiYW1lbmRDaGFuZ2VUYWJzQnVnIiwiZW1pdHRlcnNVcGRhdGUiLCJQUk9UT05fVVBEQVRFX0FGVEVSIiwiZ2V0QWxsUGFydGljbGVzIiwiZGVzdHJveUFsbEVtaXR0ZXJzIiwiZGVzdHJveU90aGVyIiwic2V0VGltZW91dCIsIl9jcmVhdGVDbGFzcyIsInNldCIsImZwcyIsIk1FQVNVUkUiLCJSSzIiLCJQQVJUSUNMRV9DUkVBVEVEIiwiUEFSVElDTEVfVVBEQVRFIiwiUEFSVElDTEVfU0xFRVAiLCJQQVJUSUNMRV9ERUFEIiwiUmdiIiwiciIsImciLCJyZXNldCIsIlNwYW4iLCJnZXRWYWx1ZSIsInNldFNwYW5WYWx1ZSIsImdldFNwYW5WYWx1ZSIsInBhbiIsImhhc1Byb3AiLCJzZXRQcm9wIiwicHJvcHMiLCJwcm9wIiwic2V0VmVjdG9yVmFsIiwiY29uZiIsImVhc2VMaW5lYXIiLCJlYXNlSW5RdWFkIiwiZWFzZU91dFF1YWQiLCJlYXNlSW5PdXRRdWFkIiwiZWFzZUluQ3ViaWMiLCJlYXNlT3V0Q3ViaWMiLCJlYXNlSW5PdXRDdWJpYyIsImVhc2VJblF1YXJ0IiwiZWFzZU91dFF1YXJ0IiwiZWFzZUluT3V0UXVhcnQiLCJlYXNlSW5TaW5lIiwiZWFzZU91dFNpbmUiLCJlYXNlSW5PdXRTaW5lIiwiZWFzZUluRXhwbyIsImVhc2VPdXRFeHBvIiwiZWFzZUluT3V0RXhwbyIsImVhc2VJbkNpcmMiLCJzcXJ0IiwiZWFzZU91dENpcmMiLCJlYXNlSW5PdXRDaXJjIiwiZWFzZUluQmFjayIsImVhc2VPdXRCYWNrIiwiZWFzZUluT3V0QmFjayIsImdldEVhc2luZyIsImVhc2UiLCJWZWN0b3IyRCIsInNldFgiLCJzZXRZIiwiZ2V0R3JhZGllbnQiLCJhdGFuMiIsInciLCJhZGRWZWN0b3JzIiwiYWRkWFkiLCJzdWIiLCJzdWJWZWN0b3JzIiwiZGl2aWRlU2NhbGFyIiwibmVnYXRlIiwiZG90IiwibGVuZ3RoU3EiLCJub3JtYWxpemUiLCJkaXN0YW5jZVRvIiwiZGlzdGFuY2VUb1NxdWFyZWQiLCJ0aGEiLCJkeCIsImR5IiwibGVycCIsImFscGhhIiwiZXF1YWxzIiwiUGFydGljbGUiLCJkYXRhIiwicmdiIiwiUHJvcFV0aWwiLCJnZXREaXJlY3Rpb24iLCJsaWZlIiwiYWdlIiwiZGVhZCIsInNwcml0ZSIsImVuZXJneSIsInJhZGl1cyIsInJvdGF0aW9uIiwiZWFzaW5nIiwicmVtb3ZlQWxsQmVoYXZpb3VycyIsImFwcGx5QmVoYXZpb3VycyIsIm1heCIsImFwcGx5QmVoYXZpb3VyIiwiYWRkQmVoYXZpb3VyIiwiYmVoYXZpb3VyIiwicGFyZW50cyIsImluaXRpYWxpemUiLCJhZGRCZWhhdmlvdXJzIiwicmVtb3ZlQmVoYXZpb3VyIiwiaGV4VG9SZ2IiLCJoIiwiaGV4MTYiLCJzdWJzdHJpbmciLCJwYXJzZUludCIsInJnYlRvSGV4IiwicmJnIiwiZ2V0SGV4MTZGcm9tUGFydGljbGUiLCJOdW1iZXIiLCJQb2xhcjJEIiwiYWJzIiwic2V0UiIsInNldFRoYSIsInRvVmVjdG9yIiwiZ2V0WCIsImdldFkiLCJNYXQzIiwibWF0MyIsIm1hdCIsIkZsb2F0MzJBcnJheSIsIm1hdDEiLCJtYXQyIiwibXVsdGlwbHkiLCJpbnZlcnNlIiwiZCIsIm11bHRpcGx5VmVjMiIsIm0iLCJ2ZWMiLCJBcnJheVNwYW4iLCJfU3BhbiIsIl9pbmhlcml0c0xvb3NlIiwiX2FyciIsImNyZWF0ZUFycmF5U3BhbiIsIlJlY3RhbmdsZSIsImJvdHRvbSIsInJpZ2h0IiwiY29udGFpbnMiLCJSYXRlIiwibnVtcGFuIiwidGltZXBhbiIsIm51bVBhbiIsInRpbWVQYW4iLCJzdGFydFRpbWUiLCJuZXh0VGltZSIsIkluaXRpYWxpemUiLCJMaWZlIiwiX0luaXRpYWxpemUiLCJsaWZlUGFuIiwiWm9uZSIsInZlY3RvciIsImNyb3NzVHlwZSIsImFsZXJ0IiwiZ2V0UG9zaXRpb24iLCJjcm9zc2luZyIsIlBvaW50Wm9uZSIsIl9ab25lIiwiY29uc29sZSIsImVycm9yIiwiUG9zaXRpb24iLCJ6b25lIiwiVmVsb2NpdHkiLCJycGFuIiwidGhhcGFuIiwiclBhbiIsInRoYVBhbiIsIm5vcm1hbGl6ZVZlbG9jaXR5IiwidnIiLCJwb2xhcjJkIiwiTWFzcyIsIm1hc3NQYW4iLCJSYWRpdXMiLCJvbGRSYWRpdXMiLCJCb2R5IiwiaW1hZ2VUYXJnZXQiLCJpbm5lciIsIkJlaGF2aW91ciIsIm5vcm1hbGl6ZUZvcmNlIiwiZm9yY2UiLCJub3JtYWxpemVWYWx1ZSIsIkZvcmNlIiwiX0JlaGF2aW91ciIsImZ4IiwiZnkiLCJBdHRyYWN0aW9uIiwidGFyZ2V0UG9zaXRpb24iLCJyYWRpdXNTcSIsImF0dHJhY3Rpb25Gb3JjZSIsIlJhbmRvbURyaWZ0IiwiZHJpZnRYIiwiZHJpZnRZIiwiZGVsYXkiLCJwYW5Gb2NlIiwiR3Jhdml0eSIsIl9Gb3JjZSIsIkNvbGxpc2lvbiIsIm5ld1Bvb2wiLCJjb2xsaXNpb25Qb29sIiwiZGVsdGEiLCJvdGhlclBhcnRpY2xlIiwib3ZlcmxhcCIsInRvdGFsTWFzcyIsImF2ZXJhZ2VNYXNzMSIsImF2ZXJhZ2VNYXNzMiIsImRpc3RhbmNlIiwiQ3Jvc3Nab25lIiwiQWxwaGEiLCJzYW1lIiwiYWxwaGFBIiwiYWxwaGFCIiwiU2NhbGUiLCJzY2FsZUEiLCJzY2FsZUIiLCJSb3RhdGUiLCJpbmZsdWVuY2UiLCJyb3RhdGlvbkEiLCJyb3RhdGlvbkIiLCJDb2xvciIsImNvbG9yQSIsIkNvbG9yVXRpbCIsImNvbG9yQiIsIkNIQU5HSU5HIiwiQ3ljbG9uZSIsImFuZ2xlIiwic2V0QW5nbGVBbmRGb3JjZSIsInNwYW4iLCJTdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImNhbmdsZSIsImN5Y2xvbmUiLCJncmFkaWVudCIsIlJlcHVsc2lvbiIsIl9BdHRyYWN0aW9uIiwiR3Jhdml0eVdlbGwiLCJjZW50ZXJQb2ludCIsImRpc3RhbmNlVmVjIiwiZGlzdGFuY2VTcSIsImZhY3RvciIsImJpbmRFbWl0dGVyIiwiRW1pdHRlciIsIl9QYXJ0aWNsZSIsImVtaXRUaW1lIiwidG90YWxUaW1lIiwicmF0ZSIsImVtaXQiLCJzdG9wZWQiLCJpc05hTiIsInN0b3AiLCJwcmVFbWl0Iiwib2xkU3RvcGVkIiwib2xkRW1pdFRpbWUiLCJvbGRUb3RhbFRpbWUiLCJzdGVwIiwicmVtb3ZlQWxsUGFydGljbGVzIiwiYWRkU2VsZkluaXRpYWxpemUiLCJhZGRJbml0aWFsaXplIiwiX2xlbiIsImFyZ3VtZW50cyIsInJlc3QiLCJBcnJheSIsIl9rZXkiLCJyZW1vdmVJbml0aWFsaXplIiwiaW5pdGlhbGl6ZXIiLCJyZW1vdmVBbGxJbml0aWFsaXplcnMiLCJfbGVuMiIsIl9rZXkyIiwiZW1pdHRpbmciLCJpbnRlZ3JhdGUiLCJkaXNwYXRjaCIsImV2ZW50IiwiYmluZEV2ZW50IiwiY3JlYXRlUGFydGljbGUiLCJzZXR1cFBhcnRpY2xlIiwiSW5pdGlhbGl6ZVV0aWwiLCJCZWhhdmlvdXJFbWl0dGVyIiwiX0VtaXR0ZXIiLCJzZWxmQmVoYXZpb3VycyIsImFkZFNlbGZCZWhhdmlvdXIiLCJyZW1vdmVTZWxmQmVoYXZpb3VyIiwiRm9sbG93RW1pdHRlciIsIm1vdXNlVGFyZ2V0Iiwid2luZG93IiwiX2FsbG93RW1pdHRpbmciLCJpbml0RXZlbnRIYW5kbGVyIiwiX3RoaXMyIiwibW91c2Vtb3ZlSGFuZGxlciIsIm1vdXNlbW92ZSIsIm1vdXNlZG93bkhhbmRsZXIiLCJtb3VzZWRvd24iLCJtb3VzZXVwSGFuZGxlciIsIm1vdXNldXAiLCJsYXllclgiLCJsYXllclkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImlzSW1hZ2UiLCJfX2lzSW1hZ2UiLCJ0YWdOYW1lIiwibm9kZU5hbWUiLCJpc1N0cmluZyIsIkJhc2VSZW5kZXJlciIsImVsZW1lbnQiLCJzdHJva2UiLCJjaXJjbGVDb25mIiwiaXNDaXJjbGUiLCJzZXRTdHJva2UiLCJ0aGlua25lc3MiLCJfcHJvdG9uVXBkYXRlSGFuZGxlciIsIm9uUHJvdG9uVXBkYXRlIiwiX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlciIsIm9uUHJvdG9uVXBkYXRlQWZ0ZXIiLCJfZW1pdHRlckFkZGVkSGFuZGxlciIsIm9uRW1pdHRlckFkZGVkIiwiX2VtaXR0ZXJSZW1vdmVkSGFuZGxlciIsIm9uRW1pdHRlclJlbW92ZWQiLCJfcGFydGljbGVDcmVhdGVkSGFuZGxlciIsIm9uUGFydGljbGVDcmVhdGVkIiwiX3BhcnRpY2xlVXBkYXRlSGFuZGxlciIsIm9uUGFydGljbGVVcGRhdGUiLCJfcGFydGljbGVEZWFkSGFuZGxlciIsIm9uUGFydGljbGVEZWFkIiwiQ2FudmFzUmVuZGVyZXIiLCJfQmFzZVJlbmRlcmVyIiwiYnVmZmVyQ2FjaGUiLCJhZGRJbWcyQm9keSIsIlR5cGVzIiwiZHJhd0NpcmNsZSIsImJ1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImJ1ZkNvbnRleHQiLCJnbG9iYWxBbHBoYSIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic2F2ZSIsInRyYW5zbGF0ZSIsInJlc3RvcmUiLCJiZWdpblBhdGgiLCJhcmMiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsImNsb3NlUGF0aCIsImZpbGwiLCJzaXplIiwiRG9tUmVuZGVyZXIiLCJjcmVhdGVCb2R5IiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsImJvZHlSZWFkeSIsImJhY2tncm91bmRDb2xvciIsImNyZWF0ZUNpcmNsZSIsImNyZWF0ZVNwcml0ZSIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJ1cmwiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJFYXNlbFJlbmRlcmVyIiwiYWRkQ2hpbGQiLCJzY2FsZVgiLCJzY2FsZVkiLCJncmFwaGljcyIsInJlZ1giLCJyZWdZIiwiY3JlYXRlanMiLCJHcmFwaGljcyIsImJlZ2luU3Ryb2tlIiwiYmVnaW5GaWxsIiwic2hhcGUiLCJTaGFwZSIsIlBpeGVsUmVuZGVyZXIiLCJyZWN0YW5nbGUiLCJpbWFnZURhdGEiLCJjcmVhdGVJbWFnZURhdGEiLCJwdXRJbWFnZURhdGEiLCJzZXRQaXhlbCIsIlBJWElDbGFzcyIsIlBpeGlSZW5kZXJlciIsInNldENvbG9yIiwiYmxlbmRNb2RlIiwic2V0UElYSSIsIlBJWEkiLCJTcHJpdGUiLCJjcmVhdGVGcm9tSW1hZ2UiLCJmcm9tIiwiZnJvbUltYWdlIiwidGludCIsImFuY2hvciIsImVuZEZpbGwiLCJNU3RhY2siLCJtYXRzIiwidG9wIiwiV2ViR0xSZW5kZXJlciIsImdsIiwiYW50aWFsaWFzIiwic3RlbmNpbCIsImRlcHRoIiwiaW5pdFZhciIsInNldE1heFJhZGl1cyIsImluaXRTaGFkZXJzIiwiaW5pdEJ1ZmZlcnMiLCJibGVuZEVxdWF0aW9uIiwiRlVOQ19BREQiLCJibGVuZEZ1bmMiLCJTUkNfQUxQSEEiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwiZW5hYmxlIiwiQkxFTkQiLCJ1bWF0Iiwic21hdCIsIm1zdGFjayIsInZpZXdwb3J0IiwiY2lyY2xlQ2FudmFzVVJMIiwiZ2V0VmVydGV4U2hhZGVyIiwidnNTb3VyY2UiLCJnZXRGcmFnbWVudFNoYWRlciIsImZzU291cmNlIiwidGV4dHVyZWJ1ZmZlcnMiLCJBIiwiQiIsImdldFNoYWRlciIsImZzIiwic2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJnZXRTaGFkZXJQYXJhbWV0ZXIiLCJDT01QSUxFX1NUQVRVUyIsImdldFNoYWRlckluZm9Mb2ciLCJmcmFnbWVudFNoYWRlciIsInZlcnRleFNoYWRlciIsInNwcm9ncmFtIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwidXNlUHJvZ3JhbSIsInZwYSIsImdldEF0dHJpYkxvY2F0aW9uIiwidGNhIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ0TWF0VW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInNhbXBsZXJVbmlmb3JtIiwidXNlVGV4IiwidW5pZm9ybTFpIiwidnMiLCJpZHgiLCJ1bml0SUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJVaW50MTZBcnJheSIsIlNUQVRJQ19EUkFXIiwiaWRzIiwidW5pdEkzMyIsInN0cmlwQnVmZmVyIiwicmFpZHVzIiwiY2lyY2xlQ2FudmFzUmFkaXVzIiwidG9EYXRhVVJMIiwiZHJhd0ltZzJDYW52YXMiLCJfdyIsIl9oIiwiX3dpZHRoIiwiX2hlaWdodCIsIl9zY2FsZVgiLCJfc2NhbGVZIiwiY3JlYXRlVGV4dHVyZSIsInRleHR1cmUiLCJ2Y0J1ZmZlciIsInRjQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwiYmluZFRleHR1cmUiLCJURVhUVVJFXzJEIiwidGV4SW1hZ2UyRCIsIlJHQkEiLCJVTlNJR05FRF9CWVRFIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUFHX0ZJTFRFUiIsIkxJTkVBUiIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIkxJTkVBUl9NSVBNQVBfTkVBUkVTVCIsImdlbmVyYXRlTWlwbWFwIiwidGV4dHVyZUxvYWRlZCIsInRleHR1cmVXaWR0aCIsInRleHR1cmVIZWlnaHQiLCJ0bWF0IiwiaW1hdCIsIm9sZFNjYWxlIiwidXBkYXRlTWF0cml4IiwidW5pZm9ybTNmIiwidW5pZm9ybU1hdHJpeDNmdiIsInZlcnRleEF0dHJpYlBvaW50ZXIiLCJGTE9BVCIsImRyYXdFbGVtZW50cyIsIlRSSUFOR0xFUyIsIlVOU0lHTkVEX1NIT1JUIiwibW92ZU9yaWdpbk1hdHJpeCIsInRyYW5zbGF0aW9uTWF0cml4IiwiYW5nZWwiLCJyb3RhdGlvbk1hdHJpeCIsInNjYWxlTWF0cml4IiwibWF0cml4IiwiQ3VzdG9tUmVuZGVyZXIiLCJMaW5lWm9uZSIsIngxIiwieTEiLCJ4MiIsInkyIiwiZGlyZWN0aW9uIiwibWlueCIsIm1pbiIsIm1pbnkiLCJtYXh4IiwibWF4eSIsInh4eXkiLCJnZXRMZW5ndGgiLCJDIiwiRCIsImdldERpc3RhbmNlIiwiZ2V0U3ltbWV0cmljIiwidGhhMiIsInRoYTEiLCJvbGR4Iiwib2xkeSIsInJhbmdlT3V0IiwiQ2lyY2xlWm9uZSIsInJhbmRvbVJhZGl1cyIsInNldENlbnRlciIsIlJlY3Rab25lIiwiSW1hZ2Vab25lIiwidmVjdG9ycyIsInNldFZlY3RvcnMiLCJqIiwibGVuZ3RoMSIsImxlbmd0aDIiLCJnZXRCb3VuZCIsImdldENvbG9yIiwiZnVuYyIsImdldFN0eWxlIiwiZHJhd1pvbmUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJkcmF3UmVjdCIsImRyYXdFbWl0dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZTtFQUNiO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7SUFDRUEsSUFBSSxFQUFBLFNBQUFBLElBQUNDLENBQUFBLE1BQU0sRUFBRTtFQUNYLElBQUEsT0FBTyxDQUFDQSxNQUFNLEdBQUlBLE1BQU0sR0FBRyxDQUFFLE1BQU0sQ0FBQyxDQUFBO0tBQ3JDO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtJQUNFQyxLQUFLLEVBQUEsU0FBQUEsS0FBQ0QsQ0FBQUEsTUFBTSxFQUFFO0VBQ1osSUFBQSxFQUFFQSxNQUFNLENBQUE7RUFDUixJQUFBLEtBQUssSUFBSUUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxLQUFLLENBQUMsRUFBRTtFQUMvQkYsTUFBQUEsTUFBTSxHQUFHQSxNQUFNLEdBQUlBLE1BQU0sSUFBSUUsQ0FBRSxDQUFBO0VBQ2pDLEtBQUE7TUFFQSxPQUFPRixNQUFNLEdBQUcsQ0FBQyxDQUFBO0tBQ2xCO0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRUcsRUFBQUEsZUFBZSxFQUFBQSxTQUFBQSxlQUFBQSxDQUFDQyxFQUFFLEVBQUVDLEVBQUUsRUFBRTtFQUN0QixJQUFBLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRUQsRUFBRSxFQUFFQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDckM7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0lBQ0VDLFlBQVksRUFBQSxTQUFBQSxZQUFDQyxDQUFBQSxjQUFjLEVBQUU7RUFDM0IsSUFBQSxJQUFJQyxDQUFDLEdBQUdDLElBQUksQ0FBQ0MsR0FBRyxDQUFDSCxjQUFjLENBQUMsQ0FBQTtFQUNoQyxJQUFBLElBQUlJLENBQUMsR0FBR0YsSUFBSSxDQUFDRyxHQUFHLENBQUNMLGNBQWMsQ0FBQyxDQUFBO0VBRWhDLElBQUEsT0FBTyxDQUFDQyxDQUFDLEVBQUUsQ0FBQ0csQ0FBQyxFQUFFLENBQUMsRUFBRUEsQ0FBQyxFQUFFSCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDcEM7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFSyxFQUFBQSxTQUFTLEVBQUFBLFNBQUFBLFNBQUFBLENBQUNDLEVBQUUsRUFBRUMsRUFBRSxFQUFFO0VBQ2hCLElBQUEsT0FBTyxDQUFDRCxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUVDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUNyQztFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0VDLEVBQUFBLGNBQWMsRUFBQUEsU0FBQUEsY0FBQUEsQ0FBQ0MsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFDbkIsSUFBSUMsR0FBRyxHQUFHRixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtNQUN0QixJQUFJRyxHQUFHLEdBQUdILENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO01BQ3RCLElBQUlJLEdBQUcsR0FBR0osQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7TUFDdEIsSUFBSUssR0FBRyxHQUFHTCxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtNQUN0QixJQUFJTSxHQUFHLEdBQUdOLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO01BQ3RCLElBQUlPLEdBQUcsR0FBR1AsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7TUFDdEIsSUFBSVEsR0FBRyxHQUFHUixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtNQUN0QixJQUFJUyxHQUFHLEdBQUdULENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO01BQ3RCLElBQUlVLEdBQUcsR0FBR1YsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7TUFDdEIsSUFBSVcsR0FBRyxHQUFHVixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtNQUN0QixJQUFJVyxHQUFHLEdBQUdYLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO01BQ3RCLElBQUlZLEdBQUcsR0FBR1osQ0FBQyxDQUFD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
