import Rgb from "../utils/Rgb";
import Puid from "../utils/Puid";
import Util from "../utils/Util";
import ease from "../math/ease";
import Vector2D from "../math/Vector2D";
import MathUtil from "../math/MathUtil";

export default class Particle {
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
    conf && Util.setProp(this, conf);
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
      this.behaviours[i] &&
        this.behaviours[i].applyBehaviour(this, time, index);
    }
  }

  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);

    if (behaviour.hasOwnProperty("parents")) behaviour.parents.push(this);
    behaviour.initialize(this);
  }

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
    this.removeAllBehaviours();
    this.energy = 0;
    this.dead = true;
    this.parent = null;
  }
}
