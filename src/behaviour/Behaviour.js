import Proton from '../core/Proton';
import Util from '../utils/Util';
import ease from '../math/ease';

export default class Behaviour {
    static id = 0;

    /**
     * The Behaviour class is the base for the other Behaviour
     *
     * @memberof! -
     * @interface
     * @alias Proton.Behaviour
     *
     * @param {Number} life 	the behaviours life
     * @param {String} easing 	The behaviour's decaying trend, for example ease.easeOutQuart
     *
     * @property {String}  id 		The behaviours id
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     * @property {Number}  age=0 	How long the particle should be 'alife'
     * @property {Number}  energy=1
     * @property {Boolean} dead=false The particle is dead at first
     * @property {Array}   parents 	The behaviour's parents array
     * @property {String}  name 	The behaviour name
     */
    constructor(life, easing) {

        this.life = Util.initValue(life, Infinity);
        this.easing = ease.getEasing(easing);

        this.age = 0;
        this.energy = 1;
        this.dead = false;
        this.parents = [];

        this.id = `Behaviour_${Behaviour.id++}`;
        this.name = 'Behaviour';
    }

    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Number} [life=Infinity] 		this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     */
    reset(life, easing) {
        this.life = Util.initValue(life, Infinity);
        this.easing = ease.getEasing(easing);
    }

    /**
     * Normalize a force by 1:100;
     *
     * @method normalizeForce
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Vector2D} force
     */
    normalizeForce(force) {
        return force.multiplyScalar(Proton.MEASURE);
    }

    /**
     * Normalize a value by 1:100;
     *
     * @method normalizeValue
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Number} value
     */
    normalizeValue(value) {
        return value * Proton.MEASURE;
    }

    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     */
    initialize(particle) {}

    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    calculate(particle, time, index) {
        this.age += time;

        if (this.age >= this.life || this.dead) {
            this.energy = 0;
            this.dead = true;
            this.destroy();
        } else {
            const scale = this.easing(particle.age / particle.life);
            this.energy = Math.max(1 - scale, 0);
        }
    }

    /**
     * Destory this behaviour
     *
     * @method destroy
     * @memberof Proton.Behaviour
     * @instance
     */
    destroy() {
        let i = this.parents.length;
        while (i--) {
            this.parents[i].removeBehaviour(this);
        }

        this.parents.length = 0;
    }
}
