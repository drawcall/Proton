import Span from './Span';
import Util from '../utils/Util';
import MathUtils from './MathUtils';

export default class ArraySpan extends Span {

    constructor(color) {
        super();
        this._arr = Util.isArray(color) ? color : [color];
    }

    getValue() {
        const color = this._arr[Math.floor(this._arr.length * Math.random())];
        return color === 'random' || color === 'Random' ? MathUtils.randomColor() : color;
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
     */
    static createArraySpan(arr) {
        if (!arr) return null;

        if (arr instanceof ArraySpan)
            return arr;
        else
            return new ArraySpan(arr);
    }

}