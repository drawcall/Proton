import Attraction from "./Attraction";

/**
 * The opposite of Attraction - turns the force
 *
 * @class
 * @extends Proton.Attraction
 * @memberof! Proton#
 * @alias Proton.Repulsion
 */
export default class Repulsion extends Attraction {
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
  constructor(targetPosition, force, radius, life, easing) {
    super(targetPosition, force, radius, life, easing);

    /**
     * The strength of the repulsion force
     * @type {number}
     */
    this.force *= -1;

    /**
     * The name of the behaviour
     * @type {string}
     */
    this.name = "Repulsion";
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
  reset(targetPosition, force, radius, life, easing) {
    super.reset(targetPosition, force, radius, life, easing);
    this.force *= -1;
  }
}
