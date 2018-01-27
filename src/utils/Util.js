import Vector2D from '../math/Vector2D';
import Span from '../math/Span';
import ImgUtil from './ImgUtil';
import DomUtil from './DomUtil';

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
        value = (value !== null && value !== undefined) ? value : defaults;
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
        return Object.prototype.toString.call(value) === '[object Array]';
    },

    /**
     * Destroyes the given array
     *
     * @memberof Proton#Proton.Util
     * @method destroyArray
     *
     * @param {Array} array Any array
     */
    destroyArray(array) {
        if (array) array.length = 0;
    },

    /**
     * Destroyes the given object
     *
     * @memberof Proton#Proton.Util
     * @method destroyObject
     *
     * @param {Object} obj Any object
     */
    destroyObject(obj, ignore) {
        for (let o in obj) {
            if (ignore && ignore.indexOf(o) > -1) continue;
            delete obj[o];
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
    classApply(constructor, args) {
        if (!args) return new constructor;

        args = [null].concat(args);
        const factoryFunction = constructor.bind.apply(constructor, args);
        return new factoryFunction();
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
    setVector2DByObject(target, pOBJ) {
        if (this.hasProp(pOBJ, 'x')) target.p.x = pOBJ['x'];
        if (this.hasProp(pOBJ, 'y')) target.p.y = pOBJ['y'];

        if (this.hasProp(pOBJ, 'vx')) target.v.x = pOBJ['vx'];
        if (this.hasProp(pOBJ, 'vy')) target.v.y = pOBJ['vy'];

        if (this.hasProp(pOBJ, 'ax')) target.a.x = pOBJ['ax'];
        if (this.hasProp(pOBJ, 'ay')) target.a.y = pOBJ['ay'];

        if (this.hasProp(pOBJ, 'p')) particle.p.copy(pOBJ['p']);
        if (this.hasProp(pOBJ, 'v')) particle.v.copy(pOBJ['v']);
        if (this.hasProp(pOBJ, 'a')) particle.a.copy(pOBJ['a']);

        if (this.hasProp(pOBJ, 'position')) particle.p.copy(pOBJ['position']);
        if (this.hasProp(pOBJ, 'velocity')) particle.v.copy(pOBJ['velocity']);
        if (this.hasProp(pOBJ, 'accelerate')) particle.a.copy(pOBJ['accelerate']);
    },

    hasProp(obj, key) {
        if (!obj) return false;
        return obj[key] !== undefined;
        // return obj.hasOwnProperty(key);
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
    setPrototypeByObject(target, prototypeObject, filters) {
        for (let singleProp in prototypeObject) {
            if (target.hasOwnProperty(singleProp)) {
                if (filters) {
                    if (filters.indexOf(singleProp) < 0)
                        target[singleProp] = this.getSpanValue(prototypeObject[singleProp]);
                } else {
                    target[singleProp] = this.getSpanValue(prototypeObject[singleProp]);
                }
            }
        }

        return target;
    },

    /**
     * Returns a new Span object
     *
     * @memberof Proton#Proton.Util
     * @method setSpanValue
     *
     * @todo a, b and c should be 'Mixed' or 'Number'?
     *
     * @param {Mixed | Span} a
     * @param {Mixed}               b
     * @param {Mixed}               c
     *
     * @return {Span}
     */
    setSpanValue(a, b, c) {
        if (a instanceof Span) {
            return a;
        } else {
            if (!b) {
                return new Span(a);
            } else {
                if (!c)
                    return new Span(a, b);
                else
                    return new Span(a, b, c);
            }
        }
    },

    /**
     * Returns the value from a Span, if the param is not a Span it will return the given parameter
     *
     * @memberof Proton#Proton.Util
     * @method getSpanValue
     *
     * @param {Mixed | Span} pan
     *
     * @return {Mixed} the value of Span OR the parameter if it is not a Span
     */
    getSpanValue(pan) {
        return pan instanceof Span ? pan.getValue() : pan;
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

    destroy(arr, param) {
        let i = arr.length;

        while (i--) {
            try { arr[i].destroy(param); } catch (e) { }
            delete arr[i];
        }

        arr.length = 0;
    }

}