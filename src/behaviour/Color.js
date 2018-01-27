import Util from '../utils/Util';
import ColorUtil from '../utils/ColorUtil';
import ArraySpan from '../math/ArraySpan';
import Behaviour from './Behaviour';

export default class Color extends Behaviour {

    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Color
     *
     * @param {Proton.ArraySpan | String} a the string should be a hex e.g. #000000 for black
     * @param {Proton.ArraySpan | String} b the string should be a hex e.g. #000000 for black
     * @param {Number} [life=Infinity] 	this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    constructor(a, b, life, easing) {
        super(life, easing);

        this.reset(a, b);
        this.name = "Color";
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
    reset(a, b, life, easing) {
        this.a = ArraySpan.createArraySpan(a);
        this.b = ArraySpan.createArraySpan(b);

        life && super.reset(life, easing);
    }

    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.Particle} particle
     */
    initialize(particle) {
        particle.color = this.a.getValue();
        particle.transform.colorA = ColorUtil.hexToRGB(particle.color);

        if (this.b)
            particle.transform.colorB = ColorUtil.hexToRGB(this.b.getValue());
    };

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
     */
    applyBehaviour(particle, time, index) {
        if (this.b) {
            this.calculate(particle, time, index);

            particle.transform.rgb.r = particle.transform.colorB.r + (particle.transform.colorA.r - particle.transform.colorB.r) * this.energy;
            particle.transform.rgb.g = particle.transform.colorB.g + (particle.transform.colorA.g - particle.transform.colorB.g) * this.energy;
            particle.transform.rgb.b = particle.transform.colorB.b + (particle.transform.colorA.b - particle.transform.colorB.b) * this.energy;

            particle.transform.rgb.r = Math.floor(particle.transform.rgb.r);
            particle.transform.rgb.g = Math.floor(particle.transform.rgb.g);
            particle.transform.rgb.b = Math.floor(particle.transform.rgb.b);

        } else {
            particle.transform.rgb.r = particle.transform.colorA.r;
            particle.transform.rgb.g = particle.transform.colorA.g;
            particle.transform.rgb.b = particle.transform.colorA.b;
        }
    };

}