import Util from '../utils/Util';
import ease from '../math/ease';
import Vector2D from '../math/Vector2D';
import MathUtils from '../math/MathUtils';

export default class Particle {

    static ID = 0;

    /**
     * the Particle class
     *
     * @class Proton.Particle
     * @constructor
     * @param {Object} pObj the parameters object;
     * for example {life:3,dead:false}
     */
    constructor(pOBJ) {
        /**
         * The particle's id;
         * @property id
         * @type {string}
         */
        this.id = `particle_${Particle.ID++}`;
        this.reset('init');

        pOBJ && Util.setPrototypeByObject(this, pOBJ);
    }

    getDirection() {
        return Math.atan2(this.v.x, -this.v.y) * MathUtils.N180_PI;
    }

    reset(init) {
        this.life = Infinity;
        this.age = 0;

        //Energy loss
        this.energy = 1;
        this.dead = false;
        this.sleep = false;
        this.body = null;
        this.sprite = null;
        this.parent = null;

        this.mass = 1;
        this.radius = 10;
        this.alpha = 1;
        this.scale = 1;
        this.rotation = 0;
        this.color = null;

        this.easing = ease.easeLinear;

        if (init == 'init') {
            this.transform = {};
            this.p = new Vector2D();
            this.v = new Vector2D();
            this.a = new Vector2D();

            this.old = {
                p: new Vector2D(),
                v: new Vector2D(),
                a: new Vector2D()
            };

            this.behaviours = [];
        } else {
            Util.destroyObject(this.transform, 'rgb');

            this.p.set(0, 0);
            this.v.set(0, 0);
            this.a.set(0, 0);

            this.old.p.set(0, 0);
            this.old.v.set(0, 0);
            this.old.a.set(0, 0);

            this.removeAllBehaviours();
        }

        if (!this.transform.rgb) {
            this.transform.rgb = { r: 255, g: 255, b: 255 };
        } else {
            this.transform.rgb.r = 255;
            this.transform.rgb.g = 255;
            this.transform.rgb.b = 255;
        }

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
            this.behaviours[i] && this.behaviours[i].applyBehaviour(this, time, index)
        }
    }

    addBehaviour(behaviour) {
        this.behaviours.push(behaviour);

        if (behaviour.hasOwnProperty('parents')) behaviour.parents.push(this);
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
        Util.destroyArray(this.behaviours);
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