(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Proton = {}));
})(this, (function (exports) { 'use strict';

  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _inheritsLoose(t, o) {
    t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
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
      for (var id in this.cache) count += this.cache[id].length;
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
      while (i--) this.emitters[i].update(elapsed);
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
      while (i--) total += this.emitters[i].particles.length;
      return total;
    };
    _proto.getAllParticles = function getAllParticles() {
      var particles = [];
      var i = this.emitters.length;
      while (i--) particles = particles.concat(this.emitters[i].particles);
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
    return _createClass(Proton, [{
      key: "fps",
      get: function get() {
        return this._fps;
      },
      set: function set(fps) {
        this._fps = fps;
        this._interval = fps === "auto" ? Proton.DEFAULT_INTERVAL : MathUtil.floor(1 / fps, 7);
      }
    }]);
  }();
  Proton.USE_CLOCK = false;
  // measure 1:100
  Proton.MEASURE = 100;
  Proton.EULER = "euler";
  Proton.RK2 = "runge-kutta2";
  // event name
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
     * Creates a new Span instance.
     * @param {number|number[]} a - The first value or an array of values.
     * @param {number} [b] - The second value (if a is not an array).
     * @param {boolean} [center=false] - Whether to use center-based calculation.
     */
    function Span(a, b, center) {
      /**
       * @type {boolean}
       * @private
       */
      this.isArray = void 0;
      /**
       * @type {number|number[]}
       * @private
       */
      this.a = void 0;
      /**
       * @type {number}
       * @private
       */
      this.b = void 0;
      /**
       * @type {boolean}
       * @private
       */
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
    /**
     * Creates a new Vector2D instance.
     * @param {number} [x=0] - The x coordinate.
     * @param {number} [y=0] - The y coordinate.
     */
    function Vector2D(x, y) {
      /** @type {number} */
      this.x = void 0;
      /** @type {number} */
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
    /**
     * Creates a new Particle instance.
     * @param {Object} [conf] Configuration object for the particle
     */
    function Particle(conf) {
      /** @type {string} The unique identifier of the particle */
      this.id = "";
      /** @type {{p:Vector2D,v:Vector2D,a:Vector2D}} Old state of the particle */
      this.old = null;
      /** @type {object} Custom data associated with the particle */
      this.data = null;
      /** @type {Behaviour[]} Array of behaviours applied to the particle */
      this.behaviours = null;
      /** @type {Vector2D} Current position of the particle */
      this.p = null;
      /** @type {Vector2D} Current velocity of the particle */
      this.v = null;
      /** @type {Vector2D} Current acceleration of the particle */
      this.a = null;
      /** @type {Rgb} Color of the particle */
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
      for (var i = 0; i < 9; i++) mat2[i] = mat1[i];
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
    function ArraySpan(color) {
      var _this;
      _this = _Span.call(this) || this;
      _this._arr = Util.toArray(color);
      return _this;
    }
    _inheritsLoose(ArraySpan, _Span);
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
     * Creates a new Rate instance.
     * The number of particles per second emission (a [particle]/b [s]).
     * @param {Array|number|Span} [numpan=1] - The number of particles for each emission.
     * @param {Array|number|Span} [timepan=1] - The time interval between each emission.
     * @example
     * // Create a rate of 10-20 particles every 0.1-0.25 seconds
     * new Rate(new Span(10, 20), new Span(0.1, 0.25));
     */
    function Rate(numpan, timepan) {
      /**
       * @type {Span}
       * @private
       */
      this.numPan = void 0;
      /**
       * @type {Span}
       * @private
       */
      this.timePan = void 0;
      /**
       * @type {number}
       * @private
       */
      this.startTime = void 0;
      /**
       * @type {number}
       * @private
       */
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
    /**
     * Creates a new Life instance.
     * @param {number|Span} a - The lifetime value or the lower bound of the lifetime range.
     * @param {number} [b] - The upper bound of the lifetime range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    function Life(a, b, c) {
      var _this;
      _this = _Initialize.call(this) || this;
      /**
       * @type {Span}
       * @private
       */
      _this.lifePan = void 0;
      /**
       * @type {string}
       */
      _this.name = void 0;
      _this.lifePan = Span.setSpanValue(a, b, c);
      _this.name = "Life";
      return _this;
    }

    /**
     * Initializes the lifetime of a target particle.
     * @param {object} target - The target particle to initialize.
     */
    _inheritsLoose(Life, _Initialize);
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
    _inheritsLoose(PointZone, _Zone);
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
    /**
     * Creates a new Position instance.
     * @param {PointZone|any} [zone] - The zone to use for positioning. Defaults to a new PointZone if not provided.
     */
    function Position(zone) {
      var _this;
      _this = _Initialize.call(this) || this;
      /**
       * @type {PointZone|any}
       * @private
       */
      _this.zone = void 0;
      /**
       * @type {string}
       */
      _this.name = void 0;
      _this.zone = Util.initValue(zone, new PointZone());
      _this.name = "Position";
      return _this;
    }

    /**
     * Resets this initializer's parameters.
     * @param {PointZone|any} [zone] - The new zone to use for positioning. Defaults to a new PointZone if not provided.
     */
    _inheritsLoose(Position, _Initialize);
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
    /**
     * Creates a new Velocity instance.
     * @param {number|Span} [rpan] - The radial component of the velocity or its range.
     * @param {number|Span} [thapan] - The angular component of the velocity or its range.
     * @param {string} [type='vector'] - The type of velocity ('vector' or 'polar').
     */
    function Velocity(rpan, thapan, type) {
      var _this;
      _this = _Initialize.call(this) || this;
      /**
       * @type {Span}
       * @private
       */
      _this.rPan = void 0;
      /**
       * @type {Span}
       * @private
       */
      _this.thaPan = void 0;
      /**
       * @type {string}
       */
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
    _inheritsLoose(Velocity, _Initialize);
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
    /**
     * Creates a new Mass instance.
     * @param {number|Span} a - The mass value or the lower bound of the mass range.
     * @param {number} [b] - The upper bound of the mass range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    function Mass(a, b, c) {
      var _this;
      _this = _Initialize.call(this) || this;
      /**
       * @type {Span}
       * @private
       */
      _this.massPan = void 0;
      /**
       * @type {string}
       */
      _this.name = void 0;
      _this.massPan = Span.setSpanValue(a, b, c);
      _this.name = "Mass";
      return _this;
    }

    /**
     * Initializes the mass of a target particle.
     * @param {object} target - The target particle to initialize.
     */
    _inheritsLoose(Mass, _Initialize);
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
    /**
     * Creates a new Radius instance.
     * @param {number|Span} a - The radius value or the lower bound of the radius range.
     * @param {number} [b] - The upper bound of the radius range (if a is a number).
     * @param {boolean} [c] - Whether to use center-based calculation (if a and b are numbers).
     */
    function Radius(a, b, c) {
      var _this;
      _this = _Initialize.call(this) || this;
      /**
       * @type {Span}
       */
      _this.radius = void 0;
      /**
       * @type {string}
       */
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
    _inheritsLoose(Radius, _Initialize);
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
    /**
     * Creates a new Body instance.
     * @param {string|object|ArraySpan} image - The image source or object to use for the particle body.
     * @param {number} [w=20] - The width of the particle body.
     * @param {number} [h] - The height of the particle body. Defaults to the width if not provided.
     */
    function Body(image, w, h) {
      var _this;
      _this = _Initialize.call(this) || this;
      /**
       * @type {ArraySpan}
       * @private
       */
      _this.image = void 0;
      /**
       * @type {string}
       */
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
    _inheritsLoose(Body, _Initialize);
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
    _inheritsLoose(Force, _Behaviour);
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
    _inheritsLoose(Attraction, _Behaviour);
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
    _inheritsLoose(RandomDrift, _Behaviour);
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
    _inheritsLoose(Gravity, _Force);
    var _proto = Gravity.prototype;
    _proto.reset = function reset(g, life, easing) {
      _Force.prototype.reset.call(this, 0, g, life, easing);
    };
    return Gravity;
  }(Force);

  var Collision = /*#__PURE__*/function (_Behaviour) {
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
    _inheritsLoose(Collision, _Behaviour);
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
    _inheritsLoose(CrossZone, _Behaviour);
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
      /**
       * @type {boolean}
       * @private
       */
      _this.same = void 0;
      /**
       * @type {Span}
       * @private
       */
      _this.a = void 0;
      /**
       * @type {Span}
       * @private
       */
      _this.b = void 0;
      /**
       * @type {string}
       */
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
    _inheritsLoose(Alpha, _Behaviour);
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
      /**
       * @type {boolean}
       * @private
       */
      _this.same = void 0;
      /**
       * @type {string}
       */
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
    _inheritsLoose(Scale, _Behaviour);
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
      /**
       * @type {boolean}
       * @private
       */
      _this.same = void 0;
      /**
       * @type {Span}
       * @private
       */
      _this.a = void 0;
      /**
       * @type {Span}
       * @private
       */
      _this.b = void 0;
      /**
       * @type {string}
       * @private
       */
      _this.style = void 0;
      /**
       * @type {string}
       */
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
    _inheritsLoose(Rotate, _Behaviour);
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
    _inheritsLoose(Color, _Behaviour);
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
    _inheritsLoose(Cyclone, _Behaviour);
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
    _inheritsLoose(Repulsion, _Attraction);
    var _proto = Repulsion.prototype;
    _proto.reset = function reset(targetPosition, force, radius, life, easing) {
      _Attraction.prototype.reset.call(this, targetPosition, force, radius, life, easing);
      this.force *= -1;
    };
    return Repulsion;
  }(Attraction);

  var GravityWell = /*#__PURE__*/function (_Behaviour) {
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
    _inheritsLoose(GravityWell, _Behaviour);
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
    _inheritsLoose(Emitter, _Particle);
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
      while (i--) this.particles[i].dead = true;
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
      while (i--) this.initializes.push(rest[i]);
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
        for (i = 0; i < length; i++) this.createParticle();
        this.totalTime = "none";
      } else {
        this.emitTime += time;
        if (this.emitTime < this.totalTime) {
          var _length = this.rate.getValue(time);
          var _i;
          if (_length > 0) this.emitSpeed = _length;
          for (_i = 0; _i < _length; _i++) this.createParticle();
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
    _inheritsLoose(BehaviourEmitter, _Emitter);
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
    _inheritsLoose(FollowEmitter, _Emitter);
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
    /**
     * Creates a new CanvasRenderer instance.
     * @param {HTMLCanvasElement} element - The canvas element to render on.
     */
    function CanvasRenderer(element) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;
      /**
       * @type {object|null}
       * @private
       */
      _this.stroke = void 0;
      /**
       * @type {CanvasRenderingContext2D}
       * @private
       */
      _this.context = void 0;
      /**
       * @type {object}
       * @private
       */
      _this.bufferCache = void 0;
      /**
       * @type {string}
       */
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
    _inheritsLoose(CanvasRenderer, _BaseRenderer);
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
      _this.addImg2Body = _this.addImg2Body.bind(_this);
      _this.name = "DomRenderer";
      return _this;
    }
    _inheritsLoose(DomRenderer, _BaseRenderer);
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
    function EaselRenderer(element, stroke) {
      var _this;
      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = stroke;
      _this.name = "EaselRenderer";
      return _this;
    }
    _inheritsLoose(EaselRenderer, _BaseRenderer);
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
    _inheritsLoose(PixelRenderer, _BaseRenderer);
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
    _inheritsLoose(PixiRenderer, _BaseRenderer);
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
      for (var i = 0; i < 20; i++) this.mats.push(Mat3.create([0, 0, 0, 0, 0, 0, 0, 0, 0]));
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
      _this.addImg2Body = _this.addImg2Body.bind(_this);
      _this.name = "WebGLRenderer";
      return _this;
    }
    _inheritsLoose(WebGLRenderer, _BaseRenderer);
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
      for (i = 0; i < 100; i++) ids.push(i);
      idx = new Uint16Array(ids);
      this.unitI33 = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
      ids = [];
      for (i = 0; i < 100; i++) ids.push(i, i + 1, i + 2);
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
    _inheritsLoose(CustomRenderer, _BaseRenderer);
    return CustomRenderer;
  }(BaseRenderer);

  /**
   * Represents a line zone for particle systems.
   * @extends Zone
   */
  var LineZone = /*#__PURE__*/function (_Zone) {
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
    _inheritsLoose(LineZone, _Zone);
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
    _inheritsLoose(CircleZone, _Zone);
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
    _inheritsLoose(RectZone, _Zone);
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
    _inheritsLoose(ImageZone, _Zone);
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

  exports.Alpha = Alpha;
  exports.ArraySpan = ArraySpan;
  exports.Attraction = Attraction;
  exports.Behaviour = Behaviour;
  exports.BehaviourEmitter = BehaviourEmitter;
  exports.Body = Body;
  exports.CanvasRenderer = CanvasRenderer;
  exports.CircleZone = CircleZone;
  exports.Collision = Collision;
  exports.Color = Color;
  exports.ColorUtil = ColorUtil;
  exports.CrossZone = CrossZone;
  exports.CustomRenderer = CustomRenderer;
  exports.Cyclone = Cyclone;
  exports.Debug = Debug;
  exports.DomRenderer = DomRenderer;
  exports.EaselRenderer = EaselRenderer;
  exports.Emitter = Emitter;
  exports.FollowEmitter = FollowEmitter;
  exports.Force = Force;
  exports.Gravity = Gravity;
  exports.GravityWell = GravityWell;
  exports.ImageZone = ImageZone;
  exports.Initialize = Initialize;
  exports.Life = Life;
  exports.LineZone = LineZone;
  exports.Mass = Mass;
  exports.Mat3 = Mat3;
  exports.MathUtil = MathUtil;
  exports.Particle = Particle;
  exports.PixelRenderer = PixelRenderer;
  exports.PixiRenderer = PixiRenderer;
  exports.PointZone = PointZone;
  exports.Polar2D = Polar2D;
  exports.Pool = Pool;
  exports.Position = Position;
  exports.Radius = Radius;
  exports.RandomDrift = RandomDrift;
  exports.Rate = Rate;
  exports.RectZone = RectZone;
  exports.Rectangle = Rectangle;
  exports.Repulsion = Repulsion;
  exports.Rotate = Rotate;
  exports.Scale = Scale;
  exports.Span = Span;
  exports.Util = Util;
  exports.Vector2D = Vector2D;
  exports.Velocity = Velocity;
  exports.WebGLRenderer = WebGLRenderer;
  exports.Zone = Zone;
  exports["default"] = Proton;
  exports.ease = ease;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy9tYXRoL1NwYW4uanMiLCIuLi9zcmMvdXRpbHMvUHJvcFV0aWwuanMiLCIuLi9zcmMvbWF0aC9lYXNlLmpzIiwiLi4vc3JjL21hdGgvVmVjdG9yMkQuanMiLCIuLi9zcmMvY29yZS9QYXJ0aWNsZS5qcyIsIi4uL3NyYy91dGlscy9Db2xvclV0aWwuanMiLCIuLi9zcmMvbWF0aC9Qb2xhcjJELmpzIiwiLi4vc3JjL21hdGgvTWF0My5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIHNsaWNlQXJyYXkoYXJyMSwgaW5kZXgsIGFycjIpIHtcbiAgICB0aGlzLmVtcHR5QXJyYXkoYXJyMik7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMi5wdXNoKGFycjFbaV0pO1xuICAgIH1cbiAgfSxcblxuICBnZXRSYW5kRnJvbUFycmF5KGFycikge1xuICAgIGlmICghYXJyKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoYXJyLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcbiAgfSxcblxuICAvKipcbiAgICogRGVzdHJveWVzIHRoZSBnaXZlbiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGVtcHR5T2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW55IG9iamVjdFxuICAgKi9cbiAgZW1wdHlPYmplY3Qob2JqLCBpZ25vcmUgPSBudWxsKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKGlnbm9yZSAmJiBpZ25vcmUuaW5kZXhPZihrZXkpID4gLTEpIGNvbnRpbnVlO1xuICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWFrZXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyBhbmQgYmluZHMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBjbGFzc0FwcGx5XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIEEgY2xhc3MgdG8gbWFrZSBhbiBpbnN0YW5jZSBmcm9tXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBBbnkgYXJyYXkgdG8gYmluZCBpdCB0byB0aGUgY29uc3RydWN0b3JcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgaW5zdGFuY2Ugb2YgY29uc3RydWN0b3IsIG9wdGlvbmFsbHkgYmluZCB3aXRoIGFyZ3NcbiAgICovXG4gIGNsYXNzQXBwbHkoY29uc3RydWN0b3IsIGFyZ3MgPSBudWxsKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IEZhY3RvcnlGdW5jID0gY29uc3RydWN0b3IuYmluZC5hcHBseShjb25zdHJ1Y3RvciwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gbmV3IEZhY3RvcnlGdW5jKCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBpbWFnZSBkYXRhLiBJdCBjb3VsZCBiZSBuZWNlc3NhcnkgdG8gY3JlYXRlIGEgUHJvdG9uLlpvbmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRJbWFnZURhdGFcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gICBjb250ZXh0IGFueSBjYW52YXMsIG11c3QgYmUgYSAyZENvbnRleHQgJ2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpJ1xuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgIGltYWdlICAgY291bGQgYmUgYW55IGRvbSBpbWFnZSwgZS5nLiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpc0lzQW5JbWdUYWcnKTtcbiAgICogQHBhcmFtIHtQcm90b24uUmVjdGFuZ2xlfSAgICByZWN0XG4gICAqL1xuICBnZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpIHtcbiAgICByZXR1cm4gSW1nVXRpbC5nZXRJbWFnZURhdGEoY29udGV4dCwgaW1hZ2UsIHJlY3QpO1xuICB9LFxuXG4gIGRlc3Ryb3lBbGwoYXJyLCBwYXJhbSA9IG51bGwpIHtcbiAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJbaV0uZGVzdHJveShwYXJhbSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBkZWxldGUgYXJyW2ldO1xuICAgIH1cblxuICAgIGFyci5sZW5ndGggPSAwO1xuICB9LFxuXG4gIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgaWRzTWFwID0ge307XG5cbmNvbnN0IFB1aWQgPSB7XG4gIF9pbmRleDogMCxcbiAgX2NhY2hlOiB7fSxcblxuICBpZCh0eXBlKSB7XG4gICAgaWYgKGlkc01hcFt0eXBlXSA9PT0gdW5kZWZpbmVkIHx8IGlkc01hcFt0eXBlXSA9PT0gbnVsbCkgaWRzTWFwW3R5cGVdID0gMDtcbiAgICByZXR1cm4gYCR7dHlwZX1fJHtpZHNNYXBbdHlwZV0rK31gO1xuICB9LFxuXG4gIGdldElkKHRhcmdldCkge1xuICAgIGxldCB1aWQgPSB0aGlzLmdldElkRnJvbUNhY2hlKHRhcmdldCk7XG4gICAgaWYgKHVpZCkgcmV0dXJuIHVpZDtcblxuICAgIHVpZCA9IGBQVUlEXyR7dGhpcy5faW5kZXgrK31gO1xuICAgIHRoaXMuX2NhY2hlW3VpZF0gPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHVpZDtcbiAgfSxcblxuICBnZXRJZEZyb21DYWNoZSh0YXJnZXQpIHtcbiAgICBsZXQgb2JqLCBpZDtcblxuICAgIGZvciAoaWQgaW4gdGhpcy5fY2FjaGUpIHtcbiAgICAgIG9iaiA9IHRoaXMuX2NhY2hlW2lkXTtcblxuICAgICAgaWYgKG9iaiA9PT0gdGFyZ2V0KSByZXR1cm4gaWQ7XG4gICAgICBpZiAodGhpcy5pc0JvZHkob2JqLCB0YXJnZXQpICYmIG9iai5zcmMgPT09IHRhcmdldC5zcmMpIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBpc0JvZHkob2JqLCB0YXJnZXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiICYmIG9iai5pc0lubmVyICYmIHRhcmdldC5pc0lubmVyO1xuICB9LFxuXG4gIGdldFRhcmdldCh1aWQpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbdWlkXTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVpZDtcbiIsIi8qKlxuICogUG9vbCBpcyB0aGUgY2FjaGUgcG9vbCBvZiB0aGUgcHJvdG9uIGVuZ2luZSwgaXQgaXMgdmVyeSBpbXBvcnRhbnQuXG4gKlxuICogZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpXG4gKiAgQ2xhc3NcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICogICAgdGFyZ2V0Ll9fcHVpZCA9IHVpZFxuICpcbiAqICBib2R5XG4gKiAgICB1aWQgPSBQdWlkLmdldElkIC0+IFB1aWQgc2F2ZSB0YXJnZXQgY2FjaGVcbiAqXG4gKlxuICogZXhwaXJlKHRhcmdldClcbiAqICBjYWNoZVt0YXJnZXQuX19wdWlkXSBwdXNoIHRhcmdldFxuICpcbiAqL1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBvZiBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0b3RhbFxuICAgKiBAcHJvcGVydHkge09iamVjdH0gY2FjaGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bSkge1xuICAgIHRoaXMudG90YWwgPSAwO1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldCh0YXJnZXQsIHBhcmFtcywgdWlkKSB7XG4gICAgbGV0IHA7XG4gICAgdWlkID0gdWlkIHx8IHRhcmdldC5fX3B1aWQgfHwgUHVpZC5nZXRJZCh0YXJnZXQpO1xuXG4gICAgaWYgKHRoaXMuY2FjaGVbdWlkXSAmJiB0aGlzLmNhY2hlW3VpZF0ubGVuZ3RoID4gMCkge1xuICAgICAgcCA9IHRoaXMuY2FjaGVbdWlkXS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcCA9IHRoaXMuY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcC5fX3B1aWQgPSB0YXJnZXQuX19wdWlkIHx8IHVpZDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGV4cGlyZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZSh0YXJnZXQuX19wdWlkKS5wdXNoKHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjbGFzcyBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgbW9yZSBkb2N1bWVudGF0aW9uXG4gICAqXG4gICAqIEBtZXRob2QgY3JlYXRlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldCBhbnkgT2JqZWN0IG9yIEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBqdXN0IGFkZCBpZiBgdGFyZ2V0YCBpcyBhIGZ1bmN0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGNyZWF0ZU9yQ2xvbmUodGFyZ2V0LCBwYXJhbXMpIHtcbiAgICB0aGlzLnRvdGFsKys7XG5cbiAgICBpZiAodGhpcy5jcmVhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBVdGlsLmNsYXNzQXBwbHkodGFyZ2V0LCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmNsb25lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiAtIHdoYXQgaXMgaW4gdGhlIGNhY2hlP1xuICAgKlxuICAgKiBAbWV0aG9kIGdldENvdW50XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSBjb3VudCArPSB0aGlzLmNhY2hlW2lkXS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveWVzIGFsbCBpdGVtcyBmcm9tIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlBvb2xcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgdGhpcy5jYWNoZVtpZF0ubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2lkXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBQb29sLmNhY2hlXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q2FjaGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdWlkIHRoZSB1bmlxdWUgaWRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0Q2FjaGUodWlkID0gXCJkZWZhdWx0XCIpIHtcbiAgICBpZiAoIXRoaXMuY2FjaGVbdWlkXSkgdGhpcy5jYWNoZVt1aWRdID0gW107XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVbdWlkXTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHMge1xuICBjb25zdHJ1Y3Rvcihwcm90b24pIHtcbiAgICB0aGlzLnByb3RvbiA9IHByb3RvbjtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy50eXBlID0gMTtcblxuICAgIHRoaXMuZW1pdHRlckluZGV4ID0gMDtcbiAgICB0aGlzLnJlbmRlcmVySW5kZXggPSAwO1xuICB9XG5cbiAgdXBkYXRlKHN0eWxlLCBib2R5KSB7XG4gICAgdGhpcy5hZGQoc3R5bGUsIGJvZHkpO1xuXG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuZ2V0RW1pdHRlcigpO1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpO1xuICAgIGxldCBzdHIgPSBcIlwiO1xuXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc3RyICs9IFwiZW1pdHRlcjpcIiArIHRoaXMucHJvdG9uLmVtaXR0ZXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiZW0gc3BlZWQ6XCIgKyBlbWl0dGVyLmVtaXRTcGVlZCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwicG9zOlwiICsgdGhpcy5nZXRFbWl0dGVyUG9zKGVtaXR0ZXIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiaW5pdGlhbGl6ZXM6XCIgKyBlbWl0dGVyLmluaXRpYWxpemVzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcilcbiAgICAgICAgICBzdHIgKz0gJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI+JyArIHRoaXMuY29uY2F0QXJyKGVtaXR0ZXIuaW5pdGlhbGl6ZXMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9IFwiYmVoYXZpb3VyczpcIiArIGVtaXR0ZXIuYmVoYXZpb3Vycy5sZW5ndGggKyBcIjxicj5cIjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5iZWhhdmlvdXJzKSArIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHJlbmRlcmVyKSBzdHIgKz0gcmVuZGVyZXIubmFtZSArIFwiPGJyPlwiO1xuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSBcImJvZHk6XCIgKyB0aGlzLmdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpICsgXCI8YnI+XCI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHIgKz0gXCJwYXJ0aWNsZXM6XCIgKyB0aGlzLnByb3Rvbi5nZXRDb3VudCgpICsgXCI8YnI+XCI7XG4gICAgICAgIHN0ciArPSBcInBvb2w6XCIgKyB0aGlzLnByb3Rvbi5wb29sLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwidG90YWw6XCIgKyB0aGlzLnByb3Rvbi5wb29sLnRvdGFsO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IHN0cjtcbiAgfVxuXG4gIGFkZChzdHlsZSwgYm9keSkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMudHlwZSA9IDE7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBbXG4gICAgICAgIFwicG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjBweDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7XCIsXG4gICAgICAgIFwib3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMDtwYWRkaW5nOjEwcHg7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6SGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XCIsXG4gICAgICAgIFwid2lkdGg6MTIwcHg7aGVpZ2h0OjUwcHg7YmFja2dyb3VuZC1jb2xvcjojMDAyO2NvbG9yOiMwZmY7XCJcbiAgICAgIF0uam9pbihcIlwiKTtcblxuICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICB0aGlzLnR5cGUrKztcbiAgICAgICAgICBpZiAodGhpcy50eXBlID4gNCkgdGhpcy50eXBlID0gMTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG5cbiAgICAgIGxldCBiZywgY29sb3I7XG4gICAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBiZyA9IFwiIzIwMVwiO1xuICAgICAgICAgIGNvbG9yID0gXCIjZjA4XCI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGJnID0gXCIjMDIwXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZjBcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJnID0gXCIjMDAyXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiMwZmZcIjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gYmc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImNvbG9yXCJdID0gY29sb3I7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICBib2R5ID0gYm9keSB8fCB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldEVtaXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLmVtaXR0ZXJzW3RoaXMuZW1pdHRlckluZGV4XTtcbiAgfVxuXG4gIGdldFJlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3Rvbi5yZW5kZXJlcnNbdGhpcy5yZW5kZXJlckluZGV4XTtcbiAgfVxuXG4gIGNvbmNhdEFycihhcnIpIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBpZiAoIWFyciB8fCAhYXJyLmxlbmd0aCkgcmV0dXJuIHJlc3VsdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gKGFycltpXS5uYW1lIHx8IFwiXCIpLnN1YnN0cigwLCAxKSArIFwiLlwiO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDcmVhdGVkTnVtYmVyKHJlbmRlcmVyKSB7XG4gICAgcmV0dXJuIHJlbmRlcmVyLnBvb2wudG90YWwgfHwgKHJlbmRlcmVyLmNwb29sICYmIHJlbmRlcmVyLmNwb29sLnRvdGFsKSB8fCAwO1xuICB9XG5cbiAgZ2V0RW1pdHRlclBvcyhlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoZS5wLngpICsgXCIsXCIgKyBNYXRoLnJvdW5kKGUucC55KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgIGJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHRoaXMucHJvdG9uID0gbnVsbDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gIH1cbn1cbiIsIi8qXG4gKiBFdmVudERpc3BhdGNoZXJcbiAqIFRoaXMgY29kZSByZWZlcmVuY2Ugc2luY2UgaHR0cDovL2NyZWF0ZWpzLmNvbS8uXG4gKlxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGJpbmQodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuICAgIHRhcmdldC5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1t0eXBlXSkgdGhpcy5fbGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHJldHVybjtcblxuICAgIGNvbnN0IGFyciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICBjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycltpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbGxvd3MgZm9yIGZhc3RlciBjaGVja3MuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVBbGxFdmVudExpc3RlbmVycyh0eXBlKSB7XG4gICAgaWYgKCF0eXBlKSB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIGVsc2UgaWYgKHRoaXMuX2xpc3RlbmVycykgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQodHlwZSwgYXJncykge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG5cbiAgICBpZiAodHlwZSAmJiBsaXN0ZW5lcnMpIHtcbiAgICAgIGxldCBhcnIgPSBsaXN0ZW5lcnNbdHlwZV07XG4gICAgICBpZiAoIWFycikgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgLy8gYXJyID0gYXJyLnNsaWNlKCk7XG4gICAgICAvLyB0byBhdm9pZCBpc3N1ZXMgd2l0aCBpdGVtcyBiZWluZyByZW1vdmVkIG9yIGFkZGVkIGR1cmluZyB0aGUgZGlzcGF0Y2hcblxuICAgICAgbGV0IGhhbmRsZXI7XG4gICAgICBsZXQgaSA9IGFyci5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGhhbmRsZXIgPSBhcnJbaV07XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBoYW5kbGVyKGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfVxuXG4gIGhhc0V2ZW50TGlzdGVuZXIodHlwZSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycztcbiAgICByZXR1cm4gISEobGlzdGVuZXJzICYmIGxpc3RlbmVyc1t0eXBlXSk7XG4gIH1cbn1cbiIsImNvbnN0IFBJID0gMy4xNDE1OTI2O1xuY29uc3QgSU5GSU5JVFkgPSBJbmZpbml0eTtcblxuY29uc3QgTWF0aFV0aWwgPSB7XG4gIFBJOiBQSSxcbiAgUEl4MjogUEkgKiAyLFxuICBQSV8yOiBQSSAvIDIsXG4gIFBJXzE4MDogUEkgLyAxODAsXG4gIE4xODBfUEk6IDE4MCAvIFBJLFxuICBJbmZpbml0eTogLTk5OSxcblxuICBpc0luZmluaXR5KG51bSkge1xuICAgIHJldHVybiBudW0gPT09IHRoaXMuSW5maW5pdHkgfHwgbnVtID09PSBJTkZJTklUWTtcbiAgfSxcblxuICByYW5kb21BVG9CKGEsIGIsIGlzSW50ID0gZmFsc2UpIHtcbiAgICBpZiAoIWlzSW50KSByZXR1cm4gYSArIE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpO1xuICAgIGVsc2UgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIChiIC0gYSkpID4+IDApICsgYTtcbiAgfSxcblxuICByYW5kb21GbG9hdGluZyhjZW50ZXIsIGYsIGlzSW50KSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZG9tQVRvQihjZW50ZXIgLSBmLCBjZW50ZXIgKyBmLCBpc0ludCk7XG4gIH0sXG5cbiAgcmFuZG9tQ29sb3IoKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgKFwiMDAwMDBcIiArICgoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMCkgPDwgMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNik7XG4gIH0sXG5cbiAgcmFuZG9tWm9uZShkaXNwbGF5KSB7fSxcblxuICBmbG9vcihudW0sIGsgPSA0KSB7XG4gICAgY29uc3QgZGlnaXRzID0gTWF0aC5wb3coMTAsIGspO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG51bSAqIGRpZ2l0cykgLyBkaWdpdHM7XG4gIH0sXG5cbiAgZGVncmVlVHJhbnNmb3JtKGEpIHtcbiAgICByZXR1cm4gKGEgKiBQSSkgLyAxODA7XG4gIH0sXG5cbiAgdG9Db2xvcjE2KG51bSkge1xuICAgIHJldHVybiBgIyR7bnVtLnRvU3RyaW5nKDE2KX1gO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWF0aFV0aWw7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlZ3JhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgY2FsY3VsYXRlKHBhcnRpY2xlcywgdGltZSwgZGFtcGluZykge1xuICAgIHRoaXMuZXVsZXJJbnRlZ3JhdGUocGFydGljbGVzLCB0aW1lLCBkYW1waW5nKTtcbiAgfVxuXG4gIC8vIEV1bGVyIEludGVncmF0ZVxuICAvLyBodHRwczovL3Jvc2V0dGFjb2RlLm9yZy93aWtpL0V1bGVyX21ldGhvZFxuICBldWxlckludGVncmF0ZShwYXJ0aWNsZSwgdGltZSwgZGFtcGluZykge1xuICAgIGlmICghcGFydGljbGUuc2xlZXApIHtcbiAgICAgIHBhcnRpY2xlLm9sZC5wLmNvcHkocGFydGljbGUucCk7XG4gICAgICBwYXJ0aWNsZS5vbGQudi5jb3B5KHBhcnRpY2xlLnYpO1xuXG4gICAgICBwYXJ0aWNsZS5hLm11bHRpcGx5U2NhbGFyKDEgLyBwYXJ0aWNsZS5tYXNzKTtcbiAgICAgIHBhcnRpY2xlLnYuYWRkKHBhcnRpY2xlLmEubXVsdGlwbHlTY2FsYXIodGltZSkpO1xuICAgICAgcGFydGljbGUucC5hZGQocGFydGljbGUub2xkLnYubXVsdGlwbHlTY2FsYXIodGltZSkpO1xuXG4gICAgICBpZiAoZGFtcGluZykgcGFydGljbGUudi5tdWx0aXBseVNjYWxhcihkYW1waW5nKTtcblxuICAgICAgcGFydGljbGUuYS5jbGVhcigpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4vUG9vbFwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBTdGF0cyBmcm9tIFwiLi4vZGVidWcvU3RhdHNcIjtcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEludGVncmF0aW9uIGZyb20gXCIuLi9tYXRoL0ludGVncmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3RvbiB7XG4gIHN0YXRpYyBVU0VfQ0xPQ0sgPSBmYWxzZTtcblxuICAvLyBtZWFzdXJlIDE6MTAwXG4gIHN0YXRpYyBNRUFTVVJFID0gMTAwO1xuICBzdGF0aWMgRVVMRVIgPSBcImV1bGVyXCI7XG4gIHN0YXRpYyBSSzIgPSBcInJ1bmdlLWt1dHRhMlwiO1xuXG4gIC8vIGV2ZW50IG5hbWVcbiAgc3RhdGljIFBBUlRJQ0xFX0NSRUFURUQgPSBcIlBBUlRJQ0xFX0NSRUFURURcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX1VQREFURSA9IFwiUEFSVElDTEVfVVBEQVRFXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9TTEVFUCA9IFwiUEFSVElDTEVfU0xFRVBcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX0RFQUQgPSBcIlBBUlRJQ0xFX0RFQURcIjtcblxuICBzdGF0aWMgRU1JVFRFUl9BRERFRCA9IFwiRU1JVFRFUl9BRERFRFwiO1xuICBzdGF0aWMgRU1JVFRFUl9SRU1PVkVEID0gXCJFTUlUVEVSX1JFTU9WRURcIjtcblxuICBzdGF0aWMgUFJPVE9OX1VQREFURSA9IFwiUFJPVE9OX1VQREFURVwiO1xuICBzdGF0aWMgUFJPVE9OX1VQREFURV9BRlRFUiA9IFwiUFJPVE9OX1VQREFURV9BRlRFUlwiO1xuICBzdGF0aWMgREVGQVVMVF9JTlRFUlZBTCA9IDAuMDE2NztcblxuICBzdGF0aWMgYW1lbmRDaGFuZ2VUYWJzQnVnID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIHRvIGFkZCBlbWl0dGVyc1xuICAgKlxuICAgKiBAY29uc3RydWN0b3IgUHJvdG9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBtb3JlIGRvY3VtZW50YXRpb24gb2YgdGhlIHNpbmdsZSBwcm9wZXJ0aWVzIGFuZCBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyIHwgdW5kZWZpbmVkfSBbaW50ZWdyYXRpb25UeXBlPVByb3Rvbi5FVUxFUl1cbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFtpbnRlZ3JhdGlvblR5cGU9UHJvdG9uLkVVTEVSXVxuICAgKiBAcHJvcGVydHkge0FycmF5fSBlbWl0dGVycyAgIEFsbCBhZGRlZCBlbWl0dGVyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHJlbmRlcmVycyAgQWxsIGFkZGVkIHJlbmRlcmVyXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0aW1lICAgICAgVGhlIGFjdGl2ZSB0aW1lXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBvbGR0aW1lICAgVGhlIG9sZCB0aW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbnRlZ3JhdGlvblR5cGUpIHtcbiAgICB0aGlzLmVtaXR0ZXJzID0gW107XG4gICAgdGhpcy5yZW5kZXJlcnMgPSBbXTtcblxuICAgIHRoaXMudGltZSA9IDA7XG4gICAgdGhpcy5ub3cgPSAwO1xuICAgIHRoaXMudGhlbiA9IDA7XG4gICAgdGhpcy5lbGFwc2VkID0gMDtcblxuICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHModGhpcyk7XG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woODApO1xuXG4gICAgdGhpcy5pbnRlZ3JhdGlvblR5cGUgPSBVdGlsLmluaXRWYWx1ZShpbnRlZ3JhdGlvblR5cGUsIFByb3Rvbi5FVUxFUik7XG4gICAgdGhpcy5pbnRlZ3JhdG9yID0gbmV3IEludGVncmF0aW9uKHRoaXMuaW50ZWdyYXRpb25UeXBlKTtcblxuICAgIHRoaXMuX2ZwcyA9IFwiYXV0b1wiO1xuICAgIHRoaXMuX2ludGVydmFsID0gUHJvdG9uLkRFRkFVTFRfSU5URVJWQUw7XG4gIH1cblxuICBzZXQgZnBzKGZwcykge1xuICAgIHRoaXMuX2ZwcyA9IGZwcztcbiAgICB0aGlzLl9pbnRlcnZhbCA9IGZwcyA9PT0gXCJhdXRvXCIgPyBQcm90b24uREVGQVVMVF9JTlRFUlZBTCA6IE1hdGhVdGlsLmZsb29yKDEgLyBmcHMsIDcpO1xuICB9XG5cbiAgZ2V0IGZwcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZnBzO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBhIHR5cGUgb2YgUmVuZGVyZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRSZW5kZXJlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1JlbmRlcmVyfSByZW5kZXJcbiAgICovXG4gIGFkZFJlbmRlcmVyKHJlbmRlcikge1xuICAgIHJlbmRlci5pbml0KHRoaXMpO1xuICAgIHRoaXMucmVuZGVyZXJzLnB1c2gocmVuZGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBhZGQgYSB0eXBlIG9mIFJlbmRlcmVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkUmVuZGVyZXJcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyXG4gICAqL1xuICByZW1vdmVSZW5kZXJlcihyZW5kZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucmVuZGVyZXJzLmluZGV4T2YocmVuZGVyKTtcbiAgICB0aGlzLnJlbmRlcmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJlbmRlci5yZW1vdmUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBFbWl0dGVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkRW1pdHRlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge0VtaXR0ZXJ9IGVtaXR0ZXJcbiAgICovXG4gIGFkZEVtaXR0ZXIoZW1pdHRlcikge1xuICAgIHRoaXMuZW1pdHRlcnMucHVzaChlbWl0dGVyKTtcbiAgICBlbWl0dGVyLnBhcmVudCA9IHRoaXM7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLkVNSVRURVJfQURERUQsIGVtaXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gRW1pdHRlclxuICAgKlxuICAgKiBAbWV0aG9kIHJlbW92ZUVtaXR0ZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gZW1pdHRlclxuICAgKi9cbiAgcmVtb3ZlRW1pdHRlcihlbWl0dGVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmVtaXR0ZXJzLmluZGV4T2YoZW1pdHRlcik7XG4gICAgdGhpcy5lbWl0dGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGVtaXR0ZXIucGFyZW50ID0gbnVsbDtcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uRU1JVFRFUl9SRU1PVkVELCBlbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGFsbCBhZGRlZCBlbWl0dGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIC8vICdhdXRvJyBpcyB0aGUgZGVmYXVsdCBicm93c2VyIHJlZnJlc2ggcmF0ZSwgdGhlIHZhc3QgbWFqb3JpdHkgaXMgNjBmcHNcbiAgICBpZiAodGhpcy5fZnBzID09PSBcImF1dG9cIikge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFKTtcblxuICAgICAgaWYgKFByb3Rvbi5VU0VfQ0xPQ0spIHtcbiAgICAgICAgaWYgKCF0aGlzLnRoZW4pIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLm5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAodGhpcy5ub3cgLSB0aGlzLnRoZW4pICogMC4wMDE7XG4gICAgICAgIC8vIEZpeCBidWdzIHN1Y2ggYXMgY2hyb21lIGJyb3dzZXIgc3dpdGNoaW5nIHRhYnMgY2F1c2luZyBleGNlc3NpdmUgdGltZSBkaWZmZXJlbmNlXG4gICAgICAgIHRoaXMuYW1lbmRDaGFuZ2VUYWJzQnVnKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZWxhcHNlZCA+IDApIHRoaXMuZW1pdHRlcnNVcGRhdGUodGhpcy5lbGFwc2VkKTtcbiAgICAgICAgdGhpcy50aGVuID0gdGhpcy5ub3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVtaXR0ZXJzVXBkYXRlKFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFX0FGVEVSKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZnBzIGZyYW1lIHJhdGUgaXMgc2V0XG4gICAgZWxzZSB7XG4gICAgICBpZiAoIXRoaXMudGhlbikgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLm5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMubm93IC0gdGhpcy50aGVuKSAqIDAuMDAxO1xuXG4gICAgICBpZiAodGhpcy5lbGFwc2VkID4gdGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyc1VwZGF0ZSh0aGlzLl9pbnRlcnZhbCk7XG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5NzY0MDE4L2NvbnRyb2xsaW5nLWZwcy13aXRoLXJlcXVlc3RhbmltYXRpb25mcmFtZVxuICAgICAgICB0aGlzLnRoZW4gPSB0aGlzLm5vdyAtICh0aGlzLmVsYXBzZWQgJSB0aGlzLl9pbnRlcnZhbCkgKiAxMDAwO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEVfQUZURVIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVtaXR0ZXJzVXBkYXRlKGVsYXBzZWQpIHtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHRoaXMuZW1pdHRlcnNbaV0udXBkYXRlKGVsYXBzZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIGFtZW5kQ2hhbmdlVGFic0J1Z1xuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgYW1lbmRDaGFuZ2VUYWJzQnVnKCkge1xuICAgIGlmICghUHJvdG9uLmFtZW5kQ2hhbmdlVGFic0J1ZykgcmV0dXJuO1xuICAgIGlmICh0aGlzLmVsYXBzZWQgPiAwLjUpIHtcbiAgICAgIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ291bnRzIGFsbCBwYXJ0aWNsZXMgZnJvbSBhbGwgZW1pdHRlcnNcbiAgICpcbiAgICogQG1ldGhvZCBnZXRDb3VudFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkgdG90YWwgKz0gdGhpcy5lbWl0dGVyc1tpXS5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHJldHVybiB0b3RhbDtcbiAgfVxuXG4gIGdldEFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgcGFydGljbGVzID0gW107XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHBhcnRpY2xlcyA9IHBhcnRpY2xlcy5jb25jYXQodGhpcy5lbWl0dGVyc1tpXS5wYXJ0aWNsZXMpO1xuICAgIHJldHVybiBwYXJ0aWNsZXM7XG4gIH1cblxuICBkZXN0cm95QWxsRW1pdHRlcnMoKSB7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMuZW1pdHRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byB0aGlzIFByb3RvbiBpbnN0YW5jZS4gVGhpcyBpbmNsdWRlcyBhbGwgZW1pdHRlcnMsIGFuZCBhbGwgcHJvcGVydGllc1xuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGRlc3Ryb3kocmVtb3ZlID0gZmFsc2UpIHtcbiAgICBjb25zdCBkZXN0cm95T3RoZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgdGhpcy50aGVuID0gMDtcbiAgICAgIHRoaXMucG9vbC5kZXN0cm95KCk7XG4gICAgICB0aGlzLnN0YXRzLmRlc3Ryb3koKTtcblxuICAgICAgVXRpbC5kZXN0cm95QWxsKHRoaXMuZW1pdHRlcnMpO1xuICAgICAgVXRpbC5kZXN0cm95QWxsKHRoaXMucmVuZGVyZXJzLCB0aGlzLmdldEFsbFBhcnRpY2xlcygpKTtcblxuICAgICAgdGhpcy5pbnRlZ3JhdG9yID0gbnVsbDtcbiAgICAgIHRoaXMucmVuZGVyZXJzID0gbnVsbDtcbiAgICAgIHRoaXMuZW1pdHRlcnMgPSBudWxsO1xuICAgICAgdGhpcy5zdGF0cyA9IG51bGw7XG4gICAgICB0aGlzLnBvb2wgPSBudWxsO1xuICAgIH07XG5cbiAgICBpZiAocmVtb3ZlKSB7XG4gICAgICBzZXRUaW1lb3V0KGRlc3Ryb3lPdGhlciwgMjAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdHJveU90aGVyKCk7XG4gICAgfVxuICB9XG59XG5cbkV2ZW50RGlzcGF0Y2hlci5iaW5kKFByb3Rvbik7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZ2Ige1xuICBjb25zdHJ1Y3RvcihyID0gMjU1LCBnID0gMjU1LCBiID0gMjU1KSB7XG4gICAgdGhpcy5yID0gcjtcbiAgICB0aGlzLmcgPSBnO1xuICAgIHRoaXMuYiA9IGI7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnIgPSAyNTU7XG4gICAgdGhpcy5nID0gMjU1O1xuICAgIHRoaXMuYiA9IDI1NTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzcGFuIG9mIHZhbHVlcyBvciBhbiBhcnJheS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BhbiB7XG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzQXJyYXk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ8bnVtYmVyW119XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYjtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjZW50ZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgU3BhbiBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8bnVtYmVyW119IGEgLSBUaGUgZmlyc3QgdmFsdWUgb3IgYW4gYXJyYXkgb2YgdmFsdWVzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2JdIC0gVGhlIHNlY29uZCB2YWx1ZSAoaWYgYSBpcyBub3QgYW4gYXJyYXkpLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjZW50ZXI9ZmFsc2VdIC0gV2hldGhlciB0byB1c2UgY2VudGVyLWJhc2VkIGNhbGN1bGF0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgY2VudGVyKSB7XG4gICAgaWYgKFV0aWwuaXNBcnJheShhKSkge1xuICAgICAgdGhpcy5pc0FycmF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYSA9IGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNBcnJheSA9IGZhbHNlO1xuICAgICAgdGhpcy5hID0gVXRpbC5pbml0VmFsdWUoYSwgMSk7XG4gICAgICB0aGlzLmIgPSBVdGlsLmluaXRWYWx1ZShiLCB0aGlzLmEpO1xuICAgICAgdGhpcy5jZW50ZXIgPSBVdGlsLmluaXRWYWx1ZShjZW50ZXIsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHZhbHVlIGZyb20gdGhlIHNwYW4uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzSW50PWZhbHNlXSAtIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGludGVnZXIgdmFsdWUuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIHNwYW4uXG4gICAqL1xuICBnZXRWYWx1ZShpc0ludCA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuaXNBcnJheSkge1xuICAgICAgcmV0dXJuIFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLmEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuY2VudGVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbC5yYW5kb21BVG9CKHRoaXMuYSwgdGhpcy5iLCBpc0ludCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aFV0aWwucmFuZG9tRmxvYXRpbmcodGhpcy5hLCB0aGlzLmIsIGlzSW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBTcGFuIG9iamVjdC5cbiAgICogQHBhcmFtIHsqfFNwYW59IGEgLSBUaGUgZmlyc3QgdmFsdWUgb3IgYSBTcGFuIG9iamVjdC5cbiAgICogQHBhcmFtIHsqfSBbYl0gLSBUaGUgc2Vjb25kIHZhbHVlLlxuICAgKiBAcGFyYW0geyp9IFtjXSAtIFRoZSB0aGlyZCB2YWx1ZS5cbiAgICogQHJldHVybnMge1NwYW59IEEgbmV3IFNwYW4gaW5zdGFuY2UuXG4gICAqL1xuICBzdGF0aWMgc2V0U3BhblZhbHVlKGEsIGIsIGMpIHtcbiAgICBpZiAoYSBpbnN0YW5jZW9mIFNwYW4pIHtcbiAgICAgIHJldHVybiBhO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3BhbihhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjID09PSB1bmRlZmluZWQpIHJldHVybiBuZXcgU3BhbihhLCBiKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbmV3IFNwYW4oYSwgYiwgYyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIGZyb20gYSBTcGFuLCBpZiB0aGUgcGFyYW0gaXMgbm90IGEgU3BhbiBpdCB3aWxsIHJldHVybiB0aGUgZ2l2ZW4gcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0geyp8U3Bhbn0gcGFuIC0gVGhlIHZhbHVlIG9yIFNwYW4gdG8gZ2V0IHRoZSB2YWx1ZSBmcm9tLlxuICAgKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIG9mIFNwYW4gT1IgdGhlIHBhcmFtZXRlciBpZiBpdCBpcyBub3QgYSBTcGFuLlxuICAgKi9cbiAgc3RhdGljIGdldFNwYW5WYWx1ZShwYW4pIHtcbiAgICByZXR1cm4gcGFuIGluc3RhbmNlb2YgU3BhbiA/IHBhbi5nZXRWYWx1ZSgpIDogcGFuO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaGFzUHJvcCh0YXJnZXQsIGtleSkge1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIHByb3RvdHlwZSBpbiBhIGdpdmVuIHByb3RvdHlwZU9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0UHJvcFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGB0YXJnZXRgXG4gICAqIEB0b2RvIHRyYW5zbGF0ZSBkZXNyaXB0aW9uIGZyb20gY2hpbmVzZSB0byBlbmdsaXNoXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3RvdHlwZU9iamVjdCBBbiBvYmplY3Qgb2Ygc2luZ2xlIHByb3RvdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSB0YXJnZXRcbiAgICovXG4gIHNldFByb3AodGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gU3Bhbi5nZXRTcGFuVmFsdWUocHJvcHNbcHJvcF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBzZXRWZWN0b3JWYWxcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgdGFyZ2V0YFxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIHBhcmFtIGBjb25mYFxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yIGZ1bmN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZcbiAgICovXG4gIHNldFZlY3RvclZhbChwYXJ0aWNsZSwgY29uZiA9IG51bGwpIHtcbiAgICBpZiAoIWNvbmYpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ4XCIpKSBwYXJ0aWNsZS5wLnggPSBjb25mW1wieFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwieVwiKSkgcGFydGljbGUucC55ID0gY29uZltcInlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidnhcIikpIHBhcnRpY2xlLnYueCA9IGNvbmZbXCJ2eFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidnlcIikpIHBhcnRpY2xlLnYueSA9IGNvbmZbXCJ2eVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJheFwiKSkgcGFydGljbGUuYS54ID0gY29uZltcImF4XCJdO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJheVwiKSkgcGFydGljbGUuYS55ID0gY29uZltcImF5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInBcIikpIHBhcnRpY2xlLnAuY29weShjb25mW1wicFwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZcIikpIHBhcnRpY2xlLnYuY29weShjb25mW1widlwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImFcIikpIHBhcnRpY2xlLmEuY29weShjb25mW1wiYVwiXSk7XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwicG9zaXRpb25cIikpIHBhcnRpY2xlLnAuY29weShjb25mW1wicG9zaXRpb25cIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2ZWxvY2l0eVwiKSkgcGFydGljbGUudi5jb3B5KGNvbmZbXCJ2ZWxvY2l0eVwiXSk7XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcImFjY2VsZXJhdGVcIikpIHBhcnRpY2xlLmEuY29weShjb25mW1wiYWNjZWxlcmF0ZVwiXSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBlYXNlTGluZWFyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIGVhc2VJblF1YWQodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDIpO1xuICB9LFxuXG4gIGVhc2VPdXRRdWFkKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCAyKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbk91dFF1YWQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDIpO1xuXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogdmFsdWUgLSAyKTtcbiAgfSxcblxuICBlYXNlSW5DdWJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgMyk7XG4gIH0sXG5cbiAgZWFzZU91dEN1YmljKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlIC0gMSwgMykgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEN1YmljKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCAzKTtcblxuICAgIHJldHVybiAwLjUgKiAoTWF0aC5wb3codmFsdWUgLSAyLCAzKSArIDIpO1xuICB9LFxuXG4gIGVhc2VJblF1YXJ0KHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCA0KTtcbiAgfSxcblxuICBlYXNlT3V0UXVhcnQodmFsdWUpIHtcbiAgICByZXR1cm4gLShNYXRoLnBvdyh2YWx1ZSAtIDEsIDQpIC0gMSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0UXVhcnQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogTWF0aC5wb3codmFsdWUsIDQpO1xuXG4gICAgcmV0dXJuIC0wLjUgKiAoKHZhbHVlIC09IDIpICogTWF0aC5wb3codmFsdWUsIDMpIC0gMik7XG4gIH0sXG5cbiAgZWFzZUluU2luZSh2YWx1ZSkge1xuICAgIHJldHVybiAtTWF0aC5jb3ModmFsdWUgKiBNYXRoVXRpbC5QSV8yKSArIDE7XG4gIH0sXG5cbiAgZWFzZU91dFNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5zaW4odmFsdWUgKiBNYXRoVXRpbC5QSV8yKTtcbiAgfSxcblxuICBlYXNlSW5PdXRTaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHZhbHVlKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbkV4cG8odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyAwIDogTWF0aC5wb3coMiwgMTAgKiAodmFsdWUgLSAxKSk7XG4gIH0sXG5cbiAgZWFzZU91dEV4cG8odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDEgPyAxIDogLU1hdGgucG93KDIsIC0xMCAqIHZhbHVlKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0RXhwbyh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIDA7XG5cbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiAxO1xuXG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xuXG4gICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogLS12YWx1ZSkgKyAyKTtcbiAgfSxcblxuICBlYXNlSW5DaXJjKHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5zcXJ0KDEgLSB2YWx1ZSAqIHZhbHVlKSAtIDEpO1xuICB9LFxuXG4gIGVhc2VPdXRDaXJjKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCgxIC0gTWF0aC5wb3codmFsdWUgLSAxLCAyKSk7XG4gIH0sXG5cbiAgZWFzZUluT3V0Q2lyYyh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcbiAgICByZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKHZhbHVlIC09IDIpICogdmFsdWUpICsgMSk7XG4gIH0sXG5cbiAgZWFzZUluQmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gdmFsdWUgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgLSBzKTtcbiAgfSxcblxuICBlYXNlT3V0QmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gKHZhbHVlID0gdmFsdWUgLSAxKSAqIHZhbHVlICogKChzICsgMSkgKiB2YWx1ZSArIHMpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRCYWNrKHZhbHVlKSB7XG4gICAgbGV0IHMgPSAxLjcwMTU4O1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiAodmFsdWUgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSAtIHMpKTtcbiAgICByZXR1cm4gMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHZhbHVlICsgcykgKyAyKTtcbiAgfSxcblxuICBnZXRFYXNpbmcoZWFzZSkge1xuICAgIGlmICh0eXBlb2YgZWFzZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZWFzZTtcbiAgICBlbHNlIHJldHVybiB0aGlzW2Vhc2VdIHx8IHRoaXMuZWFzZUxpbmVhcjtcbiAgfVxufTtcbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IyRCB7XG4gIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICB4O1xuXG4gIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICB5O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFZlY3RvcjJEIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3g9MF0gLSBUaGUgeCBjb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gLSBUaGUgeSBjb29yZGluYXRlLlxuICAgKi9cbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICB0aGlzLnkgPSB5IHx8IDA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgeCBhbmQgeSBjb21wb25lbnRzIG9mIHRoaXMgdmVjdG9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4IGNvb3JkaW5hdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHkgY29vcmRpbmF0ZS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIHNldCh4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHggY29tcG9uZW50IG9mIHRoaXMgdmVjdG9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4IGNvb3JkaW5hdGUuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBzZXRYKHgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHkgY29tcG9uZW50IG9mIHRoaXMgdmVjdG9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5IGNvb3JkaW5hdGUuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBzZXRZKHkpIHtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGdyYWRpZW50IChhbmdsZSkgb2YgdGhpcyB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBncmFkaWVudCBpbiByYWRpYW5zLlxuICAgKi9cbiAgZ2V0R3JhZGllbnQoKSB7XG4gICAgaWYgKHRoaXMueCAhPT0gMCkgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICAgIGVsc2UgaWYgKHRoaXMueSA+IDApIHJldHVybiBNYXRoVXRpbC5QSV8yO1xuICAgIGVsc2UgaWYgKHRoaXMueSA8IDApIHJldHVybiAtTWF0aFV0aWwuUElfMjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBhbm90aGVyIHZlY3RvciB0byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSB2ZWN0b3IgdG8gY29weSBmcm9tLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgY29weSh2KSB7XG4gICAgdGhpcy54ID0gdi54O1xuICAgIHRoaXMueSA9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyBvbmUuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgdmVjdG9yIHRvIGFkZC5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW3ddIC0gQW4gb3B0aW9uYWwgc2Vjb25kIHZlY3RvciB0byBhZGQuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBhZGQodiwgdykge1xuICAgIGlmICh3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFZlY3RvcnModiwgdyk7XG4gICAgfVxuXG4gICAgdGhpcy54ICs9IHYueDtcbiAgICB0aGlzLnkgKz0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBzY2FsYXIgdmFsdWVzIHRvIHRoaXMgdmVjdG9yJ3MgY29tcG9uZW50cy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGEgLSBWYWx1ZSB0byBhZGQgdG8geC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGIgLSBWYWx1ZSB0byBhZGQgdG8geS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIGFkZFhZKGEsIGIpIHtcbiAgICB0aGlzLnggKz0gYTtcbiAgICB0aGlzLnkgKz0gYjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdHdvIHZlY3RvcnMgYW5kIHNldHMgdGhlIHJlc3VsdCB0byB0aGlzIHZlY3Rvci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gYSAtIFRoZSBmaXJzdCB2ZWN0b3IgdG8gYWRkLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBiIC0gVGhlIHNlY29uZCB2ZWN0b3IgdG8gYWRkLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgYWRkVmVjdG9ycyhhLCBiKSB7XG4gICAgdGhpcy54ID0gYS54ICsgYi54O1xuICAgIHRoaXMueSA9IGEueSArIGIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBhbm90aGVyIHZlY3RvciBmcm9tIHRoaXMgb25lLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIHZlY3RvciB0byBzdWJ0cmFjdC5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW3ddIC0gQW4gb3B0aW9uYWwgc2Vjb25kIHZlY3RvciB0byBzdWJ0cmFjdC5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIHN1Yih2LCB3KSB7XG4gICAgaWYgKHcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3ViVmVjdG9ycyh2LCB3KTtcbiAgICB9XG5cbiAgICB0aGlzLnggLT0gdi54O1xuICAgIHRoaXMueSAtPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIGFub3RoZXIgYW5kIHNldHMgdGhlIHJlc3VsdCB0byB0aGlzIHZlY3Rvci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gYSAtIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QgZnJvbS5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gYiAtIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBzdWJWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggLSBiLng7XG4gICAgdGhpcy55ID0gYS55IC0gYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGl2aWRlcyB0aGlzIHZlY3RvciBieSBhIHNjYWxhci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHMgLSBUaGUgc2NhbGFyIHRvIGRpdmlkZSBieS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIGRpdmlkZVNjYWxhcihzKSB7XG4gICAgaWYgKHMgIT09IDApIHtcbiAgICAgIHRoaXMueCAvPSBzO1xuICAgICAgdGhpcy55IC89IHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0KDAsIDApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGxpZXMgdGhpcyB2ZWN0b3IgYnkgYSBzY2FsYXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzIC0gVGhlIHNjYWxhciB0byBtdWx0aXBseSBieS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIG11bHRpcGx5U2NhbGFyKHMpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE5lZ2F0ZXMgdGhpcyB2ZWN0b3IgKGludmVydHMgaXRzIGRpcmVjdGlvbikuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBuZWdhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXIoLTEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIHdpdGggYW5vdGhlci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSBvdGhlciB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBkb3QgcHJvZHVjdC5cbiAgICovXG4gIGRvdCh2KSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIHNxdWFyZWQgbGVuZ3RoLlxuICAgKi9cbiAgbGVuZ3RoU3EoKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBsZW5ndGguXG4gICAqL1xuICBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgdGhpcyB2ZWN0b3IgKG1ha2VzIGl0IHVuaXQgbGVuZ3RoKS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIodGhpcy5sZW5ndGgoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgdG8gYW5vdGhlciB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgb3RoZXIgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZGlzdGFuY2UuXG4gICAqL1xuICBkaXN0YW5jZVRvKHYpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VUb1NxdWFyZWQodikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZXMgdGhpcyB2ZWN0b3IgYnkgYW4gYW5nbGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aGEgLSBUaGUgYW5nbGUgdG8gcm90YXRlIGJ5IChpbiByYWRpYW5zKS5cbiAgICogQHJldHVybnMge1ZlY3RvcjJEfSBUaGlzIHZlY3Rvci5cbiAgICovXG4gIHJvdGF0ZSh0aGEpIHtcbiAgICBjb25zdCB4ID0gdGhpcy54O1xuICAgIGNvbnN0IHkgPSB0aGlzLnk7XG5cbiAgICB0aGlzLnggPSB4ICogTWF0aC5jb3ModGhhKSArIHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHRoaXMueSA9IC14ICogTWF0aC5zaW4odGhhKSArIHkgKiBNYXRoLmNvcyh0aGEpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBkaXN0YW5jZSB0byBhbm90aGVyIHZlY3Rvci5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdiAtIFRoZSBvdGhlciB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBzcXVhcmVkIGRpc3RhbmNlLlxuICAgKi9cbiAgZGlzdGFuY2VUb1NxdWFyZWQodikge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gdi54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gdi55O1xuXG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmVhcmx5IGludGVycG9sYXRlcyB0aGlzIHZlY3RvciB0b3dhcmQgYW5vdGhlciB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHYgLSBUaGUgdGFyZ2V0IHZlY3Rvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGFscGhhIC0gVGhlIGludGVycG9sYXRpb24gZmFjdG9yICgwLTEpLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoaXMgdmVjdG9yLlxuICAgKi9cbiAgbGVycCh2LCBhbHBoYSkge1xuICAgIHRoaXMueCArPSAodi54IC0gdGhpcy54KSAqIGFscGhhO1xuICAgIHRoaXMueSArPSAodi55IC0gdGhpcy55KSAqIGFscGhhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoaXMgdmVjdG9yIGlzIGVxdWFsIHRvIGFub3RoZXIgdmVjdG9yLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIG90aGVyIHZlY3Rvci5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnggPT09IHRoaXMueCAmJiB2LnkgPT09IHRoaXMueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoaXMgdmVjdG9yIHRvIHplcm8uXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gVGhpcyB2ZWN0b3IuXG4gICAqL1xuICBjbGVhcigpIHtcbiAgICB0aGlzLnggPSAwLjA7XG4gICAgdGhpcy55ID0gMC4wO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgdmVjdG9yIHdpdGggdGhlIHNhbWUgeCBhbmQgeSB2YWx1ZXMgYXMgdGhpcyBvbmUuXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH0gQSBuZXcgVmVjdG9yMkQgaW5zdGFuY2UuXG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMueCwgdGhpcy55KTtcbiAgfVxufVxuIiwiaW1wb3J0IFJnYiBmcm9tIFwiLi4vdXRpbHMvUmdiXCI7XG5pbXBvcnQgUHVpZCBmcm9tIFwiLi4vdXRpbHMvUHVpZFwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuLi9tYXRoL2Vhc2VcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBhcnRpY2xlIGluIGEgcGFydGljbGUgc3lzdGVtLlxuICogQGNsYXNzIFBhcnRpY2xlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2xlIHtcbiAgLyoqIEB0eXBlIHtzdHJpbmd9IFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgcGFydGljbGUgKi9cbiAgaWQgPSBcIlwiO1xuXG4gIC8qKiBAdHlwZSB7e3A6VmVjdG9yMkQsdjpWZWN0b3IyRCxhOlZlY3RvcjJEfX0gT2xkIHN0YXRlIG9mIHRoZSBwYXJ0aWNsZSAqL1xuICBvbGQgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7b2JqZWN0fSBDdXN0b20gZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIHBhcnRpY2xlICovXG4gIGRhdGEgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7QmVoYXZpb3VyW119IEFycmF5IG9mIGJlaGF2aW91cnMgYXBwbGllZCB0byB0aGUgcGFydGljbGUgKi9cbiAgYmVoYXZpb3VycyA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gQ3VycmVudCBwb3NpdGlvbiBvZiB0aGUgcGFydGljbGUgKi9cbiAgcCA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gQ3VycmVudCB2ZWxvY2l0eSBvZiB0aGUgcGFydGljbGUgKi9cbiAgdiA9IG51bGw7XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gQ3VycmVudCBhY2NlbGVyYXRpb24gb2YgdGhlIHBhcnRpY2xlICovXG4gIGEgPSBudWxsO1xuXG4gIC8qKiBAdHlwZSB7UmdifSBDb2xvciBvZiB0aGUgcGFydGljbGUgKi9cbiAgcmdiID0gbnVsbDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBQYXJ0aWNsZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb25mXSBDb25maWd1cmF0aW9uIG9iamVjdCBmb3IgdGhlIHBhcnRpY2xlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgdGhpcy5uYW1lID0gXCJQYXJ0aWNsZVwiO1xuICAgIHRoaXMuaWQgPSBQdWlkLmlkKHRoaXMubmFtZSk7XG4gICAgdGhpcy5vbGQgPSB7fTtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB0aGlzLmJlaGF2aW91cnMgPSBbXTtcblxuICAgIHRoaXMucCA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMudiA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMuYSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLnAgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC52ID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQuYSA9IG5ldyBWZWN0b3IyRCgpO1xuXG4gICAgdGhpcy5yZ2IgPSBuZXcgUmdiKCk7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIGNvbmYgJiYgUHJvcFV0aWwuc2V0UHJvcCh0aGlzLCBjb25mKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHBhcnRpY2xlJ3MgbW92ZW1lbnQgaW4gZGVncmVlcy5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGRpcmVjdGlvbiBpbiBkZWdyZWVzXG4gICAqL1xuICBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy52LngsIC10aGlzLnYueSkgKiBNYXRoVXRpbC5OMTgwX1BJO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgcGFydGljbGUgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG4gICAqIEByZXR1cm5zIHtQYXJ0aWNsZX0gVGhlIHBhcnRpY2xlIGluc3RhbmNlXG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLmxpZmUgPSBJbmZpbml0eTtcbiAgICB0aGlzLmFnZSA9IDA7XG5cbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnNsZWVwID0gZmFsc2U7XG4gICAgdGhpcy5ib2R5ID0gbnVsbDtcbiAgICB0aGlzLnNwcml0ZSA9IG51bGw7XG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuXG4gICAgdGhpcy5lbmVyZ3kgPSAxOyAvLyBFbmVyZ3kgTG9zc1xuICAgIHRoaXMubWFzcyA9IDE7XG4gICAgdGhpcy5yYWRpdXMgPSAxMDtcbiAgICB0aGlzLmFscGhhID0gMTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICB0aGlzLmNvbG9yID0gbnVsbDtcblxuICAgIHRoaXMucC5zZXQoMCwgMCk7XG4gICAgdGhpcy52LnNldCgwLCAwKTtcbiAgICB0aGlzLmEuc2V0KDAsIDApO1xuICAgIHRoaXMub2xkLnAuc2V0KDAsIDApO1xuICAgIHRoaXMub2xkLnYuc2V0KDAsIDApO1xuICAgIHRoaXMub2xkLmEuc2V0KDAsIDApO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5lYXNlTGluZWFyO1xuXG4gICAgdGhpcy5yZ2IucmVzZXQoKTtcbiAgICBVdGlsLmVtcHR5T2JqZWN0KHRoaXMuZGF0YSk7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwYXJ0aWNsZSdzIHN0YXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSBUaGUgdGltZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHVwZGF0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBwYXJ0aWNsZSBpbiBpdHMgcGFyZW50IHN5c3RlbVxuICAgKi9cbiAgdXBkYXRlKHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgICAgdGhpcy5hcHBseUJlaGF2aW91cnModGltZSwgaW5kZXgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFnZSA8IHRoaXMubGlmZSkge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyh0aGlzLmFnZSAvIHRoaXMubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGFsbCBiZWhhdmlvdXJzIGF0dGFjaGVkIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIHRpbWUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB1cGRhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgcGFydGljbGUgaW4gaXRzIHBhcmVudCBzeXN0ZW1cbiAgICovXG4gIGFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYmVoYXZpb3Vyc1tpXSAmJiB0aGlzLmJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBUaGUgYmVoYXZpb3VyIHRvIGFkZFxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIHRoaXMuYmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XG5cbiAgICBpZiAoYmVoYXZpb3VyLmhhc093blByb3BlcnR5KFwicGFyZW50c1wiKSkgYmVoYXZpb3VyLnBhcmVudHMucHVzaCh0aGlzKTtcbiAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG11bHRpcGxlIGJlaGF2aW91cnMgdG8gdGhlIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cltdfSBiZWhhdmlvdXJzIEFuIGFycmF5IG9mIGJlaGF2aW91cnMgdG8gYWRkXG4gICAqL1xuICBhZGRCZWhhdmlvdXJzKGJlaGF2aW91cnMpIHtcbiAgICBjb25zdCBsZW5ndGggPSBiZWhhdmlvdXJzLmxlbmd0aDtcbiAgICBsZXQgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5hZGRCZWhhdmlvdXIoYmVoYXZpb3Vyc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBzcGVjaWZpYyBiZWhhdmlvdXIgZnJvbSB0aGUgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgVGhlIGJlaGF2aW91ciB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZUJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuYmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgYmVoYXZpb3VyID0gdGhpcy5iZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGJlaGF2aW91cnMgZnJvbSB0aGUgcGFydGljbGUuXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBwYXJ0aWNsZSwgcmVtb3ZpbmcgYWxsIGJlaGF2aW91cnMgYW5kIHNldHRpbmcgaXQgYXMgZGVhZC5cbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBAdHlwZWRlZiAge09iamVjdH0gcmdiT2JqZWN0XG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByIHJlZCB2YWx1ZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gZyBncmVlbiB2YWx1ZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gYiBibHVlIHZhbHVlXG4gICAqL1xuICAvKipcbiAgICogY29udmVydHMgYSBoZXggdmFsdWUgdG8gYSByZ2Igb2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBoZXhUb1JnYlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaCBhbnkgaGV4IHZhbHVlLCBlLmcuICMwMDAwMDAgb3IgMDAwMDAwIGZvciBibGFja1xuICAgKlxuICAgKiBAcmV0dXJuIHtyZ2JPYmplY3R9XG4gICAqL1xuICBoZXhUb1JnYihoKSB7XG4gICAgY29uc3QgaGV4MTYgPSBoLmNoYXJBdCgwKSA9PT0gXCIjXCIgPyBoLnN1YnN0cmluZygxLCA3KSA6IGg7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZygwLCAyKSwgMTYpO1xuICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoMiwgNCksIDE2KTtcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDQsIDYpLCAxNik7XG5cbiAgICByZXR1cm4geyByLCBnLCBiIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGEgcmdiIHZhbHVlIHRvIGEgcmdiIHN0cmluZ1xuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgcmdiVG9IZXhcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3QgfCBQcm90b24uaGV4VG9SZ2J9IHJnYiBhIHJnYiBvYmplY3QgbGlrZSBpbiB7QGxpbmsgUHJvdG9uI1Byb3Rvbi59XG4gICAqXG4gICAqIEByZXR1cm4ge1N0cmluZ30gcmdiKClcbiAgICovXG4gIHJnYlRvSGV4KHJiZykge1xuICAgIHJldHVybiBgcmdiKCR7cmJnLnJ9LCAke3JiZy5nfSwgJHtyYmcuYn0pYDtcbiAgfSxcblxuICBnZXRIZXgxNkZyb21QYXJ0aWNsZShwKSB7XG4gICAgcmV0dXJuIE51bWJlcihwLnJnYi5yKSAqIDY1NTM2ICsgTnVtYmVyKHAucmdiLmcpICogMjU2ICsgTnVtYmVyKHAucmdiLmIpO1xuICB9XG59O1xuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuL1ZlY3RvcjJEXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbGFyMkQge1xuICBjb25zdHJ1Y3RvcihyLCB0aGEpIHtcbiAgICB0aGlzLnIgPSBNYXRoLmFicyhyKSB8fCAwO1xuICAgIHRoaXMudGhhID0gdGhhIHx8IDA7XG4gIH1cblxuICBzZXQociwgdGhhKSB7XG4gICAgdGhpcy5yID0gcjtcbiAgICB0aGlzLnRoYSA9IHRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFIocikge1xuICAgIHRoaXMuciA9IHI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRUaGEodGhhKSB7XG4gICAgdGhpcy50aGEgPSB0aGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb3B5KHApIHtcbiAgICB0aGlzLnIgPSBwLnI7XG4gICAgdGhpcy50aGEgPSBwLnRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRvVmVjdG9yKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy5nZXRYKCksIHRoaXMuZ2V0WSgpKTtcbiAgfVxuXG4gIGdldFgoKSB7XG4gICAgcmV0dXJuIHRoaXMuciAqIE1hdGguc2luKHRoaXMudGhhKTtcbiAgfVxuXG4gIGdldFkoKSB7XG4gICAgcmV0dXJuIC10aGlzLnIgKiBNYXRoLmNvcyh0aGlzLnRoYSk7XG4gIH1cblxuICBub3JtYWxpemUoKSB7XG4gICAgdGhpcy5yID0gMTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVxdWFscyh2KSB7XG4gICAgcmV0dXJuIHYuciA9PT0gdGhpcy5yICYmIHYudGhhID09PSB0aGlzLnRoYTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuciA9IDAuMDtcbiAgICB0aGlzLnRoYSA9IDAuMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgUG9sYXIyRCh0aGlzLnIsIHRoaXMudGhhKTtcbiAgfVxufVxuIiwiY29uc3QgTWF0MyA9IHtcbiAgY3JlYXRlKG1hdDMpIHtcbiAgICBjb25zdCBtYXQgPSBuZXcgRmxvYXQzMkFycmF5KDkpO1xuICAgIGlmIChtYXQzKSB0aGlzLnNldChtYXQzLCBtYXQpO1xuXG4gICAgcmV0dXJuIG1hdDtcbiAgfSxcblxuICBzZXQobWF0MSwgbWF0Mikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSBtYXQyW2ldID0gbWF0MVtpXTtcblxuICAgIHJldHVybiBtYXQyO1xuICB9LFxuXG4gIG11bHRpcGx5KG1hdCwgbWF0MiwgbWF0Mykge1xuICAgIGxldCBhMDAgPSBtYXRbMF0sXG4gICAgICBhMDEgPSBtYXRbMV0sXG4gICAgICBhMDIgPSBtYXRbMl0sXG4gICAgICBhMTAgPSBtYXRbM10sXG4gICAgICBhMTEgPSBtYXRbNF0sXG4gICAgICBhMjAgPSBtYXRbNl0sXG4gICAgICBhMjEgPSBtYXRbN10sXG4gICAgICBiMDAgPSBtYXQyWzBdLFxuICAgICAgYjAxID0gbWF0MlsxXSxcbiAgICAgIGIwMiA9IG1hdDJbMl0sXG4gICAgICBiMTAgPSBtYXQyWzNdLFxuICAgICAgYjExID0gbWF0Mls0XSxcbiAgICAgIGIyMCA9IG1hdDJbNl0sXG4gICAgICBiMjEgPSBtYXQyWzddO1xuXG4gICAgbWF0M1swXSA9IGIwMCAqIGEwMCArIGIwMSAqIGExMDtcbiAgICBtYXQzWzFdID0gYjAwICogYTAxICsgYjAxICogYTExO1xuICAgIG1hdDNbMl0gPSBhMDIgKiBiMDI7XG4gICAgbWF0M1szXSA9IGIxMCAqIGEwMCArIGIxMSAqIGExMDtcbiAgICBtYXQzWzRdID0gYjEwICogYTAxICsgYjExICogYTExO1xuICAgIG1hdDNbNl0gPSBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBhMjA7XG4gICAgbWF0M1s3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGEyMTtcblxuICAgIHJldHVybiBtYXQzO1xuICB9LFxuXG4gIGludmVyc2UobWF0LCBtYXQzKSB7XG4gICAgbGV0IGEwMCA9IG1hdFswXSxcbiAgICAgIGEwMSA9IG1hdFsxXSxcbiAgICAgIGExMCA9IG1hdFszXSxcbiAgICAgIGExMSA9IG1hdFs0XSxcbiAgICAgIGEyMCA9IG1hdFs2XSxcbiAgICAgIGEyMSA9IG1hdFs3XSxcbiAgICAgIGIwMSA9IGExMSxcbiAgICAgIGIxMSA9IC1hMTAsXG4gICAgICBiMjEgPSBhMjEgKiBhMTAgLSBhMTEgKiBhMjAsXG4gICAgICBkID0gYTAwICogYjAxICsgYTAxICogYjExLFxuICAgICAgaWQ7XG5cbiAgICBpZCA9IDEgLyBkO1xuICAgIG1hdDNbMF0gPSBiMDEgKiBpZDtcbiAgICBtYXQzWzFdID0gLWEwMSAqIGlkO1xuICAgIG1hdDNbM10gPSBiMTEgKiBpZDtcbiAgICBtYXQzWzRdID0gYTAwICogaWQ7XG4gICAgbWF0M1s2XSA9IGIyMSAqIGlkO1xuICAgIG1hdDNbN10gPSAoLWEyMSAqIGEwMCArIGEwMSAqIGEyMCkgKiBpZDtcblxuICAgIHJldHVybiBtYXQzO1xuICB9LFxuXG4gIG11bHRpcGx5VmVjMihtLCB2ZWMsIG1hdDMpIHtcbiAgICBsZXQgeCA9IHZlY1swXSxcbiAgICAgIHkgPSB2ZWNbMV07XG5cbiAgICBtYXQzWzBdID0geCAqIG1bMF0gKyB5ICogbVszXSArIG1bNl07XG4gICAgbWF0M1sxXSA9IHggKiBtWzFdICsgeSAqIG1bNF0gKyBtWzddO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hdDM7XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5U3BhbiBleHRlbmRzIFNwYW4ge1xuICBjb25zdHJ1Y3Rvcihjb2xvcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYXJyID0gVXRpbC50b0FycmF5KGNvbG9yKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkge1xuICAgIGNvbnN0IHZhbCA9IFV0aWwuZ2V0UmFuZEZyb21BcnJheSh0aGlzLl9hcnIpO1xuICAgIHJldHVybiB2YWwgPT09IFwicmFuZG9tXCIgfHwgdmFsID09PSBcIlJhbmRvbVwiID8gTWF0aFV0aWwucmFuZG9tQ29sb3IoKSA6IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIHN1cmUgdGhhdCB0aGUgY29sb3IgaXMgYW4gaW5zdGFuY2Ugb2YgUHJvdG9uLkFycmF5U3BhbiwgaWYgbm90IGl0IG1ha2VzIGEgbmV3IGluc3RhbmNlXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0U3BhblZhbHVlXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIHN0YXRpYyBjcmVhdGVBcnJheVNwYW4oYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGFyciBpbnN0YW5jZW9mIEFycmF5U3BhbikgcmV0dXJuIGFycjtcbiAgICBlbHNlIHJldHVybiBuZXcgQXJyYXlTcGFuKGFycik7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICB0aGlzLndpZHRoID0gdztcbiAgICB0aGlzLmhlaWdodCA9IGg7XG5cbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLnggKyB0aGlzLndpZHRoO1xuICB9XG5cbiAgY29udGFpbnMoeCwgeSkge1xuICAgIGlmICh4IDw9IHRoaXMucmlnaHQgJiYgeCA+PSB0aGlzLnggJiYgeSA8PSB0aGlzLmJvdHRvbSAmJiB5ID49IHRoaXMueSkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5cbi8qKlxuICogUmF0ZSBjbGFzcyBmb3IgY29udHJvbGxpbmcgcGFydGljbGUgZW1pc3Npb24gcmF0ZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF0ZSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIG51bVBhbjtcblxuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aW1lUGFuO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhcnRUaW1lO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbmV4dFRpbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUmF0ZSBpbnN0YW5jZS5cbiAgICogVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgcGVyIHNlY29uZCBlbWlzc2lvbiAoYSBbcGFydGljbGVdL2IgW3NdKS5cbiAgICogQHBhcmFtIHtBcnJheXxudW1iZXJ8U3Bhbn0gW251bXBhbj0xXSAtIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIGZvciBlYWNoIGVtaXNzaW9uLlxuICAgKiBAcGFyYW0ge0FycmF5fG51bWJlcnxTcGFufSBbdGltZXBhbj0xXSAtIFRoZSB0aW1lIGludGVydmFsIGJldHdlZW4gZWFjaCBlbWlzc2lvbi5cbiAgICogQGV4YW1wbGVcbiAgICogLy8gQ3JlYXRlIGEgcmF0ZSBvZiAxMC0yMCBwYXJ0aWNsZXMgZXZlcnkgMC4xLTAuMjUgc2Vjb25kc1xuICAgKiBuZXcgUmF0ZShuZXcgU3BhbigxMCwgMjApLCBuZXcgU3BhbigwLjEsIDAuMjUpKTtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bXBhbiwgdGltZXBhbikge1xuICAgIHRoaXMubnVtUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUobnVtcGFuLCAxKSk7XG4gICAgdGhpcy50aW1lUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUodGltZXBhbiwgMSkpO1xuXG4gICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMubmV4dFRpbWUgPSAwO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSByYXRlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5uZXh0VGltZSA9IHRoaXMudGltZVBhbi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgdG8gZW1pdCBiYXNlZCBvbiB0aGUgZWxhcHNlZCB0aW1lLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFRoZSBlbGFwc2VkIHRpbWUgc2luY2UgdGhlIGxhc3QgdXBkYXRlLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyB0byBlbWl0LlxuICAgKi9cbiAgZ2V0VmFsdWUodGltZSkge1xuICAgIHRoaXMuc3RhcnRUaW1lICs9IHRpbWU7XG5cbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPj0gdGhpcy5uZXh0VGltZSkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgICAgdGhpcy5uZXh0VGltZSA9IHRoaXMudGltZVBhbi5nZXRWYWx1ZSgpO1xuXG4gICAgICBpZiAodGhpcy5udW1QYW4uYiA9PT0gMSkge1xuICAgICAgICBpZiAodGhpcy5udW1QYW4uZ2V0VmFsdWUoZmFsc2UpID4gMC41KSByZXR1cm4gMTtcbiAgICAgICAgZWxzZSByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm51bVBhbi5nZXRWYWx1ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5pdGlhbGl6ZSB7XG4gIHJlc2V0KCkge31cblxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUoZW1pdHRlcik7XG4gICAgfVxuICB9XG5cbiAgLy8gc3ViIGNsYXNzIGluaXRcbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHt9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbi8qKlxuICogTGlmZSBjbGFzcyBmb3IgaW5pdGlhbGl6aW5nIHBhcnRpY2xlIGxpZmV0aW1lLlxuICogQGV4dGVuZHMgSW5pdGlhbGl6ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWZlIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxpZmVQYW47XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IExpZmUgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IGEgLSBUaGUgbGlmZXRpbWUgdmFsdWUgb3IgdGhlIGxvd2VyIGJvdW5kIG9mIHRoZSBsaWZldGltZSByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtiXSAtIFRoZSB1cHBlciBib3VuZCBvZiB0aGUgbGlmZXRpbWUgcmFuZ2UgKGlmIGEgaXMgYSBudW1iZXIpLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjXSAtIFdoZXRoZXIgdG8gdXNlIGNlbnRlci1iYXNlZCBjYWxjdWxhdGlvbiAoaWYgYSBhbmQgYiBhcmUgbnVtYmVycykuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGlmZVBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTGlmZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBsaWZldGltZSBvZiBhIHRhcmdldCBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCAtIFRoZSB0YXJnZXQgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICovXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMubGlmZVBhbi5hID09PSBJbmZpbml0eSkgdGFyZ2V0LmxpZmUgPSBJbmZpbml0eTtcbiAgICBlbHNlIHRhcmdldC5saWZlID0gdGhpcy5saWZlUGFuLmdldFZhbHVlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52ZWN0b3IgPSBuZXcgVmVjdG9yMkQoMCwgMCk7XG4gICAgdGhpcy5yYW5kb20gPSAwO1xuICAgIHRoaXMuY3Jvc3NUeXBlID0gXCJkZWFkXCI7XG4gICAgdGhpcy5hbGVydCA9IHRydWU7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHt9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnZlY3RvciA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcG9pbnQgem9uZSBpbiBhIDJEIHNwYWNlLlxuICogQGV4dGVuZHMgWm9uZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUG9pbnRab25lLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKi9cbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMueCA9IHg7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwb3NpdGlvbiB2ZWN0b3IuXG4gICAqL1xuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54O1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBmb3IgUG9pbnRab25lLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgb2JqZWN0ICh1bnVzZWQpLlxuICAgKi9cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBQb2ludFpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zc2luZyBtZXRob2QhXCIpO1xuICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4uL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbi8qKlxuICogUG9zaXRpb24gY2xhc3MgZm9yIGluaXRpYWxpemluZyBwYXJ0aWNsZSBwb3NpdGlvbnMuXG4gKiBAZXh0ZW5kcyBJbml0aWFsaXplXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7UG9pbnRab25lfGFueX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHpvbmU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFBvc2l0aW9uIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge1BvaW50Wm9uZXxhbnl9IFt6b25lXSAtIFRoZSB6b25lIHRvIHVzZSBmb3IgcG9zaXRpb25pbmcuIERlZmF1bHRzIHRvIGEgbmV3IFBvaW50Wm9uZSBpZiBub3QgcHJvdmlkZWQuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih6b25lKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnpvbmUgPSBVdGlsLmluaXRWYWx1ZSh6b25lLCBuZXcgUG9pbnRab25lKCkpO1xuICAgIHRoaXMubmFtZSA9IFwiUG9zaXRpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhpcyBpbml0aWFsaXplcidzIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7UG9pbnRab25lfGFueX0gW3pvbmVdIC0gVGhlIG5ldyB6b25lIHRvIHVzZSBmb3IgcG9zaXRpb25pbmcuIERlZmF1bHRzIHRvIGEgbmV3IFBvaW50Wm9uZSBpZiBub3QgcHJvdmlkZWQuXG4gICAqL1xuICByZXNldCh6b25lKSB7XG4gICAgdGhpcy56b25lID0gVXRpbC5pbml0VmFsdWUoem9uZSwgbmV3IFBvaW50Wm9uZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGFydGljbGUncyBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0LnAgLSBUaGUgcGFydGljbGUncyBwb3NpdGlvbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXQucC54IC0gVGhlIHBhcnRpY2xlJ3MgeCBjb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0LnAueSAtIFRoZSBwYXJ0aWNsZSdzIHkgY29vcmRpbmF0ZS5cbiAgICovXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgdGhpcy56b25lLmdldFBvc2l0aW9uKCk7XG5cbiAgICB0YXJnZXQucC54ID0gdGhpcy56b25lLnZlY3Rvci54O1xuICAgIHRhcmdldC5wLnkgPSB0aGlzLnpvbmUudmVjdG9yLnk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm90b24gZnJvbSBcIi4uL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IFBvbGFyMkQgZnJvbSBcIi4uL21hdGgvUG9sYXIyRFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5cbi8qKlxuICogVmVsb2NpdHkgY2xhc3MgZm9yIGluaXRpYWxpemluZyBwYXJ0aWNsZSB2ZWxvY2l0aWVzLlxuICogQGV4dGVuZHMgSW5pdGlhbGl6ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWxvY2l0eSBleHRlbmRzIEluaXRpYWxpemUge1xuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByUGFuO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoYVBhbjtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgVmVsb2NpdHkgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFtycGFuXSAtIFRoZSByYWRpYWwgY29tcG9uZW50IG9mIHRoZSB2ZWxvY2l0eSBvciBpdHMgcmFuZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IFt0aGFwYW5dIC0gVGhlIGFuZ3VsYXIgY29tcG9uZW50IG9mIHRoZSB2ZWxvY2l0eSBvciBpdHMgcmFuZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT0ndmVjdG9yJ10gLSBUaGUgdHlwZSBvZiB2ZWxvY2l0eSAoJ3ZlY3Rvcicgb3IgJ3BvbGFyJykuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihycGFuLCB0aGFwYW4sIHR5cGUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUocnBhbik7XG4gICAgdGhpcy50aGFQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZSh0aGFwYW4pO1xuICAgIHRoaXMudHlwZSA9IFV0aWwuaW5pdFZhbHVlKHR5cGUsIFwidmVjdG9yXCIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJWZWxvY2l0eVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgdmVsb2NpdHkgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW3JwYW5dIC0gVGhlIHJhZGlhbCBjb21wb25lbnQgb2YgdGhlIHZlbG9jaXR5IG9yIGl0cyByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW3RoYXBhbl0gLSBUaGUgYW5ndWxhciBjb21wb25lbnQgb2YgdGhlIHZlbG9jaXR5IG9yIGl0cyByYW5nZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlPSd2ZWN0b3InXSAtIFRoZSB0eXBlIG9mIHZlbG9jaXR5ICgndmVjdG9yJyBvciAncG9sYXInKS5cbiAgICovXG4gIHJlc2V0KHJwYW4sIHRoYXBhbiwgdHlwZSkge1xuICAgIHRoaXMuclBhbiA9IFNwYW4uc2V0U3BhblZhbHVlKHJwYW4pO1xuICAgIHRoaXMudGhhUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUodGhhcGFuKTtcbiAgICB0aGlzLnR5cGUgPSBVdGlsLmluaXRWYWx1ZSh0eXBlLCBcInZlY3RvclwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemVzIHRoZSB2ZWxvY2l0eSB2YWx1ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHZyIC0gVGhlIHZlbG9jaXR5IHZhbHVlIHRvIG5vcm1hbGl6ZS5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5vcm1hbGl6ZWQgdmVsb2NpdHkgdmFsdWUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBub3JtYWxpemVWZWxvY2l0eSh2cikge1xuICAgIHJldHVybiB2ciAqIFByb3Rvbi5NRUFTVVJFO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwYXJ0aWNsZSdzIHZlbG9jaXR5LlxuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqL1xuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwicFwiIHx8IHRoaXMudHlwZSA9PT0gXCJQXCIgfHwgdGhpcy50eXBlID09PSBcInBvbGFyXCIpIHtcbiAgICAgIGNvbnN0IHBvbGFyMmQgPSBuZXcgUG9sYXIyRChcbiAgICAgICAgdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnJQYW4uZ2V0VmFsdWUoKSksXG4gICAgICAgIHRoaXMudGhhUGFuLmdldFZhbHVlKCkgKiBNYXRoVXRpbC5QSV8xODBcbiAgICAgICk7XG5cbiAgICAgIHRhcmdldC52LnggPSBwb2xhcjJkLmdldFgoKTtcbiAgICAgIHRhcmdldC52LnkgPSBwb2xhcjJkLmdldFkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LnYueCA9IHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy5yUGFuLmdldFZhbHVlKCkpO1xuICAgICAgdGFyZ2V0LnYueSA9IHRoaXMubm9ybWFsaXplVmVsb2NpdHkodGhpcy50aGFQYW4uZ2V0VmFsdWUoKSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbi8qKlxuICogTWFzcyBjbGFzcyBmb3IgaW5pdGlhbGl6aW5nIHBhcnRpY2xlIG1hc3MuXG4gKiBAZXh0ZW5kcyBJbml0aWFsaXplXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc3MgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbWFzc1BhbjtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgTWFzcyBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gYSAtIFRoZSBtYXNzIHZhbHVlIG9yIHRoZSBsb3dlciBib3VuZCBvZiB0aGUgbWFzcyByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtiXSAtIFRoZSB1cHBlciBib3VuZCBvZiB0aGUgbWFzcyByYW5nZSAoaWYgYSBpcyBhIG51bWJlcikuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NdIC0gV2hldGhlciB0byB1c2UgY2VudGVyLWJhc2VkIGNhbGN1bGF0aW9uIChpZiBhIGFuZCBiIGFyZSBudW1iZXJzKS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWFzc1BhbiA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiTWFzc1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBtYXNzIG9mIGEgdGFyZ2V0IHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IC0gVGhlIHRhcmdldCBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKi9cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHtcbiAgICB0YXJnZXQubWFzcyA9IHRoaXMubWFzc1Bhbi5nZXRWYWx1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbi8qKlxuICogUmFkaXVzIGNsYXNzIGZvciBpbml0aWFsaXppbmcgcGFydGljbGUgcmFkaXVzLlxuICogQGV4dGVuZHMgSW5pdGlhbGl6ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpdXMgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKi9cbiAgcmFkaXVzO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBSYWRpdXMgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IGEgLSBUaGUgcmFkaXVzIHZhbHVlIG9yIHRoZSBsb3dlciBib3VuZCBvZiB0aGUgcmFkaXVzIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2JdIC0gVGhlIHVwcGVyIGJvdW5kIG9mIHRoZSByYWRpdXMgcmFuZ2UgKGlmIGEgaXMgYSBudW1iZXIpLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjXSAtIFdoZXRoZXIgdG8gdXNlIGNlbnRlci1iYXNlZCBjYWxjdWxhdGlvbiAoaWYgYSBhbmQgYiBhcmUgbnVtYmVycykuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJhZGl1cyA9IFNwYW4uc2V0U3BhblZhbHVlKGEsIGIsIGMpO1xuICAgIHRoaXMubmFtZSA9IFwiUmFkaXVzXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoaXMgaW5pdGlhbGl6ZXIncyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBhIC0gVGhlIHJhZGl1cyB2YWx1ZSBvciB0aGUgbG93ZXIgYm91bmQgb2YgdGhlIHJhZGl1cyByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtiXSAtIFRoZSB1cHBlciBib3VuZCBvZiB0aGUgcmFkaXVzIHJhbmdlIChpZiBhIGlzIGEgbnVtYmVyKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbY10gLSBXaGV0aGVyIHRvIHVzZSBjZW50ZXItYmFzZWQgY2FsY3VsYXRpb24gKGlmIGEgYW5kIGIgYXJlIG51bWJlcnMpLlxuICAgKi9cbiAgcmVzZXQoYSwgYiwgYykge1xuICAgIHRoaXMucmFkaXVzID0gU3Bhbi5zZXRTcGFuVmFsdWUoYSwgYiwgYyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBhcnRpY2xlJ3MgcmFkaXVzLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplLlxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHRoaXMucmFkaXVzLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgPSBwYXJ0aWNsZS5yYWRpdXM7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG4vKipcbiAqIEJvZHkgY2xhc3MgZm9yIGluaXRpYWxpemluZyBwYXJ0aWNsZSBib2RpZXMuXG4gKiBAZXh0ZW5kcyBJbml0aWFsaXplXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvZHkgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheVNwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpbWFnZTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQm9keSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fEFycmF5U3Bhbn0gaW1hZ2UgLSBUaGUgaW1hZ2Ugc291cmNlIG9yIG9iamVjdCB0byB1c2UgZm9yIHRoZSBwYXJ0aWNsZSBib2R5LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3c9MjBdIC0gVGhlIHdpZHRoIG9mIHRoZSBwYXJ0aWNsZSBib2R5LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2hdIC0gVGhlIGhlaWdodCBvZiB0aGUgcGFydGljbGUgYm9keS4gRGVmYXVsdHMgdG8gdGhlIHdpZHRoIGlmIG5vdCBwcm92aWRlZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGltYWdlLCB3LCBoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnNldFNwYW5WYWx1ZShpbWFnZSk7XG4gICAgdGhpcy53ID0gVXRpbC5pbml0VmFsdWUodywgMjApO1xuICAgIHRoaXMuaCA9IFV0aWwuaW5pdFZhbHVlKGgsIHRoaXMudyk7XG4gICAgdGhpcy5uYW1lID0gXCJCb2R5XCI7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBhcnRpY2xlJ3MgYm9keS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgaW1hZ2VUYXJnZXQgPSB0aGlzLmltYWdlLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodHlwZW9mIGltYWdlVGFyZ2V0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0ge1xuICAgICAgICB3aWR0aDogdGhpcy53LFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaCxcbiAgICAgICAgc3JjOiBpbWFnZVRhcmdldCxcbiAgICAgICAgaXNJbm5lcjogdHJ1ZSxcbiAgICAgICAgaW5uZXI6IHRydWVcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBpbWFnZVRhcmdldDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc3BhbiB2YWx1ZSBmb3IgdGhlIGltYWdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R8QXJyYXlTcGFufSBpbWFnZSAtIFRoZSBpbWFnZSBzb3VyY2Ugb3Igb2JqZWN0IHRvIHNldCBhcyBzcGFuIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7QXJyYXlTcGFufSBUaGUgQXJyYXlTcGFuIGluc3RhbmNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0U3BhblZhbHVlKGltYWdlKSB7XG4gICAgcmV0dXJuIGltYWdlIGluc3RhbmNlb2YgQXJyYXlTcGFuID8gaW1hZ2UgOiBuZXcgQXJyYXlTcGFuKGltYWdlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi4vbWF0aC9lYXNlXCI7XG5cbi8qKlxuICogVGhlIEJlaGF2aW91ciBjbGFzcyBpcyB0aGUgYmFzZSBmb3IgdGhlIG90aGVyIEJlaGF2aW91clxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ciB7XG4gIHN0YXRpYyBpZCA9IDA7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBCZWhhdmlvdXIgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoZSBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlTGluZWFyJ10gLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmQsIGZvciBleGFtcGxlIGVhc2UuZWFzZU91dFF1YXJ0XG4gICAqL1xuICBjb25zdHJ1Y3RvcihsaWZlLCBlYXNpbmcpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgbGlmZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5saWZlID0gVXRpbC5pbml0VmFsdWUobGlmZSwgSW5maW5pdHkpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvblxuICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICB0aGlzLmVhc2luZyA9IGVhc2UuZ2V0RWFzaW5nKGVhc2luZyk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgY3VycmVudCBhZ2VcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuYWdlID0gMDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiZWhhdmlvdXIncyBjdXJyZW50IGVuZXJneVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5lbmVyZ3kgPSAxO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYmVoYXZpb3VyIGlzIGRlYWRcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiZWhhdmlvdXIncyBwYXJlbnQgZW1pdHRlcnNcbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5wYXJlbnRzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgdW5pcXVlIGlkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmlkID0gYEJlaGF2aW91cl8ke0JlaGF2aW91ci5pZCsrfWA7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmVoYXZpb3VyJ3MgbmFtZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5uYW1lID0gXCJCZWhhdmlvdXJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoaXMgYmVoYXZpb3VyJ3MgbmV3IGxpZmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2VMaW5lYXInXSAtIFRoaXMgYmVoYXZpb3VyJ3MgbmV3IGVhc2luZ1xuICAgKi9cbiAgcmVzZXQobGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5saWZlID0gVXRpbC5pbml0VmFsdWUobGlmZSwgSW5maW5pdHkpO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5nZXRFYXNpbmcoZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSBmb3JjZSBieSAxOjEwMFxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gZm9yY2UgLSBUaGUgZm9yY2UgdG8gbm9ybWFsaXplXG4gICAqIEByZXR1cm5zIHtQcm90b24uVmVjdG9yMkR9IFRoZSBub3JtYWxpemVkIGZvcmNlXG4gICAqL1xuICBub3JtYWxpemVGb3JjZShmb3JjZSkge1xuICAgIHJldHVybiBmb3JjZS5tdWx0aXBseVNjYWxhcihQcm90b24uTUVBU1VSRSk7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIGEgdmFsdWUgYnkgMToxMDBcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIG5vcm1hbGl6ZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbm9ybWFsaXplZCB2YWx1ZVxuICAgKi9cbiAgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgKiBQcm90b24uTUVBU1VSRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7fVxuXG4gIC8qKlxuICAgKiBDb21wdXRlIHRoZSBiZWhhdmlvdXIncyBsaWZlIGN5Y2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjYWxjdWxhdGUgZm9yXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBjYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5hZ2UgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB7XG4gICAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcocGFydGljbGUuYWdlIC8gcGFydGljbGUubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIHRvIGEgcGFydGljbGVcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBUaGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGlzIGJlaGF2aW91clxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFyZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5wYXJlbnRzW2ldLnJlbW92ZUJlaGF2aW91cih0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmVudHMubGVuZ3RoID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JjZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uRm9yY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihmeCwgZnksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG4gICAgdGhpcy5uYW1lID0gXCJGb3JjZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZngsIGZ5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuYS5hZGQodGhpcy5mb3JjZSk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbi8qKlxuICogQXR0cmFjdGlvbiBiZWhhdmlvciBmb3IgcGFydGljbGVzLlxuICogVGhpcyBiZWhhdmlvdXIgbWFrZXMgcGFydGljbGVzIGZvbGxvdyBhIHNwZWNpZmljIHRhcmdldCBwb3NpdGlvbi5cbiAqIEBleHRlbmRzIEJlaGF2aW91clxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyYWN0aW9uIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQXR0cmFjdGlvbi5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gLSBUaGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtmb3JjZT0xMDBdIC0gVGhlIHN0cmVuZ3RoIG9mIHRoZSBhdHRyYWN0aW9uIGZvcmNlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3JhZGl1cz0xMDAwXSAtIFRoZSByYWRpdXMgb2YgaW5mbHVlbmNlIGZvciB0aGUgYXR0cmFjdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoZSBsaWZlIHNwYW4gb2YgdGhpcyBiZWhhdmlvdXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nPSdlYXNlLmVhc2VMaW5lYXInXSAtIFRoZSBlYXNpbmcgZnVuY3Rpb24gZm9yIHRoaXMgYmVoYXZpb3VyLlxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IHBvc2l0aW9uIGZvciBhdHRyYWN0aW9uLlxuICAgICAqIEB0eXBlIHtWZWN0b3IyRH1cbiAgICAgKi9cbiAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gVXRpbC5pbml0VmFsdWUodGFyZ2V0UG9zaXRpb24sIG5ldyBWZWN0b3IyRCgpKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSByYWRpdXMgb2YgaW5mbHVlbmNlIGZvciB0aGUgYXR0cmFjdGlvbi5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucmFkaXVzID0gVXRpbC5pbml0VmFsdWUocmFkaXVzLCAxMDAwKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJlbmd0aCBvZiB0aGUgYXR0cmFjdGlvbiBmb3JjZS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzcXVhcmVkIHJhZGl1cyAoZm9yIG9wdGltaXphdGlvbikuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcblxuICAgIC8qKlxuICAgICAqIFRoZSBhdHRyYWN0aW9uIGZvcmNlIHZlY3Rvci5cbiAgICAgKiBAdHlwZSB7VmVjdG9yMkR9XG4gICAgICovXG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UgPSBuZXcgVmVjdG9yMkQoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGUgYXR0cmFjdGlvbiBmb3JjZS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGJlaGF2aW91ci5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiQXR0cmFjdGlvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gLSBUaGUgbmV3IGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZm9yY2U9MTAwXSAtIFRoZSBuZXcgc3RyZW5ndGggb2YgdGhlIGF0dHJhY3Rpb24gZm9yY2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcmFkaXVzPTEwMDBdIC0gVGhlIG5ldyByYWRpdXMgb2YgaW5mbHVlbmNlIGZvciB0aGUgYXR0cmFjdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoZSBuZXcgbGlmZSBzcGFuIG9mIHRoaXMgYmVoYXZpb3VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZS5lYXNlTGluZWFyJ10gLSBUaGUgbmV3IGVhc2luZyBmdW5jdGlvbiBmb3IgdGhpcyBiZWhhdmlvdXIuXG4gICAqL1xuICByZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IFV0aWwuaW5pdFZhbHVlKHRhcmdldFBvc2l0aW9uLCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5yYWRpdXMgPSBVdGlsLmluaXRWYWx1ZShyYWRpdXMsIDEwMDApO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhpcyBiZWhhdmlvdXIgdG8gYSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0by5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBUaGUgY3VycmVudCBzaW11bGF0aW9uIHRpbWUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgcGFydGljbGUuXG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UuY29weSh0aGlzLnRhcmdldFBvc2l0aW9uKTtcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5zdWIocGFydGljbGUucCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IHRoaXMuYXR0cmFjdGlvbkZvcmNlLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGhTcSA+IDAuMDAwMDQgJiYgdGhpcy5sZW5ndGhTcSA8IHRoaXMucmFkaXVzU3EpIHtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm5vcm1hbGl6ZSgpO1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMubGVuZ3RoU3EgLyB0aGlzLnJhZGl1c1NxKTtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm11bHRpcGx5U2NhbGFyKHRoaXMuZm9yY2UpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmFkZCh0aGlzLmF0dHJhY3Rpb25Gb3JjZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9tRHJpZnQgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBCZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBSYW5kb21EcmlmdFxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRYIFx0XHRcdFx0WCB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFkgIFx0XHRcdFx0WSB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSBcdFx0XHRcdEhvdyBtdWNoIGRlbGF5IHRoZSBkcmlmdCBzaG91bGQgaGF2ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSBUaGUgdGltZSBvZiB0aGUgZHJpZnRcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkcmlmdFgsIGRyaWZ0WSwgZGVsYXksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSk7XG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5hbWUgPSBcIlJhbmRvbURyaWZ0XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNSYW5kb21EcmlmdFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WCBcdFx0XHRcdFggdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRZICBcdFx0XHRcdFkgdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgXHRcdFx0XHRIb3cgbXVjaCBkZWxheSB0aGUgZHJpZnQgc2hvdWxkIGhhdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5wYW5Gb2NlID0gbmV3IFZlY3RvcjJEKGRyaWZ0WCwgZHJpZnRZKTtcbiAgICB0aGlzLnBhbkZvY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKHRoaXMucGFuRm9jZSk7XG4gICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUmFuZG9tRHJpZnRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuZGF0YS50aW1lICs9IHRpbWU7XG5cbiAgICBpZiAocGFydGljbGUuZGF0YS50aW1lID49IHRoaXMuZGVsYXkpIHtcbiAgICAgIHBhcnRpY2xlLmEuYWRkWFkoXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS54LCB0aGlzLnBhbkZvY2UueCksXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS55LCB0aGlzLnBhbkZvY2UueSlcbiAgICAgICk7XG5cbiAgICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRm9yY2UgZnJvbSBcIi4vRm9yY2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eSBleHRlbmRzIEZvcmNlIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5HcmF2aXR5XG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnIFx0XHRcdFx0XHRcdFx0R3Jhdml0eVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGcsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKDAsIGcsIGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5uYW1lID0gXCJHcmF2aXR5XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uR3Jhdml0eVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGcgXHRcdFx0XHRcdFx0XHRHcmF2aXR5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChnLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCgwLCBnLCBsaWZlLCBlYXNpbmcpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIGFmdGVyIGNvbGxpc2lvblxuICAgKlxuICAgKiBAY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcml0Y2xlfSBvdGhlclBhcnRpY2xlXG4gICAqL1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbGxpc2lvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZW1pdHRlciwgbWFzcywgY2FsbGJhY2ssIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5yZXNldChlbWl0dGVyLCBtYXNzLCBjYWxsYmFjayk7XG4gICAgdGhpcy5uZXdQb29sID0gW107XG4gICAgdGhpcy5wb29sID0gW107XG4gICAgdGhpcy5uYW1lID0gXCJDb2xsaXNpb25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sbGlzaW9uXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiB0byBtYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkVtaXR0ZXJ9IFx0W2VtaXR0ZXI9bnVsbF0gXHRcdHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gXHRcdFttYXNzPXRydWVdXG4gICAqIEBwYXJhbSB7Q2FsbGJhY2t9XHQgXHRbY2FsbGJhY2s9bnVsbF1cdFx0dGhlIGNhbGxiYWNrIGFmdGVyIHRoZSBjb2xsaXNpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRcdFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmVtaXR0ZXIgPSBVdGlsLmluaXRWYWx1ZShlbWl0dGVyLCBudWxsKTtcbiAgICB0aGlzLm1hc3MgPSBVdGlsLmluaXRWYWx1ZShtYXNzLCB0cnVlKTtcbiAgICB0aGlzLmNhbGxiYWNrID0gVXRpbC5pbml0VmFsdWUoY2FsbGJhY2ssIG51bGwpO1xuXG4gICAgdGhpcy5jb2xsaXNpb25Qb29sID0gW107XG4gICAgdGhpcy5kZWx0YSA9IG5ldyBWZWN0b3IyRCgpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sbGlzaW9uXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5lbWl0dGVyKSB7XG4gICAgICBVdGlsLnNsaWNlQXJyYXkodGhpcy5lbWl0dGVyLnBhcnRpY2xlcywgaW5kZXgsIHRoaXMubmV3UG9vbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFV0aWwuc2xpY2VBcnJheSh0aGlzLnBvb2wsIGluZGV4LCB0aGlzLm5ld1Bvb2wpO1xuICAgIH1cblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubmV3UG9vbC5sZW5ndGg7XG4gICAgbGV0IG90aGVyUGFydGljbGU7XG4gICAgbGV0IGxlbmd0aFNxO1xuICAgIGxldCBvdmVybGFwO1xuICAgIGxldCB0b3RhbE1hc3M7XG4gICAgbGV0IGF2ZXJhZ2VNYXNzMSwgYXZlcmFnZU1hc3MyO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBvdGhlclBhcnRpY2xlID0gdGhpcy5uZXdQb29sW2ldO1xuXG4gICAgICBpZiAob3RoZXJQYXJ0aWNsZSAhPT0gcGFydGljbGUpIHtcbiAgICAgICAgdGhpcy5kZWx0YS5jb3B5KG90aGVyUGFydGljbGUucCk7XG4gICAgICAgIHRoaXMuZGVsdGEuc3ViKHBhcnRpY2xlLnApO1xuXG4gICAgICAgIGxlbmd0aFNxID0gdGhpcy5kZWx0YS5sZW5ndGhTcSgpO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHBhcnRpY2xlLnJhZGl1cyArIG90aGVyUGFydGljbGUucmFkaXVzO1xuXG4gICAgICAgIGlmIChsZW5ndGhTcSA8PSBkaXN0YW5jZSAqIGRpc3RhbmNlKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IGRpc3RhbmNlIC0gTWF0aC5zcXJ0KGxlbmd0aFNxKTtcbiAgICAgICAgICBvdmVybGFwICs9IDAuNTtcblxuICAgICAgICAgIHRvdGFsTWFzcyA9IHBhcnRpY2xlLm1hc3MgKyBvdGhlclBhcnRpY2xlLm1hc3M7XG4gICAgICAgICAgYXZlcmFnZU1hc3MxID0gdGhpcy5tYXNzID8gb3RoZXJQYXJ0aWNsZS5tYXNzIC8gdG90YWxNYXNzIDogMC41O1xuICAgICAgICAgIGF2ZXJhZ2VNYXNzMiA9IHRoaXMubWFzcyA/IHBhcnRpY2xlLm1hc3MgLyB0b3RhbE1hc3MgOiAwLjU7XG5cbiAgICAgICAgICBwYXJ0aWNsZS5wLmFkZChcbiAgICAgICAgICAgIHRoaXMuZGVsdGFcbiAgICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgICAgIC5tdWx0aXBseVNjYWxhcihvdmVybGFwICogLWF2ZXJhZ2VNYXNzMSlcbiAgICAgICAgICApO1xuICAgICAgICAgIG90aGVyUGFydGljbGUucC5hZGQodGhpcy5kZWx0YS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihvdmVybGFwICogYXZlcmFnZU1hc3MyKSk7XG5cbiAgICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2socGFydGljbGUsIG90aGVyUGFydGljbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jvc3Nab25lIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIERlZmluZXMgd2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgY29tZSB0byB0aGUgZW5kIG9mIHRoZSBzcGVjaWZpZWQgem9uZVxuICAgKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3Jvc3Nab25lXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlpvbmV9IHpvbmUgXHRcdFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0XHRcdHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIHBhc3MgdGhlIHpvbmUgLSBhbGxvd2VkIHN0cmluZ3M6IGRlYWQgfCBib3VuZCB8IGNyb3NzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0W2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldCh6b25lLCBjcm9zc1R5cGUpO1xuICAgIHRoaXMubmFtZSA9IFwiQ3Jvc3Nab25lXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5ab25lfSB6b25lIFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0d2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgcGFzcyB0aGUgem9uZSAtIGFsbG93ZWQgc3RyaW5nczogZGVhZCB8IGJvdW5kIHwgY3Jvc3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIHRoaXMuem9uZS5jcm9zc1R5cGUgPSBVdGlsLmluaXRWYWx1ZShjcm9zc1R5cGUsIFwiZGVhZFwiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgdGhpcy56b25lLmNyb3NzaW5nKHBhcnRpY2xlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbi8qKlxuICogQWxwaGEgYmVoYXZpb3VyIGZvciBjb250cm9sbGluZyBwYXJ0aWNsZSBvcGFjaXR5IG92ZXIgdGltZS5cbiAqIEBleHRlbmRzIEJlaGF2aW91clxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHBoYSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNhbWU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTcGFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYTtcblxuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBiO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBBbHBoYSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2E9MV0gLSBUaGUgaW5pdGlhbCBhbHBoYSB2YWx1ZSBvciByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2JdIC0gVGhlIGZpbmFsIGFscGhhIHZhbHVlIG9yIHJhbmdlLiBJZiBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgdGhlIHNhbWUgYXMgJ2EnLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhpcyBiZWhhdmlvdXIncyBsaWZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhpcyBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIkFscGhhXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2E9MV0gLSBUaGUgaW5pdGlhbCBhbHBoYSB2YWx1ZSBvciByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2JdIC0gVGhlIGZpbmFsIGFscGhhIHZhbHVlIG9yIHJhbmdlLiBJZiBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgdGhlIHNhbWUgYXMgJ2EnLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmVdIC0gVGhpcyBiZWhhdmlvdXIncyBsaWZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZ10gLSBUaGlzIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvbi5cbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkO1xuICAgIHRoaXMuYSA9IFNwYW4uc2V0U3BhblZhbHVlKFV0aWwuaW5pdFZhbHVlKGEsIDEpKTtcbiAgICB0aGlzLmIgPSBTcGFuLnNldFNwYW5WYWx1ZShiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGFydGljbGUncyBhbHBoYSB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS5hbHBoYUEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0aGlzLnNhbWUpIHBhcnRpY2xlLmRhdGEuYWxwaGFCID0gcGFydGljbGUuZGF0YS5hbHBoYUE7XG4gICAgZWxzZSBwYXJ0aWNsZS5kYXRhLmFscGhhQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhlIGFscGhhIGJlaGF2aW91ciB0byB0aGUgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIGN1cnJlbnQgc2ltdWxhdGlvbiB0aW1lLlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHBhcnRpY2xlLlxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIHBhcnRpY2xlLmFscGhhID0gcGFydGljbGUuZGF0YS5hbHBoYUIgKyAocGFydGljbGUuZGF0YS5hbHBoYUEgLSBwYXJ0aWNsZS5kYXRhLmFscGhhQikgKiB0aGlzLmVuZXJneTtcblxuICAgIGlmIChwYXJ0aWNsZS5hbHBoYSA8IDAuMDAxKSBwYXJ0aWNsZS5hbHBoYSA9IDA7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG4vKipcbiAqIFNjYWxlIGJlaGF2aW91ciBmb3IgY29udHJvbGxpbmcgcGFydGljbGUgc2l6ZSBvdmVyIHRpbWUuXG4gKiBAZXh0ZW5kcyBCZWhhdmlvdXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NhbGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzYW1lO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbmFtZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBTY2FsZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2E9MV0gLSBUaGUgaW5pdGlhbCBzY2FsZSB2YWx1ZSBvciByYW5nZS5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gW2JdIC0gVGhlIGZpbmFsIHNjYWxlIHZhbHVlIG9yIHJhbmdlLiBJZiBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgdGhlIHNhbWUgYXMgJ2EnLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhpcyBiZWhhdmlvdXIncyBsaWZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhpcyBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChhLCBiKTtcbiAgICB0aGlzLm5hbWUgPSBcIlNjYWxlXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gYSAtIFRoZSBpbml0aWFsIHNjYWxlIHZhbHVlIG9yIHJhbmdlLlxuICAgKiBAcGFyYW0ge251bWJlcnxTcGFufSBbYl0gLSBUaGUgZmluYWwgc2NhbGUgdmFsdWUgb3IgcmFuZ2UuIElmIG5vdCBwcm92aWRlZCwgaXQgd2lsbCBiZSB0aGUgc2FtZSBhcyAnYScuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZV0gLSBUaGlzIGJlaGF2aW91cidzIGxpZmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nXSAtIFRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uLlxuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQ7XG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgMSkpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKGIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwYXJ0aWNsZSdzIHNjYWxlIHZhbHVlcy5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZS5cbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnNjYWxlQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuICAgIHBhcnRpY2xlLmRhdGEuc2NhbGVCID0gdGhpcy5zYW1lID8gcGFydGljbGUuZGF0YS5zY2FsZUEgOiB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSBzY2FsZSBiZWhhdmlvdXIgdG8gdGhlIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFRoZSBjdXJyZW50IHNpbXVsYXRpb24gdGltZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBwYXJ0aWNsZS5cbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuc2NhbGUgPSBwYXJ0aWNsZS5kYXRhLnNjYWxlQiArIChwYXJ0aWNsZS5kYXRhLnNjYWxlQSAtIHBhcnRpY2xlLmRhdGEuc2NhbGVCKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgaWYgKHBhcnRpY2xlLnNjYWxlIDwgMC4wMDAxKSBwYXJ0aWNsZS5zY2FsZSA9IDA7XG4gICAgcGFydGljbGUucmFkaXVzID0gcGFydGljbGUuZGF0YS5vbGRSYWRpdXMgKiBwYXJ0aWNsZS5zY2FsZTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbi8qKlxuICogUm90YXRlIGJlaGF2aW91ciBmb3IgY29udHJvbGxpbmcgcGFydGljbGUgcm90YXRpb24uXG4gKiBAZXh0ZW5kcyBCZWhhdmlvdXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2FtZTtcblxuICAvKipcbiAgICogQHR5cGUge1NwYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3Bhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGI7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdHlsZTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG5hbWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUm90YXRlIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8U3Bhbn0gW2luZmx1ZW5jZT0nVmVsb2NpdHknXSAtIFRoZSByb3RhdGlvbidzIGluZmx1ZW5jZSBvciBpbml0aWFsIHJvdGF0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8U3Bhbn0gW2JdIC0gVGhlIGZpbmFsIHJvdGF0aW9uIHZhbHVlIG9yIHJhbmdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0eWxlPSd0byddIC0gVGhlIHN0eWxlIG9mIHJvdGF0aW9uICgndG8nIG9yICdhZGQnKS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoaXMgYmVoYXZpb3VyJ3MgbGlmZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlYXNpbmc9J2Vhc2VMaW5lYXInXSAtIFRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5mbHVlbmNlLCBiLCBzdHlsZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoaW5mbHVlbmNlLCBiLCBzdHlsZSk7XG4gICAgdGhpcy5uYW1lID0gXCJSb3RhdGVcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8U3Bhbn0gW2E9J1ZlbG9jaXR5J10gLSBUaGUgcm90YXRpb24ncyBpbmZsdWVuY2Ugb3IgaW5pdGlhbCByb3RhdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfFNwYW59IFtiXSAtIFRoZSBmaW5hbCByb3RhdGlvbiB2YWx1ZSBvciByYW5nZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzdHlsZT0ndG8nXSAtIFRoZSBzdHlsZSBvZiByb3RhdGlvbiAoJ3RvJyBvciAnYWRkJykuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZV0gLSBUaGlzIGJlaGF2aW91cidzIGxpZmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZWFzaW5nXSAtIFRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nIGZ1bmN0aW9uLlxuICAgKi9cbiAgcmVzZXQoYSwgYiwgc3R5bGUsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgXCJWZWxvY2l0eVwiKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYiwgMCkpO1xuICAgIHRoaXMuc3R5bGUgPSBVdGlsLmluaXRWYWx1ZShzdHlsZSwgXCJ0b1wiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYXJ0aWNsZS5yb3RhdGlvbiAtIFRoZSBwYXJ0aWNsZSdzIHJvdGF0aW9uLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUuZGF0YSAtIFRoZSBwYXJ0aWNsZSdzIGRhdGEgb2JqZWN0LlxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICghdGhpcy5zYW1lKSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhpcyBiZWhhdmlvdXIgdG8gYSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gVGhlIGludGVncmF0ZSB0aW1lICgxL21zKS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIHBhcnRpY2xlIGluZGV4LlxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIGlmICghdGhpcy5zYW1lKSB7XG4gICAgICBpZiAodGhpcy5zdHlsZSA9PT0gXCJ0b1wiIHx8IHRoaXMuc3R5bGUgPT09IFwiVE9cIiB8fCB0aGlzLnN0eWxlID09PSBcIl9cIikge1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPVxuICAgICAgICAgIHBhcnRpY2xlLmRhdGEucm90YXRpb25CICsgKHBhcnRpY2xlLmRhdGEucm90YXRpb25BIC0gcGFydGljbGUuZGF0YS5yb3RhdGlvbkIpICogdGhpcy5lbmVyZ3k7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiArPSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuYS5hID09PSBcIlZcIiB8fCB0aGlzLmEuYSA9PT0gXCJWZWxvY2l0eVwiIHx8IHRoaXMuYS5hID09PSBcInZcIikge1xuICAgICAgLy8gYmV0YS4uLlxuICAgICAgcGFydGljbGUucm90YXRpb24gPSBwYXJ0aWNsZS5nZXREaXJlY3Rpb24oKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5Db2xvclxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IFthXSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gW2JdIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJDb2xvclwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGEgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5BcnJheVNwYW4gfCBTdHJpbmd9IGIgdGhlIHN0cmluZyBzaG91bGQgYmUgYSBoZXggZS5nLiAjMDAwMDAwIGZvciBibGFja1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuYSA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW4oYSk7XG4gICAgdGhpcy5iID0gQXJyYXlTcGFuLmNyZWF0ZUFycmF5U3BhbihiKTtcbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyJ3MgcGFyYW1ldGVycyBmb3IgYWxsIHBhcnRpY2xlc1xuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmNvbG9yID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5jb2xvckEgPSBDb2xvclV0aWwuaGV4VG9SZ2IocGFydGljbGUuY29sb3IpO1xuXG4gICAgaWYgKHRoaXMuYikgcGFydGljbGUuZGF0YS5jb2xvckIgPSBDb2xvclV0aWwuaGV4VG9SZ2IodGhpcy5iLmdldFZhbHVlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5iKSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLnIgKyAocGFydGljbGUuZGF0YS5jb2xvckEuciAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLnIpICogdGhpcy5lbmVyZ3k7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLmcgKyAocGFydGljbGUuZGF0YS5jb2xvckEuZyAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLmcpICogdGhpcy5lbmVyZ3k7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLmRhdGEuY29sb3JCLmIgKyAocGFydGljbGUuZGF0YS5jb2xvckEuYiAtIHBhcnRpY2xlLmRhdGEuY29sb3JCLmIpICogdGhpcy5lbmVyZ3k7XG5cbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUucmdiLnIgPDwgMDtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUucmdiLmcgPDwgMDtcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUucmdiLmIgPDwgMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5yO1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5nO1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQS5iO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuLi9tYXRoL01hdGhVdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmNvbnN0IENIQU5HSU5HID0gXCJjaGFuZ2luZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDeWNsb25lIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5DeWNsb25lXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYW5nbGUsIGZvcmNlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuICAgIHRoaXMuc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpO1xuICAgIHRoaXMubmFtZSA9IFwiQ3ljbG9uZVwiO1xuICB9XG5cbiAgc2V0QW5nbGVBbmRGb3JjZShhbmdsZSwgZm9yY2UpIHtcbiAgICB0aGlzLmZvcmNlID0gQ0hBTkdJTkc7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcblxuICAgIGlmIChhbmdsZSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gTWF0aFV0aWwuUEkgLyAyO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgPT09IFwibGVmdFwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gLU1hdGhVdGlsLlBJIC8gMjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICB0aGlzLmFuZ2xlID0gXCJyYW5kb21cIjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlIGluc3RhbmNlb2YgU3Bhbikge1xuICAgICAgdGhpcy5hbmdsZSA9IFwic3BhblwiO1xuICAgICAgdGhpcy5zcGFuID0gYW5nbGU7XG4gICAgfSBlbHNlIGlmIChhbmdsZSkge1xuICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJjaGFuZ2luZ1wiIHx8XG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiY2hhbmdcIiB8fFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImF1dG9cIlxuICAgICkge1xuICAgICAgdGhpcy5mb3JjZSA9IENIQU5HSU5HO1xuICAgIH0gZWxzZSBpZiAoZm9yY2UpIHtcbiAgICAgIHRoaXMuZm9yY2UgPSBmb3JjZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3ljbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGFuZ2xlLCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcbiAgICB0aGlzLnNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKTtcbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYW5nbGUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIHBhcnRpY2xlLmRhdGEuY2FuZ2xlID0gTWF0aFV0aWwucmFuZG9tQVRvQigtTWF0aFV0aWwuUEksIE1hdGhVdGlsLlBJKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5nbGUgPT09IFwic3BhblwiKSB7XG4gICAgICBwYXJ0aWNsZS5kYXRhLmNhbmdsZSA9IHRoaXMuc3Bhbi5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIHBhcnRpY2xlLmRhdGEuY3ljbG9uZSA9IG5ldyBWZWN0b3IyRCgwLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3ljbG9uZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgbGV0IGxlbmd0aDtcbiAgICBsZXQgZ3JhZGllbnQgPSBwYXJ0aWNsZS52LmdldEdyYWRpZW50KCk7XG4gICAgaWYgKHRoaXMuYW5nbGUgPT09IFwicmFuZG9tXCIgfHwgdGhpcy5hbmdsZSA9PT0gXCJzcGFuXCIpIHtcbiAgICAgIGdyYWRpZW50ICs9IHBhcnRpY2xlLmRhdGEuY2FuZ2xlO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmFkaWVudCArPSB0aGlzLmFuZ2xlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvcmNlID09PSBDSEFOR0lORykge1xuICAgICAgbGVuZ3RoID0gcGFydGljbGUudi5sZW5ndGgoKSAvIDEwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdGhpcy5mb3JjZTtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUueCA9IGxlbmd0aCAqIE1hdGguY29zKGdyYWRpZW50KTtcbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUueSA9IGxlbmd0aCAqIE1hdGguc2luKGdyYWRpZW50KTtcbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKHBhcnRpY2xlLmRhdGEuY3ljbG9uZSk7XG4gICAgcGFydGljbGUuYS5hZGQocGFydGljbGUuZGF0YS5jeWNsb25lKTtcbiAgfVxufVxuIiwiaW1wb3J0IEF0dHJhY3Rpb24gZnJvbSBcIi4vQXR0cmFjdGlvblwiO1xuXG4vKipcbiAqIFRoZSBvcHBvc2l0ZSBvZiBBdHRyYWN0aW9uIC0gdHVybnMgdGhlIGZvcmNlXG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBQcm90b24uQXR0cmFjdGlvblxuICogQG1lbWJlcm9mISBQcm90b24jXG4gKiBAYWxpYXMgUHJvdG9uLlJlcHVsc2lvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXB1bHNpb24gZXh0ZW5kcyBBdHRyYWN0aW9uIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUmVwdWxzaW9uIGJlaGF2aW91ciBpbnN0YW5jZVxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIC0gVGhlIHJlcHVsc2lvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW2ZvcmNlPTEwMF0gLSBUaGUgc3RyZW5ndGggb2YgdGhlIHJlcHVsc2lvbiBmb3JjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW3JhZGl1cz0xMDAwXSAtIFRoZSByYWRpdXMgb2YgaW5mbHVlbmNlIGZvciB0aGUgcmVwdWxzaW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGUgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhlIGJlaGF2aW91cidzIGVhc2luZyBmdW5jdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHN0cmVuZ3RoIG9mIHRoZSByZXB1bHNpb24gZm9yY2VcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuZm9yY2UgKj0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcIlJlcHVsc2lvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gLSBUaGUgbmV3IHJlcHVsc2lvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW2ZvcmNlPTEwMF0gLSBUaGUgbmV3IHN0cmVuZ3RoIG9mIHRoZSByZXB1bHNpb24gZm9yY2VcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtyYWRpdXM9MTAwMF0gLSBUaGUgbmV3IHJhZGl1cyBvZiBpbmZsdWVuY2UgZm9yIHRoZSByZXB1bHNpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIFRoZSBuZXcgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vhc2luZz0nZWFzZUxpbmVhciddIC0gVGhlIG5ldyBiZWhhdmlvdXIncyBlYXNpbmcgZnVuY3Rpb25cbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5V2VsbCBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIEJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIEdyYXZpdHlXZWxsXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFtjZW50ZXJQb2ludD1uZXcgVmVjdG9yMkRdIFRoZSBwb2ludCBpbiB0aGUgY2VudGVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVx0XHRcdFx0XHRUaGUgZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XVx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNlbnRlclBvaW50LCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkdyYXZpdHlXZWxsXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNHcmF2aXR5V2VsbFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW2NlbnRlclBvaW50PW5ldyBWZWN0b3IyRF0gVGhlIHBvaW50IGluIHRoZSBjZW50ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXHRcdFx0XHRcdFRoZSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChjZW50ZXJQb2ludCwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQGluaGVyaXRkb2NcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI0dyYXZpdHlXZWxsXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5kaXN0YW5jZVZlYy5zZXQodGhpcy5jZW50ZXJQb2ludC54IC0gcGFydGljbGUucC54LCB0aGlzLmNlbnRlclBvaW50LnkgLSBwYXJ0aWNsZS5wLnkpO1xuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAoZGlzdGFuY2VTcSAhPT0gMCkge1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aCgpO1xuICAgICAgY29uc3QgZmFjdG9yID0gKHRoaXMuZm9yY2UgKiB0aW1lKSAvIChkaXN0YW5jZVNxICogZGlzdGFuY2UpO1xuXG4gICAgICBwYXJ0aWNsZS52LnggKz0gZmFjdG9yICogdGhpcy5kaXN0YW5jZVZlYy54O1xuICAgICAgcGFydGljbGUudi55ICs9IGZhY3RvciAqIHRoaXMuZGlzdGFuY2VWZWMueTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRpYWxpemUoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemVzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gaW5pdGlhbGl6ZXMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaW5pdGlhbGl6ZXNbaV0gaW5zdGFuY2VvZiBJbml0aWFsaXplKSB7XG4gICAgICAgIGluaXRpYWxpemVzW2ldLmluaXQoZW1pdHRlciwgcGFydGljbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSk7XG4gIH0sXG5cbiAgLy8gaW5pdFxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplKSB7XG4gICAgUHJvcFV0aWwuc2V0UHJvcChwYXJ0aWNsZSwgaW5pdGlhbGl6ZSk7XG4gICAgUHJvcFV0aWwuc2V0VmVjdG9yVmFsKHBhcnRpY2xlLCBpbml0aWFsaXplKTtcbiAgfSxcblxuICBiaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmIChlbWl0dGVyLmJpbmRFbWl0dGVyKSB7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChlbWl0dGVyLnApO1xuICAgICAgcGFydGljbGUudi5hZGQoZW1pdHRlci52KTtcbiAgICAgIHBhcnRpY2xlLmEuYWRkKGVtaXR0ZXIuYSk7XG4gICAgICBwYXJ0aWNsZS52LnJvdGF0ZShNYXRoVXRpbC5kZWdyZWVUcmFuc2Zvcm0oZW1pdHRlci5yb3RhdGlvbikpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUHVpZCBmcm9tIFwiLi4vdXRpbHMvUHVpZFwiO1xuaW1wb3J0IFBhcnRpY2xlIGZyb20gXCIuLi9jb3JlL1BhcnRpY2xlXCI7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCI7XG5cbmltcG9ydCBSYXRlIGZyb20gXCIuLi9pbml0aWFsaXplL1JhdGVcIjtcbmltcG9ydCBJbml0aWFsaXplVXRpbCBmcm9tIFwiLi4vaW5pdGlhbGl6ZS9Jbml0aWFsaXplVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWl0dGVyIGV4dGVuZHMgUGFydGljbGUge1xuICAvKipcbiAgICogWW91IGNhbiB1c2UgdGhpcyBlbWl0IHBhcnRpY2xlcy5cbiAgICpcbiAgICogSXQgd2lsbCBkaXNwYXRjaCBmb2xsb3cgZXZlbnRzOlxuICAgKiBQQVJUSUNMRV9DUkVBVEVEXG4gICAqIFBBUlRJQ0xFX1VQREFUQVxuICAgKiBQQVJUSUNMRV9ERUFEXG4gICAqXG4gICAqIEBjbGFzcyBFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqIGZvciBleGFtcGxlIHtkYW1waW5nOjAuMDEsYmluZEVtaXR0ZXI6ZmFsc2V9XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mID0ge30pIHtcbiAgICBzdXBlcihjb25mKTtcblxuICAgIHRoaXMucGFydGljbGVzID0gW107XG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XG4gICAgdGhpcy5pbml0aWFsaXplcyA9IFtdO1xuXG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy5lbWl0U3BlZWQgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnJpY3Rpb24gY29lZmZpY2llbnQgZm9yIGFsbCBwYXJ0aWNsZSBlbWl0IGJ5IFRoaXM7XG4gICAgICogQHByb3BlcnR5IGRhbXBpbmdcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBkZWZhdWx0IDAuMDA2XG4gICAgICovXG4gICAgdGhpcy5kYW1waW5nID0gMC4wMDY7XG5cbiAgICAvKipcbiAgICAgKiBJZiBiaW5kRW1pdHRlciB0aGUgcGFydGljbGVzIGNhbiBiaW5kIHRoaXMgZW1pdHRlcidzIHByb3BlcnR5O1xuICAgICAqIEBwcm9wZXJ0eSBiaW5kRW1pdHRlclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICB0aGlzLmJpbmRFbWl0dGVyID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHBlciBzZWNvbmQgZW1pdCAoYSBbcGFydGljbGVdL2IgW3NdKTtcbiAgICAgKiBAcHJvcGVydHkgcmF0ZVxuICAgICAqIEB0eXBlIHtSYXRlfVxuICAgICAqIEBkZWZhdWx0IFJhdGUoMSwgLjEpXG4gICAgICovXG4gICAgdGhpcy5yYXRlID0gbmV3IFJhdGUoMSwgMC4xKTtcblxuICAgIHRoaXMubmFtZSA9IFwiRW1pdHRlclwiO1xuICAgIHRoaXMuaWQgPSBQdWlkLmlkKHRoaXMubmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICogQHBhcmFtIHtOdW1iZXIgfCBTdHJpbmd9IFt0b3RhbFRpbWVdIGJlZ2luIGVtaXQgdGltZTtcbiAgICogQHBhcmFtIHtTdHJpbmcgfCBib29sZWFufSBbbGlmZV0gdGhlIGxpZmUgb2YgdGhpcyBlbWl0dGVyXG4gICAqL1xuICBlbWl0KHRvdGFsVGltZSwgbGlmZSkge1xuICAgIHRoaXMuc3RvcGVkID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy50b3RhbFRpbWUgPSBVdGlsLmluaXRWYWx1ZSh0b3RhbFRpbWUsIEluZmluaXR5KTtcblxuICAgIGlmIChsaWZlID09PSB0cnVlIHx8IGxpZmUgPT09IFwibGlmZVwiIHx8IGxpZmUgPT09IFwiZGVzdHJveVwiKSB7XG4gICAgICB0aGlzLmxpZmUgPSB0b3RhbFRpbWUgPT09IFwib25jZVwiID8gMSA6IHRoaXMudG90YWxUaW1lO1xuICAgIH0gZWxzZSBpZiAoIWlzTmFOKGxpZmUpKSB7XG4gICAgICB0aGlzLmxpZmUgPSBsaWZlO1xuICAgIH1cbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnN0b3BlZCA9IHRydWU7XG4gIH1cblxuICBwcmVFbWl0KHRpbWUpIHtcbiAgICBsZXQgb2xkU3RvcGVkID0gdGhpcy5zdG9wZWQ7XG4gICAgbGV0IG9sZEVtaXRUaW1lID0gdGhpcy5lbWl0VGltZTtcbiAgICBsZXQgb2xkVG90YWxUaW1lID0gdGhpcy50b3RhbFRpbWU7XG5cbiAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxUaW1lID0gdGltZTtcbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuXG4gICAgY29uc3Qgc3RlcCA9IDAuMDE2NztcbiAgICB3aGlsZSAodGltZSA+IHN0ZXApIHtcbiAgICAgIHRpbWUgLT0gc3RlcDtcbiAgICAgIHRoaXMudXBkYXRlKHN0ZXApO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcGVkID0gb2xkU3RvcGVkO1xuICAgIHRoaXMuZW1pdFRpbWUgPSBvbGRFbWl0VGltZSArIE1hdGgubWF4KHRpbWUsIDApO1xuICAgIHRoaXMudG90YWxUaW1lID0gb2xkVG90YWxUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBjdXJyZW50IGFsbCBwYXJ0aWNsZXNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIHJlbW92ZUFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgaW5pdGlhbGl6ZSB0byB0aGlzIGVtaXR0ZXJcbiAgICogQG1ldGhvZCBhZGRTZWxmSW5pdGlhbGl6ZVxuICAgKi9cbiAgYWRkU2VsZkluaXRpYWxpemUoaW5pdGlhbGl6ZSkge1xuICAgIGlmIChpbml0aWFsaXplW1wiaW5pdFwiXSkge1xuICAgICAgaW5pdGlhbGl6ZS5pbml0KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmluaXRBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBJbml0aWFsaXplIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgaW5pdGlhbGl6ZXMgYXJyYXk6Zm9yIGV4YW1wbGUgZW1pdHRlci5hZGRJbml0aWFsaXplKGluaXRpYWxpemUxLGluaXRpYWxpemUyLGluaXRpYWxpemUzKTtcbiAgICogQG1ldGhvZCBhZGRJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBsaWtlIHRoaXMgbmV3IFJhZGl1cygxLCAxMilcbiAgICovXG4gIGFkZEluaXRpYWxpemUoLi4ucmVzdCkge1xuICAgIGxldCBpID0gcmVzdC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5pbml0aWFsaXplcy5wdXNoKHJlc3RbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgSW5pdGlhbGl6ZVxuICAgKiBAbWV0aG9kIHJlbW92ZUluaXRpYWxpemVcbiAgICogQHBhcmFtIHtJbml0aWFsaXplfSBpbml0aWFsaXplIGEgaW5pdGlhbGl6ZVxuICAgKi9cbiAgcmVtb3ZlSW5pdGlhbGl6ZShpbml0aWFsaXplcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbml0aWFsaXplcy5pbmRleE9mKGluaXRpYWxpemVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5pbml0aWFsaXplcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgSW5pdGlhbGl6ZXNcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplcnNcbiAgICovXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5pbml0aWFsaXplcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gcGFydGljbGVzO1xuICAgKlxuICAgKiB5b3UgY2FuIHVzZSBCZWhhdmlvdXJzIGFycmF5OmVtaXR0ZXIuYWRkQmVoYXZpb3VyKEJlaGF2aW91cjEsQmVoYXZpb3VyMixCZWhhdmlvdXIzKTtcbiAgICogQG1ldGhvZCBhZGRCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBsaWtlIHRoaXMgbmV3IENvbG9yKCdyYW5kb20nKVxuICAgKi9cbiAgYWRkQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IGJlaGF2aW91ciA9IHJlc3RbaV07XG4gICAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgaWYgKGJlaGF2aW91ci5wYXJlbnRzKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEJlaGF2aW91clxuICAgKiBAbWV0aG9kIHJlbW92ZUJlaGF2aW91clxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIGEgYmVoYXZpb3VyXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcbiAgICB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykge1xuICAgICAgaW5kZXggPSBiZWhhdmlvdXIucGFyZW50cy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgICBiZWhhdmlvdXIucGFyZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIGJlaGF2aW91cnNcbiAgICogQG1ldGhvZCByZW1vdmVBbGxCZWhhdmlvdXJzXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZW1wdHlBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuICB9XG5cbiAgLy8gZW1pdHRlciB1cGRhdGVcbiAgdXBkYXRlKHRpbWUpIHtcbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB0aGlzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZW1pdHRpbmcodGltZSk7XG4gICAgdGhpcy5pbnRlZ3JhdGUodGltZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUodGltZSkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGRhbXBpbmcgPSAxIC0gdGhpcy5kYW1waW5nO1xuICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIGxldCBpLCBwYXJ0aWNsZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xuXG4gICAgICAvLyBwYXJ0aWNsZSB1cGRhdGVcbiAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0aW1lLCBpKTtcbiAgICAgIHRoaXMucGFyZW50LmludGVncmF0b3IuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goXCJQQVJUSUNMRV9VUERBVEVcIiwgcGFydGljbGUpO1xuXG4gICAgICAvLyBjaGVjayBkZWFkXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfREVBRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCkge1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gICAgdGhpcy5iaW5kRXZlbnQgJiYgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICB9XG5cbiAgZW1pdHRpbmcodGltZSkge1xuICAgIGlmICh0aGlzLnN0b3BlZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMudG90YWxUaW1lID09PSBcIm5vbmVcIikge1xuICAgICAgdGhpcy5lbWl0VGltZSArPSB0aW1lO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbFRpbWUgPT09IFwib25jZVwiKSB7XG4gICAgICBsZXQgaTtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmF0ZS5nZXRWYWx1ZSg5OTk5OSk7XG5cbiAgICAgIGlmIChsZW5ndGggPiAwKSB0aGlzLmVtaXRTcGVlZCA9IGxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgdGhpcy50b3RhbFRpbWUgPSBcIm5vbmVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0VGltZSArPSB0aW1lO1xuXG4gICAgICBpZiAodGhpcy5lbWl0VGltZSA8IHRoaXMudG90YWxUaW1lKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmF0ZS5nZXRWYWx1ZSh0aW1lKTtcbiAgICAgICAgbGV0IGk7XG5cbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHRoaXMuY3JlYXRlUGFydGljbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlIHNpbmdsZSBwYXJ0aWNsZTtcbiAgICpcbiAgICogY2FuIHVzZSBlbWl0KHt4OjEwfSxuZXcgR3Jhdml0eSgxMCkseydwYXJ0aWNsZVVwZGF0ZScsZnVufSkgb3IgZW1pdChbe3g6MTB9LG5ldyBJbml0aWFsaXplXSxuZXcgR3Jhdml0eSgxMCkseydwYXJ0aWNsZVVwZGF0ZScsZnVufSlcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIGNyZWF0ZVBhcnRpY2xlKGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJlbnQucG9vbC5nZXQoUGFydGljbGUpO1xuICAgIHRoaXMuc2V0dXBQYXJ0aWNsZShwYXJ0aWNsZSwgaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKTtcbiAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICByZXR1cm4gcGFydGljbGU7XG4gIH1cblxuICBzZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpIHtcbiAgICBsZXQgaW5pdGlhbGl6ZXMgPSB0aGlzLmluaXRpYWxpemVzO1xuICAgIGxldCBiZWhhdmlvdXJzID0gdGhpcy5iZWhhdmlvdXJzO1xuXG4gICAgaWYgKGluaXRpYWxpemUpIGluaXRpYWxpemVzID0gVXRpbC50b0FycmF5KGluaXRpYWxpemUpO1xuICAgIGlmIChiZWhhdmlvdXIpIGJlaGF2aW91cnMgPSBVdGlsLnRvQXJyYXkoYmVoYXZpb3VyKTtcblxuICAgIHBhcnRpY2xlLnJlc2V0KCk7XG4gICAgSW5pdGlhbGl6ZVV0aWwuaW5pdGlhbGl6ZSh0aGlzLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXMpO1xuICAgIHBhcnRpY2xlLmFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycyk7XG4gICAgcGFydGljbGUucGFyZW50ID0gdGhpcztcblxuICAgIHRoaXMucGFydGljbGVzLnB1c2gocGFydGljbGUpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnBhcnRpY2xlcyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIEVtaXR0ZXJcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnJlbW92ZUFsbEluaXRpYWxpemVycygpO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnJlbW92ZUVtaXR0ZXIodGhpcyk7XG5cbiAgICB0aGlzLnJhdGUgPSBudWxsO1xuICAgIHRoaXMub2xkID0gbnVsbDtcbiAgICB0aGlzLnJnYiA9IG51bGw7XG4gICAgdGhpcy52ID0gbnVsbDtcbiAgICB0aGlzLmEgPSBudWxsO1xuICAgIHRoaXMucCA9IG51bGw7XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoRW1pdHRlcik7XG4iLCJpbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ckVtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBCZWhhdmlvdXJFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBCZWhhdmlvdXJFbWl0dGVyIHlvdSBjYW4gYWRkIGJlaGF2aW91cnMgdG8gc2VsZjtcbiAgICogQGNsYXNzIFByb3Rvbi5CZWhhdmlvdXJFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnNlbGZCZWhhdmlvdXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gZW1pdHRlcjtcbiAgICpcbiAgICogeW91IGNhbiB1c2UgQmVoYXZpb3VycyBhcnJheTplbWl0dGVyLmFkZFNlbGZCZWhhdmlvdXIoQmVoYXZpb3VyMSxCZWhhdmlvdXIyLEJlaGF2aW91cjMpO1xuICAgKiBAbWV0aG9kIGFkZFNlbGZCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtQcm90b24uQmVoYXZpb3VyfSBiZWhhdmlvdXIgbGlrZSB0aGlzIG5ldyBQcm90b24uQ29sb3IoJ3JhbmRvbScpXG4gICAqL1xuICBhZGRTZWxmQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSxcbiAgICAgIGxlbmd0aCA9IHJlc3QubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmVoYXZpb3VyID0gcmVzdFtpXTtcbiAgICAgIHRoaXMuc2VsZkJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgQmVoYXZpb3VyIGZvciBzZWxmXG4gICAqIEBtZXRob2QgcmVtb3ZlU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBhIGJlaGF2aW91clxuICAgKi9cbiAgcmVtb3ZlU2VsZkJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZkJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLnNlbGZCZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICB1cGRhdGUodGltZSkge1xuICAgIHN1cGVyLnVwZGF0ZSh0aW1lKTtcblxuICAgIGlmICghdGhpcy5zbGVlcCkge1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgICBsZXQgaTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc2VsZkJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vRW1pdHRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2xsb3dFbWl0dGVyIGV4dGVuZHMgRW1pdHRlciB7XG4gIC8qKlxuICAgKiBUaGUgRm9sbG93RW1pdHRlciBjbGFzcyBpbmhlcml0cyBmcm9tIFByb3Rvbi5FbWl0dGVyXG4gICAqXG4gICAqIHVzZSB0aGUgRm9sbG93RW1pdHRlciB3aWxsIGVtaXQgcGFydGljbGUgd2hlbiBtb3VzZW1vdmluZ1xuICAgKlxuICAgKiBAY2xhc3MgUHJvdG9uLkZvbGxvd0VtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gbW91c2VUYXJnZXQgbW91c2VldmVudCdzIHRhcmdldDtcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVhc2UgdGhlIGVhc2luZyBvZiBmb2xsb3dpbmcgc3BlZWQ7XG4gICAqIEBkZWZhdWx0IDAuN1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihtb3VzZVRhcmdldCwgZWFzZSwgY29uZikge1xuICAgIHN1cGVyKGNvbmYpO1xuXG4gICAgdGhpcy5tb3VzZVRhcmdldCA9IFV0aWwuaW5pdFZhbHVlKG1vdXNlVGFyZ2V0LCB3aW5kb3cpO1xuICAgIHRoaXMuZWFzZSA9IFV0aWwuaW5pdFZhbHVlKGVhc2UsIDAuNyk7XG5cbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gIH1cblxuICBpbml0RXZlbnRIYW5kbGVyKCkge1xuICAgIHRoaXMubW91c2Vtb3ZlSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZW1vdmUuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlZG93bkhhbmRsZXIgPSBlID0+IHRoaXMubW91c2Vkb3duLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZXVwSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZXVwLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqL1xuICBlbWl0KCkge1xuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IGZhbHNlO1xuICB9XG5cbiAgbW91c2Vtb3ZlKGUpIHtcbiAgICBpZiAoZS5sYXllclggfHwgZS5sYXllclggPT09IDApIHtcbiAgICAgIHRoaXMucC54ICs9IChlLmxheWVyWCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLmxheWVyWSAtIHRoaXMucC55KSAqIHRoaXMuZWFzZTtcbiAgICB9IGVsc2UgaWYgKGUub2Zmc2V0WCB8fCBlLm9mZnNldFggPT09IDApIHtcbiAgICAgIHRoaXMucC54ICs9IChlLm9mZnNldFggLSB0aGlzLnAueCkgKiB0aGlzLmVhc2U7XG4gICAgICB0aGlzLnAueSArPSAoZS5vZmZzZXRZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hbGxvd0VtaXR0aW5nKSBzdXBlci5lbWl0KFwib25jZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMubW91c2VUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlbW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogRGV0ZXJtaW5lIHdoZXRoZXIgaXQgaXMgYSBwaWN0dXJlIG9iamVjdFxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBpcyBvciBub1xuICAgKi9cbiAgaXNJbWFnZShvYmopIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvYmouX19pc0ltYWdlKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IHRhZ05hbWUgPSBgJHtvYmoudGFnTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBgJHtvYmoubm9kZU5hbWV9YC50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChub2RlTmFtZSA9PT0gXCJJTUdcIiB8fCB0YWdOYW1lID09PSBcIklNR1wiKSB7XG4gICAgICBvYmouX19pc0ltYWdlID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHdoZXRoZXIgaXQgaXMgYSBzdHJpbmcgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbiAgfVxufTtcbiIsImltcG9ydCBQb29sIGZyb20gXCIuLi9jb3JlL1Bvb2xcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMuY2lyY2xlQ29uZiA9IHsgaXNDaXJjbGU6IHRydWUgfTtcblxuICAgIHRoaXMuaW5pdEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMubmFtZSA9IFwiQmFzZVJlbmRlcmVyXCI7XG4gIH1cblxuICBzZXRTdHJva2UoY29sb3IgPSBcIiMwMDAwMDBcIiwgdGhpbmtuZXNzID0gMSkge1xuICAgIHRoaXMuc3Ryb2tlID0geyBjb2xvciwgdGhpbmtuZXNzIH07XG4gIH1cblxuICBpbml0RXZlbnRIYW5kbGVyKCkge1xuICAgIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLm9uUHJvdG9uVXBkYXRlLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGVBZnRlci5jYWxsKHRoaXMpO1xuICAgIH07XG5cbiAgICB0aGlzLl9lbWl0dGVyQWRkZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlckFkZGVkLmNhbGwodGhpcywgZW1pdHRlcik7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlciA9IGVtaXR0ZXIgPT4ge1xuICAgICAgdGhpcy5vbkVtaXR0ZXJSZW1vdmVkLmNhbGwodGhpcywgZW1pdHRlcik7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVDcmVhdGVkLmNhbGwodGhpcywgcGFydGljbGUpO1xuICAgIH07XG5cbiAgICB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVVcGRhdGUuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlRGVhZEhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVEZWFkLmNhbGwodGhpcywgcGFydGljbGUpO1xuICAgIH07XG4gIH1cblxuICBpbml0KHByb3Rvbikge1xuICAgIHRoaXMucGFyZW50ID0gcHJvdG9uO1xuXG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURV9BRlRFUlwiLCB0aGlzLl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIpO1xuXG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9SRU1PVkVEXCIsIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0NSRUFURURcIiwgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0RFQURcIiwgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlcik7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgdGhpcy5wb29sLmRlc3Ryb3koKTtcbiAgICB0aGlzLnBvb2wgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG5cbiAgcmVtb3ZlKHByb3Rvbikge1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9BRERFRFwiLCB0aGlzLl9lbWl0dGVyQWRkZWRIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9SRU1PVkVEXCIsIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfVVBEQVRFXCIsIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0RFQURcIiwgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHt9XG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7fVxuXG4gIG9uRW1pdHRlckFkZGVkKGVtaXR0ZXIpIHt9XG4gIG9uRW1pdHRlclJlbW92ZWQoZW1pdHRlcikge31cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge31cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbi8qKlxuICogQ2FudmFzUmVuZGVyZXIgY2xhc3MgZm9yIHJlbmRlcmluZyBwYXJ0aWNsZXMgb24gYSBjYW52YXMgZWxlbWVudC5cbiAqIEBleHRlbmRzIEJhc2VSZW5kZXJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIC8qKlxuICAgKiBAdHlwZSB7b2JqZWN0fG51bGx9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdHJva2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb250ZXh0O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYnVmZmVyQ2FjaGU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBuYW1lO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IENhbnZhc1JlbmRlcmVyIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBlbGVtZW50IC0gVGhlIGNhbnZhcyBlbGVtZW50IHRvIHJlbmRlciBvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuYnVmZmVyQ2FjaGUgPSB7fTtcbiAgICB0aGlzLm5hbWUgPSBcIkNhbnZhc1JlbmRlcmVyXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplcyB0aGUgY2FudmFzIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFRoZSBuZXcgd2lkdGggb2YgdGhlIGNhbnZhcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFRoZSBuZXcgaGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gICAqL1xuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBjYW52YXMgb24gUHJvdG9uIHVwZGF0ZS5cbiAgICovXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBhcnRpY2xlIGNyZWF0aW9uLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgY3JlYXRlZCBwYXJ0aWNsZS5cbiAgICovXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHBhcnRpY2xlLmJvZHksIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuY29sb3IgPSBwYXJ0aWNsZS5jb2xvciB8fCBcIiNmZjAwMDBcIjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwYXJ0aWNsZSB1cGRhdGVzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgdXBkYXRlZCBwYXJ0aWNsZS5cbiAgICovXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgaWYgKFR5cGVzLmlzSW1hZ2UocGFydGljbGUuYm9keSkpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocGFydGljbGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdDaXJjbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBhcnRpY2xlIGRlc3RydWN0aW9uLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgZGVzdHJveWVkIHBhcnRpY2xlLlxuICAgKi9cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGltYWdlIHRvIHRoZSBwYXJ0aWNsZSBib2R5LlxuICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltZyAtIFRoZSBpbWFnZSB0byBhZGQuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBhZGQgdGhlIGltYWdlIHRvLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSBpbWc7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgYW4gaW1hZ2UgcGFydGljbGUuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBkcmF3LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZHJhd0ltYWdlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdyA9IChwYXJ0aWNsZS5ib2R5LndpZHRoICogcGFydGljbGUuc2NhbGUpIHwgMDtcbiAgICBjb25zdCBoID0gKHBhcnRpY2xlLmJvZHkuaGVpZ2h0ICogcGFydGljbGUuc2NhbGUpIHwgMDtcbiAgICBjb25zdCB4ID0gcGFydGljbGUucC54IC0gdyAvIDI7XG4gICAgY29uc3QgeSA9IHBhcnRpY2xlLnAueSAtIGggLyAyO1xuXG4gICAgaWYgKCEhcGFydGljbGUuY29sb3IpIHtcbiAgICAgIGlmICghcGFydGljbGUuZGF0YVtcImJ1ZmZlclwiXSkgcGFydGljbGUuZGF0YS5idWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcihwYXJ0aWNsZS5ib2R5KTtcblxuICAgICAgY29uc3QgYnVmQ29udGV4dCA9IHBhcnRpY2xlLmRhdGEuYnVmZmVyLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGJ1ZkNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLndpZHRoLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci5oZWlnaHQpO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuICAgICAgYnVmQ29udGV4dC5kcmF3SW1hZ2UocGFydGljbGUuYm9keSwgMCwgMCk7XG5cbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtYXRvcFwiO1xuICAgICAgYnVmQ29udGV4dC5maWxsU3R5bGUgPSBDb2xvclV0aWwucmdiVG9IZXgocGFydGljbGUucmdiKTtcbiAgICAgIGJ1ZkNvbnRleHQuZmlsbFJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlcixcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgdyxcbiAgICAgICAgaFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KTtcbiAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoTWF0aFV0aWwuZGVncmVlVHJhbnNmb3JtKHBhcnRpY2xlLnJvdGF0aW9uKSk7XG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKC1wYXJ0aWNsZS5wLngsIC1wYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwLCBwYXJ0aWNsZS5ib2R5LndpZHRoLCBwYXJ0aWNsZS5ib2R5LmhlaWdodCwgeCwgeSwgdywgaCk7XG5cbiAgICAgIHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBhIGNpcmN1bGFyIHBhcnRpY2xlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gZHJhdy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRyYXdDaXJjbGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUucmdiKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtwYXJ0aWNsZS5yZ2Iucn0sJHtwYXJ0aWNsZS5yZ2IuZ30sJHtwYXJ0aWNsZS5yZ2IuYn0sJHtwYXJ0aWNsZS5hbHBoYX0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHBhcnRpY2xlLmNvbG9yO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuYXJjKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5zdHJva2UuY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5zdHJva2UudGhpbmtuZXNzO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBidWZmZXIgZm9yIGltYWdlIHBhcnRpY2xlcy5cbiAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBpbWFnZSAtIFRoZSBpbWFnZSB0byBjcmVhdGUgYSBidWZmZXIgZm9yLlxuICAgKiBAcmV0dXJucyB7SFRNTENhbnZhc0VsZW1lbnR8dW5kZWZpbmVkfSBUaGUgY3JlYXRlZCBidWZmZXIgY2FudmFzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY3JlYXRlQnVmZmVyKGltYWdlKSB7XG4gICAgaWYgKFR5cGVzLmlzSW1hZ2UoaW1hZ2UpKSB7XG4gICAgICBjb25zdCBzaXplID0gaW1hZ2Uud2lkdGggKyBcIl9cIiArIGltYWdlLmhlaWdodDtcbiAgICAgIGxldCBjYW52YXMgPSB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdO1xuXG4gICAgICBpZiAoIWNhbnZhcykge1xuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgICAgdGhpcy5idWZmZXJDYWNoZVtzaXplXSA9IGNhbnZhcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHJlbmRlcmVyIGFuZCBjbGVhbnMgdXAgcmVzb3VyY2VzLlxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5idWZmZXJDYWNoZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBEb21VdGlsIGZyb20gXCIuLi91dGlscy9Eb21VdGlsXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgRE9NLWJhc2VkIHJlbmRlcmVyIGZvciBwYXJ0aWNsZSBzeXN0ZW1zLlxuICogQGV4dGVuZHMgQmFzZVJlbmRlcmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgRG9tUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgSFRNTCBlbGVtZW50IHRvIHJlbmRlciB0by5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLnRyYW5zZm9ybTNkID0gZmFsc2U7XG4gICAgdGhpcy5wb29sLmNyZWF0ZSA9IChib2R5LCBwYXJ0aWNsZSkgPT4gdGhpcy5jcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKTtcbiAgICB0aGlzLmFkZEltZzJCb2R5ID0gdGhpcy5hZGRJbWcyQm9keS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEb21SZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldCh0aGlzLmNpcmNsZUNvbmYsIHBhcnRpY2xlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgaWYgKHRoaXMudHJhbnNmb3JtM2QpIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0zZChwYXJ0aWNsZS5ib2R5LCBwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSwgcGFydGljbGUuc2NhbGUsIHBhcnRpY2xlLnJvdGF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERvbVV0aWwudHJhbnNmb3JtKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfVxuXG4gICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLm9wYWNpdHkgPSBwYXJ0aWNsZS5hbHBoYTtcblxuICAgICAgaWYgKHBhcnRpY2xlLmJvZHkuaXNDaXJjbGUpIHtcbiAgICAgICAgcGFydGljbGUuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwYXJ0aWNsZS5jb2xvciB8fCBcIiNmZjAwMDBcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmJvZHlSZWFkeShwYXJ0aWNsZSkpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBib2R5UmVhZHkocGFydGljbGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHBhcnRpY2xlLmJvZHkgPT09IFwib2JqZWN0XCIgJiYgcGFydGljbGUuYm9keSAmJiAhcGFydGljbGUuYm9keS5pc0lubmVyO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kZWFkKSByZXR1cm47XG4gICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQoaW1nLCBwYXJ0aWNsZSk7XG4gICAgRG9tVXRpbC5yZXNpemUocGFydGljbGUuYm9keSwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpIHtcbiAgICBpZiAoYm9keS5pc0NpcmNsZSkgcmV0dXJuIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVTcHJpdGUoYm9keSwgcGFydGljbGUpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RzXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGRvbSA9IERvbVV0aWwuY3JlYXRlRGl2KGAke3BhcnRpY2xlLmlkfV9kb21gLCAyICogcGFydGljbGUucmFkaXVzLCAyICogcGFydGljbGUucmFkaXVzKTtcbiAgICBkb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gYCR7cGFydGljbGUucmFkaXVzfXB4YDtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgZG9tLnN0eWxlLmJvcmRlckNvbG9yID0gdGhpcy5zdHJva2UuY29sb3I7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyV2lkdGggPSBgJHt0aGlzLnN0cm9rZS50aGlua25lc3N9cHhgO1xuICAgIH1cbiAgICBkb20uaXNDaXJjbGUgPSB0cnVlO1xuXG4gICAgcmV0dXJuIGRvbTtcbiAgfVxuXG4gIGNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHVybCA9IHR5cGVvZiBib2R5ID09PSBcInN0cmluZ1wiID8gYm9keSA6IGJvZHkuc3JjO1xuICAgIGNvbnN0IGRvbSA9IERvbVV0aWwuY3JlYXRlRGl2KGAke3BhcnRpY2xlLmlkfV9kb21gLCBib2R5LndpZHRoLCBib2R5LmhlaWdodCk7XG4gICAgZG9tLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt1cmx9KWA7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSByZW5kZXJlciBhbmQgY2xlYW5zIHVwIHJlc291cmNlcy5cbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFR5cGVzIGZyb20gXCIuLi91dGlscy9UeXBlc1wiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWFzZWxSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHN0cm9rZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5uYW1lID0gXCJFYXNlbFJlbmRlcmVyXCI7XG4gIH1cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICB0aGlzLmNyZWF0ZVNwcml0ZShwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkQ2hpbGQocGFydGljbGUuYm9keSk7XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkueCA9IHBhcnRpY2xlLnAueDtcbiAgICAgIHBhcnRpY2xlLmJvZHkueSA9IHBhcnRpY2xlLnAueTtcblxuICAgICAgcGFydGljbGUuYm9keS5hbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuICAgICAgcGFydGljbGUuYm9keS5zY2FsZVggPSBwYXJ0aWNsZS5ib2R5LnNjYWxlWSA9IHBhcnRpY2xlLnNjYWxlO1xuICAgICAgcGFydGljbGUuYm9keS5yb3RhdGlvbiA9IHBhcnRpY2xlLnJvdGF0aW9uO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkucGFyZW50ICYmIHBhcnRpY2xlLmJvZHkucGFyZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChwYXJ0aWNsZS5ncmFwaGljcykgdGhpcy5wb29sLmV4cGlyZShwYXJ0aWNsZS5ncmFwaGljcyk7XG4gIH1cblxuICAvLyBwcml2YXRlXG4gIGNyZWF0ZVNwcml0ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgaWYgKHBhcnRpY2xlLmJvZHkucGFyZW50KSByZXR1cm47XG4gICAgaWYgKHBhcnRpY2xlLmJvZHlbXCJpbWFnZVwiXSkge1xuICAgICAgcGFydGljbGUuYm9keS5yZWdYID0gcGFydGljbGUuYm9keS5pbWFnZS53aWR0aCAvIDI7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnJlZ1kgPSBwYXJ0aWNsZS5ib2R5LmltYWdlLmhlaWdodCAvIDI7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZ3JhcGhpY3MgPSB0aGlzLnBvb2wuZ2V0KHdpbmRvdy5jcmVhdGVqcy5HcmFwaGljcyk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGlmIChUeXBlcy5pc1N0cmluZyh0aGlzLnN0cm9rZSkpIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UodGhpcy5zdHJva2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2UoXCIjMDAwMDAwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBncmFwaGljcy5iZWdpbkZpbGwocGFydGljbGUuY29sb3IgfHwgXCIjZmYwMDAwXCIpLmRyYXdDaXJjbGUoMCwgMCwgcGFydGljbGUucmFkaXVzKTtcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMucG9vbC5nZXQod2luZG93LmNyZWF0ZWpzLlNoYXBlLCBbZ3JhcGhpY3NdKTtcblxuICAgIHBhcnRpY2xlLmJvZHkgPSBzaGFwZTtcbiAgICBwYXJ0aWNsZS5ncmFwaGljcyA9IGdyYXBoaWNzO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgUmVjdGFuZ2xlIGZyb20gXCIuLi9tYXRoL1JlY3RhbmdsZVwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcGl4ZWwtYmFzZWQgcmVuZGVyZXIgZm9yIHBhcnRpY2xlIHN5c3RlbXMuXG4gKiBAZXh0ZW5kcyBCYXNlUmVuZGVyZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGl4ZWxSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFBpeGVsUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gcmVuZGVyIHRvLlxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gW3JlY3RhbmdsZV0gLSBUaGUgcmVjdGFuZ2xlIGRlZmluaW5nIHRoZSByZW5kZXJpbmcgYXJlYS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHJlY3RhbmdsZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGU7XG4gICAgdGhpcy5jcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKTtcblxuICAgIHRoaXMubmFtZSA9IFwiUGl4ZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgY3JlYXRlSW1hZ2VEYXRhKHJlY3RhbmdsZSkge1xuICAgIHRoaXMucmVjdGFuZ2xlID0gcmVjdGFuZ2xlID8gcmVjdGFuZ2xlIDogbmV3IFJlY3RhbmdsZSgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YSh0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCB0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55KTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QodGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSwgdGhpcy5yZWN0YW5nbGUud2lkdGgsIHRoaXMucmVjdGFuZ2xlLmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKFxuICAgICAgdGhpcy5yZWN0YW5nbGUueCxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLnksXG4gICAgICB0aGlzLnJlY3RhbmdsZS53aWR0aCxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLmhlaWdodFxuICAgICk7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZUFmdGVyKCkge1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHt9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmltYWdlRGF0YSkge1xuICAgICAgdGhpcy5zZXRQaXhlbChcbiAgICAgICAgdGhpcy5pbWFnZURhdGEsXG4gICAgICAgIChwYXJ0aWNsZS5wLnggLSB0aGlzLnJlY3RhbmdsZS54KSA+PiAwLFxuICAgICAgICAocGFydGljbGUucC55IC0gdGhpcy5yZWN0YW5nbGUueSkgPj4gMCxcbiAgICAgICAgcGFydGljbGVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2V0UGl4ZWwoaW1hZ2VkYXRhLCB4LCB5LCBwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHJnYiA9IHBhcnRpY2xlLnJnYjtcbiAgICBpZiAoeCA8IDAgfHwgeCA+IHRoaXMuZWxlbWVudC53aWR0aCB8fCB5IDwgMCB8fCB5ID4gdGhpcy5lbGVtZW50LmhlaWdodCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaSA9ICgoeSA+PiAwKSAqIGltYWdlZGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaV0gPSByZ2IucjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMV0gPSByZ2IuZztcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgMl0gPSByZ2IuYjtcbiAgICBpbWFnZWRhdGEuZGF0YVtpICsgM10gPSBwYXJ0aWNsZS5hbHBoYSAqIDI1NTtcbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgcmVuZGVyZXIgYW5kIGNsZWFucyB1cCByZXNvdXJjZXMuXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxubGV0IFBJWElDbGFzcztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgUElYSS1iYXNlZCByZW5kZXJlciBmb3IgcGFydGljbGUgc3lzdGVtcy5cbiAqIEBleHRlbmRzIEJhc2VSZW5kZXJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhpUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBQaXhpUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7UElYSS5Db250YWluZXJ9IGVsZW1lbnQgLSBUaGUgUElYSSBjb250YWluZXIgdG8gcmVuZGVyIHRvLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtzdHJva2VdIC0gVGhlIHN0cm9rZSBjb2xvciBmb3IgcGFydGljbGVzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICB0aGlzLmNvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuYmxlbmRNb2RlID0gbnVsbDtcbiAgICB0aGlzLnBvb2wuY3JlYXRlID0gKGJvZHksIHBhcnRpY2xlKSA9PiB0aGlzLmNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpO1xuICAgIHRoaXMuc2V0UElYSSh3aW5kb3cuUElYSSk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIlBpeGlSZW5kZXJlclwiO1xuICB9XG5cbiAgc2V0UElYSShQSVhJKSB7XG4gICAgdHJ5IHtcbiAgICAgIFBJWElDbGFzcyA9IFBJWEkgfHwgeyBTcHJpdGU6IHt9IH07XG4gICAgICB0aGlzLmNyZWF0ZUZyb21JbWFnZSA9IFBJWElDbGFzcy5TcHJpdGUuZnJvbSB8fCBQSVhJQ2xhc3MuU3ByaXRlLmZyb21JbWFnZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgb25Qcm90b25VcGRhdGUoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQodGhpcy5jaXJjbGVDb25mLCBwYXJ0aWNsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmxlbmRNb2RlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LmJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5hZGRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICB0aGlzLnRyYW5zZm9ybShwYXJ0aWNsZSwgcGFydGljbGUuYm9keSk7XG5cbiAgICBpZiAodGhpcy5zZXRDb2xvciA9PT0gdHJ1ZSB8fCB0aGlzLmNvbG9yID09PSB0cnVlKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnRpbnQgPSBDb2xvclV0aWwuZ2V0SGV4MTZGcm9tUGFydGljbGUocGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGFydGljbGVcbiAgICovXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gIH1cblxuICB0cmFuc2Zvcm0ocGFydGljbGUsIHRhcmdldCkge1xuICAgIHRhcmdldC54ID0gcGFydGljbGUucC54O1xuICAgIHRhcmdldC55ID0gcGFydGljbGUucC55O1xuXG4gICAgdGFyZ2V0LmFscGhhID0gcGFydGljbGUuYWxwaGE7XG5cbiAgICB0YXJnZXQuc2NhbGUueCA9IHBhcnRpY2xlLnNjYWxlO1xuICAgIHRhcmdldC5zY2FsZS55ID0gcGFydGljbGUuc2NhbGU7XG5cbiAgICAvLyB1c2luZyBjYWNoZWQgdmVyc2lvbiBvZiBNYXRoVXRpbC5QSV8xODAgZm9yIHNsaWdodCBwZXJmb3JtYW5jZSBpbmNyZWFzZS5cbiAgICB0YXJnZXQucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbiAqIE1hdGhVdGlsLlBJXzE4MDsgLy8gTWF0aFV0aWwuUElfMTgwO1xuICB9XG5cbiAgY3JlYXRlQm9keShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGlmIChib2R5LmlzQ2lyY2xlKSByZXR1cm4gdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuY3JlYXRlU3ByaXRlKGJvZHkpO1xuICB9XG5cbiAgY3JlYXRlU3ByaXRlKGJvZHkpIHtcbiAgICBjb25zdCBzcHJpdGUgPSBib2R5LmlzSW5uZXIgPyB0aGlzLmNyZWF0ZUZyb21JbWFnZShib2R5LnNyYykgOiBuZXcgUElYSUNsYXNzLlNwcml0ZShib2R5KTtcblxuICAgIHNwcml0ZS5hbmNob3IueCA9IDAuNTtcbiAgICBzcHJpdGUuYW5jaG9yLnkgPSAwLjU7XG5cbiAgICByZXR1cm4gc3ByaXRlO1xuICB9XG5cbiAgY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgZ3JhcGhpY3MgPSBuZXcgUElYSUNsYXNzLkdyYXBoaWNzKCk7XG5cbiAgICBpZiAodGhpcy5zdHJva2UpIHtcbiAgICAgIGNvbnN0IHN0cm9rZSA9IFR5cGVzLmlzU3RyaW5nKHRoaXMuc3Ryb2tlKSA/IHRoaXMuc3Ryb2tlIDogMHgwMDAwMDA7XG4gICAgICBncmFwaGljcy5iZWdpblN0cm9rZShzdHJva2UpO1xuICAgIH1cblxuICAgIGdyYXBoaWNzLmJlZ2luRmlsbChwYXJ0aWNsZS5jb2xvciB8fCAweDAwOGNlZCk7XG4gICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCBwYXJ0aWNsZS5yYWRpdXMpO1xuICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcblxuICAgIHJldHVybiBncmFwaGljcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgcmVuZGVyZXIgYW5kIGNsZWFucyB1cCByZXNvdXJjZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8UGFydGljbGU+fSBwYXJ0aWNsZXMgLSBUaGUgcGFydGljbGVzIHRvIGNsZWFuIHVwLlxuICAgKi9cbiAgZGVzdHJveShwYXJ0aWNsZXMpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG5cbiAgICBsZXQgaSA9IHBhcnRpY2xlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IHBhcnRpY2xlID0gcGFydGljbGVzW2ldO1xuICAgICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1hdDMgZnJvbSBcIi4uL21hdGgvTWF0M1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNU3RhY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hdHMgPSBbXTtcbiAgICB0aGlzLnNpemUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB0aGlzLm1hdHMucHVzaChNYXQzLmNyZWF0ZShbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0pKTtcbiAgfVxuXG4gIHNldChtLCBpKSB7XG4gICAgaWYgKGkgPT09IDApIE1hdDMuc2V0KG0sIHRoaXMubWF0c1swXSk7XG4gICAgZWxzZSBNYXQzLm11bHRpcGx5KHRoaXMubWF0c1tpIC0gMV0sIG0sIHRoaXMubWF0c1tpXSk7XG5cbiAgICB0aGlzLnNpemUgPSBNYXRoLm1heCh0aGlzLnNpemUsIGkgKyAxKTtcbiAgfVxuXG4gIHB1c2gobSkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIE1hdDMuc2V0KG0sIHRoaXMubWF0c1swXSk7XG4gICAgZWxzZSBNYXQzLm11bHRpcGx5KHRoaXMubWF0c1t0aGlzLnNpemUgLSAxXSwgbSwgdGhpcy5tYXRzW3RoaXMuc2l6ZV0pO1xuXG4gICAgdGhpcy5zaXplKys7XG4gIH1cblxuICBwb3AoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA+IDApIHRoaXMuc2l6ZS0tO1xuICB9XG5cbiAgdG9wKCkge1xuICAgIHJldHVybiB0aGlzLm1hdHNbdGhpcy5zaXplIC0gMV07XG4gIH1cbn1cbiIsImltcG9ydCBNYXQzIGZyb20gXCIuLi9tYXRoL01hdDNcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IE1TdGFjayBmcm9tIFwiLi4vdXRpbHMvTVN0YWNrXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi4vdXRpbHMvRG9tVXRpbFwiO1xuaW1wb3J0IFdlYkdMVXRpbCBmcm9tIFwiLi4vdXRpbHMvV2ViR0xVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgV2ViR0wtYmFzZWQgcmVuZGVyZXIgZm9yIHBhcnRpY2xlIHN5c3RlbXMuXG4gKiBAZXh0ZW5kcyBCYXNlUmVuZGVyZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViR0xSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFdlYkdMUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgY2FudmFzIGVsZW1lbnQgdG8gcmVuZGVyIHRvLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5nbCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIsIHsgYW50aWFsaWFzOiB0cnVlLCBzdGVuY2lsOiBmYWxzZSwgZGVwdGg6IGZhbHNlIH0pO1xuICAgIGlmICghdGhpcy5nbCkgYWxlcnQoXCJTb3JyeSB5b3VyIGJyb3dzZXIgZG8gbm90IHN1cHBlc3QgV2ViR0whXCIpO1xuXG4gICAgdGhpcy5pbml0VmFyKCk7XG4gICAgdGhpcy5zZXRNYXhSYWRpdXMoKTtcbiAgICB0aGlzLmluaXRTaGFkZXJzKCk7XG4gICAgdGhpcy5pbml0QnVmZmVycygpO1xuXG4gICAgdGhpcy5nbC5ibGVuZEVxdWF0aW9uKHRoaXMuZ2wuRlVOQ19BREQpO1xuICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIldlYkdMUmVuZGVyZXJcIjtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgc3VwZXIuaW5pdChwcm90b24pO1xuICAgIHRoaXMucmVzaXplKHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMudW1hdFs0XSA9IC0yO1xuICAgIHRoaXMudW1hdFs3XSA9IDE7XG5cbiAgICB0aGlzLnNtYXRbMF0gPSAxIC8gd2lkdGg7XG4gICAgdGhpcy5zbWF0WzRdID0gMSAvIGhlaWdodDtcblxuICAgIHRoaXMubXN0YWNrLnNldCh0aGlzLnVtYXQsIDApO1xuICAgIHRoaXMubXN0YWNrLnNldCh0aGlzLnNtYXQsIDEpO1xuXG4gICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgc2V0TWF4UmFkaXVzKHJhZGl1cykge1xuICAgIHRoaXMuY2lyY2xlQ2FudmFzVVJMID0gdGhpcy5jcmVhdGVDaXJjbGUocmFkaXVzKTtcbiAgfVxuXG4gIGdldFZlcnRleFNoYWRlcigpIHtcbiAgICBjb25zdCB2c1NvdXJjZSA9IFtcbiAgICAgIFwidW5pZm9ybSB2ZWMyIHZpZXdwb3J0O1wiLFxuICAgICAgXCJhdHRyaWJ1dGUgdmVjMiBhVmVydGV4UG9zaXRpb247XCIsXG4gICAgICBcImF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInVuaWZvcm0gbWF0MyB0TWF0O1wiLFxuICAgICAgXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidmFyeWluZyBmbG9hdCBhbHBoYTtcIixcbiAgICAgIFwidm9pZCBtYWluKCkge1wiLFxuICAgICAgXCJ2ZWMzIHYgPSB0TWF0ICogdmVjMyhhVmVydGV4UG9zaXRpb24sIDEuMCk7XCIsXG4gICAgICBcImdsX1Bvc2l0aW9uID0gdmVjNCh2LngsIHYueSwgMCwgMSk7XCIsXG4gICAgICBcInZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJhbHBoYSA9IHRNYXRbMF1bMl07XCIsXG4gICAgICBcIn1cIlxuICAgIF0uam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gdnNTb3VyY2U7XG4gIH1cblxuICBnZXRGcmFnbWVudFNoYWRlcigpIHtcbiAgICBjb25zdCBmc1NvdXJjZSA9IFtcbiAgICAgIFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXG4gICAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ2YXJ5aW5nIGZsb2F0IGFscGhhO1wiLFxuICAgICAgXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcbiAgICAgIFwidW5pZm9ybSB2ZWM0IGNvbG9yO1wiLFxuICAgICAgXCJ1bmlmb3JtIGJvb2wgdXNlVGV4dHVyZTtcIixcbiAgICAgIFwidW5pZm9ybSB2ZWMzIHVDb2xvcjtcIixcbiAgICAgIFwidm9pZCBtYWluKCkge1wiLFxuICAgICAgXCJ2ZWM0IHRleHR1cmVDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCk7XCIsXG4gICAgICBcImdsX0ZyYWdDb2xvciA9IHRleHR1cmVDb2xvciAqIHZlYzQodUNvbG9yLCAxLjApO1wiLFxuICAgICAgXCJnbF9GcmFnQ29sb3IudyAqPSBhbHBoYTtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiBmc1NvdXJjZTtcbiAgfVxuXG4gIGluaXRWYXIoKSB7XG4gICAgdGhpcy5tc3RhY2sgPSBuZXcgTVN0YWNrKCk7XG4gICAgdGhpcy51bWF0ID0gTWF0My5jcmVhdGUoWzIsIDAsIDEsIDAsIC0yLCAwLCAtMSwgMSwgMV0pO1xuICAgIHRoaXMuc21hdCA9IE1hdDMuY3JlYXRlKFsxIC8gMTAwLCAwLCAxLCAwLCAxIC8gMTAwLCAwLCAwLCAwLCAxXSk7XG4gICAgdGhpcy50ZXh0dXJlYnVmZmVycyA9IHt9O1xuICB9XG5cbiAgYmxlbmRFcXVhdGlvbihBKSB7XG4gICAgdGhpcy5nbC5ibGVuZEVxdWF0aW9uKHRoaXMuZ2xbQV0pO1xuICB9XG5cbiAgYmxlbmRGdW5jKEEsIEIpIHtcbiAgICB0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsW0FdLCB0aGlzLmdsW0JdKTtcbiAgfVxuXG4gIGdldFNoYWRlcihnbCwgc3RyLCBmcykge1xuICAgIGNvbnN0IHNoYWRlciA9IGZzID8gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUikgOiBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzdHIpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBhbGVydChnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRlcjtcbiAgfVxuXG4gIGluaXRTaGFkZXJzKCkge1xuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gdGhpcy5nZXRTaGFkZXIodGhpcy5nbCwgdGhpcy5nZXRGcmFnbWVudFNoYWRlcigpLCB0cnVlKTtcbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmdldFNoYWRlcih0aGlzLmdsLCB0aGlzLmdldFZlcnRleFNoYWRlcigpLCBmYWxzZSk7XG5cbiAgICB0aGlzLnNwcm9ncmFtID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5zcHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnNwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgdGhpcy5nbC5saW5rUHJvZ3JhbSh0aGlzLnNwcm9ncmFtKTtcblxuICAgIGlmICghdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuc3Byb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMpKSBhbGVydChcIkNvdWxkIG5vdCBpbml0aWFsaXNlIHNoYWRlcnNcIik7XG5cbiAgICB0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5zcHJvZ3JhbSk7XG4gICAgdGhpcy5zcHJvZ3JhbS52cGEgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwiYVZlcnRleFBvc2l0aW9uXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0udGNhID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcImFUZXh0dXJlQ29vcmRcIik7XG4gICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNwcm9ncmFtLnRjYSk7XG4gICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNwcm9ncmFtLnZwYSk7XG5cbiAgICB0aGlzLnNwcm9ncmFtLnRNYXRVbmlmb3JtID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ0TWF0XCIpO1xuICAgIHRoaXMuc3Byb2dyYW0uc2FtcGxlclVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVTYW1wbGVyXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0udXNlVGV4ID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ1c2VUZXh0dXJlXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0uY29sb3IgPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVDb2xvclwiKTtcbiAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNwcm9ncmFtLnVzZVRleCwgMSk7XG4gIH1cblxuICBpbml0QnVmZmVycygpIHtcbiAgICBjb25zdCB2cyA9IFswLCAzLCAxLCAwLCAyLCAzXTtcbiAgICBsZXQgaWR4O1xuXG4gICAgdGhpcy51bml0SUJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdElCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkodnMpLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGxldCBpO1xuICAgIGxldCBpZHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTAwOyBpKyspIGlkcy5wdXNoKGkpO1xuICAgIGlkeCA9IG5ldyBVaW50MTZBcnJheShpZHMpO1xuXG4gICAgdGhpcy51bml0STMzID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0STMzKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaWR4LCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGlkcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDA7IGkrKykgaWRzLnB1c2goaSwgaSArIDEsIGkgKyAyKTtcbiAgICBpZHggPSBuZXcgVWludDE2QXJyYXkoaWRzKTtcblxuICAgIHRoaXMuc3RyaXBCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnN0cmlwQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaWR4LCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShyYWlkdXMpIHtcbiAgICB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyA9IFdlYkdMVXRpbC5uaHBvdChVdGlsLmluaXRWYWx1ZShyYWlkdXMsIDMyKSk7XG4gICAgY29uc3QgY2FudmFzID0gRG9tVXRpbC5jcmVhdGVDYW52YXMoXCJjaXJjbGVfY2FudmFzXCIsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzICogMiwgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgKiAyKTtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcblxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XG4gIH1cblxuICBkcmF3SW1nMkNhbnZhcyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IF93ID0gcGFydGljbGUuYm9keS53aWR0aDtcbiAgICBjb25zdCBfaCA9IHBhcnRpY2xlLmJvZHkuaGVpZ2h0O1xuXG4gICAgY29uc3QgX3dpZHRoID0gV2ViR0xVdGlsLm5ocG90KHBhcnRpY2xlLmJvZHkud2lkdGgpO1xuICAgIGNvbnN0IF9oZWlnaHQgPSBXZWJHTFV0aWwubmhwb3QocGFydGljbGUuYm9keS5oZWlnaHQpO1xuXG4gICAgY29uc3QgX3NjYWxlWCA9IHBhcnRpY2xlLmJvZHkud2lkdGggLyBfd2lkdGg7XG4gICAgY29uc3QgX3NjYWxlWSA9IHBhcnRpY2xlLmJvZHkuaGVpZ2h0IC8gX2hlaWdodDtcblxuICAgIGlmICghdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY10pXG4gICAgICB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXSA9IFtcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVUZXh0dXJlKCksXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCksXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlQnVmZmVyKClcbiAgICAgIF07XG5cbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmUgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVswXTtcbiAgICBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMV07XG4gICAgcGFydGljbGUuZGF0YS50Y0J1ZmZlciA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzJdO1xuXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoXG4gICAgICB0aGlzLmdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wLCBfc2NhbGVYLCAwLjAsIDAuMCwgX3NjYWxlWSwgX3NjYWxlWSwgX3NjYWxlWV0pLFxuICAgICAgdGhpcy5nbC5TVEFUSUNfRFJBV1xuICAgICk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoXG4gICAgICB0aGlzLmdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wLCBfdywgMC4wLCAwLjAsIF9oLCBfdywgX2hdKSxcbiAgICAgIHRoaXMuZ2wuU1RBVElDX0RSQVdcbiAgICApO1xuXG4gICAgY29uc3QgY29udGV4dCA9IHBhcnRpY2xlLmRhdGEuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgX3dpZHRoLCBfaGVpZ2h0KTtcblxuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCBwYXJ0aWNsZS5kYXRhLnRleHR1cmUpO1xuICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIGRhdGEpO1xuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLmdsLkxJTkVBUik7XG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUKTtcbiAgICB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRCk7XG5cbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQgPSB0cnVlO1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZVdpZHRoID0gX3c7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlSGVpZ2h0ID0gX2g7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHtcbiAgICAvLyB0aGlzLmdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMSk7XG4gICAgLy8gdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQgPSBmYWxzZTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRtYXQgPSBNYXQzLmNyZWF0ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEudG1hdFs4XSA9IDE7XG4gICAgcGFydGljbGUuZGF0YS5pbWF0ID0gTWF0My5jcmVhdGUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLmltYXRbOF0gPSAxO1xuXG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHBhcnRpY2xlLmJvZHksIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUodGhpcy5jaXJjbGVDYW52YXNVUkwsIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICAgIHBhcnRpY2xlLmRhdGEub2xkU2NhbGUgPSBwYXJ0aWNsZS5yYWRpdXMgLyB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cztcbiAgICB9XG4gIH1cblxuICAvLyBwcml2YXRlXG4gIGFkZEltZzJCb2R5KGltZywgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuZGVhZCkgcmV0dXJuO1xuICAgIHBhcnRpY2xlLmJvZHkgPSBpbWc7XG4gICAgcGFydGljbGUuZGF0YS5zcmMgPSBpbWcuc3JjO1xuICAgIHBhcnRpY2xlLmRhdGEuY2FudmFzID0gSW1nVXRpbC5nZXRDYW52YXNGcm9tQ2FjaGUoaW1nKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlID0gMTtcblxuICAgIHRoaXMuZHJhd0ltZzJDYW52YXMocGFydGljbGUpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlTWF0cml4KHBhcnRpY2xlKTtcblxuICAgICAgdGhpcy5nbC51bmlmb3JtM2YodGhpcy5zcHJvZ3JhbS5jb2xvciwgcGFydGljbGUucmdiLnIgLyAyNTUsIHBhcnRpY2xlLnJnYi5nIC8gMjU1LCBwYXJ0aWNsZS5yZ2IuYiAvIDI1NSk7XG4gICAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXgzZnYodGhpcy5zcHJvZ3JhbS50TWF0VW5pZm9ybSwgZmFsc2UsIHRoaXMubXN0YWNrLnRvcCgpKTtcblxuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyKTtcbiAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNwcm9ncmFtLnZwYSwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyKTtcbiAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNwcm9ncmFtLnRjYSwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHBhcnRpY2xlLmRhdGEudGV4dHVyZSk7XG4gICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNwcm9ncmFtLnNhbXBsZXJVbmlmb3JtLCAwKTtcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJQnVmZmVyKTtcblxuICAgICAgdGhpcy5nbC5kcmF3RWxlbWVudHModGhpcy5nbC5UUklBTkdMRVMsIDYsIHRoaXMuZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuICAgICAgdGhpcy5tc3RhY2sucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG5cbiAgdXBkYXRlTWF0cml4KHBhcnRpY2xlKSB7XG4gICAgY29uc3QgbW92ZU9yaWdpbk1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlVHJhbnNsYXRpb24oXG4gICAgICAtcGFydGljbGUuZGF0YS50ZXh0dXJlV2lkdGggLyAyLFxuICAgICAgLXBhcnRpY2xlLmRhdGEudGV4dHVyZUhlaWdodCAvIDJcbiAgICApO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VUcmFuc2xhdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSk7XG5cbiAgICBjb25zdCBhbmdlbCA9IHBhcnRpY2xlLnJvdGF0aW9uICogTWF0aFV0aWwuUElfMTgwO1xuICAgIGNvbnN0IHJvdGF0aW9uTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VSb3RhdGlvbihhbmdlbCk7XG5cbiAgICBjb25zdCBzY2FsZSA9IHBhcnRpY2xlLnNjYWxlICogcGFydGljbGUuZGF0YS5vbGRTY2FsZTtcbiAgICBjb25zdCBzY2FsZU1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlU2NhbGUoc2NhbGUsIHNjYWxlKTtcbiAgICBsZXQgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1vdmVPcmlnaW5NYXRyaXgsIHNjYWxlTWF0cml4KTtcblxuICAgIG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtYXRyaXgsIHJvdGF0aW9uTWF0cml4KTtcbiAgICBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobWF0cml4LCB0cmFuc2xhdGlvbk1hdHJpeCk7XG5cbiAgICBNYXQzLmludmVyc2UobWF0cml4LCBwYXJ0aWNsZS5kYXRhLmltYXQpO1xuICAgIG1hdHJpeFsyXSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgdGhpcy5tc3RhY2sucHVzaChtYXRyaXgpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5nbCA9IG51bGw7XG4gICAgdGhpcy5tc3RhY2sgPSBudWxsO1xuICAgIHRoaXMudW1hdCA9IG51bGw7XG4gICAgdGhpcy5zbWF0ID0gbnVsbDtcbiAgICB0aGlzLnRleHR1cmVidWZmZXJzID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY3VzdG9tIHJlbmRlcmVyIHRoYXQgZXh0ZW5kcyB0aGUgQmFzZVJlbmRlcmVyLlxuICogQGV4dGVuZHMgQmFzZVJlbmRlcmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQ3VzdG9tUmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgSFRNTCBlbGVtZW50IHRvIHJlbmRlciB0by5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSByZW5kZXJlci5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiQ3VzdG9tUmVuZGVyZXJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxpbmUgem9uZSBmb3IgcGFydGljbGUgc3lzdGVtcy5cbiAqIEBleHRlbmRzIFpvbmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgTGluZVpvbmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4MSAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIGZpcnN0IHBvaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0geTEgLSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBmaXJzdCBwb2ludC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt4Ml0gLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBzZWNvbmQgcG9pbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeTJdIC0gVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgc2Vjb25kIHBvaW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2RpcmVjdGlvbj1cIj5cIl0gLSBUaGUgZGlyZWN0aW9uIG9mIHRoZSBsaW5lLlxuICAgKi9cbiAgY29uc3RydWN0b3IoeDEsIHkxLCB4MiwgeTIsIGRpcmVjdGlvbiA9IFwiPlwiKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICh4MiAtIHgxID49IDApIHtcbiAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgIHRoaXMueTEgPSB5MTtcbiAgICAgIHRoaXMueDIgPSB4MjtcbiAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54MSA9IHgyO1xuICAgICAgdGhpcy55MSA9IHkyO1xuICAgICAgdGhpcy54MiA9IHgxO1xuICAgICAgdGhpcy55MiA9IHkxO1xuICAgIH1cblxuICAgIHRoaXMuZHggPSB0aGlzLngyIC0gdGhpcy54MTtcbiAgICB0aGlzLmR5ID0gdGhpcy55MiAtIHRoaXMueTE7XG5cbiAgICB0aGlzLm1pbnggPSBNYXRoLm1pbih0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1pbnkgPSBNYXRoLm1pbih0aGlzLnkxLCB0aGlzLnkyKTtcbiAgICB0aGlzLm1heHggPSBNYXRoLm1heCh0aGlzLngxLCB0aGlzLngyKTtcbiAgICB0aGlzLm1heHkgPSBNYXRoLm1heCh0aGlzLnkxLCB0aGlzLnkyKTtcblxuICAgIHRoaXMuZG90ID0gdGhpcy54MiAqIHRoaXMueTEgLSB0aGlzLngxICogdGhpcy55MjtcbiAgICB0aGlzLnh4eXkgPSB0aGlzLmR4ICogdGhpcy5keCArIHRoaXMuZHkgKiB0aGlzLmR5O1xuXG4gICAgdGhpcy5ncmFkaWVudCA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBVdGlsLmluaXRWYWx1ZShkaXJlY3Rpb24sIFwiPlwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgcmFuZG9tIHBvc2l0aW9uIG9uIHRoZSBsaW5lLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgcmFuZG9tIHBvc2l0aW9uLlxuICAgKi9cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5yYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLngxICsgdGhpcy5yYW5kb20gKiB0aGlzLmxlbmd0aCAqIE1hdGguY29zKHRoaXMuZ3JhZGllbnQpO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkxICsgdGhpcy5yYW5kb20gKiB0aGlzLmxlbmd0aCAqIE1hdGguc2luKHRoaXMuZ3JhZGllbnQpO1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hpY2ggc2lkZSBvZiB0aGUgbGluZSBhIHBvaW50IGlzIG9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcG9pbnQgaXMgb24gdGhlIHBvc2l0aXZlIHNpZGUgb2YgdGhlIGxpbmUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQiA9PT0gMCA/IDEgOiBCO1xuXG4gICAgaWYgKChBICogeCArIEIgKiB5ICsgQykgKiBEID4gMCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2Ugb2YgYSBwb2ludCBmcm9tIHRoZSBsaW5lLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZGlzdGFuY2UgZnJvbSB0aGUgcG9pbnQgdG8gdGhlIGxpbmUuXG4gICAqL1xuICBnZXREaXN0YW5jZSh4LCB5KSB7XG4gICAgY29uc3QgQSA9IHRoaXMuZHk7XG4gICAgY29uc3QgQiA9IC10aGlzLmR4O1xuICAgIGNvbnN0IEMgPSB0aGlzLmRvdDtcbiAgICBjb25zdCBEID0gQSAqIHggKyBCICogeSArIEM7XG5cbiAgICByZXR1cm4gRCAvIE1hdGguc3FydCh0aGlzLnh4eXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHN5bW1ldHJpYyB2ZWN0b3Igb2YgYSBnaXZlbiB2ZWN0b3Igd2l0aCByZXNwZWN0IHRvIHRoZSBsaW5lLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2IC0gVGhlIHZlY3RvciB0byByZWZsZWN0LlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IFRoZSByZWZsZWN0ZWQgdmVjdG9yLlxuICAgKi9cbiAgZ2V0U3ltbWV0cmljKHYpIHtcbiAgICBjb25zdCB0aGEyID0gdi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhID0gMiAqICh0aGExIC0gdGhhMik7XG5cbiAgICBjb25zdCBvbGR4ID0gdi54O1xuICAgIGNvbnN0IG9sZHkgPSB2Lnk7XG5cbiAgICB2LnggPSBvbGR4ICogTWF0aC5jb3ModGhhKSAtIG9sZHkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHYueSA9IG9sZHggKiBNYXRoLnNpbih0aGEpICsgb2xkeSAqIE1hdGguY29zKHRoYSk7XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBncmFkaWVudCAoYW5nbGUpIG9mIHRoZSBsaW5lLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZ3JhZGllbnQgb2YgdGhlIGxpbmUgaW4gcmFkaWFucy5cbiAgICovXG4gIGdldEdyYWRpZW50KCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMuZHksIHRoaXMuZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIHBhcnRpY2xlIGlzIG91dHNpZGUgdGhlIHJhbmdlIG9mIHRoZSBsaW5lLlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBhcnRpY2xlIGlzIHdpdGhpbiByYW5nZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgcmFuZ2VPdXQocGFydGljbGUpIHtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYWJzKHRoaXMuZ2V0R3JhZGllbnQoKSk7XG5cbiAgICBpZiAoYW5nbGUgPD0gTWF0aFV0aWwuUEkgLyA0KSB7XG4gICAgICBpZiAocGFydGljbGUucC54IDw9IHRoaXMubWF4eCAmJiBwYXJ0aWNsZS5wLnggPj0gdGhpcy5taW54KSByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueSA8PSB0aGlzLm1heHkgJiYgcGFydGljbGUucC55ID49IHRoaXMubWlueSkgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxlbmd0aCBvZiB0aGUgbGluZS5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGUgbGluZS5cbiAgICovXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZHggKiB0aGlzLmR4ICsgdGhpcy5keSAqIHRoaXMuZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgY3Jvc3NpbmcgYmVoYXZpb3IgYmFzZWQgb24gdGhlIGNyb3NzVHlwZS5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gY2hlY2sgZm9yIGNyb3NzaW5nLlxuICAgKi9cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IFwiPlwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcIlJcIiB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gXCJyaWdodFwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcImRvd25cIikge1xuICAgICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmdldERpcmVjdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLnJhbmdlT3V0KHBhcnRpY2xlKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMuZ2V0RGlyZWN0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG5cbiAgICAgIGlmICh0aGlzLmdldERpc3RhbmNlKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSA8PSBwYXJ0aWNsZS5yYWRpdXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZHggPT09IDApIHtcbiAgICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keSA9PT0gMCkge1xuICAgICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmdldFN5bW1ldHJpYyhwYXJ0aWNsZS52KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBMaW5lWm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzIG1ldGhvZCFcIik7XG4gICAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjaXJjdWxhciB6b25lIGluIGEgMkQgc3BhY2UuXG4gKiBAZXh0ZW5kcyBab25lXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQ2lyY2xlWm9uZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBjaXJjbGUncyBjZW50ZXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgY2lyY2xlJ3MgY2VudGVyLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3JhZGl1c10gLSBUaGUgcmFkaXVzIG9mIHRoZSBjaXJjbGUuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5LCByYWRpdXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgIHRoaXMuY2VudGVyID0geyB4LCB5IH07XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHJhbmRvbSBwb3NpdGlvbiB3aXRoaW4gdGhlIGNpcmNsZS5cbiAgICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHdpdGggeCBhbmQgeSBjb29yZGluYXRlcy5cbiAgICovXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSXgyICogTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnJhbmRvbVJhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54ICsgdGhpcy5yYW5kb21SYWRpdXMgKiBNYXRoLmNvcyh0aGlzLmFuZ2xlKTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55ICsgdGhpcy5yYW5kb21SYWRpdXMgKiBNYXRoLnNpbih0aGlzLmFuZ2xlKTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgbmV3IHgtY29vcmRpbmF0ZSBvZiB0aGUgY2VudGVyLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSBuZXcgeS1jb29yZGluYXRlIG9mIHRoZSBjZW50ZXIuXG4gICAqL1xuICBzZXRDZW50ZXIoeCwgeSkge1xuICAgIHRoaXMuY2VudGVyLnggPSB4O1xuICAgIHRoaXMuY2VudGVyLnkgPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgY3Jvc3NpbmcgYmVoYXZpb3IuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjaGVjayBmb3IgY3Jvc3NpbmcuXG4gICAqL1xuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGQgPSBwYXJ0aWNsZS5wLmRpc3RhbmNlVG8odGhpcy5jZW50ZXIpO1xuXG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKGQgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnJhZGl1cykgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoZCArIHBhcnRpY2xlLnJhZGl1cyA+PSB0aGlzLnJhZGl1cykgdGhpcy5nZXRTeW1tZXRyaWMocGFydGljbGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBDaXJjbGVab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3MgbWV0aG9kIVwiKTtcbiAgICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzeW1tZXRyaWMgcG9zaXRpb24gb2YgYSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGNhbGN1bGF0ZSBzeW1tZXRyeSBmb3IuXG4gICAqL1xuICBnZXRTeW1tZXRyaWMocGFydGljbGUpIHtcbiAgICBjb25zdCB0aGEyID0gcGFydGljbGUudi5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYTEgPSB0aGlzLmdldEdyYWRpZW50KHBhcnRpY2xlKTtcblxuICAgIGNvbnN0IHRoYSA9IDIgKiAodGhhMSAtIHRoYTIpO1xuICAgIGNvbnN0IG9sZHggPSBwYXJ0aWNsZS52Lng7XG4gICAgY29uc3Qgb2xkeSA9IHBhcnRpY2xlLnYueTtcblxuICAgIHBhcnRpY2xlLnYueCA9IG9sZHggKiBNYXRoLmNvcyh0aGEpIC0gb2xkeSAqIE1hdGguc2luKHRoYSk7XG4gICAgcGFydGljbGUudi55ID0gb2xkeCAqIE1hdGguc2luKHRoYSkgKyBvbGR5ICogTWF0aC5jb3ModGhhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBncmFkaWVudCBmb3IgYSBwYXJ0aWNsZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGNhbGN1bGF0ZSB0aGUgZ3JhZGllbnQgZm9yLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY2FsY3VsYXRlZCBncmFkaWVudC5cbiAgICovXG4gIGdldEdyYWRpZW50KHBhcnRpY2xlKSB7XG4gICAgcmV0dXJuIC1NYXRoVXRpbC5QSV8yICsgTWF0aC5hdGFuMihwYXJ0aWNsZS5wLnkgLSB0aGlzLmNlbnRlci55LCBwYXJ0aWNsZS5wLnggLSB0aGlzLmNlbnRlci54KTtcbiAgfVxufVxuIiwiaW1wb3J0IFpvbmUgZnJvbSBcIi4vWm9uZVwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZWN0YW5ndWxhciB6b25lIGZvciBwYXJ0aWNsZSBzeXN0ZW1zLlxuICogQGV4dGVuZHMgWm9uZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0Wm9uZSBleHRlbmRzIFpvbmUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBSZWN0Wm9uZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlIHJlY3RhbmdsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlIHJlY3RhbmdsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt3aWR0aF0gLSBUaGUgd2lkdGggb2YgdGhlIHJlY3RhbmdsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtoZWlnaHRdIC0gVGhlIGhlaWdodCBvZiB0aGUgcmVjdGFuZ2xlLlxuICAgKi9cbiAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGggPSAyMDAsIGhlaWdodCA9IDIwMCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSByYW5kb20gcG9zaXRpb24gd2l0aGluIHRoZSByZWN0YW5ndWxhciB6b25lLlxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9IEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgcmFuZG9tIHBvc2l0aW9uLlxuICAgKi9cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoO1xuICAgIHRoaXMudmVjdG9yLnkgPSB0aGlzLnkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQ7XG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgY3Jvc3NpbmcgYmVoYXZpb3IgYmFzZWQgb24gdGhlIGNyb3NzVHlwZS5cbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gY2hlY2sgZm9yIGNyb3NzaW5nLlxuICAgKi9cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICAvLyBwYXJ0aWNsZSBkZWFkIHpvbmVcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy54KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIGVsc2UgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueCArIHRoaXMud2lkdGgpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuXG4gICAgICBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy55KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIGVsc2UgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBwYXJ0aWNsZSBib3VuZCB6b25lXG4gICAgZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyB0aGlzLndpZHRoIC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkpIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGFydGljbGUgY3Jvc3Mgem9uZVxuICAgIGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImNyb3NzXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnggJiYgcGFydGljbGUudi54IDw9IDApIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54ICsgdGhpcy53aWR0aCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCAmJiBwYXJ0aWNsZS52LnggPj0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkgJiYgcGFydGljbGUudi55IDw9IDApIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0ICYmIHBhcnRpY2xlLnYueSA+PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHpvbmUgYmFzZWQgb24gaW1hZ2UgZGF0YS5cbiAqIEBleHRlbmRzIFpvbmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2Vab25lIGV4dGVuZHMgWm9uZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIEltYWdlWm9uZS5cbiAgICogQHBhcmFtIHtJbWFnZURhdGF9IGltYWdlRGF0YSAtIFRoZSBpbWFnZSBkYXRhIHRvIHVzZSBmb3IgdGhlIHpvbmUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSAtIFRoZSB4LWNvb3JkaW5hdGUgb2Zmc2V0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gLSBUaGUgeS1jb29yZGluYXRlIG9mZnNldC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtkPTJdIC0gVGhlIHNhbXBsaW5nIGRlbnNpdHkuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbWFnZURhdGEsIHgsIHksIGQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVzZXQoaW1hZ2VEYXRhLCB4LCB5LCBkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIEltYWdlWm9uZSB3aXRoIG5ldyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge0ltYWdlRGF0YX0gaW1hZ2VEYXRhIC0gVGhlIGltYWdlIGRhdGEgdG8gdXNlIGZvciB0aGUgem9uZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt4PTBdIC0gVGhlIHgtY29vcmRpbmF0ZSBvZmZzZXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSAtIFRoZSB5LWNvb3JkaW5hdGUgb2Zmc2V0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2Q9Ml0gLSBUaGUgc2FtcGxpbmcgZGVuc2l0eS5cbiAgICovXG4gIHJlc2V0KGltYWdlRGF0YSwgeCwgeSwgZCkge1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gaW1hZ2VEYXRhO1xuICAgIHRoaXMueCA9IFV0aWwuaW5pdFZhbHVlKHgsIDApO1xuICAgIHRoaXMueSA9IFV0aWwuaW5pdFZhbHVlKHksIDApO1xuICAgIHRoaXMuZCA9IFV0aWwuaW5pdFZhbHVlKGQsIDIpO1xuXG4gICAgdGhpcy52ZWN0b3JzID0gW107XG4gICAgdGhpcy5zZXRWZWN0b3JzKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCB2ZWN0b3JzIGJhc2VkIG9uIHRoZSBpbWFnZSBkYXRhLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgdmVjdG9yIG9iamVjdC5cbiAgICovXG4gIHNldFZlY3RvcnMoKSB7XG4gICAgbGV0IGksIGo7XG4gICAgY29uc3QgbGVuZ3RoMSA9IHRoaXMuaW1hZ2VEYXRhLndpZHRoO1xuICAgIGNvbnN0IGxlbmd0aDIgPSB0aGlzLmltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMTsgaSArPSB0aGlzLmQpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5ndGgyOyBqICs9IHRoaXMuZCkge1xuICAgICAgICBsZXQgaW5kZXggPSAoKGogPj4gMCkgKiBsZW5ndGgxICsgKGkgPj4gMCkpICogNDtcblxuICAgICAgICBpZiAodGhpcy5pbWFnZURhdGEuZGF0YVtpbmRleCArIDNdID4gMCkge1xuICAgICAgICAgIHRoaXMudmVjdG9ycy5wdXNoKHsgeDogaSArIHRoaXMueCwgeTogaiArIHRoaXMueSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBwb2ludCBpcyB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGUgaW1hZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHgtY29vcmRpbmF0ZSB0byBjaGVjay5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeS1jb29yZGluYXRlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcG9pbnQgaXMgd2l0aGluIGJvdW5kcywgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgZ2V0Qm91bmQoeCwgeSkge1xuICAgIGNvbnN0IGluZGV4ID0gKCh5ID4+IDApICogdGhpcy5pbWFnZURhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuICAgIHJldHVybiB0aGlzLmltYWdlRGF0YS5kYXRhW2luZGV4ICsgM10gPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSByYW5kb20gcG9zaXRpb24gd2l0aGluIHRoZSBpbWFnZSB6b25lLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHBvc2l0aW9uLlxuICAgKi9cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgY29uc3QgdmVjdG9yID0gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMudmVjdG9ycyk7XG4gICAgcmV0dXJuIHRoaXMudmVjdG9yLmNvcHkodmVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjb2xvciBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRoZSBpbWFnZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1jb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5LWNvb3JkaW5hdGUuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCBjb250YWluaW5nIHIsIGcsIGIsIGFuZCBhIHZhbHVlcy5cbiAgICovXG4gIGdldENvbG9yKHgsIHkpIHtcbiAgICB4IC09IHRoaXMueDtcbiAgICB5IC09IHRoaXMueTtcbiAgICBjb25zdCBpID0gKCh5ID4+IDApICogdGhpcy5pbWFnZURhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaV0sXG4gICAgICBnOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAxXSxcbiAgICAgIGI6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDJdLFxuICAgICAgYTogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgM11cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFydGljbGUgY3Jvc3NpbmcgYmVoYXZpb3IuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBjaGVjayBmb3IgY3Jvc3NpbmcuXG4gICAqL1xuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJkZWFkXCIpIHtcbiAgICAgIHBhcnRpY2xlLmRlYWQgPSB0aGlzLmdldEJvdW5kKHBhcnRpY2xlLnAueCAtIHRoaXMueCwgcGFydGljbGUucC55IC0gdGhpcy55KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImJvdW5kXCIpIHtcbiAgICAgIGlmICghdGhpcy5nZXRCb3VuZChwYXJ0aWNsZS5wLnggLSB0aGlzLngsIHBhcnRpY2xlLnAueSAtIHRoaXMueSkpIHBhcnRpY2xlLnYubmVnYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBJbWFnZVpvbmUgYW5kIGNsZWFucyB1cCByZXNvdXJjZXMuXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4uL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IENpcmNsZVpvbmUgZnJvbSBcIi4uL3pvbmUvQ2lyY2xlWm9uZVwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBMaW5lWm9uZSBmcm9tIFwiLi4vem9uZS9MaW5lWm9uZVwiO1xuaW1wb3J0IFJlY3Rab25lIGZyb20gXCIuLi96b25lL1JlY3Rab25lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWRkRXZlbnRMaXN0ZW5lcihwcm90b24sIGZ1bmMpIHtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBST1RPTl9VUERBVEVfQUZURVJcIiwgKCkgPT4gZnVuYygpKTtcbiAgfSxcblxuICBnZXRTdHlsZShjb2xvciA9IFwiI2ZmMDAwMFwiKSB7XG4gICAgY29uc3QgcmdiID0gQ29sb3JVdGlsLmhleFRvUmdiKGNvbG9yKTtcbiAgICByZXR1cm4gYHJnYmEoJHtyZ2Iucn0sICR7cmdiLmd9LCAke3JnYi5ifSwgMC41KWA7XG4gIH0sXG5cbiAgZHJhd1pvbmUocHJvdG9uLCBjYW52YXMsIHpvbmUsIGNsZWFyKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdldFN0eWxlKCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCAoKSA9PiB7XG4gICAgICBpZiAoY2xlYXIpIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIGlmICh6b25lIGluc3RhbmNlb2YgUG9pbnRab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuYXJjKHpvbmUueCwgem9uZS55LCAxMCwgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIExpbmVab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oem9uZS54MSwgem9uZS55MSk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKHpvbmUueDIsIHpvbmUueTIpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgUmVjdFpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmRyYXdSZWN0KHpvbmUueCwgem9uZS55LCB6b25lLndpZHRoLCB6b25lLmhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBDaXJjbGVab25lKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5hcmMoem9uZS54LCB6b25lLnksIHpvbmUucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZHJhd0VtaXR0ZXIocHJvdG9uLCBjYW52YXMsIGVtaXR0ZXIsIGNsZWFyKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdldFN0eWxlKCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIocHJvdG9uLCAoKSA9PiB7XG4gICAgICBpZiAoY2xlYXIpIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlO1xuICAgICAgY29udGV4dC5hcmMoZW1pdHRlci5wLngsIGVtaXR0ZXIucC55LCAxMCwgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFBhcnRpY2xlIGZyb20gXCIuL2NvcmUvUGFydGljbGVcIjtcbmltcG9ydCBQb29sIGZyb20gXCIuL2NvcmUvUG9vbFwiO1xuXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuL3V0aWxzL0NvbG9yVXRpbFwiO1xuaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgUG9sYXIyRCBmcm9tIFwiLi9tYXRoL1BvbGFyMkRcIjtcbmltcG9ydCBNYXQzIGZyb20gXCIuL21hdGgvTWF0M1wiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuL21hdGgvQXJyYXlTcGFuXCI7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gXCIuL21hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi9tYXRoL2Vhc2VcIjtcblxuaW1wb3J0IFJhdGUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9SYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9pbml0aWFsaXplL0luaXRpYWxpemVcIjtcbmltcG9ydCBMaWZlIGZyb20gXCIuL2luaXRpYWxpemUvTGlmZVwiO1xuaW1wb3J0IFBvc2l0aW9uIGZyb20gXCIuL2luaXRpYWxpemUvUG9zaXRpb25cIjtcbmltcG9ydCBWZWxvY2l0eSBmcm9tIFwiLi9pbml0aWFsaXplL1ZlbG9jaXR5XCI7XG5pbXBvcnQgTWFzcyBmcm9tIFwiLi9pbml0aWFsaXplL01hc3NcIjtcbmltcG9ydCBSYWRpdXMgZnJvbSBcIi4vaW5pdGlhbGl6ZS9SYWRpdXNcIjtcbmltcG9ydCBCb2R5IGZyb20gXCIuL2luaXRpYWxpemUvQm9keVwiO1xuXG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL2JlaGF2aW91ci9CZWhhdmlvdXJcIjtcbmltcG9ydCBGb3JjZSBmcm9tIFwiLi9iZWhhdmlvdXIvRm9yY2VcIjtcbmltcG9ydCBBdHRyYWN0aW9uIGZyb20gXCIuL2JlaGF2aW91ci9BdHRyYWN0aW9uXCI7XG5pbXBvcnQgUmFuZG9tRHJpZnQgZnJvbSBcIi4vYmVoYXZpb3VyL1JhbmRvbURyaWZ0XCI7XG5pbXBvcnQgR3Jhdml0eSBmcm9tIFwiLi9iZWhhdmlvdXIvR3Jhdml0eVwiO1xuaW1wb3J0IENvbGxpc2lvbiBmcm9tIFwiLi9iZWhhdmlvdXIvQ29sbGlzaW9uXCI7XG5pbXBvcnQgQ3Jvc3Nab25lIGZyb20gXCIuL2JlaGF2aW91ci9Dcm9zc1pvbmVcIjtcbmltcG9ydCBBbHBoYSBmcm9tIFwiLi9iZWhhdmlvdXIvQWxwaGFcIjtcbmltcG9ydCBTY2FsZSBmcm9tIFwiLi9iZWhhdmlvdXIvU2NhbGVcIjtcbmltcG9ydCBSb3RhdGUgZnJvbSBcIi4vYmVoYXZpb3VyL1JvdGF0ZVwiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuL2JlaGF2aW91ci9Db2xvclwiO1xuaW1wb3J0IEN5Y2xvbmUgZnJvbSBcIi4vYmVoYXZpb3VyL0N5Y2xvbmVcIjtcbmltcG9ydCBSZXB1bHNpb24gZnJvbSBcIi4vYmVoYXZpb3VyL1JlcHVsc2lvblwiO1xuaW1wb3J0IEdyYXZpdHlXZWxsIGZyb20gXCIuL2JlaGF2aW91ci9HcmF2aXR5V2VsbFwiO1xuXG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0VtaXR0ZXJcIjtcbmltcG9ydCBCZWhhdmlvdXJFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlclwiO1xuaW1wb3J0IEZvbGxvd0VtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9Gb2xsb3dFbWl0dGVyXCI7XG5cbmltcG9ydCBDYW52YXNSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvQ2FudmFzUmVuZGVyZXJcIjtcbmltcG9ydCBEb21SZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvRG9tUmVuZGVyZXJcIjtcbmltcG9ydCBFYXNlbFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9FYXNlbFJlbmRlcmVyXCI7XG5pbXBvcnQgUGl4ZWxSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvUGl4ZWxSZW5kZXJlclwiO1xuaW1wb3J0IFBpeGlSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvUGl4aVJlbmRlcmVyXCI7XG5pbXBvcnQgV2ViR0xSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXIvV2ViR0xSZW5kZXJlclwiO1xuaW1wb3J0IEN1c3RvbVJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9DdXN0b21SZW5kZXJlclwiO1xuXG5pbXBvcnQgWm9uZSBmcm9tIFwiLi96b25lL1pvbmVcIjtcbmltcG9ydCBMaW5lWm9uZSBmcm9tIFwiLi96b25lL0xpbmVab25lXCI7XG5pbXBvcnQgQ2lyY2xlWm9uZSBmcm9tIFwiLi96b25lL0NpcmNsZVpvbmVcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4vem9uZS9Qb2ludFpvbmVcIjtcbmltcG9ydCBSZWN0Wm9uZSBmcm9tIFwiLi96b25lL1JlY3Rab25lXCI7XG5pbXBvcnQgSW1hZ2Vab25lIGZyb20gXCIuL3pvbmUvSW1hZ2Vab25lXCI7XG5cbmltcG9ydCBEZWJ1ZyBmcm9tIFwiLi9kZWJ1Zy9EZWJ1Z1wiO1xuXG4vLyBuYW1lc3BhY2VcblByb3Rvbi5QYXJ0aWNsZSA9IFBhcnRpY2xlO1xuUHJvdG9uLlBvb2wgPSBQb29sO1xuXG5Qcm90b24uVXRpbCA9IFV0aWw7XG5Qcm90b24uQ29sb3JVdGlsID0gQ29sb3JVdGlsO1xuUHJvdG9uLk1hdGhVdGlsID0gTWF0aFV0aWw7XG5Qcm90b24uVmVjdG9yMkQgPSBQcm90b24uVmVjdG9yID0gVmVjdG9yMkQ7XG5Qcm90b24uUG9sYXIyRCA9IFByb3Rvbi5Qb2xhciA9IFBvbGFyMkQ7XG5Qcm90b24uQXJyYXlTcGFuID0gQXJyYXlTcGFuO1xuUHJvdG9uLlJlY3RhbmdsZSA9IFJlY3RhbmdsZTtcblByb3Rvbi5SYXRlID0gUmF0ZTtcblByb3Rvbi5lYXNlID0gZWFzZTtcblByb3Rvbi5TcGFuID0gU3BhbjtcblByb3Rvbi5NYXQzID0gTWF0MztcblByb3Rvbi5nZXRTcGFuID0gKGEsIGIsIGNlbnRlcikgPT4gbmV3IFNwYW4oYSwgYiwgY2VudGVyKTtcblByb3Rvbi5jcmVhdGVBcnJheVNwYW4gPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuO1xuXG5Qcm90b24uSW5pdGlhbGl6ZSA9IFByb3Rvbi5Jbml0ID0gSW5pdGlhbGl6ZTtcblByb3Rvbi5MaWZlID0gUHJvdG9uLkwgPSBMaWZlO1xuUHJvdG9uLlBvc2l0aW9uID0gUHJvdG9uLlAgPSBQb3NpdGlvbjtcblByb3Rvbi5WZWxvY2l0eSA9IFByb3Rvbi5WID0gVmVsb2NpdHk7XG5Qcm90b24uTWFzcyA9IFByb3Rvbi5NID0gTWFzcztcblByb3Rvbi5SYWRpdXMgPSBQcm90b24uUiA9IFJhZGl1cztcblByb3Rvbi5Cb2R5ID0gUHJvdG9uLkIgPSBCb2R5O1xuXG5Qcm90b24uQmVoYXZpb3VyID0gQmVoYXZpb3VyO1xuUHJvdG9uLkZvcmNlID0gUHJvdG9uLkYgPSBGb3JjZTtcblByb3Rvbi5BdHRyYWN0aW9uID0gUHJvdG9uLkEgPSBBdHRyYWN0aW9uO1xuUHJvdG9uLlJhbmRvbURyaWZ0ID0gUHJvdG9uLlJEID0gUmFuZG9tRHJpZnQ7XG5Qcm90b24uR3Jhdml0eSA9IFByb3Rvbi5HID0gR3Jhdml0eTtcblByb3Rvbi5Db2xsaXNpb24gPSBDb2xsaXNpb247XG5Qcm90b24uQ3Jvc3Nab25lID0gQ3Jvc3Nab25lO1xuUHJvdG9uLkFscGhhID0gQWxwaGE7XG5Qcm90b24uU2NhbGUgPSBQcm90b24uUyA9IFNjYWxlO1xuUHJvdG9uLlJvdGF0ZSA9IFJvdGF0ZTtcblByb3Rvbi5Db2xvciA9IENvbG9yO1xuUHJvdG9uLlJlcHVsc2lvbiA9IFJlcHVsc2lvbjtcblByb3Rvbi5DeWNsb25lID0gQ3ljbG9uZTtcblByb3Rvbi5HcmF2aXR5V2VsbCA9IEdyYXZpdHlXZWxsO1xuXG5Qcm90b24uRW1pdHRlciA9IEVtaXR0ZXI7XG5Qcm90b24uQmVoYXZpb3VyRW1pdHRlciA9IEJlaGF2aW91ckVtaXR0ZXI7XG5Qcm90b24uRm9sbG93RW1pdHRlciA9IEZvbGxvd0VtaXR0ZXI7XG5cblByb3Rvbi5ab25lID0gWm9uZTtcblByb3Rvbi5MaW5lWm9uZSA9IExpbmVab25lO1xuUHJvdG9uLkNpcmNsZVpvbmUgPSBDaXJjbGVab25lO1xuUHJvdG9uLlBvaW50Wm9uZSA9IFBvaW50Wm9uZTtcblByb3Rvbi5SZWN0Wm9uZSA9IFJlY3Rab25lO1xuUHJvdG9uLkltYWdlWm9uZSA9IEltYWdlWm9uZTtcblxuUHJvdG9uLkNhbnZhc1JlbmRlcmVyID0gQ2FudmFzUmVuZGVyZXI7XG5Qcm90b24uRG9tUmVuZGVyZXIgPSBEb21SZW5kZXJlcjtcblByb3Rvbi5FYXNlbFJlbmRlcmVyID0gRWFzZWxSZW5kZXJlcjtcblByb3Rvbi5QaXhpUmVuZGVyZXIgPSBQaXhpUmVuZGVyZXI7XG5Qcm90b24uUGl4ZWxSZW5kZXJlciA9IFBpeGVsUmVuZGVyZXI7XG5Qcm90b24uV2ViR0xSZW5kZXJlciA9IFByb3Rvbi5XZWJHbFJlbmRlcmVyID0gV2ViR0xSZW5kZXJlcjtcblByb3Rvbi5DdXN0b21SZW5kZXJlciA9IEN1c3RvbVJlbmRlcmVyO1xuXG5Qcm90b24uRGVidWcgPSBEZWJ1ZztcblV0aWwuYXNzaWduKFByb3RvbiwgZWFzZSk7XG5cbi8vIGV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgUHJvdG9uO1xuZXhwb3J0IHtcbiAgUGFydGljbGUsXG4gIFBvb2wsXG4gIFV0aWwsXG4gIENvbG9yVXRpbCxcbiAgTWF0aFV0aWwsXG4gIFZlY3RvcjJELFxuICBQb2xhcjJELFxuICBNYXQzLFxuICBTcGFuLFxuICBBcnJheVNwYW4sXG4gIFJlY3RhbmdsZSxcbiAgZWFzZSxcbiAgUmF0ZSxcbiAgSW5pdGlhbGl6ZSxcbiAgTGlmZSxcbiAgUG9zaXRpb24sXG4gIFZlbG9jaXR5LFxuICBNYXNzLFxuICBSYWRpdXMsXG4gIEJvZHksXG4gIEJlaGF2aW91cixcbiAgRm9yY2UsXG4gIEF0dHJhY3Rpb24sXG4gIFJhbmRvbURyaWZ0LFxuICBHcmF2aXR5LFxuICBDb2xsaXNpb24sXG4gIENyb3NzWm9uZSxcbiAgQWxwaGEsXG4gIFNjYWxlLFxuICBSb3RhdGUsXG4gIENvbG9yLFxuICBDeWNsb25lLFxuICBSZXB1bHNpb24sXG4gIEdyYXZpdHlXZWxsLFxuICBFbWl0dGVyLFxuICBCZWhhdmlvdXJFbWl0dGVyLFxuICBGb2xsb3dFbWl0dGVyLFxuICBDYW52YXNSZW5kZXJlcixcbiAgRG9tUmVuZGVyZXIsXG4gIEVhc2VsUmVuZGVyZXIsXG4gIFBpeGVsUmVuZGVyZXIsXG4gIFBpeGlSZW5kZXJlcixcbiAgV2ViR0xSZW5kZXJlcixcbiAgQ3VzdG9tUmVuZGVyZXIsXG4gIFpvbmUsXG4gIExpbmVab25lLFxuICBDaXJjbGVab25lLFxuICBQb2ludFpvbmUsXG4gIFJlY3Rab25lLFxuICBJbWFnZVpvbmUsXG4gIERlYnVnLFxufTtcbiJdLCJuYW1lcyI6WyJpcG90IiwibGVuZ3RoIiwibmhwb3QiLCJpIiwibWFrZVRyYW5zbGF0aW9uIiwidHgiLCJ0eSIsIm1ha2VSb3RhdGlvbiIsImFuZ2xlSW5SYWRpYW5zIiwiYyIsIk1hdGgiLCJjb3MiLCJzIiwic2luIiwibWFrZVNjYWxlIiwic3giLCJzeSIsIm1hdHJpeE11bHRpcGx5IiwiYSIsImIiLCJhMDAiLCJhMDEiLCJhMDIiLCJhMTAiLCJhMTEiLCJhMTIiLCJhMjAiLCJhMjEiLCJhMjIiLCJiMDAiLCJiMDEiLCJiMDIiLCJiMTAiLCJiMTEiLCJiMTIiLCJiMjAiLCJiMjEiLCJiMjIiLCJjcmVhdGVDYW52YXMiLCJpZCIsIndpZHRoIiwiaGVpZ2h0IiwicG9zaXRpb24iLCJkb20iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsIm9wYWNpdHkiLCJ0cmFuc2Zvcm0iLCJjcmVhdGVEaXYiLCJyZXNpemUiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiZGl2IiwieCIsInkiLCJzY2FsZSIsInJvdGF0ZSIsIndpbGxDaGFuZ2UiLCJjc3MzIiwidHJhbnNmb3JtM2QiLCJrZXkiLCJ2YWwiLCJia2V5IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJpbWdzQ2FjaGUiLCJjYW52YXNDYWNoZSIsImNhbnZhc0lkIiwiZ2V0SW1hZ2VEYXRhIiwiY29udGV4dCIsImltYWdlIiwicmVjdCIsImRyYXdJbWFnZSIsImltYWdlZGF0YSIsImNsZWFyUmVjdCIsImdldEltZ0Zyb21DYWNoZSIsImltZyIsImNhbGxiYWNrIiwicGFyYW0iLCJzcmMiLCJJbWFnZSIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJnZXRDYW52YXNGcm9tQ2FjaGUiLCJXZWJHTFV0aWwiLCJjYW52YXMiLCJEb21VdGlsIiwiZ2V0Q29udGV4dCIsImluaXRWYWx1ZSIsInZhbHVlIiwiZGVmYXVsdHMiLCJ1bmRlZmluZWQiLCJpc0FycmF5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiZW1wdHlBcnJheSIsImFyciIsInRvQXJyYXkiLCJzbGljZUFycmF5IiwiYXJyMSIsImluZGV4IiwiYXJyMiIsInB1c2giLCJnZXRSYW5kRnJvbUFycmF5IiwiZmxvb3IiLCJyYW5kb20iLCJlbXB0eU9iamVjdCIsIm9iaiIsImlnbm9yZSIsImluZGV4T2YiLCJjbGFzc0FwcGx5IiwiY29uc3RydWN0b3IiLCJhcmdzIiwiRmFjdG9yeUZ1bmMiLCJiaW5kIiwiYXBwbHkiLCJjb25jYXQiLCJJbWdVdGlsIiwiZGVzdHJveUFsbCIsImRlc3Ryb3kiLCJhc3NpZ24iLCJzb3VyY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImlkc01hcCIsIlB1aWQiLCJfaW5kZXgiLCJfY2FjaGUiLCJ0eXBlIiwiZ2V0SWQiLCJ1aWQiLCJnZXRJZEZyb21DYWNoZSIsImlzQm9keSIsImlzSW5uZXIiLCJnZXRUYXJnZXQiLCJQb29sIiwibnVtIiwidG90YWwiLCJjYWNoZSIsIl9wcm90byIsImdldCIsInBhcmFtcyIsInAiLCJfX3B1aWQiLCJwb3AiLCJjcmVhdGVPckNsb25lIiwiZXhwaXJlIiwiZ2V0Q2FjaGUiLCJjcmVhdGUiLCJVdGlsIiwiY2xvbmUiLCJnZXRDb3VudCIsImNvdW50IiwiU3RhdHMiLCJwcm90b24iLCJjb250YWluZXIiLCJlbWl0dGVySW5kZXgiLCJyZW5kZXJlckluZGV4IiwidXBkYXRlIiwiYm9keSIsImFkZCIsImVtaXR0ZXIiLCJnZXRFbWl0dGVyIiwicmVuZGVyZXIiLCJnZXRSZW5kZXJlciIsInN0ciIsImVtaXR0ZXJzIiwiZW1pdFNwZWVkIiwiZ2V0RW1pdHRlclBvcyIsImluaXRpYWxpemVzIiwiY29uY2F0QXJyIiwiYmVoYXZpb3VycyIsIm5hbWUiLCJnZXRDcmVhdGVkTnVtYmVyIiwicG9vbCIsImlubmVySFRNTCIsIl90aGlzIiwiY3NzVGV4dCIsImpvaW4iLCJhZGRFdmVudExpc3RlbmVyIiwiYmciLCJjb2xvciIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsInJlbmRlcmVycyIsInJlc3VsdCIsImNwb29sIiwicm91bmQiLCJyZW1vdmVDaGlsZCIsIkV2ZW50RGlzcGF0Y2hlciIsIl9saXN0ZW5lcnMiLCJkaXNwYXRjaEV2ZW50IiwiaGFzRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVBbGxFdmVudExpc3RlbmVycyIsImxpc3RlbmVyIiwic3BsaWNlIiwibGlzdGVuZXJzIiwiaGFuZGxlciIsIlBJIiwiSU5GSU5JVFkiLCJJbmZpbml0eSIsIk1hdGhVdGlsIiwiUEl4MiIsIlBJXzIiLCJQSV8xODAiLCJOMTgwX1BJIiwiaXNJbmZpbml0eSIsInJhbmRvbUFUb0IiLCJpc0ludCIsInJhbmRvbUZsb2F0aW5nIiwiY2VudGVyIiwiZiIsInJhbmRvbUNvbG9yIiwic2xpY2UiLCJyYW5kb21ab25lIiwiZGlzcGxheSIsImsiLCJkaWdpdHMiLCJwb3ciLCJkZWdyZWVUcmFuc2Zvcm0iLCJ0b0NvbG9yMTYiLCJJbnRlZ3JhdGlvbiIsImNhbGN1bGF0ZSIsInBhcnRpY2xlcyIsInRpbWUiLCJkYW1waW5nIiwiZXVsZXJJbnRlZ3JhdGUiLCJwYXJ0aWNsZSIsInNsZWVwIiwib2xkIiwiY29weSIsInYiLCJtdWx0aXBseVNjYWxhciIsIm1hc3MiLCJjbGVhciIsIlByb3RvbiIsImludGVncmF0aW9uVHlwZSIsIm5vdyIsInRoZW4iLCJlbGFwc2VkIiwic3RhdHMiLCJFVUxFUiIsImludGVncmF0b3IiLCJfZnBzIiwiX2ludGVydmFsIiwiREVGQVVMVF9JTlRFUlZBTCIsImFkZFJlbmRlcmVyIiwicmVuZGVyIiwiaW5pdCIsInJlbW92ZVJlbmRlcmVyIiwicmVtb3ZlIiwiYWRkRW1pdHRlciIsInBhcmVudCIsIkVNSVRURVJfQURERUQiLCJyZW1vdmVFbWl0dGVyIiwiRU1JVFRFUl9SRU1PVkVEIiwiUFJPVE9OX1VQREFURSIsIlVTRV9DTE9DSyIsIkRhdGUiLCJnZXRUaW1lIiwiYW1lbmRDaGFuZ2VUYWJzQnVnIiwiZW1pdHRlcnNVcGRhdGUiLCJQUk9UT05fVVBEQVRFX0FGVEVSIiwiZ2V0QWxsUGFydGljbGVzIiwiZGVzdHJveUFsbEVtaXR0ZXJzIiwiZGVzdHJveU90aGVyIiwic2V0VGltZW91dCIsIl9jcmVhdGVDbGFzcyIsInNldCIsImZwcyIsIk1FQVNVUkUiLCJSSzIiLCJQQVJUSUNMRV9DUkVBVEVEIiwiUEFSVElDTEVfVVBEQVRFIiwiUEFSVElDTEVfU0xFRVAiLCJQQVJUSUNMRV9ERUFEIiwiUmdiIiwiciIsImciLCJyZXNldCIsIlNwYW4iLCJnZXRWYWx1ZSIsInNldFNwYW5WYWx1ZSIsImdldFNwYW5WYWx1ZSIsInBhbiIsImhhc1Byb3AiLCJzZXRQcm9wIiwicHJvcHMiLCJwcm9wIiwic2V0VmVjdG9yVmFsIiwiY29uZiIsImVhc2VMaW5lYXIiLCJlYXNlSW5RdWFkIiwiZWFzZU91dFF1YWQiLCJlYXNlSW5PdXRRdWFkIiwiZWFzZUluQ3ViaWMiLCJlYXNlT3V0Q3ViaWMiLCJlYXNlSW5PdXRDdWJpYyIsImVhc2VJblF1YXJ0IiwiZWFzZU91dFF1YXJ0IiwiZWFzZUluT3V0UXVhcnQiLCJlYXNlSW5TaW5lIiwiZWFzZU91dFNpbmUiLCJlYXNlSW5PdXRTaW5lIiwiZWFzZUluRXhwbyIsImVhc2VPdXRFeHBvIiwiZWFzZUluT3V0RXhwbyIsImVhc2VJbkNpcmMiLCJzcXJ0IiwiZWFzZU91dENpcmMiLCJlYXNlSW5PdXRDaXJjIiwiZWFzZUluQmFjayIsImVhc2VPdXRCYWNrIiwiZWFzZUluT3V0QmFjayIsImdldEVhc2luZyIsImVhc2UiLCJWZWN0b3IyRCIsInNldFgiLCJzZXRZIiwiZ2V0R3JhZGllbnQiLCJhdGFuMiIsInciLCJhZGRWZWN0b3JzIiwiYWRkWFkiLCJzdWIiLCJzdWJWZWN0b3JzIiwiZGl2aWRlU2NhbGFyIiwibmVnYXRlIiwiZG90IiwibGVuZ3RoU3EiLCJub3JtYWxpemUiLCJkaXN0YW5jZVRvIiwiZGlzdGFuY2VUb1NxdWFyZWQiLCJ0aGEiLCJkeCIsImR5IiwibGVycCIsImFscGhhIiwiZXF1YWxzIiwiUGFydGljbGUiLCJkYXRhIiwicmdiIiwiUHJvcFV0aWwiLCJnZXREaXJlY3Rpb24iLCJsaWZlIiwiYWdlIiwiZGVhZCIsInNwcml0ZSIsImVuZXJneSIsInJhZGl1cyIsInJvdGF0aW9uIiwiZWFzaW5nIiwicmVtb3ZlQWxsQmVoYXZpb3VycyIsImFwcGx5QmVoYXZpb3VycyIsIm1heCIsImFwcGx5QmVoYXZpb3VyIiwiYWRkQmVoYXZpb3VyIiwiYmVoYXZpb3VyIiwicGFyZW50cyIsImluaXRpYWxpemUiLCJhZGRCZWhhdmlvdXJzIiwicmVtb3ZlQmVoYXZpb3VyIiwiaGV4VG9SZ2IiLCJoIiwiaGV4MTYiLCJzdWJzdHJpbmciLCJwYXJzZUludCIsInJnYlRvSGV4IiwicmJnIiwiZ2V0SGV4MTZGcm9tUGFydGljbGUiLCJOdW1iZXIiLCJQb2xhcjJEIiwiYWJzIiwic2V0UiIsInNldFRoYSIsInRvVmVjdG9yIiwiZ2V0WCIsImdldFkiLCJNYXQzIiwibWF0MyIsIm1hdCIsIkZsb2F0MzJBcnJheSIsIm1hdDEiLCJtYXQyIiwibXVsdGlwbHkiLCJpbnZlcnNlIiwiZCIsIm11bHRpcGx5VmVjMiIsIm0iLCJ2ZWMiLCJBcnJheVNwYW4iLCJfU3BhbiIsIl9hcnIiLCJfaW5oZXJpdHNMb29zZSIsImNyZWF0ZUFycmF5U3BhbiIsIlJlY3RhbmdsZSIsImJvdHRvbSIsInJpZ2h0IiwiY29udGFpbnMiLCJSYXRlIiwibnVtcGFuIiwidGltZXBhbiIsIm51bVBhbiIsInRpbWVQYW4iLCJzdGFydFRpbWUiLCJuZXh0VGltZSIsIkluaXRpYWxpemUiLCJMaWZlIiwiX0luaXRpYWxpemUiLCJsaWZlUGFuIiwiWm9uZSIsInZlY3RvciIsImNyb3NzVHlwZSIsImFsZXJ0IiwiZ2V0UG9zaXRpb24iLCJjcm9zc2luZyIsIlBvaW50Wm9uZSIsIl9ab25lIiwiY29uc29sZSIsImVycm9yIiwiUG9zaXRpb24iLCJ6b25lIiwiVmVsb2NpdHkiLCJycGFuIiwidGhhcGFuIiwiclBhbiIsInRoYVBhbiIsIm5vcm1hbGl6ZVZlbG9jaXR5IiwidnIiLCJwb2xhcjJkIiwiTWFzcyIsIm1hc3NQYW4iLCJSYWRpdXMiLCJvbGRSYWRpdXMiLCJCb2R5IiwiaW1hZ2VUYXJnZXQiLCJpbm5lciIsIkJlaGF2aW91ciIsIm5vcm1hbGl6ZUZvcmNlIiwiZm9yY2UiLCJub3JtYWxpemVWYWx1ZSIsIkZvcmNlIiwiX0JlaGF2aW91ciIsImZ4IiwiZnkiLCJBdHRyYWN0aW9uIiwidGFyZ2V0UG9zaXRpb24iLCJyYWRpdXNTcSIsImF0dHJhY3Rpb25Gb3JjZSIsIlJhbmRvbURyaWZ0IiwiZHJpZnRYIiwiZHJpZnRZIiwiZGVsYXkiLCJwYW5Gb2NlIiwiR3Jhdml0eSIsIl9Gb3JjZSIsIkNvbGxpc2lvbiIsIm5ld1Bvb2wiLCJjb2xsaXNpb25Qb29sIiwiZGVsdGEiLCJvdGhlclBhcnRpY2xlIiwib3ZlcmxhcCIsInRvdGFsTWFzcyIsImF2ZXJhZ2VNYXNzMSIsImF2ZXJhZ2VNYXNzMiIsImRpc3RhbmNlIiwiQ3Jvc3Nab25lIiwiQWxwaGEiLCJzYW1lIiwiYWxwaGFBIiwiYWxwaGFCIiwiU2NhbGUiLCJzY2FsZUEiLCJzY2FsZUIiLCJSb3RhdGUiLCJpbmZsdWVuY2UiLCJyb3RhdGlvbkEiLCJyb3RhdGlvbkIiLCJDb2xvciIsImNvbG9yQSIsIkNvbG9yVXRpbCIsImNvbG9yQiIsIkNIQU5HSU5HIiwiQ3ljbG9uZSIsImFuZ2xlIiwic2V0QW5nbGVBbmRGb3JjZSIsInNwYW4iLCJTdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImNhbmdsZSIsImN5Y2xvbmUiLCJncmFkaWVudCIsIlJlcHVsc2lvbiIsIl9BdHRyYWN0aW9uIiwiR3Jhdml0eVdlbGwiLCJjZW50ZXJQb2ludCIsImRpc3RhbmNlVmVjIiwiZGlzdGFuY2VTcSIsImZhY3RvciIsImJpbmRFbWl0dGVyIiwiRW1pdHRlciIsIl9QYXJ0aWNsZSIsImVtaXRUaW1lIiwidG90YWxUaW1lIiwicmF0ZSIsImVtaXQiLCJzdG9wZWQiLCJpc05hTiIsInN0b3AiLCJwcmVFbWl0Iiwib2xkU3RvcGVkIiwib2xkRW1pdFRpbWUiLCJvbGRUb3RhbFRpbWUiLCJzdGVwIiwicmVtb3ZlQWxsUGFydGljbGVzIiwiYWRkU2VsZkluaXRpYWxpemUiLCJhZGRJbml0aWFsaXplIiwiX2xlbiIsImFyZ3VtZW50cyIsInJlc3QiLCJBcnJheSIsIl9rZXkiLCJyZW1vdmVJbml0aWFsaXplIiwiaW5pdGlhbGl6ZXIiLCJyZW1vdmVBbGxJbml0aWFsaXplcnMiLCJfbGVuMiIsIl9rZXkyIiwiZW1pdHRpbmciLCJpbnRlZ3JhdGUiLCJkaXNwYXRjaCIsImV2ZW50IiwiYmluZEV2ZW50IiwiY3JlYXRlUGFydGljbGUiLCJzZXR1cFBhcnRpY2xlIiwiSW5pdGlhbGl6ZVV0aWwiLCJCZWhhdmlvdXJFbWl0dGVyIiwiX0VtaXR0ZXIiLCJzZWxmQmVoYXZpb3VycyIsImFkZFNlbGZCZWhhdmlvdXIiLCJyZW1vdmVTZWxmQmVoYXZpb3VyIiwiRm9sbG93RW1pdHRlciIsIm1vdXNlVGFyZ2V0Iiwid2luZG93IiwiX2FsbG93RW1pdHRpbmciLCJpbml0RXZlbnRIYW5kbGVyIiwiX3RoaXMyIiwibW91c2Vtb3ZlSGFuZGxlciIsIm1vdXNlbW92ZSIsIm1vdXNlZG93bkhhbmRsZXIiLCJtb3VzZWRvd24iLCJtb3VzZXVwSGFuZGxlciIsIm1vdXNldXAiLCJsYXllclgiLCJsYXllclkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImlzSW1hZ2UiLCJfX2lzSW1hZ2UiLCJ0YWdOYW1lIiwibm9kZU5hbWUiLCJpc1N0cmluZyIsIkJhc2VSZW5kZXJlciIsImVsZW1lbnQiLCJzdHJva2UiLCJjaXJjbGVDb25mIiwiaXNDaXJjbGUiLCJzZXRTdHJva2UiLCJ0aGlua25lc3MiLCJfcHJvdG9uVXBkYXRlSGFuZGxlciIsIm9uUHJvdG9uVXBkYXRlIiwiX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlciIsIm9uUHJvdG9uVXBkYXRlQWZ0ZXIiLCJfZW1pdHRlckFkZGVkSGFuZGxlciIsIm9uRW1pdHRlckFkZGVkIiwiX2VtaXR0ZXJSZW1vdmVkSGFuZGxlciIsIm9uRW1pdHRlclJlbW92ZWQiLCJfcGFydGljbGVDcmVhdGVkSGFuZGxlciIsIm9uUGFydGljbGVDcmVhdGVkIiwiX3BhcnRpY2xlVXBkYXRlSGFuZGxlciIsIm9uUGFydGljbGVVcGRhdGUiLCJfcGFydGljbGVEZWFkSGFuZGxlciIsIm9uUGFydGljbGVEZWFkIiwiQ2FudmFzUmVuZGVyZXIiLCJfQmFzZVJlbmRlcmVyIiwiYnVmZmVyQ2FjaGUiLCJhZGRJbWcyQm9keSIsIlR5cGVzIiwiZHJhd0NpcmNsZSIsImJ1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImJ1ZkNvbnRleHQiLCJnbG9iYWxBbHBoYSIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic2F2ZSIsInRyYW5zbGF0ZSIsInJlc3RvcmUiLCJiZWdpblBhdGgiLCJhcmMiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsImNsb3NlUGF0aCIsImZpbGwiLCJzaXplIiwiRG9tUmVuZGVyZXIiLCJjcmVhdGVCb2R5IiwiYm9keVJlYWR5IiwiYmFja2dyb3VuZENvbG9yIiwiY3JlYXRlQ2lyY2xlIiwiY3JlYXRlU3ByaXRlIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsInVybCIsImJhY2tncm91bmRJbWFnZSIsIkVhc2VsUmVuZGVyZXIiLCJhZGRDaGlsZCIsInNjYWxlWCIsInNjYWxlWSIsImdyYXBoaWNzIiwicmVnWCIsInJlZ1kiLCJjcmVhdGVqcyIsIkdyYXBoaWNzIiwiYmVnaW5TdHJva2UiLCJiZWdpbkZpbGwiLCJzaGFwZSIsIlNoYXBlIiwiUGl4ZWxSZW5kZXJlciIsInJlY3RhbmdsZSIsImltYWdlRGF0YSIsImNyZWF0ZUltYWdlRGF0YSIsInB1dEltYWdlRGF0YSIsInNldFBpeGVsIiwiUElYSUNsYXNzIiwiUGl4aVJlbmRlcmVyIiwic2V0Q29sb3IiLCJibGVuZE1vZGUiLCJzZXRQSVhJIiwiUElYSSIsIlNwcml0ZSIsImNyZWF0ZUZyb21JbWFnZSIsImZyb20iLCJmcm9tSW1hZ2UiLCJ0aW50IiwiYW5jaG9yIiwiZW5kRmlsbCIsIk1TdGFjayIsIm1hdHMiLCJ0b3AiLCJXZWJHTFJlbmRlcmVyIiwiZ2wiLCJhbnRpYWxpYXMiLCJzdGVuY2lsIiwiZGVwdGgiLCJpbml0VmFyIiwic2V0TWF4UmFkaXVzIiwiaW5pdFNoYWRlcnMiLCJpbml0QnVmZmVycyIsImJsZW5kRXF1YXRpb24iLCJGVU5DX0FERCIsImJsZW5kRnVuYyIsIlNSQ19BTFBIQSIsIk9ORV9NSU5VU19TUkNfQUxQSEEiLCJlbmFibGUiLCJCTEVORCIsInVtYXQiLCJzbWF0IiwibXN0YWNrIiwidmlld3BvcnQiLCJjaXJjbGVDYW52YXNVUkwiLCJnZXRWZXJ0ZXhTaGFkZXIiLCJ2c1NvdXJjZSIsImdldEZyYWdtZW50U2hhZGVyIiwiZnNTb3VyY2UiLCJ0ZXh0dXJlYnVmZmVycyIsIkEiLCJCIiwiZ2V0U2hhZGVyIiwiZnMiLCJzaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJGUkFHTUVOVF9TSEFERVIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImZyYWdtZW50U2hhZGVyIiwidmVydGV4U2hhZGVyIiwic3Byb2dyYW0iLCJjcmVhdGVQcm9ncmFtIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJnZXRQcm9ncmFtUGFyYW1ldGVyIiwiTElOS19TVEFUVVMiLCJ1c2VQcm9ncmFtIiwidnBhIiwiZ2V0QXR0cmliTG9jYXRpb24iLCJ0Y2EiLCJlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSIsInRNYXRVbmlmb3JtIiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwic2FtcGxlclVuaWZvcm0iLCJ1c2VUZXgiLCJ1bmlmb3JtMWkiLCJ2cyIsImlkeCIsInVuaXRJQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiYnVmZmVyRGF0YSIsIlVpbnQxNkFycmF5IiwiU1RBVElDX0RSQVciLCJpZHMiLCJ1bml0STMzIiwic3RyaXBCdWZmZXIiLCJyYWlkdXMiLCJjaXJjbGVDYW52YXNSYWRpdXMiLCJ0b0RhdGFVUkwiLCJkcmF3SW1nMkNhbnZhcyIsIl93IiwiX2giLCJfd2lkdGgiLCJfaGVpZ2h0IiwiX3NjYWxlWCIsIl9zY2FsZVkiLCJjcmVhdGVUZXh0dXJlIiwidGV4dHVyZSIsInZjQnVmZmVyIiwidGNCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhJbWFnZTJEIiwiUkdCQSIsIlVOU0lHTkVEX0JZVEUiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTElORUFSIiwiVEVYVFVSRV9NSU5fRklMVEVSIiwiTElORUFSX01JUE1BUF9ORUFSRVNUIiwiZ2VuZXJhdGVNaXBtYXAiLCJ0ZXh0dXJlTG9hZGVkIiwidGV4dHVyZVdpZHRoIiwidGV4dHVyZUhlaWdodCIsInRtYXQiLCJpbWF0Iiwib2xkU2NhbGUiLCJ1cGRhdGVNYXRyaXgiLCJ1bmlmb3JtM2YiLCJ1bmlmb3JtTWF0cml4M2Z2IiwidmVydGV4QXR0cmliUG9pbnRlciIsIkZMT0FUIiwiZHJhd0VsZW1lbnRzIiwiVFJJQU5HTEVTIiwiVU5TSUdORURfU0hPUlQiLCJtb3ZlT3JpZ2luTWF0cml4IiwidHJhbnNsYXRpb25NYXRyaXgiLCJhbmdlbCIsInJvdGF0aW9uTWF0cml4Iiwic2NhbGVNYXRyaXgiLCJtYXRyaXgiLCJDdXN0b21SZW5kZXJlciIsIkxpbmVab25lIiwieDEiLCJ5MSIsIngyIiwieTIiLCJkaXJlY3Rpb24iLCJtaW54IiwibWluIiwibWlueSIsIm1heHgiLCJtYXh5IiwieHh5eSIsImdldExlbmd0aCIsIkMiLCJEIiwiZ2V0RGlzdGFuY2UiLCJnZXRTeW1tZXRyaWMiLCJ0aGEyIiwidGhhMSIsIm9sZHgiLCJvbGR5IiwicmFuZ2VPdXQiLCJDaXJjbGVab25lIiwicmFuZG9tUmFkaXVzIiwic2V0Q2VudGVyIiwiUmVjdFpvbmUiLCJJbWFnZVpvbmUiLCJ2ZWN0b3JzIiwic2V0VmVjdG9ycyIsImoiLCJsZW5ndGgxIiwibGVuZ3RoMiIsImdldEJvdW5kIiwiZ2V0Q29sb3IiLCJmdW5jIiwiZ2V0U3R5bGUiLCJkcmF3Wm9uZSIsIm1vdmVUbyIsImxpbmVUbyIsImRyYXdSZWN0IiwiZHJhd0VtaXR0ZXIiLCJWZWN0b3IiLCJQb2xhciIsImdldFNwYW4iLCJJbml0IiwiTCIsIlAiLCJWIiwi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
