(function(Proton, undefined) {

    /**
     * @namespace
     * @memberof! Proton#
     * @alias Proton.Util
     */
    var Util = Util || {

        /**
         * Returns the default if the value is null or undefined
         *
         * @memberof Proton#Proton.Util
         * @method initValue
         *
         * @param {Mixed} value a specific value, could be everything but null or undefined
         * @param {Mixed} defaults the default if the value is null or undefined
         */
        initValue: function(value, defaults) {
            var value = (value != null && value != undefined) ? value : defaults;
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
        isArray: function(value) {
            return typeof value === 'object' && value.hasOwnProperty('length');
        },

        /**
         * Destroyes the given array
         *
         * @memberof Proton#Proton.Util
         * @method destroyArray
         *
         * @param {Array} array Any array
         */
        destroyArray: function(array) {
            array.length = 0;
        },

        /**
         * Destroyes the given object
         *
         * @memberof Proton#Proton.Util
         * @method destroyObject
         *
         * @param {Object} obj Any object
         */
        destroyObject: function(obj) {
            for (var o in obj)
                delete obj[o];
        },

        /**
         * Returns the Vector2D - or creates a new one
         *
         * @memberof Proton#Proton.Util
         * @method getVector2D
         *
         * @param {Proton.Vector2D | Number} postionOrX
         * @param {Number} [y] just valid if 'postionOrX' is not an object
         *
         * @return {Proton.Vector2D}
         */
        getVector2D: function(postionOrX, y) {
            if (typeof(postionOrX) == 'object') {
                return postionOrX;
            } else {
                var vector2d = new Proton.Vector2D(postionOrX, y);
                return vector2d;
            }
        },

        /**
         * Makes an instance of a class and binds the given array
         *
         * @memberof Proton#Proton.Util
         * @method classApply
         *
         * @param {Function} constructor A class to make an instance from
         * @param {Array} [argArray] Any array to bind it to the constructor
         *
         * @return {Object} The instance of constructor, optionally bind with argArray
         */
        classApply: function(constructor, argArray) {
            if (!argArray) return new constructor;

            var args = [null].concat(argArray);
            var factoryFunction = constructor.bind.apply(constructor, args);
            return new factoryFunction();
        },

        /**
         * @memberof Proton#Proton.Util
         * @method judgeVector2D
         *
         * @todo add description for param `pOBJ`
         * @todo add description for function
         *
         * @param {Object} pOBJ
         *
         * @return {String} result
         */
        judgeVector2D: function(pOBJ) {
            var result = '';
            if (pOBJ.hasOwnProperty('x') || pOBJ.hasOwnProperty('y') || pOBJ.hasOwnProperty('p') || pOBJ.hasOwnProperty('position'))
                result += 'p';
            if (pOBJ.hasOwnProperty('vx') || pOBJ.hasOwnProperty('vx') || pOBJ.hasOwnProperty('v') || pOBJ.hasOwnProperty('velocity'))
                result += 'v';
            if (pOBJ.hasOwnProperty('ax') || pOBJ.hasOwnProperty('ax') || pOBJ.hasOwnProperty('a') || pOBJ.hasOwnProperty('accelerate'))
                result += 'a';

            return result;
        },

        /**
         * @memberof Proton#Proton.Util
         * @method setVector2DByObject
         *
         * @todo add description for param `target`
         * @todo add description for param `pOBJ`
         * @todo add description for function
         *
         * @param {Object} target
         * @param {Object} pOBJ
         */
        setVector2DByObject: function(target, pOBJ) {
            if (pOBJ.hasOwnProperty('x'))
                target.p.x = pOBJ['x'];

            if (pOBJ.hasOwnProperty('y'))
                target.p.y = pOBJ['y'];

            if (pOBJ.hasOwnProperty('vx'))
                target.v.x = pOBJ['vx'];

            if (pOBJ.hasOwnProperty('vy'))
                target.v.y = pOBJ['vy'];

            if (pOBJ.hasOwnProperty('ax'))
                target.a.x = pOBJ['ax'];

            if (pOBJ.hasOwnProperty('ay'))
                target.a.y = pOBJ['ay'];

            if (pOBJ.hasOwnProperty('p'))
                particle.p.copy(pOBJ['p']);

            if (pOBJ.hasOwnProperty('v'))
                particle.v.copy(pOBJ['v']);

            if (pOBJ.hasOwnProperty('a'))
                particle.a.copy(pOBJ['a']);

            if (pOBJ.hasOwnProperty('position'))
                particle.p.copy(pOBJ['position']);

            if (pOBJ.hasOwnProperty('velocity'))
                particle.v.copy(pOBJ['velocity']);

            if (pOBJ.hasOwnProperty('accelerate'))
                particle.a.copy(pOBJ['accelerate']);
        },

        /**
         * 强行添加属性
         *
         * @memberof Proton#Proton.Util
         * @method addPrototypeByObject
         *
         * @todo add description for param `target`
         * @todo add description for param `filters`
         * @todo translate desription from chinese to english
         *
         * @param {Object} target
         * @param {Object} prototypeObject An object of single prototypes
         * @param {Object} filters
         *
         * @return {Object} target
         */
        addPrototypeByObject: function(target, prototypeObject, filters) {
            for (var singlePrototype in prototypeObject) {
                if (filters) {
                    if (filters.indexOf(singlePrototype) < 0)
                        target[singlePrototype] = Proton.Util.getSpanValue(prototypeObject[singlePrototype]);
                } else {
                    target[singlePrototype] = Proton.Util.getSpanValue(prototypeObject[singlePrototype]);
                }
            }

            return target;
        },

        /**
         * set the prototype in a given prototypeObject
         *
         * @memberof Proton#Proton.Util
         * @method setPrototypeByObject
         *
         * @todo add description for param `target`
         * @todo add description for param `filters`
         * @todo translate desription from chinese to english
         *
         * @param {Object} target
         * @param {Object} prototypeObject An object of single prototypes
         * @param {Object} filters
         *
         * @return {Object} target
         */
        setPrototypeByObject: function(target, prototypeObject, filters) {
            for (var singlePrototype in prototypeObject) {
                if (target.hasOwnProperty(singlePrototype)) {
                    if (filters) {
                        if (filters.indexOf(singlePrototype) < 0)
                            target[singlePrototype] = Proton.Util.getSpanValue(prototypeObject[singlePrototype]);
                    } else {
                        target[singlePrototype] = Proton.Util.getSpanValue(prototypeObject[singlePrototype]);
                    }
                }
            }

            return target;
        },

        /**
         * Returns a new Proton.Span object
         *
         * @memberof Proton#Proton.Util
         * @method setSpanValue
         *
         * @todo a, b and c should be 'Mixed' or 'Number'?
         *
         * @param {Mixed | Proton.Span} a
         * @param {Mixed}               b
         * @param {Mixed}               c
         *
         * @return {Proton.Span}
         */
        setSpanValue: function(a, b, c) {
            if (a instanceof Proton.Span) {
                return a;
            } else {
                if (!b) {
                    return new Proton.Span(a);
                } else {
                    if (!c)
                        return new Proton.Span(a, b);
                    else
                        return new Proton.Span(a, b, c);
                }
            }
        },

        /**
         * Returns the value from a Proton.Span, if the param is not a Proton.Span it will return the given parameter
         *
         * @memberof Proton#Proton.Util
         * @method getSpanValue
         *
         * @param {Mixed | Proton.Span} pan
         *
         * @return {Mixed} the value of Proton.Span OR the parameter if it is not a Proton.Span
         */
        getSpanValue: function(pan) {
            if (pan instanceof Proton.Span)
                return pan.getValue();
            else
                return pan;
        },

        /**
         * Inherits any class from the superclass. Acts like 'extends' in Java
         *
         * @memberof Proton#Proton.Util
         * @method inherits
         *
         * @param {Object} subClass     the child class
         * @param {Object} superClass   the parent/super class
         */
        inherits: function(subClass, superClass) {
            subClass._super_ = superClass;
            if (Object['create']) {
                //console.log(subClass,superClass);
                subClass.prototype = Object.create(superClass.prototype, {
                    constructor: {
                        value: subClass
                    }
                });
            } else {
                var F = function() {};
                F.prototype = superClass.prototype;
                subClass.prototype = new F();
                subClass.prototype.constructor = subClass;
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
        getImageData: function(context, image, rect) {
            context.drawImage(image, rect.x, rect.y);
            var imagedata = context.getImageData(rect.x, rect.y, rect.width, rect.height);
            context.clearRect(rect.x, rect.y, rect.width, rect.height);
            return imagedata;
        },

        /**
         * @memberof Proton#Proton.Util
         * @method getImage
         *
         * @todo add description
         * @todo describe fun
         *
         * @param {Mixed}               img
         * @param {Proton.Particle}     particle
         * @param {Boolean}             drawCanvas  set to true if a canvas should be saved into particle.transform.canvas
         * @param {Boolean}             fun
         */
        getImage: function(img, particle, drawCanvas, fun) {
            if (typeof(img) == 'string') {
                this.loadAndSetImage(img, particle, drawCanvas, fun);
            } else if (typeof(img) == 'object') {
                this.loadAndSetImage(img.src, particle, drawCanvas, fun);
            } else if (img instanceof Image) {
                this.loadedImage(img.src, particle, drawCanvas, fun, img);
            }
        },

        /**
         * @memberof Proton#Proton.Util
         * @method loadedImage
         *
         * @todo add description
         * @todo describe fun
         * @todo describe target
         *
         * @param {String}              src         the src of an img-tag
         * @param {Proton.Particle}     particle
         * @param {Boolean}             drawCanvas  set to true if a canvas should be saved into particle.transform.canvas
         * @param {Boolean}             fun
         * @param {Object}              target
         */
        loadedImage: function(src, particle, drawCanvas, fun, target) {
            particle.target = target;
            particle.transform.src = src;
            if (!Proton.TextureBuffer[src])
                Proton.TextureBuffer[src] = particle.target;
            if (drawCanvas) {
                if (Proton.TextureCanvasBuffer[src]) {
                    particle.transform.canvas = Proton.TextureCanvasBuffer[src];
                } else {
                    var _width = Proton.WebGLUtil.nhpot(particle.target.width);
                    var _height = Proton.WebGLUtil.nhpot(particle.target.height);
                    particle.transform.canvas = Proton.DomUtil.createCanvas('canvas' + src, _width, _height);
                    var context = particle.transform.canvas.getContext('2d');
                    context.drawImage(particle.target, 0, 0, particle.target.width, particle.target.height);
                    Proton.TextureCanvasBuffer[src] = particle.transform.canvas;
                }
            }
            if (fun)
                fun(particle);
        },

        /**
         * @memberof Proton#Proton.Util
         * @method loadAndSetImage
         *
         * @todo add description
         * @todo describe fun
         *
         * @param {String}              src         the src of an img-tag
         * @param {Proton.Particle}     particle
         * @param {Boolean}             drawCanvas  set to true if a canvas should be saved into particle.transform.canvas
         * @param {Boolean}             fun
         */
        loadAndSetImage: function(src, particle, drawCanvas, fun) {
            if (Proton.TextureBuffer[src]) {
                this.loadedImage(src, particle, drawCanvas, fun, Proton.TextureBuffer[src]);
            } else {
                var self = this;
                var myImage = new Image();
                myImage.onload = function(e) {
                    self.loadedImage(src, particle, drawCanvas, fun, e.target);
                }
                myImage.src = src;
            }
        },

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
         * @method hexToRGB
         *
         * @param {String} h any hex value, e.g. #000000 or 000000 for black
         *
         * @return {rgbObject}
         */
        hexToRGB: function(h) {
            var hex16 = (h.charAt(0) == "#") ? h.substring(1, 7) : h;
            var r = parseInt(hex16.substring(0, 2), 16);
            var g = parseInt(hex16.substring(2, 4), 16);
            var b = parseInt(hex16.substring(4, 6), 16);

            return {
                r: r,
                g: g,
                b: b
            }
        },

        /**
         * converts a rgb value to a rgb string
         *
         * @memberof Proton#Proton.Util
         * @method rgbToHex
         *
         * @param {Object | Proton.hexToRGB} rgb a rgb object like in {@link Proton#Proton.Util.hexToRGB}
         *
         * @return {String} rgb()
         */
        rgbToHex: function(rbg) {
            return 'rgb(' + rbg.r + ', ' + rbg.g + ', ' + rbg.b + ')';
        }
    };

    Proton.Util = Util;
})(Proton);


///bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof fNOP ? this : oThis || this,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
