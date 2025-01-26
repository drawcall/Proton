import Rgb from "../utils/Rgb";
import Puid from "../utils/Puid";
import Util from "../utils/Util";
import PropUtil from "../utils/PropUtil";
import ease from "../math/ease";
import Vector2D from "../math/Vector2D";
import MathUtil from "../math/MathUtil";

/**
 * Represents a particle in a particle system.
 * @class Particle
 */
export default class Particle {
  /** @type {string} The unique identifier of the particle */
  id = "";

  /** @type {{p:Vector2D,v:Vector2D,a:Vector2D}} Old state of the particle */
  old = null;

  /** @type {object} Custom data associated with the particle */
  data = null;

  /** @type {Behaviour[]} Array of behaviours applied to the particle */
  behaviours = null;

  /** @type {Vector2D} Current position of the particle */
  p = null;

  /** @type {Vector2D} Current velocity of the particle */
  v = null;

  /** @type {Vector2D} Current acceleration of the particle */
  a = null;

  /** @type {Rgb} Color of the particle */
  rgb = null;

  /**
   * Creates a new Particle instance.
   * @param {Object} [conf] Configuration object for the particle
   */
  constructor(conf) {
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
  getDirection() {
    return Math.atan2(this.v.x, -this.v.y) * MathUtil.N180_PI;
  }

  /**
   * Resets the particle to its initial state.
   * @returns {Particle} The particle instance
   */
  reset() {
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
   */
  update(time, index) {
    if (!this.sleep) {
      this.age += time;
      this.applyBehaviours(time, index);
    }

    if (this.age < this.life) {
      const scale = this.easing(this.age / this.life);
      this.energy = Math.max(1 - scale, 0);
    } else {
      this.destroy();
    }
  }

  /**
   * Applies all behaviours attached to the particle.
   * @param {number} time The time elapsed since the last update
   * @param {number} index The index of the particle in its parent system
   */
  applyBehaviours(time, index) {
    const length = this.behaviours.length;
    let i;

    for (i = 0; i < length; i++) {
      this.behaviours[i] && this.behaviours[i].applyBehaviour(this, time, index);
    }
  }

  /**
   * Adds a behaviour to the particle.
   * @param {Behaviour} behaviour The behaviour to add
   */
  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);

    if (behaviour.hasOwnProperty("parents")) behaviour.parents.push(this);
    behaviour.initialize(this);
  }

  /**
   * Adds multiple behaviours to the particle.
   * @param {Behaviour[]} behaviours An array of behaviours to add
   */
  addBehaviours(behaviours) {
    const length = behaviours.length;
    let i;

    for (i = 0; i < length; i++) {
      this.addBehaviour(behaviours[i]);
    }
  }

  /**
   * Removes a specific behaviour from the particle.
   * @param {Behaviour} behaviour The behaviour to remove
   */
  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);

    if (index > -1) {
      const behaviour = this.behaviours.splice(index, 1);
      behaviour.parents = null;
    }
  }

  /**
   * Removes all behaviours from the particle.
   */
  removeAllBehaviours() {
    Util.emptyArray(this.behaviours);
  }

  /**
   * Destroys the particle, removing all behaviours and setting it as dead.
   */
  destroy() {
    this.removeAllBehaviours();
    this.energy = 0;
    this.dead = true;
    this.parent = null;
  }
}
