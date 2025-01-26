import Proton from "../core/Proton";
import Util from "../utils/Util";
import ease from "../math/ease";

/**
 * The Behaviour class is the base for the other Behaviour
 * @class
 */
export default class Behaviour {
  static id = 0;

  /**
   * Create a new Behaviour instance
   * @param {number} [life=Infinity] - The behaviour's life
   * @param {string} [easing='easeLinear'] - The behaviour's decaying trend, for example ease.easeOutQuart
   */
  constructor(life, easing) {
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
    this.id = `Behaviour_${Behaviour.id++}`;

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
  reset(life, easing) {
    this.life = Util.initValue(life, Infinity);
    this.easing = ease.getEasing(easing);
  }

  /**
   * Normalize a force by 1:100
   * @param {Proton.Vector2D} force - The force to normalize
   * @returns {Proton.Vector2D} The normalized force
   */
  normalizeForce(force) {
    return force.multiplyScalar(Proton.MEASURE);
  }

  /**
   * Normalize a value by 1:100
   * @param {number} value - The value to normalize
   * @returns {number} The normalized value
   */
  normalizeValue(value) {
    return value * Proton.MEASURE;
  }

  /**
   * Initialize the behaviour's parameters for a particle
   * @param {Proton.Particle} particle - The particle to initialize
   */
  initialize(particle) {}

  /**
   * Compute the behaviour's life cycle
   * @param {Proton.Particle} particle - The particle to calculate for
   * @param {number} time - The integrate time 1/ms
   * @param {number} index - The particle index
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
   * Apply this behaviour to a particle
   * @param {Proton.Particle} particle - The particle to apply the behaviour to
   * @param {number} time - The integrate time 1/ms
   * @param {number} index - The particle index
   */
  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);
  }

  /**
   * Destroy this behaviour
   */
  destroy() {
    let i = this.parents.length;
    while (i--) {
      this.parents[i].removeBehaviour(this);
    }

    this.parents.length = 0;
  }
}
