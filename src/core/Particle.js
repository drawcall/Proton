(function(Proton, undefined) {

	Particle.ID = 0;
	/**
	 * the Particle class
	 *
	 * @class Proton.Particle
	 * @constructor
	 * @param {Object} pObj the parameters object;
	 * for example {life:3,dead:false}
	 */
	function Particle(pOBJ) {
		/**
		 * The particle's id;
		 * @property id
		 * @type {String} id
		 */
		this.id = 'particle_' + Particle.ID++;
		this.reset(true);
		Proton.Util.setPrototypeByObject(this, pOBJ);
	}


	Particle.prototype = {
		getDirection : function() {
			return Math.atan2(this.v.x, -this.v.y) * (180 / Math.PI);
		},

		reset : function(init) {
			this.life = Infinity;
			this.age = 0;
			//能量损失
			this.energy = 1;
			this.dead = false;
			this.sleep = false;
			this.target = null;
			this.sprite = null;
			this.parent = null;
			this.mass = 1;
			this.radius = 10;
			this.alpha = 1;
			this.scale = 1;
			this.rotation = 0;
			this.color = null;
			this.easing = Proton.ease.setEasingByName(Proton.easeLinear);
			if (init) {
				this.transform = {}
				this.p = new Proton.Vector2D();
				this.v = new Proton.Vector2D();
				this.a = new Proton.Vector2D();
				this.old = {
					p : new Proton.Vector2D(),
					v : new Proton.Vector2D(),
					a : new Proton.Vector2D()
				};
				this.behaviours = [];
			} else {
				Proton.Util.destroyObject(this.transform);
				this.p.set(0, 0);
				this.v.set(0, 0);
				this.a.set(0, 0);
				this.old.p.set(0, 0);
				this.old.v.set(0, 0);
				this.old.a.set(0, 0);
				this.removeAllBehaviours();
			}

			this.transform.rgb = {
				r : 255,
				g : 255,
				b : 255
			}
			return this;
		},

		update : function(time, index) {
			if (!this.sleep) {
				this.age += time;
				var length = this.behaviours.length, i;
				for ( i = 0; i < length; i++) {
					if (this.behaviours[i])
						this.behaviours[i].applyBehaviour(this, time, index)
				}
			} else {

			}

			if (this.age >= this.life) {
				this.destory();
			} else {
				var scale = this.easing(this.age / this.life);
				this.energy = Math.max(1 - scale, 0);
			}

		},

		addBehaviour : function(behaviour) {
			this.behaviours.push(behaviour);
			if (behaviour.hasOwnProperty('parents'))
				behaviour.parents.push(this);
			behaviour.initialize(this);
		},

		addBehaviours : function(behaviours) {
			var length = behaviours.length, i;
			for ( i = 0; i < length; i++) {
				this.addBehaviour(behaviours[i]);
			}
		},

		removeBehaviour : function(behaviour) {
			var index = this.behaviours.indexOf(behaviour);
			if (index > -1) {
				var behaviour = this.behaviours.splice(index, 1);
				behaviour.parents = null;
			}
		},

		removeAllBehaviours : function() {
			Proton.Util.destroyArray(this.behaviours);
		},
		/**
		 * Destory this particle
		 * @method destory
		 */
		destory : function() {
			this.removeAllBehaviours();
			this.energy = 0;
			this.dead = true;
			this.parent = null;
		}
	};

	Proton.Particle = Particle;
})(Proton);
