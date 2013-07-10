(function(Proton, undefined) {
	Behaviour.id = 0;
	/**
	 * The Behaviour class is the base for the other Behaviour
	 *
	 * @class Behaviour
	 * @constructor
	 */
	function Behaviour(life, easing) {
		/**
		 * The behaviour's id;
		 * @property id
		 * @type {String} id
		 */
		this.id = 'Behaviour_' + Behaviour.id++;
		this.life = Proton.Util.initValue(life, Infinity);
		/**
		 * The behaviour's decaying trend, for example Proton.easeOutQuart;
		 * @property easing
		 * @type {String}
		 * @default Proton.easeLinear
		 */
		this.easing = Proton.ease.setEasingByName(easing);
		this.age = 0;
		this.energy = 1;
		/**
		 * The behaviour is Dead;
		 * @property dead
		 * @type {Boolean}
		 */
		this.dead = false;
		/**
		 * The behaviour's parents array;
		 * @property parents
		 * @type {Array}
		 */
		this.parents = [];
		/**
		 * The behaviour name;
		 * @property name
		 * @type {string}
		 */
		this.name = 'Behaviour';
	}


	Behaviour.prototype = {
		/**
		 * Reset this behaviour's parameters
		 *
		 * @method reset
		 * @param {Number} this behaviour's life
		 * @param {String} this behaviour's easing
		 */
		reset : function(life, easing) {
			this.life = Proton.Util.initValue(life, Infinity);
			this.easing = Proton.Util.initValue(easing, Proton.ease.setEasingByName(Proton.easeLinear));
		},
		/**
		 * Normalize a force by 1:100;
		 *
		 * @method normalizeForce
		 * @param {Proton.Vector2D} force 
		 */
		normalizeForce : function(force) {
			return force.multiplyScalar(Proton.MEASURE);
		},

		/**
		 * Normalize a value by 1:100;
		 *
		 * @method normalizeValue
		 * @param {Number} value
		 */
		normalizeValue : function(value) {
			return value * Proton.MEASURE;
		},

		/**
		 * Initialize the behaviour's parameters for all particles
		 *
		 * @method initialize
		 * @param {Proton.Particle} particle
		 */
		initialize : function(particle) {
		},
		
		/**
		 * Apply this behaviour for all particles every time
		 *
		 * @method applyBehaviour
		 * @param {Proton.Particle} particle
		 * @param {Number} the integrate time 1/ms
		 * @param {Int} the particle index
		 */
		applyBehaviour : function(particle, time, index) {
			this.age += time;
			if (this.age >= this.life || this.dead) {
				this.energy = 0;
				this.dead = true;
				this.destory();
			} else {
				var scale = this.easing(particle.age / particle.life);
				this.energy = Math.max(1 - scale, 0);
			}
		},
		
		/**
		 * Destory this behaviour
		 * @method destory
		 */
		destory : function() {
			var index;
			var length = this.parents.length, i;
			for ( i = 0; i < length; i++) {
				this.parents[i].removeBehaviour(this);
			}

			this.parents = [];
		}
	};

	Proton.Behaviour = Behaviour;
})(Proton);
