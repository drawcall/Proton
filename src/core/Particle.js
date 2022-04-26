/** @typedef {import('../behaviour/Behaviour')} Behaviour */
/** @typedef {import('../math/Vector2D')} Vector2D */
/** @typedef {import('../utils/Rgb')} Rgb */
import PBody from "./PBody";
import Rgb from "../utils/Rgb";
import Puid from "../utils/Puid";
import Util from "../utils/Util";
import PropUtil from "../utils/PropUtil";
import ease from "../math/ease";
import Vector2D from "../math/Vector2D";
import MathUtil from "../math/MathUtil";

export default class Particle extends PBody {
  /** @type string */
  id = "";

  /** @type {PBody} */
  old = null;

  /** @type {object} */
  data = null;

  /** @type {Behaviour[]} */
  behaviours = null;

  /** @type {Rgb} */
  rgb = null;

  /**
   * the Particle class
   *
   * @class Proton.Particle
   * @constructor
   * @param {Object} pObj the parameters object;
   * for example {life:3,dead:false}
   */
  constructor(conf) {
    /**
     * The particle's id;
     * @property id
     * @type {string}
     */
    this.name = "Particle";
    this.id = Puid.id(this.name);
    this.old = new PBody();
    this.data = {};
    this.behaviours = [];
    this.rgb = new RGB();

    this.reset();
    conf && PropUtil.setProp(this, conf);
  }

  getDirection() {
    return Math.atan2(this.v.x, -this.v.y) * MathUtil.N180_PI;
  }

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

    super.reset();
    this.old.reset();
    this.rgb.reset();
    this.easing = ease.easeLinear;
    Util.emptyObject(this.data);
    this.removeAllBehaviours();

    return this;
  }

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

  applyBehaviours(time, index) {
    const length = this.behaviours.length;
    let i;

    for (i = 0; i < length; i++) {
      this.behaviours[i] && this.behaviours[i].applyBehaviour(this, time, index);
    }
  }

  /**
   * @param {Behaviour} behaviour
   */
  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);

    if (behaviour.hasOwnProperty("parents")) behaviour.parents.push(this);
    behaviour.initialize(this);
  }

  /**
   * @param {Behaviour[]} behaviours
   */
  addBehaviours(behaviours) {
    const length = behaviours.length;
    let i;

    for (i = 0; i < length; i++) {
      this.addBehaviour(behaviours[i]);
    }
  }

  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);

    if (index > -1) {
      const behaviour = this.behaviours.splice(index, 1);
      behaviour.parents = null;
    }
  }

  removeAllBehaviours() {
    Util.emptyArray(this.behaviours);
  }

  /**
   * Destory this particle
   * @method destroy
   */
  destroy() {
    super.destroy();
    this.old.destroy();
    this.removeAllBehaviours();

    this.energy = 0;
    this.dead = true;
    this.parent = null;
    this.old = null;
    this.body = null;
    this.sprite = null;
  }
}
