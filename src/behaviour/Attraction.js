import Util from "../utils/Util";
import Vector2D from "../math/Vector2D";
import Behaviour from "./Behaviour";

/**
 * Attraction behavior for particles.
 * This behaviour makes particles follow a specific target position.
 * @extends Behaviour
 */
export default class Attraction extends Behaviour {
  /**
   * Creates an instance of Attraction.
   * @param {Vector2D} targetPosition - The attraction point coordinates.
   * @param {number} [force=100] - The strength of the attraction force.
   * @param {number} [radius=1000] - The radius of influence for the attraction.
   * @param {number} [life=Infinity] - The life span of this behaviour.
   * @param {string} [easing='ease.easeLinear'] - The easing function for this behaviour.
   */
  constructor(targetPosition, force, radius, life, easing) {
    super(life, easing);

    /**
     * The target position for attraction.
     * @type {Vector2D}
     */
    this.targetPosition = Util.initValue(targetPosition, new Vector2D());

    /**
     * The radius of influence for the attraction.
     * @type {number}
     */
    this.radius = Util.initValue(radius, 1000);

    /**
     * The strength of the attraction force.
     * @type {number}
     */
    this.force = Util.initValue(this.normalizeValue(force), 100);

    /**
     * The squared radius (for optimization).
     * @type {number}
     */
    this.radiusSq = this.radius * this.radius;

    /**
     * The attraction force vector.
     * @type {Vector2D}
     */
    this.attractionForce = new Vector2D();

    /**
     * The squared length of the attraction force.
     * @type {number}
     */
    this.lengthSq = 0;

    /**
     * The name of the behaviour.
     * @type {string}
     */
    this.name = "Attraction";
  }

  /**
   * Resets the behaviour's parameters.
   * @param {Vector2D} targetPosition - The new attraction point coordinates.
   * @param {number} [force=100] - The new strength of the attraction force.
   * @param {number} [radius=1000] - The new radius of influence for the attraction.
   * @param {number} [life=Infinity] - The new life span of this behaviour.
   * @param {string} [easing='ease.easeLinear'] - The new easing function for this behaviour.
   */
  reset(targetPosition, force, radius, life, easing) {
    this.targetPosition = Util.initValue(targetPosition, new Vector2D());
    this.radius = Util.initValue(radius, 1000);
    this.force = Util.initValue(this.normalizeValue(force), 100);
    this.radiusSq = this.radius * this.radius;
    this.attractionForce = new Vector2D();
    this.lengthSq = 0;

    life && super.reset(life, easing);
  }

  /**
   * Applies this behaviour to a particle.
   * @param {Particle} particle - The particle to apply the behaviour to.
   * @param {number} time - The current simulation time.
   * @param {number} index - The index of the particle.
   */
  applyBehaviour(particle, time, index) {
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
  }
}
